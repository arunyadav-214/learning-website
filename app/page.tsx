import { PortfolioInteractive, WorldClocks } from "./PortfolioInteractive";

const projects = [
  {
    number: "01",
    title: "Parking Garage PLC Project",
    type: "Automation / Engineering",
    href: "/projects/parking-garage-plc",
    description: "Do-more Designer project configured for DM-SIM with ladder-logic simulation and a packaged project download.",
    stack: "PLC · Ladder Logic · DM-SIM · Testing",
  },
  {
    number: "02",
    title: "Machine Learning in Sports Analytics",
    type: "Research",
    href: "/research/machine-learning-sports-analytics",
    description: "Research on performance prediction, fatigue tracking, sports data, machine-learning models, and decision-making.",
    stack: "Sports Data · ML Models · Prediction · Analysis",
  },
  {
    number: "03",
    title: "Arun Learning Hub",
    type: "Web Development",
    href: "#top",
    description: "My portfolio for software, engineering projects, research, games, certificates, books, apps, and academic work.",
    stack: "Next.js · React · TypeScript · Cloudflare",
  },
] as const;

const skillGroups = [
  ["Programming", "Java · Python · C++ · JavaScript / TypeScript"],
  ["Web", "Next.js · React · HTML · CSS"],
  ["Data", "MySQL · SQL · Database Design · DAO Patterns"],
  ["Systems", "Computer Architecture · Operating Systems · Logisim · Digital Logic"],
  ["Engineering", "PLC · Do-more Designer · Manufacturing · Technical Drawing"],
  ["Tools", "Git · GitHub · NetBeans · VS Code"],
] as const;

const explore = [
  ["Research", "Machine learning, sports analytics, and academic investigation.", "#research-papers"],
  ["Certificates", "Training and professional development achievements.", "#certificates"],
  ["Games", "Interactive programming projects you can play in the browser.", "#games"],
  ["Books", "Books and learning resources I use while building and studying.", "#books"],
  ["Apps", "Useful software connected to computer science and engineering work.", "/apps"],
  ["Videos", "Project demos, walkthroughs, and presentations hosted externally.", "#videos"],
] as const;

const games = [
  ["Tic-Tac-Toe Arena", "/games/tic-tac-toe"],
  ["Lion & Goats", "/games/lion-goats"],
  ["Chess", "/games/chess"],
  ["Curious Monkey", "/games/curious-monkey"],
  ["Neon Snake", "/games/snake"],
  ["Rock-Paper-Scissors", "/games/rock-paper-scissors"],
] as const;

const certificates = [
  ["Learning C++ (2018)", "LinkedIn Learning", "/certificates/learning-cpp-2018"],
  ["Basic Measurement 101", "Tooling U-SME", "/certificates/basic-measurement-101"],
  ["Basics of Tolerance 121", "Tooling U-SME", "/certificates/basics-of-tolerance-121"],
  ["Interpreting Prints 231", "Tooling U-SME", "/certificates/interpreting-prints-231"],
  ["Introduction to Physical Properties 101", "Tooling U-SME", "/certificates/introduction-to-physical-properties-101"],
  ["Blueprint Reading 131", "Tooling U-SME", "/certificates/blueprint-reading-131"],
] as const;

const socials = [
  ["LinkedIn", "https://www.linkedin.com/in/arun-kumar-yadav-5a60373ab/"],
  ["Instagram", "https://www.instagram.com/ay.run_"],
  ["X", "https://x.com/aruny71582"],
  ["TikTok", "https://www.tiktok.com/@arunyadav999"],
] as const;

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#c83025]">{children}</p>;
}

