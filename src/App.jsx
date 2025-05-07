import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechGrid from './components/TechGrid';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './styles/globals.css';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className='content'>
        <Hero />
        <TechGrid />
        <Projects />
        <Contact />
      </main>
    </BrowserRouter>
  );
}

export default App