import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ProjectsPage from './components/ProjectsPage';

import './styles/globals.css';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;