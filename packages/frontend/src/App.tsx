import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import LoginScreen from './screens/LoginScreen'
import JobDetailsScreen from './screens/JobDetailsScreen'
import TakeoffScreen from './screens/TakeoffScreen'
import CloseoutScreen from './screens/CloseoutScreen'
import SettingsModal from './components/SettingsModal'

type Screen = 'job-details' | 'takeoff' | 'closeout'

export default function App() {
  const { loading, isAuthenticated } = useAuth()
  const [currentScreen, setCurrentScreen] = useState<Screen>('job-details')
  const [showSettings, setShowSettings] = useState(false)

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-4"></div>
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
      <header className="bg-slate-950 border-b border-blue-500/20 sticky top-0 z-20 shadow-lg">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              SnapEst
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <nav className="flex gap-1 bg-slate-900/50 p-1 rounded-lg border border-slate-700/50">
              <button onClick={() => handleScreenChange('job-details')} className={`px-4 py-2 rounded font-medium transition-all duration-200 ${currentScreen === 'job-details' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}>
                Job Details
              </button>
              <button onClick={() => handleScreenChange('takeoff')} className={`px-4 py-2 rounded font-medium transition-all duration-200 ${currentScreen === 'takeoff' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}>
                Takeoff
              </button>
              <button onClick={() => handleScreenChange('closeout')} className={`px-4 py-2 rounded font-medium transition-all duration-200 ${currentScreen === 'closeout' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}>
                Closeout
              </button>
            </nav>
            <button onClick={() => setShowSettings(true)} className="ml-4 px-4 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-600/70 transition-all duration-200 border border-slate-600/50 font-medium">
              ⚙️ Settings
            </button>
          </div>
        </div>
      </header>

      <main className="p-8 max-w-full">
        {currentScreen === 'job-details' && <JobDetailsScreen />}
        {currentScreen === 'takeoff' && <TakeoffScreen />}
        {currentScreen === 'closeout' && <CloseoutScreen />}
      </main>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  )
}
