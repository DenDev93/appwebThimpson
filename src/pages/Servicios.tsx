import { Link } from 'react-router-dom'

const SERVICIOS = [
  {
    icono: '🚚',
    nombre: 'Delivery Express',
    desc: 'Servicio de mensajería y paquetería express dentro de Ocotal. Llevamos lo que necesites de un punto a otro en menos de 60 minutos.',
    precio: 'Desde C$50',
    incluye: ['Recolección en tu ubicación', 'Entrega en el destino indicado', 'Confirmación en tiempo real'],
    color: 'bg-yellow-50 border-yellow-100',
  },
  {
    icono: '🛒',
    nombre: 'Compras en supermercado',
    desc: 'Mandamos a hacer tus compras en La Colonia, La Unión u otros supermercados y te las llevamos a casa.',
    precio: 'Desde C$80',
    incluye: ['Lista de compras por WhatsApp', 'Compra con tu dinero o tarjeta', 'Entrega mismo día'],
    color: 'bg-green-50 border-green-100',
  },
  {
    icono: '🍔',
    nombre: 'Pedidos de restaurant',
    desc: 'Pedimos tu comida favorita en los mejores restaurantes de Ocotal y te la entregamos caliente.',
    precio: 'Desde C$40',
    incluye: ['Cualquier restaurante local', 'Tiempo estimado < 45 min', 'Pago contra entrega'],
    color: 'bg-red-50 border-red-100',
  },
  {
    icono: '📦',
    nombre: 'Envío de documentos',
    desc: 'Documentos, contratos, facturas, cartas. Los llevamos de manera segura y con entrega garantizada.',
    precio: 'Desde C$35',
    incluye: ['Manejo cuidadoso', 'Confirmación de entrega', 'Recibo de confirmación'],
    color: 'bg-blue-50 border-blue-100',
  },
  {
    icono: '💊',
    nombre: 'Farmacia a domicilio',
    desc: 'Medicamentos, vitaminas y productos de salud recogidos en la farmacia de tu elección.',
    precio: 'Desde C$50',
    incluye: ['Prescripción fotografiada', 'Cualquier farmacia de Ocotal', 'Entrega urgente disponible'],
    color: 'bg-purple-50 border-purple-100',
  },
  {
    icono: '🔧',
    nombre: 'Servicios especiales',
    desc: '¿Necesitas algo que no está en la lista? Contáctanos y buscamos la solución más rápida.',
    precio: 'Cotización',
    incluye: ['Coordinación personalizada', 'Presupuesto inmediato', 'Solución a medida'],
    color: 'bg-orange-50 border-orange-100',
  },
]

export default function Servicios() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div className="bg-thimpson-teal py-16 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
          Nuestros <span className="text-thimpson-yellow">servicios</span>
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Todo lo que necesitas, entregado rápido y seguro en Ocotal.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICIOS.map(s => (
            <div key={s.nombre} className={`rounded-2xl border p-6 ${s.color}`}>
              <div className="text-4xl mb-4">{s.icono}</div>
              <h3 className="font-black text-gray-900 text-xl mb-2">{s.nombre}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="space-y-1.5 mb-5">
                {s.incluye.map(i => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-green-500 font-bold">✓</span> {i}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-thimpson-teal text-lg">{s.precio}</span>
                <a href="https://wa.me/50587654321" target="_blank" rel="noreferrer"
                  className="text-sm bg-thimpson-teal text-thimpson-yellow font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
                  Pedir
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center bg-thimpson-teal rounded-3xl p-10">
          <h2 className="text-3xl font-black text-white mb-3">¿Listo para tu primer pedido?</h2>
          <p className="text-white/60 mb-7 text-lg">Crea tu cuenta o contáctanos directo por WhatsApp.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registro" className="btn-primary text-base !py-4 !px-10">Crear cuenta gratis</Link>
            <a href="https://wa.me/50587654321" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-whatsapp text-white font-bold px-10 py-4 rounded-2xl hover:opacity-90">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
