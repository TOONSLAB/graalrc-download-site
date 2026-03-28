import { NextResponse } from 'next/server'

const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'TOONSLAB'
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME || 'rc'
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

// ---------- Types ----------

interface AssetInfo {
  url: string
  name: string
  size: number
}

interface PlatformDownloads {
  installer?: AssetInfo
  archive?: AssetInfo
}

interface ReleasesResponse {
  version: string
  date: string
  tag: string
  platforms: {
    windows: PlatformDownloads
    macos: PlatformDownloads
    linux: PlatformDownloads
  }
  checksums: Record<string, AssetInfo>
  releaseUrl: string
}

// ---------- In-memory cache ----------

let cachedResponse: ReleasesResponse | null = null
let cachedAt = 0

// ---------- GitHub API helpers ----------

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  const token = process.env.GITHUB_TOKEN
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

interface GitHubAsset {
  name: string
  browser_download_url: string
  size: number
}

interface GitHubRelease {
  tag_name: string
  name: string
  published_at: string
  html_url: string
  assets: GitHubAsset[]
  draft: boolean
  prerelease: boolean
}

async function fetchLatestRelease(): Promise<GitHubRelease | null> {
  const headers = githubHeaders()

  // Try the /latest endpoint first (only returns non-prerelease, non-draft)
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases/latest`,
      { headers, next: { revalidate: 0 } }
    )
    if (res.ok) {
      return (await res.json()) as GitHubRelease
    }
  } catch {
    // fall through
  }

  // Fallback: fetch the list and pick the most recent with assets
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases?per_page=20`,
      { headers, next: { revalidate: 0 } }
    )
    if (!res.ok) return null
    const releases = (await res.json()) as GitHubRelease[]
    // Prefer non-draft releases that have at least one downloadable asset
    const viable = releases.filter((r) => !r.draft && r.assets.length > 0)
    return viable.length > 0 ? viable[0] : releases.length > 0 ? releases[0] : null
  } catch {
    return null
  }
}

// ---------- Asset classification ----------

function toAsset(a: GitHubAsset): AssetInfo {
  return { url: a.browser_download_url, name: a.name, size: a.size }
}

function classifyAssets(release: GitHubRelease): ReleasesResponse {
  const tag = release.tag_name
  // Derive a human-readable version: strip leading 'v' or 'build-' prefix
  let version = tag
  if (version.startsWith('v')) version = version.slice(1)
  if (version.startsWith('build-')) version = version.slice(6)

  const date = release.published_at
    ? release.published_at.slice(0, 10) // "YYYY-MM-DD"
    : new Date().toISOString().slice(0, 10)

  const windows: PlatformDownloads = {}
  const macos: PlatformDownloads = {}
  const linux: PlatformDownloads = {}
  const checksums: Record<string, AssetInfo> = {}

  for (const asset of release.assets) {
    const name = asset.name.toLowerCase()

    // ----- Checksum files -----
    if (name.endsWith('.sha256') || name === 'checksums-gtk3.txt' || name.startsWith('checksum-')) {
      checksums[asset.name] = toAsset(asset)
      continue
    }

    // ----- Windows -----
    // Installer: GraalRC-Setup-*.exe
    if (name.endsWith('.exe') && name.includes('setup')) {
      windows.installer = toAsset(asset)
      continue
    }
    // Archive: RC-GTK3-Windows-*.zip
    if (name.endsWith('.zip') && name.includes('windows')) {
      windows.archive = toAsset(asset)
      continue
    }

    // ----- macOS -----
    // DMG installer: GraalRC-*.dmg
    if (name.endsWith('.dmg')) {
      macos.installer = toAsset(asset)
      continue
    }
    // Archive fallback: RC-GTK3-macOS-*.zip
    if (name.endsWith('.zip') && name.includes('macos')) {
      macos.archive = toAsset(asset)
      continue
    }

    // ----- Linux -----
    // .deb package: graalrc_*_amd64.deb
    if (name.endsWith('.deb')) {
      linux.installer = toAsset(asset)
      continue
    }
    // tar.gz archive: RC-GTK3-Linux-*.tar.gz
    if (name.endsWith('.tar.gz') && name.includes('linux')) {
      linux.archive = toAsset(asset)
      continue
    }
  }

  return {
    version,
    date,
    tag,
    platforms: { windows, macos, linux },
    checksums,
    releaseUrl: release.html_url,
  }
}

// ---------- Route handler ----------

export async function GET() {
  // Serve from cache if still fresh
  if (cachedResponse && Date.now() - cachedAt < CACHE_TTL_MS) {
    return NextResponse.json(cachedResponse, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        'X-Cache': 'HIT',
      },
    })
  }

  const release = await fetchLatestRelease()

  if (!release) {
    return NextResponse.json(
      {
        error: 'Unable to fetch release data from GitHub.',
        fallbackUrl: `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases`,
      },
      {
        status: 502,
        headers: { 'Cache-Control': 'no-cache' },
      }
    )
  }

  const data = classifyAssets(release)

  // Store in cache
  cachedResponse = data
  cachedAt = Date.now()

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      'X-Cache': 'MISS',
    },
  })
}
