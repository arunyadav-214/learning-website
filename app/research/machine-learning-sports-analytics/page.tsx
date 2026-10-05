export default function MachineLearningSportsAnalyticsPage() {
  const references = [
    "UW Extended Campus — Moneyball proves importance of big data and big ideas",
    "PMC — Machine learning and sports analytics research",
    "Frontiers in Sports and Active Living — Sports analytics research",
    "The Sport Journal — Examination of the Moneyball theory",
  ];

  return (
    <main className="min-h-screen bg-[#070b17] text-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
          <a href="/#research-papers" className="font-bold text-white hover:text-cyan-300">
            ← Back to Research Papers
          </a>
          <span>Technical Writing Presentation • 23 slides</span>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 p-6 sm:p-10 lg:p-14">
          <p className="text-xs font-black tracking-[0.18em] text-cyan-300">RESEARCH / PRESENTATION</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Application of Machine Learning in Sports Analytics
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            A presentation exploring how machine learning is used in sports for performance prediction,
            injury prevention, strategy, player monitoring, scouting, video analysis, and fan engagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 text-sm font-bold text-slate-200">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Arun Kumar Yadav</span>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-cyan-300">Core idea</p>
            <h2 className="mt-3 text-2xl font-black">What is machine learning?</h2>
            <p className="mt-3 leading-7 text-slate-400">
              Machine learning is presented as a subset of AI that learns patterns from data and improves from experience without being explicitly programmed for every decision.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-emerald-300">Sports use</p>
            <h2 className="mt-3 text-2xl font-black">Data-driven decisions</h2>
            <p className="mt-3 leading-7 text-slate-400">
              The presentation connects ML to performance forecasting, injury prevention, tactics, personalized fan content, and recruitment.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-amber-300">Techniques</p>
            <h2 className="mt-3 text-2xl font-black">Regression, classification, clustering</h2>
            <p className="mt-3 leading-7 text-slate-400">
              Regression predicts continuous values, classification categorizes outcomes, and clustering groups similar players, roles, or playing styles.
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-black tracking-[0.16em] text-violet-300">ML WORKFLOW</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">From raw data to useful predictions</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {['Collect Data','Clean & Prepare Data','Choose Model','Train Model','Test Model','Evaluate & Improve','Deploy Model'].map((step, index) => (
              <div key={step} className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
                <span className="text-xs font-black text-violet-300">0{index + 1}</span>
                <p className="mt-2 font-bold text-slate-100">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-xs font-black tracking-[0.16em] text-amber-300">MONEYBALL CASE STUDY</p>
            <h2 className="mt-3 text-3xl font-black">Early sports analytics in baseball</h2>
            <p className="mt-4 leading-7 text-slate-400">
              The presentation discusses the 2002 Oakland Athletics and their use of sabermetrics to identify undervalued players, emphasizing on-base percentage and data-driven roster decisions despite a much smaller payroll.
            </p>
            <p className="mt-4 leading-7 text-slate-400">
              It notes that the team won 101 games and the American League West, helping popularize analytics across professional sports.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-xs font-black tracking-[0.16em] text-emerald-300">MODERN TRENDS</p>
            <h2 className="mt-3 text-3xl font-black">Real-time ML in sports</h2>
            <ul className="mt-5 space-y-3 text-slate-400">
              <li>• Wearables for speed, fatigue, heart rate, sleep, and recovery tracking.</li>
              <li>• In-game predictive analysis for performance, injuries, and substitutions.</li>
              <li>• Video analysis and object detection for automatic tactical breakdown.</li>
              <li>• Personalized highlights, content, and merchandise recommendations.</li>
              <li>• Automated recruitment and scouting using performance data.</li>
            </ul>
          </article>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-black tracking-[0.16em] text-cyan-300">DATA USED BY SPORTS ML</p>
          <h2 className="mt-3 text-3xl font-black">Inputs that feed the models</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['Player Tracking','Speed, distance, acceleration, movement patterns'],
              ['Performance Metrics','Points, passes, tackles, goals, rebounds'],
              ['Biometric & Health','Heart rate, fatigue, injury risk'],
              ['Environment','Weather, court conditions, altitude'],
              ['Video & Images','Computer vision for tactical analysis'],
            ].map(([title, description]) => (
              <div key={title} className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
                <h3 className="font-black text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-xs font-black tracking-[0.16em] text-rose-300">CHALLENGES</p>
            <h2 className="mt-3 text-3xl font-black">Barriers to implementation</h2>
            <ul className="mt-5 space-y-3 text-slate-400">
              <li>• Inconsistent or incomplete data can reduce prediction quality.</li>
              <li>• Real-time systems may require expensive GPUs and cloud infrastructure.</li>
              <li>• Coaches and staff may resist black-box models.</li>
              <li>• Some teams lack in-house data science expertise.</li>
              <li>• Bias and ethics can create unfair or misleading outcomes.</li>
            </ul>
          </article>

          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-xs font-black tracking-[0.16em] text-lime-300">HUMAN + ML</p>
            <h2 className="mt-3 text-3xl font-black">Collaboration, not replacement</h2>
            <p className="mt-4 leading-7 text-slate-400">
              The presentation recommends interpretable models, staff education, small pilot projects, and clear demonstrations of value. Its conclusion emphasizes that the strongest results come when machine learning recommendations are validated and adjusted by coaches and trainers.
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-black tracking-[0.16em] text-slate-400">REFERENCES INCLUDED IN THE PRESENTATION</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {references.map((ref) => (
              <div key={ref} className="rounded-xl border border-white/10 bg-slate-950/40 p-4 text-sm leading-6 text-slate-300">
                {ref}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
