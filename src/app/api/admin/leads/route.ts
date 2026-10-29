import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-auth";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/site-config";

function isAuthed(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_COOKIE}=`));
  return verifyAdminToken(match ? decodeURIComponent(match.slice(ADMIN_COOKIE.length + 1)) : null);
}

function unauthorized() {
  return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
}

/** Lista de leads + contadores para el panel. */
export async function GET(request: Request) {
  if (!isAuthed(request)) return unauthorized();

  try {
    const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" } });
    const stats = {
      total: leads.length,
      nuevo: leads.filter((l) => l.status === "nuevo").length,
      contactado: leads.filter((l) => l.status === "contactado").length,
      cliente: leads.filter((l) => l.status === "cliente").length,
      descartado: leads.filter((l) => l.status === "descartado").length,
    };
    return NextResponse.json({ ok: true, leads, stats });
  } catch (error) {
    console.error("Error listando leads:", error);
    return NextResponse.json(
      { ok: false, error: "No pudimos cargar los leads." },
      { status: 500 }
    );
  }
}

/** Cambiar el estado de un lead. */
export async function PATCH(request: Request) {
  if (!isAuthed(request)) return unauthorized();

  try {
    const body = await request.json().catch(() => null);
    const id = String(body?.id ?? "");
    const status = String(body?.status ?? "") as LeadStatus;

    if (!id) {
      return NextResponse.json({ ok: false, error: "Falta el id." }, { status: 400 });
    }
    if (!LEAD_STATUSES.includes(status)) {
      return NextResponse.json({ ok: false, error: "Estado inválido." }, { status: 400 });
    }

    const existing = await db.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Lead no encontrado." },
        { status: 404 }
      );
    }

    const lead = await db.lead.update({ where: { id }, data: { status } });
    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    console.error("Error actualizando lead:", error);
    return NextResponse.json(
      { ok: false, error: "No pudimos actualizar el lead." },
      { status: 500 }
    );
  }
}

/** Eliminar un lead (?id=...). */
export async function DELETE(request: Request) {
  if (!isAuthed(request)) return unauthorized();

  try {
    const id = new URL(request.url).searchParams.get("id") ?? "";
    if (!id) {
      return NextResponse.json({ ok: false, error: "Falta el id." }, { status: 400 });
    }

    const existing = await db.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Lead no encontrado." },
        { status: 404 }
      );
    }

    await db.lead.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error eliminando lead:", error);
    return NextResponse.json(
      { ok: false, error: "No pudimos eliminar el lead." },
      { status: 500 }
    );
  }
}
