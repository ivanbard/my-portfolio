import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ProjectsPage from './components/ProjectsPage';
import BlogPage from './components/BlogPage';
import AboutPage from './components/AboutPage';
import './styles/globals.css';
import './App.css';

const BlogPost = lazy(() => import('./components/BlogPost'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function AppRoutes() {
  return (
    <div className="route-transition">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route
          path="/blog/:slug"
          element={
            <Suspense
              fallback={
                <section className="page route-loading">
                  <div className="page-shell">Loading...</div>
                </section>
              }
            >
              <BlogPost />
            </Suspense>
          }
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-wrapper">
        <Navbar />
        <main className="content">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
