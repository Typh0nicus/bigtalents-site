export function ApparelHero() {
  return (
    <section className="bg-black/80 border-b border-white/10">
      <div className="container py-16 lg:py-24 space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Big Talents Store</p>
        <h1 className="text-4xl lg:text-6xl font-semibold text-white">Apparel built for the arena.</h1>
        <p className="text-lg text-white/70 max-w-2xl">
          Placeholder hero copy for the Big Talents apparel launch. Highlight signature drops,
          limited runs, and creator collaborations here.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-5 py-3 rounded-full bg-[var(--gold)] text-black font-semibold">
            Shop New Arrivals
          </button>
          <button className="px-5 py-3 rounded-full border border-white/20 text-white">
            View Lookbook
          </button>
        </div>
      </div>
    </section>
  );
}
