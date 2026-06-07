import type { Skill } from "../data/profile.ts"

interface Props {
  skills: Skill[]
}

export function SkillsSection({ skills }: Props) {
  const categories = [...new Set(skills.map(s => s.category))]

  return (
    <section
      id="skills"
      className="scroll-mt-16 border-b border-[var(--border)] py-16 md:py-20"
    >
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">
        <a
          href="#skills"
          className="transition-colors hover:text-[var(--accent)]"
        >
          Skills &amp; Technologies
        </a>
      </h2>
      <div className="space-y-6">
        {categories.map(cat => (
          <div key={cat} className="skill-category">
            <h3 className="mb-3 text-sm font-medium tracking-widest text-[var(--accent)] uppercase">
              {cat}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills
                .filter(s => s.category === cat)
                .map(s => (
                  <span
                    key={s.name}
                    className="skill-tag rounded-md border border-[var(--border)] bg-[var(--code-bg)] px-3 py-1.5 text-sm"
                  >
                    {s.name}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
