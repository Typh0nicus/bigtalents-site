// src/app/staff/loading.tsx

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="container mx-auto px-4 pt-16 pb-10">
        {/* Hero skeleton */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="skel h-16 w-16 mx-auto rounded-full" />
          <div className="skel h-10 w-64 mx-auto rounded-lg" />
          <div className="skel h-4 w-80 mx-auto rounded-lg" />
          <div className="skel h-3 w-60 mx-auto rounded-lg" />
        </div>
      </section>

      {/* Positions grid skeleton */}
      <section className="container mx-auto px-4 pb-24">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <article
              key={i}
              className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] p-6 sm:p-7"
            >
              {/* Category + status */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="skel h-6 w-28 rounded-full" />
                <div className="skel h-3 w-16 rounded-full" />
              </div>

              {/* Title + description */}
              <div className="space-y-3 mb-6">
                <div className="skel h-6 w-40 rounded-md" />
                <div className="skel h-4 w-full rounded-md" />
                <div className="skel h-4 w-5/6 rounded-md" />
              </div>

              {/* Button area */}
              <div className="pt-3 border-t border-white/10">
                <div className="skel h-10 w-full rounded-2xl" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
