import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

interface CmsData { [key: string]: string }
interface Servicio { id: string; nombre: string; descripcion: string; icono: string; activo: boolean; precio_base?: number }

const DEFAULT: CmsData = {
  hero_titulo:         'Tu delivery de confianza en Ocotal',
  hero_subtitulo:      'Motorizados verificados, entregas rápidas y precios justos. Pide lo que necesites y te lo llevamos a la puerta.',
  whatsapp_numero:     '50587654321',
  stats_entregas:      '500+',
  stats_tiempo:        '60 min',
  stats_calificacion:  '4.9',
  cta_texto:           '¿Preferís pedir por WhatsApp?',
  testimonio_1_nombre: 'María G.',
  testimonio_1_texto:  'Me trajeron las compras del supermercado en menos de 40 minutos. Excelente.',
  testimonio_2_nombre: 'Carlos R.',
  testimonio_2_texto:  'Rapidísimo y el motorizado siempre puntual. Lo uso para enviar documentos.',
  testimonio_3_nombre: 'Ana M.',
  testimonio_3_texto:  'Pedí comida de mi restaurante favorito y llegó caliente. 100% recomendado.',
}

const SERVICIOS_DEFAULT: Servicio[] = [
  { id: '1', nombre: 'Delivery Express', descripcion: 'Entregas en menos de 60 minutos en Ocotal', icono: '🚚', activo: true },
  { id: '2', nombre: 'Compras',          descripcion: 'Compramos en supermercados y tiendas por vos', icono: '🛒', activo: true },
  { id: '3', nombre: 'Restaurantes',     descripcion: 'Tu comida favorita directo a tu puerta',        icono: '🍔', activo: true },
  { id: '4', nombre: 'Paquetes',         descripcion: 'Traslado seguro de documentos y encomiendas',   icono: '📦', activo: true },
  { id: '5', nombre: 'Farmacia',         descripcion: 'Medicamentos y productos de salud a domicilio', icono: '💊', activo: true },
  { id: '6', nombre: 'Especiales',       descripcion: 'Coordina envíos fuera de lo ordinario',         icono: '🔧', activo: true },
]

const PASOS = [
  { n: '01', titulo: 'Hacé tu pedido',       desc: 'Desde la web o por WhatsApp, indicanos qué necesitás y dónde estás.' },
  { n: '02', titulo: 'Asignamos motorizado', desc: 'Confirmamos y asignamos el motorizado verificado más cercano a vos.' },
  { n: '03', titulo: 'Recibís en tu puerta', desc: 'Seguí el estado de tu pedido y recibilo sin moverte de casa.' },
]

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    ref.current.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

