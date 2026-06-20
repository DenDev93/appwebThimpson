import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '@/contexts/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: err.message === 'Invalid login credentials' ? 'Correo o contraseña incorrectos' : err.message,
        confirmButtonColor: '#0B1F22',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20 pb-10">
      <div className="w-full max-w-md">

        <div className="bg-white shadow-xl overflow-hidden">
          {/* Cabecera */}
          <div className="bg-thimpson-teal px-8 py-8 text-center">
            <div className="w-14 h-14 bg-thimpson-yellow flex items-center justify-center font-black text-thimpson-teal text-3xl mx-auto mb-4">
              T
            </div>
            <h1 className="text-thimpson-yellow font-black text-2xl">Bienvenido de vuelta</h1>
            <p className="text-white/60 text-sm mt-1">Iniciá sesión en tu cuenta Thimpson</p>
          </div>

          {/* Formulario */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">
                  Correo electrónico
                </label>
                <input
                  type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full border-b-2 border-gray-200 focus:border-thimpson-yellow outline-none py-3 text-sm text-gray-800 transition-colors bg-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">
                  Contraseña
                </label>
                <input
                  type="password" required
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-b-2 border-gray-200 focus:border-thimpson-yellow outline-none py-3 text-sm text-gray-800 transition-colors bg-transparent"
                />
              </div>
              <div className="flex justify-end">
                <Link to="/recuperar-password" className="text-xs text-thimpson-teal hover:underline font-medium">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full bg-thimpson-teal text-thimpson-yellow font-bold py-4 text-sm hover:bg-thimpson-teal-2 transition-colors disabled:opacity-50">
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                ¿No tenés cuenta?{' '}
                <Link to="/registro" className="text-thimpson-teal font-bold hover:underline">
                  Registrate gratis
                </Link>
              </p>
            </div>

            <div className="mt-5 pt-5 border-t border-gray-100 text-center">
              <p className="text-gray-400 text-xs mb-3">O pedí directamente sin cuenta</p>
              <a href="https://wa.me/50587654321" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 border border-green-200 bg-green-50 text-green-700 text-sm font-semibold px-5 py-2.5 hover:bg-green-100 transition-colors">
                💬 Pedir por WhatsApp
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          © {new Date().getFullYear()} Servicio Express Thimpson · Ocotal, Nicaragua
        </p>
      </div>
    </div>
  )
}
