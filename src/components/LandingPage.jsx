import { Link } from 'react-router-dom';
import GitHubChart from './GitHubChart';
import sections from '../data/sections';
import '../styles/Home.css';

const sectionCopy = {
  writing: 'Notes on systems and machine learning.',
  projects: 'Software projects and experiments.',
  about: 'Background and current work.',
};
export default function LandingPage() {
  return (
    <section className="page home-page">
      <div className="page-shell home-index">
        <p className="home-intro-line">
          Computer engineering student building software and writing about systems,
          machine learning, and product work.
        </p>
        <p className="home-intro-line">
          Based in Toronto and Kingston. Currently working as a Data Science Intern at
          M2M Technologies and studying at Queen&apos;s University.
        </p>

        <GitHubChart />

        <div className="home-links" aria-label="Site index">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.key}
                to={section.to}
                className="home-link"
                style={{ '--section-accent': section.color }}
              >
                <span className="home-link-text">
                  <span className="home-link-title">{section.name}</span>
                  <span className="home-link-copy">{sectionCopy[section.key]}</span>
                </span>
                <span className="home-link-icon" aria-hidden="true">
                  <Icon size={16} />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="home-socials" aria-label="Contact and social links">
          <a href="mailto:ivanbardziyan@gmail.com" className="home-social-link">
            Email
          </a>
          <a href="https://github.com/ivanbard" target="_blank" rel="noreferrer" className="home-social-link">
            GitHub
          </a>
          <a href="https://linkedin.com/in/ivanbardziyan" target="_blank" rel="noreferrer" className="home-social-link">
            LinkedIn
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="home-social-link">
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
