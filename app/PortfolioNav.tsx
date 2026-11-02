const links = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["Skills", "/skills"],
  ["Research", "/research"],
  ["Certificates", "/certificates"],
  ["Games", "/games"],
  ["Books", "/books"],
  ["Apps", "/apps"],
  ["Videos", "/videos"],
  ["Academic Work", "/academic-work"],
  ["Resume", "/resume"],
] as const;

export default function PortfolioNav() {
  return (
    <>
      <aside className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
        <nav className="w-48 rounded-[1.4rem] border border-black/10 bg-[#faf9f5]/95 p-3 shadow-[0_18px_55px_rgba(24,24,24,.10)] backdrop-blur-xl" aria-label="Portfolio pages">
          <p className="px-3 pb-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#c83025]">Explore</p>
          <div className="space-y-1">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="block rounded-xl px-3 py-2 text-sm font-bold text-[#181818] transition hover:bg-[#c83025] hover:text-white">
                {label}
              </a>
            ))}
          </div>
        </nav>
      </aside>

      <details className="fixed right-4 top-4 z-[100] lg:hidden">
        <summary className="cursor-pointer list-none rounded-xl border border-black/15 bg-[#faf9f5] px-4 py-3 font-black text-[#181818] shadow-lg">Menu</summary>
        <nav className="mt-2 max-h-[78vh] w-56 overflow-y-auto rounded-2xl border border-black/10 bg-[#faf9f5] p-2 shadow-2xl" aria-label="Mobile portfolio pages">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="block rounded-xl px-3 py-3 text-sm font-bold text-[#181818] transition hover:bg-[#c83025] hover:text-white">
              {label}
            </a>
          ))}
        </nav>
      </details>
    </>
  );
}
