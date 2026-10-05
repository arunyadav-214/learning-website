import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Cpu,
  Database,
  FileText,
  FlaskConical,
  Gamepad2,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Rocket,
  Sparkles,
  Terminal,
  Video,
  Wrench,
} from "lucide-react";

const featuredProjects = [
  {
    title: "Parking Garage PLC Project",
    description:
      "A Do-more Designer automation project configured for DM-SIM, with ladder-logic simulation and a packaged project download.",
    tags: ["Do-more Designer", "DM-SIM", "PLC", "Ladder Logic"],
    href: "/projects/parking-garage-plc",
    image: "/projects/parking-garage-plc-preview.svg",
    label: "Engineering + Automation",
  },
  {
    title: "Application of Machine Learning in Sports Analytics",
    description:
      "A research presentation exploring performance prediction, injury prevention, sports strategy, data sources, and real-world machine-learning applications.",
    tags: ["Machine Learning", "Sports Analytics", "Research"],
    href: "/research/machine-learning-sports-analytics",
    image: null,
    label: "Research",
  },
  {
    title: "Arun Learning Hub",
    description:
      "My personal portfolio and learning website for software, engineering projects, certificates, research, games, and academic work.",
    tags: ["Next.js", "TypeScript", "React", "Cloudflare"],
    href: "#top",
    image: null,
    label: "Web Development",
  },
];

const skills = [
  { icon: Code2, title: "Programming", items: ["Java", "Python", "C++", "JavaScript / TypeScript"] },
  { icon: Layers3, title: "Web", items: ["Next.js", "React", "HTML", "CSS"] },
  { icon: Database, title: "Data", items: ["MySQL", "SQL", "Database Design", "DAO Patterns"] },
  { icon: Cpu, title: "Systems", items: ["Computer Architecture", "Operating Systems", "Logisim", "Digital Logic"] },
  { icon: Wrench, title: "Engineering", items: ["PLC", "Do-more Designer", "Manufacturing", "Technical Drawing"] },
  { icon: Terminal, title: "Tools", items: ["Git", "GitHub", "NetBeans", "VS Code"] },
];

const certificates = [
  { title: "Learning C++ (2018)", provider: "LinkedIn Learning", date: "Nov 2025", href: "/certificates/learning-cpp-2018" },
  { title: "Basic Measurement 101", provider: "Tooling U-SME", date: "Oct 2026", href: "/certificates/basic-measurement-101" },
  { title: "Basics of Tolerance 121", provider: "Tooling U-SME", date: "Oct 2026", href: "/certificates/basics-of-tolerance-121" },
  { title: "Interpreting Prints 231", provider: "Tooling U-SME", date: "Sep 2026", href: "/certificates/interpreting-prints-231" },
  { title: "Introduction to Physical Properties 101", provider: "Tooling U-SME", date: "Oct 2026", href: "/certificates/introduction-to-physical-properties-101" },
  { title: "Types of Prints & Engineering Drawings 132", provider: "Tooling U-SME", date: "Sep 2026", href: "/certificates/types-of-prints-engineering-drawings-132" },
  { title: "Blueprint Reading 131", provider: "Tooling U-SME", date: "Sep 2026", href: "/certificates/blueprint-reading-131" },
];

