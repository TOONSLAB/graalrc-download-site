'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type WorkflowRun = {
  id: number
  name: string
  status: string
  conclusion: string | null
  created_at: string
  updated_at: string
  html_url: string
  run_number: number
}

type Job = {
  id: number
  name: string
  status: string
  conclusion: string | null
  started_at: string
  completed_at: string | null
  logs?: string
}

export default function AdminPage() {
  const [apiKey, setApiKey] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [version, setVersion] = useState('1.0.3')
  const [isTriggering, setIsTriggering] = useState(false)
  const [workflows, setWorkflows] = useState<WorkflowRun[]>([])
  const [selectedRun, setSelectedRun] = useState<number | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoadingWorkflows, setIsLoadingWorkflows] = useState(false)
  const [isLoadingLogs, setIsLoadingLogs] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const loadWorkflows = async () => {
    if (!apiKey) return
    setIsLoadingWorkflows(true)
    setError(null)
    
    try {
      const response = await fetch('/api/github/workflows', {
        headers: { 'x-api-key': apiKey },
      })

      if (!response.ok) {
        if (response.status === 403) {
          setIsAuthenticated(false)
          setError('API key invalide')
        }
        throw new Error('Échec du chargement des workflows')
      }

      const data = await response.json()
      setWorkflows(data.workflow_runs || [])
      setIsAuthenticated(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoadingWorkflows(false)
    }
  }

  const loadLogs = async (runId: number) => {
    if (!apiKey) return
    setIsLoadingLogs(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/github/logs/${runId}`, {
        headers: { 'x-api-key': apiKey },
      })

      if (!response.ok) {
        throw new Error('Échec du chargement des logs')
      }

      const data = await response.json()
      setJobs(data.jobs || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoadingLogs(false)
    }
  }

  const triggerBuild = async () => {
    if (!apiKey) return
    setIsTriggering(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/github/trigger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          version,
          workflow: 'build-professional-installers.yml',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Échec du déclenchement')
      }

      setSuccess(data.message)
      setTimeout(() => loadWorkflows(), 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsTriggering(false)
    }
  }

  const handleLogin = () => {
    if (apiKey) {
      loadWorkflows()
    }
  }

  useEffect(() => {
    if (isAuthenticated && apiKey) {
      loadWorkflows()
    }
  }, [])

  useEffect(() => {
    if (selectedRun && apiKey) {
      loadLogs(selectedRun)
    }
  }, [selectedRun])

  useEffect(() => {
    if (!autoRefresh || !isAuthenticated) return

    const interval = setInterval(() => {
      if (apiKey) {
        loadWorkflows()
        if (selectedRun) {
          loadLogs(selectedRun)
        }
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [autoRefresh, selectedRun, isAuthenticated, apiKey])

  const getStatusBadge = (status: string, conclusion: string | null) => {
    if (status === 'completed') {
      if (conclusion === 'success') {
        return <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 border border-green-200">Success</span>
      }
      if (conclusion === 'failure') {
        return <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 border border-red-200">Failed</span>
      }
      if (conclusion === 'cancelled') {
        return <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">Cancelled</span>
      }
    }
    if (status === 'in_progress') {
      return <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1"><span className="animate-pulse">●</span> In Progress</span>
    }
    if (status === 'queued') {
      return <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 border border-gray-200">Queued</span>
    }
    return <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 border border-gray-200">{status}</span>
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-sm text-gray-500">Enter your API key to access the build dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="dev-admin-key"
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={!apiKey || isLoadingWorkflows}
              className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoadingWorkflows ? 'Verifying...' : 'Access Dashboard'}
            </button>

            <p className="text-xs text-center text-gray-500">
              Default: <code className="px-1 py-0.5 bg-gray-100 rounded">dev-admin-key</code>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-lg bg-white/95">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Build Dashboard</h1>
                <p className="text-sm text-gray-500">GitHub Actions Administration</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Auto-refresh</span>
              </label>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-medium text-red-900">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="font-medium text-green-900">Success</h3>
              <p className="text-sm text-green-700 mt-1">{success}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">New Build</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Version Number</label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="1.0.3"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-2">Semantic versioning: X.Y.Z</p>
                </div>

                <button
                  onClick={triggerBuild}
                  disabled={isTriggering || !version}
                  className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isTriggering ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Triggering...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Trigger Build</span>
                    </>
                  )}
                </button>

                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-xs text-blue-900 leading-relaxed">
                    <strong>Note:</strong> Builds take ~15-20 minutes and generate installers for Windows, macOS, and Linux.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Recent Workflows</h2>
                </div>
                <button
                  onClick={() => loadWorkflows()}
                  disabled={isLoadingWorkflows}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {isLoadingWorkflows ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                </button>
              </div>

              {isLoadingWorkflows ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <p className="text-sm text-gray-500">Chargement des workflows...</p>
                  </div>
                </div>
              ) : workflows.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-sm text-gray-500">Aucun workflow trouvé</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {workflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedRun === workflow.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedRun(workflow.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900">{workflow.name}</h3>
                            <span className="text-xs text-gray-500">#{workflow.run_number}</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Démarré {new Date(workflow.created_at).toLocaleString('fr-FR')}
                          </p>
                        </div>
                        {getStatusBadge(workflow.status, workflow.conclusion)}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <a
                          href={workflow.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Voir sur GitHub
                        </a>
                        {workflow.updated_at !== workflow.created_at && (
                          <span>Mis à jour {new Date(workflow.updated_at).toLocaleString('fr-FR')}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedRun && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Logs de Build</h2>
                  </div>
                  <button
                    onClick={() => setSelectedRun(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {isLoadingLogs ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <p className="text-sm text-gray-500">Chargement des logs...</p>
                    </div>
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm text-gray-500">Aucun log disponible</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div key={job.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-gray-900">{job.name}</span>
                            {getStatusBadge(job.status, job.conclusion)}
                          </div>
                          {job.started_at && (
                            <span className="text-xs text-gray-500">
                              {new Date(job.started_at).toLocaleString('fr-FR')}
                            </span>
                          )}
                        </div>
                        {job.logs && (
                          <div className="bg-gray-900 p-4 overflow-x-auto">
                            <pre className="text-xs text-green-400 font-mono leading-relaxed whitespace-pre-wrap break-words">
                              {job.logs}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
