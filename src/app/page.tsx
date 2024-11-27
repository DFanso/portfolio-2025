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
        <FeaturedProjects onHover={setIsHovered} />
        <Contact />
      </div>
    </>
  );
}
