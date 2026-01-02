import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
}

export function ProductCard({ id, name, description, price }: ProductCardProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <span className="rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-3 py-1 text-sm font-semibold text-[var(--gold)]">
            {price}
          </span>
        </div>
        <p className="text-sm text-white/70">{description}</p>
      </div>

      <div className="mt-6">
        <Link
          href={`/store/${id}`}
          className="inline-flex items-center justify-center rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-5 py-2 text-sm font-semibold text-[var(--gold)] transition hover:bg-[var(--gold)]/20"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
