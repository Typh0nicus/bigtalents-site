export function FeaturedPromo() {
  return (
    <section className="bg-gradient-to-br from-[#141414] via-black to-[#0b0b0b]">
      <div className="container py-12 lg:py-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 lg:p-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 max-w-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Featured Promo</p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white">
              Limited creator capsule drop coming soon.
            </h2>
            <p className="text-white/70">
              Placeholder promo copy to highlight campaigns, bundle deals, or spotlight pieces.
            </p>
          </div>
          <button className="px-6 py-3 rounded-full bg-white text-black font-semibold">
            Notify Me
          </button>
        </div>
      </div>
    </section>
  );
}
