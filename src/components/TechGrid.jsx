//import './styles/TechGrid.css';

const tech = [ 'React', 'Node', 'Python', /*…8 total*/ ];

export default function TechGrid() {
  return (
    <section id="tech" className="tech-section">
      <h2>Current Tech</h2>
      <p>I am proficient in many technologies, but I use these the most.</p>
      <div className="tech-grid">
        {tech.map((t) =>
          <div key={t} className="tech-card">{t}</div>
        )}
      </div>
    </section>
  );
}