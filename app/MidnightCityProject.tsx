"use client";

import { useEffect } from "react";

export default function MidnightCityProject() {
  useEffect(() => {
    const addProject = () => {
      const section = document.getElementById("projects");
      if (!section || section.querySelector("[data-midnight-city-racing]")) return;

      const grid = Array.from(section.querySelectorAll<HTMLElement>("div.grid.gap-6")).find((node) =>
        node.querySelector("article")
      );
      if (!grid) return;

      const article = document.createElement("article");
      article.setAttribute("data-midnight-city-racing", "true");
      article.className =
        "group overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-violet-400/40";
      article.innerHTML = `
        <div class="flex aspect-[16/9] items-center justify-center border-b border-white/10 bg-gradient-to-br from-violet-950/70 via-slate-950 to-cyan-950/60">
          <div class="text-center">
            <div class="text-6xl" aria-hidden="true">🏎️</div>
            <p class="mt-3 text-xs font-black uppercase tracking-[0.16em] text-violet-300">CITY RACING</p>
          </div>
        </div>
        <div class="p-6">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="text-xs font-black uppercase tracking-[0.15em] text-cyan-300">Game Development</p>
            <span class="rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-300">Live</span>
          </div>
          <h3 class="mt-3 text-2xl font-black tracking-[-0.03em]">Midnight City Racing</h3>
          <p class="mt-3 leading-7 text-muted-foreground">A browser-based city racing project published on GitHub Pages.</p>

          <div class="mt-5 flex flex-wrap items-center gap-2">
            <span class="rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06] px-2 py-1 text-[10px] font-black text-cyan-200">Web Game</span>
            <span class="text-xs text-slate-600">→</span>
            <span class="rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06] px-2 py-1 text-[10px] font-black text-cyan-200">Racing</span>
            <span class="text-xs text-slate-600">→</span>
            <span class="rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06] px-2 py-1 text-[10px] font-black text-cyan-200">GitHub Pages</span>
          </div>

          <div class="mt-5 space-y-2 border-t border-white/10 pt-5">
            <div class="rounded-xl bg-slate-950/40 p-3"><b class="text-[10px] uppercase tracking-[0.12em] text-violet-300">Project</b><p class="mt-1 text-xs leading-5 text-slate-400">An interactive racing experience that visitors can open and play directly in the browser.</p></div>
            <div class="rounded-xl bg-slate-950/40 p-3"><b class="text-[10px] uppercase tracking-[0.12em] text-cyan-300">Published</b><p class="mt-1 text-xs leading-5 text-slate-400">Hosted separately on GitHub Pages so it stays independent from the main portfolio deployment.</p></div>
            <div class="rounded-xl bg-slate-950/40 p-3"><b class="text-[10px] uppercase tracking-[0.12em] text-emerald-300">Access</b><p class="mt-1 text-xs leading-5 text-slate-400">The live project opens in a new tab from the portfolio.</p></div>
          </div>

          <div class="mt-5 flex flex-wrap gap-2">
            <span class="skill-chip">Browser Game</span>
            <span class="skill-chip">Racing</span>
            <span class="skill-chip">GitHub Pages</span>
          </div>
          <a href="https://arunyadav-214.github.io/midnight-city-racing/" target="_blank" rel="noreferrer" class="mt-6 inline-flex items-center gap-2 font-black text-violet-300 hover:text-cyan-300">
            Play project <span aria-hidden="true">↗</span>
          </a>
        </div>
      `;

      grid.appendChild(article);

      document.querySelectorAll<HTMLElement>("#explore div").forEach((node) => {
        const label = node.querySelector("span");
        const value = node.querySelector("strong");
        if (label?.textContent?.trim() === "Featured projects" && value?.textContent?.trim() === "3") {
          value.textContent = "4";
        }
      });
    };

    addProject();
    const observer = new MutationObserver(addProject);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
