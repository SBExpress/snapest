import { useState, useEffect, useCallback } from 'react'

export interface User {
  id: string
  email: string
  name: string
  companyId: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }

      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` },
      })

      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        localStorage.removeItem('auth_token')
        setUser(null)
      }
    } catch (err) {
      console.error('Auth check failed:', err)
      localStorage.removeItem('auth_token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const signup = useCallback(async (email: string, password: string, name: string, companyName?: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, companyName }),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('auth_token', data.token)
        setUser(data.user)
        return { success: true, user: data.user }
      } else {
        setError(data.error || 'Signup failed')
        return { success: false, error: data.error }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('auth_token', data.token)
        setUser(data.user)
        return { success: true, user: data.user }
      } else {
        setError(data.error || 'Login failed')
        return { success: false, error: data.error }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token')
    setUser(null)
    setError(null)
  }, [])

  return { user, loading, error, signup, login, logout, isAuthenticated: !!user }
}
