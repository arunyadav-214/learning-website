"use client";

import { useEffect } from "react";

const projectDetails = [
  {
    title: "Parking Garage PLC Project",
    problem: "Model a practical parking-garage automation workflow in a PLC simulation environment.",
    built: "A Do-more Designer project configured for DM-SIM with ladder-logic simulation and a packaged project download.",
    learned: "How automation logic, simulation, testing, and project packaging connect in an engineering workflow.",
    flow: ["PLC", "Ladder Logic", "DM-SIM", "Testing"],
  },
  {
    title: "Application of Machine Learning in Sports Analytics",
    problem: "Understand where machine learning can support better decisions in sports.",
    built: "A research presentation connecting sports data, models, fatigue, performance prediction, and strategy.",
    learned: "Where machine learning is useful, where its limitations appear, and why human expertise still matters.",
    flow: ["Sports Data", "ML Models", "Predictions", "Decisions"],
  },
  {
    title: "Arun Learning Hub",
    problem: "Turn coursework, engineering work, games, research, and certificates into one professional home.",
    built: "A responsive portfolio that organizes projects, research, certificates, games, learning resources, and academic work.",
    learned: "How product design, frontend engineering, organization, and deployment fit together in a real website.",
    flow: ["Next.js", "React", "TypeScript", "Cloudflare"],
  },
] as const;

const commands = [
  { label: "Projects", hint: "Featured work & case studies", target: "#projects", icon: "01" },
  { label: "Research", hint: "Machine learning in sports analytics", target: "#research-papers", icon: "02" },
  { label: "Games", hint: "Open the game arcade", target: "#games", icon: "03" },
  { label: "Certificates", hint: "Training & achievements", target: "#certificates", icon: "04" },
  { label: "Books", hint: "Books & learning resources", target: "#books", icon: "05" },
  { label: "Journey", hint: "Nepal → USA timeline", target: "#journey", icon: "06" },
  { label: "Skills", hint: "Technical toolkit", target: "#skills", icon: "07" },
  { label: "Resume", hint: "Education, skills & projects", target: "/resume", icon: "08" },
] as const;

