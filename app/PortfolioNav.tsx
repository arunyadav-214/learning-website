import HomeClocks from "./HomeClocks";

const desktopLinks = [
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

const mobileLinks = [
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
      <div className="fixed left-1/2 top-4 z-[100] hidden w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 lg:block">
        <div className="rounded-[1.35rem] border border-black/10 bg-[#faf9f5]/90 px-5 py-3 shadow-[0_14px_45px_rgba(24,24,24,.07)] backdrop-blur-xl">
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label="Portfolio navigation">
            {desktopLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="relative whitespace-nowrap text-sm font-semibold text-[#5f5b54] transition after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-[#c83025] after:transition-all hover:text-[#c83025] hover:after:w-full"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="ml-auto mt-3 w-[372px]">
          <HomeClocks />
        </div>
      </div>

      <details className="fixed right-3 top-3 z-[100] lg:hidden">
        <summary className="cursor-pointer list-none rounded-xl border border-black/15 bg-[#faf9f5]/95 px-3.5 py-2.5 text-sm font-black text-[#181818] shadow-[0_10px_28px_rgba(24,24,24,.12)] backdrop-blur-xl transition hover:border-[#c83025]/30 hover:text-[#c83025]">
          Menu
        </summary>
        <div className="mt-2 w-[min(18rem,calc(100vw-1.5rem))]">
          <nav
            className="max-h-[58vh] overflow-y-auto rounded-2xl border border-black/10 bg-[#faf9f5]/98 p-2 shadow-2xl backdrop-blur-xl"
            aria-label="Mobile portfolio pages"
          >
            {mobileLinks.map(([label, href], index) => (
              <a
                key={href}
                href={href}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[#181818] transition hover:bg-[#c83025] hover:text-white"
              >
                <span>{label}</span>
                <span className="text-[10px] font-black opacity-40">{String(index + 1).padStart(2, "0")}</span>
              </a>
            ))}
          </nav>
          <div className="mt-2 rounded-2xl border border-black/10 bg-[#faf9f5]/98 p-2 shadow-lg backdrop-blur-xl">
            <HomeClocks />
          </div>
        </div>
      </details>
    </>
  );
}
