'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import CustomCursor from "@/components/animations/CustomCursor";
import TopSkills from "@/components/sections/TopSkills";
import Experience from "@/components/sections/Experience";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

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
          <div className="space-y-6">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="flex flex-col space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold name-animation cyber-font">
                  Leo Felcianas
                </h1>
                <div className="flex flex-col space-y-2">
                  <motion.span 
                    className="text-xl sm:text-2xl cyber-font bg-clip-text text-transparent bg-gradient-to-r from-[var(--green)] to-[var(--blue)]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Associate DevOps Engineer at Empite
                  </motion.span>
                  <motion.span 
                    className="text-xl sm:text-2xl cyber-font bg-clip-text text-transparent bg-gradient-to-r from-[var(--purple)] to-[var(--pink)]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    BSc (Hons) Software Engineering
                  </motion.span>
                  <motion.span 
                    className="text-xl sm:text-2xl cyber-font text-[var(--accent)]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    @ University of Plymouth
                  </motion.span>
                </div>
              </motion.div>
              
              <motion.p 
                className="text-lg sm:text-xl max-w-2xl cyber-font leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="neo-brutalism-accent px-2 py-1 mr-2 inline-block">DevOps</span>
                <span className="neo-brutalism-accent px-2 py-1 mr-2 inline-block">Backend</span>
                specialist crafting efficient and scalable solutions. Transforming complex challenges into elegant architectures.
              </motion.p>
            </motion.div>
            
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <a 
                href="#contact" 
                className="neo-brutalism-white px-6 py-3 cyber-font hover:bg-[var(--accent)] hover:text-white transition-colors"
              >
                Let&apos;s Connect
              </a>
              <a 
                href="#projects" 
                className="neo-brutalism px-6 py-3 cyber-font bg-[var(--accent)] text-white hover:bg-black hover:text-white transition-colors"
              >
                View Projects
              </a>
            </motion.div>
          </div>
          
        </motion.header>

        <TopSkills onHover={setIsHovered} />
        <Experience />
        <FeaturedProjects setIsHovered={setIsHovered} />
        <Contact setIsHovered={setIsHovered} />
        <Footer />
      </div>
    </>
  );
}
