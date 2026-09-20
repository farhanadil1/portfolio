import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowUpRight,
  FiCheck,
  FiCopy,
  FiMail,
} from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const email = "imfarhan574@gmail.com";
const linkedinURL =
  "https://www.linkedin.com/in/md-adil-farhan-b4956424a/";

const marqueeItems = [
  "DESIGN × ENGINEERING",
  "BUILD WITH PURPOSE",
  "CODE WITH INTENT",
  "DIGITAL EXPERIENCES",
  "THINK · BUILD · REFINE",
  "FROM CONCEPT TO PRODUCT",
];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const auroraRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const marqueeRef = useRef(null);
  const emailRef = useRef(null);
  const linkedinRef = useRef(null);
  const dotRef = useRef(null);
  const copyTimeoutRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Bring the content in quickly so the section feels light.
        gsap.from(".contact-reveal", {
          opacity: 0,
          y: 20,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });

        // The heading gets its own reveal because it is the visual focus.
        gsap.from(".contact-heading-line", {
          yPercent: 105,
          duration: 0.95,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });

        // A slow-moving glow adds some life without distracting from the text.
        gsap.to(auroraRef.current, {
          xPercent: 12,
          yPercent: -8,
          scale: 1.12,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Small pulse to make the availability status feel alive.
        gsap.to(dotRef.current, {
          scale: 1.45,
          opacity: 0.45,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // The repeated content makes the ribbon loop without a visible jump.
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 28,
          repeat: -1,
          ease: "none",
        });

        const finePointer = window.matchMedia("(pointer: fine)").matches;

        if (!finePointer) return;

        // A very soft glow follows the mouse on desktop.
        const handleMouseMove = (event) => {
          const rect = sectionRef.current.getBoundingClientRect();

          gsap.to(cursorGlowRef.current, {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            duration: 0.7,
            ease: "power3.out",
            overwrite: true,
          });
        };

        sectionRef.current.addEventListener(
          "mousemove",
          handleMouseMove
        );

        // Both contact actions get a subtle magnetic pull.
        const magneticElements = [
          {
            element: emailRef.current,
            strength: 0.14,
          },
          {
            element: linkedinRef.current,
            strength: 0.3,
          },
        ];

        const cleanups = magneticElements.map(
          ({ element, strength }) => {
            if (!element) return () => {};

            const xTo = gsap.quickTo(element, "x", {
              duration: 0.45,
              ease: "power3.out",
            });

            const yTo = gsap.quickTo(element, "y", {
              duration: 0.45,
              ease: "power3.out",
            });

            const handleMove = (event) => {
              const bounds = element.getBoundingClientRect();

              const x =
                event.clientX -
                (bounds.left + bounds.width / 2);

              const y =
                event.clientY -
                (bounds.top + bounds.height / 2);

              xTo(x * strength);
              yTo(y * strength);
            };

            const reset = () => {
              xTo(0);
              yTo(0);
            };

            element.addEventListener("mousemove", handleMove);
            element.addEventListener("mouseleave", reset);

            return () => {
              element.removeEventListener(
                "mousemove",
                handleMove
              );

              element.removeEventListener(
                "mouseleave",
                reset
              );
            };
          }
        );

        return () => {
          sectionRef.current?.removeEventListener(
            "mousemove",
            handleMouseMove
          );

          cleanups.forEach((cleanup) => cleanup());
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".contact-heading-line", {
          yPercent: 0,
        });

        gsap.set(".contact-reveal", {
          opacity: 1,
          y: 0,
        });

        gsap.set(marqueeRef.current, {
          xPercent: 0,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);

      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }

    clearTimeout(copyTimeoutRef.current);

    copyTimeoutRef.current = setTimeout(() => {
      setCopied(false);
      setCopyFailed(false);
    }, 1800);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        relative
        overflow-hidden
        bg-white
        px-5
        py-16
        text-black
        dark:bg-[#1E1E1E]
        dark:text-white
        sm:px-8
        sm:py-20
        lg:flex
        lg:min-h-[calc(100vh-80px)]
        lg:flex-col
        lg:justify-between
        lg:px-16
        lg:py-10
        xl:px-20
      "
    >
      {/* A very faint grid gives the background some texture. */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          dark:opacity-[0.025]
          [background-image:linear-gradient(rgba(0,0,0,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.7)_1px,transparent_1px)]
          [background-size:70px_70px]
          dark:[background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)]
        "
      />

      {/* Large background text adds depth without taking up actual layout space. */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-3%]
          right-[-3%]
          select-none
          whitespace-nowrap
          text-[18vw]
          font-semibold
          leading-none
          tracking-[-0.09em]
          text-black/[0.025]
          dark:text-white/[0.018]
        "
      >
        TALK
      </div>

      {/* Soft teal light behind the main content. */}
      <div
        ref={auroraRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[15%]
          top-[15%]
          h-[40vw]
          w-[40vw]
          rounded-full
          bg-[radial-gradient(circle,rgba(20,184,166,0.11),transparent_70%)]
          blur-3xl
          dark:bg-[radial-gradient(circle,rgba(20,184,166,0.13),transparent_70%)]
        "
      />

      {/* Desktop-only glow that follows the cursor. */}
      <div
        ref={cursorGlowRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          hidden
          h-[400px]
          w-[400px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-teal-400/[0.025]
          blur-[110px]
          md:block
        "
      />

      <div className="relative z-10 md:mt-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center">
        {/* Main contact content. */}
        <div className="grid items-start gap-8 lg:grid-cols-[150px_minmax(0,1fr)] lg:gap-10">
          <div className="contact-reveal">
            <div className="flex items-center gap-3 lg:pt-3">
              <span className="h-px w-7 bg-teal-500 dark:bg-teal-400" />

              <span className="text-[10px] font-medium tracking-[0.3em] text-black/40 dark:text-white/35">
                CONTACT
              </span>
            </div>
          </div>

          <div>
            <h2
              className="
                max-w-6xl
                overflow-hidden
                text-[clamp(3rem,7.5vw,7.5rem)]
                font-medium
                leading-[0.86]
                tracking-[-0.065em]
              "
            >
              <span className="block overflow-hidden pb-1">
                <span className="contact-heading-line block">
                  Let's build
                </span>
              </span>

              <span className="block overflow-hidden pb-1 text-black/30 dark:text-white/35">
                <span className="contact-heading-line block">
                  something meaningful.
                </span>
              </span>
            </h2>

            <div className="mt-6 flex max-w-xl items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500 dark:bg-teal-400" />

              <p className="contact-reveal text-sm leading-relaxed text-black/55 dark:text-white/40 sm:text-base">
                I'm open to full-time opportunities and thoughtful
                collaborations where engineering, design, and ideas
                come together.
              </p>
            </div>

            <div className="contact-reveal mt-5 flex items-center gap-3">
              <span
                ref={dotRef}
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-teal-500
                  shadow-[0_0_16px_rgba(20,184,166,0.65)]
                  dark:bg-teal-400
                "
              />

              <span className="text-[10px] tracking-[0.18em] text-black/40 dark:text-white/30">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>
          </div>
        </div>

        {/* Email is the main action, so it gets the most visual weight. */}
        <div
          className="
            contact-reveal
            mt-12
            border-t
            border-black/10
            pt-6
            dark:border-white/10
            sm:mt-14
            sm:pt-7
            lg:mt-16
          "
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[9px] tracking-[0.3em] text-black/30 dark:text-white/25">
              DROP ME A LINE
            </span>

            <FiMail className="text-sm text-black/30 dark:text-white/25" />
          </div>

          <button
            ref={emailRef}
            onClick={copyEmail}
            aria-live="polite"
            className="
              group
              flex
              w-full
              items-end
              justify-between
              gap-5
              text-left
              outline-none
              focus-visible:ring-1
              focus-visible:ring-teal-500
              dark:focus-visible:ring-teal-400
            "
          >
            <span
              className="
                relative
                max-w-full
                break-all
                text-[clamp(1.45rem,4vw,3.5rem)]
                font-medium
                leading-none
                tracking-[-0.045em]
                text-black
                dark:text-white
              "
            >
              {email}

              <span
                className="
                  absolute
                  -bottom-2
                  left-0
                  h-px
                  w-full
                  origin-left
                  scale-x-0
                  bg-teal-500
                  transition-transform
                  duration-700
                  ease-[cubic-bezier(.16,1,.3,1)]
                  group-hover:scale-x-100
                  dark:bg-teal-400
                "
              />
            </span>

            <span
              className="
                hidden
                shrink-0
                items-center
                gap-2
                pb-1
                text-[10px]
                tracking-[0.15em]
                text-teal-600
                sm:flex
                dark:text-teal-400
              "
            >
              {copyFailed ? (
                "SELECT MANUALLY"
              ) : copied ? (
                <>
                  COPIED
                  <FiCheck />
                </>
              ) : (
                <>
                  COPY
                  <FiCopy className="transition-transform duration-300 group-hover:scale-110" />
                </>
              )}
            </span>
          </button>

          {/* Keep the copy hint available on phones without adding much height. */}
          <div className="mt-3 sm:hidden">
            <span className="flex items-center gap-2 text-[10px] text-teal-600 dark:text-teal-400">
              {copyFailed ? (
                "Couldn't copy — select manually"
              ) : copied ? (
                <>
                  Copied
                  <FiCheck />
                </>
              ) : (
                <>
                  Tap to copy
                  <FiCopy />
                </>
              )}
            </span>
          </div>
        </div>

        {/* LinkedIn and location stay on the same line when space allows. */}
        <div className="contact-reveal mt-6 flex flex-wrap items-center gap-4">
          <a
            ref={linkedinRef}
            href={linkedinURL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-black/10
              px-5
              py-2.5
              text-sm
              font-medium
              text-black/60
              transition-all
              duration-300
              hover:border-teal-500/40
              hover:bg-teal-500/[0.04]
              hover:text-black
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-teal-500
              focus-visible:outline-offset-4
              dark:border-white/10
              dark:text-white/60
              dark:hover:border-teal-400/40
              dark:hover:bg-teal-400/[0.04]
              dark:hover:text-white
              dark:focus-visible:outline-teal-400
            "
          >
            <FaLinkedin className="text-base" />

            LinkedIn

            <FiArrowUpRight
              className="
                text-base
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </a>

          <span className="text-[10px] tracking-[0.08em] text-black/35 dark:text-white/20">
            Based in India · Remote & on-site
          </span>
        </div>
      </div>

      {/* The ribbon acts as a visual signature rather than another CTA. */}
      <div
        className="
          relative
          left-1/2
          z-10
          mt-12
          w-screen
          -translate-x-1/2
          rotate-[-1.5deg]
          overflow-hidden
          border-y
          border-black/[0.08]
          bg-black
          py-3
          text-white
          dark:border-white/[0.08]
          dark:bg-teal-400
          dark:text-[#1E1E1E]
          sm:mt-14
          sm:py-3.5
          lg:mt-10
        "
      >
        <div
          ref={marqueeRef}
          className="flex w-max items-center"
        >
          {[...Array(2)].flatMap((_, copyIndex) =>
            marqueeItems.map((item, index) => (
              <div
                key={`${copyIndex}-${item}-${index}`}
                className="flex items-center"
              >
                <span
                  className="
                    whitespace-nowrap
                    px-5
                    text-sm
                    font-medium
                    tracking-[0.08em]
                    sm:px-7
                    sm:text-base
                    md:text-lg
                  "
                >
                  {item}
                </span>

                <span className="text-teal-400 dark:text-[#1E1E1E]">
                  ✳
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* A tiny footer line finishes the section without adding another block. */}
      <div
        className="
          relative
          z-10
          mx-auto
          mt-7
          w-full
          max-w-7xl
          border-black/10
          pt-4
          dark:border-white/10
          sm:mt-8
        "
      >
      </div>
    </section>
  );
}