function installStyles() {
  if (document.getElementById("portfolio-experience-styles")) return;

  const style = document.createElement("style");
  style.id = "portfolio-experience-styles";
  style.textContent = `
    .pe-command-link {
      display:inline-flex;align-items:center;gap:.45rem;padding:.45rem .65rem;border-radius:.7rem;
      border:1px solid rgba(34,211,238,.26);background:rgba(34,211,238,.07);color:#a5f3fc;
      font-size:.72rem;font-weight:900;letter-spacing:.04em;transition:.2s ease;white-space:nowrap
    }
    .pe-command-link:hover{transform:translateY(-1px);border-color:rgba(167,139,250,.55);color:#ddd6fe;background:rgba(139,92,246,.1)}
    .pe-shell{position:relative;overflow:hidden;border-top:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,rgba(15,23,42,.68),rgba(2,6,23,.5))}
    .pe-inner{max-width:80rem;margin:0 auto;padding:5.5rem 1.25rem}
    .pe-kicker{font-size:.73rem;font-weight:950;letter-spacing:.18em;text-transform:uppercase;color:#67e8f9}
    .pe-title{margin-top:.7rem;font-size:clamp(2rem,4vw,3.6rem);line-height:1.02;font-weight:950;letter-spacing:-.045em;color:#f8fafc}
    .pe-subtitle{margin-top:1rem;max-width:48rem;color:#94a3b8;font-size:1.05rem;line-height:1.75}
    .pe-command-layout{display:grid;gap:1rem;margin-top:2.25rem}
    .pe-command-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.8rem}
    .pe-command-tile{display:flex;align-items:center;gap:.8rem;padding:1rem;border:1px solid rgba(255,255,255,.09);border-radius:1.05rem;background:rgba(255,255,255,.035);color:#e2e8f0;text-decoration:none;transition:.2s ease}
    .pe-command-tile:hover{transform:translateY(-2px);border-color:rgba(103,232,249,.36);background:linear-gradient(135deg,rgba(139,92,246,.09),rgba(34,211,238,.07))}
    .pe-command-no{display:grid;place-items:center;flex:0 0 auto;width:2.35rem;height:2.35rem;border-radius:.75rem;background:#0f172a;border:1px solid rgba(167,139,250,.2);font-size:.68rem;font-weight:950;color:#c4b5fd}
    .pe-command-copy strong{display:block;font-size:.92rem;color:#f8fafc}.pe-command-copy span{display:block;margin-top:.18rem;font-size:.73rem;color:#64748b}
    .pe-now{position:relative;min-height:100%;padding:1.35rem;border:1px solid rgba(52,211,153,.24);border-radius:1.25rem;background:linear-gradient(145deg,rgba(6,78,59,.16),rgba(15,23,42,.78));box-shadow:inset 0 1px rgba(255,255,255,.04)}
    .pe-live{display:inline-flex;align-items:center;gap:.5rem;font-size:.68rem;font-weight:950;letter-spacing:.13em;text-transform:uppercase;color:#86efac}.pe-live-dot{width:.5rem;height:.5rem;border-radius:99px;background:#22c55e;box-shadow:0 0 14px #22c55e;animation:pePulse 1.6s ease-in-out infinite}
    @keyframes pePulse{50%{opacity:.4;transform:scale(.82)}}
    .pe-now h3{margin-top:1rem;font-size:1.55rem;line-height:1.15;font-weight:950;letter-spacing:-.03em;color:#f8fafc}.pe-now p{margin-top:.75rem;color:#94a3b8;line-height:1.65}
    .pe-now-tags{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:1rem}.pe-tag{padding:.35rem .55rem;border-radius:999px;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.04);font-size:.68rem;font-weight:850;color:#cbd5e1}
    .pe-palette-trigger{margin-top:1.2rem;display:inline-flex;align-items:center;gap:.55rem;padding:.72rem .9rem;border-radius:.85rem;border:1px solid rgba(103,232,249,.25);background:rgba(8,145,178,.09);font-size:.78rem;font-weight:900;color:#a5f3fc;cursor:pointer}
    .pe-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.7rem;margin-top:1rem}.pe-stat{padding:.8rem;border:1px solid rgba(255,255,255,.07);border-radius:.9rem;background:rgba(2,6,23,.35)}.pe-stat strong{display:block;font-size:1.45rem;color:#fff}.pe-stat span{display:block;margin-top:.16rem;font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:#64748b;font-weight:850}
    .pe-journey{max-width:80rem;margin:0 auto;padding:5.5rem 1.25rem}.pe-route{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;margin-top:3rem}.pe-route:before{content:"";position:absolute;left:9%;right:9%;top:1.2rem;height:2px;background:linear-gradient(90deg,#22c55e,#22d3ee,#8b5cf6,#f59e0b);opacity:.75}.pe-node{position:relative;padding-top:3.1rem}.pe-dot{position:absolute;top:.65rem;left:50%;transform:translateX(-50%);width:1.1rem;height:1.1rem;border-radius:99px;background:#020617;border:3px solid #67e8f9;box-shadow:0 0 20px rgba(103,232,249,.35);z-index:1}.pe-node:first-child .pe-dot{border-color:#22c55e}.pe-node:last-child .pe-dot{border-color:#f59e0b}.pe-node-card{height:100%;padding:1rem;border-radius:1rem;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);text-align:center}.pe-node-card strong{display:block;color:#fff;font-size:.9rem}.pe-node-card span{display:block;margin-top:.4rem;color:#64748b;font-size:.75rem;line-height:1.5}
    .pe-project-detail{margin-top:1.25rem;padding-top:1.15rem;border-top:1px solid rgba(255,255,255,.08)}.pe-flow{display:flex;flex-wrap:wrap;align-items:center;gap:.38rem;margin-bottom:1rem}.pe-flow-node{padding:.35rem .5rem;border-radius:.55rem;background:rgba(8,145,178,.08);border:1px solid rgba(34,211,238,.17);font-size:.65rem;font-weight:900;color:#a5f3fc}.pe-flow-arrow{font-size:.65rem;color:#475569}.pe-case-grid{display:grid;gap:.55rem}.pe-case{padding:.65rem .72rem;border-radius:.75rem;background:rgba(2,6,23,.3);border:1px solid rgba(255,255,255,.06)}.pe-case b{display:block;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:#a78bfa}.pe-case span{display:block;margin-top:.28rem;font-size:.72rem;line-height:1.45;color:#94a3b8}
    #games.pe-arcade{position:relative}#games.pe-arcade:before{content:"ARCADE ONLINE";display:inline-flex;margin-bottom:1.2rem;padding:.38rem .6rem;border-radius:999px;border:1px solid rgba(34,197,94,.24);background:rgba(34,197,94,.07);font-size:.65rem;font-weight:950;letter-spacing:.13em;color:#86efac}#games.pe-arcade a{position:relative;overflow:hidden}#games.pe-arcade a:after{content:"";position:absolute;inset:auto -35% -70% -35%;height:80%;background:radial-gradient(circle,rgba(139,92,246,.16),transparent 70%);pointer-events:none}
    .pe-book-categories{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem}.pe-book-chip{padding:.38rem .65rem;border-radius:999px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.035);font-size:.7rem;font-weight:850;color:#cbd5e1}
    .pe-built-with{margin-top:1rem;display:flex;flex-wrap:wrap;align-items:center;gap:.45rem;color:#64748b;font-size:.73rem}.pe-built-with b{color:#cbd5e1}.pe-built-chip{padding:.28rem .45rem;border-radius:.5rem;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.025);color:#94a3b8;font-weight:800}
    .pe-palette{position:fixed;inset:0;z-index:9998;display:none;place-items:start center;padding:12vh 1rem 2rem;background:rgba(2,6,23,.72);backdrop-filter:blur(16px)}.pe-palette.pe-open{display:grid}.pe-palette-card{width:min(42rem,100%);overflow:hidden;border-radius:1.2rem;border:1px solid rgba(167,139,250,.25);background:#07101f;box-shadow:0 30px 90px rgba(0,0,0,.55)}.pe-search-wrap{display:flex;align-items:center;gap:.7rem;padding:1rem 1.1rem;border-bottom:1px solid rgba(255,255,255,.08)}.pe-search-icon{font-size:1rem;color:#67e8f9}.pe-search{width:100%;border:0;outline:0;background:transparent;color:#fff;font:inherit;font-size:1rem}.pe-search::placeholder{color:#475569}.pe-results{padding:.55rem;max-height:24rem;overflow:auto}.pe-result{width:100%;display:flex;align-items:center;gap:.85rem;padding:.75rem;border:0;border-radius:.8rem;background:transparent;color:#e2e8f0;text-align:left;cursor:pointer}.pe-result:hover,.pe-result.pe-active{background:rgba(139,92,246,.1)}.pe-result-code{display:grid;place-items:center;width:2.2rem;height:2.2rem;border-radius:.65rem;background:#0f172a;color:#a5b4fc;font-size:.65rem;font-weight:950}.pe-result strong{display:block;font-size:.86rem}.pe-result span{display:block;margin-top:.15rem;color:#64748b;font-size:.72rem}.pe-palette-foot{display:flex;justify-content:space-between;gap:1rem;padding:.72rem 1rem;border-top:1px solid rgba(255,255,255,.07);font-size:.67rem;color:#475569}.pe-key{padding:.15rem .35rem;border-radius:.35rem;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.04);color:#94a3b8;font-weight:850}
    .pe-terminal-overlay{position:fixed;inset:0;z-index:10000;display:none;place-items:center;padding:1rem;background:rgba(0,8,5,.92);backdrop-filter:blur(9px)}.pe-terminal-overlay.pe-show{display:grid}.pe-terminal-card{width:min(46rem,100%);padding:1.5rem;border:1px solid rgba(34,197,94,.36);border-radius:1rem;background:#010704;box-shadow:0 0 70px rgba(34,197,94,.16);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:#86efac}.pe-terminal-line{margin:.42rem 0;opacity:0;animation:peType .25s forwards}.pe-terminal-line:nth-child(2){animation-delay:.35s}.pe-terminal-line:nth-child(3){animation-delay:.75s}.pe-terminal-line:nth-child(4){animation-delay:1.15s}@keyframes peType{to{opacity:1}}.pe-terminal-mode main{filter:saturate(.8) hue-rotate(55deg)}
    @media(min-width:900px){.pe-command-layout{grid-template-columns:1.35fr .65fr}.pe-command-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.pe-case-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.pe-inner,.pe-journey{padding-left:2rem;padding-right:2rem}}
    @media(max-width:700px){.pe-inner,.pe-journey{padding-top:4rem;padding-bottom:4rem}.pe-route{grid-template-columns:1fr}.pe-route:before{left:1.15rem;top:1rem;bottom:1rem;right:auto;width:2px;height:auto}.pe-node{padding-top:0;padding-left:3rem}.pe-dot{left:.65rem;top:1.2rem;transform:none}.pe-node-card{text-align:left}.pe-command-grid{grid-template-columns:1fr}.pe-palette{padding-top:8vh}}
  `;
  document.head.appendChild(style);
}