const games = [
  ["Tic-Tac-Toe Arena", "/games/tic-tac-toe"],
  ["Lion & Goats", "/games/lion-goats"],
  ["Chess", "/games/chess"],
  ["Curious Monkey Adventure", "/games/curious-monkey"],
  ["Neon Snake", "/games/snake"],
  ["Rock-Paper-Scissors", "/games/rock-paper-scissors"],
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
      <section className="hero-shell relative isolate">
        <div className="aurora aurora-one" aria-hidden="true" />
        <div className="aurora aurora-two" aria-hidden="true" />
        <div className="aurora aurora-three" aria-hidden="true" />

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-5 sm:px-8 lg:pb-28">
          <header className="glass-nav sticky top-4 z-50 flex flex-wrap items-center justify-between gap-4 rounded-[1.4rem] px-4 py-3 sm:px-5">
            <a href="#top" className="brand-home-link" aria-label="Arun Learning Hub home">
              <img src="/arun-logo.svg" alt="Arun logo" className="brand-logo-full" />
              <span className="brand-name">Arun K. Yadav</span>
            </a>

            <nav className="header-showcase-links" aria-label="Portfolio navigation">
              <a href="#projects" className="header-showcase-link">Projects</a>
              <a href="#assignments" className="header-showcase-link">Assignments</a>
              <a href="#research-papers" className="header-showcase-link">Research</a>
              <a href="#certificates" className="header-showcase-link">Certificates</a>
              <a href="#games" className="header-showcase-link">Games</a>
              <a href="#videos" className="header-showcase-link">Videos</a>
              <a href="/resume" className="header-showcase-link">Resume</a>
            </nav>
          </header>

          <div className="grid min-h-[760px] items-center gap-14 pb-8 pt-20 lg:grid-cols-[1.08fr_.92fr] lg:gap-12 lg:pt-16">
            <div className="relative z-10">
              <div className="hero-pill mb-7">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                COMPUTER SCIENCE • APPLIED ENGINEERING
              </div>

              <h1 className="hero-title font-heading">
                Arun K. Yadav
                <span className="mt-3 block text-gradient">I build software, systems & practical engineering projects.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Computer Science student with an Applied Engineering minor, building across software,
                databases, automation, digital logic, research, and interactive web projects.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#projects" className="primary-button">
                  View my projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="/resume" className="secondary-button">
                  View resume
                </a>
              </div>

              <div className="mt-11 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="mini-chip"><GraduationCap className="h-4 w-4" /> Computer Science</span>
                <span className="mini-chip"><Wrench className="h-4 w-4" /> Applied Engineering</span>
                <span className="mini-chip"><MapPin className="h-4 w-4" /> Nepal → USA</span>
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
                  <span className="text-xs font-semibold tracking-wide text-white/50">portfolio.ts</span>
                </div>
                <div className="space-y-5 p-6 sm:p-8">
                  <p className="code-line"><span className="code-purple">const</span> focus = [</p>
                  <p className="code-line pl-5"><span className="code-green">&quot;software&quot;</span>,</p>
                  <p className="code-line pl-5"><span className="code-green">&quot;automation&quot;</span>,</p>
                  <p className="code-line pl-5"><span className="code-green">&quot;systems&quot;</span>,</p>
                  <p className="code-line pl-5"><span className="code-green">&quot;research&quot;</span></p>
                  <p className="code-line">];</p>
                  <div className="terminal-result">
                    <span className="text-emerald-300">✓</span>
                    <span>learn → build → test → improve → share</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="border-y border-border/70 bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-kicker">FEATURED PROJECTS</p>
              <h2 className="section-title font-heading">Work that shows what I can build.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              A focused collection of software, engineering, research, and interactive projects.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article key={project.title} className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-violet-400/40">
                {project.image ? (
                  <div className="aspect-[16/9] overflow-hidden border-b border-white/10 bg-slate-950/70">
                    <img src={project.image} alt={`${project.title} preview`} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] items-center justify-center border-b border-white/10 bg-gradient-to-br from-violet-950/70 via-slate-950 to-cyan-950/60">
                    <Rocket className="h-16 w-16 text-violet-300/70" aria-hidden="true" />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-cyan-300">{project.label}</p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.03em]">{project.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => <span key={tag} className="skill-chip">{tag}</span>)}
                  </div>
                  <a href={project.href} className="mt-6 inline-flex items-center gap-2 font-black text-violet-300 hover:text-cyan-300">
                    View project <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/70 p-7 sm:p-10 lg:grid-cols-[.9fr_1.1fr] lg:p-14">
          <div>
            <p className="section-kicker">ABOUT ME</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">From Nepal to the United States.</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-slate-300">
            <p>
              My journey combines computer science, applied engineering, and hands-on problem solving.
              I use this site to document what I build, what I learn, and the projects that best represent my growth.
            </p>
            <p>
              I am especially interested in software development, databases, automation, systems, digital logic,
              research, and creating useful interactive experiences on the web.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="border-y border-border/70 bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="section-kicker">SKILLS</p>
          <h2 className="section-title font-heading">A technical toolkit that spans software and engineering.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skills.map(({ icon: Icon, title, items }) => (
              <article key={title} className="rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-6">
                <span className="bento-icon"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => <span key={item} className="skill-chip">{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="research-papers" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-7 sm:p-9">
            <FlaskConical className="h-8 w-8 text-cyan-300" />
            <p className="mt-6 section-kicker">RESEARCH</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">Application of Machine Learning in Sports Analytics</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Research on machine learning techniques, sports data, fatigue tracking, performance prediction,
              real-world tools, challenges, and the role of human expertise.
            </p>
            <a href="/research/machine-learning-sports-analytics" className="mt-6 inline-flex items-center gap-2 font-black text-cyan-300">
              View research <ArrowUpRight className="h-4 w-4" />
            </a>
          </article>

          <article id="assignments" className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-7 sm:p-9">
            <BookOpen className="h-8 w-8 text-violet-300" />
            <p className="mt-6 section-kicker">ACADEMIC WORK</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">Selected assignments & coursework</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A growing collection of strong coursework across programming, data structures, databases,
              operating systems, computer architecture, manufacturing, and engineering.
            </p>
            <a href="#assignments" className="mt-6 inline-flex items-center gap-2 font-black text-violet-300">
              More assignments coming soon
            </a>
          </article>
        </div>
      </section>

      <section id="certificates" className="border-y border-border/70 bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="section-kicker">CERTIFICATES</p>
          <h2 className="section-title font-heading">Training and achievements.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {certificates.map((certificate) => (
              <a key={certificate.href} href={certificate.href} className="group rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-cyan-300/40">
                <Award className="h-7 w-7 text-amber-300" />
                <h3 className="mt-4 text-lg font-black">{certificate.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{certificate.provider}</p>
                <div className="mt-5 flex items-center justify-between gap-4 text-sm">
                  <span className="font-bold text-slate-400">{certificate.date}</span>
                  <span className="inline-flex items-center gap-1 font-black text-cyan-300">View <ArrowUpRight className="h-4 w-4" /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="games" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">GAME ARCADE</p>
            <h2 className="section-title font-heading">Interactive projects you can play.</h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            Small games that combine programming, UI, logic, AI difficulty levels, and browser interaction.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map(([title, href], index) => (
            <a key={href} href={href} className="group rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition hover:-translate-y-1 hover:border-violet-400/40">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-500/10 text-violet-300"><Gamepad2 className="h-6 w-6" /></span>
                <span className="text-4xl font-black text-white/[0.04]">0{index + 1}</span>
              </div>
              <h3 className="mt-8 text-xl font-black">{title}</h3>
              <span className="mt-4 inline-flex items-center gap-1 font-bold text-cyan-300">Play now <ArrowRight className="h-4 w-4" /></span>
            </a>
          ))}
        </div>
      </section>

      <section id="videos" className="border-y border-border/70 bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-7 sm:p-10">
            <Video className="h-8 w-8 text-cyan-300" />
            <p className="mt-5 section-kicker">VIDEOS</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">Project demos & walkthroughs</h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
              This section is ready for project demonstrations, presentations, tutorials, and walkthrough videos.
            </p>
          </div>
        </div>
      </section>

      <section id="timeline" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <p className="section-kicker">TIMELINE</p>
        <h2 className="section-title font-heading">Building the story over time.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-3xl font-black text-violet-300">2025</p>
            <p className="mt-3 font-bold">C++ training and continued programming growth.</p>
          </div>
          <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-3xl font-black text-cyan-300">2026</p>
            <p className="mt-3 font-bold">Computer science projects, PLC automation, certificates, research, and this portfolio.</p>
          </div>
          <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-3xl font-black text-emerald-300">2027</p>
            <p className="mt-3 font-bold">Internship experience, advanced coursework, and graduation progress.</p>
          </div>
        </div>
      </section>

      <section id="resume" className="border-y border-border/70 bg-gradient-to-r from-violet-950/40 via-slate-950 to-cyan-950/30">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="section-kicker">RESUME</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] sm:text-4xl">A quick view of my education, skills, and projects.</h2>
            </div>
            <a href="/resume" className="primary-button w-fit"><BriefcaseBusiness className="h-4 w-4" /> View resume</a>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-8 rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="section-kicker">LET&apos;S CONNECT</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">Thanks for visiting my portfolio.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Follow my work, projects, and learning journey across the platforms below.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {socials.map(([name, href]) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" className="secondary-button">{name}</a>
            ))}
          </div>
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>© 2026 Arun K. Yadav</span>
          <a href="#top" className="font-bold text-white hover:text-cyan-300">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
