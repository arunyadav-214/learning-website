import { ArrowRight, GraduationCap, MapPin, Sparkles, Wrench } from "lucide-react";
import PortfolioNav from "./PortfolioNav";
import { profilePhotoPartA } from "./profilePhotoPartA";
import { profilePhotoPartB } from "./profilePhotoPartB";

const profilePhotoSrc = `data:image/jpeg;base64,${profilePhotoPartA}${profilePhotoPartB}`;

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

const focusItems = [
  ["01", "Software", "Building practical software and web experiences."],
  ["02", "Systems", "Computer architecture, operating systems, and digital logic."],
  ["03", "Automation", "PLC logic and hands-on engineering workflows."],
  ["04", "Research", "Exploring applied technology through academic research."],
] as const;

export default function Home() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="hero-shell relative isolate min-h-screen">
        <div className="aurora aurora-one" aria-hidden="true" />
        <div className="aurora aurora-two" aria-hidden="true" />

        <div className="mx-auto max-w-6xl px-4 pb-14 pt-4 sm:px-8 sm:pb-20 sm:pt-6 lg:pt-8">
          <header className="glass-nav inline-flex max-w-[calc(100%-4.6rem)] items-center gap-3 rounded-[1.25rem] px-3 py-2.5 sm:max-w-none sm:gap-4 sm:rounded-[1.4rem] sm:px-5 sm:py-3">
            <a href="/" className="brand-home-link" aria-label="Arun Learning Hub home">
              <img src="/arun-logo.svg" alt="Arun logo" className="brand-logo-full" />
              <span className="brand-name">Arun K. Yadav</span>
            </a>
          </header>

          <PortfolioNav />

          <div className="grid items-center gap-10 pb-10 pt-12 sm:gap-12 sm:pb-14 sm:pt-16 lg:min-h-[610px] lg:grid-cols-[1.08fr_.92fr] lg:gap-16 lg:pt-18">
            <div className="relative order-2 lg:order-1">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c83025]/20 bg-white/75 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#c83025] shadow-sm backdrop-blur sm:mb-6 sm:px-4 sm:text-[11px] sm:tracking-[0.16em]">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Computer Science • Applied Engineering
              </div>

              <h1 className="font-heading text-[clamp(2.6rem,7vw,5.4rem)] font-black leading-[0.94] tracking-[-0.06em] text-[#181818]">
                Building software, automation & engineering systems.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-7 sm:text-xl sm:leading-8">
                I&apos;m Arun K. Yadav, a Computer Science student combining software development with practical Applied Engineering experience.
              </p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-4 sm:text-lg sm:leading-8">
                My work spans programming, databases, computer architecture, digital logic, PLC automation, research, and interactive projects.
              </p>

              <div className="mt-7 grid gap-2.5 text-sm text-muted-foreground sm:mt-9 sm:flex sm:flex-wrap sm:gap-3">
                <span className="mini-chip justify-start"><GraduationCap className="h-4 w-4" /> Computer Science</span>
                <span className="mini-chip justify-start"><Wrench className="h-4 w-4" /> Applied Engineering</span>
                <span className="mini-chip justify-start"><MapPin className="h-4 w-4" /> Nepal → USA</span>
              </div>

              <div className="mt-7 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap">
                <a href="/projects" className="primary-button justify-center">
                  View projects <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/resume" className="secondary-button justify-center">View resume</a>
              </div>
            </div>

            <div className="relative order-1 mx-auto w-full max-w-[430px] lg:order-2 lg:ml-auto">
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-[#c83025]/[0.07] blur-3xl" aria-hidden="true" />
              <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#faf9f5] p-2.5 shadow-[0_24px_70px_rgba(24,24,24,.13)] sm:rounded-[2.4rem] sm:p-3">
                <div className="overflow-hidden rounded-[1.55rem] sm:rounded-[1.95rem]">
                  <img
                    src={profilePhotoSrc}
                    alt="Professional portrait of Arun K. Yadav"
                    width="720"
                    height="714"
                    loading="eager"
                    decoding="async"
                    className="block aspect-square w-full object-cover object-center"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-3 pb-2 pt-4 sm:px-4">
                  <div>
                    <p className="font-black text-[#181818]">Arun K. Yadav</p>
                    <p className="mt-0.5 text-xs font-semibold text-muted-foreground">Computer Science • Applied Engineering</p>
                  </div>
                  <span className="rounded-full border border-[#c83025]/20 bg-[#c83025]/[0.06] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-[#c83025]">Portfolio</span>
                </div>
              </div>
            </div>
          </div>

          <section className="pb-16 pt-4 sm:pb-20 sm:pt-8">
            <div className="rounded-[1.7rem] border border-black/10 bg-white/75 p-5 shadow-[0_14px_45px_rgba(24,24,24,.06)] backdrop-blur sm:rounded-[2rem] sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
                <div>
                  <p className="section-kicker">MY FOCUS</p>
                  <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] sm:text-4xl">Learn. Build. Test. Improve.</h2>
                </div>
                <p className="max-w-3xl text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  I enjoy turning coursework and ideas into real projects that I can test, improve, and share. Each area of the portfolio opens as its own focused page.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {focusItems.map(([number, title, copy]) => (
                  <article key={title} className="rounded-2xl border border-black/10 bg-[#faf9f5] p-4 transition hover:-translate-y-1 hover:border-[#c83025]/30 hover:shadow-[0_14px_35px_rgba(24,24,24,.07)]">
                    <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#c83025]">{number}</span>
                    <h3 className="mt-2 font-black text-[#181818]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="journey" className="pb-16 pt-2 sm:pb-24 sm:pt-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-8">
              <div>
                <p className="section-kicker">MY JOURNEY</p>
                <h2 className="section-title mt-2 font-heading sm:mt-3">From Nepal to the United States.</h2>
              </div>
              <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                My path is still in progress. Each step has added new skills, new challenges, and a stronger interest in building useful technology.
              </p>
            </div>

            <div className="relative mt-8 grid gap-3.5 sm:mt-12 sm:gap-5 md:grid-cols-2">
              <div className="absolute left-1/2 top-6 hidden h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-gradient-to-b from-[#c83025]/30 via-[#c83025]/10 to-transparent md:block" aria-hidden="true" />
              {journey.map((item, index) => (
                <article key={item.title} className="group relative overflow-hidden rounded-[1.35rem] border border-black/10 bg-white/75 p-4 shadow-[0_8px_28px_rgba(24,24,24,.05)] transition hover:-translate-y-1 hover:border-[#c83025]/30 hover:shadow-[0_18px_45px_rgba(24,24,24,.08)] sm:rounded-[1.6rem] sm:p-6">
                  <div className="absolute right-4 top-3 text-4xl font-black text-[#c83025]/[0.06] sm:right-5 sm:top-4 sm:text-5xl">0{index + 1}</div>
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#c83025]/15 bg-[#c83025]/[0.06] text-2xl sm:h-14 sm:w-14 sm:rounded-2xl sm:text-3xl" aria-hidden="true">{item.flag}</span>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#c83025] sm:text-[10px] sm:tracking-[0.16em]">Step 0{index + 1}</p>
                      <h3 className="mt-1.5 text-lg font-black sm:mt-2 sm:text-xl">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground sm:mt-3 sm:text-base sm:leading-7">{item.copy}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="social-media" className="border-t border-black/10 py-9 sm:py-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <div>
                <p className="section-kicker">SOCIAL MEDIA</p>
                <h2 className="mt-2 text-xl font-black tracking-[-0.03em] sm:mt-3 sm:text-2xl">Connect with me online.</h2>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                {socials.map(([name, href]) => (
                  <a key={name} href={href} target="_blank" rel="noreferrer" className="secondary-button justify-center px-3 py-2.5 text-sm">
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </section>

          <footer className="border-t border-black/10 py-6 text-sm text-muted-foreground sm:py-8">
            <div className="flex flex-col gap-2 text-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:text-left">
              <span>© 2026 Arun K. Yadav</span>
              <span>Computer Science • Applied Engineering</span>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
