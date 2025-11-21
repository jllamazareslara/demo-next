'use client';

import { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UploadCsvForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setStatus("error");
      setMessage("Selecciona un archivo CSV.");
      return;
    }

    setStatus("uploading");
    setMessage("Procesando tu CSV...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/demo/upload-transactions", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message ?? "No se pudo procesar el CSV.");
      }

      setStatus("success");
      setMessage("¡Listo! Actualizamos tus métricas.");
      setFile(null);
      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "No pudimos procesar el CSV.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Sube un extracto CSV</h3>
        <p className="text-sm text-white/70">
          Sube un extracto bancario para generar tu dashboard. Aceptamos
          columnas: <code>date, description, amount, type</code>.
        </p>
      </div>

      <label
        htmlFor="csv-upload"
        className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-white/70 hover:border-white/40"
      >
        <div>
          <p className="font-medium text-white">Selecciona tu archivo CSV</p>
          <p className="text-xs text-white/60">Máximo 2MB</p>
        </div>
        <Upload className="h-5 w-5 text-white" />
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          className="sr-only"
          onChange={(event) => {
            const selected = event.target.files?.[0] ?? null;
            setFile(selected);
          }}
        />
      </label>
      {file ? (
        <p className="text-sm text-white/80">
          Archivo seleccionado: <span className="font-medium">{file.name}</span>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "uploading"}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "uploading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Procesando...
          </>
        ) : (
          "Subir CSV"
        )}
      </button>

      {status !== "idle" ? (
        <p
          className={`text-sm ${
            status === "error" ? "text-rose-300" : "text-emerald-300"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

