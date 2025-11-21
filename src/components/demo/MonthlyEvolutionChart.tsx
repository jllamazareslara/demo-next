'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DashboardData } from "@/lib/transactions";

type Props = {
  data: DashboardData["monthlyEvolution"];
};

export default function MonthlyEvolutionChart({ data }: Props) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="label" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "12px",
              color: "#e2e8f0",
            }}
          />
          <Area
            type="monotone"
            dataKey="incomes"
            stroke="#38bdf8"
            fill="#38bdf8"
            fillOpacity={0.15}
            name="Ingresos"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#f87171"
            fill="#f87171"
            fillOpacity={0.15}
            name="Gastos"
          />
          <Area
            type="monotone"
            dataKey="savings"
            stroke="#34d399"
            fill="url(#colorSavings)"
            name="Ahorro"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

