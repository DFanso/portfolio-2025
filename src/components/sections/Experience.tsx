'use client';
import { motion } from "framer-motion";
import { experiences } from "@/data/experiences";

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
  return (
    <motion.section 
      className="space-y-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <motion.h2 
        className="text-3xl font-bold cyber-font"
        variants={fadeInUp}
      >
        Experience
      </motion.h2>
      {experiences.map((experience, index) => (
        <motion.div 
          key={experience.company + experience.position}
          className={`card p-8 space-y-6 relative overflow-hidden ${experience.current ? '' : 'opacity-90'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="space-y-2">
              <div>
                <motion.h3 
                  className={`${experience.current ? 'text-3xl' : 'text-2xl'} font-bold text-[var(--text)] cyber-font`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {experience.company}
                </motion.h3>
              </div>
              <motion.p 
                className={`${experience.current ? 'text-xl' : 'text-lg'} font-bold text-[var(--accent)] cyber-font`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {experience.position}
              </motion.p>
            </div>
            <motion.span 
              className={`neo-brutalism px-4 py-2 text-sm font-bold ${
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
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {experience.description && (
              <p className={`${experience.current ? 'text-lg' : 'text-base'} cyber-font`}>
                {experience.description}
              </p>
            )}
            <ul className="space-y-3 list-none">
              {experience.items.map((item, index) => (
                <motion.li 
                  key={index}
                  className={`flex items-center space-x-2 cyber-font ${experience.current ? 'text-base' : 'text-sm'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                >
                  <span className="text-[var(--accent)]">▹</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {experience.technologies.map((tech) => (
              <span 
                key={tech.name}
                data-color={tech.color}
                className={`skill-tag cyber-font text-black ${!experience.current && 'text-sm'}`}
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
