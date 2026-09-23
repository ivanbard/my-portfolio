import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GitHubChart from './GitHubChart';
import sections from '../data/sections';
import locations from '../data/locations';
import '../styles/Home.css';

const sectionCopy = {
  writing: 'Notes on systems and machine learning.',
  projects: 'Software projects and experiments.',
  about: 'Background and current work.',
};

export default function LandingPage() {
  const [activeLocation, setActiveLocation] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);
  const [isPreviewFocused, setIsPreviewFocused] = useState(false);
  const [isPreviewClosing, setIsPreviewClosing] = useState(false);
  const introRef = useRef(null);
  const closeTimerRef = useRef(null);

  const showLocation = (location) => {
    window.clearTimeout(closeTimerRef.current);
    setIsPreviewClosing(false);
    if (location !== activeLocation) {
      setImageIndex(0);
      setImageLoaded(false);
      setIsPreviewHovered(false);
      setIsPreviewFocused(false);
    }
    setActiveLocation(location);
  };

  const closeLocation = () => {
    if (!activeLocation) return;

    setIsPreviewClosing(true);
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setActiveLocation(null);
      setIsPreviewClosing(false);
      setIsPreviewHovered(false);
      setIsPreviewFocused(false);
    }, 180);
  };

  const advanceImage = (location) => {
    setImageLoaded(false);
    setImageIndex((index) => (index + 1) % locations[location].photos.length);
  };

  useEffect(() => {
    if (!activeLocation || isPreviewHovered || isPreviewFocused || isPreviewClosing) return undefined;

    const timer = window.setTimeout(() => {
      setImageLoaded(false);
      setImageIndex((index) => (index + 1) % locations[activeLocation].photos.length);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [activeLocation, imageIndex, isPreviewHovered, isPreviewFocused, isPreviewClosing]);

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

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
        <span
          className={`home-location-preview${isPreviewClosing ? ' is-closing' : ''}`}
          id="home-location-preview"
          onPointerEnter={(event) => event.pointerType === 'mouse' && setIsPreviewHovered(true)}
          onPointerLeave={(event) => event.pointerType === 'mouse' && setIsPreviewHovered(false)}
          onFocusCapture={() => setIsPreviewFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsPreviewFocused(false);
          }}
        >
          <button className="home-location-close" type="button" aria-label="Close location preview" onClick={closeLocation}>{'\u00d7'}</button>
          <button
            className="home-location-image"
            type="button"
            aria-label={`Show next ${locations[key].name} photo`}
            onClick={() => advanceImage(key)}
          >
            {!imageLoaded && <span className="home-location-placeholder">Photo coming soon.</span>}
            <img
              src={locations[key].photos[imageIndex].src}
              alt={`${locations[key].name} view ${imageIndex + 1}`}
              className={imageLoaded ? 'is-loaded' : ''}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)}
            />
            <span className="home-location-image-count" aria-hidden="true">{imageIndex + 1} / {locations[key].photos.length}</span>
          </button>
          <span className="home-location-caption">
            <strong>{locations[key].name}</strong>
            {locations[key].photos[imageIndex].caption && <span>{locations[key].photos[imageIndex].caption}</span>}
          </span>
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
              closeLocation();
            }
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) closeLocation();
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') closeLocation();
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
