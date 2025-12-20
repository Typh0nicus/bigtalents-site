export default function Loading() {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Hero skeleton */}
      <div className="max-w-3xl space-y-3 mb-10">
        <div className="skel h-4 w-28 rounded-full" />
        <div className="skel h-10 w-64 rounded-lg" />
        <div className="skel h-4 w-80 rounded-lg" />
      </div>

      {/* Card grid skeleton */}
      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article
            key={i}
            className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-lg shadow-black/40"
          >
            {/* Top image area: matches aspect-[4/5] avatar/banner block */}
            <div className="relative aspect-[4/5]">
              <div className="skel absolute inset-0" />
            </div>

            {/* Bottom content area: tier / name / button */}
            <div className="p-5 space-y-3">
              <div className="skel h-4 w-24 rounded-full" />
              <div className="skel h-6 w-3/4 rounded-md" />
              <div className="skel h-4 w-1/2 rounded-md" />
              <div className="skel h-9 w-full rounded-xl" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
