import React from 'react';
import Hero from '../components/Hero';
import TechGrid from '../components/TechGrid';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <TechGrid />
      <Projects />
      <Contact />
    </>
  );
}