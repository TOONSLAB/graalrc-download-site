'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from '@/lib/i18n-context'

// ---------- Types matching the API response ----------

interface AssetInfo {
  url: string
  name: string
  size: number
}

interface PlatformDownloads {
  installer?: AssetInfo
  archive?: AssetInfo
}

interface ReleasesData {
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

type PlatformKey = 'windows' | 'macos' | 'linux'

// ---------- Helpers ----------

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

const PLATFORM_META: Record<
  PlatformKey,
  {
    name: string
    icon: string
    requirements: string
    installerLabel: string
    installerBadge: string
    archiveLabel: string
    archiveBadge: string
  }
> = {
  windows: {
    name: 'Windows',
    icon: '\uD83E\uDE9F', // window emoji
    requirements: 'Windows 10 or later (64-bit)',
    installerLabel: 'Windows Installer',
    installerBadge: '.exe',
    archiveLabel: 'Portable Archive',
    archiveBadge: '.zip',
  },
  macos: {
    name: 'macOS',
    icon: '\uD83C\uDF4E', // apple emoji
    requirements: 'macOS 12+ (Intel & Apple Silicon)',
    installerLabel: 'macOS Disk Image',
    installerBadge: '.dmg',
    archiveLabel: 'Archive',
    archiveBadge: '.zip',
  },
  linux: {
    name: 'Linux',
    icon: '\uD83D\uDC27', // penguin emoji
    requirements: 'Ubuntu 20.04+, Debian 11+, Fedora 35+',
    installerLabel: 'Debian Package',
    installerBadge: '.deb',
    archiveLabel: 'Portable Archive',
    archiveBadge: '.tar.gz',
  },
}

// ---------- Sub-components ----------

function DownloadButton({
  asset,
  label,
  badge,
  primary,
}: {
  asset: AssetInfo
  label: string
  badge: string
  primary?: boolean
}) {
  return (
    <div className="bg-graal-darker/50 rounded-lg p-4 border border-graal-gold/20 hover:border-graal-gold/50 transition-colors group">
      <p className="text-gray-300 mb-1 flex items-center justify-between">
        <span className="font-semibold text-graal-gold">{label}</span>
        <span className="text-xs bg-graal-gold/10 text-graal-gold px-2 py-1 rounded">
          {badge}
        </span>
      </p>
      <p className="text-xs text-gray-500 mb-3">{asset.name}</p>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-400">Size: {formatBytes(asset.size)}</span>
      </div>
      <a
        href={asset.url}
        className={`block text-center font-display font-semibold py-2.5 rounded-lg transition-all ${
          primary
            ? 'btn-primary w-full group-hover:shadow-graal-gold/20'
            : 'w-full border border-graal-gold/30 text-graal-gold hover:bg-graal-gold/10'
        }`}
      >
        Download
      </a>
    </div>
  )
}

function ChecksumLink({ checksums }: { checksums: Record<string, AssetInfo> }) {
  const entries = Object.values(checksums)
  if (entries.length === 0) return null
  return (
    <div className="mt-4 text-center">
      <p className="text-xs text-gray-500 mb-1">SHA256 Checksums</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {entries.map((c) => (
          <a
            key={c.name}
            href={c.url}
            className="text-xs text-graal-gold/70 hover:text-graal-gold underline underline-offset-2"
          >
            {c.name}
          </a>
        ))}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="max-w-3xl mx-auto h-48 bg-graal-darker/50 rounded-2xl" />
      <div className="grid md:grid-cols-3 gap-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-80 bg-graal-darker/50 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

function ErrorFallback({ releaseUrl }: { releaseUrl: string }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="text-6xl mb-6">&#9888;&#65039;</div>
      <h2 className="text-2xl font-display text-white mb-4">
        Unable to load download information
      </h2>
      <p className="text-gray-400 mb-8">
        We could not fetch the latest release data. You can download directly from GitHub.
      </p>
      <a
        href={releaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary px-8 py-3 text-lg inline-flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        View Releases on GitHub
      </a>
    </div>
  )
}

// ---------- Platform Card ----------

function PlatformCard({
  platformKey,
  downloads,
  isDetected,
}: {
  platformKey: PlatformKey
  downloads: PlatformDownloads
  isDetected: boolean
}) {
  const meta = PLATFORM_META[platformKey]
  const hasContent = downloads.installer || downloads.archive

  return (
    <div
      className={`card-graal shadow-graal-lg transition-all duration-300 ${
        isDetected ? 'ring-2 ring-graal-gold scale-105' : 'hover:bg-graal-darker/80'
      }`}
    >
      <div className="text-center mb-6">
        <div className="text-6xl mb-4 drop-shadow-lg">{meta.icon}</div>
        <h2 className="text-3xl font-display text-graal-gold mb-2">{meta.name}</h2>
        <p className="text-sm text-gray-400">{meta.requirements}</p>
      </div>

      {hasContent ? (
        <div className="space-y-4">
          {downloads.installer && (
            <DownloadButton
              asset={downloads.installer}
              label={meta.installerLabel}
              badge={meta.installerBadge}
              primary
            />
          )}
          {downloads.archive && (
            <DownloadButton
              asset={downloads.archive}
              label={meta.archiveLabel}
              badge={meta.archiveBadge}
            />
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 text-sm">
          No builds available for this platform yet.
        </div>
      )}
    </div>
  )
}

// ---------- Main page ----------

export default function DownloadPage() {
  const [os, setOs] = useState<PlatformKey | null>(null)
  const [data, setData] = useState<ReleasesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { t } = useTranslation()

  // Detect OS
  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.includes('win')) setOs('windows')
    else if (ua.includes('mac')) setOs('macos')
    else if (ua.includes('linux')) setOs('linux')
  }, [])

  // Fetch release data
  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('/api/releases')
        if (!res.ok) throw new Error('API error')
        const json = (await res.json()) as ReleasesData
        if (!cancelled) {
          setData(json)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  // Determine the recommended platform's primary download
  const recommended = os && data ? data.platforms[os] : null
  const recommendedAsset = recommended?.installer || recommended?.archive || null

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-glow -top-20 -left-20 opacity-20 bg-graal-gold"></div>
        <div className="bg-glow top-40 right-0 opacity-10 bg-graal-blue"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-display font-bold text-white mb-4 drop-shadow-md">
            {t('hero.cta_beta')} {t('hero.title_highlight')}
          </h1>

          {data && (
            <div className="inline-flex items-center space-x-2 bg-graal-darker/80 px-4 py-2 rounded-full border border-graal-gold/30 shadow-inner mb-4">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-gray-300 font-medium">
                Version {data.version} &mdash; {formatDate(data.date)}
              </p>
            </div>
          )}

          <p className="text-gray-400 max-w-2xl mx-auto">
            Production builds with native installers for every platform. Secure and optimized.
          </p>
        </div>

        {/* Loading state */}
        {loading && <LoadingSkeleton />}

        {/* Error state */}
        {error && (
          <ErrorFallback
            releaseUrl={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_OWNER || 'TOONSLAB'}/${process.env.NEXT_PUBLIC_GITHUB_REPO || 'rc'}/releases`}
          />
        )}

        {/* Content when data is loaded */}
        {data && !loading && (
          <>
            {/* Recommended Download */}
            {os && recommendedAsset && (
              <div className="max-w-3xl mx-auto mb-16 animate-fade-in-up">
                <div className="bg-gradient-to-br from-graal-darker to-black border border-graal-gold/40 rounded-2xl p-8 shadow-[0_0_50px_rgba(251,191,36,0.1)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-graal-gold text-graal-darker text-xs font-bold px-4 py-1 rounded-bl-xl font-display shadow-lg">
                    RECOMMENDED FOR YOU
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                      <div className="text-7xl mb-4 md:mb-0 animate-bounce-slow inline-block">
                        {PLATFORM_META[os].icon}
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-3xl font-display font-bold text-white mb-2">
                        Download for {PLATFORM_META[os].name}
                      </h2>
                      <p className="text-gray-400 mb-2">
                        Compatible with {PLATFORM_META[os].requirements}
                      </p>
                      <p className="text-sm text-graal-gold flex items-center justify-center md:justify-start gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {recommendedAsset.name}
                      </p>
                    </div>

                    <div>
                      <a
                        href={recommendedAsset.url}
                        className="btn-primary px-8 py-4 text-lg shadow-lg shadow-graal-gold/20 flex items-center gap-2 hover:scale-105 transition-transform"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        <span>Download</span>
                      </a>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        {formatBytes(recommendedAsset.size)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Downloads Grid */}
            <h3
              id="all-downloads"
              className="text-2xl font-display text-center text-graal-gold mb-8 flex items-center justify-center gap-4"
            >
              <span className="h-px w-12 bg-graal-gold/30"></span>
              All Downloads
              <span className="h-px w-12 bg-graal-gold/30"></span>
            </h3>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {(['windows', 'macos', 'linux'] as PlatformKey[]).map((key) => (
                <PlatformCard
                  key={key}
                  platformKey={key}
                  downloads={data.platforms[key]}
                  isDetected={os === key}
                />
              ))}
            </div>

            {/* Checksums */}
            <ChecksumLink checksums={data.checksums} />

            {/* Installation Instructions */}
            <div className="card-graal shadow-graal-lg mb-8 mt-12">
              <h2 className="text-3xl font-display text-graal-gold mb-6 text-center">
                Installation Instructions
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Windows */}
                <div>
                  <h3 className="text-xl font-display text-graal-gold mb-3">Windows</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm">
                    <li>Download the installer (.exe) or portable archive (.zip)</li>
                    <li>
                      <strong>Installer:</strong> Run the .exe and follow the wizard
                    </li>
                    <li>
                      <strong>Portable:</strong> Extract the ZIP and run RemoteControl.exe
                    </li>
                    <li>Launch GraalRC from the Start Menu or extracted folder</li>
                  </ol>
                </div>

                {/* macOS */}
                <div>
                  <h3 className="text-xl font-display text-graal-gold mb-3">macOS</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm">
                    <li>Download the DMG disk image</li>
                    <li>Open the .dmg file</li>
                    <li>Drag GraalRC to your Applications folder</li>
                    <li>Launch from Applications (right-click &gt; Open on first run)</li>
                  </ol>
                </div>

                {/* Linux */}
                <div>
                  <h3 className="text-xl font-display text-graal-gold mb-3">Linux</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm">
                    <li>
                      <strong>.deb:</strong>{' '}
                      <code className="text-xs bg-graal-darker/50 px-1.5 py-0.5 rounded">
                        sudo dpkg -i graalrc_*.deb
                      </code>
                    </li>
                    <li>
                      Fix deps if needed:{' '}
                      <code className="text-xs bg-graal-darker/50 px-1.5 py-0.5 rounded">
                        sudo apt-get install -f
                      </code>
                    </li>
                    <li>
                      <strong>tar.gz:</strong> Extract and run{' '}
                      <code className="text-xs bg-graal-darker/50 px-1.5 py-0.5 rounded">
                        ./RC-gtk3
                      </code>
                    </li>
                    <li>
                      Run:{' '}
                      <code className="text-xs bg-graal-darker/50 px-1.5 py-0.5 rounded">
                        graalrc
                      </code>{' '}
                      (from .deb) or{' '}
                      <code className="text-xs bg-graal-darker/50 px-1.5 py-0.5 rounded">
                        ./RC-gtk3
                      </code>{' '}
                      (from archive)
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Link to all releases */}
            <div className="text-center mt-8 mb-4">
              <a
                href={data.releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-graal-gold transition-colors inline-flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View all releases on GitHub
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
