import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Sun, Moon, X } from "lucide-react";
import { TbMenu3 } from "react-icons/tb";
import { FiArrowUpRight } from "react-icons/fi";

const SECTIONS = [
  "Home",
  "About",
  "Projects",
  "Experience",
  "Skills",
  "Contact",
];

const EASE = [0.16, 1, 0.3, 1];

/* Locks the document behind the panel without the iOS rubber-band jump. */
function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const { body } = document;
    const y = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    const barWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (barWidth > 0) body.style.paddingRight = `${barWidth}px`;

    return () => {
      Object.assign(body.style, prev);
      body.style.paddingRight = "";
      window.scrollTo(0, y);
    };
  }, [locked]);
}

export default function Navbar({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showHeroNav, setShowHeroNav] = useState(true);

  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const reduce = useReducedMotion();

  useScrollLock(isMenuOpen);

  /* Scroll progress for the ring around the floating button. */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  /* --- Which section owns the viewport centre ---
     A band instead of a threshold, so sections taller than the screen
     still register. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* --- Hero nav vs floating button ---
     Measured against the hero's own height, so short/landscape viewports
     can't strand it. */
  useEffect(() => {
    const hero = document.getElementById("home");
    let frame = 0;

    const update = () => {
      frame = 0;
      const limit = hero ? hero.offsetHeight * 0.55 : 400;
      setShowHeroNav(window.scrollY < limit);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    triggerRef.current?.focus();
  }, []);

  /* Escape to close, Tab kept inside the panel. */
  useEffect(() => {
    if (!isMenuOpen) return;

    const node = panelRef.current;
    node?.querySelector("a, button")?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") return closeMenu();
      if (e.key !== "Tab" || !node) return;

      const focusables = node.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMenuOpen, closeMenu]);

  const ThemeIcon = darkMode ? Sun : Moon;

  return (
    <>
      {/* ───────────────────────── HERO NAV ───────────────────────── */}
      <AnimatePresence>
        {showHeroNav && (
          <motion.header
            initial={{ y: -32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -32, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
            className="pointer-events-none fixed inset-x-0 top-0 z-50"
          >
            <nav className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-20">
              <a
                href="#home"
                className="group relative text-sm font-semibold tracking-wide outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-500"
              >
                <span className="text-black dark:text-white">ADIL</span>
                <span className="text-neutral-400 transition-colors duration-500 group-hover:text-teal-500">
                  {" "}
                  FARHAN
                </span>
              </a>

              <div className="flex items-center gap-7">
                <ul className="hidden items-center gap-9 text-sm md:flex">
                  {SECTIONS.map((section) => {
                    const id = section.toLowerCase();
                    const isActive = activeSection === id;
                    return (
                      <li key={section}>
                        <a
                          href={`#${id}`}
                          aria-current={isActive ? "true" : undefined}
                          className={`group relative block overflow-hidden py-1 outline-offset-4 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-teal-500 ${
                            isActive
                              ? "text-black dark:text-white"
                              : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                          }`}
                        >
                          {/* Hover: the label rolls up, its twin rolls in. */}
                          <span className="block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                            {section}
                          </span>
                          <span
                            aria-hidden
                            className="absolute left-0 top-full block text-teal-500 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-full motion-reduce:hidden"
                          >
                            {section}
                          </span>

                          {isActive && (
                            <motion.span
                              layoutId="nav-underline"
                              transition={{ duration: 0.45, ease: EASE }}
                              className="absolute bottom-0 left-0 h-px w-full bg-teal-500"
                            />
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label={
                    darkMode ? "Switch to light theme" : "Switch to dark theme"
                  }
                  className="relative grid h-9 w-9 place-items-center rounded-full text-neutral-700 outline-offset-2 transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-teal-500 dark:text-neutral-300 dark:hover:bg-white/10"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={darkMode ? "sun" : "moon"}
                      initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                      className="absolute grid place-items-center"
                    >
                      <ThemeIcon size={18} />
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ──────────────── FLOATING BUTTON + PROGRESS RING ──────────────── */}
      <AnimatePresence>
        {!showHeroNav && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
            className="fixed right-6 top-6 z-50 md:right-10"
          >
            {/* Ring reads as "how far through the page you are". */}
            <svg
              viewBox="0 0 56 56"
              className="pointer-events-none absolute inset-0 h-14 w-14 -rotate-90"
              aria-hidden
            >
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                strokeWidth="1.5"
                className="stroke-black/10 dark:stroke-white/15"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="stroke-teal-500"
                style={{ pathLength: progress }}
              />
            </svg>

            <button
              ref={triggerRef}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation"
              aria-expanded={isMenuOpen}
              className="relative grid h-14 w-14 place-items-center rounded-full bg-[#101010] text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] outline-offset-4 transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-teal-500 active:scale-95 dark:bg-white dark:text-[#101010]"
            >
              <TbMenu3 size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────────────────── PANEL ───────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={closeMenu}
              className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-md"
            />

            {/* Teal under-layer: leads in, trails out. Gives the slide depth. */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
              className="fixed right-0 top-0 z-[58] h-full w-[88%] bg-teal-500 sm:w-[380px]"
              aria-hidden
            />

            <motion.aside
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
              className="fixed right-0 top-0 z-[60] flex h-full w-[88%] flex-col border-l border-black/10 px-8 pb-8 md:pb-4 md:pt-6 pt-10 sm:w-[380px] dark:border-white/10
                         bg-[#FAFAF9] dark:bg-[#0E0E0E]"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">
                  {SECTIONS.find((s) => s.toLowerCase() === activeSection) ??
                    "Home"}
                  <span className="text-neutral-400"> — currently viewing</span>
                </span>

                <button
                  onClick={closeMenu}
                  aria-label="Close navigation"
                  className="grid h-9 w-9 place-items-center rounded-full outline-offset-2 transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-teal-500 dark:hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="">
                <ul>
                  {SECTIONS.map((section, i) => {
                    const id = section.toLowerCase();
                    const isActive = activeSection === id;
                    return (
                      <li
                        key={section}
                        className="overflow-hidden border-b border-black/[0.07] dark:border-white/[0.07]"
                      >
                        <motion.span
                          className="block"
                          initial={{ y: "110%" }}
                          animate={{ y: "0%" }}
                          exit={{ y: "110%" }}
                          transition={{
                            duration: reduce ? 0 : 0.7,
                            ease: EASE,
                            delay: reduce ? 0 : 0.22 + i * 0.06,
                          }}
                        >
                          <a
                            href={`#${id}`}
                            onClick={closeMenu}
                            aria-current={isActive ? "true" : undefined}
                            className="group flex items-center justify-between py-4 text-3xl font-medium tracking-tight outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-500"
                          >
                            <span
                              className={`relative transition-colors duration-300 ${
                                isActive
                                  ? "text-teal-600 dark:text-teal-400"
                                  : "text-black group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400"
                              }`}
                            >
                              {section}
                            </span>
                            <FiArrowUpRight
                              size={20}
                              className="-translate-x-2 text-teal-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
                            />
                          </a>
                        </motion.span>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: reduce ? 0 : 0.5, duration: 0.4 }}
                className="mt-auto md:pt-2 space-y-6"
              >
                <div className="flex gap-6 text-sm text-neutral-500">
                  {["GitHub", "LinkedIn", "Email"].map((link) => (
                    <a
                      key={link}
                      href="#contact"
                      className="transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      {link}
                    </a>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 md:pt-1 text-xs dark:border-white/[0.07]">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex items-center gap-2 text-neutral-500 transition-colors hover:text-black dark:hover:text-white"
                  >
                    <ThemeIcon size={14} />
                    {darkMode ? "Light theme" : "Dark theme"}
                  </button>
                  <span className="text-neutral-400">
                    © {new Date().getFullYear()}
                  </span>
                </div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}