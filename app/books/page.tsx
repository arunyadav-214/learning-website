import PageShell from "../PageShell";

export default function BooksPage() {
  return (
    <PageShell kicker="BOOKS" title="Learning shelf." intro="Books and learning resources I want easy access to while studying and building projects.">
      <a href="https://codehiddenlanguage.com/" target="_blank" rel="noreferrer" className="block max-w-xl rounded-[1.5rem] border border-black/10 bg-white/80 p-6 transition hover:-translate-y-1 hover:border-[#c83025]/40">
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#c83025]">Learning Resource</p>
        <h2 className="mt-3 text-2xl font-black">Code Hidden Language</h2>
        <p className="mt-3 leading-7 text-muted-foreground">A coding and learning resource saved in my digital shelf for quick access.</p>
        <span className="mt-6 inline-block font-black text-[#c83025]">Open resource ↗</span>
      </a>
    </PageShell>
  );
}
