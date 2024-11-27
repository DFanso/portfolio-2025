'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import CustomCursor from "@/components/animations/CustomCursor";
import TopSkills from "@/components/sections/TopSkills";
import Experience from "@/components/sections/Experience";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <CustomCursor isHovered={isHovered} />
      <div className="min-h-screen p-4 sm:p-8 space-y-8 sm:space-y-12 max-w-7xl mx-auto dark:bg-[#1A1A1A] dark:text-white">
        {/* Hero Section */}
        <motion.header 
          className="space-y-4 sm:space-y-8"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 
            className="heading-style"
            variants={fadeInUp}
          >
            Hey, I&apos;m <span className="name-animation">Leo Felcianas </span>
            <br className="hidden sm:block" />
            DevOps + Software Engineer
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl font-bold max-w-2xl"
            variants={fadeInUp}
          >
            Associate DevOps Engineer at Empite | First Class Honours Graduate from University of Plymouth | 
            Specialized in DevOps pipelines and Backend development. Passionate about creating efficient and scalable solutions.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeInUp}
          >
            <a href="mailto:leogavin123@outlook.com" className="button bg-[var(--green)] text-black hover:scale-105 transition-transform w-full sm:w-auto text-center">Get in Touch</a>
            <a href="tel:+940772067102" className="button neo-brutalism-accent hover:scale-105 transition-transform w-full sm:w-auto text-center">Call Me</a>
          </motion.div>
        </motion.header>

        <TopSkills onHover={setIsHovered} />
        <Experience />

        {/* Projects Section */}
        <section className="space-y-6 sm:space-y-8">
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {[
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
            ].map((project, index) => (
              <motion.div 
                key={project.title}
                className="card space-y-4 hover-target"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span 
                      key={tech.name}
                      data-color={tech.color}
                      className="skill-tag text-black text-sm"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <motion.section 
          className="card space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold">Let&apos;s Connect</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { 
                text: "LinkedIn", 
                href: "https://www.linkedin.com/in/leogavin", 
                color: "blue",
                icon: <FaLinkedin className="text-2xl" />
              },
              { 
                text: "GitHub", 
                href: "https://github.com/DFanso", 
                color: "purple",
                icon: <FaGithub className="text-2xl" />
              }
            ].map((link, index) => (
              <a
                key={link.text}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-color={link.color}
                className="button text-black hover-target shine flex items-center justify-center gap-3"
              >
                {link.icon}
                {link.text}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          </div>
        </motion.section>
      </div>
    </>
  );
}
