import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import '../styles/Hero.css';
import maplibregl, { AttributionControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useRef, useEffect } from 'react';
//add an experience section right below my links? add a education and work experience sections with a slider thing
export default function Hero() {
  const mapContainerRef = useRef(null);
  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', 
      center: [-79.387083, 43.642556],
      zoom: 10,
      attributionControl: false
    });

    const marker = new maplibregl.Marker()
      .setLngLat([-79.387083, 43.642556])
      .addTo(map)
    const marker1 = new maplibregl.Marker()
      .setLngLat([-76.49512428602218, 44.225376158376385])
      .addTo(map)
    
    //nav controls
    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    return () => map.remove();
  }, []);


  return (
    <section id="hero" className="hero">
      <div className="map-container" ref={mapContainerRef} />
      <h2>Hey, I'm Ivan</h2>
      <h5 className='location'>Toronto, Ontario</h5>
      <p>Current Computer Engineering Student @ Queen's University<br/>interested in data science and UI/UX.</p>
      <div className="hero-actions">
        <a href="https://github.com/ivanbard" target="_blank"><FaGithub size={28} className="icon" /></a>
        <a href="https://linkedin.com/in/ivanbardziyan" target="_blank"><FaLinkedin size={28} className="icon" /></a>
        <a href="/resume.pdf" className="resume-btn">
          <FaFileAlt size={26} className="icon" />
          Resume
        </a>
      </div>
    </section>
  );
}