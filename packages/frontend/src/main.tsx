import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { JobProvider } from './context/JobContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <JobProvider>
        <App />
      </JobProvider>
    </AuthProvider>
  </React.StrictMode>,
)
