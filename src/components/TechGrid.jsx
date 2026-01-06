import '../styles/TechGrid.css';
import { 
  SiPython, SiReact, SiNodedotjs, SiFigma, SiC, 
  SiTypescript, SiDjango, SiGit, SiPostgresql, SiTailwindcss,
  SiJavascript, SiHtml5
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { motion } from 'framer-motion';

const techCategories = [
  {
    title: "Frontend",
    items: [
      { name: 'React', icon: <SiReact />, color: '#61DAFB' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
    ]
  },
  {
    title: "Backend",
    items: [
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Django', icon: <SiDjango />, color: '#092E20' },
      { name: 'Java', icon: <FaJava />, color: '#007396' },
    ]
  },
  {
    title: "Tools & Other",
    items: [
      { name: 'Git', icon: <SiGit />, color: '#F05032' },
      { name: 'Figma', icon: <SiFigma />, color: '#F24E1E' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
      { name: 'C', icon: <SiC />, color: '#A8B9CC' },
    ]
  }
];

export default function TechGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section id="tech" className="tech-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Tech Stack</h2>
          <p className="section-subtitle">Technologies I work with regularly</p>
        </motion.div>

        <div className="tech-categories">
          {techCategories.map((category, catIndex) => (
            <motion.div 
              key={category.title}
              className="tech-category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <h3 className="category-title">{category.title}</h3>
              <motion.div 
                className="tech-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.items.map((tech) => (
                  <motion.div 
                    key={tech.name}
                    className="tech-card"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    style={{ '--tech-color': tech.color }}
                  >
                    <div className="tech-icon">{tech.icon}</div>
                    <span className="tech-name">{tech.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}