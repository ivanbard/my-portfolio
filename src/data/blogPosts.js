// Blog posts data - edit this file to add/remove/modify blog posts
// Each post needs: id (URL slug), title, date, excerpt, tags, readTime, and content

const blogPosts = [
    {
      id: 'embedded-systems-intro',
      title: 'What is an embedded system? An intro from my background',
      date: 'Jan 2026',
      excerpt: 'An introduction to embedded systems from my personal background and experience.',
      tags: ['Embedded Systems', 'Introduction', 'Technology'],
      readTime: '5 min read',
      content: `
  ## What is an embedded system?

  An embedded system is a specialized and particularly designed system that uses computer-based logic and techniques to perform very specific actions and functions.

  ## Examples
  Some common examples of embedded systems include:
  - Household appliances (e.g., microwaves, washing machines)
  - Automotive systems (e.g., anti-lock braking systems, airbag control)
  - Medical devices (e.g., pacemakers, infusion pumps)
  - Consumer electronics (e.g., smartphones, smart TVs)

  Each of these items is made to perform a very specific task, and they are optimized for that task to minimize cost, size, and power consumption.
  This is normally done through a specifically designed microcontroller or microprocessor that is programmed to perform the required functions, however, it can also be done through the use of FPGAs or ASICs.
  These boards allow you to create custom hardware, through programming, to perform specific tasks as needed without designing and ordering custom silicon.

  ## My Background
  My interest in embedded systems began during my high school years when I started experimenting with microcontrollers like Arduino and Raspberry Pi.
  I enjoyed the hands-on aspect of building projects that combined both hardware and software components.
  This experience sparked my curiosity about how everyday devices work and led me to pursue a degree in Computer Engineering, and expand my knowledge in this field.

  Throughout my academic journey, I have had the opportunity to work on various projects involving embedded systems, such as designing a home automation system and developing a wearable health monitoring device.
  These experiences have deepened my understanding of the challenges and intricacies involved in embedded system design, including real-time constraints, power management, and hardware-software integration.

  In the future I want to get to work with more intricate embedded systems, particularly those used in automotive and aerospace applications, where reliablity and safety are aspects of utmost importance.

  ## Conclusion
  Embedded systems are an integral part of modern technology, and they play a crucial role in various industries.
  My background and experiences have fueled my passion for this field, and I look forward to exploring more advanced topics and applications in embedded systems in the future.
   `
  },
  {
    id: 'building-recommendation-engine',
    title: 'Building a Vacation Recommendation Engine with Python',
    date: 'Jan 2026',
    excerpt: 'How I built a recommendation system using Scikit-learn and GCP that improved accuracy by 15%.',
    tags: ['Python', 'ML', 'GCP'],
    readTime: '5 min read',
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

  {
    id: 'getting-started-with-xgboost',
    title: 'Getting Started with XGBoost for Prediction Models',
    date: 'Dec 2025',
    excerpt: 'A beginner-friendly guide to using XGBoost for building powerful prediction models.',
    tags: ['Machine Learning', 'XGBoost', 'Data Science'],
    readTime: '8 min read',
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
  {
    id: 'my-internship-journey',
    title: 'My Data Science Internship Journey',
    date: 'Nov 2025',
    excerpt: 'Reflections on my experiences as a data science intern and lessons learned along the way.',
    tags: ['Career', 'Internship', 'Advice'],
    readTime: '4 min read',
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
];

export default blogPosts;

/*
 * HOW TO ADD A NEW BLOG POST:
 * 
 * 1. Copy one of the existing post objects above
 * 2. Change the id to a URL-friendly slug (e.g., 'my-new-post')
 * 3. Update title, date, excerpt, tags, and readTime
 * 4. Write your content using markdown syntax:
 *    - ## for main headings
 *    - ### for subheadings
 *    - - for bullet points
 *    - 1. for numbered lists
 *    - **text** for bold
 *    - ```language for code blocks
 * 
 * The post will automatically appear on the blog page and landing page!
 */
