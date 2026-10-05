"use client";

import { useEffect } from "react";

const contentSections: Record<string, { href: string; label: string }[]> = {
  "research-papers": [
    {
      href: "/research/machine-learning-sports-analytics",
      label: "View Machine Learning in Sports Analytics",
    },
  ],
  certificates: [
    { href: "/certificates/blueprint-reading-131", label: "View Blueprint Reading 131" },
    { href: "/certificates/basic-measurement-101", label: "View Basic Measurement 101" },
    { href: "/certificates/basics-of-tolerance-121", label: "View Basics of Tolerance 121" },
    { href: "/certificates/interpreting-prints-231", label: "View Interpreting Prints 231" },
    { href: "/certificates/introduction-to-physical-properties-101", label: "View Introduction to Physical Properties 101" },
    { href: "/certificates/types-of-prints-engineering-drawings-132", label: "View Types of Prints & Engineering Drawings 132" },
  ],
};

export default function SiteContentEnhancements() {
  useEffect(() => {
    Object.entries(contentSections).forEach(([id, links]) => {
      const section = document.getElementById(id);
      if (!section) return;

      section.querySelectorAll(".showcase-status").forEach((node) => node.remove());

      let linkWrap = section.querySelector(".showcase-extra-links") as HTMLDivElement | null;
      if (!linkWrap) {
        linkWrap = document.createElement("div");
        linkWrap.className = "showcase-game-links showcase-extra-links";
        section.appendChild(linkWrap);
      }

      links.forEach(({ href, label }) => {
        if (linkWrap?.querySelector(`a[href="${href}"]`)) return;
        const link = document.createElement("a");
        link.href = href;
        link.className = "showcase-play-link";
        link.innerHTML = `<span>${label}</span><span aria-hidden="true">↗</span>`;
        linkWrap?.appendChild(link);
      });
    });

    document.querySelectorAll(".showcase-card").forEach((card) => {
      if (card.querySelector(".showcase-play-link")) {
        card.querySelectorAll(".showcase-status").forEach((node) => node.remove());
      }
    });
  }, []);

  return null;
}
