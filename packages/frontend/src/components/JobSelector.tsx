import { useState } from 'react'
import { useJobs } from '../context/JobContext'

interface JobSelectorProps {
  onClose: () => void
}

export default function JobSelector({ onClose }: JobSelectorProps) {
  const { jobs, currentJob, createJob, selectJob } = useJobs()
  const [newJobName, setNewJobName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateJob = async () => {
    if (!newJobName.trim()) return
    setIsCreating(true)
    await createJob(newJobName)
    setNewJobName('')
    setIsCreating(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-md max-h-96 overflow-y-auto border border-slate-700">
        <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Jobs</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">✕</button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {jobs.length === 0 ? (
              <p className="text-slate-400 text-center py-4">No jobs yet. Create one below!</p>
            ) : (
              jobs.map(job => (
                <button
                  key={job.id}
                  onClick={() => { selectJob(job.id); onClose() }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    currentJob?.id === job.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-700 bg-opacity-50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <p className="font-medium">{job.name}</p>
                  <p className="text-sm opacity-75">{job.description || 'No description'}</p>
                </button>
              ))
            )}
          </div>

          <div className="border-t border-slate-700 pt-4">
            <p className="text-sm text-slate-400 mb-2">Create New Job</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={newJobName}
                onChange={(e) => setNewJobName(e.target.value)}
                placeholder="Job name..."
                className="flex-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateJob()}
              />
              <button
                onClick={handleCreateJob}
                disabled={isCreating || !newJobName.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isCreating ? '...' : '+'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
