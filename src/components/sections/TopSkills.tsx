'use client';
import { motion } from "framer-motion";
import { useState } from "react";

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface TopSkillsProps {
  onHover: (isHovered: boolean) => void;
}

export default function TopSkills({ onHover }: TopSkillsProps) {
  const skills = [
    { text: "Backend Development", color: "yellow" },
    { text: "NestJS", color: "green" },
    { text: "TypeORM", color: "blue" },
    { text: "SQL", color: "purple" },
    { text: "System Architecture", color: "pink" },
    { text: "Terraform", color: "accent" },
    { text: "Load Testing", color: "yellow" },
    { text: "Infrastructure as Code", color: "green" },
    { text: "Azure DevOps", color: "blue" },
    { text: "MERN Stack", color: "purple" },
    { text: "Docker", color: "pink" },
    { text: "AWS", color: "accent" }
  ];

  return (
    <motion.section 
      className="card space-y-4 sm:space-y-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold cyber-font">Top Skills</h2>
      <motion.div 
        className="flex flex-wrap gap-2 sm:gap-3"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {skills.map((skill, index) => (
          <motion.span
            key={skill.text}
            data-color={skill.color}
            className={`skill-tag cyber-font text-black hover-target shine`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
          >
            {skill.text}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}
