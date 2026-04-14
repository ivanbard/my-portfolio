import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi';
import projects from '../data/projects';
import '../styles/Projects.css';

export default function Projects() {
  return (
    <section className="projects-section">
      <div className="page-shell">
        <Motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p className="section-kicker">Selected Projects</p>
          <h2>A few pieces of work that show how I like to build.</h2>
          <p className="section-description">
            Less of a grid, more of a reading list: what the project was, how it was built, and where to see it.
          </p>
        </Motion.div>

        <Motion.div
          className="project-feature-list"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {projects.slice(0, 3).map((project) => (
            <article key={project.title} className="project-feature-item">
              <div className="project-feature-image">
                <img src={project.img} alt={project.title} />
              </div>

              <div className="project-feature-copy">
                <div className="project-feature-header">
                  <h3>{project.title}</h3>
                  <div className="project-feature-links">
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

                <div className="project-feature-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </Motion.div>

        <Motion.div
          className="section-actions"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ delay: 0.05, duration: 0.35 }}
        >
          <Link to="/projects" className="text-link">
            View the full project index <FiArrowRight size={16} />
          </Link>
        </Motion.div>
      </div>
    </section>
  );
}
