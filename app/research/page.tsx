import PageShell from "../PageShell";

export default function ResearchPage() {
  return (
    <PageShell kicker="RESEARCH" title="Research & analysis." intro="Research work that connects data, technology, and practical decision-making.">
      <a href="/research/machine-learning-sports-analytics" className="block rounded-[1.5rem] border border-black/10 bg-white/80 p-6 transition hover:-translate-y-1 hover:border-[#c83025]/40">
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#c83025]">Machine Learning • Sports Analytics</p>
        <h2 className="mt-3 text-2xl font-black">Application of Machine Learning in Sports Analytics</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">Explores performance prediction, injury prevention, fatigue tracking, strategy, sports data, machine-learning methods, real-world tools, challenges, and the role of human expertise.</p>
        <span className="mt-6 inline-block font-black text-[#c83025]">View research ↗</span>
      </a>
    </PageShell>
  );
}
