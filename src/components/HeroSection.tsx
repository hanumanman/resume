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
      <p className="mb-4 text-sm font-medium tracking-widest text-[var(--accent)] uppercase">
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
      <button
        type="button"
        onClick={() => window.print()}
        className="no-print inline-flex cursor-pointer items-center gap-2 rounded-md border border-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
      >
        Resume
        <svg className="h-4 w-4" aria-hidden="true">
          <use href="/icons.svg#download-icon" />
        </svg>
      </button>
      <div className="print-only hidden text-[9.5pt] leading-snug">
        <p>
          {profile.email}
          {"　·　"}
          {profile.socials.github}
          {"　·　"}
          {profile.socials.linkedin}
        </p>
      </div>
    </section>
  )
}
