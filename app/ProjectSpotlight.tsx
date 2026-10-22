"use client";

import { useEffect } from "react";

export default function ProjectSpotlight() {
  useEffect(() => {
    const install = () => {
      if (document.getElementById("featured-spotlight")) return;
      const projects = document.getElementById("projects");
      if (!projects?.parentElement) return;

      if (!document.getElementById("project-spotlight-styles")) {
        const style = document.createElement("style");
        style.id = "project-spotlight-styles";
        style.textContent = `
          .ps-wrap{max-width:80rem;margin:0 auto;padding:5rem 1.25rem}
          .ps-card{display:grid;overflow:hidden;border-radius:1.7rem;border:1px solid rgba(167,139,250,.2);background:linear-gradient(135deg,rgba(76,29,149,.13),rgba(2,6,23,.72) 48%,rgba(8,145,178,.1));box-shadow:inset 0 1px rgba(255,255,255,.04)}
          .ps-media{position:relative;min-height:18rem;background:#020617;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.08)}
          .ps-media img{width:100%;height:100%;min-height:18rem;object-fit:cover;transition:transform .35s ease}.ps-card:hover .ps-media img{transform:scale(1.018)}
          .ps-badge{position:absolute;left:1rem;top:1rem;padding:.42rem .62rem;border-radius:999px;border:1px solid rgba(34,211,238,.28);background:rgba(2,6,23,.8);backdrop-filter:blur(8px);font-size:.66rem;font-weight:950;letter-spacing:.12em;color:#a5f3fc;text-transform:uppercase}
          .ps-copy{padding:1.5rem}.ps-kicker{font-size:.7rem;font-weight:950;letter-spacing:.16em;color:#c4b5fd;text-transform:uppercase}.ps-title{margin-top:.7rem;font-size:clamp(1.8rem,3vw,2.8rem);line-height:1.06;font-weight:950;letter-spacing:-.04em;color:#f8fafc}.ps-text{margin-top:.9rem;color:#94a3b8;line-height:1.7}.ps-stack{display:flex;flex-wrap:wrap;align-items:center;gap:.42rem;margin-top:1.2rem}.ps-node{padding:.38rem .55rem;border-radius:.58rem;border:1px solid rgba(34,211,238,.18);background:rgba(8,145,178,.07);font-size:.68rem;font-weight:900;color:#a5f3fc}.ps-arrow{font-size:.65rem;color:#475569}.ps-actions{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1.35rem}.ps-primary,.ps-secondary{display:inline-flex;align-items:center;gap:.45rem;padding:.72rem .9rem;border-radius:.8rem;font-size:.78rem;font-weight:950;text-decoration:none;transition:.2s ease}.ps-primary{background:linear-gradient(135deg,#7c3aed,#0891b2);color:white}.ps-secondary{border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.035);color:#cbd5e1}.ps-primary:hover,.ps-secondary:hover{transform:translateY(-1px)}
          @media(min-width:900px){.ps-wrap{padding-left:2rem;padding-right:2rem}.ps-card{grid-template-columns:1.08fr .92fr}.ps-media{min-height:25rem;border-bottom:0;border-right:1px solid rgba(255,255,255,.08)}.ps-media img{min-height:25rem}.ps-copy{padding:2.3rem;display:flex;flex-direction:column;justify-content:center}}
        `;
        document.head.appendChild(style);
      }

      const section = document.createElement("section");
      section.id = "featured-spotlight";
      section.innerHTML = `
        <div class="ps-wrap">
          <article class="ps-card">
            <div class="ps-media">
              <img src="/projects/parking-garage-plc-preview.svg" alt="Parking Garage PLC project preview" />
              <span class="ps-badge">Featured project spotlight</span>
            </div>
            <div class="ps-copy">
              <p class="ps-kicker">Engineering + Automation</p>
              <h2 class="ps-title">Parking Garage PLC Project</h2>
              <p class="ps-text">A hands-on automation project built in Do-more Designer and configured for DM-SIM. It brings together PLC thinking, ladder logic, simulation, testing, and practical engineering workflow.</p>
              <div class="ps-stack" aria-label="Project technology flow">
                <span class="ps-node">PLC</span><span class="ps-arrow">→</span><span class="ps-node">Ladder Logic</span><span class="ps-arrow">→</span><span class="ps-node">DM-SIM</span><span class="ps-arrow">→</span><span class="ps-node">Testing</span>
              </div>
              <div class="ps-actions">
                <a class="ps-primary" href="/projects/parking-garage-plc">Explore project <span aria-hidden="true">↗</span></a>
                <a class="ps-secondary" href="#projects">View all projects</a>
              </div>
            </div>
          </article>
        </div>`;

      projects.parentElement.insertBefore(section, projects);
    };

    install();
    const retry = window.setTimeout(install, 400);
    return () => window.clearTimeout(retry);
  }, []);

  return null;
}
