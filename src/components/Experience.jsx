import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import experiences from '../data/experience';
import '../styles/Experience.css';

export default function Experience() {
  return (
    <section className="experience-section">
      <div className="page-shell">
        <Motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p className="section-kicker">Experience</p>
          <h2>A quick view of the academic and professional thread so far.</h2>
        </Motion.div>

        <Motion.div
          className="experience-list"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {experiences.map((exp) => (
            <article key={`${exp.organization}-${exp.period}`} className="experience-item">
              <div className="experience-meta">
                <span>{exp.period}</span>
                <span>{exp.location}</span>
              </div>

              <div className="experience-copy">
                <h3>
                  {exp.title}
                  <span>{exp.organization}</span>
                </h3>
                <p>{exp.description}</p>
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
          <Link to="/about" className="text-link">
            Read the longer background <FiArrowRight size={16} />
          </Link>
        </Motion.div>
      </div>
    </section>
  );
}
