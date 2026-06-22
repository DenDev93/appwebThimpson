import { useState, FormEvent } from 'react'
import Swal from 'sweetalert2'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

const CATEGORIAS_SUGERIDAS = [
  'Comida', 'Bebidas', 'Ropa', 'Calzado', 'Electrónicos', 'Farmacia',
  'Supermercado', 'Ferretería', 'Mascotas', 'Belleza', 'Regalos', 'Deportes',
  'Librería', 'Jardinería', 'Hogar', 'Juguetes', 'Servicios', 'Otro',
]

interface Props {
  abierto: boolean
  cerrar: () => void
  onAfiliado?: () => void
}

export default function AfiliarseModal({ abierto, cerrar, onAfiliado }: Props) {
  const [form, setForm] = useState({
    nombre: '', descripcion: '', categoria: '', telefono: '', direccion: '', logo_url: '',
  })
  const [enviando, setEnviando] = useState(false)
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    try {
      const r = await fetch(`${API_URL}/api/negocios/afiliarse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await r.json()
      if (!r.ok) {
        Swal.fire({ icon: 'error', title: 'Error', text: json.error ?? 'No se pudo registrar', confirmButtonColor: '#000' })
        return
      }
      Swal.fire({
        icon: 'success', title: '¡Negocio registrado!',
        text: 'Tu negocio está pendiente de verificación. Te notificaremos cuando esté activo.',
        confirmButtonColor: '#000',
      })
      setForm({ nombre: '', descripcion: '', categoria: '', telefono: '', direccion: '', logo_url: '' })
      cerrar()
      onAfiliado?.()
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No pudimos conectar con el servidor', confirmButtonColor: '#000' })
    } finally { setEnviando(false) }
  }

  if (!abierto) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={cerrar} />
      <div className="relative bg-white w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto animate-fade-up">
        <div className="bg-thimpson-teal px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-thimpson-yellow font-black text-lg">Afiliar mi negocio</h2>
            <p className="text-white/50 text-xs mt-0.5">Mostrá tus productos en el Marketplace Thimpson</p>
          </div>
          <button onClick={cerrar} className="text-white/40 hover:text-white text-xl leading-none">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Campo label="Nombre del negocio" required>
            <input type="text" required value={form.nombre} onChange={e => set('nombre', e.target.value)}
              placeholder="Ej: Panadería El Pan de Dios" className="input-underline" />
          </Campo>
          <Campo label="Descripción">
            <textarea value={form.descripcion} onChange={e => set('descripcion', e.target.value)} rows={3}
              placeholder="Contale a los clientes qué ofrecés..."
              className="input-underline resize-none" />
          </Campo>
          <Campo label="Categoría">
            <select value={form.categoria} onChange={e => set('categoria', e.target.value)}
              className="input-underline cursor-pointer">
              <option value="">Seleccioná una categoría</option>
              {CATEGORIAS_SUGERIDAS.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Campo>
          <Campo label="Teléfono">
            <input type="tel" value={form.telefono} onChange={e => set('telefono', e.target.value)}
              placeholder="+505 8765 4321" className="input-underline" />
          </Campo>
          <Campo label="Dirección">
            <input type="text" value={form.direccion} onChange={e => set('direccion', e.target.value)}
              placeholder="Dirección del negocio" className="input-underline" />
          </Campo>
          <Campo label="Logo (URL)">
            <input type="url" value={form.logo_url} onChange={e => set('logo_url', e.target.value)}
              placeholder="https://ejemplo.com/logo.png" className="input-underline" />
          </Campo>
          <button type="submit" disabled={enviando}
            className="w-full bg-thimpson-teal text-thimpson-yellow font-bold text-sm py-3.5 hover:bg-thimpson-black-2 transition-colors disabled:opacity-50">
            {enviando ? 'Registrando...' : 'Registrar negocio'}
          </button>
          <p className="text-[10px] text-gray-400 text-center leading-relaxed">
            Al registrarte aceptás que tu negocio sea visible en el Marketplace de Thimpson Express.
            Recibirás una notificación cuando tu negocio sea verificado.
          </p>
        </form>
      </div>
    </div>
  )
}

const Campo = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div className="group">
    <label className="block text-[11px] font-bold text-gray-400 mb-1 uppercase tracking-[1.5px] transition-colors group-focus-within:text-thimpson-yellow">
      {label}{required && <span className="text-thimpson-yellow ml-0.5">*</span>}
    </label>
    {children}
  </div>
)
