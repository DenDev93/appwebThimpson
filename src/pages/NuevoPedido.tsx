import { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '@/contexts/AuthContext'
import { apiFetch } from '@/lib/api'

interface Servicio {
  id: string
  nombre: string
  descripcion: string
  icono: string
  precio_base: number | null
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
const SERVICIOS_DEFAULT: Servicio[] = [
  { id: '1', nombre: 'Delivery Express', descripcion: 'Envíos rápidos en Ocotal', icono: '🚚', precio_base: 50 },
  { id: '2', nombre: 'Compras en supermercado', descripcion: 'Te hacemos las compras', icono: '🛒', precio_base: 80 },
  { id: '3', nombre: 'Pedidos de restaurant', descripcion: 'Comida a tu puerta', icono: '🍔', precio_base: 40 },
  { id: '4', nombre: 'Envío de documentos', descripcion: 'Documentos seguros', icono: '📦', precio_base: 35 },
  { id: '5', nombre: 'Farmacia', descripcion: 'Medicamentos a domicilio', icono: '💊', precio_base: 50 },
  { id: '6', nombre: 'Especiales', descripcion: 'Servicios personalizados', icono: '🔧', precio_base: null },
]

export default function NuevoPedido() {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [servicios, setServicios] = useState<Servicio[]>(SERVICIOS_DEFAULT)
  const [servicioId, setServicioId] = useState('')
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/api/catalogo-servicios`).then(r => r.ok ? r.json() : null)
      .then(res => {
        const data = res?.data ?? res
        if (Array.isArray(data) && data.length) setServicios(data.filter((s: Servicio) => s.nombre))
      })
      .catch(() => {})
  }, [])

  const servicioSel = servicios.find(s => s.id === servicioId)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!servicioId) {
      Swal.fire({ icon: 'warning', title: 'Seleccioná un servicio', confirmButtonColor: '#0B1F22' })
      return
    }
    if (!origen.trim()) {
      Swal.fire({ icon: 'warning', title: 'Indicá la dirección de origen', confirmButtonColor: '#0B1F22' })
      return
    }
    if (!user) {
      Swal.fire({ icon: 'info', title: 'Iniciá sesión', text: 'Necesitás una cuenta para hacer un pedido.', confirmButtonColor: '#0B1F22' })
      navigate('/login')
      return
    }
    setEnviando(true)
    try {
      await apiFetch('/api/solicitudes', {
        method: 'POST',
        body: JSON.stringify({
          tipo_servicio: servicioSel?.nombre ?? servicioId,
          origen_direccion: origen,
          destino_direccion: destino || null,
          descripcion: descripcion || null,
        }),
      }, token)
      await Swal.fire({
        icon: 'success',
        title: '¡Pedido creado!',
        text: 'En breve te confirmaremos y asignaremos un motorizado.',
        confirmButtonColor: '#0B1F22',
      })
      navigate('/mis-pedidos')
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Error al crear pedido', text: err.message, confirmButtonColor: '#0B1F22' })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-thimpson-teal py-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          Nuevo <span className="text-thimpson-yellow">pedido</span>
        </h1>
        <p className="text-white/50 text-sm">Completá los datos y te asignamos un motorizado.</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Tipo de servicio <span className="text-thimpson-yellow">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {servicios.map(s => (
                <button key={s.id} type="button" onClick={() => setServicioId(s.id)}
                  className={`border-2 p-3 text-center transition-all ${
                    servicioId === s.id
                      ? 'border-thimpson-yellow bg-thimpson-yellow/10'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}>
                  <div className="text-2xl mb-1">{s.icono}</div>
                  <div className="text-sm font-bold text-gray-800">{s.nombre}</div>
                  {s.precio_base != null && (
                    <div className="text-xs text-thimpson-teal font-semibold mt-1">Desde C${s.precio_base}</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Dirección de origen <span className="text-thimpson-yellow">*</span>
            </label>
            <input type="text" required value={origen} onChange={e => setOrigen(e.target.value)}
              placeholder="Ej: De la Alcaldía 1c al norte"
              className="w-full border-b-2 border-gray-200 focus:border-thimpson-yellow outline-none py-3 text-sm text-gray-800 transition-colors bg-transparent" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Dirección de destino
            </label>
            <input type="text" value={destino} onChange={e => setDestino(e.target.value)}
              placeholder="Ej: Barrio El Calvario, casa #23"
              className="w-full border-b-2 border-gray-200 focus:border-thimpson-yellow outline-none py-3 text-sm text-gray-800 transition-colors bg-transparent" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Descripción o detalles
            </label>
            <textarea rows={3} value={descripcion} onChange={e => setDescripcion(e.target.value)}
              placeholder="¿Alguna instrucción especial?"
              className="w-full border-b-2 border-gray-200 focus:border-thimpson-yellow outline-none py-3 text-sm text-gray-800 transition-colors bg-transparent resize-none" />
          </div>

          <button type="submit" disabled={enviando}
            className="w-full bg-thimpson-teal text-thimpson-yellow font-bold py-4 text-sm hover:bg-thimpson-black-2 transition-colors disabled:opacity-50">
            {enviando ? 'Creando pedido...' : 'Solicitar servicio'}
          </button>
        </form>
      </div>
    </div>
  )
}
