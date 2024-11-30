'use client';

import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <motion.footer 
      className="py-8 mt-16 border-t border-zinc-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <motion.div 
            className="flex items-center justify-center space-x-2 text-zinc-400 hover:text-[var(--green)] transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm sm:text-base">Made with</span>
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <FaHeart className="text-red-500 w-4 h-4" />
            </motion.div>
            <span className="text-sm sm:text-base">by</span>
            <motion.a
              href="https://github.com/DFanso"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--green)] hover:text-[var(--blue)] transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              DFanso
            </motion.a>
            <span className="text-sm sm:text-base"> {new Date().getFullYear()}</span>
          </motion.div>
          
          <motion.a
            href="/dashboard"
            className="text-sm text-zinc-400 hover:text-[var(--green)] transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Analytics Dashboard
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
}
