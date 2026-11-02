import PageShell from "../PageShell";

const certificates = [
  ["Learning C++ (2018)", "LinkedIn Learning", "/certificates/learning-cpp-2018"],
  ["Basic Measurement 101", "Tooling U-SME", "/certificates/basic-measurement-101"],
  ["Basics of Tolerance 121", "Tooling U-SME", "/certificates/basics-of-tolerance-121"],
  ["Interpreting Prints 231", "Tooling U-SME", "/certificates/interpreting-prints-231"],
  ["Introduction to Physical Properties 101", "Tooling U-SME", "/certificates/introduction-to-physical-properties-101"],
  ["Types of Prints & Engineering Drawings 132", "Tooling U-SME", "/certificates/types-of-prints-engineering-drawings-132"],
  ["Blueprint Reading 131", "Tooling U-SME", "/certificates/blueprint-reading-131"],
] as const;

export default function CertificatesPage() {
  return (
    <PageShell kicker="CERTIFICATES" title="Training & achievements." intro="Certificates that document my technical and engineering learning.">
      <div className="grid gap-4 md:grid-cols-2">
        {certificates.map(([title, provider, href]) => (
          <a key={href} href={href} className="rounded-[1.35rem] border border-black/10 bg-white/80 p-5 transition hover:-translate-y-1 hover:border-[#c83025]/40">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#c83025]">{provider}</p>
            <h2 className="mt-3 text-xl font-black">{title}</h2>
            <span className="mt-5 inline-block font-black text-[#c83025]">View certificate ↗</span>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
