import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function MaterialsScreen() {
  const { user } = useAuth()
  const [materials, setMaterials] = useState([])
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [unitCost, setUnitCost] = useState('')
  const [defaultUM, setDefaultUM] = useState('E')
  const [laborHours, setLaborHours] = useState('')
  const [laborUM, setLaborUM] = useState('E')
  const [csvText, setCsvText] = useState('')
  const [showImport, setShowImport] = useState(false)

  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const res = await fetch('/api/materials', {
        headers: { Authorization: `Bearer ${token}`, 'x-company-id': user.companyId },
      })
      if (res.ok) {
        const data = await res.json()
        setMaterials(data.materials)
      }
    } catch (err) {
      console.error('Error fetching materials:', err)
    }
  }

  const handleAdd = async () => {
    if (!name || !category || !unitCost || !laborHours) return
    try {
      const token = localStorage.getItem('auth_token')
      const res = await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'x-company-id': user.companyId },
        body: JSON.stringify({ name, category, unitCost, defaultUM, laborHours, laborUM }),
      })
      if (res.ok) {
        const data = await res.json()
        setMaterials([...materials, data.material])
        setName('')
        setCategory('')
        setUnitCost('')
        setLaborHours('')
      }
    } catch (err) {
      console.error('Error adding material:', err)
    }
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('auth_token')
      await fetch(`/api/materials/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, 'x-company-id': user.companyId },
      })
      setMaterials(materials.filter(m => m.id !== id))
    } catch (err) {
      console.error('Error deleting material:', err)
    }
  }

  const handleImport = async () => {
    if (!csvText.trim()) return
    try {
      const token = localStorage.getItem('auth_token')
      const res = await fetch('/api/materials/import/csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'x-company-id': user.companyId },
        body: JSON.stringify({ csv: csvText }),
      })
      if (res.ok) {
        setCsvText('')
        setShowImport(false)
        await fetchMaterials()
      }
    } catch (err) {
      console.error('Error importing:', err)
    }
  }

  const categories = [...new Set(materials.map(m => m.category))]

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">Materials Library</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">Add Material</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category (Wire, Conduit, Breaker)" className="px-4 py-2 border border-slate-300 rounded-lg" />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (10 AWG, 1 inch, etc)" className="px-4 py-2 border border-slate-300 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input type="number" value={unitCost} onChange={(e) => setUnitCost(e.target.value)} placeholder="Unit Cost" step="0.01" className="px-4 py-2 border border-slate-300 rounded-lg" />
          <select value={defaultUM} onChange={(e) => setDefaultUM(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-lg">
            <option value="E">Material UM: E (Each)</option>
            <option value="C">Material UM: C (Hundred)</option>
            <option value="M">Material UM: M (Thousand)</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input type="number" value={laborHours} onChange={(e) => setLaborHours(e.target.value)} placeholder="Labor Hours" step="0.01" className="px-4 py-2 border border-slate-300 rounded-lg" />
          <select value={laborUM} onChange={(e) => setLaborUM(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-lg">
            <option value="E">Labor UM: E (Each)</option>
            <option value="C">Labor UM: C (Hundred)</option>
            <option value="M">Labor UM: M (Thousand)</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button onClick={handleAdd} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Add Material</button>
          <button onClick={() => setShowImport(!showImport)} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">Import CSV</button>
        </div>
      </div>

      {showImport && (
        <div className="bg-blue-50 rounded-lg shadow-md p-6 mb-6 border-2 border-blue-200">
          <h3 className="text-lg font-bold mb-4">Import CSV</h3>
          <p className="text-sm text-slate-600 mb-4">Format: Category,Name,UnitCost,DefaultUM,LaborHours,LaborUM</p>
          <textarea value={csvText} onChange={(e) => setCsvText(e.target.value)} placeholder="Wire,10 AWG,0.25,M,0.1,M&#10;Wire,12 AWG,0.15,M,0.08,M" rows={6} className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-4 font-mono text-sm" />
          <div className="flex gap-2">
            <button onClick={handleImport} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">Import</button>
            <button onClick={() => setShowImport(false)} className="px-6 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 font-medium">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {categories.map(cat => (
          <div key={cat} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4 text-blue-600">{cat}</h3>
            <table className="w-full text-sm">
              <thead className="bg-slate-100 border-b">
                <tr>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-right px-4 py-2">Unit Cost</th>
                  <th className="text-center px-4 py-2">Material UM</th>
                  <th className="text-right px-4 py-2">Labor Hrs</th>
                  <th className="text-center px-4 py-2">Labor UM</th>
                  <th className="text-center px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {materials.filter(m => m.category === cat).map(m => (
                  <tr key={m.id} className="border-b hover:bg-slate-50">
                    <td className="px-4 py-2">{m.name}</td>
                    <td className="text-right px-4 py-2">${m.unitCost.toFixed(2)}</td>
                    <td className="text-center px-4 py-2">{m.defaultUM}</td>
                    <td className="text-right px-4 py-2">{m.laborHours.toFixed(2)}</td>
                    <td className="text-center px-4 py-2">{m.laborUM}</td>
                    <td className="text-center px-4 py-2"><button onClick={() => handleDelete(m.id)} className="text-red-600 hover:text-red-800 text-xs font-medium">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}
