import type { Profile } from "../data/profile.ts"

interface Props {
  profile: Profile
}

export function Footer({ profile }: Props) {
  return (
    <footer id="contact" className="scroll-mt-16 py-16 md:py-20">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">
        <a
          href="#contact"
          className="transition-colors hover:text-[var(--accent)]"
        >
          Contact
        </a>
      </h2>
      <div className="mb-8 space-y-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 text-[var(--text)] transition-colors hover:text-[var(--accent)]"
        >
          <svg className="h-5 w-5" aria-hidden="true">
            <use href="/icons.svg#mail-icon" />
          </svg>
          {profile.email}
        </a>
        <div className="no-print flex gap-6">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[var(--text)] transition-colors hover:text-[var(--accent)]"
          >
            <svg className="h-5 w-5" aria-hidden="true">
              <use href="/icons.svg#github-icon" />
            </svg>
            GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[var(--text)] transition-colors hover:text-[var(--accent)]"
          >
            <svg className="h-5 w-5" aria-hidden="true">
              <use href="/icons.svg#linkedin-icon" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
      <p className="no-print text-sm text-[var(--text)]">
        &copy; {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}
