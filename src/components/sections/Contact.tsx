'use client';
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface SocialLink {
  text: string;
  href: string;
  color: string;
  icon: JSX.Element;
}

const socialLinks: SocialLink[] = [
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
];

export default function Contact() {
  return (
    <motion.section 
      id="contact"
      className="card space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold cyber-font">Let&apos;s Connect</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.text}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-color={link.color}
            className="button text-black hover-target shine flex items-center justify-center gap-3 cyber-font"
          >
            {link.icon}
            {link.text}
          </a>
        ))}
      </div>
    </motion.section>
  );
}
