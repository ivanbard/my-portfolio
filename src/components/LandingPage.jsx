import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function LandingPage() {
  return (
    <section className="page home-page">
      <div className="page-shell home-index">
        <p className="home-name">Ivan Bardziyan</p>
        <h1>
          Computer engineering student building software and writing about systems,
          machine learning, and product work.
        </h1>
        <p className="home-summary">
          Based in Toronto and Kingston. Currently working as a Data Science Intern at
          M2M Technologies and studying at Queen&apos;s University.
        </p>

        <div className="home-links" aria-label="Site index">
          <Link to="/blog" className="home-link">
            <span className="home-link-title">Writing</span>
            <span className="home-link-copy">Notes on embedded systems, machine learning, and internships.</span>
          </Link>

          <Link to="/projects" className="home-link">
            <span className="home-link-title">Projects</span>
            <span className="home-link-copy">Software projects, experiments, and things I&apos;ve built.</span>
          </Link>

          <Link to="/about" className="home-link">
            <span className="home-link-title">About</span>
            <span className="home-link-copy">Background, current work, and what I want to keep doing.</span>
          </Link>
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
        </div>
      </div>
    </section>
  );
}
