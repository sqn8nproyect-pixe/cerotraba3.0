import { createHmac, timingSafeEqual } from "crypto";

/**
 * Autenticación simple del panel /admin mediante cookie firmada.
 * La contraseña se define con la variable de entorno ADMIN_PASSWORD.
 * Si no está definida, se usa la contraseña por defecto (cámbiala en producción).
 */
export const ADMIN_COOKIE = "ct_admin";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "cerotraba-admin-2026";
}

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || getAdminPassword();
}

/** Token firmado a partir de la contraseña; expira en 7 días (fecha incluida en el payload). */
export function createAdminToken(): string {
  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = `admin.${expires}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyAdminToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [, expiresRaw, sig] = parts;
  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;
  const expected = createHmac("sha256", secret()).update(`admin.${expiresRaw}`).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function checkPassword(candidate: unknown): boolean {
  if (typeof candidate !== "string" || candidate.length === 0) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(getAdminPassword());
  return a.length === b.length && timingSafeEqual(a, b);
}
