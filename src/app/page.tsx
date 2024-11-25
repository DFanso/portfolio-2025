'use client';
import Image from "next/image";
import { motion } from "framer-motion";

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
  return (
    <div className="min-h-screen p-8 space-y-12 max-w-7xl mx-auto dark:bg-[#1A1A1A] dark:text-white">
      {/* Hero Section */}
      <motion.header 
        className="space-y-8"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.h1 
          className="heading-style"
          variants={fadeInUp}
        >
          Hey, I'm <span className="gradient-text animate-float">Leo Felcianas</span>
          <br />
          DevOps & Software Engineer
        </motion.h1>
        <motion.p 
          className="text-xl font-bold max-w-2xl"
          variants={fadeInUp}
        >
          Associate DevOps Engineer at Empite | First Class Honours Graduate from University of Plymouth | 
          Specialized in DevOps pipelines and Backend development. Passionate about creating efficient and scalable solutions.
        </motion.p>
        <motion.div 
          className="flex gap-4"
          variants={fadeInUp}
        >
          <a href="mailto:leogavin123@outlook.com" className="button bg-[var(--green)] text-black hover:scale-105 transition-transform">Get in Touch</a>
          <a href="tel:+940772067102" className="button neo-brutalism-accent hover:scale-105 transition-transform">Call Me</a>
        </motion.div>
      </motion.header>

      {/* Skills Section */}
      <motion.section 
        className="card space-y-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold">Top Skills</h2>
        <motion.div 
          className="flex flex-wrap gap-3"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {[
            { text: "Load Testing", color: "yellow" },
            { text: "Infrastructure as Code", color: "green" },
            { text: "Azure DevOps", color: "blue" },
            { text: "MERN Stack", color: "purple" },
            { text: "Docker", color: "pink" },
            { text: "AWS", color: "accent" }
          ].map((skill, index) => (
            <motion.span
              key={skill.text}
              className={`skill-tag bg-[var(--${skill.color})] ${
                skill.color === 'accent' ? 'text-white' : 'text-black dark:text-white'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              {skill.text}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

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
        <div className="space-y-6">
          {[
            {
              company: "Empite",
              role: "Associate DevOps Engineer",
              period: "Nov 2024 - Present",
              description: "DevOps engineering and infrastructure management"
            },
            {
              company: "ASTRONEX",
              role: "Director of Data Science & IT Division",
              period: "Jul 2023 - Present"
            },
            {
              company: "Fiverr",
              role: "Software Engineer",
              period: "May 2023 - Present",
              description: "Developing applications using MERN stack, Discord bots, Firebase, Next.js, NestJS, and OpenAI"
            }
          ].map((exp, index) => (
            <motion.div 
              key={exp.company}
              className="card space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-bold">{exp.company}</h3>
                  <p className="text-lg font-bold text-[var(--accent)]">{exp.role}</p>
                </div>
                <span className="neo-brutalism px-3 py-1 text-sm font-bold bg-[var(--yellow)]">{exp.period}</span>
              </div>
              {exp.description && <p>{exp.description}</p>}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <section className="space-y-8">
        <motion.h2 
          className="text-3xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              className="card space-y-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p>{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <span 
                    key={tech.name}
                    className={`px-3 py-1 bg-[var(--${tech.color})] neo-brutalism text-sm font-bold ${
                      tech.color === 'accent' ? 'text-white' : 'text-black dark:text-white'
                    }`}
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
        <h2 className="text-3xl font-bold">Let's Connect</h2>
        <div className="flex flex-wrap gap-4">
          {[
            { text: "LinkedIn", href: "https://www.linkedin.com/in/leogavin", color: "blue" },
            { text: "GitHub", href: "https://github.com/DFanso", color: "purple" },
            { text: "Portfolio", href: "https://dfanso.github.io/Portfolio-Site/", color: "green" }
          ].map((link, index) => (
            <motion.a
              key={link.text}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`button bg-[var(--${link.color})] ${
                link.color === 'purple' ? 'text-black dark:text-white' : 'text-black'
              }`}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {link.text}
            </motion.a>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <p className="font-bold"> leogavin123@outlook.com</p>
          <p className="font-bold"> +94 772067102</p>
          <p className="font-bold"> 32/2, Wasantha Uayana, Thabbowa, Nattandiya</p>
        </div>
      </motion.section>
    </div>
  );
}
