import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import { blogPosts } from './Blog';
import '../styles/BlogPage.css';

export default function BlogPage() {
  return (
    <section className="blog-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="back-link">
            <FiArrowLeft size={18} />
            Back to Home
          </Link>
          
          <div className="page-header">
            <h1>Blog</h1>
            <p className="page-subtitle">Thoughts, tutorials, and insights from my journey in tech</p>
          </div>
        </motion.div>

        <motion.div 
          className="blog-page-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className="blog-page-card"
            >
              <div className="blog-page-card-content">
                <div className="blog-page-card-meta">
                  <span className="blog-date">
                    <FiCalendar size={14} />
                    {post.date}
                  </span>
                  <span className="blog-read-time">
                    <FiClock size={14} />
                    {post.readTime}
                  </span>
                </div>
                
                <h2 className="blog-page-card-title">{post.title}</h2>
                <p className="blog-page-card-excerpt">{post.excerpt}</p>
                
                <div className="blog-page-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-page-tag">{tag}</span>
                  ))}
                </div>
                
                <span className="blog-page-card-link">
                  Read more <FiArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
