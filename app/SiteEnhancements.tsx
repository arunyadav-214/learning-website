"use client";

import { useEffect } from "react";

const certificateLinks = [
  ["Learning C++ (2018)", "/certificates/learning-cpp-2018"],
  ["Basic Measurement 101", "/certificates/basic-measurement-101"],
  ["Basics of Tolerance 121", "/certificates/basics-of-tolerance-121"],
  ["Interpreting Prints 231", "/certificates/interpreting-prints-231"],
  ["Introduction to Physical Properties 101", "/certificates/introduction-to-physical-properties-101"],
  ["Types of Prints & Engineering Drawings 132", "/certificates/types-of-prints-engineering-drawings-132"],
] as const;

const researchLinks = [
  [
    "Application of Machine Learning in Sports Analytics",
    "/research/machine-learning-sports-analytics",
  ],
] as const;

const projectLinks = [
  ["Parking Garage PLC Project", "/projects/parking-garage-plc"],
] as const;

const logisimDownload =
  "https://github.com/logisim-evolution/logisim-evolution/releases/download/v4.1.0/logisim-evolution-4.1.0-all.jar";

function removeEmptyState(card: HTMLElement) {
  const hasRealContent = !!card.querySelector(
    '.showcase-play-link, [data-showcase-content="true"]'
  );

  if (!hasRealContent) return;

  card.querySelectorAll(".showcase-status").forEach((node) => node.remove());
  card.querySelectorAll(".showcase-placeholder").forEach((node) => node.remove());
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

  const hourPart = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    hourCycle: "h23",
  })
    .formatToParts(now)
    .find((part) => part.type === "hour")?.value;

  const hour = Number(hourPart ?? 0);
  const isDay = hour >= 6 && hour < 18;
  const icon = isDay ? "☀️" : "🌙";

  return { time, date, icon };
}

function updateWorldClocks() {
  const usa = formatClock("America/Chicago");
  const nepal = formatClock("Asia/Kathmandu");

  const usaTime = document.querySelector<HTMLElement>("[data-clock='usa-time']");
  const usaDate = document.querySelector<HTMLElement>("[data-clock='usa-date']");
  const usaIcon = document.querySelector<HTMLElement>("[data-clock='usa-icon']");
  const nepalTime = document.querySelector<HTMLElement>("[data-clock='nepal-time']");
  const nepalDate = document.querySelector<HTMLElement>("[data-clock='nepal-date']");
  const nepalIcon = document.querySelector<HTMLElement>("[data-clock='nepal-icon']");

  if (usaTime) usaTime.textContent = usa.time;
  if (usaDate) usaDate.textContent = usa.date;
  if (usaIcon) usaIcon.textContent = usa.icon;
  if (nepalTime) nepalTime.textContent = nepal.time;
  if (nepalDate) nepalDate.textContent = nepal.date;
  if (nepalIcon) nepalIcon.textContent = nepal.icon;
}

function ensureWorldClocks() {
  const nav = document.querySelector<HTMLElement>(".glass-nav .header-showcase-links");
  if (!nav || document.querySelector(".header-world-clocks")) return;

  if (!document.getElementById("world-clock-styles")) {
    const style = document.createElement("style");
    style.id = "world-clock-styles";
    style.textContent = `
      .header-right-stack {
        margin-left: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: .55rem;
      }
      .header-right-stack .header-showcase-links { margin-left: 0; }
      .header-world-clocks {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-items: center;
        gap: .55rem;
        width: 100%;
      }
      .header-clock-card {
        min-width: 156px;
        padding: .5rem .7rem;
        border-radius: .78rem;
        border: 1px solid rgba(34,197,94,.38);
        background: rgba(34,197,94,.09);
        text-align: center;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.035), 0 0 20px rgba(34,197,94,.10);
      }
      .header-clock-country {
        display: block;
        margin-bottom: .14rem;
        color: #86efac;
        font-size: .64rem;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      .header-clock-main {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .35rem;
      }
      .header-clock-icon {
        font-size: 1rem;
        line-height: 1;
      }
      .header-clock-time {
        display: block;
        color: #22c55e;
        font-size: .95rem;
        font-weight: 950;
        line-height: 1.1;
        font-variant-numeric: tabular-nums;
        text-shadow: 0 0 18px rgba(34,197,94,.24);
      }
      .header-clock-date {
        display: block;
        margin-top: .18rem;
        color: #4ade80;
        font-size: .62rem;
        font-weight: 750;
      }
      @media (max-width: 820px) {
        .header-right-stack {
          width: 100%;
          margin-left: 0;
          align-items: stretch;
        }
        .header-world-clocks {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: .45rem;
        }
        .header-clock-card { min-width: 0; }
        .header-clock-time { font-size: .84rem; }
      }
      @media (max-width: 390px) {
        .header-clock-card { padding: .45rem .4rem; }
        .header-clock-country { font-size: .56rem; }
        .header-clock-time { font-size: .76rem; }
        .header-clock-date { font-size: .56rem; }
        .header-clock-icon { font-size: .9rem; }
      }
    `;
    document.head.appendChild(style);
  }

  const stack = document.createElement("div");
  stack.className = "header-right-stack";
  nav.parentElement?.insertBefore(stack, nav);
  stack.appendChild(nav);

  const clocks = document.createElement("div");
  clocks.className = "header-world-clocks";
  clocks.setAttribute("aria-label", "Current time in Nepal and America");
  clocks.innerHTML = `
    <div class="header-clock-card">
      <span class="header-clock-country">🇳🇵 Nepal</span>
      <div class="header-clock-main">
        <span class="header-clock-icon" data-clock="nepal-icon" aria-hidden="true"></span>
        <strong class="header-clock-time" data-clock="nepal-time"></strong>
      </div>
      <span class="header-clock-date" data-clock="nepal-date"></span>
    </div>
    <div class="header-clock-card">
      <span class="header-clock-country">🇺🇸 America</span>
      <div class="header-clock-main">
        <span class="header-clock-icon" data-clock="usa-icon" aria-hidden="true"></span>
        <strong class="header-clock-time" data-clock="usa-time"></strong>
      </div>
      <span class="header-clock-date" data-clock="usa-date"></span>
    </div>
  `;
  stack.appendChild(clocks);
  updateWorldClocks();
}

