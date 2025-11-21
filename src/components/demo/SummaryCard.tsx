import type { ReactNode } from "react";

type SummaryCardProps = {
  label: string;
  value: string;
  description?: string;
  icon?: ReactNode;
};

export default function SummaryCard({
  label,
  value,
  description,
  icon,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">
          {label}
        </p>
        {icon}
      </div>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      {description ? (
        <p className="mt-2 text-sm text-white/70">{description}</p>
      ) : null}
    </div>
  );
}

