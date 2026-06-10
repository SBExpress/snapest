import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

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
  const [jobs, setJobs] = useState<Job[]>([])
  const [currentJob, setCurrentJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('auth_token')
      if (!token) return

      const res = await fetch('/api/jobs', {
        headers: { 'Authorization': `Bearer ${token}` },
      })

      if (res.ok) {
        const data = await res.json()
        setJobs(data.jobs)
        if (data.jobs.length > 0 && !currentJob) {
          setCurrentJob(data.jobs[0])
        }
      }
    } catch (err) {
      console.error('Error fetching jobs:', err)
      setError('Failed to load jobs')
    } finally {
      setLoading(false)
    }
  }

  const createJob = async (name: string, description?: string): Promise<Job | null> => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) return null

      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
      })

      if (res.ok) {
        const data = await res.json()
        const newJob = data.job
        setJobs([newJob, ...jobs])
        setCurrentJob(newJob)
        return newJob
      }
    } catch (err) {
      console.error('Error creating job:', err)
      setError('Failed to create job')
    }
    return null
  }

  const selectJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId)
    if (job) {
      setCurrentJob(job)
    }
  }

  return (
    <JobContext.Provider value={{ jobs, currentJob, loading, error, createJob, selectJob, fetchJobs }}>
      {children}
    </JobContext.Provider>
  )
}

export function useJobs() {
  const context = useContext(JobContext)
  if (!context) {
    throw new Error('useJobs must be used within JobProvider')
  }
  return context
}