export default function Home() {
  return (
    <main id="top" className="swiss-site min-h-screen bg-[#faf9f5] text-[#181818]">
      <PortfolioInteractive showTrigger={false} />

      <div className="mx-auto max-w-[1180px] px-5 py-5 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        <header className="flex items-center justify-between gap-5 py-2">
          <a href="#top" className="flex items-center gap-4" aria-label="Arun K. Yadav home">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#c83025] text-lg font-black text-white">AY</span>
            <span className="text-xl font-black tracking-[-0.03em] sm:text-2xl">Arun K. Yadav</span>
          </a>

          <nav className="hidden items-center gap-8 text-[15px] font-medium text-[#47443f] md:flex" aria-label="Primary navigation">
            <a href="#projects" className="transition hover:text-[#c83025]">Projects</a>
            <a href="#about" className="transition hover:text-[#c83025]">About</a>
            <a href="#skills" className="transition hover:text-[#c83025]">Skills</a>
            <a href="/resume" className="transition hover:text-[#c83025]">Resume</a>
          </nav>

          <details className="relative md:hidden">
            <summary className="cursor-pointer list-none border border-[#d2cec5] px-4 py-2 text-sm font-bold">Menu</summary>
            <div className="absolute right-0 z-50 mt-2 w-48 border border-[#d2cec5] bg-[#faf9f5] p-2 shadow-xl">
              <a href="#projects" className="block px-3 py-2 text-sm">Projects</a>
              <a href="#about" className="block px-3 py-2 text-sm">About</a>
              <a href="#skills" className="block px-3 py-2 text-sm">Skills</a>
              <a href="/resume" className="block px-3 py-2 text-sm">Resume</a>
            </div>
          </details>
        </header>

        <section className="grid gap-12 pb-10 pt-16 lg:grid-cols-[1fr_310px] lg:gap-20 lg:pt-14">
          <div className="flex min-h-[650px] flex-col justify-center">
            <Label>ARUN K. YADAV / PORTFOLIO</Label>
            <h1 className="mt-9 text-[clamp(4.6rem,10vw,8.2rem)] font-black leading-[.88] tracking-[-0.075em]">
              <span className="block">Build.</span>
              <span className="block">Refine.</span>
              <span className="block text-[#c83025]">Repeat.</span>
            </h1>
            <p className="mt-10 max-w-2xl text-lg leading-8 text-[#56534d] sm:text-xl">
              I&apos;m Arun K. Yadav. I explore computer science and applied engineering to build useful software, systems, automation, and interactive projects.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#projects" className="bg-[#c83025] px-7 py-4 text-sm font-black text-white transition hover:bg-[#a9271f]">
                Explore projects ↗
              </a>
              <a href="#about" className="border border-[#cbc7be] px-7 py-4 text-sm font-black text-[#181818] transition hover:border-[#c83025] hover:text-[#c83025]">
                About me
              </a>
            </div>
          </div>

          <aside className="relative flex min-h-[590px] flex-col bg-[#c83025] p-8 text-white lg:min-h-[760px] lg:p-9">
            <p className="text-2xl font-medium leading-[1.4] tracking-[-0.035em]">
              COMPUTER<br />SCIENCE<br />APPLIED<br />ENGINEERING
            </p>
            <div className="flex flex-1 items-center justify-center">
              <span className="text-[9rem] font-black leading-none tracking-[-0.08em] sm:text-[11rem]">A.</span>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.06em]">FORM FOLLOWS FUNCTION.</p>
          </aside>
        </section>

        <div className="border-t border-[#cbc7be] py-6 font-mono text-[12px] text-[#403d38] sm:flex sm:items-center sm:justify-between">
          <span>Swiss Red</span>
          <span className="mt-2 block sm:mt-0">Bold · structured · direct</span>
        </div>
      </div>

      <section id="projects" className="border-t border-[#cbc7be] bg-[#faf9f5]">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <Label>01 / PROJECTS</Label>
              <h2 className="mt-5 text-5xl font-black leading-[.95] tracking-[-0.055em] sm:text-7xl">Selected work.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#5e5a53]">
              Software, engineering, research, and interactive work presented with the same direct structure as the reference design.
            </p>
          </div>

          <div className="mt-16 border-t border-[#cbc7be]">
            {projects.map((project) => (
              <a key={project.number} href={project.href} className="group grid gap-5 border-b border-[#cbc7be] py-8 transition hover:bg-[#f3f0e9] sm:grid-cols-[80px_1fr_auto] sm:items-start sm:px-3">
                <span className="font-mono text-xs text-[#c83025]">{project.number}</span>
                <span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c83025]">{project.type}</span>
                  <strong className="mt-3 block text-2xl font-black tracking-[-0.035em] sm:text-3xl">{project.title}</strong>
                  <span className="mt-3 block max-w-3xl leading-7 text-[#615d56]">{project.description}</span>
                  <span className="mt-4 block font-mono text-[11px] text-[#77736b]">{project.stack}</span>
                </span>
                <span className="text-2xl text-[#c83025] transition group-hover:translate-x-1">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-[#cbc7be] bg-[#f3f0e9]">
        <div className="mx-auto grid max-w-[1180px] lg:grid-cols-[.7fr_1.3fr]">
          <div className="bg-[#c83025] p-8 text-white sm:p-12 lg:p-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]">02 / ABOUT</p>
            <h2 className="mt-8 text-5xl font-black leading-[.95] tracking-[-0.055em] sm:text-7xl">Nepal<br />to USA.</h2>
            <p className="mt-12 max-w-sm leading-7 text-white/85">A personal and technical journey built around curiosity, education, hands-on work, and continuous improvement.</p>
          </div>
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="text-xl leading-9 text-[#4f4b45] sm:text-2xl">
              I study Computer Science with an Applied Engineering minor. My work spans software development, databases, automation, computer systems, digital logic, manufacturing, research, and web projects.
            </p>
            <div className="mt-12 grid gap-8 border-t border-[#cbc7be] pt-8 sm:grid-cols-2">
              <div>
                <Label>CURRENT FOCUS</Label>
                <p className="mt-4 text-2xl font-black tracking-[-0.03em]">Build systems that connect software and engineering.</p>
              </div>
              <div>
                <WorldClocks />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="border-t border-[#cbc7be] bg-[#faf9f5]">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <Label>03 / SKILLS</Label>
          <h2 className="mt-5 text-5xl font-black tracking-[-0.055em] sm:text-7xl">Technical toolkit.</h2>
          <div className="mt-14 grid border-l border-t border-[#cbc7be] sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map(([title, items], index) => (
              <div key={title} className="min-h-48 border-b border-r border-[#cbc7be] p-7">
                <span className="font-mono text-[10px] text-[#c83025]">0{index + 1}</span>
                <h3 className="mt-5 text-2xl font-black tracking-[-0.03em]">{title}</h3>
                <p className="mt-4 leading-7 text-[#625e57]">{items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="research-papers" className="border-t border-[#cbc7be] bg-[#181818] text-[#faf9f5]">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#e9584d]">04 / EXPLORE</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
            <h2 className="text-5xl font-black leading-[.95] tracking-[-0.055em] sm:text-7xl">More than a portfolio.</h2>
            <p className="max-w-2xl text-lg leading-8 text-[#c8c4bc]">Research, games, certificates, learning resources, apps, videos, and academic work all live inside the same system.</p>
          </div>
          <div className="mt-14 grid border-l border-t border-[#484848] sm:grid-cols-2 lg:grid-cols-3">
            {explore.map(([title, copy, href], index) => (
              <a key={title} href={href} className="group min-h-56 border-b border-r border-[#484848] p-7 transition hover:bg-[#c83025]">
                <span className="font-mono text-[10px] text-[#e9584d] group-hover:text-white">0{index + 1}</span>
                <h3 className="mt-7 text-2xl font-black">{title}</h3>
                <p className="mt-4 leading-7 text-[#b8b4ad] group-hover:text-white/85">{copy}</p>
                <span className="mt-8 block text-2xl">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="games" className="border-t border-[#cbc7be] bg-[#faf9f5]">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <Label>05 / GAME ARCADE</Label>
          <h2 className="mt-5 text-5xl font-black tracking-[-0.055em] sm:text-7xl">Play the logic.</h2>
          <div className="mt-14 grid border-l border-t border-[#cbc7be] sm:grid-cols-2 lg:grid-cols-3">
            {games.map(([title, href], index) => (
              <a key={href} href={href} className="group min-h-48 border-b border-r border-[#cbc7be] p-7 transition hover:bg-[#c83025] hover:text-white">
                <span className="font-mono text-[10px] text-[#c83025] group-hover:text-white">0{index + 1}</span>
                <h3 className="mt-9 text-2xl font-black tracking-[-0.03em]">{title}</h3>
                <span className="mt-5 block font-mono text-xs">PLAY ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="certificates" className="border-t border-[#cbc7be] bg-[#f3f0e9]">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <Label>06 / CERTIFICATES</Label>
          <h2 className="mt-5 text-5xl font-black tracking-[-0.055em] sm:text-7xl">Training & progress.</h2>
          <div className="mt-14 border-t border-[#cbc7be]">
            {certificates.map(([title, provider, href], index) => (
              <a key={href} href={href} className="grid gap-3 border-b border-[#cbc7be] py-6 transition hover:bg-[#faf9f5] sm:grid-cols-[70px_1fr_auto] sm:px-3">
                <span className="font-mono text-[10px] text-[#c83025]">0{index + 1}</span>
                <span><strong className="block text-xl">{title}</strong><span className="mt-1 block text-sm text-[#68645d]">{provider}</span></span>
                <span className="text-xl text-[#c83025]">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="books" className="border-t border-[#cbc7be] bg-[#faf9f5]">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:px-12 lg:py-28">
          <div>
            <Label>07 / BOOKS</Label>
            <h2 className="mt-5 text-5xl font-black tracking-[-0.055em] sm:text-7xl">Keep learning.</h2>
          </div>
          <a href="https://codehiddenlanguage.com/" target="_blank" rel="noreferrer" className="group border-t border-[#cbc7be] py-7 sm:grid sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c83025]">Learning Resource</span>
              <h3 className="mt-4 text-3xl font-black tracking-[-0.035em]">Code Hidden Language</h3>
              <p className="mt-4 max-w-2xl leading-7 text-[#625e57]">A coding and learning resource saved in my digital learning shelf for quick access.</p>
            </div>
            <span className="mt-5 text-3xl text-[#c83025] sm:mt-0">↗</span>
          </a>
        </div>
      </section>

      <section id="videos" className="border-t border-[#cbc7be] bg-[#c83025] text-white">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em]">08 / VIDEOS</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
            <h2 className="text-5xl font-black tracking-[-0.055em] sm:text-7xl">Watch the work.</h2>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-white/85">Project demonstrations, presentations, and walkthroughs will stream from external hosting so the portfolio stays lightweight and reliable.</p>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.15em]">External video hosting · no large files bundled</p>
            </div>
          </div>
        </div>
      </section>

      <section id="assignments" className="border-t border-[#cbc7be] bg-[#faf9f5]">
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <Label>09 / ACADEMIC WORK</Label>
          <div className="mt-5 grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
            <h2 className="text-5xl font-black tracking-[-0.055em] sm:text-7xl">Coursework that builds depth.</h2>
            <p className="max-w-2xl text-lg leading-8 text-[#625e57]">Programming, data structures, databases, operating systems, computer architecture, manufacturing, and engineering coursework.</p>
          </div>
        </div>
      </section>

      <section id="resume" className="border-t border-[#cbc7be] bg-[#f3f0e9]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-20">
          <div>
            <Label>10 / RESUME</Label>
            <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.045em] sm:text-6xl">Education, skills, projects, and direction.</h2>
          </div>
          <a href="/resume" className="w-fit bg-[#c83025] px-7 py-4 text-sm font-black text-white">View resume ↗</a>
        </div>
      </section>

      <footer className="border-t border-[#cbc7be] bg-[#faf9f5]">
        <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Label>CONNECT</Label>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em]">Arun K. Yadav</h2>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold">
              {socials.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noreferrer" className="hover:text-[#c83025]">{name} ↗</a>)}
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#cbc7be] pt-5 font-mono text-[11px] text-[#65615a]">
            <span>© 2026 Arun K. Yadav</span>
            <span>CTRL + K TO EXPLORE · TYPE “ARUN” FOR THE EASTER EGG</span>
          </div>
        </div>
      </footer>
    </main>
  );
}