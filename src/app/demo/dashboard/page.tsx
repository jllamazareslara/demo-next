import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/lib/auth";
import { getDashboardData } from "@/lib/transactions";
import SummaryCard from "@/components/demo/SummaryCard";
import MonthlyEvolutionChart from "@/components/demo/MonthlyEvolutionChart";
import CategoryBreakdown from "@/components/demo/CategoryBreakdown";
import TransactionsTable from "@/components/demo/TransactionsTable";
import UploadCsvForm from "@/components/demo/UploadCsvForm";
import SampleCsvHint from "@/components/demo/SampleCsvHint";
import SampleDataButton from "@/components/demo/SampleDataButton";
import SignOutButton from "@/components/demo/SignOutButton";
import { ArrowUpRight, PiggyBank, TrendingDown } from "lucide-react";

export default async function DemoDashboardPage() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/demo/login");
  }

  const dashboard = await getDashboardData(session.user.id);
  const userLabel = session.user.email ?? session.user.name ?? "Usuario";

  const formatCurrency = (value: number) =>
    value.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">
              Walled Demo
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              Dashboard financiero automático
            </h1>
            <p className="text-sm text-white/70">Conectado como {userLabel}</p>
          </div>
          <SignOutButton />
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            label="Ingresos del mes actual"
            value={formatCurrency(dashboard.monthTotals.incomes)}
            icon={<ArrowUpRight className="h-5 w-5 text-emerald-300" />}
          />
          <SummaryCard
            label="Gastos del mes actual"
            value={formatCurrency(dashboard.monthTotals.expenses)}
            icon={<TrendingDown className="h-5 w-5 text-rose-300" />}
          />
          <SummaryCard
            label="Ahorro neto del mes"
            value={formatCurrency(dashboard.monthTotals.savings)}
            icon={<PiggyBank className="h-5 w-5 text-sky-300" />}
            description="Ingresos - gastos"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Evolución mensual (últimos 6 meses)
                </h3>
                <p className="text-sm text-white/70">Ingresos vs gastos</p>
              </div>
              <MonthlyEvolutionChart data={dashboard.monthlyEvolution} />
            </div>
            <CategoryBreakdown data={dashboard.categoryBreakdown} />
          </div>
          <div className="space-y-6">
            <UploadCsvForm />
            <SampleDataButton />
            <SampleCsvHint />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Movimientos recientes</h3>
            <p className="text-sm text-white/60">
              Mostrando los últimos {dashboard.latestTransactions.length} registros
            </p>
          </div>
          <TransactionsTable data={dashboard.latestTransactions} />
        </section>
      </div>
    </main>
  );
}

