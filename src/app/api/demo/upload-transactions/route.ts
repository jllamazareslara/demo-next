import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import type { TransactionType } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getServerAuthSession } from "@/lib/auth";
import {
  ensureDefaultAccount,
  inferType,
  resolveCategory,
} from "@/lib/transactions";

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { message: "Debes subir un archivo CSV válido." },
      { status: 400 },
    );
  }

  const text = await file.text();

  let rows: Record<string, string>[];
  try {
    rows = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "No pudimos leer el CSV. Asegúrate de usar el formato date,description,amount,type.",
      },
      { status: 400 },
    );
  }

  const account = await ensureDefaultAccount(session.user.id);
  const transactionsPayload: {
    userId: string;
    accountId: string;
    date: Date;
    description: string;
    amount: number;
    type: TransactionType;
    categoryId?: string;
  }[] = [];

  for (const row of rows) {
    const description = row.description ?? "Movimiento sin descripción";
    const date = row.date ? new Date(row.date) : new Date();
    if (Number.isNaN(date.getTime())) {
      continue;
    }

    const rawAmount = Number(
      (row.amount ?? "0").replace(",", ".").replace(/\s/g, ""),
    );
    if (Number.isNaN(rawAmount)) continue;

    const type = inferType(rawAmount, row.type);
    const normalizedAmount =
      type === "INCOME" ? Math.abs(rawAmount) : -Math.abs(rawAmount);

    const category = await resolveCategory(description);

    transactionsPayload.push({
      userId: session.user.id,
      accountId: account.id,
      date,
      description,
      amount: normalizedAmount,
      type,
      categoryId: category.id,
    });
  }

  if (!transactionsPayload.length) {
    return NextResponse.json(
      { message: "No encontramos movimientos válidos en el CSV." },
      { status: 400 },
    );
  }

  await prisma.transaction.createMany({
    data: transactionsPayload,
  });

  return NextResponse.json({
    message: `Procesamos ${transactionsPayload.length} movimientos.`,
  });
}

