import { siteConfig } from "@/lib/site-config";

/**
 * Botón flotante de WhatsApp (click-to-chat).
 * Solo se muestra si siteConfig.whatsappNumber tiene un número configurado.
 */
export default function WhatsAppButton() {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  if (!digits) return null;

  const href = `https://wa.me/${digits}?text=${encodeURIComponent(siteConfig.whatsappGreeting)}`;

  return (
    <a
      className="whatsapp-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.96L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.06l-.3-.18-3.06.88.9-2.98-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.3 4.06c-.16 0-.43.06-.65.3-.22.24-.86.84-.86 2.04 0 1.2.88 2.36 1 2.52.12.16 1.7 2.72 4.2 3.7 2.06.81 2.48.65 2.93.6.45-.04 1.44-.58 1.65-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28s-1.44-.71-1.66-.79c-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.42-.55-.43h-.55Z" />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}
