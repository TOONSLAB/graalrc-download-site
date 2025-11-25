import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'TOONSLAB'
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME || 'rc'
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'dev-admin-key'

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'API key
    const apiKey = request.headers.get('x-api-key')
    if (apiKey !== ADMIN_API_KEY) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 403 }
      )
    }

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'Token GitHub non configuré' },
        { status: 500 }
      )
    }

    // Récupérer les workflow runs récents
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/actions/runs?per_page=20`,
      {
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('GitHub API Error:', error)
      return NextResponse.json(
        { error: 'Échec de récupération des workflows' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Workflows error:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}
