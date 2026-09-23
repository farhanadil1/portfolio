import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { X } from "lucide-react";
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

const HERO_SECTIONS = ["Home", "About"];

const EASE = [0.16, 1, 0.3, 1];

/* Freeze the page without changing its current scroll position. */
function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverscroll: body.style.overscrollBehavior,
      bodyPaddingRight: body.style.paddingRight,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      html.style.overscrollBehavior = previous.htmlOverscroll;
      body.style.overscrollBehavior = previous.bodyOverscroll;
      body.style.paddingRight = previous.bodyPaddingRight;
    };
  }, [locked]);
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showHeroNav, setShowHeroNav] = useState(true);

  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  const contactRef = useRef(null);
  const contactMagnetX = useRef(null);
  const contactMagnetY = useRef(null);

  const reduce = useReducedMotion();

  useScrollLock(isMenuOpen);

  // The ring around the floating button follows page progress.
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  /*
   * Keep the active navigation item synced with the section in view.
   * This remains based on the complete navigation so the floating
   * navigation and menu continue working exactly as before.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.toLowerCase());

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  /*
   * Replace the hero navigation with the floating button after
   * leaving the hero section.
   */
  useEffect(() => {
    const hero = document.getElementById("home");
    let frame = 0;

    const update = () => {
      frame = 0;

      const limit = hero ? hero.offsetHeight * 0.55 : 400;

      setShowHeroNav(window.scrollY < limit);
    };

    const handleScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    update();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  /*
   * Magnetic Contact button.
   * Only the hero Contact button uses this interaction.
   */
  useEffect(() => {
    const element = contactRef.current;

    if (!element || reduce) return;

    const xTo = (value) => {
      if (contactMagnetX.current) {
        contactMagnetX.current(value);
      }
    };

    const yTo = (value) => {
      if (contactMagnetY.current) {
        contactMagnetY.current(value);
      }
    };

    const handleMove = (event) => {
      const rect = element.getBoundingClientRect();

      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);

      xTo(x * 0.18);
      yTo(y * 0.18);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMove);
    element.addEventListener("mouseleave", handleLeave);

    return () => {
      element.removeEventListener("mousemove", handleMove);
      element.removeEventListener("mouseleave", handleLeave);
    };
  }, [reduce]);

  /*
   * Set up the spring functions separately so the magnetic effect
   * stays smooth without affecting the rest of the navbar.
   */
  useEffect(() => {
    if (reduce) return;

    let x = 0;
    let y = 0;

    const element = contactRef.current;

    if (!element) return;

    const update = () => {
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    contactMagnetX.current = (value) => {
      x += (value - x) * 0.16;
      update();
    };

    contactMagnetY.current = (value) => {
      y += (value - y) * 0.16;
      update();
    };

    return () => {
      contactMagnetX.current = null;
      contactMagnetY.current = null;
    };
  }, [reduce]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);

    // Focus the trigger again without touching the scroll position.
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  // Escape closes the menu and keyboard focus stays inside the panel.
  useEffect(() => {
    if (!isMenuOpen) return;

    const node = panelRef.current;
    const firstFocusable = node?.querySelector("a, button");

    firstFocusable?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !node) return;

      const focusable = node.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      {/* =========================================================
          HERO NAVIGATION
          Only visible while the hero is at the top.
          Home + About + magnetic Contact.
         ========================================================= */}

      <AnimatePresence>
        {showHeroNav && (
          <motion.header
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{
              duration: reduce ? 0 : 0.6,
              ease: EASE,
            }}
            className="
              pointer-events-none
              fixed
              inset-x-0
              top-0
              z-50
            "
          >
            <nav
              className="
                pointer-events-auto
                flex
                items-center
                justify-end
                px-6
                py-6
                md:px-10
                lg:px-14
              "
            >
              <div className="flex items-center gap-7 md:gap-9">
                {/* Home + About */}
                <ul className="flex items-center gap-7 text-sm md:gap-9">
                  {HERO_SECTIONS.map((section) => {
                    const id = section.toLowerCase();
                    const isActive = activeSection === id;

                    return (
                      <li key={section}>
                        <a
                          href={`#${id}`}
                          aria-current={
                            isActive ? "true" : undefined
                          }
                          className={`group relative block overflow-hidden py-1 outline-offset-4 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-teal-500 ${
                            isActive
                              ? "text-[#1E1E1E] dark:text-white"
                              : "text-neutral-500 hover:text-[#1E1E1E] dark:text-neutral-400 dark:hover:text-white"
                          }`}
                        >
                          <span
                            className="
                              block
                              transition-transform
                              duration-500
                              ease-[cubic-bezier(.16,1,.3,1)]
                              group-hover:-translate-y-full
                              motion-reduce:transition-none
                              motion-reduce:group-hover:translate-y-0
                            "
                          >
                            {section}
                          </span>

                          <span
                            aria-hidden
                            className="
                              absolute
                              left-0
                              top-full
                              block
                              text-teal-500
                              transition-transform
                              duration-500
                              ease-[cubic-bezier(.16,1,.3,1)]
                              group-hover:-translate-y-full
                              motion-reduce:hidden
                            "
                          >
                            {section}
                          </span>

      
                        </a>
                      </li>
                    );
                  })}
                </ul>

                {/* Magnetic Contact button */}
                <motion.a
                  ref={contactRef}
                  href="#contact"
                  className="
                    group
                    relative
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-[#1E1E1E]
                    px-5
                    py-2.5
                    text-xs
                    font-medium
                    text-white
                    shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                    outline-offset-4
                    transition-colors
                    duration-300
                    hover:bg-teal-500
                    focus-visible:outline-2
                    focus-visible:outline-teal-500
                    dark:bg-white
                    dark:text-[#1E1E1E]
                    dark:hover:bg-teal-400
                  "
                >
                  <span>Contact</span>

                  <FiArrowUpRight
                    size={14}
                    className="
                      transition-transform
                      duration-500
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </motion.a>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* =========================================================
          FLOATING MENU BUTTON
          Completely unchanged from the previous navbar.
         ========================================================= */}

      <AnimatePresence>
        {!showHeroNav && !isMenuOpen && (
          <motion.div
            initial={{
              scale: 0.5,
              opacity: 0,
              y: -10,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.5,
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: reduce ? 0 : 0.5,
              ease: EASE,
            }}
            className="
              fixed
              right-6
              top-6
              z-50
              md:right-10
            "
          >
            <svg
              viewBox="0 0 56 56"
              className="
                pointer-events-none
                absolute
                inset-0
                h-14
                w-14
                -rotate-90
              "
              aria-hidden
            >
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                strokeWidth="1.5"
                className="stroke-black/10"
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
              className="
                group
                relative
                grid
                h-14
                w-14
                place-items-center
                rounded-full
                bg-[#1E1E1E]
                text-white
                shadow-[0_12px_35px_rgba(0,0,0,0.18)]
                outline-offset-4
                transition-transform
                duration-500
                hover:scale-105
                focus-visible:outline-2
                focus-visible:outline-teal-500
                active:scale-95
              "
            >
              <TbMenu3
                size={20}
                className="
                  transition-transform
                  duration-500
                  group-hover:rotate-6
                "
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          MAIN MENU
          Completely unchanged.
         ========================================================= */}

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduce ? 0 : 0.4,
                ease: EASE,
              }}
              onClick={closeMenu}
              className="
                fixed
                inset-0
                z-[55]
                bg-black/[0.08]
                backdrop-blur-[6px]
              "
            />

            {/* The offset teal shape makes the panel feel layered. */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: -20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: -20,
              }}
              transition={{
                duration: reduce ? 0 : 0.65,
                ease: EASE,
              }}
              className="
                pointer-events-none
                fixed
                right-4
                top-4
                z-[58]
                h-fit
                w-[calc(100%-32px)]
                max-w-[700px]
                rounded-[30px]
                bg-teal-500
                shadow-[0_30px_100px_rgba(0,0,0,0.16)]
                sm:right-8
                sm:top-8
                sm:h-[calc(100dvh-64px)]
                sm:w-[calc(100%-64px)]
                md:rounded-[36px]
              "
              aria-hidden
            />

            <motion.aside
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{
                opacity: 0,
                scale: 0.82,
                y: -18,
                transformOrigin: "top right",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.82,
                y: -18,
              }}
              transition={{
                duration: reduce ? 0 : 0.7,
                ease: EASE,
              }}
              className="
                fixed
                right-4
                top-4
                z-[60]
                flex
                h-fit
                w-[calc(100%-32px)]
                max-w-[700px]
                flex-col
                overflow-hidden
                rounded-[30px]
                border
                border-black/[0.06]
                bg-[#F7F7F5]
                shadow-[0_30px_100px_rgba(0,0,0,0.18)]
                sm:right-8
                sm:top-8
                sm:h-[calc(100dvh-64px)]
                sm:w-[calc(100%-64px)]
                md:rounded-[36px]
              "
            >
              {/* Header */}
              <div
                className="
                  flex
                  shrink-0
                  items-center
                  justify-between
                  px-6
                  pb-4
                  pt-5
                  sm:px-8
                  sm:pb-5
                  sm:pt-7
                "
              >
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-teal-500" />

                  <span
                    className="
                      text-[10px]
                      font-medium
                      tracking-[0.28em]
                      text-neutral-400
                    "
                  >
                    NAVIGATION
                  </span>
                </div>

                <button
                  onClick={closeMenu}
                  aria-label="Close navigation"
                  className="
                    group
                    grid
                    h-10
                    w-10
                    place-items-center
                    rounded-full
                    border
                    border-black/[0.08]
                    text-neutral-700
                    outline-offset-4
                    transition-all
                    duration-300
                    hover:border-black/20
                    hover:bg-black/[0.04]
                    focus-visible:outline-2
                    focus-visible:outline-teal-500
                  "
                >
                  <X
                    size={18}
                    className="
                      transition-transform
                      duration-500
                      group-hover:rotate-90
                    "
                  />
                </button>
              </div>

              {/* Six links become a compact 2 x 3 editorial grid. */}
              <nav
                className="
                  flex
                  flex-1
                  items-center
                  px-6
                  py-3
                  sm:px-8
                  sm:py-4
                "
              >
                <ul className="grid w-full grid-cols-2">
                  {SECTIONS.map((section, index) => {
                    const id = section.toLowerCase();
                    const isActive = activeSection === id;

                    return (
                      <li
                        key={section}
                        className={`overflow-hidden border-black/[0.07] ${
                          index < 4 ? "border-b" : ""
                        } ${
                          index % 2 === 0
                            ? "border-r pr-4 sm:pr-6"
                            : "pl-4 sm:pl-6"
                        }`}
                      >
                        <motion.div
                          initial={{
                            y: "105%",
                            opacity: 0,
                          }}
                          animate={{
                            y: "0%",
                            opacity: 1,
                          }}
                          exit={{
                            y: "105%",
                            opacity: 0,
                          }}
                          transition={{
                            duration: reduce ? 0 : 0.7,
                            ease: EASE,
                            delay: reduce
                              ? 0
                              : 0.12 + index * 0.065,
                          }}
                        >
                          <a
                            href={`#${id}`}
                            onClick={closeMenu}
                            aria-current={
                              isActive ? "true" : undefined
                            }
                            className="
                              group
                              relative
                              flex
                              min-h-[64px]
                              items-center
                              justify-between
                              gap-3
                              outline-offset-4
                              focus-visible:outline-2
                              focus-visible:outline-teal-500
                              sm:min-h-[72px]
                            "
                          >
                            <div className="flex min-w-0 items-baseline gap-3">
                              <span
                                className="
                                  font-mono
                                  text-[9px]
                                  text-neutral-300
                                "
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>

                              <span
                                className={`text-2xl font-medium tracking-[-0.045em] transition-all duration-500 sm:text-3xl ${
                                  isActive
                                    ? "translate-x-1 text-teal-600"
                                    : "text-[#1E1E1E] group-hover:translate-x-1 group-hover:text-teal-600"
                                }`}
                              >
                                {section}
                              </span>
                            </div>

                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 sm:h-9 sm:w-9 ${
                                isActive
                                  ? "border-teal-500 bg-teal-500 text-white"
                                  : "border-black/[0.08] text-neutral-400 group-hover:border-teal-500 group-hover:bg-teal-500 group-hover:text-white"
                              }`}
                            >
                              <FiArrowUpRight
                                size={16}
                                className="
                                  transition-transform
                                  duration-500
                                  group-hover:translate-x-[2px]
                                  group-hover:-translate-y-[2px]
                                "
                              />
                            </span>

                            <span
                              className="
                                absolute
                                bottom-0
                                left-0
                                h-px
                                w-0
                                bg-teal-500
                                transition-all
                                duration-700
                                ease-[cubic-bezier(.16,1,.3,1)]
                                group-hover:w-full
                              "
                            />
                          </a>
                        </motion.div>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                }}
                transition={{
                  delay: reduce ? 0 : 0.55,
                  duration: 0.45,
                  ease: EASE,
                }}
                className="
                  shrink-0
                  border-t
                  border-black/[0.07]
                  px-6
                  pb-5
                  pt-4
                  sm:px-8
                  sm:pb-7
                  sm:pt-5
                "
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[9px] tracking-[0.25em] text-neutral-400">
                      CONNECT
                    </p>

                    <div className="mt-3 flex gap-5">
                      {[
                        {
                          name: "GitHub",
                          href: "https://github.com/farhanadil1",
                        },
                        {
                          name: "LinkedIn",
                          href: "https://www.linkedin.com/in/adil-farhan-b4956424a/",
                        },
                        {
                          name: "Email",
                          href: "mailto:imfarhan574@gmail.com",
                        },
                      ].map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          target={link.name === "Email" ? undefined : "_blank"}
                          rel={link.name === "Email" ? undefined : "noopener noreferrer"}
                          onClick={closeMenu}
                          className="text-xs text-neutral-500 transition-colors duration-300 hover:text-teal-600"
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-[9px]
                      tracking-[0.22em]
                      text-neutral-300
                    "
                  >
                    <span className="h-px w-5 bg-neutral-300" />

                    <span>
                      © {new Date().getFullYear()} ADIL
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}