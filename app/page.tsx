import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Boxes,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Rocket,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";

const learningTracks = [
  {
    icon: Code2,
    label: "Software",
    title: "Build real software",
    description:
      "Turn ideas into working projects while learning the tools and habits used by developers.",
    tag: "Code + Projects",
  },
  {
    icon: Cpu,
    label: "Systems",
    title: "Understand what is underneath",
    description:
      "Explore computer architecture, operating systems, logic, and the foundations behind modern computing.",
    tag: "Hardware + OS",
  },
  {
    icon: Database,
    label: "Data",
    title: "Work with useful data",
    description:
      "Practice databases, SQL, APIs, and structured information through practical examples.",
    tag: "SQL + Data",
  },
  {
    icon: Boxes,
    label: "Engineering",
    title: "Connect software and engineering",
    description:
      "Bring technical problem-solving into hands-on engineering, design, and manufacturing topics.",
    tag: "Applied Learning",
  },
];

const principles = [
  {
    icon: BookOpen,
    title: "Make it clear",
    description:
      "Break difficult ideas into explanations that are easier to understand and remember.",
  },
  {
    icon: Rocket,
    title: "Make it practical",
    description:
      "Move from reading to building so each topic becomes something you can actually use.",
  },
  {
    icon: Users,
    title: "Make it shareable",
    description:
      "Create projects, notes, and resources that can help other learners move forward too.",
  },
];

const stats = [
  { value: "2026", label: "Started" },
  { value: "4", label: "Learning tracks" },
  { value: "100%", label: "Project-driven" },
];

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/ay.run_",
  },
  {
    name: "X",
    href: "https://x.com/aruny71582",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@arunyadav999",
  },
];

