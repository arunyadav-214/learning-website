import PageShell from "../PageShell";

const projects = [
  {
    title: "Midnight City Racing",
    description: "A browser-based city racing game published on GitHub Pages.",
    href: "/projects/midnight-city-racing",
    liveHref: "https://arunyadav-214.github.io/midnight-city-racing/",
    meta: "Browser Game • Racing • GitHub Pages",
  },
  {
    title: "Parking Garage PLC Project",
    description: "A Do-more Designer automation project configured for DM-SIM with ladder-logic simulation.",
    href: "/projects/parking-garage-plc",
    liveHref: "",
    meta: "PLC • Ladder Logic • DM-SIM",
  },
  {
    title: "Application of Machine Learning in Sports Analytics",
    description: "Research on machine learning, sports data, fatigue tracking, performance prediction, and strategy.",
    href: "/research/machine-learning-sports-analytics",
    liveHref: "",
    meta: "Machine Learning • Research • Sports Analytics",
  },
  {
    title: "Arun Learning Hub",
    description: "My personal portfolio and learning platform for projects, research, certificates, games, books, apps, and academic work.",
    href: "/projects/arun-learning-hub",
    liveHref: "/",
    meta: "Next.js • React • TypeScript • Cloudflare",
  },
] as const;

export default function ProjectsPage() {
  return (
    <PageShell kicker="PROJECTS" title="Things I build." intro="Selected software, engineering, research, and interactive projects with case studies that show the problem, approach, evidence, and result.">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="rounded-[1.5rem] border border-black/10 bg-white/80 p-6 transition hover:-translate-y-1 hover:border-[#c83025]/40">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#c83025]">{project.meta}</p>
            <h2 className="mt-3 text-2xl font-black">{project.title}</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={project.href} className="primary-button text-sm">View case study ↗</a>
              {project.liveHref ? (
                <a
                  href={project.liveHref}
                  target={project.liveHref.startsWith("http") ? "_blank" : undefined}
                  rel={project.liveHref.startsWith("http") ? "noreferrer" : undefined}
                  className="secondary-button text-sm"
                >
                  Live demo
                </a>
              ) : (
                <a href="/videos" className="secondary-button text-sm">Demo video</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
