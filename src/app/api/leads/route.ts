import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Solicitud inválida." },
        { status: 400 }
      );
    }

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const need = String(body.need ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !phone || !email || !need) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "El correo no parece válido." },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: {
        name: name.slice(0, 120),
        phone: phone.slice(0, 40),
        email: email.slice(0, 160),
        need: need.slice(0, 80),
        message: message ? message.slice(0, 2000) : null,
      },
    });

    // Notificación opcional vía webhook (Zapier / Make / n8n → WhatsApp, Telegram, correo).
    // Definir LEAD_WEBHOOK_URL en el entorno para activarla. Nunca rompe el envío del form.
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lead: { id: lead.id, name, phone, email, need, message },
          }),
          signal: AbortSignal.timeout(5000),
        });
      } catch (webhookError) {
        console.error("Webhook de lead falló:", webhookError);
      }
    }

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Error guardando el lead:", error);
    return NextResponse.json(
      { ok: false, error: "No pudimos guardar tu mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
