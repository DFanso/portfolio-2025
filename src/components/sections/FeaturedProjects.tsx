'use client';
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  tech: {
    name: string;
    color: string;
  }[];
}

interface FeaturedProjectsProps {
  onHover: (isHovered: boolean) => void;
}

const projects: Project[] = [
  {
    title: "QuickQuest",
    description: "A platform connecting customers with laborers using geospatial queries and real-time chat.",
    tech: [
      { name: "Nest.js", color: "yellow" },
      { name: "Next.js", color: "green" },
      { name: "MongoDB", color: "blue" }
    ]
  },
  {
    title: "CineMagic Cinema",
    description: "Online ticket booking system with client, admin, and server components. Integrated with PayPal and OMDB API.",
    tech: [
      { name: "React.js", color: "purple" },
      { name: "Nest.js", color: "pink" },
      { name: "MongoDB", color: "accent" }
    ]
  }
];

export default function FeaturedProjects({ onHover }: FeaturedProjectsProps) {
  return (
    <section className="space-y-6 sm:space-y-8">
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
            className="card space-y-4 hover-target"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
          >
            <h3 className="text-xl font-bold mb-2 cyber-font">{project.title}</h3>
            <p>{project.description}</p>
            <div className="flex flex-wrap gap-2">
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
