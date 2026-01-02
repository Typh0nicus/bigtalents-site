const placeholderProducts = [
  {
    name: "Champion Hoodie",
    description: "Premium fleece with embroidered crest.",
  },
  {
    name: "Arena Tee",
    description: "Soft-touch cotton, everyday fit.",
  },
  {
    name: "Limited Jersey",
    description: "Numbered drop for the season.",
  },
  {
    name: "Signature Cap",
    description: "Structured cap with metal clasp.",
  },
];

export function ProductGrid() {
  return (
    <section className="bg-black">
      <div className="container py-12 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {placeholderProducts.map((product) => (
            <div
              key={product.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4"
            >
              <div className="h-40 rounded-xl bg-white/10" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                <p className="text-sm text-white/60">{product.description}</p>
              </div>
              <button className="w-full px-4 py-2 rounded-full border border-white/15 text-white text-sm">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
