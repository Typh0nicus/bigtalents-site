export default function Loading() {
  return (
    <section className="container py-14">
      {/* header lines */}
      <div className="max-w-xl space-y-3">
        <div className="skel h-7 w-48" />
        <div className="skel h-4 w-72" />
      </div>

      {/* grid skeletons */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm">
            <div className="relative w-full overflow-hidden rounded-xl">
              <div className="skel w-full" style={{ paddingTop: "56.25%" }} />
            </div>
            <div className="mt-4 space-y-2">
              <div className="skel h-5 w-3/4" />
              <div className="skel h-3 w-24" />
              <div className="skel h-3 w-full" />
              <div className="skel h-3 w-5/6" />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="skel h-6 w-16 rounded-md" />
              <div className="skel h-6 w-20 rounded-md" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
