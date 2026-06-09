import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

interface SettingsModalProps {
  onClose: () => void
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const { logout, user } = useAuth()
  const [laborLevel1Rate, setLaborLevel1Rate] = useState('25.00')
  const [laborLevel2Rate, setLaborLevel2Rate] = useState('45.00')
  const [laborLevel3Rate, setLaborLevel3Rate] = useState('65.00')
  const [laborBurden, setLaborBurden] = useState('30')
  const [salesTax, setSalesTax] = useState('6.625')
  const [materialOverhead, setMaterialOverhead] = useState('15')
  const [materialProfit, setMaterialProfit] = useState('12')
  const [laborOverhead, setLaborOverhead] = useState('15')
  const [laborProfit, setLaborProfit] = useState('12')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) return
      const res = await fetch('/api/settings', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setLaborLevel1Rate(String(data.laborLevel1Rate))
        setLaborLevel2Rate(String(data.laborLevel2Rate))
        setLaborLevel3Rate(String(data.laborLevel3Rate))
        setLaborBurden(String(data.laborBurdenPercent))
        setSalesTax(String(data.materialSalesTaxPercent))
        setMaterialOverhead(String(data.materialOverheadPercent))
        setMaterialProfit(String(data.materialProfitPercent))
        setLaborOverhead(String(data.laborOverheadPercent))
        setLaborProfit(String(data.laborProfitPercent))
      }
    } catch (err) {
      console.error('Error loading settings:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        alert('Not authenticated')
        return
      }
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          laborLevel1Name: 'Apprentice',
          laborLevel2Name: 'Journeyman',
          laborLevel3Name: 'Foreman',
          laborLevel1Rate,
          laborLevel2Rate,
          laborLevel3Rate,
          laborBurdenPercent: laborBurden,
          materialSalesTaxPercent: salesTax,
          materialOverheadPercent: materialOverhead,
          materialProfitPercent: materialProfit,
          laborOverheadPercent: laborOverhead,
          laborProfitPercent: laborProfit,
        }),
      })
      const data = await res.json()
      console.log('Settings saved:', data)
      alert('Settings saved!')
      onClose()
    } catch (err) {
      console.error('Error saving:', err)
      alert('Error saving settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700">
        <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">✕</button>
        </div>

        <div className="p-8 space-y-8">
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-6">👷 Labor Rates</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-300">Level 1 Rate ($/hr)</label>
                <input type="number" value={laborLevel1Rate} onChange={(e) => setLaborLevel1Rate(e.target.value)} step="0.01" className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600" />
              </div>
              <div>
                <label className="text-sm text-slate-300">Level 2 Rate ($/hr)</label>
                <input type="number" value={laborLevel2Rate} onChange={(e) => setLaborLevel2Rate(e.target.value)} step="0.01" className="w-full mt-1 px-3

cat > packages/frontend/src/components/SettingsModal.tsx << 'ENDFILE'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

interface SettingsModalProps {
  onClose: () => void
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const { logout, user } = useAuth()
  const [laborLevel1Rate, setLaborLevel1Rate] = useState('25.00')
  const [laborLevel2Rate, setLaborLevel2Rate] = useState('45.00')
  const [laborLevel3Rate, setLaborLevel3Rate] = useState('65.00')
  const [laborBurden, setLaborBurden] = useState('30')
  const [salesTax, setSalesTax] = useState('6.625')
  const [materialOverhead, setMaterialOverhead] = useState('15')
  const [materialProfit, setMaterialProfit] = useState('12')
  const [laborOverhead, setLaborOverhead] = useState('15')
  const [laborProfit, setLaborProfit] = useState('12')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) return
      const res = await fetch('/api/settings', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setLaborLevel1Rate(String(data.laborLevel1Rate))
        setLaborLevel2Rate(String(data.laborLevel2Rate))
        setLaborLevel3Rate(String(data.laborLevel3Rate))
        setLaborBurden(String(data.laborBurdenPercent))
        setSalesTax(String(data.materialSalesTaxPercent))
        setMaterialOverhead(String(data.materialOverheadPercent))
        setMaterialProfit(String(data.materialProfitPercent))
        setLaborOverhead(String(data.laborOverheadPercent))
        setLaborProfit(String(data.laborProfitPercent))
      }
    } catch (err) {
      console.error('Error loading settings:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        alert('Not authenticated')
        return
      }
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          laborLevel1Name: 'Apprentice',
          laborLevel2Name: 'Journeyman',
          laborLevel3Name: 'Foreman',
          laborLevel1Rate,
          laborLevel2Rate,
          laborLevel3Rate,
          laborBurdenPercent: laborBurden,
          materialSalesTaxPercent: salesTax,
          materialOverheadPercent: materialOverhead,
          materialProfitPercent: materialProfit,
          laborOverheadPercent: laborOverhead,
          laborProfitPercent: laborProfit,
        }),
      })
      const data = await res.json()
      console.log('Settings saved:', data)
      alert('Settings saved!')
      onClose()
    } catch (err) {
      console.error('Error saving:', err)
      alert('Error saving settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700">
        <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">✕</button>
        </div>

        <div className="p-8 space-y-8">
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-6">👷 Labor Rates</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-300">Level 1 Rate ($/hr)</label>
                <input type="number" value={laborLevel1Rate} onChange={(e) => setLaborLevel1Rate(e.target.value)} step="0.01" className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600" />
              </div>
              <div>
                <label className="text-sm text-slate-300">Level 2 Rate ($/hr)</label>
                <input type="number" value={laborLevel2Rate} onChange={(e) => setLaborLevel2Rate(e.target.value)} step="0.01" className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600" />
              </div>
              <div>
                <label className="text-sm text-slate-300">Level 3 Rate ($/hr)</label>
                <input type="number" value={laborLevel3Rate} onChange={(e) => setLaborLevel3Rate(e.target.value)} step="0.01" className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600" />
              </div>
              <div>
                <label className="text-sm text-slate-300">Labor Burden (%)</label>
                <input type="number" value={laborBurden} onChange={(e) => setLaborBurden(e.target.value)} step="0.01" className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600" />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-6">💰 Tax & Overhead</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-300">Sales Tax (%)</label>
                <input type="number" value={salesTax} onChange={(e) => setSalesTax(e.target.value)} step="0.001" className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600" />
              </div>
              <div>
                <label className="text-sm text-slate-300">Material Overhead (%)</label>
                <input type="number" value={materialOverhead} onChange={(e) => setMaterialOverhead(e.target.value)} step="0.01" className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600" />
              </div>
              <div>
                <label className="text-sm text-slate-300">Material Profit (%)</label>
                <input type="number" value={materialProfit} onChange={(e) => setMaterialProfit(e.target.value)} step="0.01" className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600" />
              </div>
              <div>
                <label className="text-sm text-slate-300">Labor Overhead (%)</label>
                <input type="number" value={laborOverhead} onChange={(e) => setLaborOverhead(e.target.value)} step="0.01" className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600" />
              </div>
              <div>
                <label className="text-sm text-slate-300">Labor Profit (%)</label>
                <input type="number" value={laborProfit} onChange={(e) => setLaborProfit(e.target.value)} step="0.01" className="w-full mt-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600" />
              </div>
            </div>
          </section>

          <section className="border-t border-slate-700 pt-6">
            <h3 className="text-xl font-bold text-blue-400 mb-4">👤 Account</h3>
            <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-700/50 mb-4">
              <p className="text-sm text-slate-400">Logged in as:</p>
              <p className="text-white font-medium">{user?.email}</p>
            </div>
            <button onClick={logout} className="w-full px-4 py-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-600/30 transition-all duration-200 font-medium">
              Logout
            </button>
          </section>
        </div>

        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6 flex gap-4 justify-end">
          <button onClick={onClose} className="px-6 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">{saving ? 'Saving...' : 'Save Settings'}</button>
        </div>
      </div>
    </div>
  )
}
