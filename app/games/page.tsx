import PageShell from "../PageShell";

const games = [
  ["Midnight City Racing", "https://arunyadav-214.github.io/midnight-city-racing/"],
  ["Tic-Tac-Toe Arena", "/games/tic-tac-toe"],
  ["Lion & Goats", "/games/lion-goats"],
  ["Chess", "/games/chess"],
  ["Curious Monkey Adventure", "/games/curious-monkey"],
  ["Neon Snake", "/games/snake"],
  ["Rock-Paper-Scissors", "/games/rock-paper-scissors"],
] as const;

export default function GamesPage() {
  return (
    <PageShell kicker="GAMES" title="Interactive projects." intro="Playable browser projects that combine programming, interface design, logic, and experimentation.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map(([title, href]) => (
          <a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="rounded-[1.4rem] border border-black/10 bg-white/80 p-6 transition hover:-translate-y-1 hover:border-[#c83025]/40">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#c83025]">PLAYABLE</p>
            <h2 className="mt-3 text-xl font-black">{title}</h2>
            <span className="mt-6 inline-block font-black text-[#c83025]">Play now ↗</span>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
