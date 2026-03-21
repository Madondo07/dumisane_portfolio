import Hero from '../src/components/Hero';
import Skills from '../src/components/Skills';
import SkillsStats from '../src/components/SkillsStats';
import AcademicBackground from '../src/components/academic';
import Projects from '../src/components/Projects';

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <AcademicBackground />
      <SkillsStats />
      <Projects />
    </>
  );
}
