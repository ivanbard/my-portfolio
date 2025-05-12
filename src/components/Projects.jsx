import React from 'react';
import '../styles/Projects.css';

const projects = [
  {
    title: 'Proj A',
    desc: 'Placeholder information for length Short description of project A.',
    img: '/images/temp.jpg',
    link: '/projects/a'
  },
  {
    title: 'Proj B',
    desc: 'Placeholder information for length Short description of project B.',
    img: '/images/temp.jpg',
    link: '/projects/b'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <h2>Recent Projects</h2>

      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p.title} className="project-card">
            <div className="project-image-frame">
              <img
                src={p.img}
                alt={p.title}
                className="project-image"
              />
            </div>

            <div className="project-info">
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <a href={p.link} className="project-link">View</a>
            </div>
          </div>
        ))}
      </div>

      <a href="/projects" className="more-projects">More projects →</a>
    </section>
  );
}