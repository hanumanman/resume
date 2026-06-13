import type { Certificate } from "../data/profile.ts"

interface Props {
  certificates: Certificate[]
}

export function CertificatesSection({ certificates }: Props) {
  return (
    <section
      id="certificates"
      className="scroll-mt-16 border-b border-[var(--border)] py-12 md:py-16"
    >
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">
        <a
          href="#certificates"
          className="transition-colors hover:text-[var(--accent)]"
        >
          Certificates
        </a>
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {certificates.map((cert, i) => (
          <div
            key={i}
            className="rounded-lg border border-[var(--border)] p-4"
          >
            <h3 className="font-semibold">{cert.name}</h3>
            <p className="text-sm text-[var(--text)]">{cert.issuer}</p>
            {cert.score && (
              <p className="mt-1 text-[var(--accent)] font-medium">
                {cert.score}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
