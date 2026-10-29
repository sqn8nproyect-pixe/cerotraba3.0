/**
 * Configuración central de CeroTraba.
 * Edita este archivo para actualizar los datos de contacto de la empresa.
 */

export const siteConfig = {
  name: "CeroTraba",
  tagline: "Tecnología sin trabas",

  /**
   * Correo de contacto que aparece en el sitio y en los botones de respuesta.
   */
  contactEmail: "cerotraba@gmail.com",

  /**
   * Número de WhatsApp de la empresa en formato internacional, solo dígitos.
   * Número real: +58 0422-0117206 → se guarda sin el 0 tras el código de país
   * (formato que exige wa.me): 58 + 4220117206.
   */
  whatsappNumber: "584220117206",

  /** Mensaje prellenado cuando alguien abre el chat desde el botón. */
  whatsappGreeting:
    "Hola CeroTraba, vengo de su página web y quiero hacer una consulta.",

  /**
   * URL de webhook para notificaciones de leads (opcional).
   * Se puede definir en la variable de entorno LEAD_WEBHOOK_URL.
   * Compatible con Zapier / Make / n8n: cada lead nuevo llega como POST JSON
   * { lead: { name, phone, email, need, message } } y desde ahí se puede
   * reenviar a WhatsApp, Telegram o correo automáticamente.
   */
  leadWebhookUrlEnv: "LEAD_WEBHOOK_URL",
} as const;

/** Estados válidos de un lead en el panel de administración. */
export const LEAD_STATUSES = ["nuevo", "contactado", "cliente", "descartado"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/**
 * Normaliza un teléfono de Venezuela a formato internacional para wa.me.
 * "0414-123 4567" -> "584141234567". Si ya trae código de país lo respeta.
 * Si el número no parece venezolano, se devuelven solo los dígitos.
 */
export function toWhatsAppDigits(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, "");
  if (digits.startsWith("580")) return `58${digits.slice(3)}`;
  if (digits.startsWith("58")) return digits;
  if (digits.startsWith("0")) return `58${digits.slice(1)}`;
  if (digits.length === 10 && digits.startsWith("4")) return `58${digits}`;
  return digits;
}
