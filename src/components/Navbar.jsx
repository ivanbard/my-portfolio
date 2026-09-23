import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import sections, { getActiveSection } from '../data/sections';
import '../styles/Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const location = useLocation();
  const selectorRef = useRef(null);
  const activeSection = getActiveSection(location.pathname);
  const selectedOffset = Math.max(0, sections.indexOf(activeSection)) * 1.75;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsSelectorOpen(false);
  }, [location]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!selectorRef.current?.contains(event.target)) {
        setIsSelectorOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSelectorOpen(false);
        if (selectorRef.current?.contains(document.activeElement)) {
          selectorRef.current.querySelector('.nav-selector-trigger')?.focus();
        }
      }
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Ivan Bardziyan
        </Link>

        <div className="navbar-actions">
          <div className="nav-selector" ref={selectorRef}>
            <button
              type="button"
              className="nav-selector-trigger"
              onClick={() => setIsSelectorOpen((open) => !open)}
              aria-expanded={isSelectorOpen}
              aria-label={`Sections, current: ${activeSection?.name ?? 'Home'}`}
              title="Sections"
            >
              <span
                className="nav-selector-trigger-mark"
                style={activeSection ? { '--section-accent': activeSection.color } : undefined}
                aria-hidden="true"
              />
            </button>

            {isSelectorOpen && (
              <div
                className="nav-selector-menu"
                role="group"
                aria-label="Section navigation"
                style={{ '--selected-offset': `${selectedOffset}rem` }}
              >
                {sections.map((section) => {
                  const content = <><span>{section.name}</span><span className="nav-selector-item-marker" aria-hidden="true" /></>;
                  return section.key === activeSection?.key ? (
                    <button key={section.key} type="button" className="nav-selector-item active" style={{ '--section-accent': section.color }} aria-current="page" onClick={() => {
                      setIsSelectorOpen(false);
                      selectorRef.current?.querySelector('.nav-selector-trigger')?.focus();
                    }}>
                      {content}
                    </button>
                  ) : (
                    <NavLink key={section.key} to={section.to} className="nav-selector-item" style={{ '--section-accent': section.color }}>
                      {content}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
