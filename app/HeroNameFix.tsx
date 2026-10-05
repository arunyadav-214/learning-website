"use client";

import { useEffect } from "react";

export default function HeroNameFix() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero-title");
    if (!hero) return;

    hero.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.includes("Arun K. Yadav")) {
        node.textContent = "";
      }
    });
  }, []);

  return null;
}