function buildCommandCenter() {
  if (document.getElementById("command-center")) return;
  const projects = document.getElementById("projects");
  if (!projects?.parentElement) return;

  const section = document.createElement("section");
  section.id = "command-center";
  section.className = "pe-shell";
  section.innerHTML = `
    <div class="pe-inner">
      <p class="pe-kicker">PORTFOLIO COMMAND CENTER</p>
      <h2 class="pe-title">What do you want to explore?</h2>
      <p class="pe-subtitle">Jump into the part of the portfolio that matters to you, or open the command palette with <strong style="color:#e2e8f0">Ctrl + K</strong>.</p>
      <div class="pe-command-layout">
        <div class="pe-command-grid">
          ${commands.slice(0, 6).map((item) => `
            <a class="pe-command-tile" href="${item.target}">
              <span class="pe-command-no">${item.icon}</span>
              <span class="pe-command-copy"><strong>${item.label}</strong><span>${item.hint}</span></span>
            </a>`).join("")}
        </div>
        <aside class="pe-now">
          <span class="pe-live"><span class="pe-live-dot"></span>Now building</span>
          <h3>Cybersecurity chatbot + portfolio systems</h3>
          <p>Exploring a personal chatbot that can work with supplied cybersecurity knowledge while continuing to improve this portfolio as a living technical project.</p>
          <div class="pe-now-tags"><span class="pe-tag">Cybersecurity</span><span class="pe-tag">AI</span><span class="pe-tag">Knowledge</span><span class="pe-tag">Web</span></div>
          <button class="pe-palette-trigger" type="button" data-open-command>⌨ Open command palette</button>
          <div class="pe-stats">
            <div class="pe-stat"><strong>3</strong><span>Featured projects</span></div>
            <div class="pe-stat"><strong>7</strong><span>Certificates</span></div>
            <div class="pe-stat"><strong>6</strong><span>Playable games</span></div>
            <div class="pe-stat"><strong>1</strong><span>Research feature</span></div>
          </div>
        </aside>
      </div>
    </div>`;

  projects.parentElement.insertBefore(section, projects);
}

