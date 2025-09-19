export default function Loading() {
  return (
    <section className="container py-14">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <div className="skel h-7 w-56" />
          <div className="skel h-4 w-64" />
        </div>
        <div className="flex gap-3">
          <div className="skel h-9 w-32 rounded-xl" />
          <div className="skel h-9 w-28 rounded-xl" />
          <div className="skel h-9 w-60 rounded-xl hidden sm:block" />
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="group card overflow-hidden h-full flex flex-col">
            <div className="relative w-full overflow-hidden">
              <div className="skel w-full" style={{ paddingTop: "56.25%" }} />
            </div>
            <div className="p-5 flex-1 flex flex-col gap-3">
              <div className="skel h-3 w-40" />
              <div className="skel h-5 w-4/5" />
              <div className="mt-auto">
                <div className="skel h-9 w-full rounded-xl" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
