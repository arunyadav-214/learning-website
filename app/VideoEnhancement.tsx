"use client";

import { useEffect } from "react";

export default function VideoEnhancement() {
  useEffect(() => {
    const enhanceVideoSection = () => {
      const section = document.getElementById("videos");
      if (!section || section.querySelector('[data-uploaded-video="img-8106"]')) return;

      const card = section.querySelector<HTMLElement>(".rounded-[1.6rem]");
      if (!card) return;

      card.innerHTML = `
        <div data-uploaded-video="img-8106" class="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p class="section-kicker">VIDEOS</p>
            <h2 class="mt-3 text-3xl font-black tracking-[-0.03em]">Project demos & walkthroughs</h2>
            <p class="mt-4 max-w-2xl leading-7 text-muted-foreground">
              A collection of my project videos, demonstrations, presentations, and walkthroughs.
            </p>
            <p class="mt-6 text-sm font-bold text-cyan-300">Featured video</p>
          </div>
          <div class="overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/40 p-3">
            <video
              class="mx-auto block max-h-[620px] w-auto max-w-full rounded-[1rem]"
              src="/videos/IMG_8106.mp4"
              controls
              playsinline
              preload="metadata"
              aria-label="Uploaded portfolio video"
            ></video>
          </div>
        </div>
      `;
    };

    enhanceVideoSection();
    const observer = new MutationObserver(enhanceVideoSection);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
