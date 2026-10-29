import type { Metadata } from "next";
import WhatsAppButton from "@/components/whatsapp-button";
import { RevealObserver, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { siteConfig } from "@/lib/site-config";

const SITE_TITLE = "Política de privacidad — CeroTraba";
const SITE_DESCRIPTION =
  "Cómo CeroTraba recopila, usa y protege los datos personales de quienes contactan nuestros servicios: formulario web, WhatsApp, correo y navegación.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/privacidad",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "CeroTraba",
    type: "website",
    locale: "es_VE",
    url: "/privacidad",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function PrivacidadPage() {
  return (
    <main className="site-shell cerotaba">
      <SiteHeader prefix="/" />

      <section className="page-hero page-hero--legal">
        <div className="page-width">
          <p className="eyebrow">Legal</p>
          <h1>Política de privacidad.</h1>
          <p className="page-lead">
            Tu confianza es la base de nuestro trabajo. Aquí explicamos, en lenguaje claro, qué datos recopilamos, para
            qué los usamos y qué derechos tienes sobre ellos.
          </p>
          <span className="legal-updated">Última actualización: 30 de octubre de 2026</span>
        </div>
      </section>

      <section className="legal-section">
        <div className="legal-wrap legal-body">
          <h2>1. Responsable del tratamiento</h2>
          <p>
            Los datos personales tratados a través de este sitio web son responsabilidad de CeroTraba, empresa de
            servicios tecnológicos con base en Los Teques, estado Miranda, Venezuela. Para cualquier consulta relacionada
            con esta política o con el manejo de tus datos, puedes escribirnos a{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> o comunicarte por WhatsApp al
            +58 {siteConfig.whatsappNumber.slice(2, 5)}-{siteConfig.whatsappNumber.slice(5, 8)}-
            {siteConfig.whatsappNumber.slice(8)}.
          </p>

          <h2>2. Datos que recopilamos</h2>
          <p>Recopilamos únicamente los datos necesarios para atender tus solicitudes:</p>
          <ul>
            <li>
              <strong>Datos del formulario de contacto:</strong> nombre, número de WhatsApp, correo electrónico, servicio
              de interés y el mensaje que decidas escribirnos.
            </li>
            <li>
              <strong>Datos de comunicaciones directas:</strong> si nos escribes por WhatsApp, correo o redes sociales,
              conservamos la conversación para dar seguimiento a tu caso.
            </li>
            <li>
              <strong>Datos técnicos de navegación:</strong> información estándar que registra todo servidor (tipo de
              navegador, páginas visitadas, fecha y hora) con fines de seguridad y mejora del sitio.
            </li>
          </ul>
          <p>
            No recopilamos datos sensibles, no solicitamos información bancaria a través del sitio y no creamos perfiles
            publicitarios con tu información.
          </p>

          <h2>3. Para qué usamos tus datos</h2>
          <p>Utilizamos tus datos exclusivamente para:</p>
          <ul>
            <li>Responder tus consultas y preparar las propuestas que nos solicites.</li>
            <li>Coordinar visitas técnicas, diagnósticos e instalaciones acordadas contigo.</li>
            <li>Dar seguimiento comercial a tu solicitud mientras esté vigente.</li>
            <li>Cumplir obligaciones legales o fiscales aplicables cuando corresponda.</li>
          </ul>
          <p>
            No vendemos, alquilamos ni cedemos tus datos personales a terceros con fines comerciales. No te enviaremos
            boletines ni publicidad sin tu autorización expresa.
          </p>

          <h2>4. Consentimiento</h2>
          <p>
            Al enviar el formulario de contacto o escribirnos por nuestros canales, otorgas tu consentimiento para el
            tratamiento de los datos que compartas, conforme al derecho al habeas data reconocido en la Constitución de
            la República Bolivariana de Venezuela (artículos 28 y 60). El consentimiento es voluntario: puedes retirarlo
            en cualquier momento escribiéndonos por los mismos canales.
          </p>

          <h2>5. Cuánto tiempo conservamos tus datos</h2>
          <p>
            Conservamos los datos de contacto mientras dure la relación comercial y, con posterioridad, únicamente por el
            tiempo razonable de seguimiento (hasta 24 meses) o cuando exista una obligación legal o fiscal que exija
            conservarlos. Si deseas que eliminemos tu información antes, puedes solicitarlo y la borraremos salvo
            obligación legal en contrario.
          </p>

          <h2>6. Con quién compartimos tu información</h2>
          <p>Tus datos solo se comparten con los proveedores operativos estrictamente necesarios para prestarte el servicio:</p>
          <ul>
            <li>
              <strong>Alojamiento del sitio y de la base de datos de contactos</strong> (infraestructura de nube con
              medidas de seguridad administradas).
            </li>
            <li>
              <strong>Servicios de mensajería y correo</strong> (WhatsApp, proveedores de correo electrónico) para
              comunicarnos contigo.
            </li>
            <li>
              <strong>Automatizaciones de notificación</strong>: si está activo nuestro sistema de avisos, un nuevo
              mensaje de contacto se envía de forma cifrada a los canales internos del equipo CeroTraba.
            </li>
          </ul>
          <p>
            Estos proveedores tratan la información únicamente para operar el servicio, bajo condiciones de
            confidencialidad. Podríamos además divulgar información cuando una autoridad competente lo exija por ley.
          </p>

          <h2>7. Cookies</h2>
          <p>
            Este sitio utiliza únicamente almacenamiento técnico necesario para su funcionamiento (por ejemplo, para
            recordar tu sesión en el panel de administración). No utilizamos cookies de publicidad ni de seguimiento de
            terceros. Puedes borrar o bloquear las cookies desde la configuración de tu navegador sin que el sitio deje
            de funcionar.
          </p>

          <h2>8. Cómo protegemos tu información</h2>
          <p>
            Aplicamos medidas técnicas y organizativas razonables para proteger tus datos: transmisión cifrada (HTTPS),
            acceso restringido a la base de datos de contactos mediante autenticación, permisos mínimos por persona en el
            equipo y buenas prácticas de respaldo. Ningún sistema es infalible, pero nos comprometemos a actuar con
            diligencia y a comunicarte cualquier incidente relevante que te afecte.
          </p>

          <h2>9. Tus derechos</h2>
          <p>En cualquier momento puedes ejercer los siguientes derechos escribiéndonos a {siteConfig.contactEmail}:</p>
          <ul>
            <li>
              <strong>Acceso:</strong> solicitarnos qué datos tuyos tenemos y con qué finalidad.
            </li>
            <li>
              <strong>Rectificación:</strong> corregir datos inexactos o desactualizados.
            </li>
            <li>
              <strong>Supresión:</strong> pedir la eliminación de tus datos personales.
            </li>
            <li>
              <strong>Oposición:</strong> oponerte a que usemos tus datos para fines determinados, como el seguimiento
              comercial.
            </li>
          </ul>
          <p>
            Respondemos estas solicitudes en un plazo razonable y, en todo caso, en el menor tiempo posible. Puede que te
            pidamos información adicional para verificar tu identidad antes de ejecutar la solicitud.
          </p>

          <h2>10. Menores de edad</h2>
          <p>
            Nuestros servicios están dirigidos a empresas y personas adultas. No recopilamos intencionalmente datos de
            menores de edad. Si un padre o representante considera que un menor nos envió información, puede
            solicitarnos su eliminación inmediata.
          </p>

          <h2>11. Enlaces a otros sitios</h2>
          <p>
            Nuestro sitio puede contener enlaces a sitios de terceros (por ejemplo, proyectos nuestros como conectalt.com
            o el botón de WhatsApp). Esta política no aplica a sitios ajenos: te recomendamos revisar sus propias
            políticas de privacidad antes de compartir información con ellos.
          </p>

          <h2>12. Cambios en esta política</h2>
          <p>
            Podemos actualizar esta política para reflejar cambios en nuestros servicios o en la normativa aplicable.
            Publicaremos aquí la versión vigente con su fecha de actualización. Los cambios significativos se
            comunicarán por los canales habituales de contacto.
          </p>

          <h2>13. Contacto</h2>
          <p>
            ¿Preguntas sobre esta política o sobre cómo protegemos tu información? Escríbenos a{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> o desde el{" "}
            <a href="/#contacto">formulario de contacto</a> de nuestra página principal. En CeroTraba trata tu
            información con el mismo cuidado con el que tratamos la tecnología de tu negocio.
          </p>
        </div>
      </section>

      <RevealObserver />
      <WhatsAppButton />
      <SiteFooter />
    </main>
  );
}
