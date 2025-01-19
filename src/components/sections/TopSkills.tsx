'use client';
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface TopSkillsProps {
  onHover: (isHovered: boolean) => void;
}

export default function TopSkills({ onHover }: TopSkillsProps) {
  const skills = [
    // Core Skills (Always visible)
    { text: "Backend Development", color: "yellow", priority: 1 },
    { text: "Cloud Architecture", color: "blue", priority: 1 },
    
    // Primary Technologies (High Priority)
    { text: "AWS", color: "aws", priority: 1 },
    { text: "Azure", color: "azure", priority: 1 },
    { text: "Cloudflare", color: "cloudflare", priority: 1 },
    { text: "Kubernetes", color: "kubernetes", priority: 1 },
    { text: "Docker", color: "docker", priority: 1 },
    { text: "Terraform", color: "terraform", priority: 1 },
    
    // Languages (High Priority)
    { text: "Go", color: "go", priority: 1 },
    { text: "Python", color: "python", priority: 1 },
    { text: "TypeScript", color: "typescript", priority: 1 },
    { text: "Node.js", color: "nodejs", priority: 2 },
    
    // Secondary Tools (Medium Priority)
  
    { text: "Jenkins", color: "jenkins", priority: 2 },
    { text: "GitHub Actions", color: "github", priority: 2 },
    { text: "PostgreSQL", color: "postgresql", priority: 2 },
    { text: "MongoDB", color: "mongodb", priority: 2 },
    { text: "Redis", color: "redis", priority: 2 },
    
    // Monitoring & Security (Medium Priority)
    { text: "Prometheus", color: "prometheus", priority: 2 },
    { text: "Grafana", color: "grafana", priority: 2 },
    { text: "ELK Stack", color: "elastic", priority: 2 },
    { text: "Network Security", color: "purple", priority: 2 },
    
    // Concepts (Lower Priority)
    { text: "System Architecture", color: "pink", priority: 3 },
    { text: "Infrastructure as Code", color: "pink", priority: 3 },
    { text: "CI/CD", color: "accent", priority: 3 },
    { text: "Microservices", color: "yellow", priority: 3 },
    { text: "Load Testing", color: "purple", priority: 3 },
    { text: "Load Balancing", color: "blue", priority: 3 },
    { text: "SSL/TLS", color: "green", priority: 3 }
  ];

  // Filter skills based on screen size
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleSkills = skills.filter(skill => {
    if (windowWidth < 640) { // Mobile
      return skill.priority === 1;
    } else if (windowWidth < 1024) { // Tablet
      return skill.priority <= 2;
    }
    return true; // Desktop shows all
  });

  return (
    <motion.section 
      className="card space-y-4 sm:space-y-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold cyber-font">Top Skills</h2>
      <motion.div 
        className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {visibleSkills.map((skill, index) => (
          <motion.span
            key={skill.text}
            data-color={skill.color}
            className={`skill-tag cyber-font text-black hover-target shine text-xs sm:text-sm md:text-base px-2 py-1 sm:px-3 sm:py-1.5`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
          >
            {skill.text}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}
