import type { Experience } from "../data/profile.ts"

interface Props {
  experience: Experience[]
}

export function ExperienceSection({ experience }: Props) {
  return (
    <section
      id="experience"
      className="scroll-mt-16 border-b border-[var(--border)] py-16 md:py-20"
    >
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">
        <a
          href="#experience"
          className="transition-colors hover:text-[var(--accent)]"
        >
          Experience
        </a>
      </h2>
      <div className="relative space-y-10 border-l border-[var(--border)]">
        {experience.map((exp, i) => (
          <div key={i} className="relative pl-6">
            <div className="absolute left-0 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--accent)] ring-2 ring-[var(--bg)]" />
            <div className="space-y-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold">{exp.role}</h3>
                <span className="text-sm text-[var(--text)]">
                  {exp.company}
                </span>
              </div>
              <p className="text-sm text-[var(--text)]">{exp.period}</p>
              <p className="pt-2 text-[var(--text)]">{exp.description}</p>
              <ul className="list-disc space-y-1 pl-5 pt-2 text-[var(--text)]">
                {exp.responsibility.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
