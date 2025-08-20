// pages/admin/login.tsx
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { readCookie, verifyToken } from "@infrastructure/auth";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data?.error || "Login failed");
      } else {
        router.push("/admin/contacts");
      }
    } catch (err) {
      setErrorMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-baby-blue text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Authentication</h1>
      <form onSubmit={handlePasswordSubmit} className="max-w-sm w-full">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full p-2 mb-4 border rounded text-black"
        />
        <div className="flex justify-center">
          <button
            disabled={loading}
            type="submit"
            className="bg-white text-baby-blue p-2 rounded disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Submit"}
          </button>
        </div>
        {errorMessage && <p className="text-red-300 mt-2 text-center">{errorMessage}</p>}
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = readCookie(req);
  const ok = verifyToken(token).ok;
  if (ok) {
    return {
      redirect: { destination: "/admin/contacts", permanent: false },
    };
  }
  return { props: {} };
};

export default LoginPage;