import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    setEnabled(mq.matches);

    const handler = (e) => setEnabled(e.matches);
    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const addHover = () => setIsHovering(true);
    const removeHover = () => setIsHovering(false);
    const down = () => setIsActive(true);
    const up = () => setIsActive(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    document.querySelectorAll("a, button, .cursor-hover").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.querySelectorAll("a, button, .cursor-hover").forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  const isDark = document.documentElement.classList.contains("dark");

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className={`
          fixed top-0 left-0 z-[9998]
          pointer-events-none
          rounded-full
          border
          ${isDark ? "border-white/30" : "border-black/20"}
          backdrop-blur-md
        `}
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          width: isHovering ? 44 : 32,
          height: isHovering ? 44 : 32,
          scale: isActive ? 0.9 : 1,
          opacity: isHovering ? 0.9 : 0.6,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 28,
          mass: 0.6,
        }}
      />

      {/* Core dot */}
      <motion.div
        className={`
          fixed top-0 left-0 z-[9999]
          pointer-events-none
          rounded-full
          bg-teal-400
          shadow-[0_0_20px_rgba(20,184,166,0.6)]
          ${isDark ? "mix-blend-difference" : ""}
        `}
        animate={{
          x: position.x - 5,
          y: position.y - 5,
          width: isHovering ? 14 : 10,
          height: isHovering ? 14 : 10,
          scale: isActive ? 0.7 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.3,
        }}
      />
    </>
  );
};

export default CustomCursor;
