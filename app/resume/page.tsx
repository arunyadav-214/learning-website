import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Wrench,
} from "lucide-react";

const skillGroups = [
  ["Programming", "Java, Python, C++, JavaScript / TypeScript"],
  ["Web", "Next.js, React, HTML, CSS"],
  ["Databases", "MySQL, SQL, relational database design"],
  ["Systems", "Computer architecture, operating systems, digital logic, Logisim"],
  ["Engineering", "PLC, Do-more Designer, manufacturing, technical drawing"],
  ["Tools", "Git, GitHub, NetBeans, VS Code"],
] as const;

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <a href="/" className="inline-flex items-center gap-2 font-black text-white hover:text-cyan-300">
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </a>
          <span>Resume / Portfolio Summary</span>
        </div>

        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/70 p-7 sm:p-10 lg:p-14">
          <p className="section-kicker">ARUN K. YADAV</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-6xl">Computer Science + Applied Engineering</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Student developer and builder focused on software, databases, automation, systems,
            engineering problem solving, and practical project work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/#projects" className="primary-button">View projects</a>
            <a href="/#certificates" className="secondary-button">View certificates</a>
            <a href="/#research-papers" className="secondary-button">View research</a>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <GraduationCap className="h-7 w-7 text-violet-300" />
            <p className="mt-5 section-kicker">EDUCATION</p>
            <h2 className="mt-3 text-2xl font-black">Computer Science</h2>
            <p className="mt-2 text-muted-foreground">Jacksonville State University</p>
            <p className="mt-4 leading-7 text-slate-300">Minor: Applied Engineering</p>
          </article>

          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <BriefcaseBusiness className="h-7 w-7 text-cyan-300" />
            <p className="mt-5 section-kicker">FOCUS</p>
            <h2 className="mt-3 text-2xl font-black">Build practical systems</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Software development, databases, automation, computer systems, interactive projects,
              and engineering-focused problem solving.
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="section-kicker">TECHNICAL SKILLS</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">Tools I use to build and learn</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {skillGroups.map(([title, items]) => (
              <div key={title} className="rounded-xl border border-white/10 bg-slate-950/45 p-5">
                <h3 className="font-black text-white">{title}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{items}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <a href="/projects/parking-garage-plc" className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-violet-400/40">
            <Wrench className="h-7 w-7 text-emerald-300" />
            <h2 className="mt-5 text-xl font-black">Parking Garage PLC Project</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Automation project using Do-more Designer and DM-SIM.</p>
            <span className="mt-5 inline-flex items-center gap-1 font-black text-cyan-300">View <ArrowUpRight className="h-4 w-4" /></span>
          </a>

          <a href="/research/machine-learning-sports-analytics" className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-violet-400/40">
            <Database className="h-7 w-7 text-cyan-300" />
            <h2 className="mt-5 text-xl font-black">Machine Learning in Sports Analytics</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Research on ML applications, sports data, and analytics.</p>
            <span className="mt-5 inline-flex items-center gap-1 font-black text-cyan-300">View <ArrowUpRight className="h-4 w-4" /></span>
          </a>

          <a href="/#games" className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-violet-400/40">
            <Code2 className="h-7 w-7 text-violet-300" />
            <h2 className="mt-5 text-xl font-black">Interactive Games</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Browser games built around logic, AI, and user interaction.</p>
            <span className="mt-5 inline-flex items-center gap-1 font-black text-cyan-300">Explore <ArrowUpRight className="h-4 w-4" /></span>
          </a>
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-white/10 bg-gradient-to-r from-violet-950/40 to-cyan-950/30 p-6 sm:p-8">
          <p className="section-kicker">MORE</p>
          <h2 className="mt-3 text-2xl font-black">See the full portfolio for certificates, research, games, and future work.</h2>
          <a href="/" className="mt-6 inline-flex items-center gap-2 font-black text-cyan-300">Open portfolio <ArrowUpRight className="h-4 w-4" /></a>
        </section>
      </div>
    </main>
  );
}
