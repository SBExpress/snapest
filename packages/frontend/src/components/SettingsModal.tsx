import { useState } from 'react'

interface SettingsModalProps {
  onClose: () => void
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const [laborLevel1Name, setLaborLevel1Name] = useState('Apprentice')
  const [laborLevel2Name, setLaborLevel2Name] = useState('Journeyman')
  const [laborLevel3Name, setLaborLevel3Name] = useState('Foreman')

  const [laborLevel1Rate, setLaborLevel1Rate] = useState('25.00')
  const [laborLevel2Rate, setLaborLevel2Rate] = useState('45.00')
  const [laborLevel3Rate, setLaborLevel3Rate] = useState('65.00')

  const [laborBurden, setLaborBurden] = useState('30')
  const [salesTax, setSalesTax] = useState('6.625')
  const [materialOverhead, setMaterialOverhead] = useState('15')
  const [materialProfit, setMaterialProfit] = useState('12')
  const [laborOverhead, setLaborOverhead] = useState('15')
  const [laborProfit, setLaborProfit] = useState('12')

  const handleSave = () => {
    // TODO: Save settings to state/backend
    alert('Settings saved!')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Labor Settings */}
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2">
              👷 Labor Settings
            </h3>
            <div className="grid grid-cols-2 gap-6 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Level 1 Name
                </label>
                <input
                  type="text"
                  value={laborLevel1Name}
                  onChange={(e) => setLaborLevel1Name(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Level 1 Rate ($/hr)
                </label>
                <input
                  type="number"
                  value={laborLevel1Rate}
                  onChange={(e) => setLaborLevel1Rate(e.target.value)}
                  step="0.01"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Level 2 Name
                </label>
                <input
                  type="text"
                  value={laborLevel2Name}
                  onChange={(e) => setLaborLevel2Name(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Level 2 Rate ($/hr)
                </label>
                <input
                  type="number"
                  value={laborLevel2Rate}
                  onChange={(e) => setLaborLevel2Rate(e.target.value)}
                  step="0.01"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Level 3 Name
                </label>
                <input
                  type="text"
                  value={laborLevel3Name}
                  onChange={(e) => setLaborLevel3Name(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Level 3 Rate ($/hr)
                </label>
                <input
                  type="number"
                  value={laborLevel3Rate}
                  onChange={(e) => setLaborLevel3Rate(e.target.value)}
                  step="0.01"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Labor Burden (%)
                </label>
                <input
                  type="number"
                  value={laborBurden}
                  onChange={(e) => setLaborBurden(e.target.value)}
                  step="0.01"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </section>

          {/* Tax Settings */}
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2">
              💰 Tax Settings
            </h3>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Sales Tax (%)
              </label>
              <input
                type="number"
                value={salesTax}
                onChange={(e) => setSalesTax(e.target.value)}
                step="0.001"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </section>

          {/* Overhead & Profit */}
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2">
              📊 Overhead & Profit
            </h3>
            <div className="grid grid-cols-2 gap-6 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Material Overhead (%)
                </label>
                <input
                  type="number"
                  value={materialOverhead}
                  onChange={(e) => setMaterialOverhead(e.target.value)}
                  step="0.01"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Material Profit (%)
                </label>
                <input
                  type="number"
                  value={materialProfit}
                  onChange={(e) => setMaterialProfit(e.target.value)}
                  step="0.01"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Labor Overhead (%)
                </label>
                <input
                  type="number"
                  value={laborOverhead}
                  onChange={(e) => setLaborOverhead(e.target.value)}
                  step="0.01"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Labor Profit (%)
                </label>
                <input
                  type="number"
                  value={laborProfit}
                  onChange={(e) => setLaborProfit(e.target.value)}
                  step="0.01"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6 flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/50 font-medium"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
