import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import sections, { getActiveSection } from '../data/sections';
import '../styles/Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const location = useLocation();
  const selectorRef = useRef(null);
  const activeSection = getActiveSection(location.pathname);
  const ActiveIcon = activeSection?.icon;

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
              className={`nav-selector-trigger ${isSelectorOpen ? 'open' : ''}`}
              onClick={() => setIsSelectorOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={isSelectorOpen}
              aria-label="Open section selector"
            >
              <span
                className={`nav-selector-icon ${activeSection ? 'active' : ''}`}
                style={activeSection ? { '--section-accent': activeSection.color } : undefined}
              >
                {ActiveIcon ? <ActiveIcon size={14} /> : <FiChevronDown size={14} />}
              </span>
              <span className="nav-selector-label">{activeSection?.name ?? 'Sections'}</span>
              <FiChevronDown className="nav-selector-caret" size={14} />
            </button>

            {isSelectorOpen && (
              <div className="nav-selector-menu" role="menu" aria-label="Section navigation">
                {sections.map((section) => {
                  const Icon = section.icon;

                  return (
                    <NavLink
                      key={section.key}
                      to={section.to}
                      className={({ isActive }) => `nav-selector-item ${isActive ? 'active' : ''}`}
                      style={{ '--section-accent': section.color }}
                      role="menuitem"
                    >
                      <span className="nav-selector-item-icon" aria-hidden="true">
                        <Icon size={15} />
                      </span>
                      <span>{section.name}</span>
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
