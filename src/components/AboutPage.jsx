import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiFileText } from 'react-icons/fi';
import experiences from '../data/experience';
import '../styles/About.css';

export default function AboutPage() {
  return (
    <section className="page about-page">
      <div className="page-shell">
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p className="eyebrow">About</p>
          <div className="page-header">
            <h1>Background, interests, and the kind of work I want to keep doing.</h1>
            <p className="page-intro">
              I&apos;m a computer engineering student based between Toronto and Kingston. I care about
              software that is dependable, understandable, and useful in the real world.
            </p>
          </div>
        </Motion.div>

        <Motion.div
          className="about-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.45 }}
        >
          <div className="about-copy">
            <p>
              My recent work has sat at the intersection of data, product, and implementation. I like
              projects where there is a clear user need, a messy technical problem underneath it, and
              enough room to make the final experience feel thoughtful rather than merely functional.
            </p>
            <p>
              A lot of that has come through internships: recommendation systems, predictive models,
              dashboards, internal tools, and experiments with LLM-backed features. At school, the part
              that keeps pulling me forward is the systems side of computing, especially when hardware,
              software, and constraints meet.
            </p>
            <p>
              Outside the code itself, I write because it helps me think more clearly. The writing on
              this site is meant to be practical: notes on embedded systems, machine learning, project
              decisions, and whatever I learn the hard way while building.
            </p>
          </div>

          <aside className="about-notes">
            <div className="about-note">
              <span className="note-label">Currently</span>
              <p>Studying computer engineering and working on data-heavy products.</p>
            </div>
            <div className="about-note">
              <span className="note-label">Interested in</span>
              <p>Embedded systems, machine learning, product engineering, and calm interface design.</p>
            </div>
            <div className="about-note">
              <span className="note-label">Based in</span>
              <p>Toronto and Kingston, Ontario.</p>
            </div>
            <div className="about-links">
              <a href="/resume.pdf" className="text-link" target="_blank" rel="noreferrer">
                Resume <FiFileText />
              </a>
              <a href="mailto:ivanbardziyan@gmail.com" className="text-link">
                Email <FiArrowUpRight />
              </a>
            </div>
          </aside>
        </Motion.div>

        <Motion.section
          className="section-block"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="section-heading">
            <p className="section-kicker">Experience</p>
            <h2>What I&apos;ve been working on recently.</h2>
          </div>

          <div className="about-experience-list">
            {experiences.map((item) => (
              <article key={`${item.organization}-${item.period}`} className="about-experience-item">
                <div className="about-experience-meta">
                  <span>{item.period}</span>
                  <span>{item.location}</span>
                </div>
                <div>
                  <h3>
                    {item.title}
                    <span>{item.organization}</span>
                  </h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Motion.section>

        <Motion.div
          className="about-cta"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p>For recent writing, start on the blog. For finished work, go to projects.</p>
          <div className="about-cta-links">
            <Link to="/blog" className="button-link">
              Read writing
            </Link>
            <Link to="/projects" className="button-link button-link-secondary">
              View projects
            </Link>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
