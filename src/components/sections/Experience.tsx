'use client';
import { motion } from "framer-motion";
import { experiences } from "@/data/experiences";
import { useState, useEffect } from "react";

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Experience() {
  // Screen size state
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to limit technologies based on screen size
  const getVisibleTechnologies = (technologies: any[], isCurrent: boolean) => {
    if (windowWidth < 640) { // Mobile
      return isCurrent ? technologies.slice(0, 6) : technologies.slice(0, 4);
    } else if (windowWidth < 1024) { // Tablet
      return isCurrent ? technologies.slice(0, 8) : technologies.slice(0, 6);
    }
    return technologies; // Desktop shows all
  };

  return (
    <motion.section 
      className="space-y-4 sm:space-y-6 md:space-y-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold cyber-font"
        variants={fadeInUp}
      >
        Experience
      </motion.h2>
      {experiences.map((experience, index) => (
        <motion.div 
          key={experience.company + experience.position}
          className={`card p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 relative overflow-hidden ${experience.current ? '' : 'opacity-90'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex justify-between items-start flex-wrap gap-2 sm:gap-4">
            <div className="space-y-1 sm:space-y-2">
              <div>
                <motion.h3 
                  className={`${experience.current ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl md:text-2xl'} font-bold text-[var(--text)] cyber-font`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {experience.company}
                </motion.h3>
              </div>
              <motion.p 
                className={`${experience.current ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'} font-bold text-[var(--accent)] cyber-font`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {experience.position}
              </motion.p>
            </div>
            <motion.span 
              className={`neo-brutalism px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-bold ${
                experience.current 
                  ? 'bg-[var(--yellow)] text-black'
                  : 'bg-[var(--background-light)] text-[var(--text)]'
              } transform hover:rotate-2 transition-transform cyber-font`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {experience.period}
            </motion.span>
          </div>

          <motion.div 
            className="space-y-3 sm:space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {experience.description && (
              <p className={`${experience.current ? 'text-base sm:text-lg' : 'text-sm sm:text-base'} cyber-font`}>
                {experience.description}
              </p>
            )}
            <ul className="space-y-2 sm:space-y-3 list-none">
              {windowWidth < 640 
                ? experience.items.slice(0, experience.current ? 4 : 3).map((item, index) => (
                  <motion.li 
                    key={index}
                    className={`flex items-start space-x-2 cyber-font ${
                      experience.current ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                  >
                    <span className="text-[var(--accent)] mt-1">▹</span>
                    <span>{item}</span>
                  </motion.li>
                ))
                : experience.items.map((item, index) => (
                  <motion.li 
                    key={index}
                    className={`flex items-start space-x-2 cyber-font ${
                      experience.current ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                  >
                    <span className="text-[var(--accent)] mt-1">▹</span>
                    <span>{item}</span>
                  </motion.li>
                ))
              }
            </ul>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {getVisibleTechnologies(experience.technologies, experience.current).map((tech) => (
              <span 
                key={tech.name}
                data-color={tech.color}
                className={`skill-tag cyber-font text-black text-xs sm:text-sm ${
                  !experience.current && 'text-xs'
                } px-2 py-1 sm:px-3 sm:py-1.5`}
              >
                {tech.name}
              </span>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </motion.section>
  );
}
