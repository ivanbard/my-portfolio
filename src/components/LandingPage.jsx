import React from 'react';
import Hero from '../components/Hero';
import TechGrid from '../components/TechGrid';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

import FadeInSection from './FadeInSection';
import { Analytics } from '@vercel/analytics/react';

export default function LandingPage() {
  return (
    <>
      <FadeInSection>
        <section id="hero"><Hero /></section>
      </FadeInSection>

      <FadeInSection delay={0.5}>
        <section id="tech"><TechGrid /></section>
      </FadeInSection>

      <FadeInSection delay={1}>
        <section id="projects"><Projects /></section>
      </FadeInSection>

      <FadeInSection delay={1.5}>
        <section id="contact"><Contact /></section>
      </FadeInSection>

      <Analytics />

    </>
  );
}