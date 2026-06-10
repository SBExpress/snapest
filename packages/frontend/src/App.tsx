import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import { useJobs } from './context/JobContext'
import LoginScreen from './screens/LoginScreen'
import JobDetailsScreen from './screens/JobDetailsScreen'
import TakeoffScreen from './screens/TakeoffScreen'
import CloseoutScreen from './screens/CloseoutScreen'
import SettingsModal from './components/SettingsModal'
import JobSelector from './components/JobSelector'

type Screen = 'job-details' | 'takeoff' | 'closeout'

export default function App() {
  const { loading, isAuthenticated } = useAuth()
  const { currentJob } = useJobs()
  const [currentScreen, setCurrentScreen] = useState<Screen>('job-details')
  const [showSettings, setShowSettings] = useState(false)
  const [showJobs, setShowJobs] = useState(false)

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><p className="text-slate-300">Loading...</p></div>
  if (!isAuthenticated) return <LoginScreen onLoginSuccess={() => {}} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-950 border-b border-blue-500 border-opacity-20 sticky top-0 z-20 shadow-lg">
        <div className="px-8 py-4 flex items-center justify-between">
          <div><h1 className="text-3xl font-bold text-blue-400">SnapEst</h1><p className="text-xs text-slate-400">{currentJob?.name || 'No job'}</p></div>
          <div className="flex gap-2"><button onClick={() => setShowJobs(true)} className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-medium">Jobs</button><nav className="flex gap-1 bg-slate-900 p-1 rounded-lg"><button onClick={() => setCurrentScreen('job-details')} className={currentScreen === 'job-details' ? 'px-4 py-2 bg-blue-600 text-white rounded' : 'px-4 py-2 text-slate-300'}>Details</button><button onClick={() => setCurrentScreen('takeoff')} className={currentScreen === 'takeoff' ? 'px-4 py-2 bg-blue-600 text-white rounded' : 'px-4 py-2 text-slate-300'}>Takeoff</button><button onClick={() => setCurrentScreen('closeout')} className={currentScreen === 'closeout' ? 'px-4 py-2 bg-blue-600 text-white rounded' : 'px-4 py-2 text-slate-300'}>Closeout</button></nav><button onClick={() => setShowSettings(true)} className="px-4 py-2 bg-slate-700 rounded-lg">Settings</button></div>
        </div>
      </header>
      <main className="p-8">{currentJob ? <>{currentScreen === 'job-details' && <JobDetailsScreen />}{currentScreen === 'takeoff' && <TakeoffScreen />}{currentScreen === 'closeout' && <CloseoutScreen />}</> : <div className="text-center py-20"><p className="text-slate-300 mb-4">No job selected</p><button onClick={() => setShowJobs(true)} className="px-6 py-3 bg-blue-600 text-white rounded-lg">Create or Select</button></div>}</main>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showJobs && <JobSelector onClose={() => setShowJobs(false)} />}
    </div>
  )
}
