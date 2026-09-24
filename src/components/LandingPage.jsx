import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GitHubChart from './GitHubChart';
import experiences from '../data/experience';
import locations from '../data/locations';
import '../styles/Home.css';

function photoIsReady(cache, src) {
  const image = cache.get(src);
  return image?.complete && image.naturalWidth > 0;
}

export default function LandingPage() {
  const [activeLocation, setActiveLocation] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);
  const [isPreviewFocused, setIsPreviewFocused] = useState(false);
  const [isPreviewClosing, setIsPreviewClosing] = useState(false);
  const introRef = useRef(null);
  const closeTimerRef = useRef(null);
  const preloadedPhotosRef = useRef(new Map());

  const showLocation = (location) => {
    for (const { src } of locations[location].photos) {
      if (preloadedPhotosRef.current.has(src)) continue;
      const image = new Image();
      preloadedPhotosRef.current.set(src, image);
      image.onerror = () => preloadedPhotosRef.current.delete(src);
      image.src = src;
    }
    window.clearTimeout(closeTimerRef.current);
    setIsPreviewClosing(false);
    if (location !== activeLocation) {
      setImageIndex(0);
      setImageLoaded(photoIsReady(preloadedPhotosRef.current, locations[location].photos[0].src));
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
    const nextIndex = (imageIndex + 1) % locations[location].photos.length;
    setImageLoaded(photoIsReady(preloadedPhotosRef.current, locations[location].photos[nextIndex].src));
    setImageIndex(nextIndex);
  };

  useEffect(() => {
    if (!activeLocation || isPreviewHovered || isPreviewFocused || isPreviewClosing) return undefined;

    const timer = window.setTimeout(() => {
      const nextIndex = (imageIndex + 1) % locations[activeLocation].photos.length;
      setImageLoaded(photoIsReady(preloadedPhotosRef.current, locations[activeLocation].photos[nextIndex].src));
      setImageIndex(nextIndex);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [activeLocation, imageIndex, isPreviewHovered, isPreviewFocused, isPreviewClosing]);

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

  const cityLink = (key, suffix = '') => (
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
      {suffix}
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
            I was born in {cityLink('minsk')}, and now live in {cityLink('toronto', '.')}
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
          I like learning about low-level systems, creating <Link to="/projects">projects</Link>, and occasionally <Link to="/blog">writing</Link>.
        </p>

        <GitHubChart />

        <section id="experience" className="home-experience" aria-labelledby="home-experience-title">
          <h2 id="home-experience-title">Experience</h2>
          <div className="home-experience-list">
            {experiences.map((item) => (
              <article key={`${item.organization}-${item.period}`} className="home-experience-item">
                <div className="home-experience-header">
                  <h3>{item.title}</h3>
                  <p>{item.organization}</p>
                </div>
                <p className="home-experience-period">
                  <span>{item.period}</span>
                  <span>{item.location}</span>
                </p>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

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
