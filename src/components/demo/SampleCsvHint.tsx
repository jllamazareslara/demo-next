const SAMPLE_CSV = `date,description,amount,type
2025-01-03,Supermercado Día,-45.90,expense
2025-01-05,Nómina,+1500.00,income
2025-01-10,Restaurante,-23.50,expense`;

export default function SampleCsvHint() {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-sm text-white/70">
      <p className="text-base font-semibold text-white">
        Tip: si no tienes un CSV a mano...
      </p>
      <p className="mt-2">
        Crea un archivo con este formato mínimo y súbelo al dashboard:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950/60 p-4 text-xs text-white">
        {SAMPLE_CSV}
      </pre>
    </div>
  );
}