function ensureAppsSection() {
  const nav = document.querySelector<HTMLElement>(".header-showcase-links");
  if (nav && !nav.querySelector('a[href="#apps"]')) {
    const appLink = document.createElement("a");
    appLink.href = "#apps";
    appLink.className = "header-showcase-link";
    appLink.textContent = "Apps";

    const videosLink = nav.querySelector('a[href="#videos"]');
    if (videosLink) nav.insertBefore(appLink, videosLink);
    else nav.appendChild(appLink);
  }

  if (document.getElementById("apps")) return;

  const videos = document.getElementById("videos");
  if (!videos?.parentElement) return;

  if (!document.getElementById("apps-section-styles")) {
    const style = document.createElement("style");
    style.id = "apps-section-styles";
    style.textContent = `
      .apps-section-shell {
        border-top: 1px solid rgba(255,255,255,.08);
        border-bottom: 1px solid rgba(255,255,255,.08);
        background: rgba(255,255,255,.015);
      }
      .apps-section-wrap {
        max-width: 80rem;
        margin: 0 auto;
        padding: 5rem 1.25rem;
      }
      .apps-kicker {
        color: #67e8f9;
        font-size: .76rem;
        font-weight: 900;
        letter-spacing: .16em;
      }
      .apps-title {
        margin-top: .8rem;
        color: #f8fafc;
        font-size: clamp(2rem, 4vw, 3.4rem);
        line-height: 1.05;
        font-weight: 950;
        letter-spacing: -.04em;
      }
      .apps-intro {
        max-width: 44rem;
        margin-top: 1rem;
        color: #94a3b8;
        font-size: 1.05rem;
        line-height: 1.8;
      }
      .app-card {
        margin-top: 2.2rem;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 1.25rem;
        padding: 1.35rem;
        border: 1px solid rgba(255,255,255,.10);
        border-radius: 1.5rem;
        background: linear-gradient(135deg, rgba(15,23,42,.88), rgba(8,47,73,.45));
      }
      .app-icon-box {
        display: grid;
        width: 4.5rem;
        height: 4.5rem;
        place-items: center;
        border-radius: 1.15rem;
        background: rgba(34,197,94,.11);
        border: 1px solid rgba(34,197,94,.30);
        font-size: 2rem;
      }
      .app-name {
        color: #f8fafc;
        font-size: 1.35rem;
        font-weight: 950;
      }
      .app-version {
        margin-top: .2rem;
        color: #4ade80;
        font-size: .8rem;
        font-weight: 850;
        letter-spacing: .06em;
      }
      .app-description {
        max-width: 44rem;
        margin-top: .55rem;
        color: #94a3b8;
        line-height: 1.65;
      }
      .app-tags {
        display: flex;
        flex-wrap: wrap;
        gap: .45rem;
        margin-top: .75rem;
      }
      .app-tag {
        padding: .32rem .58rem;
        border: 1px solid rgba(255,255,255,.10);
        border-radius: 999px;
        color: #cbd5e1;
        background: rgba(255,255,255,.035);
        font-size: .72rem;
        font-weight: 800;
      }
      .app-download {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 10rem;
        padding: .85rem 1rem;
        border-radius: .9rem;
        background: #22c55e;
        color: #052e16;
        font-weight: 950;
        text-decoration: none;
        transition: transform .18s ease, background .18s ease;
      }
      .app-download:hover {
        transform: translateY(-2px);
        background: #4ade80;
      }
      .app-note {
        margin-top: .8rem;
        color: #64748b;
        font-size: .76rem;
      }
      @media (min-width: 640px) {
        .apps-section-wrap { padding-left: 2rem; padding-right: 2rem; }
      }
      @media (max-width: 760px) {
        .app-card { grid-template-columns: auto 1fr; }
        .app-download { grid-column: 1 / -1; width: 100%; }
      }
    `;
    document.head.appendChild(style);
  }

  const section = document.createElement("section");
  section.id = "apps";
  section.className = "apps-section-shell";
  section.innerHTML = `
    <div class="apps-section-wrap">
      <p class="apps-kicker">APPS</p>
      <h2 class="apps-title">Useful software I use for learning and projects.</h2>
      <p class="apps-intro">A growing collection of tools connected to my computer science and engineering coursework.</p>

      <article class="app-card">
        <div class="app-icon-box" aria-hidden="true">⚙️</div>
        <div>
          <h3 class="app-name">Logisim Evolution</h3>
          <p class="app-version">Version 4.1.0 · Java JAR</p>
          <p class="app-description">Digital logic design and simulation software used for building, testing, and studying circuits in computer architecture and digital-logic work.</p>
          <div class="app-tags">
            <span class="app-tag">Digital Logic</span>
            <span class="app-tag">Circuit Simulation</span>
            <span class="app-tag">Computer Architecture</span>
            <span class="app-tag">Java</span>
          </div>
          <p class="app-note">Requires a compatible Java runtime. The download is the official Logisim Evolution 4.1.0 JAR.</p>
        </div>
        <a class="app-download" href="${logisimDownload}" target="_blank" rel="noreferrer">Download App ↗</a>
      </article>
    </div>
  `;

  videos.parentElement.insertBefore(section, videos);
}

