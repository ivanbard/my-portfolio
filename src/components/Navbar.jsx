import React from 'react';
import { Link } from 'react-router-dom'; // or use <a href="#section">
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className='navbar-inner'>
        <Link to="/" className="logo">ivanbard</Link>
        <ul className="nav-links">
          <li><Link to="/#about">About</Link></li>
          <li><Link to="/#tech">Tech</Link></li>
          <li><Link to="/#projects">Projects</Link></li>
          <li><Link to="/#contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}