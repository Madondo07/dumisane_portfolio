import Head from 'next/head';
import Hero from '../src/components/Hero';
import Skills from '../src/components/Skills';
import SkillsStats from '../src/components/SkillsStats';
import AcademicBackground from '../src/components/academic';
import Projects from '../src/components/Projects';
import Certificates from '../src/components/Certificates';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dumisane Madondo | Full-Stack Developer</title>
        <meta name="description" content="Full-stack developer specializing in React, Next.js & Java. Explore my projects, skills, and academic background." />
        {/* Open Graph — used by WhatsApp, Telegram, Facebook, LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dumisanemm.co.za/" />
        <meta property="og:title" content="Dumisane Madondo | Full-Stack Developer" />
        <meta property="og:description" content="Full-stack developer specializing in React, Next.js & Java. Explore my projects, skills, and academic background." />
        <meta property="og:image" content="https://www.dumisanemm.co.za/logoicon2.png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dumisane Madondo | Full-Stack Developer" />
        <meta name="twitter:description" content="Full-stack developer specializing in React, Next.js & Java. Explore my projects, skills, and academic background." />
        <meta name="twitter:image" content="https://www.dumisanemm.co.za/logoicon2.png" />
      </Head>
      <Hero />
      <Skills />
      <AcademicBackground />
      <SkillsStats />
      <Projects />
      <Certificates />
    </>
  );
}
