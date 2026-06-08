import { useState } from 'react'
import JobDetailsScreen from './screens/JobDetailsScreen'
import TakeoffScreen from './screens/TakeoffScreen'
import CloseoutScreen from './screens/CloseoutScreen'

type Screen = 'job-details' | 'takeoff' | 'closeout'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('job-details')

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">SnapEst</h1>
          <div className="flex gap-4">
            <button
              onClick={() => handleScreenChange('job-details')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentScreen === 'job-details'
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Job Details (F5)
            </button>
            <button
              onClick={() => handleScreenChange('takeoff')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentScreen === 'takeoff'
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Takeoff (F6)
            </button>
            <button
              onClick={() => handleScreenChange('closeout')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentScreen === 'closeout'
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Closeout (F7)
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {currentScreen === 'job-details' && <JobDetailsScreen />}
        {currentScreen === 'takeoff' && <TakeoffScreen />}
        {currentScreen === 'closeout' && <CloseoutScreen />}
      </main>
    </div>
  )
}
