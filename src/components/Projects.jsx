//import './styles/Projects.css';

const projects = [
  { title: 'Proj A', desc: '…', link: 'https://…' },
  { title: 'Proj B', desc: '…', link: 'https://…' },
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <h2>Recent Projects</h2>
      <div className="projects-grid">
        {projects.map(p =>
          <div key={p.title} className="project-card">
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <a href={p.link} target="_blank">View</a>
          </div>
        )}
      </div>
      <a href="/projects" className="more-link">More projects →</a>
    </section>
  );
}