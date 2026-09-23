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
          I was born in Minsk, and now live in Toronto.
          <br />
          I currently study computer engineering at Queen's University out in Kingston.
        </p>
        <p className="home-intro-line">
          Previously, I was a data engineer at RBC, in the Amplify program. Prior to that, I was at Mind 2 Machine researching, building, and implementing models for clients. 
          Additionally, I spent some time at Michael Garron Hospital working with data.
        </p>
        <p className="home-intro-line">
          I like working and learning about low-level systems, and sometimes I write.
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
          <a href="https://x.com/ivanbardziyan" target="_blank" rel="noreferrer" className="home-social-link">
            X
          </a>
        </div>
      </div>
    </section>
  );
}
