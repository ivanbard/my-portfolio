import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ProjectsPage from './components/ProjectsPage';

import './styles/globals.css';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main className="content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;