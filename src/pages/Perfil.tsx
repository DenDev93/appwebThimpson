import { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '@/contexts/AuthContext'
import supabase from '@/lib/supabase'

export default function Perfil() {
  const { user, perfil, token, loading } = useAuth()
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    if (!loading && !user) { navigate('/login'); return }
    if (perfil) {
      setNombre(perfil.nombre_completo ?? '')
      setTelefono(perfil.telefono ?? '')
    }
    if (user) setEmail(user.email ?? '')
  }, [user, perfil, loading])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setGuardando(true)
    try {
      const { error } = await supabase.from('perfiles').upsert({
        id: user!.id,
        nombre_completo: nombre,
        telefono: telefono || null,
      }, { onConflict: 'id' })
      if (error) throw error
      Swal.fire({ icon: 'success', title: 'Perfil actualizado', timer: 1500, showConfirmButton: false })
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message, confirmButtonColor: '#0B1F22' })
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-thimpson-teal py-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          Mi <span className="text-thimpson-yellow">perfil</span>
        </h1>
        <p className="text-white/50 text-sm">Administrá tu información personal.</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-10">
        <div className="bg-white border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Nombre completo</label>
              <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}
                placeholder="Tu nombre"
                className="w-full border-b-2 border-gray-200 focus:border-thimpson-yellow outline-none py-3 text-sm text-gray-800 transition-colors bg-transparent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Teléfono</label>
              <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)}
                placeholder="+505 8765 4321"
                className="w-full border-b-2 border-gray-200 focus:border-thimpson-yellow outline-none py-3 text-sm text-gray-800 transition-colors bg-transparent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Correo electrónico</label>
              <input type="email" value={email} disabled
                className="w-full border-b-2 border-gray-100 py-3 text-sm text-gray-400 bg-gray-50 cursor-not-allowed" />
              <p className="text-[10px] text-gray-400 mt-1">No se puede cambiar el correo.</p>
            </div>
            <button type="submit" disabled={guardando}
              className="w-full bg-thimpson-teal text-thimpson-yellow font-bold py-4 text-sm hover:bg-thimpson-black-2 transition-colors disabled:opacity-50">
              {guardando ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
