import { ExternalLink } from "lucide-react";
import PageShell from "../../PageShell";

const sections = [
  {
    title: "Problem",
    copy: "Create an interactive racing experience that runs directly in a web browser and can be shared without a desktop installation.",
  },
  {
    title: "Goal",
    copy: "Turn a game idea into a public, playable project and publish it through GitHub Pages.",
  },
  {
    title: "Build approach",
    copy: "The project is packaged as a browser game and deployed as a live site so visitors can test the experience immediately.",
  },
  {
    title: "Result",
    copy: "A publicly available racing project that demonstrates interactive front-end work, iteration, and deployment.",
  },
  {
    title: "What it shows",
    copy: "Game-oriented problem solving, browser interaction, project packaging, and the ability to ship a playable result.",
  },
] as const;

export default function MidnightCityRacingPage() {
  return (
    <PageShell
      kicker="PROJECT CASE STUDY"
      title="Midnight City Racing"
      intro="A browser-based city racing game published as a live GitHub Pages project."
    >
      <div className="flex flex-wrap gap-3">
        <a
          href="https://arunyadav-214.github.io/midnight-city-racing/"
          target="_blank"
          rel="noreferrer"
          className="primary-button"
        >
          Play live <ExternalLink className="h-4 w-4" />
        </a>
        <a href="/videos#midnight-city-racing" className="secondary-button">Demo video</a>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="rounded-[1.4rem] border border-black/10 bg-white/80 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#c83025]">{section.title}</p>
            <p className="mt-3 leading-7 text-muted-foreground">{section.copy}</p>
          </article>
        ))}
      </div>

      <section className="mt-8 rounded-[1.5rem] border border-black/10 bg-[#181818] p-6 text-white sm:p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#ff8177]">TECHNICAL EVIDENCE</p>
        <h2 className="mt-3 text-2xl font-black">Live deployment is the proof.</h2>
        <p className="mt-3 max-w-3xl leading-7 text-white/65">
          Instead of only describing the project, this case study links directly to the running browser experience so visitors can evaluate it themselves.
        </p>
      </section>
    </PageShell>
  );
}
