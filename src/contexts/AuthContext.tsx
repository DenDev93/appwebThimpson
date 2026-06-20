import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import supabase from '@/lib/supabase'
import type { Session, User } from '@supabase/supabase-js'

interface Perfil {
  id: string
  nombre_completo: string | null
  telefono: string | null
  rol: string
  activo: boolean
  sucursal_id: string | null
}

interface AuthCtx {
  user: User | null
  perfil: Perfil | null
  session: Session | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, nombre: string, telefono?: string) => Promise<void>
  logout: () => Promise<void>
}

const Ctx = createContext<AuthCtx>({} as AuthCtx)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null)
  const [perfil, setPerfil]   = useState<Perfil | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const cargarPerfil = async (userId: string) => {
    const { data } = await supabase
      .from('perfiles')
      .select('*')
      .eq('id', userId)
      .single()
    setPerfil(data ?? null)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) cargarPerfil(s.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) cargarPerfil(s.user.id)
      else setPerfil(null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
  }

  const register = async (email: string, password: string, nombre: string, telefono?: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw new Error(error.message)
    if (data.user) {
      await supabase.from('perfiles').insert({
        id:              data.user.id,
        nombre_completo: nombre,
        telefono:        telefono ?? null,
        rol:             'cliente',
        activo:          true,
      })
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setPerfil(null)
  }

  return (
    <Ctx.Provider value={{
      user, perfil, session, token: session?.access_token ?? null,
      loading, login, register, logout,
    }}>
      {children}
    </Ctx.Provider>
  )
}

export const useAuth = () => useContext(Ctx)
