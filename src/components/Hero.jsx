import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import { FiMapPin, FiArrowRight } from 'react-icons/fi';
import '../styles/Hero.css';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useRef, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Don't initialize if container isn't ready
    if (!mapContainerRef.current) return;

    const mapStyle = theme === 'dark' 
      ? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
      : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

    // Safely remove existing map
    if (mapRef.current) {
      try {
        mapRef.current.remove();
      } catch {
        // Map already removed, ignore
      }
      mapRef.current = null;
    }

    try {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: mapStyle,
        center: [-79.387083, 43.642556],
        zoom: 10,
        attributionControl: false,
        interactive: true
      });

      mapRef.current = map;

      map.on('load', () => {
        new maplibregl.Marker({ color: '#8b5cf6' })
          .setLngLat([-79.387083, 43.642556])
          .addTo(map);
        
        new maplibregl.Marker({ color: '#3b82f6' })
          .setLngLat([-76.49512428602218, 44.225376158376385])
          .addTo(map);
      });

      map.addControl(new maplibregl.NavigationControl(), 'top-right');
    } catch (error) {
      console.error('Error initializing map:', error);
    }
    
    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch {
          // Ignore cleanup errors
        }
        mapRef.current = null;
      }
    };
  }, [theme]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 1
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <Motion.div 
          className="hero-bento-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main intro card */}
          <Motion.div className="bento-card bento-main" variants={itemVariants}>
            <div className="hero-intro">
              <span className="hero-greeting">Hey, I'm</span>
              <h1 className="hero-name">
                <span className="gradient-text">Ivan Bardziyan</span>
              </h1>
              <p className="hero-tagline">
                Computer Engineering Student passionate about building 
                beautiful, functional digital experiences.
              </p>
              <div className="hero-cta">
                <a href="#projects" className="btn btn-primary">
                  View Projects
                  <FiArrowRight />
                </a>
                <a href="/resume.pdf" className="btn btn-secondary">
                  <FaFileAlt />
                  Resume
                </a>
              </div>
            </div>
          </Motion.div>

          {/* Map card */}
          <Motion.div className="bento-card bento-map" variants={itemVariants}>
            <div className="map-container" ref={mapContainerRef} />
            <div className="location-badge">
              <FiMapPin />
              <span>Toronto, ON</span>
            </div>
          </Motion.div>

          {/* Status card */}
          <Motion.div className="bento-card bento-status" variants={itemVariants}>
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span>Open to opportunities</span>
            </div>
            <p className="status-text">Currently studying at Queen's University</p>
          </Motion.div>

          {/* Social links card */}
          <Motion.div className="bento-card bento-social" variants={itemVariants}>
            <h3 className="bento-card-title">Connect</h3>
            <div className="social-links">
              <a href="https://github.com/ivanbard" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub size={22} />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/ivanbardziyan" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin size={22} />
                <span>LinkedIn</span>
              </a>
            </div>
          </Motion.div>

          {/* Interests card */}
          <Motion.div className="bento-card bento-interests" variants={itemVariants}>
            <h3 className="bento-card-title">Interests</h3>
            <div className="interest-tags">
              <span className="tag">Data Science</span>
              <span className="tag">UI/UX Design</span>
              <span className="tag">Web Dev</span>
              <span className="tag">Machine Learning</span>
            </div>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
}
