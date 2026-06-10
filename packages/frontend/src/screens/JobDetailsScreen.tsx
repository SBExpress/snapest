import { useState, useEffect } from 'react'
import { useJobs } from '../context/JobContext'
import { useAuth } from '../context/AuthContext'

export default function JobDetailsScreen() {
  const { currentJob } = useJobs()
  const { user } = useAuth()
  const [estimateNumber, setEstimateNumber] = useState('')
  const [projectName, setProjectName] = useState('')
  const [customer, setCustomer] = useState('')
  const [status, setStatus] = useState('Draft')
  const [address, setAddress] = useState('')
  const [scopeSummary, setScopeSummary] = useState('')
  const [bidDueDate, setBidDueDate] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (currentJob) {
      setEstimateNumber(currentJob.name || '')
      setProjectName(currentJob.description || '')
      setStatus(currentJob.status || 'Draft')
    }
  }, [currentJob])

  const handleSave = async () => {
    if (!currentJob || !user) return
    setSaving(true)
    try {
      const token = localStorage.getItem('auth_token')
      const res = await fetch(`/api/jobs/${currentJob.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-company-id': user.companyId,
        },
        body: JSON.stringify({ name: estimateNumber, description: projectName, status }),
      })
      if (res.ok) alert('Job saved!')
    } catch (err) {
      console.error('Save error:', err)
      alert('Error saving job')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (currentJob) {
      setEstimateNumber(currentJob.name || '')
      setProjectName(currentJob.description || '')
      setStatus(currentJob.status || 'Draft')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-slate-900">Job Details</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Estimate Number</label>
              <input type="text" value={estimateNumber} onChange={(e) => setEstimateNumber(e.target.value)} placeholder="EST-001" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Project Name</label>
              <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Customer / GC</label>
              <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Customer Name" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500">
                <option>Draft</option>
                <option>Submitted</option>
                <option>Won</option>
                <option>Lost</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Job Address" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Scope Summary</label>
            <textarea value={scopeSummary} onChange={(e) => setScopeSummary(e.target.value)} placeholder="Describe the work scope..." rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Bid Due Date</label>
              <input type="date" value={bidDueDate} onChange={(e) => setBidDueDate(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500" />
            </div>
          </div>
          <div className="flex gap-4 pt-6">
            <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
            <button onClick={handleCancel} className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
