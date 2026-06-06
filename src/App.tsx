import { AboutSection } from "./components/AboutSection.tsx"
import { ExperienceSection } from "./components/ExperienceSection.tsx"
import { Footer } from "./components/Footer.tsx"
import { HeroSection } from "./components/HeroSection.tsx"
import { SkillsSection } from "./components/SkillsSection.tsx"
import { data } from "./data/profile.ts"

function App() {
  return (
    <>
      <HeroSection profile={data.profile} />
      <AboutSection paragraphs={data.about} />
      <SkillsSection skills={data.skills} />
      <ExperienceSection experience={data.experience} />
      {/* <ProjectsSection projects={data.projects} /> */}
      <Footer profile={data.profile} />
    </>
  )
}

export default App
