export default function CloseoutScreen() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-slate-900">Closeout</h2>

        {/* Labor Rates Section */}
        <section className="mb-8 pb-8 border-b border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Labor Rates</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Level 1 Rate ($/hr)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Level 2 Rate ($/hr)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Level 3 Rate ($/hr)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Labor Burden (%)
                </label>
                <input
                  type="number"
                  placeholder="30"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tax Section */}
        <section className="mb-8 pb-8 border-b border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Tax</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sales Tax (%)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tax Calculation Mode
                </label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500">
                  <option>Mode A: Tax on raw material</option>
                  <option>Mode B: OH&P above tax</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Overhead & Profit Section */}
        <section className="mb-8 pb-8 border-b border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Overhead & Profit</h3>

          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 mb-3">Material</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Material Overhead (%)
                  </label>
                  <input
                    type="number"
                    placeholder="15"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Material Profit (%)
                  </label>
                  <input
                    type="number"
                    placeholder="12"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 mb-3">Labor</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Labor Overhead (%)
                  </label>
                  <input
                    type="number"
                    placeholder="15"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Labor Profit (%)
                  </label>
                  <input
                    type="number"
                    placeholder="12"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <div className="space-y-2 text-right">
          <div className="flex justify-between text-sm border-t border-slate-200 pt-4">
            <span className="text-slate-600">Total Material:</span>
            <span className="font-semibold">$0.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Total Labor:</span>
            <span className="font-semibold">$0.00</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-4 border-t border-slate-200">
            <span>Final Sell Price:</span>
            <span className="text-blue-600">$0.00</span>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Save (Ctrl+S)
          </button>
          <button className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
