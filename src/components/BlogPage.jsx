import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import blogPosts from '../data/blogPosts';
import '../styles/BlogPage.css';

export default function BlogPage() {
  return (
    <section className="page blog-page">
      <div className="page-shell">
        <Link to="/" className="back-link">
          <FiArrowLeft size={16} />
          Back
        </Link>

        <div className="page-header">
          <h1>Writing</h1>
          <p className="page-intro">
            Notes on embedded systems, machine learning, internships, and whatever else seems worth writing down clearly.
          </p>
        </div>

        <div className="blog-page-list">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="blog-page-item">
              <p className="blog-page-date">{post.date}</p>
              <h2>{post.title}</h2>
              <p className="blog-page-excerpt">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
