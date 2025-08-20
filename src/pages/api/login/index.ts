import type { NextApiRequest, NextApiResponse } from "next";
import { signToken } from "../../../infrastructure/auth";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { password } = req.body || {};
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) return res.status(500).json({ error: "Missing ADMIN_PASSWORD" });
  if (password !== expected) return res.status(401).json({ error: "Incorrect password" });

  const token = signToken();
  const isProd = process.env.NODE_ENV === "production";

  res.setHeader(
    "Set-Cookie",
    serialize("authToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  );

  return res.status(200).json({ ok: true });
}