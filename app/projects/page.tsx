import PageShell from "../PageShell";

const projects = [
  {
    title: "Midnight City Racing",
    description: "A browser-based city racing game published on GitHub Pages.",
    href: "https://arunyadav-214.github.io/midnight-city-racing/",
    meta: "Browser Game • Racing • GitHub Pages",
  },
  {
    title: "Parking Garage PLC Project",
    description: "A Do-more Designer automation project configured for DM-SIM with ladder-logic simulation.",
    href: "/projects/parking-garage-plc",
    meta: "PLC • Ladder Logic • DM-SIM",
  },
  {
    title: "Application of Machine Learning in Sports Analytics",
    description: "Research on machine learning, sports data, fatigue tracking, performance prediction, and strategy.",
    href: "/research/machine-learning-sports-analytics",
    meta: "Machine Learning • Research • Sports Analytics",
  },
  {
    title: "Arun Learning Hub",
    description: "My personal portfolio and learning platform for projects, research, certificates, games, books, apps, and academic work.",
    href: "/",
    meta: "Next.js • React • TypeScript • Cloudflare",
  },
];

export default function ProjectsPage() {
  return (
    <PageShell kicker="PROJECTS" title="Things I build." intro="Selected software, engineering, research, and interactive projects that show how I learn and solve problems.">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <a key={project.title} href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noreferrer" : undefined} className="rounded-[1.5rem] border border-black/10 bg-white/80 p-6 transition hover:-translate-y-1 hover:border-[#c83025]/40">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#c83025]">{project.meta}</p>
            <h2 className="mt-3 text-2xl font-black">{project.title}</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{project.description}</p>
            <span className="mt-6 inline-block font-black text-[#c83025]">Open project ↗</span>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
