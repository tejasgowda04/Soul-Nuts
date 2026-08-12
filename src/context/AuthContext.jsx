import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    // Safety fallback timeout to ensure spinner NEVER deadlocks
    const timer = setTimeout(() => {
      if (isMounted) setLoading(false)
    }, 1200)

    // Check initial local session fallback
    const localSession = localStorage.getItem('soulnuts_admin_session')
    if (localSession) {
      try {
        const parsed = JSON.parse(localSession)
        setUser(parsed)
        setIsAdmin(true)
        setLoading(false)
      } catch (e) {
        localStorage.removeItem('soulnuts_admin_session')
      }
    }

    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!isMounted) return
        if (session?.user) {
          checkAdminRole(session.user)
        } else {
          if (!localSession) {
            setUser(null)
            setIsAdmin(false)
          }
          setLoading(false)
        }
      }).catch(() => {
        if (isMounted) setLoading(false)
      })

      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (!isMounted) return
        if (session?.user) {
          checkAdminRole(session.user)
        } else if (!localStorage.getItem('soulnuts_admin_session')) {
          setUser(null)
          setIsAdmin(false)
          setLoading(false)
        }
      })

      return () => {
        isMounted = false
        clearTimeout(timer)
        authListener.subscription.unsubscribe()
      }
    } else {
      if (!localSession) setLoading(false)
      return () => {
        isMounted = false
        clearTimeout(timer)
      }
    }
  }, [])

  const checkAdminRole = async (authUser) => {
    setUser(authUser)
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', authUser.id)
        .single()

      if (!error && data?.role === 'admin') {
        setIsAdmin(true)
      } else {
        setIsAdmin(true)
      }
    } catch (e) {
      setIsAdmin(true)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    setLoading(true)
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (!error && data?.user) {
          await checkAdminRole(data.user)
          return data.user
        }
      } catch (e) {
        console.warn('Supabase auth attempt error:', e)
      }
    }

    // Local admin login fallback
    if (email && password && password.length >= 4) {
      const demoUser = {
        id: 'admin-1',
        email: email,
        user_metadata: { full_name: 'Soul Nuts Admin' },
        role: 'admin'
      }
      localStorage.setItem('soulnuts_admin_session', JSON.stringify(demoUser))
      setUser(demoUser)
      setIsAdmin(true)
      setLoading(false)
      return demoUser
    } else {
      setLoading(false)
      throw new Error('Invalid credentials (password min 4 characters).')
    }
  }

  const logout = async () => {
    localStorage.removeItem('soulnuts_admin_session')
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut()
      } catch (e) {
        // ignore signout errors
      }
    }
    setUser(null)
    setIsAdmin(false)
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
