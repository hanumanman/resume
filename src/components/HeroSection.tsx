import type { Profile } from "../data/profile.ts"

interface Props {
  profile: Profile
}

export function HeroSection({ profile }: Props) {
  return (
    <section
      id="hero"
      className="scroll-mt-16 border-b border-[var(--border)] py-16 md:py-20"
    >
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--accent)]">
        {profile.location}
      </p>
      <h1 className="mb-4 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
        <a
          href="#hero"
          className="transition-colors hover:text-[var(--accent)]"
        >
          {profile.name}
        </a>
      </h1>
      <p className="mb-2 text-xl text-[var(--text)] md:text-2xl">
        {profile.title}
      </p>
      <p className="mb-8 max-w-xl text-lg leading-relaxed text-[var(--text)]">
        {profile.tagline}
      </p>
      <a
        href={profile.resumeUrl}
        download={`${profile.name.replaceAll(" ", "-")}-Resume.pdf`}
        className="inline-flex items-center gap-2 rounded-md border border-[var(--accent)] py-2.5 pe-[18px] ps-5 text-sm font-medium text-[var(--accent)] transition-[color,background-color,transform] duration-150 ease-out hover:bg-[var(--accent)] hover:text-white active:scale-[0.96]"
      >
        Resume
        <svg className="h-4 w-4" aria-hidden="true">
          <use href="/icons.svg#download-icon" />
        </svg>
      </a>
    </section>
  )
}
