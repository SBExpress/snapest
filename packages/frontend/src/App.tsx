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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-opacity-30 border-t-blue-500 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => {}} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-950 border-b border-blue-500 border-opacity-20 sticky top-0 z-20 shadow-lg">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                SnapEst
              </h1>
              <p className="text-xs text-slate-400">{currentJob?.name || 'No job selected'}</p>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => setShowJobs(true)}
              className="px-4 py-2 rounded-lg bg-slate-700 bg-opacity-50 text-slate-300 hover:text-white hover:bg-slate-600 transition-all border border-slate-600 border-opacity-50 font-medium"
            >
              📋 Jobs
            </button>

            <nav className="flex gap-1 bg-slate-900 bg-opacity-50 p-1 rounded-lg border border-slate-700 border-opacity-50">
              <button
                onClick={() => setCurrentScreen('job-details')}
                className={`px-4 py-2 rounded font-medium transition-all ${
                  currentScreen === 'job-details'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500 shadow-opacity-50'
                    : 'text-slate-300 hover:text-white

cat > src/App.tsx << 'EOF'
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-opacity-30 border-t-blue-500 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => {}} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-950 border-b border-blue-500 border-opacity-20 sticky top-0 z-20 shadow-lg">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                SnapEst
              </h1>
              <p className="text-xs text-slate-400">{currentJob?.name || 'No job selected'}</p>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => setShowJobs(true)}
              className="px-4 py-2 rounded-lg bg-slate-700 bg-opacity-50 text-slate-300 hover:text-white hover:bg-slate-600 transition-all border border-slate-600 border-opacity-50 font-medium"
            >
              📋 Jobs
            </button>

            <nav className="flex gap-1 bg-slate-900 bg-opacity-50 p-1 rounded-lg border border-slate-700 border-opacity-50">
              <button
                onClick={() => setCurrentScreen('job-details')}
                className={`px-4 py-2 rounded font-medium transition-all ${
                  currentScreen === 'job-details'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500 shadow-opacity-50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700 hover-bg-opacity-50'
                }`}
              >
                Job Details
              </button>
              <button
                onClick={() => setCurrentScreen('takeoff')}
                className={`px-4 py-2 rounded font-medium transition-all ${
                  currentScreen === 'takeoff'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500 shadow-opacity-50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700 hover-bg-opacity-50'
                }`}
              >
                Takeoff
              </button>
              <button
                onClick={() => setCurrentScreen('closeout')}
                className={`px-4 py-2 rounded font-medium transition-all ${
                  currentScreen === 'closeout'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500 shadow-opacity-50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700 hover-bg-opacity-50'
                }`}
              >
                Closeout
              </button>
            </nav>

            <button
              onClick={() => setShowSettings(true)}
              className="ml-4 px-4 py-2 rounded-lg bg-slate-700 bg-opacity-50 text-slate-300 hover:text-white hover:bg-slate-600 transition-all border border-slate-600 border-opacity-50 font-medium"
            >
              ⚙️ Settings
            </button>
          </div>
        </div>
      </header>

      <main className="p-8 max-w-full">
        {currentJob ? (
          <>
            {currentScreen === 'job-details' && <JobDetailsScreen />}
            {currentScreen === 'takeoff' && <TakeoffScreen />}
            {currentScreen === 'closeout' && <CloseoutScreen />}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-300 text-xl mb-4">No job selected</p>
            <button
              onClick={() => setShowJobs(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create or Select a Job
            </button>
          </div>
        )}
      </main>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showJobs && <JobSelector onClose={() => setShowJobs(false)} />}
    </div>
  )
}
