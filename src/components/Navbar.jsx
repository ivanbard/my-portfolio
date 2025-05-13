import React from 'react';
import { Link } from 'react-router-dom'; // or use <a href="#section">
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className='navbar-inner'>
        <Link to="/" className="logo">ivanbard</Link>
        <ul className="nav-links">
          <li><a href="/#hero">Home</a></li>
          <li><a href="/#tech">Tech</a></li>
          <li><a href="/#projects">Projects</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}