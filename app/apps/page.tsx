import { ArrowLeft, Download, ExternalLink, MonitorDown } from "lucide-react";

const logisimDownload =
  "https://github.com/logisim-evolution/logisim-evolution/releases/download/v4.1.0/logisim-evolution-4.1.0-all.jar";

export default function AppsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
        <a href="/" className="secondary-button w-fit"><ArrowLeft className="h-4 w-4" /> Back to portfolio</a>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/50 p-7 sm:p-10 lg:p-14">
          <p className="section-kicker">APPS</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">Tools I use to learn, build, and test.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            A focused collection of software connected to my computer science and engineering work. Downloads stay external whenever possible so the portfolio remains lightweight and reliable.
          </p>
        </section>

        <section className="mt-10">
          <article className="grid gap-6 rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <span className="grid h-20 w-20 place-items-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08]">
              <MonitorDown className="h-10 w-10 text-emerald-300" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-black">Logisim Evolution</h2>
                <span className="skill-chip">Version 4.1.0</span>
              </div>
              <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
                Digital logic design and simulation software used for building, testing, and studying circuits in computer architecture and digital-logic coursework.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Digital Logic', 'Circuit Simulation', 'Computer Architecture', 'Java'].map((tag) => <span key={tag} className="skill-chip">{tag}</span>)}
              </div>
              <p className="mt-4 text-sm text-slate-500">Requires a compatible Java runtime. The download opens the official Logisim Evolution release.</p>
            </div>
            <a href={logisimDownload} target="_blank" rel="noreferrer" className="primary-button w-fit">
              <Download className="h-4 w-4" /> Download <ExternalLink className="h-4 w-4" />
            </a>
          </article>
        </section>
      </div>
    </main>
  );
}