export default function Home() {
  const [cms, setCms] = useState<CmsData>(DEFAULT)
  const [servicios, setServicios] = useState<Servicio[]>(SERVICIOS_DEFAULT)
  const rootRef = useScrollReveal()

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/cms`).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(`${API_URL}/api/catalogo-servicios`).then(r => r.ok ? r.json() : null).catch(() => null),
    ]).then(([cmsRes, svcRes]) => {
      if (cmsRes?.contenido) setCms({ ...DEFAULT, ...cmsRes.contenido })
      const svcs = svcRes?.data ?? svcRes
      if (Array.isArray(svcs) && svcs.length) setServicios(svcs.filter((s: Servicio) => s.activo))
    })
  }, [])

  const wa = `https://wa.me/${cms.whatsapp_numero}?text=Hola, quiero hacer un pedido con Thimpson Express`

  const testimonios = [
    { nombre: cms.testimonio_1_nombre, texto: cms.testimonio_1_texto },
    { nombre: cms.testimonio_2_nombre, texto: cms.testimonio_2_texto },
    { nombre: cms.testimonio_3_nombre, texto: cms.testimonio_3_texto },
  ]

  return (
    <div ref={rootRef}>

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-thimpson-teal flex items-center overflow-hidden">
        {/* Patrón geométrico de fondo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, #FBB03B 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #FBB03B 0%, transparent 70%)' }} />
          {/* Líneas diagonales decorativas */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FBB03B" strokeWidth="1"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 w-full py-24 pt-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Texto */}
          <div>
            {/* Badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-thimpson-yellow/30 bg-thimpson-yellow/10">
              <span className="w-1.5 h-1.5 bg-thimpson-yellow animate-pulse" style={{ animationName: 'pulse-dot' }} />
              <span className="text-thimpson-yellow text-xs font-bold tracking-widest uppercase">📍 Ocotal, Nicaragua</span>
            </div>

            <h1 className="animate-fade-up delay-100 text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
              {cms.hero_titulo.split(' en ')[0]}
              <br />
              <span className="text-thimpson-yellow">en Ocotal</span>
            </h1>

            <p className="animate-fade-up delay-200 text-white/60 text-lg leading-relaxed max-w-lg mb-10">
              {cms.hero_subtitulo}
            </p>

            <div className="animate-fade-up delay-300 flex flex-wrap gap-4 mb-12">
              <Link to="/registro"
                className="bg-thimpson-yellow text-thimpson-teal font-bold text-base px-8 py-4 hover:bg-thimpson-yellow-d transition-colors shadow-lg">
                Hacer mi pedido →
              </Link>
              <a href={wa} target="_blank" rel="noreferrer"
                className="flex items-center gap-2.5 bg-[#25D366] text-white font-bold text-base px-8 py-4 hover:bg-[#1ea853] transition-colors shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Pedir por WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="animate-fade-up delay-400 flex gap-8 flex-wrap">
              {[
                { valor: cms.stats_entregas,     label: 'Entregas realizadas' },
                { valor: cms.stats_tiempo,        label: 'Tiempo promedio'    },
                { valor: `${cms.stats_calificacion}★`, label: 'Calificación' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-thimpson-yellow font-black text-2xl">{s.valor}</div>
                  <div className="text-white/40 text-xs font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel visual / ilustración */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Fondo decorativo */}
              <div className="w-72 h-72 border border-thimpson-yellow/20 flex items-center justify-center text-[100px] animate-float">
                🏍️
              </div>
              {/* Card: pedido entregado */}
              <div className="absolute -bottom-5 -left-10 bg-white shadow-2xl px-4 py-3 flex items-center gap-3 animate-fade-up delay-500">
                <div className="w-10 h-10 bg-green-100 flex items-center justify-center text-xl">✅</div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Pedido entregado</div>
                  <div className="text-sm font-bold text-gray-900">En 42 minutos</div>
                </div>
              </div>
              {/* Card: calificación */}
              <div className="absolute -top-5 -right-8 bg-thimpson-yellow shadow-xl px-4 py-3 text-center animate-fade-up delay-400">
                <div className="text-thimpson-teal font-black text-2xl leading-none">4.9</div>
                <div className="text-thimpson-teal/60 text-[10px] font-bold uppercase tracking-wide mt-0.5">Calificación</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 30C1080 60 720 0 360 30L0 0L0 60Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ══ SERVICIOS ═════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="text-thimpson-yellow font-bold text-xs uppercase tracking-widest">Nuestros servicios</span>
            <h2 className="text-3xl md:text-4xl font-black text-thimpson-teal mt-2 mb-4">
              Lo que llevamos para vos
            </h2>
            <p className="text-gray-500 max-w-md mx-auto text-base">
              Desde comida hasta documentos, cubrimos todas tus necesidades de entrega.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {servicios.slice(0, 6).map((s, i) => (
              <Link key={s.id} to="/servicios"
                className="group bg-white border border-gray-100 hover:border-thimpson-yellow hover:shadow-xl transition-all duration-300 p-6 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200 inline-block">
                  {s.icono}
                </div>
                <h3 className="font-bold text-thimpson-teal text-base mb-2">{s.nombre}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.descripcion}</p>
                {s.precio_base && (
                  <div className="mt-4 text-xs font-bold text-thimpson-yellow bg-thimpson-teal px-3 py-1 inline-block">
                    Desde C${s.precio_base}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CÓMO FUNCIONA ═════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <span className="text-thimpson-yellow font-bold text-xs uppercase tracking-widest">Así de simple</span>
            <h2 className="text-3xl md:text-4xl font-black text-thimpson-teal mt-2 mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-gray-500 max-w-sm mx-auto">Sin complicaciones. Pedís en minutos y recibís rápido.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {PASOS.map((p, i) => (
              <div key={p.n} className="text-center animate-fade-up" style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'both' }}>
                <div className="w-16 h-16 bg-thimpson-teal text-thimpson-yellow font-black text-xl flex items-center justify-center mx-auto mb-5">
                  {p.n}
                </div>
                <h3 className="font-black text-thimpson-teal text-lg mb-3">{p.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/registro"
              className="inline-block bg-thimpson-teal text-thimpson-yellow font-bold text-base px-10 py-4 hover:bg-thimpson-teal-2 transition-colors">
              Empezar ahora
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CTA WHATSAPP ══════════════════════════════════════════════ */}
      <section className="py-20 bg-thimpson-teal">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <div className="text-5xl mb-5">💬</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            {cms.cta_texto}
          </h2>
          <p className="text-white/50 text-base mb-8 max-w-md mx-auto">
            Escribinos directo y te atendemos de inmediato. Disponible todos los días.
          </p>
          <a href={wa} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold text-base px-10 py-4 hover:bg-[#1ea853] transition-colors shadow-xl">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Abrir WhatsApp
          </a>
        </div>
      </section>

      {/* ══ TESTIMONIOS ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="text-thimpson-yellow font-bold text-xs uppercase tracking-widest">Clientes satisfechos</span>
            <h2 className="text-3xl md:text-4xl font-black text-thimpson-teal mt-2">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonios.map((t, i) => (
              <div key={t.nombre} className="border border-gray-100 p-7 hover:shadow-lg hover:border-thimpson-yellow/30 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-thimpson-yellow text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.texto}"</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="w-9 h-9 bg-thimpson-teal text-thimpson-yellow font-black text-sm flex items-center justify-center">
                    {t.nombre?.charAt(0)}
                  </div>
                  <span className="font-bold text-thimpson-teal text-sm">{t.nombre}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BANNER FINAL ══════════════════════════════════════════════ */}
      <section className="py-16 bg-thimpson-yellow">
        <div className="max-w-4xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-thimpson-teal">
              Listo para recibir tu primer pedido
            </h2>
            <p className="text-thimpson-teal/60 mt-1">Registrate gratis. Sin comisiones ocultas.</p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <Link to="/registro"
              className="bg-thimpson-teal text-thimpson-yellow font-bold text-sm px-7 py-4 hover:bg-thimpson-teal-2 transition-colors">
              Crear cuenta gratis
            </Link>
            <a href={wa} target="_blank" rel="noreferrer"
              className="border-2 border-thimpson-teal text-thimpson-teal font-bold text-sm px-7 py-4 hover:bg-thimpson-teal hover:text-white transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
