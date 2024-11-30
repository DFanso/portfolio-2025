import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

interface CustomCursorProps {
  isHovered: boolean;
}

export default function CustomCursor({ isHovered }: CustomCursorProps) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="cursor-outer"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          scale: isHovered ? 1.5 : 1,
        }}
      />
      <motion.div
        className="cursor-inner"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          scale: isHovered ? 0.5 : 1,
        }}
      />
      <motion.div
        className="cursor-core"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          scale: isHovered ? 1.2 : 1,
        }}
      />
    </>
  );
}
