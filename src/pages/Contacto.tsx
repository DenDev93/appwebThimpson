import { useState, FormEvent } from 'react'
import Swal from 'sweetalert2'

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [enviando, setEnviando] = useState(false)
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    // Redirige a WhatsApp con el mensaje formateado
    const mensaje = `*Contacto desde web Thimpson*\n\nNombre: ${form.nombre}\nEmail: ${form.email}\nTeléfono: ${form.telefono}\n\n${form.mensaje}`
    const url = `https://wa.me/50587654321?text=${encodeURIComponent(mensaje)}`
    setTimeout(() => {
      window.open(url, '_blank')
      setEnviando(false)
      Swal.fire({ icon: 'success', title: '¡Mensaje listo!', text: 'Se abrió WhatsApp con tu mensaje.', confirmButtonColor: '#0B1F22' })
      setForm({ nombre: '', email: '', telefono: '', mensaje: '' })
    }, 600)
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-thimpson-teal py-16 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
          Contáctanos
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">Estamos listos para atenderte. Escríbenos o llámanos.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info de contacto */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-thimpson-teal">Información de contacto</h2>
            {[
              { icon: '📍', label: 'Ubicación', value: 'Ocotal, Nueva Segovia, Nicaragua' },
              { icon: '💬', label: 'WhatsApp', value: '+505 8765 4321', link: 'https://wa.me/50587654321' },
              { icon: '📞', label: 'Claro', value: '+505 8765 4321', link: 'tel:+50587654321' },
              { icon: '✉️', label: 'Email', value: 'contacto@thimpson.com.ni', link: 'mailto:contacto@thimpson.com.ni' },
              { icon: '🕐', label: 'Horario', value: 'Lunes a sábado · 7am – 8pm' },
            ].map(c => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-thimpson-teal/10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{c.icon}</div>
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">{c.label}</div>
                  {c.link ? (
                    <a href={c.link} target="_blank" rel="noreferrer" className="text-thimpson-teal font-semibold hover:underline">{c.value}</a>
                  ) : (
                    <div className="text-gray-800 font-semibold">{c.value}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-thimpson-teal rounded-2xl p-5 text-white">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-bold text-thimpson-yellow mb-1">Respuesta inmediata</h3>
              <p className="text-white/60 text-sm">Para solicitudes urgentes, escríbenos por WhatsApp. Respondemos en minutos.</p>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="font-black text-xl text-gray-900 mb-6">Envíanos un mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nombre *</label>
                <input type="text" required value={form.nombre} onChange={e => set('nombre', e.target.value)}
                  className="input-field" placeholder="Tu nombre completo" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  className="input-field" placeholder="tu@correo.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Teléfono</label>
                <input type="tel" value={form.telefono} onChange={e => set('telefono', e.target.value)}
                  className="input-field" placeholder="+505 8765 4321" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Mensaje *</label>
                <textarea required rows={5} value={form.mensaje} onChange={e => set('mensaje', e.target.value)}
                  className="input-field resize-none" placeholder="Cuéntanos en qué podemos ayudarte..." />
              </div>
              <button type="submit" disabled={enviando}
                className="w-full btn-dark !py-4 text-base disabled:opacity-50">
                {enviando ? 'Abriendo WhatsApp...' : '💬 Enviar por WhatsApp'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
