export default function JobDetailsScreen() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-slate-900">Job Details</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Estimate Number
              </label>
              <input
                type="text"
                placeholder="EST-001"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                placeholder="Project Name"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Customer / GC
              </label>
              <input
                type="text"
                placeholder="Customer Name"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500">
                <option>Draft</option>
                <option>Submitted</option>
                <option>Won</option>
                <option>Lost</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="Job Address"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Scope Summary
            </label>
            <textarea
              placeholder="Describe the work scope..."
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Bid Due Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
              />
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
    </div>
  )
}
