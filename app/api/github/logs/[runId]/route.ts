import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'TOONSLAB'
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME || 'rc'
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'dev-admin-key'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ runId: string }> }
) {
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

    const params = await context.params
    const runId = params.runId

    // Récupérer les jobs du workflow run
    const jobsResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/actions/runs/${runId}/jobs`,
      {
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    )

    if (!jobsResponse.ok) {
      const error = await jobsResponse.text()
      console.error('GitHub API Error:', error)
      return NextResponse.json(
        { error: 'Échec de récupération des jobs' },
        { status: jobsResponse.status }
      )
    }

    const jobsData = await jobsResponse.json()

    // Récupérer les logs pour chaque job
    const jobsWithLogs = await Promise.all(
      jobsData.jobs.map(async (job: any) => {
        try {
          const logsResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/actions/jobs/${job.id}/logs`,
            {
              headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
              },
            }
          )

          let logs = ''
          if (logsResponse.ok) {
            logs = await logsResponse.text()
          }

          return {
            ...job,
            logs,
          }
        } catch (error) {
          console.error(`Error fetching logs for job ${job.id}:`, error)
          return {
            ...job,
            logs: 'Erreur lors de la récupération des logs',
          }
        }
      })
    )

    return NextResponse.json({
      ...jobsData,
      jobs: jobsWithLogs,
    })
  } catch (error: any) {
    console.error('Logs error:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}
