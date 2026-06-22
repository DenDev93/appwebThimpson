import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

export default function MisPedidos() {
  const { user, token } = useAuth()
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!token) return
    setCargando(true)
    apiFetch<any>('/api/solicitudes?por_pagina=50', {}, token)
      .then(r => setSolicitudes(r.data ?? []))
      .catch(() => setSolicitudes([]))
      .finally(() => setCargando(false))
  }, [token])

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-thimpson-teal py-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          Mis <span className="text-thimpson-yellow">pedidos</span>
        </h1>
        <p className="text-white/50 text-sm">Historial de tus solicitudes de delivery.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {cargando ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-thimpson-yellow/30 border-t-thimpson-yellow rounded-full animate-spin" />
          </div>
        ) : solicitudes.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-100 p-10">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">No tenés pedidos aún</h3>
            <p className="text-gray-500 text-sm mb-6">Hacé tu primer pedido y aparecerá aquí.</p>
            <Link to="/nuevo-pedido" className="btn-dark text-sm inline-block !py-3 !px-8">
              Hacer mi primer pedido
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {solicitudes.map(s => {
              const ec = ESTADO_CONFIG[s.estado] ?? { label: s.estado, color: 'bg-gray-100 text-gray-600', icon: '📋' }
              return (
                <div key={s.id} className="bg-white border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="text-3xl">{ec.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900 text-sm">{s.tipo_servicio}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ec.color}`}>{ec.label}</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1 truncate">{s.origen_direccion}</p>
                    {s.destino_direccion && <p className="text-gray-400 text-xs truncate">→ {s.destino_direccion}</p>}
                  </div>
                  <div className="text-right shrink-0">
                    {s.precio_final != null && (
                      <div className="font-bold text-thimpson-teal">C${Number(s.precio_final).toLocaleString('es-NI', { minimumFractionDigits: 0 })}</div>
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
    </div>
  )
}
