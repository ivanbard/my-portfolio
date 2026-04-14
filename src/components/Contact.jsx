import { motion as Motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import '../styles/Contact.css';

const contactLinks = [
  {
    name: 'Email',
    value: 'ivanbardziyan@gmail.com',
    href: 'mailto:ivanbardziyan@gmail.com',
    description: 'For opportunities, collaboration, or a good technical conversation.',
  },
  {
    name: 'GitHub',
    value: '@ivanbard',
    href: 'https://github.com/ivanbard',
    description: 'Code, experiments, and project repositories.',
  },
  {
    name: 'LinkedIn',
    value: 'Ivan Bardziyan',
    href: 'https://linkedin.com/in/ivanbardziyan',
    description: 'Professional background and current work.',
  },
];

export default function Contact() {
  return (
    <section className="contact-section">
      <div className="page-shell">
        <Motion.div
          className="contact-wrapper"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="contact-header">
            <p className="section-kicker">Contact</p>
            <h2>If something here feels relevant, send me a note.</h2>
            <p className="section-description">
              I&apos;m most interested in thoughtful software work, internship opportunities, and teams that care about both technical depth and the final experience.
            </p>
          </div>

          <Motion.div
            className="contact-list"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ delay: 0.05, duration: 0.35 }}
          >
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="contact-item"
              >
                <div className="contact-item-copy">
                  <span className="contact-item-name">{link.name}</span>
                  <strong>{link.value}</strong>
                  <p>{link.description}</p>
                </div>
                <FiArrowUpRight size={18} />
              </a>
            ))}
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
}
