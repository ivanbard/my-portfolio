import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import FadeInSection from './FadeInSection';
import '../styles/Home.css';

export default function LandingPage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="page-shell">
          <Motion.div
            className="home-hero-grid"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="home-intro">
              <p className="eyebrow">Ivan Bardziyan</p>
              <h1>I build software carefully and write about the systems behind it.</h1>
              <p className="home-intro-copy">
                I&apos;m a computer engineering student in Ontario working across machine learning,
                product-facing software, and systems-oriented projects. This site now acts more like a
                working notebook: recent writing first, selected work next, and the context around both.
              </p>

              <div className="home-actions">
                <Link to="/blog" className="button-link">
                  Start with writing
                </Link>
                <Link to="/projects" className="button-link button-link-secondary">
                  Browse projects
                </Link>
                <Link to="/about" className="text-link">
                  More about me
                </Link>
              </div>
            </div>

            <aside className="home-aside">
              <div className="home-note">
                <span className="note-label">Currently</span>
                <p>Data Science Intern at M2M Technologies and studying at Queen&apos;s University.</p>
              </div>
              <div className="home-note">
                <span className="note-label">Focus</span>
                <p>Embedded systems, machine learning, product engineering, and quieter interface design.</p>
              </div>
              <div className="home-note">
                <span className="note-label">Based in</span>
                <p>Toronto and Kingston, Ontario.</p>
              </div>
            </aside>
          </Motion.div>
        </div>
      </section>

      <FadeInSection>
        <section className="home-section">
          <Blog />
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="home-section">
          <Projects />
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="home-section">
          <Experience />
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="home-section">
          <Contact />
        </section>
      </FadeInSection>
    </div>
  );
}
