import { redirect } from "next/navigation";
import GoogleSignInButton from "@/components/demo/GoogleSignInButton";
import { getServerAuthSession } from "@/lib/auth";

export default async function DemoLoginPage() {
  const session = await getServerAuthSession();
  if (session?.user) {
    redirect("/demo/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-white">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-400">
          Demo exclusiva
        </p>
        <h1 className="text-3xl font-semibold">Accede a la demo de Walled</h1>
        <p className="text-base text-white/70">
          Inicia sesión con tu cuenta de Google para ver tu dashboard financiero
          automático.
        </p>
        <GoogleSignInButton />
      </div>
    </main>
  );
}

