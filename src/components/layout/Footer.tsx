import Link from "next/link";

export function Footer() {
  const y = new Date().getFullYear();

  return (
    <footer className="mt-16">
      {/* quiet hairline instead of a harsh solid border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div
        className="container text-sm text-white/70"
        style={{
          paddingTop: "1.75rem",
          // respect iOS/Android bottom safe areas without being loud
          paddingBottom: "calc(1.75rem + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>© {y} Big Talents. All rights reserved.</div>

          <nav aria-label="Legal" className="flex gap-6">
            <Link
              href="/privacy"
              className="rounded-md px-1 py-0.5 hover:text-[color:var(--gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]/50"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="rounded-md px-1 py-0.5 hover:text-[color:var(--gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]/50"
            >
              Terms
            </Link>
            <Link
              href="/imprint"
              className="rounded-md px-1 py-0.5 hover:text-[color:var(--gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]/50"
            >
              Imprint
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
