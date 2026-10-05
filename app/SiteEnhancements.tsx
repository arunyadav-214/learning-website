"use client";

import { useEffect } from "react";

const certificateLinks = [
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

  return { time, date };
}

function updateWorldClocks() {
  const usa = formatClock("America/Chicago");
  const nepal = formatClock("Asia/Kathmandu");

  const usaTime = document.querySelector<HTMLElement>("[data-clock='usa-time']");
  const usaDate = document.querySelector<HTMLElement>("[data-clock='usa-date']");
  const nepalTime = document.querySelector<HTMLElement>("[data-clock='nepal-time']");
  const nepalDate = document.querySelector<HTMLElement>("[data-clock='nepal-date']");

  if (usaTime) usaTime.textContent = usa.time;
  if (usaDate) usaDate.textContent = usa.date;
  if (nepalTime) nepalTime.textContent = nepal.time;
  if (nepalDate) nepalDate.textContent = nepal.date;
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
        border: 1px solid rgba(239,68,68,.35);
        background: rgba(239,68,68,.08);
        text-align: center;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.035), 0 0 20px rgba(239,68,68,.08);
      }
      .header-clock-country {
        display: block;
        margin-bottom: .14rem;
        color: #fca5a5;
        font-size: .64rem;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      .header-clock-time {
        display: block;
        color: #ef4444;
        font-size: .95rem;
        font-weight: 950;
        line-height: 1.1;
        font-variant-numeric: tabular-nums;
        text-shadow: 0 0 18px rgba(239,68,68,.22);
      }
      .header-clock-date {
        display: block;
        margin-top: .18rem;
        color: #f87171;
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
  clocks.setAttribute("aria-label", "Current time in the US and Nepal");
  clocks.innerHTML = `
    <div class="header-clock-card">
      <span class="header-clock-country">🇺🇸 US</span>
      <strong class="header-clock-time" data-clock="usa-time"></strong>
      <span class="header-clock-date" data-clock="usa-date"></span>
    </div>
    <div class="header-clock-card">
      <span class="header-clock-country">🇳🇵 Nepal</span>
      <strong class="header-clock-time" data-clock="nepal-time"></strong>
      <span class="header-clock-date" data-clock="nepal-date"></span>
    </div>
  `;
  stack.appendChild(clocks);
  updateWorldClocks();
}

export default function SiteEnhancements() {
  useEffect(() => {
    const enhance = () => {
      ensureWorldClocks();

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
