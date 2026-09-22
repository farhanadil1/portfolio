import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    href: "https://www.linkedin.com/in/adil-farhan-b4956424a/",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/farhanadil1",
    label: "GitHub",
  },
  {
    href: "https://www.instagram.com/farhanadil_",
    label: "Instagram",
  },
];

export default function Footer() {
  const sectionRef = useRef(null);
  const slabRef = useRef(null);
  const contentRef = useRef(null);
  const identityRef = useRef(null);

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The footer starts as an inset card and grows into the full viewport.
        gsap.fromTo(
          slabRef.current,
          {
            left: "5vw",
            right: "5vw",
            borderRadius: "40px",
          },
          {
            left: "0vw",
            right: "0vw",
            borderRadius: "0px",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "top 20%",
              scrub: 0.6,
            },
          }
        );

        // Let the content arrive slightly after the background starts expanding.
        gsap.fromTo(
          contentRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 45%",
              scrub: 0.8,
            },
          }
        );

        // The large name gets a slower entrance so it feels like the final reveal.
        gsap.fromTo(
          identityRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "top 20%",
              scrub: 0.8,
            },
          }
        );
      });

      // Without animation, the footer simply stays fully expanded and readable.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(slabRef.current, {
          left: 0,
          right: 0,
          borderRadius: 0,
        });

        gsap.set(contentRef.current, {
          opacity: 1,
          y: 0,
        });

        gsap.set(identityRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-white"
    >
      {/* This layer carries the actual footer background and expands on scroll. */}
      <div
        ref={slabRef}
        aria-hidden="true"
        className="absolute bottom-0 top-0 bg-[#1E1E1E]"
        style={{ left: "5vw", right: "5vw", borderRadius: "40px" }}
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 py-16 text-white sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-14 xl:px-20"
      >
        {/* The upper grid keeps the useful footer information easy to find. */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 text-sm md:grid-cols-4 md:gap-12">
          <div>
            <p className="mb-4 tracking-[0.2em] text-white/35">
              LINKS
            </p>

            <ul className="space-y-3">
              {["Home", "Projects", "About", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="group inline-flex items-center gap-1.5 text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {link}

                    <FiArrowUpRight className="text-xs opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 tracking-[0.2em] text-white/35">
              SOCIALS
            </p>

            <ul className="space-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {social.label}

                    <FiArrowUpRight className="text-xs opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 tracking-[0.2em] text-white/35">
              CONTACT
            </p>

            <a
              href="mailto:imfarhan574@gmail.com"
              className="text-white/70 transition-colors duration-300 hover:text-white"
            >
              imfarhan574@gmail.com
            </a>
          </div>

          <div>
            <p className="mb-4 tracking-[0.2em] text-white/35">
              LOCAL TIME
            </p>

            <p className="text-lg text-white/85">
              {time} IST
            </p>
          </div>
        </div>

        {/* ADIL is the final visual statement, so it gets most of the space. */}
        <motion.div
          ref={identityRef}
          onClick={scrollToTop}
          whileHover="hover"
          initial="rest"
          className="relative cursor-pointer select-none py-16 sm:py-20 md:py-24 lg:py-12"
        >
          <motion.h1
            variants={{
              rest: {
                letterSpacing: "-0.04em",
              },
              hover: {
                letterSpacing: "0.02em",
              },
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="text-[24vw] font-medium leading-[0.75] tracking-tight sm:text-[22vw] md:text-[20vw] lg:text-[19vw]"
          >
            ADIL
          </motion.h1>

          {/* Desktop hover cue stays subtle so it doesn't compete with the name. */}
          <motion.div
            variants={{
              rest: {
                opacity: 0,
                y: 10,
              },
              hover: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-8 right-2 hidden items-center gap-2 text-sm text-white/45 md:flex"
          >
            <span>Back to top</span>
            <FiArrowUpRight />
          </motion.div>

          {/* Mobile has no hover state, so the cue stays visible. */}
          <div className="absolute bottom-8 right-2 flex items-center gap-2 text-xs text-white/45 md:hidden">
            <span>Back to top</span>
            <FiArrowUpRight />
          </div>
        </motion.div>

        {/* Keep the closing information minimal so the footer doesn't feel crowded. */}
        <div className="flex flex-col items-center gap-4 text-xs text-white/40 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} Md Adil Farhan · All rights reserved
          </p>

          <p className="hidden sm:block">
            React · Tailwind · Framer Motion · GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}