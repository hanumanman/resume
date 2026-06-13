interface Props {
  paragraphs: string[]
}

export function AboutSection({ paragraphs }: Props) {
  return (
    <section
      id="about"
      className="no-print scroll-mt-16 border-b border-[var(--border)] py-12 md:py-16"
    >
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">
        <a
          href="#about"
          className="transition-colors hover:text-[var(--accent)]"
        >
          About
        </a>
      </h2>
      <div className="max-w-2xl space-y-4 leading-relaxed text-[var(--text)]">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  )
}
