import Link from "next/link";

interface ProductDetailPageProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { productId } = await params;
  const formatted = productId.replace(/-/g, " ");

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center gap-6 px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--gold)]/80">
        Product Detail
      </p>
      <h1 className="text-4xl font-semibold text-white md:text-5xl">{formatted}</h1>
      <p className="text-base text-white/70">
        This product page is coming soon. We&apos;re finalizing photography, sizing, and shipping
        details. Check back for the full launch.
      </p>
      <Link
        href="/store"
        className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
      >
        Back to store preview
      </Link>
    </div>
  );
}
