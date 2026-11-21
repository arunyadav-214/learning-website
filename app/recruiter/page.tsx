import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Database,
  ExternalLink,
  GraduationCap,
  Wrench,
} from "lucide-react";
import GitHubActivity from "../GitHubActivity";
import PageShell from "../PageShell";

const highlights = [
  {
    icon: Code2,
    title: "Software",
    copy: "Java, Python, C++, JavaScript / TypeScript, React, and Next.js.",
  },
  {
    icon: Database,
    title: "Data",
    copy: "MySQL, SQL, database design, and DAO patterns.",
  },
  {
    icon: Wrench,
    title: "Engineering",
    copy: "PLC automation, Do-more Designer, digital logic, manufacturing, and technical drawing.",
  },
  {
    icon: GraduationCap,
    title: "Systems",
    copy: "Computer architecture, operating systems, Logisim, and systems-focused coursework.",
  },
] as const;

const selectedWork = [
  {
    title: "Parking Garage PLC Project",
    why: "Strongest hands-on automation example.",
    href: "/projects/parking-garage-plc",
    tags: "PLC • Ladder Logic • DM-SIM",
  },
  {
    title: "Midnight City Racing",
    why: "Interactive browser project with a live deployment.",
    href: "/projects/midnight-city-racing",
    tags: "Browser Game • GitHub Pages",
  },
  {
    title: "Machine Learning in Sports Analytics",
    why: "Research and technical communication around applied ML.",
    href: "/research/machine-learning-sports-analytics",
    tags: "Machine Learning • Research",
  },
] as const;

export default function RecruiterPage() {
  return (
    <PageShell
      kicker="RECRUITER MODE"
      title="Arun K. Yadav in 60 seconds."
      intro="A focused view of the experience, projects, skills, and evidence most useful when evaluating my work."
    >
      <section className="rounded-[1.7rem] border border-[#c83025]/20 bg-[#fff7f5] p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#c83025] text-white">
            <BriefcaseBusiness className="h-6 w-6" />
          </span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#c83025]">PROFILE</p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
              Computer Science + Applied Engineering
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              Arun combines software development with hands-on engineering. His portfolio includes programming,
              databases, computer systems, PLC automation, research, web development, and interactive projects.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map(({ icon: Icon, title, copy }) => (
          <article key={title} className="rounded-2xl border border-black/10 bg-white/80 p-5">
            <Icon className="h-5 w-5 text-[#c83025]" />
            <h2 className="mt-4 text-lg font-black">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
          </article>
        ))}
      </div>

      <section className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">SELECTED WORK</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Three places to start.</h2>
          </div>
          <a href="/projects" className="secondary-button justify-center text-sm">
            All projects <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {selectedWork.map((project) => (
            <a
              key={project.title}
              href={project.href}
              className="rounded-[1.4rem] border border-black/10 bg-white/80 p-5 transition hover:-translate-y-1 hover:border-[#c83025]/35"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#c83025]">{project.tags}</p>
              <h3 className="mt-3 text-xl font-black">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.why}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#c83025]">
                View evidence <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <GitHubActivity />
      </div>

      <section className="mt-8 rounded-[1.7rem] border border-black/10 bg-[#181818] p-6 text-white sm:p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ff8177]">ASK THE PORTFOLIO</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Use Arun Assistant for a focused evaluation.</h2>
        <p className="mt-3 max-w-3xl leading-7 text-white/65">
          Try questions like “Which project best shows engineering ability?”, “What database experience is listed?”,
          or “Give me a recruiter-style summary of Arun.”
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/skills" className="rounded-xl bg-white px-5 py-3 text-sm font-black text-[#181818]">
            Verify skills
          </a>
          <a
            href="https://github.com/arunyadav-214"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-black text-white"
          >
            GitHub <ExternalLink className="h-4 w-4" />
          </a>
          <a href="/resume" className="rounded-xl border border-white/15 px-5 py-3 text-sm font-black text-white">
            Resume access
          </a>
        </div>
      </section>
    </PageShell>
  );
}
