import { FaGithub, FaLinkedin } from 'react-icons/fa';
//import './styles/Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <h1>Hey, I’m Ivan</h1>
      <p>Current Computer Engineering Student @ Queen’s University<br/>interested in data science and UI/UX.</p>
      <div className="hero-actions">
        <a href="https://github.com/yourusername" target="_blank"><FaGithub className="icon" /></a>
        <a href="https://linkedin.com/in/yourname" target="_blank"><FaLinkedin className="icon" /></a>
        <a href="/resume.pdf" target="_blank" className="resume-btn">Resume</a>
      </div>
    </section>
  );
}