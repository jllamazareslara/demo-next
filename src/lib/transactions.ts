import { addMonths, endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import type { TransactionType } from "@prisma/client";
import prisma from "@/lib/prisma";

const CATEGORY_RULES = [
  {
    name: "Supermercado",
    color: "#f97316",
    keywords: ["supermercado", "mercadona", "carrefour", "dia"],
  },
  {
    name: "Transporte",
    color: "#22d3ee",
    keywords: ["uber", "cabify", "gasolina", "repsol"],
  },
  {
    name: "Restauración",
    color: "#ec4899",
    keywords: ["restaurante", "bar", "mcdonald", "mcdonalds"],
  },
  {
    name: "Suscripciones",
    color: "#a855f7",
    keywords: ["netflix", "spotify", "hbo", "disney"],
  },
];

const DEFAULT_CATEGORY = { name: "Otros", color: "#64748b" };

export async function ensureDefaultAccount(userId: string) {
  const existing = await prisma.financialAccount.findFirst({
    where: { userId },
  });

  if (existing) return existing;

  return prisma.financialAccount.create({
    data: {
      userId,
      name: "Cuenta principal",
    },
  });
}

export async function resolveCategory(description: string) {
  const normalized = description.toLowerCase();
  const match =
    CATEGORY_RULES.find((rule) =>
      rule.keywords.some((keyword) => normalized.includes(keyword)),
    ) ?? DEFAULT_CATEGORY;

  return prisma.category.upsert({
    where: { name: match.name },
    update: {},
    create: {
      name: match.name,
      color: match.color,
    },
  });
}

type MonthlyPoint = {
  label: string;
  incomes: number;
  expenses: number;
  savings: number;
};

type CategoryPoint = {
  name: string;
  total: number;
  color?: string | null;
};

export type DashboardData = {
  monthTotals: {
    incomes: number;
    expenses: number;
    savings: number;
  };
  monthlyEvolution: MonthlyPoint[];
  categoryBreakdown: CategoryPoint[];
  latestTransactions: Awaited<ReturnType<typeof fetchLatestTransactions>>;
};

async function fetchLatestTransactions(userId: string) {
  return prisma.transaction.findMany({
    where: { userId },
    include: { category: true },
    orderBy: { date: "desc" },
    take: 20,
  });
}

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const sixMonthsAgo = startOfMonth(subMonths(now, 5));

  const [currentMonthTx, recentTransactions, sixMonthTxs] = await Promise.all([
    prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
      include: { category: true },
      orderBy: { date: "desc" },
    }),
    fetchLatestTransactions(userId),
    prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: sixMonthsAgo,
          lte: monthEnd,
        },
      },
    }),
  ]);

  const monthTotals = currentMonthTx.reduce(
    (acc, tx) => {
      if (tx.type === "INCOME") {
        acc.incomes += tx.amount;
      } else {
        acc.expenses += Math.abs(tx.amount);
      }
      acc.savings = acc.incomes - acc.expenses;
      return acc;
    },
    { incomes: 0, expenses: 0, savings: 0 },
  );

  const monthlyEvolution: MonthlyPoint[] = [];
  for (let i = 5; i >= 0; i -= 1) {
    const month = addMonths(sixMonthsAgo, 5 - i);
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const label = format(month, "MMM");

    const totals = sixMonthTxs.reduce(
      (acc, tx) => {
        if (tx.date >= start && tx.date <= end) {
          if (tx.type === "INCOME") acc.incomes += tx.amount;
          else acc.expenses += Math.abs(tx.amount);
        }
        acc.savings = acc.incomes - acc.expenses;
        return acc;
      },
      { incomes: 0, expenses: 0, savings: 0 },
    );

    monthlyEvolution.push({ label, ...totals });
  }

  const categoryBreakdown = currentMonthTx
    .filter((tx) => tx.type === "EXPENSE")
    .reduce<Record<string, CategoryPoint>>((acc, tx) => {
      const name = tx.category?.name ?? DEFAULT_CATEGORY.name;
      if (!acc[name]) {
        acc[name] = {
          name,
          total: 0,
          color: tx.category?.color ?? DEFAULT_CATEGORY.color,
        };
      }
      acc[name].total += Math.abs(tx.amount);
      return acc;
    }, {});

  return {
    monthTotals,
    monthlyEvolution,
    categoryBreakdown: Object.values(categoryBreakdown).sort(
      (a, b) => b.total - a.total,
    ),
    latestTransactions: recentTransactions,
  };
}

export function inferType(amount: number, explicitType?: string | null): TransactionType {
  if (explicitType) {
    return explicitType.toLowerCase().includes("income") ||
      explicitType.toLowerCase().includes("ingreso")
      ? "INCOME"
      : "EXPENSE";
  }

  return amount >= 0 ? "INCOME" : "EXPENSE";
}

