'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import CustomCursor from "@/components/animations/CustomCursor";
import TopSkills from "@/components/sections/TopSkills";

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

        {/* Experience Section */}
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
                {[
                  "Building and maintaining CI/CD pipelines using Azure DevOps",
                  "Infrastructure as Code (IaC) implementation with Terraform",
                  "Container orchestration with Docker and Kubernetes",
                  "Cloud infrastructure management on AWS and Azure",
                  "Monitoring and logging system implementation",
                  "Automation of deployment processes"
                ].map((item, index) => (
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
              {[
                "Azure DevOps",
                "AWS",
                "Docker",
                "Kubernetes",
                "Terraform",
                "CI/CD"
              ].map((tech, index) => (
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
