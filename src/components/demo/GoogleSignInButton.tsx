'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      onClick={async () => {
        setLoading(true);
        await signIn("google", { callbackUrl: "/demo/dashboard" });
      }}
      className="flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-100"
    >
      {loading ? "Conectando..." : "Continuar con Google"}
    </button>
  );
}

