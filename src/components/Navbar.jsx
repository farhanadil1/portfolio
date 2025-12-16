import { Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbMenu3 } from "react-icons/tb";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showHeroNav, setShowHeroNav] = useState(true);

  const sections = ["Home", "About", "Projects", "Skills", "Contact"];

  /* -----------------------------
     HERO VISIBILITY TRACKING
  ------------------------------*/
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

  /* -----------------------------
     ACTIVE SECTION TRACKING
  ------------------------------*/
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (entry) => entry.isIntersecting && setActiveSection(entry.target.id)
        );
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* -----------------------------
     MAGNETIC HOVER
  ------------------------------*/
  const magnetic = {
    whileHover: { scale: 1.1, y: -3 },
    transition: { type: "spring", stiffness: 250, damping: 15 }
  };

  return (
    <>
      {/* =============================
          HERO NAVBAR (VISIBLE ON TOP)
      ==============================*/}
      <AnimatePresence>
        {showHeroNav && (
          <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 90 }}
            className="fixed top-0 left-0 z-50 w-full py-4"
          >
            <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
              {/* Logo */}
              <motion.div {...magnetic} className="cursor-pointer">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  <span className="font-medium">Adil</span>
                  <span className="font-extrabold ml-1">Farhan</span>
                </h1>
              </motion.div>

              {/* Desktop Menu */}
              <ul className="hidden md:flex gap-8 items-center text-lg font-medium">
                {sections.map((section) => (
                  <motion.li key={section} {...magnetic}>
                    <a
                      href={`#${section.toLowerCase()}`}
                      className={`relative transition-colors
                        ${
                          activeSection === section.toLowerCase()
                            ? "text-teal-400"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                    >
                      {section}
                      {activeSection === section.toLowerCase() && (
                        <motion.span
                          layoutId="underline"
                          className="absolute -bottom-1 left-0 h-[2px] w-full bg-teal-400 rounded-full"
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
                  className="p-3 rounded-full"
                >
                  {darkMode ? (
                    <Sun className="text-yellow-300" size={20} />
                  ) : (
                    <Moon className="text-gray-800" size={20} />
                  )}
                </motion.button>
              </ul>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* =============================
          FLOATING MENU BUTTON
      ==============================*/}
      <AnimatePresence>
        {!showHeroNav && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => setIsMenuOpen(true)}
            className="
              fixed top-6 right-6 z-50
              w-14 h-14 rounded-full
              bg-black dark:bg-white
              text-white dark:text-black
              flex items-center justify-center
              shadow-xl
            "
          >
            <TbMenu3 size={32} />
          </motion.button>
        )}
      </AnimatePresence>

            
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Background Dim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[55] bg-black/30 backdrop-blur-sm"
            />

            {/* Side Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              className="
                fixed top-0 right-0 z-[60]
                h-full
                w-[50%] md:w-[40%] lg:w-[30%]
                bg-teal-600 dark:bg-teal-700 backdrop-blur-xl
                flex flex-col justify-center
                px-10
              "
            >
              {/* Close */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 text-white"
              >
                <X size={32} />
              </motion.button>

              {/* Menu Items */}
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12 } }
                }}
                className="space-y-10"
              >
                {sections.map((section) => (
                  <motion.li
                    key={section}
                    variants={{
                      hidden: { opacity: 0, x: 40 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <a
                      href={`#${section.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="
                        text-4xl font-semibold
                        text-white hover:text-teal-400
                        transition-colors
                      "
                    >
                      {section}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Theme Toggle */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setDarkMode(!darkMode)}
                className="mt-12 w-fit py-4 px-6 rounded-full bg-white/10 text-white"
              >
                {darkMode ? (
                  <>
                    <div className="flex">
                      <Sun size={28} />
                      <span className="text-lg ml-2 font-semibold">Light</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex">
                      <Moon size={28} />
                      <span className="text-lg ml-2 font-semibold">Dark</span>
                    </div>
                  </>
                )}
              </motion.button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </>
  );
}