function buildJourney() {
  if (document.getElementById("journey")) return;
  const skills = document.getElementById("skills");
  if (!skills?.parentElement) return;

  const section = document.createElement("section");
  section.id = "journey";
  section.innerHTML = `
    <div class="pe-journey">
      <p class="pe-kicker">MY JOURNEY</p>
      <h2 class="pe-title">Nepal 🇳🇵 → United States 🇺🇸</h2>
      <p class="pe-subtitle">A growing path shaped by computer science, applied engineering, hands-on projects, and continuous learning.</p>
      <div class="pe-route">
        <div class="pe-node"><span class="pe-dot"></span><div class="pe-node-card"><strong>🇳🇵 Nepal</strong><span>Roots, curiosity, and the start of the journey.</span></div></div>
        <div class="pe-node"><span class="pe-dot"></span><div class="pe-node-card"><strong>2025</strong><span>C++ training and deeper programming growth.</span></div></div>
        <div class="pe-node"><span class="pe-dot"></span><div class="pe-node-card"><strong>2026</strong><span>CS projects, PLC automation, research, certificates, and this portfolio.</span></div></div>
        <div class="pe-node"><span class="pe-dot"></span><div class="pe-node-card"><strong>2027</strong><span>Advanced coursework, internship goals, and graduation progress.</span></div></div>
      </div>
    </div>`;

  skills.parentElement.insertBefore(section, skills);
}

