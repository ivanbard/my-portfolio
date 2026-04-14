import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import projects from '../data/projects';
import '../styles/ProjectsPage.css';

export default function ProjectsPage() {
  return (
    <section className="page projects-page">
      <div className="page-shell">
        <Link to="/" className="back-link">
          <FiArrowLeft size={16} />
          Back
        </Link>

        <div className="page-header">
          <h1>Projects</h1>
          <p className="page-intro">A simple index of software projects, experiments, and side work.</p>
        </div>

        <div className="projects-page-list">
          {projects.map((project) => (
            <article key={project.title} className="projects-page-item">
              <div className="projects-page-main">
                <h2>{project.title}</h2>
                <p>{project.desc}</p>
              </div>

              <div className="projects-page-meta">
                <div className="projects-page-links">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    Visit
                  </a>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      Code
                    </a>
                  )}
                </div>
                <p className="projects-page-tags">{project.tags.join(' / ')}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
