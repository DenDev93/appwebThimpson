import { useState, useEffect, useRef } from 'react'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

interface Mensaje {
  rol: 'user' | 'assistant'
  contenido: string
}

export default function ChatBotWidget() {
  const [abierto, setAbierto] = useState(false)
  const [agente, setAgente] = useState<any>(null)
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [input, setInput] = useState('')
  const [sesionId, setSesionId] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)
  const refFin = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`${API_URL}/api/agentes-ia/activo`)
      .then(r => r.ok ? r.json() : null)
      .then(json => { if (json?.data) setAgente(json.data) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (abierto && mensajes.length === 0 && agente) {
      setMensajes([{ rol: 'assistant', contenido: `¡Hola! Soy ${agente.nombre}, el asistente virtual de Thimpson Express. ¿En qué puedo ayudarte?` }])
    }
  }, [abierto, agente])

  useEffect(() => { refFin.current?.scrollIntoView({ behavior: 'smooth' }) }, [mensajes])

  const enviar = async () => {
    if (!input.trim() || cargando) return
    const msg = input.trim()
    setInput('')
    setMensajes(p => [...p, { rol: 'user', contenido: msg }])
    setCargando(true)
    try {
      const r = await fetch(`${API_URL}/api/chat-ia/public`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: msg, sesion_id: sesionId }),
      })
      const json = await r.json()
      if (json.data) {
        setSesionId(json.data.sesion_id)
        setMensajes(p => [...p, { rol: 'assistant', contenido: json.data.respuesta }])
      }
    } catch {
      setMensajes(p => [...p, { rol: 'assistant', contenido: 'Lo siento, hubo un error. Intentá de nuevo.' }])
    } finally { setCargando(false) }
  }

  if (!agente) return null

  return (
    <>
      {/* Bubble flotante */}
      <button onClick={() => setAbierto(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:bg-[#1ea853] transition-colors animate-float">
        {abierto ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
            <path d="M12 2C6.477 2 2 5.973 2 10.855c0 1.833.636 3.524 1.704 4.885L2 22l5.828-2.557A9.17 9.17 0 0012 20.71c5.523 0 10-3.973 10-8.855S17.523 2 12 2z" />
          </svg>
        )}
      </button>

      {/* Ventana chat */}
      {abierto && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] shadow-2xl animate-fade-up bg-white border border-gray-100 flex flex-col" style={{ maxHeight: '520px' }}>
          {/* Header */}
          <div className="bg-thimpson-teal px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-thimpson-yellow flex items-center justify-center text-thimpson-teal font-black text-sm">AI</div>
            <div>
              <div className="text-white font-bold text-sm">{agente.nombre}</div>
              <div className="text-white/50 text-[10px]">En línea</div>
            </div>
            <button onClick={() => setAbierto(false)} className="ml-auto text-white/40 hover:text-white">✕</button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: '300px', maxHeight: '360px' }}>
            {mensajes.map((m, i) => (
              <div key={i} className={`flex ${m.rol === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.rol === 'user'
                    ? 'bg-thimpson-teal text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {m.contenido}
                </div>
              </div>
            ))}
            {cargando && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3.5 py-2.5">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse-dot" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse-dot" style={{ animationDelay: '200ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse-dot" style={{ animationDelay: '400ms' }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={refFin} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-3 flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && enviar()}
              placeholder="Escribí tu mensaje..."
              className="flex-1 border-0 border-b-2 border-gray-200 px-0 py-1.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-thimpson-yellow transition-colors" />
            <button onClick={enviar} disabled={cargando || !input.trim()}
              className="bg-thimpson-teal text-thimpson-yellow font-bold text-sm px-4 py-1.5 hover:bg-thimpson-black-2 transition-colors disabled:opacity-40">
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
