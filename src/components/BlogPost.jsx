import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';
import blogPosts from '../data/blogPosts';
import '../styles/BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  
  const post = blogPosts.find(p => p.id === slug);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Simple markdown-like rendering
  const renderContent = (content) => {
    const lines = content.trim().split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeContent = [];
    let codeLanguage = '';
    
    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3);
          codeContent = [];
        } else {
          elements.push(
            <pre key={index} className="code-block">
              <code>{codeContent.join('\n')}</code>
            </pre>
          );
          inCodeBlock = false;
        }
        return;
      }
      
      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }
      
      // Headers
      if (line.startsWith('## ')) {
        elements.push(<h2 key={index}>{line.slice(3)}</h2>);
        return;
      }
      if (line.startsWith('### ')) {
        elements.push(<h3 key={index}>{line.slice(4)}</h3>);
        return;
      }
      
      // Lists
      if (line.startsWith('- ')) {
        elements.push(<li key={index}>{line.slice(2)}</li>);
        return;
      }
      
      // Numbered lists
      if (/^\d+\.\s/.test(line)) {
        elements.push(<li key={index}>{line.replace(/^\d+\.\s/, '')}</li>);
        return;
      }
      
      // Empty lines
      if (line.trim() === '') {
        return;
      }
      
      // Regular paragraphs
      elements.push(<p key={index}>{line}</p>);
    });
    
    return elements;
  };

  return (
    <article className="blog-post">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/blog" className="back-link">
            <FiArrowLeft size={18} />
            Back to Blog
          </Link>
          
          <header className="blog-post-header">
            <div className="blog-post-meta">
              <span className="blog-date">
                <FiCalendar size={14} />
                {post.date}
              </span>
              <span className="blog-read-time">
                <FiClock size={14} />
                {post.readTime}
              </span>
            </div>
            
            <h1>{post.title}</h1>
            
            <div className="blog-post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-post-tag">{tag}</span>
              ))}
            </div>
          </header>
        </motion.div>

        <motion.div 
          className="blog-post-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {renderContent(post.content)}
        </motion.div>
        
        <motion.div 
          className="blog-post-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/blog" className="btn btn-secondary">
            <FiArrowLeft size={16} />
            Back to All Posts
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
