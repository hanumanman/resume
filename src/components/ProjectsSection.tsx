import type { Project } from "../data/profile.ts"

interface Props {
  projects: Project[]
}

export function ProjectsSection({ projects }: Props) {
  return (
    <section
      id="projects"
      className="scroll-mt-16 border-b border-[var(--border)] py-12 md:py-16"
    >
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">
        <a
          href="#projects"
          className="transition-colors hover:text-[var(--accent)]"
        >
          Projects
        </a>
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <div
            key={project.name}
            className="flex flex-col rounded-lg border border-[var(--border)] p-5"
          >
            <h3 className="mb-2 text-lg font-semibold">{project.name}</h3>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--text)]">
              {project.description}
            </p>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.techStack.map(tech => (
                <span
                  key={tech}
                  className="rounded border border-[var(--border)] bg-[var(--code-bg)] px-2 py-0.5 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-sm">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--accent)] transition-colors hover:underline"
                >
                  Live &rarr;
                </a>
              )}
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--accent)] transition-colors hover:underline"
                >
                  Source &rarr;
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
