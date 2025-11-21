import type { DashboardData } from "@/lib/transactions";

type Props = {
  data: DashboardData["latestTransactions"];
};

export default function TransactionsTable({ data }: Props) {
  if (!data.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
        Aún no hay movimientos disponibles. Sube un CSV para comenzar.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="min-w-full divide-y divide-white/10 bg-slate-900/40 text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-white/60">
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Descripción</th>
            <th className="px-4 py-3">Categoría</th>
            <th className="px-4 py-3 text-right">Importe</th>
            <th className="px-4 py-3 text-right">Tipo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((tx) => (
            <tr key={tx.id} className="text-white/80">
              <td className="px-4 py-3">
                {new Date(tx.date).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                })}
              </td>
              <td className="px-4 py-3">{tx.description}</td>
              <td className="px-4 py-3">{tx.category?.name ?? "Otros"}</td>
              <td
                className={`px-4 py-3 text-right font-medium ${
                  tx.type === "INCOME" ? "text-emerald-300" : "text-rose-300"
                }`}
              >
                {tx.amount.toLocaleString("es-ES", {
                  style: "currency",
                  currency: "EUR",
                })}
              </td>
              <td className="px-4 py-3 text-right">
                {tx.type === "INCOME" ? "Ingreso" : "Gasto"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

