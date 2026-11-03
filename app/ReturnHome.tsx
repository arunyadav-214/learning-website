"use client";

import { usePathname } from "next/navigation";

export default function ReturnHome() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-10 sm:px-8 sm:pb-14">
      <div className="border-t border-black/10 pt-6 sm:pt-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-3 text-sm font-black text-[#181818] shadow-sm transition hover:-translate-y-0.5 hover:border-[#c83025]/35 hover:text-[#c83025] hover:shadow-md"
        >
          <span aria-hidden="true">←</span>
          Return to Home
        </a>
      </div>
    </div>
  );
}
