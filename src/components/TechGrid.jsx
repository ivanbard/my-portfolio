//import React from 'react';
import '../styles/TechGrid.css';
import { SiPython, SiReact, SiNodedotjs, SiFigma, SiC, SiJavascript, SiDjango } from "react-icons/si";
import { FaJava } from "react-icons/fa";

import { motion } from 'framer-motion';

const techData = [
  { name: 'React.js',    icon: <SiReact /> },
  { name: 'Node.js',     icon: <SiNodedotjs /> },
  { name: 'Python',      icon: <SiPython /> },
  { name: 'Figma',      icon: <SiFigma /> },
  { name: 'C',      icon: <SiC /> },
  { name: 'JavaScript',      icon: <SiJavascript /> },
  { name: 'Java',      icon: <FaJava /> },
  { name: 'Django',      icon: <SiDjango /> },
];

export default function TechGrid() {
  return (
    <section id="tech" className="tech-section">
      <h2>Current Tech</h2>
      <p>I am proficient in many technologies, but I use these the most.</p>
      <div className="tech-grid">
        {techData.map((t) => (
          <div key={t.name} className="tech-card">
            <div className="tech-icon">{t.icon}</div>
            <div className="tech-label">{t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}