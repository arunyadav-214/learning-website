import { ArrowRight, GraduationCap, MapPin, Sparkles, Wrench } from "lucide-react";
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

const socials = [
  ["LinkedIn", "https://www.linkedin.com/in/arun-kumar-yadav-5a60373ab/"],
  ["Instagram", "https://www.instagram.com/ay.run_"],
  ["X", "https://x.com/aruny71582"],
  ["TikTok", "https://www.tiktok.com/@arunyadav999"],
] as const;

export default function Home() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-background text-foreground">
      <PortfolioNav />

      <section className="hero-shell relative isolate min-h-screen">
        <div className="aurora aurora-one" aria-hidden="true" />
        <div className="aurora aurora-two" aria-hidden="true" />

        <div className="mx-auto max-w-6xl px-5 pb-20 pt-6 sm:px-8 lg:pt-24">
          <header className="glass-nav inline-flex items-center gap-4 rounded-[1.4rem] px-4 py-3 sm:px-5">
            <a href="/" className="brand-home-link" aria-label="Arun Learning Hub home">
              <img src="/arun-logo.svg" alt="Arun logo" className="brand-logo-full" />
              <span className="brand-name">Arun K. Yadav</span>
            </a>
          </header>

          <div className="grid items-center gap-12 pb-16 pt-24 lg:min-h-[660px] lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c83025]/20 bg-white/70 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#c83025] shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Introduction
              </div>

              <h1 className="hero-title font-heading">
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

              <div className="mt-9 flex flex-wrap gap-3">
                <a href="/projects" className="primary-button">
                  Explore my work <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/resume" className="secondary-button">View resume</a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2.4rem] bg-[#c83025]/[0.05] blur-2xl" aria-hidden="true" />
              <div className="glass-card overflow-hidden rounded-[2rem] p-0">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#c83025] via-[#d86a62] to-[#181818]" />
                <div className="p-7 sm:p-9">
                  <p className="section-kicker">MY FOCUS</p>
                  <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Learn. Build. Test. Improve.</h2>
                  <p className="mt-5 leading-8 text-muted-foreground">
                    I enjoy turning coursework and ideas into real projects that I can test, improve, and share. Use the navigation above to open each part of my portfolio as its own page.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {["Software", "Systems", "Automation", "Research"].map((item, index) => (
                      <div key={item} className="rounded-2xl border border-black/10 bg-white/75 p-4 shadow-sm">
                        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#c83025]">0{index + 1}</span>
                        <p className="mt-2 font-black text-[#181818]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section id="journey" className="pb-24 pt-6">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="section-kicker">MY JOURNEY</p>
                <h2 className="section-title mt-3 font-heading">From Nepal to the United States.</h2>
              </div>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                My path is still in progress. Each step has added new skills, new challenges, and a stronger interest in building useful technology.
              </p>
            </div>

            <div className="relative mt-12 grid gap-5 md:grid-cols-2">
              <div className="absolute left-1/2 top-6 hidden h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-gradient-to-b from-[#c83025]/30 via-[#c83025]/10 to-transparent md:block" aria-hidden="true" />
              {journey.map((item, index) => (
                <article key={item.title} className="group relative overflow-hidden rounded-[1.6rem] border border-black/10 bg-white/75 p-6 shadow-[0_10px_35px_rgba(24,24,24,.05)] transition hover:-translate-y-1 hover:border-[#c83025]/30 hover:shadow-[0_18px_45px_rgba(24,24,24,.08)]">
                  <div className="absolute right-5 top-4 text-5xl font-black text-[#c83025]/[0.06]">0{index + 1}</div>
                  <div className="flex items-start gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[#c83025]/15 bg-[#c83025]/[0.06] text-3xl" aria-hidden="true">{item.flag}</span>
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

          <section id="social-media" className="border-t border-black/10 py-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-kicker">SOCIAL MEDIA</p>
                <h2 className="mt-3 text-2xl font-black tracking-[-0.03em]">Connect with me online.</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {socials.map(([name, href]) => (
                  <a key={name} href={href} target="_blank" rel="noreferrer" className="secondary-button">
                    {name}
                  </a>
                ))}
              </div>
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
