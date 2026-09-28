import type { PortfolioData } from "../data/profile.ts"

interface Props {
  data: PortfolioData
}

function bareUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
}

export function ResumePrint({ data }: Props) {
  const { profile, about, skills, experience, education, certificates } = data
  const summary = about[0]
  const categories = [...new Set(skills.map(skill => skill.category))]

  return (
    <article className="resume-print">
      <header>
        <h1>{profile.name}</h1>
        <p className="resume-title">{profile.title}</p>
        <p className="resume-contact">
          {profile.location}
          {" · "}
          {profile.email}
          {" · "}
          {bareUrl(profile.socials.github)}
          {" · "}
          {bareUrl(profile.socials.linkedin)}
        </p>
      </header>

      {summary !== undefined && (
        <section>
          <h2>Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      <section>
        <h2>Experience</h2>
        {experience.map(job => (
          <div key={`${job.company}-${job.period}`} className="job">
            <div className="role-row">
              <p className="role-main">
                {job.role}
                <span className="role-company">
                  {" · "}
                  {job.company}
                </span>
              </p>
              <p className="role-dates">{job.period}</p>
            </div>
            <p className="role-desc">{job.description}</p>
            <ul>
              {job.responsibility.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        {categories.map(category => (
          <div key={category} className="skill-row">
            <p className="skill-label">{category}</p>
            <p>
              {skills
                .filter(skill => skill.category === category)
                .map(skill => skill.name)
                .join(", ")}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {education.map(item => (
          <div key={item.school} className="job">
            <p className="role-main">{item.degree}</p>
            <p className="role-company">{item.school}</p>
            {item.description !== undefined && (
              <p className="role-desc">{item.description}</p>
            )}
          </div>
        ))}
      </section>

      {certificates.length > 0 && (
        <section>
          <h2>Certificates</h2>
          {certificates.map(cert => (
            <p key={cert.name}>
              {cert.name}
              {" — "}
              {cert.issuer}
              {cert.score !== undefined ? `, ${cert.score}` : ""}
            </p>
          ))}
        </section>
      )}
    </article>
  )
}
