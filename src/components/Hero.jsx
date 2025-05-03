import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import '../styles/Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <h2>Hey, I’m Ivan</h2>
      <p>Current Computer Engineering Student @ Queen’s University<br/>interested in data science and UI/UX.</p>
      <div className="hero-actions">
        <a href="https://github.com/yourusername" target="_blank"><FaGithub size={28} className="icon" /></a>
        <a href="https://linkedin.com/in/yourname" target="_blank"><FaLinkedin size={28} className="icon" /></a>
        <a href="/resume.pdf" className="resume-btn">
          <FaFileAlt size={26} className="icon" />
          Resume
        </a>
      </div>
    </section>
  );
}