export default function SiteEnhancements() {
  useEffect(() => {
    const enhance = () => {
      ensureWorldClocks();
      ensureAppsSection();

      document.querySelectorAll<HTMLElement>(".showcase-card").forEach((card) => {
        const title = card.querySelector(".showcase-title")?.textContent?.trim();

        removeEmptyState(card);

        if (title === "Certificates") {
          let list = card.querySelector<HTMLElement>(".showcase-certificate-links");
          if (!list) {
            list = document.createElement("div");
            list.className = "showcase-game-links showcase-certificate-links";
            list.setAttribute("data-showcase-content", "true");

            const existing = card.querySelector(".showcase-play-link");
            if (existing) {
              existing.parentElement?.insertBefore(list, existing);
              list.appendChild(existing);
            } else {
              card.appendChild(list);
            }
          }

          certificateLinks.forEach(([label, href]) => {
            if (list?.querySelector(`a[href="${href}"]`)) return;
            const link = document.createElement("a");
            link.href = href;
            link.className = "showcase-play-link";
            link.innerHTML = `<span>View ${label}</span><span aria-hidden="true">↗</span>`;
            list?.appendChild(link);
          });
        }

        if (title === "Research Papers") {
          let list = card.querySelector<HTMLElement>(".showcase-research-links");
          if (!list) {
            list = document.createElement("div");
            list.className = "showcase-game-links showcase-research-links";
            list.setAttribute("data-showcase-content", "true");
            card.appendChild(list);
          }

          researchLinks.forEach(([label, href]) => {
            if (list?.querySelector(`a[href="${href}"]`)) return;
            const link = document.createElement("a");
            link.href = href;
            link.className = "showcase-play-link";
            link.innerHTML = `<span>View ${label}</span><span aria-hidden="true">↗</span>`;
            list?.appendChild(link);
          });
        }

        if (title === "Projects") {
          let list = card.querySelector<HTMLElement>(".showcase-project-links");
          if (!list) {
            list = document.createElement("div");
            list.className = "showcase-game-links showcase-project-links";
            list.setAttribute("data-showcase-content", "true");
            card.appendChild(list);
          }

          projectLinks.forEach(([label, href]) => {
            if (list?.querySelector(`a[href="${href}"]`)) return;
            const link = document.createElement("a");
            link.href = href;
            link.className = "showcase-play-link";
            link.innerHTML = `<span>View ${label}</span><span aria-hidden="true">↗</span>`;
            list?.appendChild(link);
          });
        }

        removeEmptyState(card);
      });
    };

    enhance();
    const observer = new MutationObserver(enhance);
    observer.observe(document.body, { childList: true, subtree: true });
    const timer = window.setInterval(updateWorldClocks, 30000);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return null;
}
