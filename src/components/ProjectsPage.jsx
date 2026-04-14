import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';
import projects from '../data/projects';
import '../styles/ProjectsPage.css';

export default function ProjectsPage() {
  return (
    <section className="page projects-page">
      <div className="page-shell">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <Link to="/" className="back-link">
            <FiArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="page-header">
            <h1>Projects</h1>
            <p className="page-intro">
              A fuller index of things I&apos;ve built, from data-heavy experiments to product-facing side projects.
            </p>
          </div>
        </Motion.div>

        <Motion.div
          className="projects-page-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.45 }}
        >
          {projects.map((project) => (
            <article key={project.title} className="projects-page-item">
              <div className="projects-page-image">
                <img src={project.img} alt={project.title} />
              </div>

              <div className="projects-page-copy">
                <div className="projects-page-header">
                  <h2>{project.title}</h2>
                  <div className="projects-page-links">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-link">
                      Visit <FiExternalLink size={15} />
                    </a>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link">
                        Code <FiGithub size={15} />
                      </a>
                    )}
                  </div>
                </div>

                <p>{project.desc}</p>

                <div className="projects-page-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </Motion.div>
      </div>
    </section>
  );
}
