import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import blogPosts from '../data/blogPosts';
import '../styles/Blog.css';

export default function Blog() {
  return (
    <section className="blog-section">
      <div className="page-shell">
        <Motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p className="section-kicker">Writing</p>
          <h2>Recent notes on systems, engineering, and learning in public.</h2>
          <p className="section-description">
            The site now opens with writing because that is where the reasoning behind the work lives.
          </p>
        </Motion.div>

        <Motion.div
          className="editorial-list"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {blogPosts.slice(0, 3).map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="editorial-list-item">
              <div className="editorial-item-meta">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>

              <div className="editorial-item-main">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>

              <div className="editorial-item-tags">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <span className="editorial-arrow">
                Read <FiArrowRight size={16} />
              </span>
            </Link>
          ))}
        </Motion.div>

        <Motion.div
          className="section-actions"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ delay: 0.05, duration: 0.35 }}
        >
          <Link to="/blog" className="text-link">
            Browse all posts <FiArrowRight size={16} />
          </Link>
        </Motion.div>
      </div>
    </section>
  );
}
