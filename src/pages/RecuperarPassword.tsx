import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import supabase from '@/lib/supabase'

export default function RecuperarPassword() {
  const [email, setEmail] = useState('')
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/dashboard`,
      })
      if (error) throw error
      await Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        text: 'Si la cuenta existe, recibirás un enlace para restablecer tu contraseña.',
        confirmButtonColor: '#0B1F22',
      })
      setEmail('')
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message, confirmButtonColor: '#0B1F22' })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20 pb-10">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl overflow-hidden">
          <div className="bg-thimpson-teal px-8 py-8 text-center">
            <div className="w-14 h-14 bg-thimpson-yellow flex items-center justify-center font-black text-thimpson-teal text-3xl mx-auto mb-4">
              T
            </div>
            <h1 className="text-thimpson-yellow font-black text-2xl">Recuperar contraseña</h1>
            <p className="text-white/60 text-sm mt-1">Te enviaremos un enlace a tu correo.</p>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">
                  Correo electrónico
                </label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full border-b-2 border-gray-200 focus:border-thimpson-yellow outline-none py-3 text-sm text-gray-800 transition-colors bg-transparent" />
              </div>
              <button type="submit" disabled={enviando}
                className="w-full bg-thimpson-teal text-thimpson-yellow font-bold py-4 text-sm hover:bg-thimpson-black-2 transition-colors disabled:opacity-50">
                {enviando ? 'Enviando...' : 'Enviar enlace'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-thimpson-teal text-sm font-semibold hover:underline">
                Volver a iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
