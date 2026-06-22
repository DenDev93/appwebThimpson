import { useState, FormEvent } from 'react'
import Swal from 'sweetalert2'

const WA_NUMERO = '50587654321'
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

interface Props {
  abierto: boolean
  cerrar: () => void
}

export default function SuscribirseModal({ abierto, cerrar }: Props) {
  const [vista, setVista] = useState<'form' | 'revisar'>('form')
  const [form, setForm] = useState({ nombre: '', cedula: '', email: '', telefono: '' })
  const [emailCheck, setEmailCheck] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [revisando, setRevisando] = useState(false)
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const volverAlForm = () => { setVista('form'); setEmailCheck(''); setRevisando(false) }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    try {
      await fetch(`${API_URL}/api/suscribir`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } catch {}
    const msg = `*Nueva suscripción Thimpson*\n\nNombre: ${form.nombre}\nCédula: ${form.cedula}\nEmail: ${form.email}\nTeléfono: ${form.telefono}`
    const url = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`
    setTimeout(() => {
      window.open(url, '_blank')
      setEnviando(false)
      Swal.fire({ icon: 'success', title: '¡Suscripción enviada!', text: 'Te contactaremos pronto.', confirmButtonColor: '#000' })
      setForm({ nombre: '', cedula: '', email: '', telefono: '' })
      cerrar()
    }, 600)
  }

  const handleRevisar = async () => {
    if (!emailCheck) return
    setRevisando(true)
    try {
      const r = await fetch(`${API_URL}/api/suscribir?email=${encodeURIComponent(emailCheck)}`)
      const json = await r.json()
      if (json.existe) {
        Swal.fire({
          icon: 'success', title: '¡Ya estás suscrito!',
          text: 'Ya puedes solicitar un servicio. Hacé clic en "Pedir ahora" desde el menú.',
          confirmButtonColor: '#000', confirmButtonText: 'Entendido'
        })
        cerrar()
      } else {
        Swal.fire({
          icon: 'info', title: 'No encontramos tu correo',
          text: 'Completá el formulario para suscribirte.',
          confirmButtonColor: '#000', confirmButtonText: 'Ok, suscribirme'
        }).then(() => volverAlForm())
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No pudimos verificar tu suscripción. Intentá de nuevo.', confirmButtonColor: '#000' })
    } finally { setRevisando(false) }
  }

  const cerrarYLimpiar = () => { setVista('form'); setEmailCheck(''); setRevisando(false); cerrar() }

  if (!abierto) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={cerrarYLimpiar} />
      <div className="relative bg-white w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto animate-fade-up">

        {vista === 'form' ? (
          <>
            <div className="bg-thimpson-teal px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-thimpson-yellow font-black text-lg">Suscribirse</h2>
                <p className="text-white/50 text-xs mt-0.5">Recibí ofertas y novedades</p>
              </div>
              <button onClick={cerrarYLimpiar} className="text-white/40 hover:text-white text-xl leading-none">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Campo label="Nombre completo" required>
                <input type="text" required value={form.nombre} onChange={e => set('nombre', e.target.value)}
                  placeholder="Tu nombre" className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-thimpson-yellow transition-colors" />
              </Campo>
              <Campo label="Cédula" required>
                <input type="text" required value={form.cedula} onChange={e => set('cedula', e.target.value)}
                  placeholder="000-000000-0000A" className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-thimpson-yellow transition-colors" />
              </Campo>
              <Campo label="Correo electrónico" required>
                <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="correo@ejemplo.com" className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-thimpson-yellow transition-colors" />
              </Campo>
              <Campo label="Teléfono" required>
                <input type="tel" required value={form.telefono} onChange={e => set('telefono', e.target.value)}
                  placeholder="+505 8765 4321" className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-thimpson-yellow transition-colors" />
              </Campo>
              <button type="submit" disabled={enviando}
                className="w-full bg-thimpson-teal text-thimpson-yellow font-bold text-sm py-3.5 hover:bg-thimpson-black-2 transition-colors disabled:opacity-50">
                {enviando ? 'Enviando...' : 'Suscribirme'}
              </button>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={cerrarYLimpiar}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors">
                  Cerrar
                </button>
                <button type="button" onClick={() => setVista('revisar')}
                  className="flex-1 py-2.5 border border-thimpson-yellow text-thimpson-teal text-sm font-medium hover:bg-thimpson-yellow/10 transition-colors">
                  Ya estoy suscrito
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="bg-thimpson-teal px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-thimpson-yellow font-black text-lg">Ya estoy suscrito</h2>
                <p className="text-white/50 text-xs mt-0.5">Ingresá tu correo para confirmar</p>
              </div>
              <button onClick={cerrarYLimpiar} className="text-white/40 hover:text-white text-xl leading-none">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <Campo label="Correo electrónico" required>
                <input type="email" required value={emailCheck} onChange={e => setEmailCheck(e.target.value)}
                  placeholder="correo@ejemplo.com" className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-thimpson-yellow transition-colors" />
              </Campo>
              <button onClick={handleRevisar} disabled={revisando || !emailCheck}
                className="w-full bg-thimpson-teal text-thimpson-yellow font-bold text-sm py-3.5 hover:bg-thimpson-black-2 transition-colors disabled:opacity-50">
                {revisando ? 'Verificando...' : 'Verificar suscripción'}
              </button>
              <button type="button" onClick={volverAlForm}
                className="w-full py-2.5 border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors">
                Volver al formulario
              </button>
            </div>
          </>
        )}

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