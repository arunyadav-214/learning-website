import PortfolioNav from "./PortfolioNav";

export default function PageShell({ kicker, title, intro, children }: { kicker: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PortfolioNav />
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-6 sm:px-8 lg:pr-64">
        <header className="glass-nav flex items-center gap-4 rounded-[1.4rem] px-4 py-3 sm:px-5">
          <a href="/" className="brand-home-link" aria-label="Arun Learning Hub home">
            <img src="/arun-logo.svg" alt="Arun logo" className="brand-logo-full" />
            <span className="brand-name">Arun K. Yadav</span>
          </a>
        </header>
        <section className="py-16 sm:py-20">
          <p className="section-kicker">{kicker}</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{intro}</p>
          <div className="mt-12">{children}</div>
        </section>
      </div>
    </main>
  );
}
