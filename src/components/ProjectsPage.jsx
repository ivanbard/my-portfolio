import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiArrowLeft } from 'react-icons/fi';
import '../styles/ProjectsPage.css';

const allProjects = [
  {
    title: 'Walking/Jumping Identifier',
    desc: 'A recognition model which identifies if user is walking or jumping from accelerometer data. Built with Python, scikit-learn, and accelerometer sensors.',
    img: '/images/walkingrunning.png',
    link: 'https://github.com/ivanbard/walking-running-292',
    github: 'https://github.com/ivanbard/walking-running-292',
    tags: ['Python', 'ML', 'Data Science']
  },
  {
    title: 'muscl3.com',
    desc: 'Interactive 3D muscle map and exercise recommender. Visualize muscles and get personalized workout suggestions.',
    img: '/images/muscl3.png',
    link: 'https://muscl3.com',
    tags: ['React', '3D', 'Health Tech']
  },
  {
    title: 'bardz.ca',
    desc: 'Personal portfolio website built with React, featuring modern design, animations, and interactive elements.',
    img: '/images/ivanbard.png',
    link: 'https://bardz.ca',
    github: 'https://github.com/ivanbard/my-portfolio',
    tags: ['React', 'Framer Motion', 'CSS']
  },
  {
    title: 'To-Do App',
    desc: 'A full-stack to-do list application built to learn Django framework fundamentals and backend development.',
    img: '/images/todo.png',
    link: 'https://github.com/ivanbard/todoapp',
    github: 'https://github.com/ivanbard/todoapp',
    tags: ['Django', 'Python', 'Full Stack']
  },
  {
    title: 'Twitter/X Recreation',
    desc: 'A command line Twitter/X recreation in C to showcase data structures and algorithms knowledge.',
    img: '/images/socialmedia.png',
    link: 'https://github.com/ivanbard/C-Social-Media',
    github: 'https://github.com/ivanbard/C-Social-Media',
    tags: ['C', 'DSA', 'CLI']
  },
];

export default function ProjectsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="projects-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="back-link">
            <FiArrowLeft size={18} />
            Back to Home
          </Link>
          
          <div className="page-header">
            <h1>All Projects</h1>
            <p className="page-subtitle">A collection of my work and side projects</p>
          </div>
        </motion.div>

        <motion.div 
          className="projects-page-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {allProjects.map((project) => (
            <motion.article 
              key={project.title} 
              className="project-page-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="project-page-image-wrapper">
                <img
                  src={project.img}
                  alt={project.title}
                  className="project-page-image"
                />
                <div className="project-page-overlay">
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

              <div className="project-page-content">
                <h2 className="project-page-title">{project.title}</h2>
                <p className="project-page-desc">{project.desc}</p>
                
                <div className="project-page-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-page-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}