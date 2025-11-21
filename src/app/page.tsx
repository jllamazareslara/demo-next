import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 py-24 text-white">
      <div className="max-w-2xl text-center space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-400">
          Demo interactiva
        </p>
        <h1 className="text-4xl font-semibold leading-tight">
          Walled Demo — dashboard financiero automático en minutos
        </h1>
        <p className="text-lg text-white/70">
          Lanza la demo, conecta con Google y descubre cómo Walled clasifica tus
          movimientos, calcula tu ahorro y visualiza tus finanzas en un solo
          lugar.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/demo/login"
            className="rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Abrir la demo
          </Link>
          <a
            href="https://www.walledapp.es"
            className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            target="_blank"
            rel="noreferrer"
          >
            Conoce Walled
          </a>
        </div>
      </div>
    </main>
  );
}
