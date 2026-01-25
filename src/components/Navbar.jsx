import { Sun, Moon, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbMenu3 } from "react-icons/tb";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showHeroNav, setShowHeroNav] = useState(true);

  const sections = ["Home", "About", "Contact"];

  // Hero visibility
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowHeroNav(entry.isIntersecting),
      { threshold: 0.6 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActiveSection(entry.target.id)
        ),
      { threshold: 0.55 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO NAVBAR */}
      <AnimatePresence>
        {showHeroNav && (
          <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="
              fixed top-0 left-0 z-50 w-full
              pointer-events-none
            "
          >
            <nav className="pointer-events-auto max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              {/* Logo */}
              <h1 className="text-sm font-semibold tracking-wide text-black dark:text-white">
                ADIL FARHAN
              </h1>

              {/* Desktop links */}
              <div className="flex items-center gap-6">
                <ul className="hidden md:flex gap-8 text-sm">
                  {sections.map((section) => (
                    <li key={section}>
                      <a
                        href={`#${section.toLowerCase()}`}
                        className={`
                          relative
                          ${
                            activeSection === section.toLowerCase()
                              ? "text-gray-600 dark:text-gray-400"
                              : "text-gray-600 dark:text-gray-400"
                          }
                        `}
                      >
                        {section}
                        {activeSection === section.toLowerCase() && (
                          <motion.span
                            layoutId="nav-underline"
                            className="
                              absolute -bottom-1 left-0 h-[1px] w-full
                              bg-teal-500
                            "
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Theme toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="
                    p-2 rounded-full
                    text-gray-700 dark:text-gray-300
                    hover:bg-black/5 dark:hover:bg-white/10
                    transition
                  "
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* FLOATING MENU BUTTON */}
      <AnimatePresence>
        {!showHeroNav && (
          <motion.button
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMenuOpen(true)}
            className="
              fixed top-6 right-6 z-50
              w-12 h-12 rounded-full
              bg-black text-white
              dark:bg-white dark:text-black
              flex items-center justify-center
              shadow-lg
            "
          >
            <TbMenu3 size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* MOBILE PANEL */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="
                fixed inset-0 z-[55]
                bg-black/40 backdrop-blur-sm
              "
            />

            {/* Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="
                fixed top-0 right-0 z-[60]
                h-full w-[50%] sm:w-[25%]
                bg-white dark:bg-gray-900
                px-10 py-20
              "
            >
              {/* Close */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 text-gray-700 dark:text-gray-300"
              >
                <X size={28} />
              </button>

              {/* Links */}
              <ul className="space-y-8 text-3xl font-semibold">
                {sections.map((section) => (
                  <li key={section}>
                    <a
                      href={`#${section.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-black dark:text-white"
                    >
                      {section}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Theme toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="
                  mt-12 flex items-center gap-3
                  text-gray-600 dark:text-gray-400
                "
              >
                {darkMode ? <Sun /> : <Moon />}
                <span className="text-sm uppercase tracking-widest">
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
