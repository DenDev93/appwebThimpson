import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '@/contexts/AuthContext'

const INPUT = "w-full border-b-2 border-gray-200 focus:border-thimpson-yellow outline-none py-3 text-sm text-gray-800 transition-colors bg-transparent"

export default function Registro() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', password: '', confirmar: '' })
  const [loading, setLoading] = useState(false)
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmar) {
      Swal.fire({ icon: 'warning', title: 'Las contraseñas no coinciden', confirmButtonColor: '#0B1F22' }); return
    }
    if (form.password.length < 6) {
      Swal.fire({ icon: 'warning', title: 'Contraseña muy corta', text: 'Mínimo 6 caracteres', confirmButtonColor: '#0B1F22' }); return
    }
    setLoading(true)
    try {
      await register(form.email, form.password, form.nombre, form.telefono)
      await Swal.fire({
        icon: 'success',
        title: '¡Cuenta creada!',
        text: 'Ya podés hacer tu primer pedido.',
        confirmButtonColor: '#0B1F22',
        confirmButtonText: 'Ir al dashboard',
      })
      navigate('/dashboard')
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Error al registrarse', text: err.message, confirmButtonColor: '#0B1F22' })
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20 pb-10">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl overflow-hidden">
          <div className="bg-thimpson-teal px-8 py-8 text-center">
            <div className="w-14 h-14 bg-thimpson-yellow flex items-center justify-center font-black text-thimpson-teal text-3xl mx-auto mb-4">T</div>
            <h1 className="text-thimpson-yellow font-black text-2xl">Crea tu cuenta</h1>
            <p className="text-white/60 text-sm mt-1">Pedí tu primer delivery en minutos</p>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { k: 'nombre',   label: 'Nombre completo *',            type: 'text',     ph: 'Tu nombre y apellido' },
                { k: 'email',    label: 'Correo electrónico *',         type: 'email',    ph: 'tu@correo.com' },
                { k: 'telefono', label: 'Teléfono',                     type: 'tel',      ph: '+505 8765 4321' },
                { k: 'password', label: 'Contraseña * (mín. 6 chars)', type: 'password', ph: '••••••••' },
                { k: 'confirmar',label: 'Confirmar contraseña *',       type: 'password', ph: '••••••••' },
              ].map(f => (
                <div key={f.k}>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">{f.label}</label>
                  <input
                    type={f.type}
                    required={f.k !== 'telefono'}
                    value={form[f.k as keyof typeof form]}
                    onChange={e => set(f.k, e.target.value)}
                    placeholder={f.ph}
                    className={INPUT}
                  />
                </div>
              ))}

              <p className="text-xs text-gray-400">
                Al registrarte aceptás nuestros{' '}
                <Link to="/terminos" className="text-thimpson-teal underline">términos</Link>{' '}y{' '}
                <Link to="/privacidad" className="text-thimpson-teal underline">privacidad</Link>.
              </p>

              <button type="submit" disabled={loading}
                className="w-full bg-thimpson-teal text-thimpson-yellow font-bold py-4 text-sm hover:bg-thimpson-teal-2 transition-colors disabled:opacity-50">
                {loading ? 'Creando cuenta...' : 'Crear mi cuenta gratis'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              ¿Ya tenés cuenta?{' '}
              <Link to="/login" className="text-thimpson-teal font-bold hover:underline">Iniciá sesión</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
