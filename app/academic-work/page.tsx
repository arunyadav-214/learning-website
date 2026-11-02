import PageShell from "../PageShell";

const areas = [
  "Software Engineering",
  "Data Structures & Algorithms",
  "Database Systems",
  "Operating Systems",
  "Computer Architecture",
  "Applied Engineering",
  "Manufacturing",
];

export default function AcademicWorkPage() {
  return (
    <PageShell kicker="ACADEMIC WORK" title="Coursework & assignments." intro="Selected academic areas that support my software, systems, database, and engineering projects.">
      <div className="grid gap-4 md:grid-cols-2">
        {areas.map((area) => (
          <article key={area} className="rounded-[1.35rem] border border-black/10 bg-white/80 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#c83025]">Course Area</p>
            <h2 className="mt-3 text-xl font-black">{area}</h2>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
