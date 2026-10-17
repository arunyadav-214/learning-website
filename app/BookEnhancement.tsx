"use client";

import { useEffect } from "react";

export default function BookEnhancement() {
  useEffect(() => {
    const ensureBooks = () => {
      const nav = document.querySelector<HTMLElement>(".header-showcase-links");
      if (nav && !nav.querySelector('a[href="#books"]')) {
        const link = document.createElement("a");
        link.href = "#books";
        link.className = "header-showcase-link";
        link.textContent = "Books";

        const resumeLink = nav.querySelector('a[href="/resume"]');
        if (resumeLink) nav.insertBefore(link, resumeLink);
        else nav.appendChild(link);
      }

      if (document.getElementById("books")) return;

      const resumeSection = document.getElementById("resume");
      const footer = document.querySelector("footer");
      const anchor = resumeSection ?? footer;
      if (!anchor?.parentElement) return;

      const section = document.createElement("section");
      section.id = "books";
      section.className = "border-y border-border/70 bg-white/[0.015]";
      section.innerHTML = `
        <div class="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <p class="section-kicker">BOOKS</p>
          <h2 class="section-title font-heading">Books & learning resources.</h2>
          <p class="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            A growing collection of books and study resources I use for computer science, engineering, programming, and professional growth.
          </p>

          <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://codehiddenlanguage.com/"
              target="_blank"
              rel="noreferrer"
              class="group rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-violet-400/40"
            >
              <div class="grid h-12 w-12 place-items-center rounded-xl bg-violet-500/10 text-2xl" aria-hidden="true">📘</div>
              <p class="mt-5 text-xs font-black uppercase tracking-[0.15em] text-violet-300">Learning Resource</p>
              <h3 class="mt-3 text-xl font-black">Code Hidden Language</h3>
              <p class="mt-3 leading-7 text-muted-foreground">
                A coding and learning resource saved in my book library for quick access.
              </p>
              <span class="mt-6 inline-flex items-center gap-2 font-black text-cyan-300 group-hover:text-violet-300">
                Open resource <span aria-hidden="true">↗</span>
              </span>
            </a>
          </div>
        </div>
      `;

      anchor.parentElement.insertBefore(section, anchor);
    };

    ensureBooks();
    const observer = new MutationObserver(ensureBooks);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
