import React from 'react';
import CustomCursor from './components/CustomCursor';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  return (
    <>
      <CustomCursor />
      <Background3D />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

