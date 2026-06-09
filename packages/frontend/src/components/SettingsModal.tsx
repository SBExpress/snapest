import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

interface SettingsModalProps {
  onClose: () => void
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const { logout, user } = useAuth()
  const [laborLevel1Rate, setLaborLevel1Rate] = useState('25.00')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      alert('Settings saved!')
      onClose()
    } catch (err) {
      alert('Error saving settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-96 overflow-y-auto border border-slate-700">
        <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">✕</button>
        </div>

        <div className="p-8 space-y-8">
          <section className="border-t border-slate-700 pt-6">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Account</h3>
            <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg border border-slate-700 border-opacity-50 mb-4">
              <p className="text-sm text-slate-400">Logged in as:</p>
              <p className="text-white font-medium">{user?.email}</p>
            </div>
            <button onClick={logout} className="w-full px-4 py-2 rounded-lg bg-red-600 bg-opacity-20 text-red-400 hover:bg-opacity-30 border border-red-600 border-opacity-30 transition-all duration-200 font-medium">
              Logout
            </button>
          </section>
        </div>

        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6 flex gap-4 justify-end">
          <button onClick={onClose} className="px-6 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </div>
  )
}
