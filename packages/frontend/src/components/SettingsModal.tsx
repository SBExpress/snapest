import { useAuth } from '../context/AuthContext'

interface SettingsModalProps {
  onClose: () => void
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const { logout, user } = useAuth()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-xl w-full max-w-md border border-slate-700">
        <div className="bg-slate-800 border-b border-slate-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button onClick={onClose} className="text-slate-400 text-2xl">✕</button>
        </div>
        <div className="p-8">
          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Account</h3>
            <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg mb-4 border border-slate-700">
              <p className="text-sm text-slate-400">Logged in as:</p>
              <p className="text-white font-medium">{user?.email}</p>
            </div>
            <button onClick={logout} className="w-full px-4 py-2 bg-red-600 bg-opacity-20 text-red-400 rounded-lg border border-red-600 border-opacity-30 font-medium">Logout</button>
          </div>
        </div>
        <div className="bg-slate-800 border-t border-slate-700 p-6 flex gap-4 justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-slate-700 text-slate-300 rounded-lg">Cancel</button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">Save</button>
        </div>
      </div>
    </div>
  )
}
