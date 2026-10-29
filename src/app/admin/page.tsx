"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { LEAD_STATUSES, siteConfig, toWhatsAppDigits } from "@/lib/site-config";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  need: string;
  message: string | null;
  status: string;
  createdAt: string;
};

type Stats = { total: number; nuevo: number; contactado: number; cliente: number; descartado: number };

const STATUS_LABELS: Record<string, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  cliente: "Cliente",
  descartado: "Descartado",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("es-VE", { dateStyle: "medium", timeStyle: "short" });
}

function waLink(lead: Lead): string {
  const first = lead.name.split(" ")[0] || lead.name;
  const text = `Hola ${first}, le escribe el equipo de ${siteConfig.name} en respuesta a su consulta por ${lead.need.toLowerCase()}.`;
  return `https://wa.me/${toWhatsAppDigits(lead.phone)}?text=${encodeURIComponent(text)}`;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setActionError("");
    try {
      const response = await fetch("/api/admin/leads", { cache: "no-store" });
      if (response.status === 401) {
        setAuthed(false);
        return;
      }
      const result = await response.json();
      if (!response.ok || !result?.ok) {
        setActionError(result?.error || "No pudimos cargar los leads.");
        return;
      }
      setAuthed(true);
      setLeads(result.leads);
      setStats(result.stats);
    } catch {
      setActionError("Problema de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loggingIn) return;
    setLoggingIn(true);
    setLoginError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        setLoginError(result?.error || "No pudimos iniciar sesión.");
        return;
      }
      setPassword("");
      await loadLeads();
    } catch {
      setLoginError("Problema de conexión. Inténtalo de nuevo.");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    setAuthed(false);
    setLeads([]);
    setStats(null);
  }

  async function changeStatus(id: string, status: string) {
    setActionError("");
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        setActionError(result?.error || "No pudimos actualizar el estado.");
        loadLeads();
      }
    } catch {
      setActionError("Problema de conexión al actualizar.");
      loadLeads();
    }
  }

  async function deleteLead(id: string) {
    if (!window.confirm("¿Eliminar este lead definitivamente?")) return;
    setDeletingId(id);
    setActionError("");
    try {
      const response = await fetch(`/api/admin/leads?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        setActionError(result?.error || "No pudimos eliminar el lead.");
        return;
      }
      setLeads((current) => current.filter((lead) => lead.id !== id));
    } catch {
      setActionError("Problema de conexión al eliminar.");
    } finally {
      setDeletingId("");
    }
  }

  if (authed === null) {
    return <main className="adm-shell adm-shell--center"><p className="adm-loading">Cargando…</p></main>;
  }

  if (!authed) {
    return (
      <main className="adm-shell adm-shell--center">
        <form className="adm-login" onSubmit={handleLogin}>
          <p className="adm-brand">CeroTraba<span>.</span></p>
          <h1>Panel de leads</h1>
          <p className="adm-login-hint">Acceso solo para el equipo. Introduce la contraseña del panel.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            autoFocus
            maxLength={120}
          />
          {loginError && <p className="adm-error" role="alert">{loginError}</p>}
          <button className="adm-button" type="submit" disabled={loggingIn}>
            {loggingIn ? "Verificando…" : "Entrar"}
          </button>
          <a className="adm-back" href="/">← Volver al sitio</a>
        </form>
      </main>
    );
  }

  return (
    <main className="adm-shell">
      <header className="adm-header">
        <div>
          <p className="adm-brand">CeroTraba<span>.</span></p>
          <h1>Consultas recibidas</h1>
        </div>
        <div className="adm-header-actions">
          <button className="adm-button adm-button--ghost" type="button" onClick={loadLeads} disabled={loading}>
            {loading ? "Actualizando…" : "Actualizar"}
          </button>
          <button className="adm-button adm-button--ghost" type="button" onClick={handleLogout}>
            Salir
          </button>
        </div>
      </header>

      {stats && (
        <div className="adm-stats">
          <div className="adm-stat"><strong>{stats.total}</strong><span>Total</span></div>
          <div className="adm-stat adm-stat--nuevo"><strong>{stats.nuevo}</strong><span>Nuevos</span></div>
          <div className="adm-stat"><strong>{stats.contactado}</strong><span>Contactados</span></div>
          <div className="adm-stat"><strong>{stats.cliente}</strong><span>Clientes</span></div>
          <div className="adm-stat"><strong>{stats.descartado}</strong><span>Descartados</span></div>
        </div>
      )}

      {actionError && <p className="adm-error" role="alert">{actionError}</p>}

      {leads.length === 0 && !loading ? (
        <p className="adm-empty">Todavía no hay consultas. Cuando alguien escriba por el formulario, aparecerá aquí.</p>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Contacto</th>
                <th>Necesidad</th>
                <th>Mensaje</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} data-status={lead.status}>
                  <td className="adm-date">{formatDate(lead.createdAt)}</td>
                  <td>
                    <strong>{lead.name}</strong>
                    <small>{lead.email}</small>
                    <small>{lead.phone}</small>
                  </td>
                  <td><span className="adm-need">{lead.need}</span></td>
                  <td className="adm-message">{lead.message || "—"}</td>
                  <td>
                    <select
                      value={lead.status}
                      onChange={(e) => changeStatus(lead.id, e.target.value)}
                      aria-label={`Estado de ${lead.name}`}
                    >
                      {LEAD_STATUSES.map((status) => (
                        <option key={status} value={status}>{STATUS_LABELS[status]}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="adm-actions">
                      <a href={waLink(lead)} target="_blank" rel="noopener noreferrer" title="Responder por WhatsApp">WhatsApp</a>
                      <a href={`mailto:${lead.email}?subject=${encodeURIComponent(`Respuesta a tu consulta — ${siteConfig.name}`)}`} title="Responder por correo">Correo</a>
                      <button type="button" onClick={() => deleteLead(lead.id)} disabled={deletingId === lead.id} className="adm-delete">
                        {deletingId === lead.id ? "…" : "Eliminar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