function SocialIcon({ name }: { name: string }) {
  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="social-svg">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="17.4" cy="6.8" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  if (name === "TikTok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="social-svg">
        <path
          d="M14.2 3.2v10.5a4.6 4.6 0 1 1-3.3-4.4v3.2a1.8 1.8 0 1 0 .5 1.2V3.2h2.8Zm0 0c.4 2.3 1.8 3.8 4.2 4.2v2.9c-1.7-.1-3.1-.7-4.2-1.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-svg">
      <path
        d="M4 4l16 16M20 4 4 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="hero-shell relative isolate">
        <div className="aurora aurora-one" aria-hidden="true" />
        <div className="aurora aurora-two" aria-hidden="true" />
        <div className="aurora aurora-three" aria-hidden="true" />

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-5 sm:px-8 lg:pb-28">
          <header className="glass-nav sticky top-4 z-50 flex items-center justify-between rounded-[1.4rem] px-4 py-3 sm:px-5">
            <a href="#top" className="flex items-center gap-3" aria-label="Arun Learning Hub home">
              <span className="brand-logo-wrap">
                <img src="/arun-logo.webp" alt="Arun logo" className="brand-logo-img" />
              </span>
              <span className="font-heading text-sm font-black tracking-[-0.02em] sm:text-base">
                ARUN<span className="text-gradient">/LEARN</span>
              </span>
            </a>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
              <a href="#learn" className="nav-link">Learn</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#principles" className="nav-link">Approach</a>
            </nav>

            <a href="#socials" className="nav-cta">
              Follow
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </header>

          <div className="grid min-h-[760px] items-center gap-14 pb-8 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-16">
            <div className="relative z-10">
              <div className="hero-pill mb-7">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                STUDENT-BUILT • PROJECT-DRIVEN • 2026
              </div>

              <h1 className="hero-title font-heading">
                Learn the idea.
                <span className="block text-gradient">Build the proof.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Arun Learning Hub is a practical technology learning space for
                turning confusing concepts into clear notes, useful projects,
                and skills you can keep building on.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#learn" className="primary-button">
                  Explore learning tracks
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="#about" className="secondary-button">
                  Meet the builder
                </a>
              </div>

              <div className="mt-11 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="mini-chip"><BadgeCheck className="h-4 w-4" /> Clear explanations</span>
                <span className="mini-chip"><Terminal className="h-4 w-4" /> Hands-on practice</span>
                <span className="mini-chip"><GraduationCap className="h-4 w-4" /> Student focused</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[620px] lg:ml-auto">
              <div className="hero-orbit" aria-hidden="true" />
              <div className="code-window glass-card">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex gap-2" aria-hidden="true">
                    <span className="window-dot bg-rose-400" />
                    <span className="window-dot bg-amber-300" />
                    <span className="window-dot bg-emerald-400" />
                  </div>
                  <span className="text-xs font-semibold tracking-wide text-white/50">learning.ts</span>
                </div>
                <div className="space-y-5 p-6 sm:p-8">
                  <div>
                    <p className="code-line"><span className="code-purple">const</span> learner = &#123;</p>
                    <p className="code-line pl-5"><span className="code-blue">curiosity</span>: <span className="code-green">true</span>,</p>
                    <p className="code-line pl-5"><span className="code-blue">practice</span>: <span className="code-green">&quot;daily&quot;</span>,</p>
                    <p className="code-line pl-5"><span className="code-blue">goal</span>: <span className="code-amber">&quot;build something real&quot;</span></p>
                    <p className="code-line">&#125;;</p>
                  </div>
                  <div className="terminal-result">
                    <span className="text-emerald-300">✓</span>
                    <span>concept → practice → project → growth</span>
                  </div>
                </div>
              </div>

              <div className="floating-card floating-card-one">
                <span className="floating-icon"><Code2 className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Current mode</p>
                  <p className="mt-1 font-heading text-lg font-black">Build & learn</p>
                </div>
              </div>

              <div className="floating-card floating-card-two">
                <span className="pulse-dot" aria-hidden="true" />
                <div>
                  <p className="text-xs text-muted-foreground">Learning hub</p>
                  <p className="font-heading font-black">Always evolving</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-strip">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item">
                <p className="font-heading text-2xl font-black tracking-[-0.04em] sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
            <div className="stat-item hidden md:block">
              <p className="font-heading text-2xl font-black tracking-[-0.04em] sm:text-3xl">∞</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">Room to grow</p>
            </div>
          </div>
        </div>
      </section>

      <section id="learn" className="section-shell border-y border-border/70">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="section-kicker">LEARNING TRACKS</p>
              <h2 className="section-title font-heading">A hub built around doing.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground lg:ml-auto">
              Learn across software, systems, data, and engineering without losing
              sight of the most important part: making something that proves what you know.
            </p>
          </div>

          <div className="bento-grid">
            {learningTracks.map((track, index) => {
              const Icon = track.icon;
              return (
                <article key={track.title} className={`bento-card group ${index === 0 ? "bento-featured" : ""}`}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="bento-icon"><Icon className="h-6 w-6" /></span>
                    <span className="bento-tag">{track.tag}</span>
                  </div>
                  <div className="mt-12">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{track.label}</p>
                    <h3 className="mt-3 font-heading text-2xl font-black tracking-[-0.03em]">{track.title}</h3>
                    <p className="mt-3 max-w-xl leading-7 text-muted-foreground">{track.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="about-card overflow-hidden rounded-[2rem]">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="profile-pane relative grid min-h-[360px] place-items-center p-10">
              <div className="profile-ring">
                <div className="profile-logo-card">
                  <img src="/arun-logo.webp" alt="Arun mountain logo" className="profile-logo-img" />
                </div>
              </div>
              <div className="profile-badge">
                <span className="pulse-dot" />
                Building in public
              </div>
            </div>

            <div className="p-8 sm:p-12 lg:p-16">
              <p className="section-kicker">THE BUILDER</p>
              <h2 className="mt-3 font-heading text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Arun Yadav
              </h2>
              <p className="mt-3 text-lg font-semibold text-gradient">Student developer & lifelong learner</p>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
                I built Arun Learning Hub as a place to turn class concepts, technical
                practice, and personal projects into useful learning resources. The goal
                is simple: understand more deeply by building more often.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="skill-chip">Software development</span>
                <span className="skill-chip">Computer systems</span>
                <span className="skill-chip">Databases</span>
                <span className="skill-chip">Applied engineering</span>
              </div>

              <div id="socials" className="mt-9">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Find me online
                </p>
                <div className="flex flex-wrap gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="social-link"
                      aria-label={`Follow Arun on ${social.name}`}
                    >
                      <span className="social-mark"><SocialIcon name={social.name} /></span>
                      <span>{social.name}</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="principles" className="section-shell border-y border-border/70">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-kicker">THE APPROACH</p>
            <h2 className="section-title font-heading">Learn in a way that sticks.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Good learning feels clear, active, and connected to something real.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="principle-card">
                  <span className="principle-number">0{principles.indexOf(item) + 1}</span>
                  <span className="principle-icon"><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-8 font-heading text-2xl font-black tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="cta-panel">
          <div>
            <p className="section-kicker text-white/60">KEEP BUILDING</p>
            <h2 className="mt-3 max-w-3xl font-heading text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              One useful project can change what you think you can do.
            </h2>
          </div>
          <a href="#top" className="cta-button">
            Back to the top
            <ArrowRight className="h-4 w-4 -rotate-90" />
          </a>
        </div>
      </section>

      <footer className="border-t border-border/70">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">© 2026 Arun Learning Hub. Built by Arun Yadav.</p>
            <div className="flex flex-wrap gap-2" aria-label="Social media links">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social"
                  aria-label={social.name}
                >
                  <span className="social-mark social-mark-small"><SocialIcon name={social.name} /></span>
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
