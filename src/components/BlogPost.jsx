import { useParams, Link, Navigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';
import blogPosts from '../data/blogPosts';
import '../styles/BlogPost.css';

function renderInline(text) {
  return text.split(/(\*\*.*?\*\*)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

function renderMarkdown(content) {
  const lines = content.trim().split('\n');
  const elements = [];
  let paragraph = [];
  let listItems = [];
  let listType = null;
  let inCodeBlock = false;
  let codeLines = [];
  let key = 0;

  const flushParagraph = () => {
    if (!paragraph.length) {
      return;
    }

    elements.push(<p key={`p-${key++}`}>{renderInline(paragraph.join(' '))}</p>);
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) {
      return;
    }

    const items = listItems.map((item, index) => <li key={`li-${key}-${index}`}>{renderInline(item)}</li>);
    elements.push(listType === 'ol' ? <ol key={`ol-${key++}`}>{items}</ol> : <ul key={`ul-${key++}`}>{items}</ul>);
    listItems = [];
    listType = null;
  };

  const flushCode = () => {
    if (!codeLines.length) {
      return;
    }

    elements.push(
      <pre key={`code-${key++}`}>
        <code>{codeLines.join('\n')}</code>
      </pre>
    );
    codeLines = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();

    if (line.startsWith('```')) {
      flushParagraph();
      flushList();

      if (inCodeBlock) {
        flushCode();
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(rawLine);
      return;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      return;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      elements.push(<h2 key={`h2-${key++}`}>{renderInline(line.slice(3))}</h2>);
      return;
    }

    if (line.startsWith('### ')) {
      flushParagraph();
      flushList();
      elements.push(<h3 key={`h3-${key++}`}>{renderInline(line.slice(4))}</h3>);
      return;
    }

    if (line.startsWith('- ')) {
      flushParagraph();
      if (listType && listType !== 'ul') {
        flushList();
      }
      listType = 'ul';
      listItems.push(line.slice(2));
      return;
    }

    if (/^\d+\.\s/.test(line)) {
      flushParagraph();
      if (listType && listType !== 'ol') {
        flushList();
      }
      listType = 'ol';
      listItems.push(line.replace(/^\d+\.\s/, ''));
      return;
    }

    flushList();
    paragraph.push(line);
  });

  flushParagraph();
  flushList();
  flushCode();

  return elements;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((entry) => entry.id === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="page blog-post">
      <div className="page-shell content-narrow">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
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
                <span key={tag} className="blog-post-tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>
        </Motion.div>

        <Motion.div
          className="blog-post-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          {renderMarkdown(post.content)}
        </Motion.div>

        <Motion.div
          className="blog-post-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          <Link to="/blog" className="text-link">
            <FiArrowLeft size={16} />
            Back to all posts
          </Link>
        </Motion.div>
      </div>
    </article>
  );
}
