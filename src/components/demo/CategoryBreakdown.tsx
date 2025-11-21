import type { DashboardData } from "@/lib/transactions";

type Props = {
  data: DashboardData["categoryBreakdown"];
};

export default function CategoryBreakdown({ data }: Props) {
  const total = data.reduce((sum, item) => sum + item.total, 0);

  if (!data.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
        Aún no hay gastos clasificados este mes.
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold">Gasto por categoría (mes actual)</h3>
      <div className="space-y-4">
        {data.map((item) => {
          const percentage = total ? Math.round((item.total / total) * 100) : 0;
          return (
            <div key={item.name}>
              <div className="flex items-center justify-between text-sm">
                <p className="font-medium">{item.name}</p>
                <p className="text-white/70">
                  {item.total.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color ?? "#38bdf8",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

