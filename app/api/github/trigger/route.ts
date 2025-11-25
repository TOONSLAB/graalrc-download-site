import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'TOONSLAB'
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME || 'rc'
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'dev-admin-key'

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'API key
    const apiKey = request.headers.get('x-api-key')
    if (apiKey !== ADMIN_API_KEY) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 403 }
      )
    }

    const { version, workflow } = await request.json()

    if (!version) {
      return NextResponse.json(
        { error: 'Version requise' },
        { status: 400 }
      )
    }

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'Token GitHub non configuré' },
        { status: 500 }
      )
    }

    // Déclencher le workflow GitHub Actions
    const workflowId = workflow || 'build-professional-installers.yml'
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/actions/workflows/${workflowId}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: 'main',
          inputs: {
            version: version,
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('GitHub API Error:', error)
      return NextResponse.json(
        { error: 'Échec du déclenchement du workflow', details: error },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Compilation déclenchée pour la version ${version}`,
      workflow: workflowId,
    })
  } catch (error: any) {
    console.error('Trigger error:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}
