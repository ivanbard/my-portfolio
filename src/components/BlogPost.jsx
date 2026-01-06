import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';
import { blogPosts } from './Blog';
import '../styles/BlogPost.css';

// Blog post content - add your full post content here
const blogPostContent = {
  'building-recommendation-engine': {
    content: `
## Introduction

During my internship at M2M Technologies, I had the opportunity to build a vacation recommendation engine from scratch. This post walks through the key decisions and techniques that helped us achieve a 15% improvement in recommendation accuracy.

## The Challenge

The client needed a system that could suggest vacation packages based on user preferences and past behavior. The main challenges were:

- Handling sparse user data
- Balancing personalization with discovery
- Scaling to handle thousands of users

## Our Approach

We used a hybrid recommendation system combining collaborative filtering and content-based filtering. Here's a high-level overview:

### 1. Data Preprocessing

First, we cleaned and normalized the data, handling missing values and creating meaningful features from raw booking data.

### 2. Feature Engineering

We created features like:
- User preference vectors based on past bookings
- Destination similarity scores
- Seasonal travel patterns

### 3. Model Selection

After experimenting with several approaches, we settled on a combination of:
- Matrix factorization for collaborative filtering
- Gradient boosted trees for content-based recommendations

## Results

The final system achieved:
- 15% improvement in recommendation accuracy
- 23% increase in user engagement
- Sub-100ms response times

## Key Takeaways

1. **Start simple** - We began with basic heuristics before adding ML
2. **Feature engineering matters** - Good features beat complex models
3. **A/B test everything** - Data-driven decisions led to our best improvements

## What's Next?

I'm planning to write more about specific techniques we used. Stay tuned!
    `
  },
  'getting-started-with-xgboost': {
    content: `
## What is XGBoost?

XGBoost (Extreme Gradient Boosting) is one of the most powerful and popular machine learning algorithms for structured/tabular data. It's won countless Kaggle competitions and is widely used in industry.

## Why XGBoost?

- **Performance**: Often achieves state-of-the-art results on tabular data
- **Speed**: Highly optimized implementation
- **Flexibility**: Handles missing values, regularization built-in
- **Interpretability**: Feature importance and SHAP values

## Getting Started

Here's a simple example to get you started:

\`\`\`python
import xgboost as xgb
from sklearn.model_selection import train_test_split

# Load your data
X_train, X_test, y_train, y_test = train_test_split(X, y)

# Create and train model
model = xgb.XGBClassifier(
    n_estimators=100,
    max_depth=6,
    learning_rate=0.1
)
model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)
\`\`\`

## Key Hyperparameters

- **n_estimators**: Number of trees (more = better but slower)
- **max_depth**: Tree depth (controls complexity)
- **learning_rate**: Step size (lower = more robust)

## Tips for Success

1. Start with default parameters
2. Use cross-validation for tuning
3. Watch out for overfitting with deep trees
4. Use early stopping to find optimal n_estimators

## Conclusion

XGBoost is an essential tool in any data scientist's toolkit. Start experimenting with it on your own projects!
    `
  },
  'my-internship-journey': {
    content: `
## How It All Started

When I landed my first data science internship, I had no idea what to expect. This post shares my journey, the challenges I faced, and the lessons I learned along the way.

## The Application Process

I applied to over 50 positions before getting my first offer. Key things that helped:

- **Projects**: Having real projects on GitHub made a huge difference
- **Networking**: Many opportunities came through connections
- **Persistence**: Rejection is part of the process

## My First Day

Walking into the office (well, logging into Slack) for the first time was nerve-wracking. But everyone was incredibly welcoming and helpful.

## Challenges I Faced

### Imposter Syndrome

Feeling like I didn't belong was real. What helped:
- Remembering that everyone was once a beginner
- Asking questions (people love to help!)
- Keeping a "wins" journal

### Technical Gaps

School doesn't teach you everything. I had to learn:
- Version control in team settings
- Code review processes
- Production-grade code practices

## What I Learned

1. **Communication is key** - Technical skills matter, but so does explaining your work
2. **Ask for feedback early** - Don't wait until the end to get input
3. **Document everything** - Future you will thank present you
4. **Build relationships** - Your colleagues are your biggest resource

## Advice for Future Interns

- Say yes to opportunities, even if you're scared
- Don't compare your beginning to someone else's middle
- Take notes obsessively
- Have fun! Internships are for learning

## Looking Forward

These experiences shaped who I am as a developer. I'm grateful for every challenge because each one made me better.
    `
  }
};

export default function BlogPost() {
  const { postId } = useParams();
  
  const post = blogPosts.find(p => p.id === postId);
  const postContent = blogPostContent[postId];
  
  if (!post || !postContent) {
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
          {renderContent(postContent.content)}
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
