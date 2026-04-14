import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer-inner">
        <div>
          <p className="site-footer-title">Ivan Bardziyan</p>
          <p className="site-footer-copy">Writing about systems, software, and the work behind the interface.</p>
        </div>

        <nav className="site-footer-links" aria-label="Footer">
          <Link to="/blog">Writing</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
          <a href="mailto:ivanbardziyan@gmail.com">Email</a>
        </nav>
      </div>
    </footer>
  );
}
