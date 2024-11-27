'use client';
import { motion } from "framer-motion";

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

const experienceItems = [
  "Building and maintaining CI/CD pipelines using Azure DevOps",
  "Infrastructure as Code (IaC) implementation with Terraform",
  "Container orchestration with Docker and Kubernetes",
  "Cloud infrastructure management on AWS and Azure",
  "Monitoring and logging system implementation",
  "Automation of deployment processes"
];

const technologies = [
  "Azure DevOps",
  "AWS",
  "Docker",
  "Kubernetes",
  "Terraform",
  "CI/CD"
];

export default function Experience() {
  return (
    <motion.section 
      className="space-y-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <motion.h2 
        className="text-3xl font-bold"
        variants={fadeInUp}
      >
        Experience
      </motion.h2>
      <motion.div 
        className="card p-8 space-y-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div className="space-y-2">
            <motion.h3 
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent)] to-[var(--purple)]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Empite
            </motion.h3>
            <motion.p 
              className="text-xl font-bold text-[var(--accent)]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Associate DevOps Engineer
            </motion.p>
          </div>
          <motion.span 
            className="neo-brutalism px-4 py-2 text-sm font-bold bg-[var(--yellow)] text-black transform hover:rotate-2 transition-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Nov 2024 - Present
          </motion.span>
        </div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-lg">
            As an Associate DevOps Engineer at Empite, I specialize in:
          </p>
          <ul className="space-y-3 list-none">
            {experienceItems.map((item, index) => (
              <motion.li 
                key={index}
                className="flex items-center space-x-2"
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
          {technologies.map((tech, index) => (
            <span 
              key={tech}
              className={`px-3 py-1 text-sm font-bold neo-brutalism
                ${index % 3 === 0 ? 'bg-[var(--yellow)]' : 
                  index % 3 === 1 ? 'bg-[var(--green)]' : 'bg-[var(--blue)]'}
                text-black`}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
