import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import ThemeToggle from './components/ThemeToggle';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Skills from './components/Skills';
import SkillsStats from './components/SkillsStats';
import AcademicBackground from './components/academic';

function App() {
  return (
    <div className="min-h-screen app-root">
      <Navbar />
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/"
          element={(
            <>
              <Hero />
              <Skills />
              <SkillsStats />
              <AcademicBackground />
              <Projects />
            </>
          )}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;