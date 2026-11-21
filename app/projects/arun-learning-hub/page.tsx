import PageShell from "../../PageShell";

const sections = [
  ["Problem", "Create one professional place to organize software projects, engineering work, research, certificates, games, academic work, and career material."],
  ["Goal", "Build a fast portfolio that is useful to both general visitors and recruiters without overcrowding the homepage."],
  ["Stack", "Next.js, React, TypeScript, GitHub, and Cloudflare are used to build and deploy the site."],
  ["Design approach", "Content is split into focused pages, while the homepage stays centered on introduction, current work, selected evidence, and navigation."],
  ["Interactive layer", "Arun Assistant adds portfolio-aware Q&A, recruiter prompts, page context, conversation memory, and optional AI/web-search capabilities."],
  ["Result", "A continuously evolving learning hub that acts as both a portfolio and a practical software project."],
] as const;

export default function ArunLearningHubPage() {
  return (
    <PageShell
      kicker="PROJECT CASE STUDY"
      title="Arun Learning Hub"
      intro="The portfolio itself is a software project: a Next.js learning hub designed to organize evidence of software, systems, engineering, and research work."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map(([title, copy]) => (
          <article key={title} className="rounded-[1.4rem] border border-black/10 bg-white/80 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#c83025]">{title}</p>
            <p className="mt-3 leading-7 text-muted-foreground">{copy}</p>
          </article>
        ))}
      </div>

      <section className="mt-8 rounded-[1.5rem] border border-[#c83025]/20 bg-[#fff7f5] p-6 sm:p-8">
        <p className="section-kicker">CONTINUOUS IMPROVEMENT</p>
        <h2 className="mt-3 text-2xl font-black">The site changes as my work grows.</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
          New project case studies, skills evidence, recruiter tools, GitHub activity, demos, and Arun Assistant improvements are added as the portfolio evolves.
        </p>
      </section>
    </PageShell>
  );
}
