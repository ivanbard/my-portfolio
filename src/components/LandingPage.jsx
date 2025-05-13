import React from 'react';
import Hero from '../components/Hero';
import TechGrid from '../components/TechGrid';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

import FadeInSection from './FadeInSection';

export default function LandingPage() {
  return (
    <>
      <FadeInSection>
        <Hero />
      </FadeInSection>

      <FadeInSection delay={0.5}>
        <TechGrid />
      </FadeInSection>

      <FadeInSection delay={1}>
        <Projects />
      </FadeInSection>

      <FadeInSection delay={1.5}>
        <Contact />
      </FadeInSection>

    </>
  );
}