function enhanceProjects() {
  const cards = Array.from(document.querySelectorAll<HTMLElement>("#projects article"));
  cards.forEach((card) => {
    if (card.querySelector(".pe-project-detail")) return;
    const title = card.querySelector("h3")?.textContent?.trim();
    const detail = projectDetails.find((item) => item.title === title);
    if (!detail) return;

    const block = document.createElement("div");
    block.className = "pe-project-detail";
    block.innerHTML = `
      <div class="pe-flow" aria-label="Technology flow">
        ${detail.flow.map((item, index) => `${index ? '<span class="pe-flow-arrow">→</span>' : ''}<span class="pe-flow-node">${item}</span>`).join("")}
      </div>
      <div class="pe-case-grid">
        <div class="pe-case"><b>Problem</b><span>${detail.problem}</span></div>
        <div class="pe-case"><b>Built</b><span>${detail.built}</span></div>
        <div class="pe-case"><b>Learned</b><span>${detail.learned}</span></div>
      </div>`;

    const link = card.querySelector("a[href]");
    if (link?.parentElement) link.parentElement.insertBefore(block, link);
    else card.appendChild(block);
  });
}

function enhanceGamesAndBooks() {
  document.getElementById("games")?.classList.add("pe-arcade");

  const books = document.getElementById("books");
  if (books && !books.querySelector(".pe-book-categories")) {
    const description = books.querySelector("p.mt-5");
    const categories = document.createElement("div");
    categories.className = "pe-book-categories";
    categories.innerHTML = ["Programming", "Cybersecurity", "Engineering", "Personal Growth"]
      .map((item) => `<span class="pe-book-chip">${item}</span>`)
      .join("");
    description?.insertAdjacentElement("afterend", categories);
  }
}

function enhanceFooter() {
  const footer = document.querySelector("footer");
  if (!footer || footer.querySelector(".pe-built-with")) return;
  const firstCard = footer.firstElementChild;
  if (!firstCard) return;

  const built = document.createElement("div");
  built.className = "pe-built-with";
  built.innerHTML = `<b>Built as a project with</b><span class="pe-built-chip">Next.js</span><span class="pe-built-chip">React</span><span class="pe-built-chip">TypeScript</span><span class="pe-built-chip">Cloudflare</span>`;
  firstCard.insertAdjacentElement("afterend", built);
}

function installCommandPalette() {
  if (document.querySelector(".pe-palette")) return;

  const overlay = document.createElement("div");
  overlay.className = "pe-palette";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Portfolio command palette");
  overlay.innerHTML = `
    <div class="pe-palette-card">
      <div class="pe-search-wrap"><span class="pe-search-icon">⌘</span><input class="pe-search" placeholder="Type projects, games, books, resume..." aria-label="Search portfolio commands" /></div>
      <div class="pe-results"></div>
      <div class="pe-palette-foot"><span><span class="pe-key">↑↓</span> navigate · <span class="pe-key">Enter</span> open</span><span><span class="pe-key">Esc</span> close</span></div>
    </div>`;
  document.body.appendChild(overlay);

  const input = overlay.querySelector<HTMLInputElement>(".pe-search")!;
  const results = overlay.querySelector<HTMLElement>(".pe-results")!;
  let filtered = [...commands];
  let activeIndex = 0;

  const navigate = (target: string) => {
    overlay.classList.remove("pe-open");
    input.value = "";
    if (target.startsWith("#")) {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", target);
    } else {
      window.location.href = target;
    }
  };

  const render = () => {
    results.innerHTML = filtered.map((item, index) => `
      <button class="pe-result ${index === activeIndex ? "pe-active" : ""}" type="button" data-command-index="${index}">
        <span class="pe-result-code">${item.icon}</span>
        <span><strong>${item.label}</strong><span>${item.hint}</span></span>
      </button>`).join("");
    results.querySelectorAll<HTMLButtonElement>("[data-command-index]").forEach((button) => {
      button.addEventListener("click", () => navigate(filtered[Number(button.dataset.commandIndex)].target));
    });
  };

  const open = () => {
    filtered = [...commands];
    activeIndex = 0;
    render();
    overlay.classList.add("pe-open");
    window.setTimeout(() => input.focus(), 20);
  };

  const close = () => overlay.classList.remove("pe-open");

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    filtered = commands.filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(query));
    activeIndex = 0;
    render();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = Math.min(activeIndex + 1, Math.max(filtered.length - 1, 0));
      render();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      render();
    } else if (event.key === "Enter" && filtered[activeIndex]) {
      event.preventDefault();
      navigate(filtered[activeIndex].target);
    }
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });

  document.querySelectorAll<HTMLElement>("[data-open-command]").forEach((button) => button.addEventListener("click", open));

  const nav = document.querySelector<HTMLElement>(".header-showcase-links");
  if (nav && !nav.querySelector("[data-open-command]")) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pe-command-link";
    button.textContent = "Ctrl K";
    button.setAttribute("data-open-command", "true");
    button.setAttribute("aria-label", "Open portfolio command palette");
    button.addEventListener("click", open);
    nav.appendChild(button);
  }

  const keyboardHandler = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      overlay.classList.contains("pe-open") ? close() : open();
    } else if (event.key === "Escape") {
      close();
    }
  };
  window.addEventListener("keydown", keyboardHandler);
  overlay.dataset.keyboardInstalled = "true";
  (overlay as HTMLElement & { _keyboardHandler?: (event: KeyboardEvent) => void })._keyboardHandler = keyboardHandler;
}

