export default function Loading() {
  return (
    <section className="container py-14">
      <div className="max-w-2xl space-y-3">
        <div className="skel h-8 w-44" />
        <div className="skel h-4 w-80" />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
            <div className="skel h-44 w-full rounded-xl" />
            <div className="mt-4 space-y-2">
              <div className="skel h-5 w-2/3" />
              <div className="skel h-3 w-1/3" />
              <div className="skel h-10 w-full rounded-lg" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
