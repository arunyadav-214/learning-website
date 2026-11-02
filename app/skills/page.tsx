import PageShell from "../PageShell";

const groups = [
  ["Programming", ["Java", "Python", "C++", "JavaScript / TypeScript"]],
  ["Web", ["Next.js", "React", "HTML", "CSS"]],
  ["Data", ["MySQL", "SQL", "Database Design", "DAO Patterns"]],
  ["Systems", ["Computer Architecture", "Operating Systems", "Logisim", "Digital Logic"]],
  ["Engineering", ["PLC", "Do-more Designer", "Manufacturing", "Technical Drawing"]],
  ["Tools", ["Git", "GitHub", "NetBeans", "VS Code"]],
] as const;

export default function SkillsPage() {
  return (
    <PageShell kicker="SKILLS" title="My technical toolkit." intro="A mix of software, systems, data, and engineering skills developed through coursework and hands-on projects.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map(([title, items]) => (
          <article key={title} className="rounded-[1.4rem] border border-black/10 bg-white/80 p-6">
            <h2 className="text-xl font-black">{title}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((item) => <span key={item} className="skill-chip">{item}</span>)}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
