import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Code2,
  GitBranch,
  Globe2,
  Rocket,
  Users,
} from "lucide-react";

import { Card } from "@/components/ui/card";

const values = [
  {
    icon: BookOpen,
    title: "Learn",
    description:
      "Clear explanations make new technology feel approachable, one useful idea at a time.",
  },
  {
    icon: Code2,
    title: "Build",
    description:
      "Every topic should lead to hands-on practice and projects learners can be proud to share.",
  },
  {
    icon: Rocket,
    title: "Grow",
    description:
      "Progress comes from curiosity, consistent effort, and the confidence to try again.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Learning is stronger when people exchange ideas, ask questions, and help one another.",
  },
  {
    icon: Globe2,
    title: "Access",
    description:
      "Useful learning resources should be easy to reach from wherever a student begins.",
  },
  {
    icon: BadgeCheck,
    title: "Quality",
    description:
      "Thoughtful examples and practical outcomes matter more than unnecessary complexity.",
  },
];

const stats = [
  { value: "2026", label: "Project started" },
  { value: "4", label: "Learning areas" },
  { value: "1", label: "Student builder" },
  { value: "100%", label: "Project-led" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="hero-grid relative isolate bg-primary text-primary-foreground">
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8 md:pb-28 md:pt-8">
          <header className="flex items-center justify-between border-b border-white/12 pb-5">
            <a href="#top" className="flex items-center gap-3" aria-label="Arun Learning Hub home">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary text-primary shadow-lg shadow-black/20">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-heading text-sm font-bold tracking-wide sm:text-base">
                ARUN LEARNING HUB
              </span>
            </a>
            <a
              href="#values"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:border-secondary hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              Our approach
            </a>
          </header>

          <div id="top" className="relative max-w-4xl pt-20 md:pt-28">
            <p className="eyebrow mb-5 text-secondary">ABOUT THE PROJECT</p>
            <h1 className="font-heading text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-8xl">
              Learn new skills.
              <span className="mt-2 block text-secondary">Build your future.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Arun Learning Hub is a student-built space for making technology
              easier to understand through practical lessons, useful resources,
              and project-based learning.
            </p>
            <a
              href="#story"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-base font-bold text-secondary-foreground shadow-xl shadow-black/15 transition hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Read the story
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="story" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20 lg:py-28">
        <div>
          <p className="eyebrow mb-4 text-accent">OUR STORY</p>
          <h2 className="font-heading max-w-xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Created for students who want to grow.
          </h2>
          <div className="mt-7 max-w-2xl space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
            <p>
              This project began with one goal: make learning technology less
              confusing and more practical for students.
            </p>
            <p>
              Instead of stopping at theory, learners can explore concepts,
              practice new skills, and build projects that show how technology
              works in the real world.
            </p>
            <p>
              The platform will continue to grow as new ideas, lessons, and
              projects are developed.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4" aria-label="Project facts">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className={`stat-card border-0 p-6 shadow-none ${index === 1 || index === 2 ? "stat-card-accent" : ""}`}
            >
              <p className="font-heading text-4xl font-extrabold tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">
                {stat.label}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section id="values" className="bg-muted py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-4 text-accent">OUR VALUES</p>
            <h2 className="font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
              How we approach learning.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card
                  key={value.title}
                  className="value-card group gap-0 overflow-hidden border-border/80 p-7 shadow-none"
                >
                  <span className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-primary text-secondary transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-xl font-extrabold">
                    {value.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid overflow-hidden rounded-[2rem] bg-primary text-primary-foreground lg:grid-cols-[0.7fr_1.3fr]">
          <div className="profile-pattern grid min-h-72 place-items-center p-10">
            <div className="grid h-36 w-36 place-items-center rounded-full border-8 border-white/10 bg-secondary text-primary shadow-2xl">
              <span className="font-heading text-5xl font-black">AY</span>
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="eyebrow mb-4 text-secondary">THE BUILDER</p>
            <h2 className="font-heading text-4xl font-extrabold tracking-tight">
              Arun Yadav
            </h2>
            <p className="mt-2 text-lg font-semibold text-slate-300">
              Founder &amp; Developer
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
              A student developer creating a practical learning platform while
              growing skills in software development, design, and education.
            </p>
            <a
              href="https://github.com/arunyadav-214"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-bold transition hover:border-secondary hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              <GitBranch className="h-5 w-5" aria-hidden="true" />
              View GitHub profile
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary py-16 text-secondary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow mb-3 text-primary/70">KEEP LEARNING</p>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
              One project can start something bigger.
            </h2>
          </div>
          <a
            href="#top"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Back to the top
            <ArrowRight className="h-4 w-4 -rotate-90" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
