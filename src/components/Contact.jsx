import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiArrowUpRight } from 'react-icons/fi';
import '../styles/Contact.css';

const contactLinks = [
  {
    name: 'Email',
    value: 'ivanbardziyan@gmail.com',
    href: 'mailto:ivanbardziyan@gmail.com',
    icon: <FiMail size={24} />,
    description: 'Drop me a line'
  },
  {
    name: 'GitHub',
    value: '@ivanbard',
    href: 'https://github.com/ivanbard',
    icon: <FiGithub size={24} />,
    description: 'Check out my code'
  },
  {
    name: 'LinkedIn',
    value: 'Ivan Bardziyan',
    href: 'https://linkedin.com/in/ivanbardziyan',
    icon: <FiLinkedin size={24} />,
    description: "Let's connect"
  }
];

export default function Contact() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div 
          className="contact-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-header">
            <h2>Let's Work Together</h2>
            <p className="contact-subtitle">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>

          <motion.div 
            className="contact-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="contact-card"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="contact-card-icon">{link.icon}</div>
                <div className="contact-card-content">
                  <span className="contact-card-name">{link.name}</span>
                  <span className="contact-card-value">{link.value}</span>
                  <span className="contact-card-desc">{link.description}</span>
                </div>
                <FiArrowUpRight className="contact-card-arrow" size={20} />
              </motion.a>
            ))}
          </motion.div>

          <div className="contact-footer">
            <p>Based in <span className="gradient-text">Toronto, Ontario</span></p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}