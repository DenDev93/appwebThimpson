import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const LINKS = [
  { to: '/',              label: 'Inicio',         end: true  },
  { to: '/servicios',     label: 'Servicios',      end: false },
  { to: '/como-funciona', label: 'Cómo funciona',  end: false },
  { to: '/contacto',      label: 'Contacto',       end: false },
]

export default function Navbar() {
  const { user, perfil, logout } = useAuth()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  const navBg = scrolled
    ? 'bg-white shadow-md'
    : 'bg-transparent'

  const linkColor = scrolled
    ? 'text-gray-700 hover:text-thimpson-teal'
    : 'text-white/80 hover:text-white'

  const logoColor = scrolled ? 'text-thimpson-teal' : 'text-white'
  const subColor  = scrolled ? 'text-thimpson-teal/50' : 'text-white/40'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center gap-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 bg-thimpson-yellow flex items-center justify-center font-black text-xl text-thimpson-teal">
            T
          </div>
          <div>
            <div className={`font-black text-lg leading-none tracking-tight transition-colors ${logoColor}`}>
              Thimpson
            </div>
            <div className={`text-[9px] font-bold tracking-[2px] uppercase transition-colors ${subColor}`}>
              Express
            </div>
          </div>
        </Link>

        {/* Links desktop */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-thimpson-yellow font-bold'
                    : linkColor
                }`
              }>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Acciones desktop */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {user ? (
            <>
              <Link to="/dashboard"
                className={`text-sm font-medium transition-colors ${linkColor}`}>
                Mi cuenta
              </Link>
              <button onClick={() => logout()}
                className={`text-sm transition-colors ${scrolled ? 'text-gray-400 hover:text-red-500' : 'text-white/40 hover:text-red-400'}`}>
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className={`text-sm font-medium transition-colors ${linkColor}`}>
                Iniciar sesión
              </Link>
              <Link to="/registro"
                className="bg-thimpson-yellow text-thimpson-teal text-sm font-bold px-5 py-2.5 hover:bg-thimpson-yellow-d transition-colors shadow-md">
                Pedir ahora
              </Link>
            </>
          )}
        </div>

        {/* Hamburger mobile */}
        <button
          onClick={() => setOpen(o => !o)}
          className={`md:hidden ml-auto flex flex-col gap-1.5 p-1 transition-colors ${scrolled ? 'text-thimpson-teal' : 'text-white'}`}
          aria-label="Menú">
          <span className={`block w-6 h-0.5 bg-current transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden bg-thimpson-teal border-t border-white/10 px-5 py-4">
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-3 text-sm font-medium border-b border-white/10 ${isActive ? 'text-thimpson-yellow' : 'text-white/80'}`
              }>
              {l.label}
            </NavLink>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)}
                  className="text-center bg-thimpson-yellow text-thimpson-teal font-bold py-3 text-sm">
                  Mi cuenta
                </Link>
                <button onClick={() => { logout(); setOpen(false) }}
                  className="text-sm text-white/40 py-2">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}
                  className="text-center border-2 border-white/30 text-white font-medium py-3 text-sm">
                  Iniciar sesión
                </Link>
                <Link to="/registro" onClick={() => setOpen(false)}
                  className="text-center bg-thimpson-yellow text-thimpson-teal font-bold py-3 text-sm">
                  Pedir ahora
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
