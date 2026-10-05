"use client";

import { useEffect } from "react";

const certificateLinks = [
  ["Basic Measurement 101", "/certificates/basic-measurement-101"],
  ["Basics of Tolerance 121", "/certificates/basics-of-tolerance-121"],
  ["Interpreting Prints 231", "/certificates/interpreting-prints-231"],
  ["Introduction to Physical Properties 101", "/certificates/introduction-to-physical-properties-101"],
  ["Types of Prints & Engineering Drawings 132", "/certificates/types-of-prints-engineering-drawings-132"],
] as const;

export default function SiteEnhancements() {
  useEffect(() => {
    const enhance = () => {
      document.querySelectorAll<HTMLElement>(".showcase-card").forEach((card) => {
        const title = card.querySelector(".showcase-title")?.textContent?.trim();
        const hasRealContent = !!card.querySelector(
          '.showcase-play-link, [data-showcase-content="true"]'
        );

        if (hasRealContent) {
          card.querySelector(".showcase-status")?.remove();
        }

        if (title !== "Certificates") return;

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

        card.querySelector(".showcase-status")?.remove();
      });
    };

    enhance();
    const observer = new MutationObserver(enhance);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
