import type { Education } from "../data/profile.ts"

interface Props {
  education: Education[]
}

export function EducationSection({ education }: Props) {
  return (
    <section
      id="education"
      className="scroll-mt-16 border-b border-[var(--border)] py-12 md:py-16"
    >
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">
        <a
          href="#education"
          className="transition-colors hover:text-[var(--accent)]"
        >
          Education
        </a>
      </h2>
      <div className="relative space-y-10 border-l border-[var(--border)]">
        {education.map((edu, i) => (
          <div key={i} className="relative pl-6">
            <div className="no-print absolute left-0 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--accent)] ring-2 ring-[var(--bg)]" />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <p className="text-sm text-[var(--text)]">{edu.school}</p>
              {edu.description && (
                <p className="pt-2 text-[var(--text)]">{edu.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
