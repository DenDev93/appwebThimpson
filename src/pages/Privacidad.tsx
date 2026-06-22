export default function Privacidad() {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-thimpson-teal py-14 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          Política de <span className="text-thimpson-yellow">privacidad</span>
        </h1>
        <p className="text-white/50 text-sm">Última actualización: Enero 2026</p>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-12 text-sm text-gray-600 leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">1. Información que recopilamos</h2>
          <p>Recopilamos la siguiente información personal cuando utilizas nuestros servicios:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Nombre completo y datos de contacto (teléfono, correo electrónico).</li>
            <li>Direcciones de recogida y entrega.</li>
            <li>Información de pago (en su caso).</li>
            <li>Datos de uso de la plataforma.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">2. Uso de la información</h2>
          <p>Utilizamos tu información para:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Procesar y gestionar tus pedidos de delivery.</li>
            <li>Comunicarnos con vos sobre el estado de tus solicitudes.</li>
            <li>Mejorar nuestros servicios y la experiencia del usuario.</li>
            <li>Cumplir con obligaciones legales y regulatorias.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">3. Protección de datos</h2>
          <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, pérdida, alteración o divulgación. Tus datos se almacenan en servidores seguros con acceso restringido.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">4. Compartir información</h2>
          <p>No vendemos, comercializamos ni transferimos tu información personal a terceros sin tu consentimiento, excepto:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>A motorizados asignados para cumplir con tu pedido.</li>
            <li>Cuando sea requerido por ley o autoridad competente.</li>
            <li>A proveedores de servicios que nos ayudan a operar la plataforma.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">5. Tus derechos</h2>
          <p>Tenés derecho a:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Acceder a tu información personal.</li>
            <li>Solicitar la corrección de datos inexactos.</li>
            <li>Solicitar la eliminación de tus datos.</li>
            <li>Oponerte al procesamiento de tus datos.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">6. Cookies</h2>
          <p>Nuestra plataforma utiliza cookies esenciales para el funcionamiento. No utilizamos cookies de rastreo publicitario sin tu consentimiento explícito.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">7. Cambios a esta política</h2>
          <p>Podemos actualizar esta política periódicamente. Los cambios serán publicados en esta página con la fecha de actualización correspondiente.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">8. Contacto</h2>
          <p>Para ejercer tus derechos o realizar consultas sobre privacidad, escribinos a <a href="mailto:contacto@thimpson.com.ni" className="text-thimpson-teal font-semibold hover:underline">contacto@thimpson.com.ni</a>.</p>
        </section>
      </div>
    </div>
  )
}
