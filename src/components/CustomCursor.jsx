import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    // detect hover on clickable elements
    const addHover = () => setIsHovering(true);
    const removeHover = () => setIsHovering(false);

    document.querySelectorAll("a, button, .cursor-hover").forEach(el => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("a, button, .cursor-hover").forEach(el => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <motion.div
      className="
        fixed top-0 left-0 z-[9999]
        pointer-events-none
        rounded-full
        bg-teal-400
        mix-blend-difference
      "
      animate={{
        x: position.x - 6,
        y: position.y - 6,
        width: isHovering ? 28 : 16,
        height: isHovering ? 28 : 16,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 24,
        mass: 0.4,
      }}
    />
  );
};

export default CustomCursor;
