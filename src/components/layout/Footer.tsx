export function Footer() {
  const y = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--border)] mt-16">
      <div className="container py-10 text-sm text-white/70">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>© {y} Big Talents. All rights reserved.</div>
          <nav className="flex gap-6">
            <a className="hover:text-[color:var(--gold)]" href="/privacy">Privacy</a>
            <a className="hover:text-[color:var(--gold)]" href="/terms">Terms</a>
            <a className="hover:text-[color:var(--gold)]" href="/imprint">Imprint</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
