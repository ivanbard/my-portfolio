import { motion } from 'framer-motion';
import { FiCalendar, FiBriefcase, FiBookOpen } from 'react-icons/fi';
import '../styles/Experience.css';

const experiences = [
  {
    type: 'education',
    title: "Computer Engineering",
    organization: "Queen's University",
    location: "Kingston, ON",
    period: "2023 - Present",
    description: "Pursuing a degree in Computer Engineering with a focus on software development and data science.",
    current: true
  },
  // Add more experiences here as needed
  // {
  //   type: 'work',
  //   title: "Software Developer Intern",
  //   organization: "Company Name",
  //   location: "Toronto, ON",
  //   period: "Summer 2024",
  //   description: "Worked on building web applications using React and Node.js.",
  //   current: false
  // }
];

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Experience</h2>
          <p className="section-subtitle">My educational journey and professional experience</p>
        </motion.div>

        <motion.div 
          className="experience-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className={`timeline-item ${exp.current ? 'current' : ''}`}
              variants={itemVariants}
            >
              <div className="timeline-marker">
                <div className="marker-icon">
                  {exp.type === 'education' ? <FiBookOpen /> : <FiBriefcase />}
                </div>
                {index < experiences.length - 1 && <div className="timeline-line" />}
              </div>
              
              <div className="timeline-content">
                <div className="timeline-card">
                  <div className="timeline-header">
                    <div className="timeline-title-group">
                      <h3 className="timeline-title">{exp.title}</h3>
                      <span className="timeline-org">{exp.organization}</span>
                    </div>
                    <div className="timeline-meta">
                      <span className="timeline-period">
                        <FiCalendar size={14} />
                        {exp.period}
                      </span>
                      {exp.current && <span className="current-badge">Current</span>}
                    </div>
                  </div>
                  <p className="timeline-description">{exp.description}</p>
                  <span className="timeline-location">{exp.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
