import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

export interface Job {
  id: string
  name: string
  description?: string
  status: string
  createdAt: string
  updatedAt: string
}

interface JobContextType {
  jobs: Job[]
  currentJob: Job | null
  loading: boolean
  error: string | null
  createJob: (name: string, description?: string) => Promise<Job | null>
  selectJob: (jobId: string) => void
  fetchJobs: () => Promise<void>
}

const JobContext = createContext<JobContextType | undefined>(undefined)

export function JobProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [currentJob, setCurrentJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchJobs()
  }, [user])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('auth_token')
      if (!token || !user) return
      const res = await fetch('/api/jobs', { headers: { Authorization: `Bearer ${token}`, 'x-company-id': user.companyId } })
      if (res.ok) {
        const data = await res.json()
        setJobs(data.jobs || [])
        if (data.jobs?.length && !currentJob) setCurrentJob(data.jobs[0])
      }
    } catch (err) {
      console.error('Fetch jobs error:', err)
    } finally {
      setLoading(false)
    }
  }

  const createJob = async (name: string, description?: string): Promise<Job | null> => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token || !user) return null
      const res = await fetch('/api/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'x-company-id': user.companyId }, body: JSON.stringify({ name, description }) })
      if (res.ok) {
        const data = await res.json()
        const newJob = data.job
        setJobs([newJob, ...jobs])
        setCurrentJob(newJob)
        return newJob
      }
    } catch (err) {
      console.error('Create job error:', err)
    }
    return null
  }

  const selectJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId)
    if (job) setCurrentJob(job)
  }

  return <JobContext.Provider value={{ jobs, currentJob, loading, error, createJob, selectJob, fetchJobs }}>{children}</JobContext.Provider>
}

export function useJobs() {
  const context = useContext(JobContext)
  if (!context) throw new Error('useJobs must be used within JobProvider')
  return context
}
