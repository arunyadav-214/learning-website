export default function ParkingGarageProjectPage() {
  return (
    <main className="min-h-screen bg-[#070b17] text-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
          <a href="/#projects" className="font-bold text-white hover:text-cyan-300">
            ← Back to Projects
          </a>
          <span>PLC / Automation Project</span>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-6 sm:p-10 lg:p-14">
          <p className="text-xs font-black tracking-[0.18em] text-emerald-300">LAST-SEMESTER PROJECT</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Parking Garage PLC Project
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            A parking-garage automation project created in Do-more Designer and configured to run with the DM-SIM PLC simulator.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 text-sm font-bold text-slate-200">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Do-more Designer</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">DM-SIM</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Ladder Logic</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">PLC Simulation</span>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03]">
          <img
            src="/projects/parking-garage-plc-preview.svg"
            alt="Parking Garage PLC Project preview"
            className="block w-full object-cover"
          />
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-black tracking-[0.16em] text-emerald-300">OVERVIEW</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">Parking automation with PLC simulation</h2>
          <p className="mt-4 max-w-4xl leading-7 text-slate-400">
            This project was built as a PLC automation exercise for a parking-garage system. The original package is a Do-more Designer project configured for the DM-SIM controller, so the control logic can be tested in simulation without requiring a physical PLC. The project package includes the main Do-more project together with its workspace and interface-layout files.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-cyan-300">Project format</p>
            <h2 className="mt-3 text-2xl font-black">Do-more Designer project</h2>
            <p className="mt-3 leading-7 text-slate-400">
              The project package contains the Do-more Designer project file together with its workspace and layout files.
            </p>
          </article>

          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-emerald-300">Controller</p>
            <h2 className="mt-3 text-2xl font-black">DM-SIM configuration</h2>
            <p className="mt-3 leading-7 text-slate-400">
              The project is configured for Do-more&apos;s simulator, allowing the ladder-logic program to be tested without a physical PLC.
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-black tracking-[0.16em] text-violet-300">PROJECT FILES</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">Included in the original project</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
              <h3 className="font-black">parkingarage.dmd</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Main Do-more Designer project file.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
              <h3 className="font-black">parkingarage.dlo</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Designer layout configuration.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
              <h3 className="font-black">parkingarage.wsp</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">Workspace settings, including the main ladder view.</p>
            </div>
          </div>

          <div className="mt-6">
            <a
              href="/files/parkingarage.zip"
              download
              className="inline-flex items-center justify-center rounded-xl bg-emerald-300 px-5 py-3 font-black text-emerald-950 transition hover:bg-emerald-200"
            >
              Download Project ZIP
            </a>
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-amber-300/15 bg-amber-300/[0.04] p-6 sm:p-8">
          <p className="text-xs font-black tracking-[0.16em] text-amber-300">NOTE</p>
          <p className="mt-3 max-w-4xl leading-7 text-slate-300">
            The uploaded project uses Do-more Designer&apos;s native project format. This page describes the project information that can be verified from the uploaded files without inventing details that are not exposed in the project package&apos;s readable metadata.
          </p>
        </section>
      </div>
    </main>
  );
}
