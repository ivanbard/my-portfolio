import { motion } from 'framer-motion';
import { FiCalendar, FiBriefcase, FiBookOpen } from 'react-icons/fi';
import '../styles/Experience.css';

const experiences = [
  {
    type: 'work',
    title: "Data Science Intern",
    organization: "M2M Technologies",
    location: "Toronto, ON",
    period: "Mar 2025 - Present",
    description: "Developed and implemented a vacation recommendation search engine using Python, Scikit-learn, and GCP, allowing the client to suggest accurate vacation packages to users based on their preferences and past behavior. Improved recommendation accuracy by 15% through data preprocessing, feature engineering, and model tuning. Collaborated with cross-functional teams to optimize data pipelines and develop an XGBoost model for enhanced wave energy converter location prediction performance. Designed and integrated an LLM-based journal prompt generation and analysis tool using OpenAI's API and deployed on AWS, enhancing user engagement, and optimizing users mental health journeys.",
    current: true
  },
  {
    type: 'work',
    title: "Data Analyst Intern",
    organization: "Michael Garron Hospital",
    location: "Toronto, ON",
    period: "May 2025 - Aug 2025",
    description: "Developed and implemented data visualization dashboards using Python, SQL, and PowerBI to help hospital staff monitor and understand the IPP teams load and metrics for optimal resource allocation and referral planning. Developed a virtual simulation lab environment using FrameVR to facilitate remote training for hospital staff and easier onboarding of new team members and procedure refreshes.",
    current: false
  },
  {
    type: 'education',
    title: "Computer Engineering",
    organization: "Queen's University",
    location: "Kingston, ON",
    period: "2023 - Present",
    description: "Pursuing a degree in Computer Engineering with a focus on software development and data science.",
    current: true
  },
];

export default function Experience() {
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
