import { AboutSection } from "./components/AboutSection.tsx"
import { CertificatesSection } from "./components/CertificatesSection.tsx"
import { EducationSection } from "./components/EducationSection.tsx"
import { ExperienceSection } from "./components/ExperienceSection.tsx"
import { Footer } from "./components/Footer.tsx"
import { HeroSection } from "./components/HeroSection.tsx"
import { ResumePrint } from "./components/ResumePrint.tsx"
import { SkillsSection } from "./components/SkillsSection.tsx"
import { data } from "./data/profile.ts"

function App() {
  return (
    <>
      <div className="no-print">
        <HeroSection profile={data.profile} />
        <AboutSection paragraphs={data.about} />
        <SkillsSection skills={data.skills} />
        <ExperienceSection experience={data.experience} />
        <EducationSection education={data.education} />
        <CertificatesSection certificates={data.certificates} />
        {/* <ProjectsSection projects={data.projects} /> */}
        <Footer profile={data.profile} />
      </div>
      <ResumePrint data={data} />
    </>
  )
}

export default App
