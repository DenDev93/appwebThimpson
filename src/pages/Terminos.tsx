export default function Terminos() {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-thimpson-teal py-14 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          Términos y <span className="text-thimpson-yellow">condiciones</span>
        </h1>
        <p className="text-white/50 text-sm">Última actualización: Enero 2026</p>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-12 text-sm text-gray-600 leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">1. Aceptación de los términos</h2>
          <p>Al utilizar los servicios de Servicio Express Thimpson (en adelante "Thimpson"), usted acepta los presentes términos y condiciones. Si no está de acuerdo, absténgase de usar nuestros servicios.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">2. Descripción del servicio</h2>
          <p>Thimpson ofrece servicios de mensajería, delivery, mandados y transporte de mercadería dentro del municipio de Ocotal, Nueva Segovia, Nicaragua. Los servicios se prestan a través de motorizados verificados, asignados según disponibilidad.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">3. Responsabilidades del usuario</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Proporcionar información veraz y completa al realizar un pedido.</li>
            <li>No solicitar el transporte de artículos prohibidos por la ley nicaragüense.</li>
            <li>Estar disponible en la dirección de recogida en el horario acordado.</li>
            <li>Realizar el pago correspondiente al momento de la entrega, salvo acuerdo previo.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">4. Tarifas y pagos</h2>
          <p>Las tarifas se calculan según la distancia, tipo de servicio y peso del paquete. El precio final se comunica antes de confirmar el servicio. Thimpson se reserva el derecho de modificar sus tarifas en cualquier momento, notificando con antelación.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">5. Limitación de responsabilidad</h2>
          <p>Thimpson no será responsable por daños indirectos, pérdidas de ganancias, o cualquier otro perjuicio derivado del uso o la imposibilidad de usar los servicios. La responsabilidad máxima se limita al valor del servicio contratado.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">6. Privacidad de datos</h2>
          <p>Thimpson recopila y procesa datos personales conforme a nuestra Política de Privacidad. No compartimos información con terceros sin consentimiento expreso del usuario, salvo obligación legal.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">7. Modificaciones</h2>
          <p>Thimpson se reserva el derecho de modificar estos términos en cualquier momento. Los cambios serán publicados en esta página y entrarán en vigencia inmediatamente después de su publicación.</p>
        </section>

        <section>
          <h2 className="text-lg font-black text-thimpson-teal mb-3">8. Contacto</h2>
          <p>Para consultas sobre estos términos, contactanos al correo <a href="mailto:contacto@thimpson.com.ni" className="text-thimpson-teal font-semibold hover:underline">contacto@thimpson.com.ni</a> o por WhatsApp al +505 8765 4321.</p>
        </section>
      </div>
    </div>
  )
}
