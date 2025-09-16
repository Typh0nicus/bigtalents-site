type TItem = {
  title: string;
  date: string;
  region: "NA" | "EU";
  prize?: string;
  image?: string;
  registerUrl?: string;
  detailsUrl?: string;
};

const ITEMS: TItem[] = [
  {
    title: "EU Qualifier — Wildcard Weekend",
    date: "Oct 05, 2025 • 18:00 CET",
    region: "EU",
    prize: "€500",
    image: "/images/tournaments/eu-finals.png",
    registerUrl: "https://matcherino.com/t/your-eu-link",
    detailsUrl: "/tournaments/2025-10-05-eu-wildcard-weekend",
  },
  {
    title: "NA Open — Saturday Madness",
    date: "Oct 12, 2025 • 6:00 PM ET",
    region: "NA",
    prize: "$500",
    image: "/images/tournaments/na-qualifier.png",
    registerUrl: "https://matcherino.com/t/your-na-link",
    detailsUrl: "/tournaments/2025-10-12-na-saturday-madness",
  },
  {
    title: "EU Finals — Season I",
    date: "Oct 26, 2025 • 19:00 CET",
    region: "EU",
    prize: "€1,000",
    image: "/images/tournaments/eu-finals.png",
    registerUrl: "https://matcherino.com/t/your-eu-finals",
    detailsUrl: "/tournaments/2025-10-26-eu-finals",
  },
];

export function FeaturedTournaments() {
  return (
    <section className="container py-12 md:py-16">
      <h2 className="h2">Featured Tournaments</h2>
      <p className="mt-2 text-white/75">Upcoming brackets, clean formats, no nonsense.</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ITEMS.map((it) => (
          <article key={it.title} className="overflow-hidden rounded-xl border border-white/10 hover:border-[color:var(--border)] transition">
            {it.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={it.image} alt="" className="h-40 w-full object-cover" />
            ) : (
              <div className="h-40 w-full bg-white/5" />
            )}
            <div className="p-6">
              <div className="text-sm text-white/70">
                <span className="rounded-full border border-white/20 px-2 py-0.5">{it.region}</span>
                <span className="ml-3">{it.date}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold">{it.title}</h3>
              {it.prize && <div className="mt-1 text-white/80">Prize: {it.prize}</div>}

              <div className="mt-4 flex gap-3">
                {it.registerUrl && (
                  <a className="btn btn-primary" href={it.registerUrl} target="_blank" rel="noreferrer">
                    Register
                  </a>
                )}
                {it.detailsUrl && (
                  <a className="btn btn-ghost border-white/15" href={it.detailsUrl}>
                    View Details
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
