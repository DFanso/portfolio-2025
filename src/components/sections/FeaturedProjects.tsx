'use client';
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '@/data/projects';

interface FeaturedProjectsProps {
  onHover: (isHovered: boolean) => void;
}

export default function FeaturedProjects({ onHover }: FeaturedProjectsProps) {
  return (
    <section id="projects" className="space-y-6 sm:space-y-8">
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold cyber-font"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Featured Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {projects.map((project, index) => (
          <motion.div 
            key={project.title}
            className="card space-y-4 hover-target relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
          >
            <div className="flex justify-between items-start relative z-10">
              <h3 className="text-xl font-bold mb-2 cyber-font">{project.title}</h3>
              <div className="flex gap-2">
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors relative z-20 pointer-events-auto"
                    onMouseEnter={() => onHover(true)}
                    onMouseLeave={() => onHover(false)}
                    title="View Live Demo"
                  >
                    <FaExternalLinkAlt className="text-lg hover:text-[var(--accent)] transition-colors" />
                  </a>
                )}
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors relative z-20 pointer-events-auto"
                    onMouseEnter={() => onHover(true)}
                    onMouseLeave={() => onHover(false)}
                    title="View Source Code"
                  >
                    <FaGithub className="text-2xl hover:text-[var(--accent)] transition-colors" />
                  </a>
                )}
              </div>
            </div>
            <p className="relative z-10">{project.description}</p>
            <div className="flex flex-wrap gap-2 relative z-10">
              {project.tech.map(tech => (
                <span 
                  key={tech.name}
                  data-color={tech.color}
                  className="skill-tag cyber-font text-black"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
