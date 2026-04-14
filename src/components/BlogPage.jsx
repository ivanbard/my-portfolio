import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import blogPosts from '../data/blogPosts';
import '../styles/BlogPage.css';

export default function BlogPage() {
  return (
    <section className="page blog-page">
      <div className="page-shell">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <Link to="/" className="back-link">
            <FiArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="page-header">
            <h1>Writing</h1>
            <p className="page-intro">
              Notes on embedded systems, machine learning, internships, and whatever else seems worth writing down clearly.
            </p>
          </div>
        </Motion.div>

        <Motion.div
          className="blog-page-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="blog-page-item">
              <div className="blog-page-item-meta">
                <span className="blog-date">
                  <FiCalendar size={14} />
                  {post.date}
                </span>
                <span className="blog-read-time">
                  <FiClock size={14} />
                  {post.readTime}
                </span>
              </div>

              <div className="blog-page-item-main">
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </div>

              <div className="blog-page-item-tags">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <span className="blog-page-item-arrow">
                Read post <FiArrowRight size={14} />
              </span>
            </Link>
          ))}
        </Motion.div>
      </div>
    </section>
  );
}
