import type { PortfolioData } from "../data/profile.ts"

interface Props {
  data: PortfolioData
}

function bareUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
}

function ascii(text: string): string {
  return text.replace(/[·–—]/g, match => (match === "·" ? "|" : "-"))
}

function Icon({ id }: { id: string }) {
  return (
    <svg className="resume-icon" aria-hidden="true">
      <use href={`/icons.svg#${id}`} />
    </svg>
  )
}

export function ResumePrint({ data }: Props) {
  const { profile, skills, experience, education, certificates } = data
  const categories = [...new Set(skills.map(skill => skill.category))]

  return (
    <article className="resume-print">
      <header>
        <h1>{profile.name}</h1>
        <div className="resume-contact-row">
          {profile.phone !== undefined && (
            <span className="resume-contact">
              <Icon id="phone-icon" />
              {profile.phone}
            </span>
          )}
          <span className="resume-contact">
            <Icon id="github-icon" />
            {bareUrl(profile.socials.github)}
          </span>
          <span className="resume-contact">
            <Icon id="mail-icon" />
            {profile.email}
          </span>
          <span className="resume-contact">
            <Icon id="linkedin-icon" />
            {bareUrl(profile.socials.linkedin)}
          </span>
        </div>
      </header>

      <div className="resume-cols">
        <section>
          <h2>SKILLS</h2>
          {categories.map(category => (
            <p key={category} className="skill-line">
              <span className="skill-label">{category}:</span>{" "}
              {skills
                .filter(skill => skill.category === category)
                .map(skill => skill.name)
                .join(", ")}
            </p>
          ))}
        </section>

        <section>
          <h2>CERTIFICATES & DEGREES</h2>
          {education.map(item => (
            <div key={item.school} className="job">
              <p className="role-line">{item.school}</p>
              <p>{ascii(item.degree)}.</p>
              {item.description !== undefined && (
                <p>{ascii(item.description)}</p>
              )}
            </div>
          ))}
          {certificates.map(cert => (
            <div key={cert.name} className="job">
              <p className="role-line">{cert.issuer}</p>
              <p>
                {cert.score !== undefined ? `${cert.score} in ` : ""}
                {cert.name}.
              </p>
            </div>
          ))}
        </section>
      </div>

      <section>
        <h2 className="exp-heading">Working experience</h2>
        {experience.map(job => (
          <div key={`${job.company}-${job.period}`} className="job">
            <p className="company-line">
              {job.company} ({ascii(job.period)})
            </p>
            <p className="role-line">{job.role}</p>
            <p className="resp-label">Responsibilities</p>
            <p className="role-desc">{ascii(job.description)}</p>
            <ul>
              {job.responsibility.map(item => (
                <li key={item}>{ascii(item)}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </article>
  )
}
