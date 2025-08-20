import type { IncomingMessage } from "http";
import crypto from "crypto";

const COOKIE_NAME = "authToken";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function b64url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

export function signToken(): string {
  const secret = process.env.ADMIN_JWT_SECRET || "";
  const payload = { exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS };
  const body = b64url(JSON.stringify(payload));
  const sig = crypto.createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyToken(token?: string) {
  if (!token) return { ok: false as const };
  const secret = process.env.ADMIN_JWT_SECRET || "";
  const [body, sig] = token.split(".");
  if (!body || !sig) return { ok: false as const };

  const expected = crypto.createHmac("sha256", secret).update(body).digest();
  const actual = Buffer.from(sig, "base64url");
  if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) {
    return { ok: false as const };
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload.exp || Date.now() / 1000 > payload.exp) return { ok: false as const };
    return { ok: true as const };
  } catch {
    return { ok: false as const };
  }
}

export function readCookie(req: IncomingMessage, name = COOKIE_NAME) {
  const all = req.headers.cookie || "";
  const parts = all.split(";").map((s) => s.trim());
  for (const p of parts) {
    const [k, v] = p.split("=");
    if (k === name) return decodeURIComponent(v || "");
  }
  return undefined;
}

export const cookieName = COOKIE_NAME;
export const maxAge = MAX_AGE_SECONDS;
