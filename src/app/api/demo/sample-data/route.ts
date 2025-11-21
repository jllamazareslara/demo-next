import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerAuthSession } from "@/lib/auth";
import {
  ensureDefaultAccount,
  inferType,
  resolveCategory,
} from "@/lib/transactions";

const SAMPLE_TRANSACTIONS = [
  {
    date: "2025-02-03",
    description: "Nómina Febrero",
    amount: 1850,
    type: "INCOME",
  },
  {
    date: "2025-02-04",
    description: "Supermercado Mercadona",
    amount: -86.5,
    type: "EXPENSE",
  },
  {
    date: "2025-02-07",
    description: "Uber aeropuerto",
    amount: -24.9,
  },
  {
    date: "2025-02-10",
    description: "Restaurante Casa Lola",
    amount: -36.4,
  },
  {
    date: "2025-01-15",
    description: "Netflix",
    amount: -12.99,
  },
  {
    date: "2025-01-28",
    description: "Bonus anual",
    amount: 450,
    type: "INCOME",
  },
];

export async function POST() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const account = await ensureDefaultAccount(session.user.id);

  const payload = [];

  for (const sample of SAMPLE_TRANSACTIONS) {
    const category = await resolveCategory(sample.description);
    const type = inferType(sample.amount, sample.type);

    payload.push({
      userId: session.user.id,
      accountId: account.id,
      date: new Date(sample.date),
      description: sample.description,
      amount: type === "INCOME" ? Math.abs(sample.amount) : -Math.abs(sample.amount),
      type,
      categoryId: category.id,
    });
  }

  await prisma.transaction.createMany({
    data: payload,
  });

  return NextResponse.json({ message: "Datos de ejemplo cargados." });
}

