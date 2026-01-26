import { Sun, Moon, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbMenu3 } from "react-icons/tb";
import { FiArrowUpRight } from "react-icons/fi";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showHeroNav, setShowHeroNav] = useState(true);

  const sections = ["Home", "About", "Projects","Experience", "Skills", "Contact"];

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
          bg-black/60
          backdrop-blur-xl
        "
      />

      {/* Panel */}
      <motion.aside
        initial={{ x: "110%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "110%", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          fixed top-0 right-0 z-[60]
          h-full w-[88%] sm:w-[360px]

          bg-white/75 dark:bg-[#0b0b0b]/80
          backdrop-blur-2xl

          border-l border-black/10 dark:border-white/10
          shadow-[0_0_60px_rgba(0,0,0,0.35)]

          px-8 pt-10 pb-8
          flex flex-col
        "
      >
        {/* TOP */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] tracking-[0.35em] text-gray-400">
            NAVIGATION
          </span>

          <button
            onClick={() => setIsMenuOpen(false)}
            className="
              p-2 rounded-full
              hover:bg-black/5 dark:hover:bg-white/10
              transition
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* LINKS */}
        <nav className="mt-6">
          <ul className="space-y-10 md:space-y-6">
            {sections.map((section, i) => (
              <motion.li
                key={section}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.06 * i,
                  ease: "easeOut",
                }}
              >
                <a
                  href={`#${section.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    group block
                    text-3xl font-medium tracking-tight

                    text-black dark:text-white
                    transition-opacity
                    hover:opacity-60
                  "
                >
                  <span className="relative inline-flex items-center gap-4">
                    {section}

                    {/* micro arrow */}
                    <span
                      className="
                        absolute -right-8
                        opacity-0 translate-x-[-6px]
                        group-hover:opacity-100 group-hover:translate-x-0
                        transition-all duration-300
                      "
                    >
                      <FiArrowUpRight size={18} />
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* SOFT DIVIDER */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />

        {/* FOOT */}
        <div className="mt-auto flex items-center justify-between text-xs">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
              flex items-center gap-2
              tracking-[0.25em] uppercase
              text-gray-500 dark:text-gray-400
              hover:text-black dark:hover:text-white
              transition
            "
          >
            {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            {darkMode ? "Light" : "Dark"}
          </button>

          <span className="text-gray-400">© 2026</span>
        </div>
      </motion.aside>
    </>
  )}
</AnimatePresence>


    </>
  );
}
