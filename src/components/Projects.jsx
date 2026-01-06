import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import '../styles/Projects.css';

const projects = [
  {
    title: 'Walking/Jumping Identifier',
    desc: 'Machine learning model that identifies walking vs jumping patterns using accelerometer data. Built with Python and scikit-learn.',
    img: '/images/walkingrunning.png',
    link: 'https://github.com/ivanbard/walking-running-292',
    github: 'https://github.com/ivanbard/walking-running-292',
    tags: ['Python', 'ML', 'Data Science']
  },
  {
    title: 'bardz.ca',
    desc: 'Personal portfolio website built with React, featuring modern design, animations, and interactive elements.',
    img: '/images/ivanbard.png',
    link: 'https://bardz.ca',
    github: 'https://github.com/ivanbard/my-portfolio',
    tags: ['React', 'Framer Motion', 'CSS']
  }
];

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 1
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Featured Projects</h2>
          <p className="section-subtitle">Some of my recent work</p>
        </motion.div>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project) => (
            <motion.article 
              key={project.title} 
              className="project-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="project-image-wrapper">
                <img
                  src={project.img}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-overlay">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="overlay-btn">
                    <FiExternalLink size={20} />
                  </a>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="overlay-btn">
                      <FiGithub size={20} />
                    </a>
                  )}
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>

                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  View Project <FiArrowRight size={16} />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div 
          className="projects-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a href="/projects" className="btn btn-secondary">
            View All Projects
            <FiArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}