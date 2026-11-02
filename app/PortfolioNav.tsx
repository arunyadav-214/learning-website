const desktopLinks = [
  ["Projects", "/projects"],
  ["Skills", "/skills"],
  ["Research", "/research"],
  ["Games", "/games"],
  ["Resume", "/resume"],
  ["Social Media", "/#social-media"],
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
  ["Social Media", "/#social-media"],
] as const;

export default function PortfolioNav() {
  return (
    <>
      <nav
        className="fixed right-8 top-7 z-[100] hidden items-center gap-7 lg:flex"
        aria-label="Portfolio navigation"
      >
        {desktopLinks.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="text-sm font-medium text-[#5f5b54] transition hover:text-[#c83025]"
          >
            {label}
          </a>
        ))}
      </nav>

      <details className="fixed right-4 top-4 z-[100] lg:hidden">
        <summary className="cursor-pointer list-none rounded-xl border border-black/15 bg-[#faf9f5] px-4 py-3 font-black text-[#181818] shadow-lg">
          Menu
        </summary>
        <nav
          className="mt-2 max-h-[78vh] w-56 overflow-y-auto rounded-2xl border border-black/10 bg-[#faf9f5] p-2 shadow-2xl"
          aria-label="Mobile portfolio pages"
        >
          {mobileLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="block rounded-xl px-3 py-3 text-sm font-bold text-[#181818] transition hover:bg-[#c83025] hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
      </details>
    </>
  );
}
