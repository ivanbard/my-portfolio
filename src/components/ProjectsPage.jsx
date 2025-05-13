import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectsPage.css';

// where the list of projects can be added to 
const allProjects = [
    {
      title: 'Walking/Jumping Identifier',
      desc: 'A recognition model which identifies if user is walking or jumping from accelerometer data',
      img: '/images/walkingrunning.png',
      link: 'https://github.com/ivanbard/walking-running-292'
    },
    {
      title: 'ivanbard.com',
      desc: 'A simple portfolio website',
      img: '/images/ivanbard.png',
      link: 'https://ivanbard.com'
    },
    {
      title: 'To-Do App',
      desc: 'The classic to-do list used to learn Django',
      img: '/images/todo.png',
      link: 'https://github.com/ivanbard/todoapp'
    },
    {
      title: 'Twitter/X Recreation',
      desc: 'A command line Twitter/X recreation in C to showcase DSA knowledge',
      img: '/images/socialmedia.png',
      link: 'https://github.com/ivanbard/C-Social-Media'
    },
  ];

export default function ProjectsPage() {
  return (
    <section className="projects-page">
      <h1>All Projects</h1>

      <div className="projects-page-grid">
        {allProjects.map((p) => (
          <div key={p.title} className="project-page-card">
            <div
              className="project-page-image"
              style={{ backgroundImage: `url(${p.img})` }}
            />
            <div className="project-page-info">
              <h2>{p.title}</h2>
              <p>{p.desc}</p>
              <a href={p.link} target="_blank" rel="noreferrer">
                View
              </a>
            </div>
          </div>
        ))}
      </div>

      <Link to="/" className="back-home">
        ← Back to Home
      </Link>
    </section>
  );
}