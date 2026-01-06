import Hero from '../components/Hero';
import TechGrid from '../components/TechGrid';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import FadeInSection from './FadeInSection';
import { Analytics } from '@vercel/analytics/react';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <section id="hero">
        <Hero />
      </section>

      <FadeInSection>
        <section id="tech">
          <TechGrid />
        </section>
      </FadeInSection>

      <FadeInSection>
        <section id="experience">
          <Experience />
        </section>
      </FadeInSection>

      <FadeInSection>
        <section id="projects">
          <Projects />
        </section>
      </FadeInSection>

      <FadeInSection>
        <section id="blog">
          <Blog />
        </section>
      </FadeInSection>

      <FadeInSection>
        <section id="contact">
          <Contact />
        </section>
      </FadeInSection>

      <Analytics />
    </div>
  );
}