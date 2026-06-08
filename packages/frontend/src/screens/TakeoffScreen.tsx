export default function TakeoffScreen() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-slate-900">Takeoff</h2>

        <div className="mb-4 flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            + Add Item (Ctrl+A)
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            + Add Assembly (Ctrl+Shift+A)
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300">
                <th className="px-4 py-2 text-left font-semibold text-slate-900">Item #</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-900">Description</th>
                <th className="px-4 py-2 text-center font-semibold text-slate-900">Qty</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-900">Unit</th>
                <th className="px-4 py-2 text-right font-semibold text-slate-900">Mat Price</th>
                <th className="px-4 py-2 text-center font-semibold text-slate-900">L1 hrs</th>
                <th className="px-4 py-2 text-center font-semibold text-slate-900">L2 hrs</th>
                <th className="px-4 py-2 text-center font-semibold text-slate-900">L3 hrs</th>
                <th className="px-4 py-2 text-right font-semibold text-slate-900">Mat Total</th>
                <th className="px-4 py-2 text-right font-semibold text-slate-900">Labor Total</th>
                <th className="px-4 py-2 text-right font-semibold text-slate-900">Sell Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td colSpan={11} className="px-4 py-8 text-center text-slate-500">
                  No items added yet. Press Ctrl+A to add an item.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Material</h3>
          <p className="text-3xl font-bold text-slate-900">$0.00</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Labor</h3>
          <p className="text-3xl font-bold text-slate-900">$0.00</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Selling Price</h3>
          <p className="text-3xl font-bold text-blue-600">$0.00</p>
        </div>
      </div>
    </div>
  )
}
