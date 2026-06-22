import { useState, useEffect } from 'react'
import AfiliarseModal from '@/components/AfiliarseModal'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

interface Producto {
  id: string
  negocio_id: string
  nombre: string
  descripcion: string | null
  precio: number | null
  imagen_url: string | null
  categoria: string | null
  inventario: number | null
  disponible: boolean
}

interface Negocio {
  id: string
  nombre: string
  descripcion: string | null
  categoria: string | null
  logo_url: string | null
  banner_url: string | null
  telefono: string | null
  direccion: string | null
  productos: Producto[]
}

export default function Marketplace() {
  const [negocios, setNegocios] = useState<Negocio[]>([])
  const [cargando, setCargando] = useState(true)
  const [termino, setTermino] = useState('')
  const [catNegocio, setCatNegocio] = useState('')
  const [catProducto, setCatProducto] = useState('')
  const [catsNegocio, setCatsNegocio] = useState<string[]>([])
  const [catsProducto, setCatsProducto] = useState<string[]>([])
  const [afiliarAbierto, setAfiliarAbierto] = useState(false)

  const cargar = async (q?: string, cn?: string, cp?: string) => {
    setCargando(true)
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (cn) params.set('categoria_negocio', cn)
    if (cp) params.set('categoria_producto', cp)
    try {
      const r = await fetch(`${API_URL}/api/marketplace?${params.toString()}`)
      const json = await r.json()
      setNegocios(json.data ?? [])
    } catch { setNegocios([]) }
    finally { setCargando(false) }
  }

  const cargarCategorias = async () => {
    try {
      const r = await fetch(`${API_URL}/api/negocios/categorias`)
      const json = await r.json()
      setCatsNegocio(json.categorias_negocio ?? [])
      setCatsProducto(json.categorias_producto ?? [])
    } catch {}
  }

  useEffect(() => { cargar(); cargarCategorias() }, [])

  const buscar = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    cargar(termino, catNegocio, catProducto)
  }

  const limpiar = () => {
    setTermino(''); setCatNegocio(''); setCatProducto('')
    cargar()
  }

  return (
    <div className="min-h-screen">
      <div className="relative bg-thimpson-teal overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.02)_100%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-thimpson-yellow/30 to-transparent" />
        <div className="max-w-6xl mx-auto px-5 py-16 md:py-24 relative">
          <h1 className="text-3xl md:text-5xl font-black text-white text-center mb-3">
            <span className="text-thimpson-yellow">Marketplace</span> Thimpson
          </h1>
          <p className="text-white/50 text-center text-base md:text-lg max-w-2xl mx-auto">
            Descubrí negocios locales, sus productos y servicios. Todo en un solo lugar.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-8">
        {/* Search + Afiliarse */}
        <div className="flex flex-wrap gap-3 mb-6">
          <form onSubmit={buscar} className="flex gap-3 flex-1 min-w-[250px]">
            <input type="text" value={termino} onChange={e => setTermino(e.target.value)}
              placeholder="Buscá negocios, productos o servicios..."
              className="input-underline flex-1" />
            <button type="submit" className="bg-thimpson-teal text-thimpson-yellow font-bold text-sm px-6 py-2.5 hover:bg-thimpson-black-2 transition-colors">
              Buscar
            </button>
            {(termino || catNegocio || catProducto) && (
              <button type="button" onClick={limpiar} className="text-gray-400 text-sm hover:text-gray-600 px-2">
                Limpiar
              </button>
            )}
          </form>
          <button onClick={() => setAfiliarAbierto(true)}
            className="bg-thimpson-yellow text-thimpson-teal font-bold text-sm px-6 py-2.5 hover:brightness-95 transition-all shadow-md flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Afiliar mi negocio
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="group">
            <label className="block text-[11px] font-bold text-gray-400 mb-1 uppercase tracking-[1.5px] transition-colors group-focus-within:text-thimpson-yellow">
              Categoría de negocio
            </label>
            <select value={catNegocio} onChange={e => { setCatNegocio(e.target.value); cargar(termino, e.target.value, catProducto) }}
              className="input-underline cursor-pointer">
              <option value="">Todas las categorías</option>
              {catsNegocio.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="group">
            <label className="block text-[11px] font-bold text-gray-400 mb-1 uppercase tracking-[1.5px] transition-colors group-focus-within:text-thimpson-yellow">
              Categoría de producto / servicio
            </label>
            <select value={catProducto} onChange={e => { setCatProducto(e.target.value); cargar(termino, catNegocio, e.target.value) }}
              className="input-underline cursor-pointer">
              <option value="">Todos los productos</option>
              {catsProducto.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        {cargando ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-thimpson-yellow/30 border-t-thimpson-yellow rounded-full animate-spin" />
          </div>
        ) : negocios.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏪</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No hay negocios disponibles</h3>
            <p className="text-gray-500 text-sm mb-6">Aún no hay negocios afiliados en esta categoría.</p>
            <button onClick={() => setAfiliarAbierto(true)}
              className="bg-thimpson-yellow text-thimpson-teal font-bold text-sm px-8 py-3 hover:brightness-95 transition-all shadow-md">
              Afiliá tu negocio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {negocios.map(n => (
              <div key={n.id} className="border border-gray-100 bg-white overflow-hidden hover:shadow-lg transition-shadow">
                {n.banner_url ? (
                  <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${n.banner_url})` }} />
                ) : (
                  <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-300 text-4xl">🏪</div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    {n.logo_url ? (
                      <img src={n.logo_url} alt={n.nombre} className="w-10 h-10 object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-thimpson-teal flex items-center justify-center text-thimpson-yellow font-black text-lg">
                        {n.nombre.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{n.nombre}</h3>
                      {n.categoria && <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">{n.categoria}</span>}
                    </div>
                  </div>
                  {n.descripcion && <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{n.descripcion}</p>}

                  {n.productos.length > 0 && (
                    <div className="border-t border-gray-50 pt-3">
                      <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400 mb-2">
                        Productos ({n.productos.length})
                      </div>
                      <div className="space-y-2">
                        {n.productos.slice(0, 4).map(p => (
                          <div key={p.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-2 min-w-0">
                              {p.imagen_url ? (
                                <img src={p.imagen_url} alt={p.nombre} className="w-8 h-8 object-cover flex-shrink-0" />
                              ) : null}
                              <div className="min-w-0">
                                <div className="text-sm text-gray-900 truncate">{p.nombre}</div>
                                {p.categoria && <div className="text-[10px] text-gray-400 uppercase">{p.categoria}</div>}
                              </div>
                            </div>
                            {p.precio != null && (
                              <div className="text-sm font-bold text-thimpson-teal flex-shrink-0 ml-2">
                                C${p.precio.toFixed(2)}
                              </div>
                            )}
                          </div>
                        ))}
                        {n.productos.length > 4 && (
                          <div className="text-xs text-gray-400 text-center pt-1">+{n.productos.length - 4} más</div>
                        )}
                      </div>
                    </div>
                  )}

                  {n.telefono && (
                    <a href={`https://wa.me/${n.telefono.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer"
                      className="mt-4 flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-bold py-2.5 hover:bg-[#1ea853] transition-colors">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Contactar por WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AfiliarseModal abierto={afiliarAbierto} cerrar={() => setAfiliarAbierto(false)}
        onAfiliado={() => { cargar(termino, catNegocio, catProducto); cargarCategorias() }} />
    </div>
  )
}
