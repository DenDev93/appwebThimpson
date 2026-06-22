import { useState, FormEvent } from 'react'
import Swal from 'sweetalert2'

const ICONS = {
  ubicacion: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBB03B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  whatsapp:  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  claro:     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00377B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  email:     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBB03B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  horario:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBB03B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
}

const CONTACTOS = [
  { key: 'ubicacion', label: 'Ubicación', value: 'Ocotal, Nueva Segovia, Nicaragua' },
  { key: 'whatsapp',  label: 'WhatsApp',  value: '+505 8765 4321', link: 'https://wa.me/50587654321' },
  { key: 'claro',     label: 'Claro',     value: '+505 8765 4321', link: 'tel:+50587654321' },
  { key: 'email',     label: 'Email',     value: 'contacto@thimpson.com.ni', link: 'mailto:contacto@thimpson.com.ni' },
  { key: 'horario',   label: 'Horario',   value: 'Lunes a sábado · 7am – 8pm' },
]

const Campo = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div className="group">
    <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-[1.5px] transition-colors group-focus-within:text-thimpson-yellow">
      {label}{required && <span className="text-thimpson-yellow ml-0.5">*</span>}
    </label>
    {children}
  </div>
)

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [enviando, setEnviando] = useState(false)
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    const mensaje = `*Contacto desde web Thimpson*\n\nNombre: ${form.nombre}\nEmail: ${form.email}\nTeléfono: ${form.telefono}\n\n${form.mensaje}`
    const url = `https://wa.me/50587654321?text=${encodeURIComponent(mensaje)}`
    setTimeout(() => {
      window.open(url, '_blank')
      setEnviando(false)
      Swal.fire({ icon: 'success', title: '¡Mensaje listo!', text: 'Se abrió WhatsApp con tu mensaje.', confirmButtonColor: '#000' })
      setForm({ nombre: '', email: '', telefono: '', mensaje: '' })
    }, 600)
  }

  return (
    <div className="min-h-screen">
      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section className="relative bg-thimpson-teal pt-28 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ background: 'linear-gradient(135deg, transparent 30%, #fff 50%, transparent 70%)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FBB03B" strokeWidth="0.5"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#contact-grid)" />
          </svg>
        </div>
        <div className="relative z-10">
          <span className="inline-block text-[11px] font-bold text-thimpson-yellow uppercase tracking-[3px] mb-4">/ Contacto</span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.06] mb-4">
            Hablemos
          </h1>
          <p className="text-white/50 text-lg max-w-lg mx-auto">Estamos listos para atenderte. Respondemos en minutos.</p>
        </div>
      </section>

      {/* ══ CONTENIDO ════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ─── Columna izquierda: info ─── */}
          <div className="lg:col-span-2 space-y-6">
            {CONTACTOS.map(c => {
              const Icon = ICONS[c.key as keyof typeof ICONS]
              return (
                <div key={c.key}
                  className="flex items-center gap-4 bg-white border border-gray-100/80 px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5">
                  <div className="w-11 h-11 bg-gray-50 flex items-center justify-center flex-shrink-0">
                    {Icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[1.5px]">{c.label}</div>
                    {c.link ? (
                      <a href={c.link} target="_blank" rel="noreferrer"
                        className="block text-sm font-semibold text-gray-900 truncate hover:text-thimpson-yellow transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <div className="text-sm font-semibold text-gray-900">{c.value}</div>
                    )}
                  </div>
                </div>
              )
            })}

            <div className="relative bg-thimpson-teal px-6 py-6 overflow-hidden mb-8">
              <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.06]"
                style={{ background: 'radial-gradient(circle, #FBB03B 0%, transparent 70%)' }} />
              <div className="relative z-10">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#FBB03B" className="mb-3">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                <h3 className="font-bold text-thimpson-yellow text-sm mb-1">Respuesta inmediata</h3>
                <p className="text-white/50 text-xs leading-relaxed">Para solicitudes urgentes, escribinos por WhatsApp. Respondemos en minutos.</p>
              </div>
            </div>
          </div>

          {/* ─── Columna derecha: formulario ─── */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100/80 px-8 py-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="mb-8">
                <h3 className="text-xl font-black text-gray-900">Enviar mensaje</h3>
                <p className="text-gray-400 text-sm mt-1">Completá el formulario y te responderemos a la brevedad.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Campo label="Nombre" required>
                    <input type="text" required value={form.nombre} onChange={e => set('nombre', e.target.value)}
                      className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-thimpson-yellow focus:bg-gray-50/50 transition-colors"
                      placeholder="Tu nombre" />
                  </Campo>
                  <Campo label="Email">
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                      className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-thimpson-yellow focus:bg-gray-50/50 transition-colors"
                      placeholder="correo@ejemplo.com" />
                  </Campo>
                </div>
                <Campo label="Teléfono">
                  <input type="tel" value={form.telefono} onChange={e => set('telefono', e.target.value)}
                    className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-thimpson-yellow focus:bg-gray-50/50 transition-colors"
                    placeholder="+505 8765 4321" />
                </Campo>
                <Campo label="Mensaje" required>
                  <textarea required rows={4} value={form.mensaje} onChange={e => set('mensaje', e.target.value)}
                    className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-thimpson-yellow focus:bg-gray-50/50 transition-colors resize-none"
                    placeholder="Contanos en qué podemos ayudarte..." />
                </Campo>

                <button type="submit" disabled={enviando}
                  className="w-full bg-thimpson-teal text-thimpson-yellow font-bold text-sm py-4 flex items-center justify-center gap-3 hover:bg-thimpson-black-2 transition-colors disabled:opacity-50">
                  {enviando ? (
                    <>Abriendo WhatsApp...</>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FBB03B">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                      </svg>
                      Enviar por WhatsApp
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
