// src/app/positions/apply/loading.tsx

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white select-none">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="skel w-8 h-8 rounded-lg" />
            <div className="skel w-16 h-4 rounded" />
          </div>
          <div className="hidden sm:block skel w-32 h-7 rounded-full" />
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 sm:py-16 max-w-3xl">
        {/* Header Skeleton */}
        <div className="mb-16 space-y-5">
          <div className="skel w-48 h-7 rounded-full" />
          <div className="skel w-3/4 h-12 rounded-lg" />
          <div className="skel w-full h-5 rounded" />
          <div className="skel w-4/5 h-5 rounded" />
        </div>

        <div className="space-y-16">
          {/* Section 1: Personal Info */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="skel w-9 h-9 rounded-xl" />
              <div className="skel w-48 h-6 rounded" />
              <div className="flex-1 h-px bg-white/10" />
            </div>
            
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2.5">
                <div className="skel w-32 h-4 rounded" />
                <div className="skel w-full h-12 rounded-xl" />
              </div>
              <div className="space-y-2.5">
                <div className="skel w-20 h-4 rounded" />
                <div className="skel w-full h-12 rounded-xl" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2.5">
                <div className="skel w-28 h-4 rounded" />
                <div className="skel w-full h-12 rounded-xl" />
              </div>
              <div className="space-y-2.5">
                <div className="skel w-36 h-4 rounded" />
                <div className="skel w-full h-12 rounded-xl" />
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="skel w-32 h-4 rounded" />
              <div className="skel w-full h-12 rounded-xl" />
            </div>
          </section>

          {/* Section 2: Availability */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="skel w-9 h-9 rounded-xl" />
              <div className="skel w-56 h-6 rounded" />
              <div className="flex-1 h-px bg-white/10" />
            </div>
            
            <div className="space-y-2.5">
              <div className="skel w-64 h-4 rounded" />
              <div className="skel w-full h-28 rounded-xl" />
            </div>
          </section>

          {/* Section 3: Questions */}
          <section className="space-y-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="skel w-9 h-9 rounded-xl" />
              <div className="skel w-52 h-6 rounded" />
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="skel w-full h-5 rounded" />
                <div className="skel w-4/5 h-4 rounded" />
                <div className="skel w-full h-32 rounded-xl" />
              </div>
            ))}
          </section>

          {/* Submit Button */}
          <div className="pt-10 border-t border-white/10">
            <div className="skel w-full h-14 rounded-2xl" />
          </div>
        </div>
      </main>
    </div>
  );
}
