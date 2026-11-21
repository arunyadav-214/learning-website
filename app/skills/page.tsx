import PageShell from "../PageShell";

const groups = [
  {
    title: "Programming",
    items: [
      ["Java", "/academic-work", "Coursework & software projects"],
      ["Python", "/research", "Research / ML context"],
      ["C++", "/certificates", "C++ certificate"],
      ["JavaScript / TypeScript", "/projects/arun-learning-hub", "This portfolio project"],
    ],
  },
  {
    title: "Web",
    items: [
      ["Next.js", "/projects/arun-learning-hub", "Arun Learning Hub"],
      ["React", "/projects/arun-learning-hub", "Arun Learning Hub"],
      ["HTML", "/projects/arun-learning-hub", "Web portfolio"],
      ["CSS", "/projects/arun-learning-hub", "Web portfolio"],
    ],
  },
  {
    title: "Data",
    items: [
      ["MySQL", "/academic-work", "Database Systems work"],
      ["SQL", "/academic-work", "Database Systems work"],
      ["Database Design", "/academic-work", "ERD / database coursework"],
      ["DAO Patterns", "/academic-work", "Software/database coursework"],
    ],
  },
  {
    title: "Systems",
    items: [
      ["Computer Architecture", "/academic-work", "Computer Architecture coursework"],
      ["Operating Systems", "/academic-work", "Operating Systems coursework"],
      ["Logisim", "/academic-work", "Digital systems coursework"],
      ["Digital Logic", "/academic-work", "Computer Architecture work"],
    ],
  },
  {
    title: "Engineering",
    items: [
      ["PLC", "/projects/parking-garage-plc", "Parking Garage PLC"],
      ["Do-more Designer", "/projects/parking-garage-plc", "Parking Garage PLC"],
      ["Manufacturing", "/academic-work", "Applied Engineering work"],
      ["Technical Drawing", "/certificates", "Print / drawing certificates"],
    ],
  },
  {
    title: "Tools",
    items: [
      ["Git", "/projects/arun-learning-hub", "Version-controlled projects"],
      ["GitHub", "/recruiter", "Live GitHub activity"],
      ["NetBeans", "/academic-work", "Java coursework"],
      ["VS Code", "/projects/arun-learning-hub", "Web/software development"],
    ],
  },
] as const;

export default function SkillsPage() {
  return (
    <PageShell
      kicker="SKILLS → PROOF"
      title="My technical toolkit."
      intro="Every skill below links to portfolio evidence, coursework, a project, or a certificate instead of standing alone as a claim."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <article key={group.title} className="rounded-[1.4rem] border border-black/10 bg-white/80 p-6">
            <h2 className="text-xl font-black">{group.title}</h2>
            <div className="mt-4 grid gap-2">
              {group.items.map(([skill, href, proof]) => (
                <a
                  key={skill}
                  href={href}
                  className="group rounded-xl border border-black/10 bg-[#faf9f5] px-4 py-3 transition hover:border-[#c83025]/35 hover:bg-[#fff7f5]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-black text-[#181818]">{skill}</span>
                    <span className="text-[#c83025] transition group-hover:translate-x-0.5">→</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{proof}</p>
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
