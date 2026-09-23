import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GitHubChart from './GitHubChart';
import sections from '../data/sections';
import '../styles/Home.css';

const sectionCopy = {
  writing: 'Notes on systems and machine learning.',
  projects: 'Software projects and experiments.',
  about: 'Background and current work.',
};

const locations = {
  minsk: { name: 'Minsk', image: '/images/locations/minsk.jpg', caption: 'Where I was born.' },
  toronto: { name: 'Toronto', image: '/images/locations/toronto.jpg', caption: 'Where I live now.' },
  kingston: { name: 'Kingston', image: '/images/locations/kingston.jpg', caption: "Where I study at Queen's University." },
};

export default function LandingPage() {
  const [activeLocation, setActiveLocation] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const introRef = useRef(null);

  const showLocation = (location) => {
    setActiveLocation(location);
    setImageLoaded(false);
  };

  const cityLink = (key) => (
    <span className="home-city-anchor">
      <button
        className="home-city-link"
        type="button"
        aria-pressed={activeLocation === key}
        aria-controls={activeLocation ? 'home-location-preview' : undefined}
        onPointerEnter={(event) => event.pointerType === 'mouse' && showLocation(key)}
        onFocus={() => showLocation(key)}
        onClick={() => showLocation(key)}
      >
        {locations[key].name}
      </button>
      {activeLocation === key && (
        <span className="home-location-preview" id="home-location-preview" aria-live="polite">
          <button className="home-location-close" type="button" aria-label="Close location preview" onClick={() => showLocation(null)}>{'\u00d7'}</button>
          <span className="home-location-image">
            {!imageLoaded && <span>Photo coming soon.</span>}
            <img
              src={locations[key].image}
              alt={`${locations[key].name} city view`}
              className={imageLoaded ? 'is-loaded' : ''}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)}
            />
          </span>
          <span className="home-location-caption"><strong>{locations[key].name}</strong><span>{locations[key].caption}</span></span>
        </span>
      )}
    </span>
  );

  return (
    <section className="page home-page">
      <div className="page-shell home-index">
        <div
          className="home-location-group"
          ref={introRef}
          onPointerLeave={(event) => {
            if (event.pointerType === 'mouse' && !introRef.current?.contains(document.activeElement)) {
              setActiveLocation(null);
            }
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setActiveLocation(null);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setActiveLocation(null);
          }}
        >
          <p className="home-intro-line">
            I was born in {cityLink('minsk')}, and now live in {cityLink('toronto')}.
          </p>
          <p className="home-intro-line">
            I currently study computer engineering at <a href="https://www.queensu.ca/">Queen's University</a> out in {cityLink('kingston')}.
          </p>

        </div>
        <p className="home-intro-line">
          Previously, I was a data engineer at <a href="https://www.rbcroyalbank.com/personal.html">RBC</a>, in the <a href="https://jobs.rbc.com/ca/en/amplify">Amplify program</a>. Prior to that, I was at <a href="https://m2mtechconnect.com/">Mind 2 Machine</a> researching, building, and implementing models for clients.
          Additionally, I spent some time at <a href="https://www.tehn.ca/">Michael Garron Hospital</a> working with data.
        </p>
        <p className="home-intro-line">
          I like working and learning about low-level systems, and sometimes I <Link to="/blog">write</Link>.
        </p>

        <GitHubChart />

        <div className="home-links" aria-label="Site index">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.key}
                to={section.to}
                className="home-link"
                style={{ '--section-accent': section.color }}
              >
                <span className="home-link-text">
                  <span className="home-link-title">{section.name}</span>
                  <span className="home-link-copy">{sectionCopy[section.key]}</span>
                </span>
                <span className="home-link-icon" aria-hidden="true">
                  <Icon size={16} />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="home-socials" aria-label="Contact and social links">
          <a href="mailto:ivanbardziyan@gmail.com" className="home-social-link">
            Email
          </a>
          <a href="https://github.com/ivanbard" target="_blank" rel="noreferrer" className="home-social-link">
            GitHub
          </a>
          <a href="https://linkedin.com/in/ivanbardziyan" target="_blank" rel="noreferrer" className="home-social-link">
            LinkedIn
          </a>
          <a href="https://x.com/ivanbardziyan" target="_blank" rel="noreferrer" className="home-social-link">
            X
          </a>
        </div>
      </div>
    </section>
  );
}
