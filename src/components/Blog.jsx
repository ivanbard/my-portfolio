import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiClock } from 'react-icons/fi';
import blogPosts from '../data/blogPosts';
import '../styles/Blog.css';

export default function Blog() {
  return (
    <section id="blog" className="blog-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Blog</h2>
          <p className="section-subtitle">Thoughts, tutorials, and insights</p>
        </motion.div>

        <motion.div 
          className="blog-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {blogPosts.slice(0, 3).map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className="blog-card"
            >
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="blog-date">
                    <FiCalendar size={14} />
                    {post.date}
                  </span>
                  <span className="blog-read-time">
                    <FiClock size={14} />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                
                <div className="blog-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
                
                <span className="blog-card-link">
                  Read more <FiArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </motion.div>

        <motion.div 
          className="blog-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/blog" className="btn btn-secondary">
            View All Posts
            <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