function installEasterEgg() {
  if (document.querySelector(".pe-terminal-overlay")) return;
  const overlay = document.createElement("div");
  overlay.className = "pe-terminal-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <div class="pe-terminal-card">
      <div class="pe-terminal-line">&gt; identity --lookup arun</div>
      <div class="pe-terminal-line">Arun Learning Hub // builder profile located</div>
      <div class="pe-terminal-line">&gt; mode --enable terminal</div>
      <div class="pe-terminal-line">ACCESS GRANTED // learn → build → test → improve → share</div>
    </div>`;
  document.body.appendChild(overlay);

  let textBuffer = "";
  const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let konamiIndex = 0;
  let hideTimer: number | undefined;

  const trigger = () => {
    window.clearTimeout(hideTimer);
    document.body.classList.add("pe-terminal-mode");
    overlay.classList.add("pe-show");
    hideTimer = window.setTimeout(() => {
      overlay.classList.remove("pe-show");
      document.body.classList.remove("pe-terminal-mode");
    }, 4800);
  };

  const handler = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null;
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;

    if (event.key.length === 1 && /[a-z]/i.test(event.key)) {
      textBuffer = (textBuffer + event.key.toLowerCase()).slice(-8);
      if (textBuffer.endsWith("arun")) trigger();
    }

    if (event.key === konami[konamiIndex]) {
      konamiIndex += 1;
      if (konamiIndex === konami.length) {
        trigger();
        konamiIndex = 0;
      }
    } else if (event.key === konami[0]) {
      konamiIndex = 1;
    } else {
      konamiIndex = 0;
    }
  };

  window.addEventListener("keydown", handler);
  (overlay as HTMLElement & { _easterHandler?: (event: KeyboardEvent) => void })._easterHandler = handler;
}

function applyEnhancements() {
  installStyles();
  buildCommandCenter();
  buildJourney();
  enhanceProjects();
  enhanceGamesAndBooks();
  enhanceFooter();
  installCommandPalette();
  installEasterEgg();
}

export default function PortfolioExperience() {
  useEffect(() => {
    applyEnhancements();
    const retryOne = window.setTimeout(applyEnhancements, 350);
    const retryTwo = window.setTimeout(applyEnhancements, 1200);

    return () => {
      window.clearTimeout(retryOne);
      window.clearTimeout(retryTwo);
      const palette = document.querySelector<HTMLElement & { _keyboardHandler?: (event: KeyboardEvent) => void }>(".pe-palette");
      if (palette?._keyboardHandler) window.removeEventListener("keydown", palette._keyboardHandler);
      const easter = document.querySelector<HTMLElement & { _easterHandler?: (event: KeyboardEvent) => void }>(".pe-terminal-overlay");
      if (easter?._easterHandler) window.removeEventListener("keydown", easter._easterHandler);
    };
  }, []);

  return null;
}
