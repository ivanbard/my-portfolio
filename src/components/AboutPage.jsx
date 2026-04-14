import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import experiences from '../data/experience';
import '../styles/About.css';

export default function AboutPage() {
  return (
    <section className="page about-page">
      <div className="page-shell">
        <Link to="/" className="back-link">
          <FiArrowLeft size={16} />
          Back
        </Link>

        <div className="page-header">
          <h1>About</h1>
          <p className="page-intro">
            I&apos;m a computer engineering student based between Toronto and Kingston, interested in software,
            systems, and machine learning work that feels clear and useful.
          </p>
        </div>

        <div className="about-copy">
          <p>
            My recent work has mostly lived between data-heavy product work and the broader systems side
            of computing. I like projects where there is a practical user need underneath the technical work.
          </p>
          <p>
            A lot of that has come through internships: recommendation systems, predictive models,
            dashboards, and internal tools. At school, I keep getting pulled toward embedded systems and
            the points where hardware and software meet.
          </p>
          <p>
            I write because it helps me think more clearly. Most of the writing on this site is meant to be
            practical rather than polished: notes on what I&apos;m learning and how I&apos;m building.
          </p>
          <p>
            You can reach me at <a href="mailto:ivanbardziyan@gmail.com">ivanbardziyan@gmail.com</a> or find me on{' '}
            <a href="https://github.com/ivanbard" target="_blank" rel="noreferrer">GitHub</a> and{' '}
            <a href="https://linkedin.com/in/ivanbardziyan" target="_blank" rel="noreferrer">LinkedIn</a>.
          </p>
        </div>

        <section className="about-section">
          <p className="section-kicker">Experience</p>
          <div className="about-experience-list">
            {experiences.map((item) => (
              <article key={`${item.organization}-${item.period}`} className="about-experience-item">
                <div className="about-experience-header">
                  <h2>{item.title}</h2>
                  <p>{item.organization}</p>
                </div>
                <p className="about-experience-period">
                  {item.period} · {item.location}
                </p>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
