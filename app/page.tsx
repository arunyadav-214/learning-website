import { ArrowRight, GraduationCap, MapPin, Wrench } from "lucide-react";
import PortfolioNav from "./PortfolioNav";

const journey = [
  {
    flag: "🇳🇵",
    title: "Nepal",
    copy: "Where my story, curiosity, and motivation to keep learning began.",
  },
  {
    flag: "🇺🇸",
    title: "University in the USA",
    copy: "Studying Computer Science while building hands-on experience in Applied Engineering.",
  },
  {
    flag: "⚙️",
    title: "Build & Experiment",
    copy: "Software, databases, digital logic, PLC automation, research, games, and web projects.",
  },
  {
    flag: "🚀",
    title: "2027 & Beyond",
    copy: "Internship experience, advanced coursework, graduation progress, and larger technical systems.",
  },
] as const;

export default function Home() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-background text-foreground">
      <PortfolioNav />

      <section className="hero-shell relative isolate min-h-screen">
        <div className="aurora aurora-one" aria-hidden="true" />
        <div className="aurora aurora-two" aria-hidden="true" />

        <div className="mx-auto max-w-6xl px-5 pb-20 pt-6 sm:px-8 lg:pr-64">
          <header className="glass-nav flex items-center gap-4 rounded-[1.4rem] px-4 py-3 sm:px-5">
            <a href="/" className="brand-home-link" aria-label="Arun Learning Hub home">
              <img src="/arun-logo.svg" alt="Arun logo" className="brand-logo-full" />
              <span className="brand-name">Arun K. Yadav</span>
            </a>
          </header>

          <div className="grid items-center gap-12 pb-14 pt-20 lg:min-h-[650px] lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="section-kicker">INTRODUCTION</p>
              <h1 className="hero-title mt-5 font-heading">
                <span className="block text-gradient">Computer Science + Applied Engineering.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                I&apos;m Arun K. Yadav. I build software, systems, automation projects, and interactive experiences while documenting what I learn along the way.
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                My portfolio combines programming, databases, computer architecture, digital logic, PLC automation, research, and practical engineering work.
              </p>

              <div className="mt-9 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="mini-chip"><GraduationCap className="h-4 w-4" /> Computer Science</span>
                <span className="mini-chip"><Wrench className="h-4 w-4" /> Applied Engineering</span>
                <span className="mini-chip"><MapPin className="h-4 w-4" /> Nepal → USA</span>
              </div>

              <div className="mt-9 lg:hidden">
                <a href="/projects" className="primary-button">
                  Explore my work <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-7 sm:p-9">
              <p className="section-kicker">MY FOCUS</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">Learn. Build. Test. Improve.</h2>
              <p className="mt-5 leading-8 text-muted-foreground">
                I enjoy turning coursework and ideas into real projects that I can test, improve, and share. The navigation on the right opens each part of my portfolio as its own page.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                {["Software", "Systems", "Automation", "Research"].map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center font-black">{item}</div>
                ))}
              </div>
            </div>
          </div>

          <section id="journey" className="pb-24">
            <p className="section-kicker">MY JOURNEY</p>
            <h2 className="section-title mt-3 font-heading">From Nepal to the United States.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              My path is still in progress. Each step has added new skills, new challenges, and a stronger interest in building useful technology.
            </p>

            <div className="relative mt-12 grid gap-5 md:grid-cols-2">
              {journey.map((item, index) => (
                <article key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl" aria-hidden="true">{item.flag}</span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#c83025]">Step 0{index + 1}</p>
                      <h3 className="mt-2 text-xl font-black">{item.title}</h3>
                      <p className="mt-3 leading-7 text-muted-foreground">{item.copy}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <footer className="border-t border-black/10 py-8 text-sm text-muted-foreground">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span>© 2026 Arun K. Yadav</span>
              <span>Computer Science • Applied Engineering</span>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
