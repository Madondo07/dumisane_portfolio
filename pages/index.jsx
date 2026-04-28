import Head from 'next/head';
import Hero from '../src/components/Hero';
import Skills from '../src/components/Skills';
import SkillsStats from '../src/components/SkillsStats';
import AcademicBackground from '../src/components/academic';
import Projects from '../src/components/Projects';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dumisane Madondo | Full-Stack Developer</title>
        <meta name="description" content="Full-stack developer specializing in React, Next.js & Java. Explore my projects, skills, and academic background." />
      </Head>
      <Hero />
      <Skills />
      <AcademicBackground />
      <SkillsStats />
      <Projects />
    </>
  );
}
