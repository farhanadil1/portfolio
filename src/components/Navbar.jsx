import { Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const sections = ["Home", "About", "Projects", "Skills", "Contact"];

  // Track scroll for shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id));
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((section) => {
        const el = document.getElementById(section.toLowerCase());
        if (el) observer.unobserve(el);
      });
    };
  }, []);
  
  useEffect(() => {
    const projectsEl = document.getElementById("projects");
    if (!projectsEl) return;

    const onScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight / 2;

      const start = projectsEl.offsetTop;
      const end = start + projectsEl.offsetHeight;

      if (scrollMid >= start && scrollMid <= end) {
        setActiveSection("projects");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  // Magnetic hover effect
  const magnetic = {
    whileHover: { scale: 1.12, y: -3 },
    transition: { type: "spring", stiffness: 250, damping: 15 }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80 }}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 
        ${scrolled ? "backdrop-blur-xl bg-white/10 dark:bg-black/20 shadow-lg py-2" : "py-4"}`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
      <motion.div
        {...magnetic}
        className="cursor-pointer flex items-center"
      >
        <motion.h1
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="
            text-2xl font-bold tracking-tight 
            text-gray-900 dark:text-white 
            select-none
          "
        >
          <span className="font-medium">Adil</span>
          <span className="font-extrabold ml-1">Farhan</span>
        </motion.h1>
      </motion.div>


        {/* Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="md:hidden p-3 text-gray-800 dark:text-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </motion.button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg items-center font-medium relative">
          {sections.map((section) => (
            <motion.li key={section} {...magnetic}>
              <a
                href={`#${section.toLowerCase()}`}
                className={`relative px-1 transition-colors duration-300 
                ${activeSection === section.toLowerCase()
                  ? "text-teal-400"
                  : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {section}

                {/* Animated underline */}
                {activeSection === section.toLowerCase() && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-teal-400 rounded-full"
                  />
                )}
              </a>
            </motion.li>
          ))}

          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.8, rotate: 180 }}
            whileHover={{ scale: 1.15 }}
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 p-3 rounded-full"
          >
            {darkMode ? (
              <Sun className="text-yellow-300" size={20} />
            ) : (
              <Moon className="text-gray-800" size={20} />
            )}
          </motion.button>
        </ul>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-full left-0 w-full bg-white/90 dark:bg-black/70 backdrop-blur-xl shadow-xl"
            >
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.08 }
                  }
                }}
                className="flex flex-col items-center gap-6 py-6 text-lg"
              >
                {sections.map((section) => (
                  <motion.li
                    key={section}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <a
                      href={`#${section.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-800 dark:text-gray-200 hover:text-teal-400 transition-all"
                    >
                      {section}
                    </a>
                  </motion.li>
                ))}

                {/* Mobile Theme Toggle */}
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setDarkMode(!darkMode)}
                  className="mt-2 p-3 rounded-full bg-gray-200 dark:bg-gray-600"
                >
                  {darkMode ? <Sun /> : <Moon />}
                </motion.button>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
