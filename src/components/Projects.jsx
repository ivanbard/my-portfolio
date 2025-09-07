import React from 'react';
import '../styles/Projects.css';

const projects = [
  {
    title: 'Walking/Jumping Identifier',
    desc: 'Accelerometer identification model',
    img: '/images/walkingrunning.png',
    link: 'https://github.com/ivanbard/walking-running-292'
  },
  {
    title: 'bardz.ca',
    desc: 'A simple portfolio website',
    img: '/images/ivanbard.png',
    link: 'https://bardz.ca'
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