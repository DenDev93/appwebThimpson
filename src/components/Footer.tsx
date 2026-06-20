import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-thimpson-teal text-white">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-thimpson-yellow flex items-center justify-center font-black text-thimpson-teal text-2xl">T</div>
              <div>
                <div className="text-thimpson-yellow font-black text-lg leading-none">Thimpson</div>
                <div className="text-white/40 text-[10px] font-bold tracking-widest uppercase mt-0.5">Express Delivery</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Tu aliado de confianza para entregas rápidas y seguras en Ocotal, Nicaragua.
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/50587654321" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-bold px-4 py-2.5 hover:bg-[#1ea853] transition-colors">
                💬 WhatsApp
              </a>
              <a href="tel:+50587654321"
                className="flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-4 py-2.5 hover:bg-white/20 transition-colors">
                📞 Llamar
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-thimpson-yellow font-bold text-xs uppercase tracking-widest mb-4">Servicios</h4>
            <ul className="space-y-2.5">
              {['Delivery Express', 'Compras en supermercado', 'Envío de documentos', 'Traslado de paquetes', 'Pedidos de restaurante'].map(s => (
                <li key={s}>
                  <Link to="/servicios" className="text-white/50 hover:text-white text-sm transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-thimpson-yellow font-bold text-xs uppercase tracking-widest mb-4">Empresa</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Cómo funciona',       to: '/como-funciona' },
                { label: 'Trabajá con nosotros', to: '/trabaja-con-nosotros' },
                { label: 'Contacto',             to: '/contacto' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/50 hover:text-white text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {year} Servicio Express Thimpson. Ocotal, Nueva Segovia, Nicaragua.
          </p>
          <div className="flex gap-5">
            <Link to="/terminos"  className="text-white/30 hover:text-white/60 text-xs transition-colors">Términos</Link>
            <Link to="/privacidad" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
