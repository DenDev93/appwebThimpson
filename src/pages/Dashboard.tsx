import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '@/contexts/AuthContext'
import { apiFetch } from '@/lib/api'

interface Solicitud {
  id: string
  tipo_servicio: string
  estado: string
  origen_direccion: string
  destino_direccion: string | null
  precio_final: number | null
  created_at: string
}

const ESTADO_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  pendiente:   { label: 'Pendiente',    color: 'bg-yellow-100 text-yellow-700', icon: '⏳' },
  confirmada:  { label: 'Confirmada',   color: 'bg-blue-100 text-blue-700',     icon: '✅' },
  asignada:    { label: 'Asignada',     color: 'bg-purple-100 text-purple-700', icon: '🏍️' },
  en_camino:   { label: 'En camino',    color: 'bg-orange-100 text-orange-700', icon: '🚀' },
  entregada:   { label: 'Entregada',    color: 'bg-green-100 text-green-700',   icon: '✅' },
  cancelada:   { label: 'Cancelada',    color: 'bg-red-100 text-red-600',       icon: '❌' },
}

export default function Dashboard() {
  const { user, perfil, token, logout } = useAuth()
  const navigate = useNavigate()
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    cargarSolicitudes()
  }, [user])

  const cargarSolicitudes = async () => {
    if (!token) return
    setLoading(true)
    try {
      const r = await apiFetch<any>('/api/solicitudes?por_pagina=10', {}, token)
      setSolicitudes(r.data ?? [])
    } catch {
      /* silencio si la API no está disponible */
    } finally { setLoading(false) }
  }

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: 'question', title: '¿Cerrar sesión?', showCancelButton: true,
      confirmButtonText: 'Sí, salir', cancelButtonText: 'Cancelar', confirmButtonColor: '#0B1F22',
    })
    if (result.isConfirmed) { await logout(); navigate('/') }
  }

  const nombre = perfil?.nombre_completo ?? user?.email ?? 'Cliente'

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header del dashboard */}
      <div className="bg-thimpson-teal text-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-thimpson-yellow">Hola, {nombre.split(' ')[0]} 👋</h1>
              <p className="text-white/60 text-sm mt-1">¿Qué necesitas hoy?</p>
            </div>
            <button onClick={handleLogout} className="text-white/40 hover:text-red-400 text-sm transition-colors">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Acciones rápidas */}
        <div>
          <h2 className="font-bold text-gray-800 mb-4">Acciones rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🚚', label: 'Nuevo pedido', to: '/nuevo-pedido', color: 'bg-thimpson-teal' },
              { icon: '💬', label: 'WhatsApp', to: 'https://wa.me/50587654321', color: 'bg-whatsapp', ext: true },
              { icon: '📦', label: 'Mis pedidos', to: '/mis-pedidos', color: 'bg-blue-600' },
              { icon: '👤', label: 'Mi perfil', to: '/perfil', color: 'bg-gray-700' },
            ].map(a => (
              a.ext ? (
                <a key={a.label} href={a.to} target="_blank" rel="noreferrer"
                  className={`${a.color} rounded-2xl p-4 text-white flex flex-col items-center gap-2 hover:opacity-90 transition-opacity shadow-sm`}>
                  <span className="text-3xl">{a.icon}</span>
                  <span className="text-sm font-semibold">{a.label}</span>
                </a>
              ) : (
                <Link key={a.label} to={a.to}
                  className={`${a.color} rounded-2xl p-4 text-white flex flex-col items-center gap-2 hover:opacity-90 transition-opacity shadow-sm`}>
                  <span className="text-3xl">{a.icon}</span>
                  <span className="text-sm font-semibold">{a.label}</span>
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Últimos pedidos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Mis últimos pedidos</h2>
            <Link to="/mis-pedidos" className="text-thimpson-teal text-sm font-semibold hover:underline">Ver todos</Link>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 flex flex-col items-center text-gray-400 gap-2">
              <div className="w-7 h-7 border-2 border-thimpson-teal/30 border-t-thimpson-teal rounded-full animate-spin" />
              <p className="text-sm">Cargando pedidos...</p>
            </div>
          ) : solicitudes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
              <div className="text-5xl mb-3">📦</div>
              <h3 className="font-semibold text-gray-700 mb-2">Aún no tienes pedidos</h3>
              <p className="text-sm mb-5">Haz tu primera solicitud de delivery y la verás aquí.</p>
              <Link to="/nuevo-pedido" className="btn-dark text-sm inline-block !py-2.5 !px-6">
                Hacer mi primer pedido
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {solicitudes.map(s => {
                const ec = ESTADO_CONFIG[s.estado] ?? { label: s.estado, color: 'bg-gray-100 text-gray-600', icon: '📋' }
                return (
                  <div key={s.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-4">
                    <div className="text-3xl">{ec.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 text-sm">{s.tipo_servicio}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ec.color}`}>{ec.label}</span>
                      </div>
                      <p className="text-gray-500 text-xs mt-0.5 truncate">{s.origen_direccion}</p>
                      {s.destino_direccion && <p className="text-gray-400 text-xs truncate">→ {s.destino_direccion}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      {s.precio_final && (
                        <div className="font-bold text-thimpson-teal text-sm">
                          C${Number(s.precio_final).toLocaleString('es-NI', { minimumFractionDigits: 0 })}
                        </div>
                      )}
                      <div className="text-gray-400 text-xs mt-0.5">
                        {new Date(s.created_at).toLocaleDateString('es-NI', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Banner informativo */}
        <div className="bg-thimpson-teal rounded-2xl p-6 flex items-center gap-5">
          <div className="text-5xl">🏍️</div>
          <div className="flex-1">
            <h3 className="text-thimpson-yellow font-bold text-lg">¿Quieres ser motorizado?</h3>
            <p className="text-white/60 text-sm mt-1">Únete a nuestro equipo y genera ingresos con tu moto.</p>
          </div>
          <Link to="/trabaja-con-nosotros"
            className="shrink-0 btn-primary text-sm !py-2.5 !px-5">
            Aplicar →
          </Link>
        </div>
      </div>
    </div>
  )
}
