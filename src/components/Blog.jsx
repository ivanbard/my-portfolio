import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiClock } from 'react-icons/fi';
import '../styles/Blog.css';

// Blog posts data - add your posts here
const blogPosts = [
  {
    id: 'building-recommendation-engine',
    title: 'Building a Vacation Recommendation Engine with Python',
    excerpt: 'How I built a recommendation system using Scikit-learn and GCP that improved accuracy by 15%.',
    date: 'Jan 2026',
    readTime: '5 min read',
    tags: ['Python', 'ML', 'GCP'],
  },
  {
    id: 'getting-started-with-xgboost',
    title: 'Getting Started with XGBoost for Prediction Models',
    excerpt: 'A beginner-friendly guide to using XGBoost for building powerful prediction models.',
    date: 'Dec 2025',
    readTime: '8 min read',
    tags: ['Machine Learning', 'XGBoost', 'Data Science'],
  },
  {
    id: 'my-internship-journey',
    title: 'My Data Science Internship Journey',
    excerpt: 'Reflections on my experiences as a data science intern and lessons learned along the way.',
    date: 'Nov 2025',
    readTime: '4 min read',
    tags: ['Career', 'Internship', 'Advice'],
  },
];

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

// Export posts for use in other components
export { blogPosts };
