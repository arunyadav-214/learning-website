import PageShell from "../PageShell";

const demos = [
  {
    id: "midnight-city-racing",
    title: "Midnight City Racing",
    copy: "Browser-game demo and gameplay walkthrough.",
    url: process.env.NEXT_PUBLIC_MIDNIGHT_CITY_RACING_DEMO_URL,
    live: "https://arunyadav-214.github.io/midnight-city-racing/",
  },
  {
    id: "parking-garage-plc",
    title: "Parking Garage PLC",
    copy: "Short walkthrough slot for the Do-more Designer / DM-SIM ladder-logic project.",
    url: process.env.NEXT_PUBLIC_PARKING_GARAGE_DEMO_URL,
    live: "",
  },
  {
    id: "machine-learning-sports",
    title: "Machine Learning in Sports Analytics",
    copy: "Presentation/research walkthrough slot.",
    url: process.env.NEXT_PUBLIC_ML_SPORTS_DEMO_URL,
    live: "/research/machine-learning-sports-analytics",
  },
] as const;

export default function VideosPage() {
  return (
    <PageShell kicker="VIDEOS" title="Project demos & walkthroughs." intro="Short demonstrations are streamed from external hosting so the portfolio stays fast and the main repository stays lightweight.">
      <div className="grid gap-5 md:grid-cols-2">
        {demos.map((demo) => (
          <article id={demo.id} key={demo.id} className="rounded-[1.5rem] border border-black/10 bg-white/80 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#c83025]">DEMO SLOT</p>
            <h2 className="mt-3 text-2xl font-black">{demo.title}</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{demo.copy}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {demo.url ? (
                <a href={demo.url} target="_blank" rel="noreferrer" className="primary-button text-sm">Watch demo ↗</a>
              ) : (
                <span className="rounded-xl border border-black/10 bg-[#faf9f5] px-4 py-3 text-sm font-bold text-black/45">
                  Video recording slot ready
                </span>
              )}
              {demo.live ? <a href={demo.live} className="secondary-button text-sm">Open project</a> : null}
            </div>
          </article>
        ))}
      </div>

      <section className="mt-8 rounded-[1.5rem] border border-[#c83025]/20 bg-[#fff7f5] p-6">
        <p className="section-kicker">FAST WEBSITE</p>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
          Demo videos are intentionally referenced from external streaming URLs instead of being committed as large video files. Once a recording URL is configured, the Watch Demo button appears automatically.
        </p>
      </section>
    </PageShell>
  );
}
