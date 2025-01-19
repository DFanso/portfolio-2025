'use client';
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '@/data/projects';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';

interface FeaturedProjectsProps {
  setIsHovered: Dispatch<SetStateAction<boolean>>;
}

export default function FeaturedProjects({ setIsHovered }: FeaturedProjectsProps) {
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
  const getVisibleTechnologies = (technologies: any[]) => {
    if (windowWidth < 640) { // Mobile
      return technologies.slice(0, 4);
    } else if (windowWidth < 1024) { // Tablet
      return technologies.slice(0, 6);
    }
    return technologies; // Desktop shows all
  };

  return (
    <section id="projects" className="space-y-4 sm:space-y-6 md:space-y-8">
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold cyber-font"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Featured Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-8">
        {projects.map((project, index) => (
          <motion.div 
            key={project.title}
            className="card p-4 sm:p-6 space-y-3 sm:space-y-4 hover-target relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex justify-between items-start relative z-10">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 cyber-font pr-12">
                {project.title}
              </h3>
              <div className="flex gap-1 sm:gap-2 absolute top-0 right-0">
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-1.5 sm:p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors relative z-20 pointer-events-auto"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    title="View Live Demo"
                  >
                    <FaExternalLinkAlt className="text-base sm:text-lg hover:text-[var(--accent)] transition-colors" />
                  </a>
                )}
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-1.5 sm:p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors relative z-20 pointer-events-auto"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    title="View Source Code"
                  >
                    <FaGithub className="text-xl sm:text-2xl hover:text-[var(--accent)] transition-colors" />
                  </a>
                )}
              </div>
            </div>
            <p className="relative z-10 text-sm sm:text-base">
              {windowWidth < 640 
                ? project.description.length > 120 
                  ? `${project.description.slice(0, 120)}...`
                  : project.description
                : project.description
              }
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 relative z-10">
              {getVisibleTechnologies(project.tech).map(tech => (
                <span 
                  key={tech.name}
                  data-color={tech.color}
                  className="skill-tag cyber-font text-black text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5"
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
