'use client';

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SampleDataButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/demo/sample-data", {
        method: "POST",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? "No pudimos cargar los datos.");
      }

      setMessage("Datos de ejemplo cargados. ¡Explora el dashboard!");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Ocurrió un error inesperado.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-base font-semibold">¿Sin CSV a mano?</p>
          <p className="text-sm text-white/70">
            Carga datos ficticios para ver el dashboard completo con un clic.
          </p>
        </div>
        <button
          onClick={handleClick}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Cargando datos...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-amber-300" />
              Cargar datos de ejemplo
            </>
          )}
        </button>
        {message ? (
          <p className="text-sm text-white/70">{message}</p>
        ) : null}
      </div>
    </div>
  );
}

