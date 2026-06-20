import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Registro from '@/pages/Registro'
import Dashboard from '@/pages/Dashboard'
import Servicios from '@/pages/Servicios'
import Contacto from '@/pages/Contacto'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  )
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen bg-thimpson-teal flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-thimpson-yellow/30 border-t-thimpson-yellow rounded-full animate-spin" />
        <div className="text-thimpson-yellow/60 text-sm">Verificando sesión...</div>
      </div>
    </div>
  )
  return user ? <>{children}</> : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <Routes>
      {/* Públicas con Navbar + Footer */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/servicios" element={<PublicLayout><Servicios /></PublicLayout>} />
      <Route path="/contacto" element={<PublicLayout><Contacto /></PublicLayout>} />
      <Route path="/como-funciona" element={<PublicLayout><ComoFunciona /></PublicLayout>} />
      <Route path="/trabaja-con-nosotros" element={<PublicLayout><TrabajaCon /></PublicLayout>} />

      {/* Auth — sin Navbar */}
      <Route path="/login" element={<><Navbar /><Login /></>} />
      <Route path="/registro" element={<><Navbar /><Registro /></>} />

      {/* Protegidas */}
      <Route path="/dashboard" element={<RequireAuth><><Navbar /><Dashboard /></></RequireAuth>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function ComoFunciona() {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-thimpson-teal py-20 text-center text-white">
        <h1 className="text-4xl font-black mb-3">¿Cómo funciona <span className="text-thimpson-yellow">Thimpson</span>?</h1>
        <p className="text-white/60 text-lg">Simple, rápido y confiable.</p>
      </div>
      <div className="max-w-4xl mx-auto px-5 py-16 space-y-8">
        {[
          { n: '1', t: 'Registrate o pedí por WhatsApp', d: 'Creá una cuenta gratuita en la web o escribinos al WhatsApp con tu pedido.' },
          { n: '2', t: 'Nos decís qué necesitás',        d: 'Describí tu pedido: dirección de recogida, destino, qué llevar o comprar. Sin complicaciones.' },
          { n: '3', t: 'Asignamos el motorizado más cercano', d: 'Nuestro equipo confirma y asigna el motorizado disponible más cerca de vos.' },
          { n: '4', t: 'Recibís y pagás',                 d: 'El motorizado llega, entrega y cobra en efectivo o transferencia. Sin sorpresas.' },
        ].map(p => (
          <div key={p.n} className="flex gap-6 items-start border-b border-gray-100 pb-8 last:border-0">
            <div className="w-14 h-14 bg-thimpson-teal text-thimpson-yellow flex items-center justify-center font-black text-2xl flex-shrink-0">
              {p.n}
            </div>
            <div>
              <h3 className="font-black text-xl text-gray-900 mb-2">{p.t}</h3>
              <p className="text-gray-500 leading-relaxed">{p.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TrabajaCon() {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-thimpson-teal py-20 text-center text-white">
        <h1 className="text-4xl font-black mb-3">Trabajá con <span className="text-thimpson-yellow">Thimpson</span></h1>
        <p className="text-white/60 text-lg">Unite a nuestro equipo de motorizados verificados.</p>
      </div>
      <div className="max-w-3xl mx-auto px-5 py-16 text-center">
        <div className="text-7xl mb-6">🏍️</div>
        <h2 className="text-2xl font-black text-gray-900 mb-4">¿Tenés moto y querés generar ingresos?</h2>
        <p className="text-gray-500 mb-10 leading-relaxed max-w-md mx-auto">
          Unite a nuestro equipo de motorizados. Horario flexible, pagos semanales y soporte constante.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            { icon: '💵', titulo: 'Ingresos semanales', desc: 'Recibís tu pago cada semana puntualmente.' },
            { icon: '⏰', titulo: 'Horario flexible',    desc: 'Trabajás cuando podés, sin horarios fijos.' },
            { icon: '🛡️', titulo: 'Respaldo y soporte', desc: 'Siempre vas a tener apoyo del equipo Thimpson.' },
          ].map(b => (
            <div key={b.titulo} className="bg-gray-50 border border-gray-100 p-6">
              <div className="text-3xl mb-3">{b.icon}</div>
              <h4 className="font-bold text-gray-900 mb-1">{b.titulo}</h4>
              <p className="text-gray-500 text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
        <a href="https://wa.me/50587654321?text=Hola, quiero trabajar como motorizado con Thimpson"
          target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold text-base px-10 py-4 hover:bg-[#1ea853] transition-colors">
          💬 Aplicar por WhatsApp
        </a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
