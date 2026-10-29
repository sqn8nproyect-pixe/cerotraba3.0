/**
 * Contenido del blog de CeroTraba.
 * Cada artículo vive aquí como dato estructurado: /blog lista los posts
 * y /blog/[slug] los renderiza. Para publicar uno nuevo, añade un objeto
 * a este arreglo (la ruta, el sitemap y el listado se actualizan solos).
 */

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO (AAAA-MM-DD)
  readTime: string;
  image: string;
  imageAlt: string;
  intro: string;
  sections: BlogSection[];
  takeaway: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "automatizar-procesos-negocio",
    title: "5 procesos que tu negocio puede automatizar hoy mismo",
    excerpt:
      "Las tareas repetitivas le roban horas a tu equipo todos los días. Estas cinco automatizaciones son las que más impacto tienen en negocios como el tuyo y no requieren una gran inversión para empezar.",
    category: "Automatización",
    date: "2026-10-30",
    readTime: "6 min de lectura",
    image: "/servicios/automatizacion.jpg",
    imageAlt:
      "Monitor mostrando un panel de automatización de procesos conectados para un negocio",
    intro:
      "Cuando preguntamos a un dueño de negocio cuánto tiempo pierde su equipo en tareas repetitivas, la respuesta casi siempre es la misma: mucha más de la que cree. Copiar datos de un lado a otro, responder lo mismo veinte veces al día, perseguir cotizaciones enviadas y olvidadas… Todo eso es tiempo que no se dedica a vender, atender mejor o simplemente respirar. La buena noticia es que automatizar ya no es un lujo de corporaciones: con las herramientas correctas, un negocio pequeño puede empezar esta misma semana.",
    sections: [
      {
        heading: "¿Qué significa automatizar de verdad?",
        paragraphs: [
          "Automatizar no es instalar un robot que hace magia. Es conectar las herramientas que ya usas —WhatsApp, correo, hojas de cálculo, tu sistema de facturación— para que la información fluya sola y las tareas que se repiten con patrón fijo se ejecuten sin intervención humana. Cuando un cliente escribe, su solicitud queda registrada; cuando envías una cotización, se programa el seguimiento; cuando llega la hora del cierre, el reporte del día ya está en tu correo.",
          "El objetivo no es eliminar personas, sino liberarlas de lo mecánico para que se concentren en lo que sí requiere criterio: negociar, decidir, atender bien a un cliente complicado. Una automatización bien hecha se nota porque el día se siente más ligero, no porque el negocio se vuelva frío.",
        ],
      },
      {
        heading: "1. Respuesta a clientes en WhatsApp y redes",
        paragraphs: [
          "Para la mayoría de los negocios en Venezuela, WhatsApp es el canal de ventas. Y también el cuello de botella: mensajes que llegan fuera de horario, preguntas repetidas una y otra vez, clientes que se van porque nadie contestó a tiempo. Una capa de automatización puede responder al instante con la información básica, derivar el caso a la persona correcta y avisar al equipo cuando un mensaje lleva demasiado tiempo sin respuesta.",
        ],
        bullets: [
          "Respuestas automáticas fuera de horario con la información esencial.",
          "Plantillas para las veinte preguntas que te hacen todos los días.",
          "Avisos al equipo cuando un mensaje potencialmente valioso lleva sin responder.",
          "Registro ordenado de cada conversación para no perder el hilo.",
        ],
      },
      {
        heading: "2. Seguimiento de cotizaciones y ventas",
        paragraphs: [
          "Una cotización enviada sin seguimiento es una venta que se enfría. El problema es que nadie tiene memoria para perseguir treinta cotizaciones al mismo tiempo, y menos mientras atiende la operación diaria. Automatizado, el proceso cambia: cada cotización genera recordatorios a los 2, 5 y 10 días, el vendedor recibe el aviso con el contexto listo y el cliente siente un negocio pendiente de él, no uno que lo olvidó.",
          "Este es, por regla general, el primer automatismo que paga su propio costo. El seguimiento constante sube la tasa de cierre sin cambiar absolutamente nada del producto ni del precio.",
        ],
      },
      {
        heading: "3. Reportes y facturación del día a día",
        paragraphs: [
          "Si tu reporte de ventas se arma a mano cada semana, estás pagando un impuesto de tiempo todos los meses. Los reportes periódicos —ventas del día, productos más pedidos, facturas por cobrar— son candidatos perfectos para automatizarse: los datos ya existen en algún sistema, solo hace falta que alguien los reúna y los presente. Ese alguien puede ser un proceso que corre solo a la hora que tú decidas.",
          "Lo mismo aplica a recordatorios de cobro: un aviso automático y amable antes del vencimiento reduce la cartera vencida sin que tengas que hacer el papel de cobrador con cada cliente.",
        ],
      },
      {
        heading: "4. Coordinación de equipos y tareas",
        paragraphs: [
          "Cuando el equipo crece, la coordinación por memoria y por voz empieza a fallar: tareas que se duplican, pendientes que nadie asume, acuerdos que se pierden en un chat lleno de mensajes. Una automatización de gestión puede tomar cada solicitud nueva, convertirla en tarea asignada, avisar al responsable y escalar si pasa cierto tiempo sin avanzar.",
        ],
        bullets: [
          "Cada solicitud nueva se convierte en tarea con responsable y fecha.",
          "Avisos automáticos cuando algo lleva demasiado tiempo estancado.",
          "Una vista única de lo pendiente, sin buscar entre chats y notas.",
        ],
      },
      {
        heading: "5. Respaldo y vigilancia de tu información",
        paragraphs: [
          "La información del negocio —clientes, facturas, inventario— suele vivir en una sola computadora que nadie respalda hasta el día en que falla. Una automatización de respaldo copia lo importante a intervalos regulares, guarda versiones y avisa cuando algo no se respaldó correctamente. Es la automatización más aburrida y la única que puede salvar el negocio en un mal día.",
          "En la misma línea van los avisos técnicos: si la cámara dejó de grabar, si el internet de la tienda se cayó, si el disco está lleno, el sistema debe avisar primero. Enterarse de una falla por el cliente es la forma más cara de enterarse.",
        ],
      },
      {
        heading: "Por dónde empezar sin volverse loco",
        paragraphs: [
          "No intentes automatizar todo a la vez. El camino que funciona es elegir el proceso que más duele hoy —el que consume más horas o genera más errores—, automatizarlo completo, medir la diferencia durante unas semanas y luego pasar al siguiente. Cada automatización exitosa financia la confianza para la siguiente.",
          "En CeroTraba comenzamos siempre con una conversación: entendemos cómo trabaja tu equipo hoy, identificamos dónde se atasca y proponemos un primer alcance pequeño y medible. La tecnología se adapta a tu operación, no al revés.",
        ],
      },
    ],
    takeaway:
      "Empieza por el proceso que más te duele, automatízalo completo y deja que el tiempo liberado pague el siguiente paso. Automatizar no es un proyecto gigante: es una serie de decisiones pequeñas y bien tomadas.",
  },
  {
    slug: "cctv-antes-de-comprar-camaras",
    title: "CCTV para tu negocio: lo que debes saber antes de comprar cámaras",
    excerpt:
      "Comprar cámaras por catálogo termina, casi siempre, en imágenes borrosas y puntos muertos. Esta guía práctica te ayuda a entender qué necesitas realmente antes de gastar un solo dólar en equipos.",
    category: "Seguridad",
    date: "2026-10-21",
    readTime: "7 min de lectura",
    image: "/servicios/cctv.jpg",
    imageAlt: "Cámara de seguridad CCTV moderna instalada en el techo de un local comercial",
    intro:
      "Cada semana vemos el mismo escenario: un negocio que compró un kit de cámaras en una tienda, lo instaló solo o con la persona que fuera más disponible, y meses después descubre —justo cuando más lo necesitaba— que la imagen del ladrón es una mancha irreconocible o que la cámara principal llevaba semanas sin grabar. El problema casi nunca es la marca de las cámaras. Es que se compró equipo antes de diseñar el sistema.",
    sections: [
      {
        heading: "El error más común: comprar antes de diseñar",
        paragraphs: [
          "Un sistema de videovigilancia no es una cantidad de cámaras: es un diseño que responde a preguntas concretas. ¿Qué quieres ver y con qué detalle? ¿Necesitas reconocer un rostro en la puerta o basta con ver que alguien pasó por el pasillo? ¿Qué pasa de noche? ¿Quién va a revisar las grabaciones y con qué frecuencia? Sin esas respuestas, cualquier presupuesto es una apuesta.",
          "El diseño correcto parte de un recorrido por el local: entradas, cajas, almacén, puntos ciegos, iluminación de cada área de noche. Con eso se define cuántas cámaras hacen falta, de qué tipo y dónde va el equipo de grabación. A veces el resultado sorprende: hay negocios que necesitan menos cámaras de las que pensaban, pero mejores y mejor ubicadas.",
        ],
      },
      {
        heading: "Resolución: más megapíxeles no siempre es la respuesta",
        paragraphs: [
          "El marketing vende resoluciones cada vez más grandes, pero la resolución solo importa en relación con lo que quieres distinguir y a qué distancia. Una cámara de alta resolución mal ubicada —lejos, contra la luz, detrás de un estante— produce imágenes nítidas de lo que no importa. Una cámara modesta bien colocada a la altura correcta en la entrada puede identificar a una persona perfectamente.",
          "Lo que sí conviene exigir: cámaras con visión nocturna real en las áreas críticas, lente adecuado al ancho de zona que debe cubrir y Grabación fluida en los puntos de paso obligado. La calidad se decide en el diseño, no en la caja del producto.",
        ],
        bullets: [
          "Identificar rostros: cámaras cercanas a entradas y cajas, a altura de cara.",
          "Ver movimiento general: cámaras de mayor ángulo en áreas amplias.",
          "Áreas oscuras: verificar visión nocturna real, no solo luces infrarrojas de relleno.",
        ],
      },
      {
        heading: "Dónde colocar las cámaras importa más que cuántas",
        paragraphs: [
          "Hay ubicaciones que valen por sí solas: la entrada principal (de frente, para capturar rostros), el área de cajas (para ver transacciones), el punto de carga y descarga si lo hay, y los accesos laterales o traseros, que son justamente los que suelen quedar sin cubrir. Cubrir el interior bonito y dejar el fondo del local a oscuras es un clásico del CCTV mal planeado.",
          "También hay que mirar hacia arriba y hacia abajo: techos con lámparas que provocan contraluz, paredes que reflejan el sol de la tarde, estanterías que crecen y tapan la vista. Una instalación profesional considera cómo se usará el espacio dentro de seis meses, no solo cómo está hoy.",
        ],
      },
      {
        heading: "Grabación y almacenamiento: cuántos días necesitas",
        paragraphs: [
          "¿De qué sirve grabar si borras la evidencia a los cuatro días? Los negocios suelen necesitar entre 15 y 30 días de retención, según el giro: donde hay manejo de efectivo o mercancía de alto valor, más es mejor. Eso define el tamaño del equipo de grabación y el disco que lo acompaña, decisiones que conviene tomar con criterio y no con lo que traiga el kit.",
          "Igual de importante es verificar que el sistema esté grabando de verdad. Suena obvio, pero la mayoría de las fallas se descubren tarde: un disco lleno desde hace semanas, una cámara desconectada, una fecha mal configurada que invalida la evidencia. Un sistema bien entregado incluye una revisión periódica programada, no la suposición de que todo funciona.",
        ],
      },
      {
        heading: "Verlo desde el celular: acceso remoto bien configurado",
        paragraphs: [
          "Poder ver el local desde el teléfono es, para muchos dueños, la razón principal del sistema. Para que funcione bien hace falta más que instalar la app: la red del negocio debe estar configurada para dar acceso remoto de forma segura, con contraseñas propias —nunca las que trae el equipo de fábrica— y sin exponer el sistema a cualquiera que escanee la red.",
          "Un acceso remoto mal configurado es una puerta abierta en dos sentidos: tú no puedes ver tu negocio, o peor, alguien más puede. La configuración segura de red es parte del trabajo, no un extra.",
        ],
      },
      {
        heading: "El sistema se mantiene, no se olvida",
        paragraphs: [
          "Las cámaras se ensucian, los cables se aflojan, los discos se llenan y las fechas se desconfiguran. Un plan de mantenimiento simple —revisión de imagen de cada cámara, limpieza de lentes, verificación de grabación y de acceso remoto— alarga la vida del sistema y garantiza que, cuando lo necesites, las imágenes estén ahí.",
          "En CeroTraba entregamos los sistemas de CCTV con diseño previo, configuración de acceso remoto seguro y opción de mantenimiento programado. Si ya tienes cámaras y no sabes si están grabando bien, también podemos hacer una auditoría de lo instalado.",
        ],
      },
    ],
    takeaway:
      "Antes de comprar cámaras, diseña el sistema: qué quieres ver, desde dónde, con qué detalle y por cuántos días. El equipo correcto instalado en el lugar correcto vale más que cualquier lista de especificaciones.",
  },
  {
    slug: "pagina-web-que-convierte",
    title: "¿Tu página web no trae clientes? Los motivos más comunes",
    excerpt:
      "Tener una página publicada no es lo mismo que tener una página que vende. Revisamos las causas más frecuentes por las que una web no genera contactos y qué hacer para corregirlas.",
    category: "Web",
    date: "2026-10-13",
    readTime: "6 min de lectura",
    image: "/servicios/web.jpg",
    imageAlt: "Laptop mostrando el diseño de una página web moderna orientada a conversiones",
    intro:
      "Le pasa a más negocios de los que lo admiten: la página existe, tiene su dominio, hasta aparece en Google si buscas el nombre exacto… y no trae ni un mensaje por semana. La web dejó de ser un volante digital hace años: es un vendedor que trabaja 24 horas, y como cualquier vendedor, puede estar haciendo bien su trabajo o estar ahí, parado, ocupando espacio. Estas son las causas que encontramos una y otra vez.",
    sections: [
      {
        heading: "Nadie te encuentra: la web no está optimizada para búsqueda",
        paragraphs: [
          "El primer motivo, y el más incómodo: si tu cliente busca \"servicio de X en tu ciudad\" y tu página no aparece en los primeros resultados, para efectos prácticos no existe. Estar indexado no es suficiente; hace falta contenido que responda a lo que la gente busca, títulos y descripciones bien trabajados, datos estructurados que le expliquen a Google quién eres, qué ofreces y en dónde.",
          "La optimización para buscadores no es un truco: es hablar claro. Cada servicio con su propia explicación, cada pregunta frecuente respondida en la página, la ciudad y el área de servicio mencionadas donde corresponde. Google premia las páginas que responden mejor; los clientes, también.",
        ],
        bullets: [
          "Título y descripción de cada página pensados como un mensaje de venta.",
          "Contenido que responde las preguntas reales de los clientes.",
          "Datos estructurados (schema) para negocio local, servicios y preguntas frecuentes.",
          "Sitemap y robots correctamente configurados para que Google lea todo.",
        ],
      },
      {
        heading: "Llegan, pero no entienden qué haces en 5 segundos",
        paragraphs: [
          "Cuando alguien entra a tu página, le das una ventana cortísima: o entiende en segundos qué ofreces, para quién es y por qué te conviene a ti, o se devuelve a los resultados. Las páginas que no convierten suelen fallar aquí: titulares abstractos que suenan bonito pero no dicen nada, la información clave enterrada en párrafos largos, imágenes genéricas que podrían pertenecer a cualquier empresa del mundo.",
          "La prueba es simple: muéstrale tu página diez segundos a alguien que no conoce el negocio y pregúntale qué vendes y a quién. Si la respuesta duda, el mensaje necesita trabajo.",
        ],
      },
      {
        heading: "No hay un siguiente paso claro",
        paragraphs: [
          "El visitante está interesado… ¿y ahora qué? Muchas páginas terminan en un pie con un correo escrito en letra pequeña. Una página que convierte le ofrece al visitante un camino evidente en todo momento: un botón de contacto visible, un formulario corto, un botón de WhatsApp que abre la conversación directamente. Cada sección de la página debería desembocar, de forma natural, en ese siguiente paso.",
          "Ojo con la fricción: formularios de diez campos espantan. Nombre, WhatsApp o correo y el motivo bastan para empezar una conversación. Todo lo demás se pregunta después, ya en contacto.",
        ],
      },
      {
        heading: "El celular quedó como una ocurrencia",
        paragraphs: [
          "La mayoría de las visitas a una web de servicios llegan desde el teléfono, muchas desde un enlace que pusiste tú mismo en WhatsApp o Instagram. Si la página en el celular se ve pequeña, el texto no se lee, los botones están pegados y el formulario es un suplicio, cada bolívar invertido en atraer la visita se está regalando.",
          "Revisar la propia página en el teléfono es un ejercicio que todo dueño de negocio debería hacer cada tanto: entrar, leer, oprimir el botón de contacto y completar el formulario. Lo que te moleste a ti, le molesta al doble a un cliente con prisa.",
        ],
      },
      {
        heading: "La página es lenta o se ve abandonada",
        paragraphs: [
          "Una página que tarda más de unos segundos en cargar pierde visitantes antes de mostrar nada: las imágenes enormes sin optimizar y los servicios mal alojados cobran factura. Y una página con precios de 2019, una dirección que ya no existe o un blog cuyo último artículo es de hace dos años transmite exactamente lo contrario de la confianza que necesitas.",
          "La velocidad se corrige con técnica: imágenes comprimidas, código limpio, un hosting que responda. La vigencia se corrige con hábito: una actualización al mes —un artículo, un proyecto nuevo, un testimonio— mantiene la página viva y, de paso, le da razones a Google para volver a visitarla.",
        ],
      },
      {
        heading: "Qué revisar esta misma semana",
        paragraphs: [
          "Antes de pensar en rediseñar nada, haz este recorrido: búscate en Google como te buscaría un cliente (no por tu nombre) y mira si apareces. Abre tu página en un teléfono y cronometra la carga. Pregúntale a alguien ajeno al negocio qué vendes después de diez segundos de verla. Cuenta cuántos clics hacen falta para llegar al formulario o al WhatsApp.",
          "Si alguno de esos pasos falla, ya sabes por dónde empezar. En CeroTraba construimos páginas pensadas para convertir: rápidas, claras en el celular y con el mensaje bien afilado. Y si tu página actual solo necesita ajustes, te lo vamos a decir — no todos los problemas requieren empezar de cero.",
        ],
      },
    ],
    takeaway:
      "Una página que no convierte casi siempre falla en lo básico: no la encuentran, no entienden qué ofreces o no hay un siguiente paso claro. Corrige eso antes de gastar en publicidad o rediseños.",
  },
  {
    slug: "wifi-empresarial-claves",
    title: "El WiFi de tu negocio se cae y no sabes por qué",
    excerpt:
      "Señal que llega y luego desaparece, videollamadas que se congelan y clientes que se quejan. La mayoría de los problemas de WiFi en negocios tienen estas causas — y casi todas tienen solución.",
    category: "Redes",
    date: "2026-10-05",
    readTime: "5 min de lectura",
    image: "/servicios/wifi.jpg",
    imageAlt: "Router WiFi empresarial profesional instalado en un ambiente de trabajo",
    intro:
      "Hay un problema que casi todo negocio ha vivido: el WiFi que funciona a medias. En el mostrador va bien, en el almacén se muere; en la mañana va fluido y a las tres de la tarde nadie puede trabajar; el teléfono dice que hay señal, pero nada carga. Antes de culpar al proveedor de internet, conviene entender algo: en la mayoría de los casos, el problema no es la velocidad del plan contratado, es cómo está construida la red interna.",
    sections: [
      {
        heading: "El router de la casa no sirve para la tienda",
        paragraphs: [
          "El equipo que trae el proveedor de internet está diseñado para una casa: un par de habitaciones, cuatro o cinco dispositivos. Un negocio es otra cosa: paredes más gruesas, más metros, más equipos conectados al mismo tiempo —puntos de venta, cámaras, teléfonos, los celulares del personal y los de los clientes—. Exigirle al router doméstico que cubra todo eso es como pedirle un carro pequeño que haga el trabajo de un camión.",
          "Los equipos empresariales existen por una razón: más potencia de cobertura, gestión de muchos dispositivos simultáneos y estabilidad bajo carga. La primera pregunta de cualquier diagnóstico serio es qué equipo está repartiendo la señal y para cuántos usuarios fue diseñado.",
        ],
      },
      {
        heading: "Paredes, estanterías y otros enemigos de la señal",
        paragraphs: [
          "La señal WiFi no atraviesa el concreto por amor propio: cada pared la debilita, y ciertos materiales —bloque, metal, espejos grandes, estanterías metálicas llenas de mercancía— la debilitan mucho más. Ese router en la oficina del fondo explica perfectamente que el mostrador de la entrada tenga señal mala: hay tres paredes y un depósito de productos en el medio.",
          "La solución no es comprar un router más potente y esperar: es medir dónde llega la señal y dónde no, y colocar puntos de acceso adicionales en los lugares correctos. Un negocio de dos pisos bien cubierto suele necesitar dos o tres puntos de acceso bien ubicados, no un equipo gigante en una esquina.",
        ],
        bullets: [
          "Ubica el router en un punto alto, central y despejado, no en una esquina ni en el piso.",
          "Evita paredes metálicas y electrodomésticos grandes en la línea directa.",
          "En locales grandes o de varios pisos, usa varios puntos de acceso, no uno más potente.",
        ],
      },
      {
        heading: "Todos en la misma red: el problema de la saturación",
        paragraphs: [
          "Cuando el equipo de trabajo, las cámaras, los clientes y el televisor del local comparten la misma red, compiten por el ancho de banda. El video de fondo de una plataforma de música puede estar consumiendo lo que necesita la transacción del punto de venta. La red se siente lenta no por falta de internet, sino por mala repartición.",
          "La respuesta es segmentar: una red para la operación del negocio, otra para los visitantes. Las redes empresariales permiten además priorizar lo importante —las cajas y las videollamadas por encima del celular de un cliente viendo videos—, de modo que lo crítico nunca se pelee con lo accesorio.",
        ],
      },
      {
        heading: "Cableado: la base que nadie ve",
        paragraphs: [
          "Detrás de todo WiFi que funciona bien hay cableado que funciona mejor. Los puntos de acceso necesitan conexión cableada estable; las cámaras de seguridad transmiten por esa misma red; y un cableado desordenado —cables improvisados, conectores mal puestos, cables de 50 metros enroscados— mete ruido y caídas que luego se le atribuyen al WiFi.",
          "Un cableado estructurado bien hecho no se ve y parece un gasto que se podía ahorrar, hasta el día en que todo funciona y nadie recuerda cuándo fue la última vez que la red se cayó. Ese es exactamente el objetivo.",
        ],
      },
      {
        heading: "Cuándo llamar a un técnico",
        paragraphs: [
          "Reiniciar el router arregla el síntoma, no la causa. Si la red de tu negocio se cae más de una vez por semana, si hay zonas donde nunca llega bien, si las videollamadas se congelan en horas pico o si los clientes preguntan la clave y luego se quejan, hay un diagnóstico técnico que hacer: medir cobertura real, revisar equipos, ver cómo está repartida la carga y proponer la corrección correcta en lugar de parches.",
          "En CeroTraba hacemos ese diagnóstico completo: desde el router hasta el último punto de conexión, incluyendo cableado, puntos de acceso, redes separadas para clientes y configuración segura del acceso remoto a las cámaras. Una red bien resuelta se nota en una cosa muy simple: se olvida.",
        ],
      },
    ],
    takeaway:
      "El WiFi de un negocio no falla por el plan de internet: falla por equipos domésticos, mala ubicación, saturación y cableado improvisado. Un diagnóstico bien hecho encuentra la causa real en una visita.",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

/** Convierte "2026-10-30" en "30 de octubre de 2026". */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} de ${MONTHS[month - 1]} de ${year}`;
}
