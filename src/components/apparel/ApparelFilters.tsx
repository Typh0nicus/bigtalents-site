export function ApparelFilters() {
  return (
    <section className="border-b border-white/10 bg-black">
      <div className="container py-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {["All", "Hoodies", "Tees", "Accessories", "Limited"].map((label) => (
            <button
              key={label}
              className="px-4 py-2 rounded-full border border-white/15 text-sm text-white/70 hover:text-white"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm text-white/70">
          <span>Sort by</span>
          <button className="px-4 py-2 rounded-full border border-white/15 text-white">Newest</button>
        </div>
      </div>
    </section>
  );
}
