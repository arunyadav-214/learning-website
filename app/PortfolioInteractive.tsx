"use client";

import { useEffect, useMemo, useState } from "react";

const commands = [
  { label: "Projects", hint: "Featured work & case studies", target: "#projects", code: "01" },
  { label: "About", hint: "My Nepal to USA journey", target: "#about", code: "02" },
  { label: "Skills", hint: "Programming, systems & engineering", target: "#skills", code: "03" },
  { label: "Research", hint: "Machine learning in sports analytics", target: "#research-papers", code: "04" },
  { label: "Games", hint: "Open the game arcade", target: "#games", code: "05" },
  { label: "Books", hint: "Books & learning resources", target: "#books", code: "06" },
  { label: "Apps", hint: "Tools I use for coursework", target: "/apps", code: "07" },
  { label: "Certificates", hint: "Training & achievements", target: "#certificates", code: "08" },
  { label: "Resume", hint: "Education, skills & projects", target: "/resume", code: "09" },
] as const;

function go(target: string) {
  if (target.startsWith("#")) {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.href = target;
  }
}

function formatClock(timeZone: string) {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);
  const date = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(now);
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { timeZone, hour: "2-digit", hourCycle: "h23" })
      .formatToParts(now)
      .find((part) => part.type === "hour")?.value ?? 0
  );
  return { time, date, icon: hour >= 6 && hour < 18 ? "☀️" : "🌙" };
}

export function WorldClocks() {
  const [nepal, setNepal] = useState(() => ({ time: "", date: "", icon: "" }));
  const [america, setAmerica] = useState(() => ({ time: "", date: "", icon: "" }));

  useEffect(() => {
    const update = () => {
      setNepal(formatClock("Asia/Kathmandu"));
      setAmerica(formatClock("America/Chicago"));
    };
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  const cards = [
    { name: "🇳🇵 Nepal", data: nepal },
    { name: "🇺🇸 America", data: america },
  ];

  return (
    <div className="grid grid-cols-2 gap-px bg-[#d7d4cc]" aria-label="Current time in Nepal and America">
      {cards.map(({ name, data }) => (
        <div key={name} className="bg-[#faf9f5] px-4 py-4 text-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#c83025]">{name}</p>
          <div className="mt-1 flex items-center justify-center gap-2">
            <span aria-hidden="true">{data.icon}</span>
            <strong className="font-mono text-sm text-[#181818]">{data.time || "--:--"}</strong>
          </div>
          <p className="mt-1 font-mono text-[10px] text-[#66635d]">{data.date}</p>
        </div>
      ))}
    </div>
  );
}

export function PortfolioInteractive({ showTrigger = true }: { showTrigger?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [terminal, setTerminal] = useState(false);
  const filtered = useMemo(
    () => commands.filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  useEffect(() => {
    let typed = "";
    let sequence: string[] = [];
    const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

    const reveal = () => {
      setTerminal(true);
      window.setTimeout(() => setTerminal(false), 4200);
    };

    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      const target = event.target as HTMLElement | null;
      const isTypingField = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if (isTypingField) return;

      if (event.key.length === 1) {
        typed = (typed + event.key.toLowerCase()).slice(-12);
        if (typed.endsWith("arun")) reveal();
      }

      sequence = [...sequence, event.key].slice(-konami.length);
      if (sequence.length === konami.length && sequence.every((key, index) => key === konami[index])) reveal();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {showTrigger && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="border border-[#cfcac0] bg-transparent px-5 py-3 text-sm font-bold text-[#181818] transition hover:border-[#c83025] hover:text-[#c83025]"
          aria-label="Open portfolio command palette"
        >
          Ctrl + K · Explore
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-[#181818]/80 px-4 pt-[10vh] backdrop-blur-md" onMouseDown={() => setOpen(false)}>
          <div className="w-full max-w-2xl overflow-hidden border border-[#c83025]/30 bg-[#faf9f5] shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-[#d7d4cc] px-4 py-4">
              <span className="text-[#c83025]" aria-hidden="true">⌘</span>
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, games, books, apps..."
                className="w-full bg-transparent text-base text-[#181818] outline-none placeholder:text-[#918d84]"
              />
              <button type="button" onClick={() => setOpen(false)} className="text-sm font-bold text-[#77736b] hover:text-[#c83025]">ESC</button>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {filtered.map((item) => (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => { setOpen(false); setQuery(""); go(item.target); }}
                  className="flex w-full items-center gap-3 px-3 py-3 text-left transition hover:bg-[#f0ede6]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center border border-[#d7d4cc] font-mono text-[10px] font-bold text-[#c83025]">{item.code}</span>
                  <span>
                    <strong className="block text-sm text-[#181818]">{item.label}</strong>
                    <span className="mt-1 block text-xs text-[#77736b]">{item.hint}</span>
                  </span>
                </button>
              ))}
              {filtered.length === 0 && <p className="px-3 py-8 text-center text-sm text-[#77736b]">No matching section.</p>}
            </div>
            <div className="flex items-center justify-between border-t border-[#d7d4cc] px-4 py-3 font-mono text-[11px] text-[#77736b]">
              <span>Quick portfolio navigation</span>
              <span>Try typing “arun”</span>
            </div>
          </div>
        </div>
      )}

      {terminal && (
        <div className="fixed inset-0 z-[10000] grid place-items-center bg-[#000905]/95 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl border border-emerald-400/40 bg-[#010704] p-6 font-mono text-sm text-emerald-300 shadow-[0_0_80px_rgba(34,197,94,.15)]">
            <p>&gt; identity --lookup arun</p>
            <p className="mt-3">✓ Computer Science + Applied Engineering</p>
            <p className="mt-2">✓ Nepal → USA · learn → build → test → improve</p>
            <p className="mt-2">✓ Secret terminal unlocked</p>
            <p className="mt-5 text-emerald-500">Session closes automatically...</p>
          </div>
        </div>
      )}
    </>
  );
}