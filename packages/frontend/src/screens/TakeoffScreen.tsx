import { useState, useEffect } from 'react'
import { useJobs } from '../context/JobContext'
import { useAuth } from '../context/AuthContext'

const UM_FACTORS = { E: 1, C: 100, M: 1000 }

export default function TakeoffScreen() {
  const { currentJob } = useJobs()
  const { user } = useAuth()
  const [takeoffs, setTakeoffs] = useState([])
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [materialUM, setMaterialUM] = useState('E')
  const [materialUnitCost, setMaterialUnitCost] = useState('')
  const [laborUM, setLaborUM] = useState('E')
  const [laborHours, setLaborHours] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentJob) fetchTakeoffs()
  }, [currentJob?.id])

  const fetchTakeoffs = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const res = await fetch(`/api/takeoffs/${currentJob.id}`, {
        headers: { Authorization: `Bearer ${token}`, 'x-company-id': user.companyId },
      })
      if (res.ok) {
        const data = await res.json()
        setTakeoffs(data.takeoffs)
      }
    } catch (err) {
      console.error('Error fetching takeoffs:', err)
    }
  }

  const handleAdd = async () => {
    if (!description || !quantity || !materialUnitCost || !laborHours) return
    setLoading(true)
    try {
      const token = localStorage.getItem('auth_token')
      const res = await fetch(`/api/takeoffs/${currentJob.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'x-company-id': user.companyId },
        body: JSON.stringify({ description, quantity: parseFloat(quantity), materialUM, materialUnitCost: parseFloat(materialUnitCost), laborUM, laborHours: parseFloat(laborHours), notes }),
      })
      if (res.ok) {
        const data = await res.json()
        setTakeoffs([...takeoffs, data.takeoff])
        setDescription('')
        setQuantity('')
        setMaterialUnitCost('')
        setLaborHours('')
        setNotes('')
      }
    } catch (err) {
      console.error('Error adding takeoff:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('auth_token')
      await fetch(`/api/takeoffs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, 'x-company-id': user.companyId },
      })
      setTakeoffs(takeoffs.filter(t => t.id !== id))
    } catch (err) {
      console.error('Error deleting takeoff:', err)
    }
  }

  const calcMaterialCost = (qty, um, cost) => {
    if (!qty || !cost) return 0
    return (parseFloat(qty) / UM_FACTORS[um]) * parseFloat(cost)
  }

  const calcLaborHours = (qty, um, hours) => {
    if (!qty || !hours) return 0
    return (parseFloat(qty) / UM_FACTORS[um]) * parseFloat(hours)
  }

  const totalMaterial = takeoffs.reduce((sum, t) => sum + calcMaterialCost(t.quantity, t.materialUM, t.materialUnitCost), 0)
  const totalLabor = takeoffs.reduce((sum, t) => sum + calcLaborHours(t.quantity, t.laborUM, t.laborHours), 0)

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">Takeoff</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">Add Item</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="px-4 py-2 border border-slate-300 rounded-lg" />
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" className="px-4 py-2 border border-slate-300 rounded-lg" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Material UM</label>
            <select value={materialUM} onChange={(e) => setMaterialUM(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg">
              <option value="E">E (Each = 1)</option>
              <option value="C">C (Hundred = 100)</option>
              <option value="M">M (Thousand = 1000)</option>
            </select>
          </div>
          <input type="number" value={materialUnitCost} onChange={(e) => setMaterialUnitCost(e.target.value)} placeholder="Material Unit Cost" step="0.01" className="px-4 py-2 border border-slate-300 rounded-lg" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Labor UM</label>
            <select value={laborUM} onChange={(e) => setLaborUM(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg">
              <option value="E">E (Each = 1)</option>
              <option value="C">C (Hundred = 100)</option>
              <option value="M">M (Thousand = 1000)</option>
            </select>
          </div>
          <input type="number" value={laborHours} onChange={(e) => setLaborHours(e.target.value)} placeholder="Labor Hours" step="0.01" className="px-4 py-2 border border-slate-300 rounded-lg" />
        </div>
        
        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-4" />
        
        <button onClick={handleAdd} disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50">
          {loading ? 'Adding...' : 'Add Item'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Items</h3>
        <table className="w-full text-sm">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="text-left px-4 py-2">Description</th>
              <th className="text-right px-4 py-2">Qty</th>
              <th className="text-right px-4 py-2">Material Cost</th>
              <th className="text-right px-4 py-2">Labor Hrs</th>
              <th className="text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {takeoffs.map((t) => (
              <tr key={t.id} className="border-b hover:bg-slate-50">
                <td className="px-4 py-2">{t.description}</td>
                <td className="text-right px-4 py-2">{t.quantity}</td>
                <td className="text-right px-4 py-2">${calcMaterialCost(t.quantity, t.materialUM, t.materialUnitCost).toFixed(2)}</td>
                <td className="text-right px-4 py-2">{calcLaborHours(t.quantity, t.laborUM, t.laborHours).toFixed(2)}</td>
                <td className="text-center px-4 py-2">
                  <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:text-red-800 text-xs font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-6 pt-4 border-t text-right text-lg font-bold">
          <div>Total Material Cost: ${totalMaterial.toFixed(2)}</div>
          <div>Total Labor Hours: {totalLabor.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}
