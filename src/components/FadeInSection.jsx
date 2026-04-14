import { motion as Motion } from 'framer-motion';

export default function FadeInSection({ children, delay = 0, className = '' }) {
  return (
    <Motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </Motion.div>
  );
}
