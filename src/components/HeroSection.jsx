import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowUpRight,
  FiMail,
  FiMousePointer,
} from "react-icons/fi";
import {
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";
gsap.registerPlugin(ScrollTrigger);

const NAME_LINES = ["MD ADIL", "FARHAN"];


const SOCIALS = [
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/yourusername",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/yourusername",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/yourusername",
  },
];

function MaskedLine({ children, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex justify-center">
        {children.split("").map((char, index) => (
          <span
            key={`${char}-${index}`}
            data-char
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const heroRef = useRef(null);
  const auroraRef = useRef(null);
  const spotRef = useRef(null);
  const contentRef = useRef(null);
  const nameRef = useRef(null);
  const magnetRefs = useRef([]);

  useEffect(() => {
    const hero = heroRef.current;
    const aurora = auroraRef.current;
    const spot = spotRef.current;
    const content = contentRef.current;
    const name = nameRef.current;

    if (!hero || !content || !name) return;

    const ctx = gsap.context(() => {
      const chars = name.querySelectorAll("[data-char]");
      const status = hero.querySelector("[data-status]");
      const bio = hero.querySelector("[data-bio]");
      const stack = hero.querySelector("[data-stack]");
      const cue = hero.querySelector("[data-cue]");
      const cornerMeta = hero.querySelector("[data-corner-meta]");
      const accent = hero.querySelector("[data-accent]");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(hero, {
          visibility: "visible",
        });

        gsap.set(
          [
            status,
            chars,
            bio,
            stack,
            cue,
            cornerMeta,
            accent,
          ].filter(Boolean),
          {
            clearProps: "all",
            opacity: 1,
            y: 0,
            x: 0,
            rotateX: 0,
            rotateY: 0,
          }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(hero, {
          visibility: "visible",
        });

        gsap.set(status, {
          opacity: 0,
          y: 16,
        });

        gsap.set(chars, {
          opacity: 0,
          yPercent: 115,
          rotateX: -75,
          transformOrigin: "50% 100%",
        });

        gsap.set(bio, {
          opacity: 0,
          y: 22,
        });

        gsap.set(stack, {
          opacity: 0,
          y: 18,
        });

        gsap.set(cue, {
          opacity: 0,
          y: 12,
        });

        gsap.set(cornerMeta, {
          opacity: 0,
          x: 20,
        });

        gsap.set(accent, {
          opacity: 0,
          scale: 0.5,
        });

        /*
         * Hero entrance
         */
        const intro = gsap.timeline({
          defaults: {
            ease: "power4.out",
          },
        });

        intro
          .to(status, {
            opacity: 1,
            y: 0,
            duration: 0.8,
          })
          .to(
            chars,
            {
              opacity: 1,
              yPercent: 0,
              rotateX: 0,
              duration: 1.2,
              stagger: {
                each: 0.025,
              },
            },
            "-=0.4"
          )
          .to(
            accent,
            {
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "back.out(1.8)",
            },
            "-=0.65"
          )
          .to(
            bio,
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
            },
            "-=0.45"
          )
          .to(
            stack,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
            },
            "-=0.5"
          )
          .to(
            cue,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
            },
            "-=0.45"
          )
          .to(
            cornerMeta,
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
            },
            "-=0.7"
          );

        /*
         * Ambient aurora
         */
        if (aurora) {
          gsap.to(aurora, {
            xPercent: 10,
            yPercent: -8,
            scale: 1.08,
            duration: 8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        /*
         * Cursor interaction
         */
        const handlePointerMove = (event) => {
          const bounds = hero.getBoundingClientRect();

          const x =
            (event.clientX - bounds.left) /
              bounds.width -
            0.5;

          const y =
            (event.clientY - bounds.top) /
              bounds.height -
            0.5;

          /*
           * Aurora follows cursor softly.
           */
          if (aurora) {
            gsap.to(aurora, {
              x: x * 40,
              y: y * 28,
              duration: 1.25,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          /*
           * Spotlight follows cursor.
           */
          if (spot) {
            gsap.to(spot, {
              x:
                event.clientX -
                bounds.left,
              y:
                event.clientY -
                bounds.top,
              duration: 0.35,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          /*
           * Main typography has a very subtle
           * 3D response to the cursor.
           */
          if (name) {
            gsap.to(name, {
              rotateX: y * -2.5,
              rotateY: x * 3,
              duration: 1.2,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          /*
           * Individual characters shift slightly.
           * This keeps the typography feeling alive.
           */
          gsap.to(chars, {
            x: x * 5,
            y: y * 3,
            duration: 0.9,
            stagger: 0.01,
            ease: "power3.out",
            overwrite: "auto",
          });

          /*
           * Accent dot reacts a little stronger.
           */
          if (accent) {
            gsap.to(accent, {
              x: x * 10,
              y: y * 8,
              duration: 0.8,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        };

        const handlePointerEnter = () => {
          if (spot) {
            gsap.to(spot, {
              opacity: 1,
              duration: 0.35,
            });
          }
        };

        const handlePointerLeave = () => {
          if (spot) {
            gsap.to(spot, {
              opacity: 0,
              duration: 0.35,
            });
          }

          gsap.to(name, {
            rotateX: 0,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
          });

          gsap.to(chars, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out",
          });

          if (accent) {
            gsap.to(accent, {
              x: 0,
              y: 0,
              duration: 1,
              ease: "power3.out",
            });
          }
        };

        hero.addEventListener(
          "pointermove",
          handlePointerMove
        );

        hero.addEventListener(
          "pointerenter",
          handlePointerEnter
        );

        hero.addEventListener(
          "pointerleave",
          handlePointerLeave
        );

        /*
         * Magnetic interactions
         *
         * Every element assigned through magnetRefs
         * gets the same magnetic behaviour.
         */
        const magnets =
          magnetRefs.current.filter(Boolean);

        magnets.forEach((button) => {
          const strength =
            Number(button.dataset.magneticStrength) ||
            0.22;

          const xTo = gsap.quickTo(
            button,
            "x",
            {
              duration: 0.4,
              ease: "power3.out",
            }
          );

          const yTo = gsap.quickTo(
            button,
            "y",
            {
              duration: 0.4,
              ease: "power3.out",
            }
          );

          const handleMagneticMove = (event) => {
            const rect =
              button.getBoundingClientRect();

            const x =
              event.clientX -
              (rect.left + rect.width / 2);

            const y =
              event.clientY -
              (rect.top + rect.height / 2);

            xTo(x * strength);
            yTo(y * strength);
          };

          const handleMagneticLeave = () => {
            xTo(0);
            yTo(0);
          };

          button.addEventListener(
            "pointermove",
            handleMagneticMove
          );

          button.addEventListener(
            "pointerleave",
            handleMagneticLeave
          );

          button._magneticCleanup = () => {
            button.removeEventListener(
              "pointermove",
              handleMagneticMove
            );

            button.removeEventListener(
              "pointerleave",
              handleMagneticLeave
            );
          };
        });

        /*
         * Hero recession into About.
         */
        const recession = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        recession
          .to(
            content,
            {
              scale: 0.94,
              y: -30,
              opacity: 0,
              filter: "blur(14px)",
              ease: "none",
            },
            0
          )
          .to(
            aurora,
            {
              scale: 1.35,
              opacity: 0,
              ease: "none",
            },
            0
          )
          .to(
            chars,
            {
              yPercent: -30,
              opacity: 0,
              ease: "none",
              stagger: 0.01,
            },
            0
          )
          .to(
            cue,
            {
              opacity: 0,
              y: 20,
              ease: "none",
            },
            0
          );

        return () => {
          hero.removeEventListener(
            "pointermove",
            handlePointerMove
          );

          hero.removeEventListener(
            "pointerenter",
            handlePointerEnter
          );

          hero.removeEventListener(
            "pointerleave",
            handlePointerLeave
          );

          magnets.forEach((button) => {
            button._magneticCleanup?.();
          });

          recession.scrollTrigger?.kill();
          recession.kill();
        };
      });

      return () => mm.revert();
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      style={{ visibility: "hidden" }}
      className="
        relative isolate h-[100svh] overflow-hidden
        bg-[#FAFAF9] text-[#101010]
        dark:bg-[#141414] dark:text-white
      "
    >
      {/* Ambient aurora */}
      <div
        ref={auroraRef}
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-[18%] top-[2%]
          h-[60vw] w-[60vw]
          max-h-[850px] max-w-[850px]
          rounded-full
          bg-teal-400/[0.12]
          blur-[130px]
          dark:bg-teal-400/[0.13]
        "
      />

      {/* Cursor spotlight */}
      <div
        ref={spotRef}
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-0 top-0
          h-64 w-64
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-teal-400/[0.07]
          blur-3xl
          opacity-0
        "
      />

      {/* Subtle editorial grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-[0.022]
          dark:opacity-[0.032]
          [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
          [background-size:80px_80px]
          dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
        "
      />

      {/* Main content */}
      <div
        ref={contentRef}
        className="
          relative z-10
          flex h-full w-full
          items-center justify-center
          px-6
          md:px-24
          lg:px-32
        "
      >
        <div
          className="
            flex w-full max-w-[1500px]
            flex-col items-center
            justify-center
            pb-8
            pt-20
            text-center
            md:pb-4
            md:pt-6
          "
        >
          {/* Small status */}
          <div
            data-status
            className="
              flex items-center gap-3
              text-[9px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-black/45
              dark:text-white/45
            "
          >
            <span
              className="
                relative flex h-2 w-2
                items-center justify-center
              "
            >
              <span
                className="
                  absolute h-2 w-2
                  animate-ping rounded-full
                  bg-teal-500/40
                "
              />

              <span
                className="
                  relative h-1.5 w-1.5
                  rounded-full bg-teal-500
                "
              />
            </span>

            <span>
              Available for work
            </span>
          </div>

          {/* Name */}
          <div
            ref={nameRef}
            className="
              mt-8
              w-full
              [perspective:1400px]
              md:mt-10
            "
          >
            <MaskedLine
              className="
                text-[clamp(4.25rem,10vw,12.5rem)]
                font-medium
                leading-[0.76]
                tracking-[-0.085em]
              "
            >
              {NAME_LINES[0]}
            </MaskedLine>

            <div
              className="
                relative
                flex items-end justify-center
              "
            >
              <MaskedLine
                className="
                  text-[clamp(4.25rem,10vw,12.5rem)]
                  font-medium
                  leading-[0.76]
                  tracking-[-0.085em]
                "
              >
                {NAME_LINES[1]}
              </MaskedLine>

              {/* Meaningful accent */}
              <span
                ref={(el) => {
                  if (el) {
                    magnetRefs.current[2] = el;
                  }
                }}
                data-accent
                className="
                  absolute
                  bottom-[0.2em]
                  ml-[clamp(21rem,40vw,42rem)]
                  h-3 w-3
                  rounded-full
                  bg-teal-500
                  shadow-[0_0_35px_rgba(20,184,166,0.35)]
                  md:h-4 md:w-4
                "
              />
            </div>
          </div>

          {/* Supporting statement */}
          <div
            data-bio
            className="
              mt-9
              max-w-[650px]
              md:mt-11
            "
          >
            <p
              className="
                text-[clamp(1rem,1.55vw,1.35rem)]
                leading-[1.4]
                tracking-[-0.025em]
                text-black/60
                dark:text-white/60
              "
            >
              Java Full Stack Engineer building
              thoughtful digital products with
              React, Spring Boot and modern web
              technologies.
            </p>

            {/* Magnetic CTAs */}
            <div
              className="
                mt-7
                flex flex-wrap
                items-center
                justify-center
                gap-3
                md:mt-8
              "
            >
              <a
                ref={(el) => {
                  magnetRefs.current[0] = el;
                }}
                data-magnetic-strength="0.24"
                href="#projects"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#101010]
                  px-6 py-3.5
                  text-sm
                  font-medium
                  text-white
                  shadow-[0_12px_40px_rgba(0,0,0,0.08)]
                  transition-colors
                  duration-300
                  hover:bg-teal-500
                  dark:bg-white
                  dark:text-[#101010]
                  dark:hover:bg-teal-400
                "
              >
                <span>
                  Explore selected work
                </span>

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

              <a
                ref={(el) => {
                  magnetRefs.current[1] = el;
                }}
                data-magnetic-strength="0.24"
                href="#contact"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-black/10
                  bg-black/[0.025]
                  px-6 py-3.5
                  text-sm
                  font-medium
                  text-[#101010]
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-teal-500/40
                  hover:bg-teal-500/[0.06]
                  dark:border-white/10
                  dark:bg-white/[0.03]
                  dark:text-white
                  dark:hover:border-teal-400/40
                  dark:hover:bg-teal-400/[0.06]
                "
              >
                <FiMail
                  className="
                    text-base
                    text-teal-500
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

                <span>
                  Let&apos;s talk
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Top-right metadata */}
      <div
        data-corner-meta
        className="
          absolute
          left-6 top-7
          z-20
          hidden
          text-left
          md:left-10
          md:top-9
          md:block
          lg:left-14
        "
      >
        <div
          className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.28em]
            text-black/35
            dark:text-white/35
          "
        >
          Java Full Stack
        </div>

        <div
          className="
            mt-2
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-black/55
            dark:text-white/55
          "
        >
          Kolkata · India
        </div>

        <div
          className="
            mt-1
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-teal-600
            dark:text-teal-400
          "
        >
          2026
        </div>
      </div>

      {/* Bottom-left stack */}
      <div
        data-stack
        className="
          absolute
          bottom-7 left-6
          z-20
          hidden
          md:block
          lg:left-10
        "
      >
        <div
          className="
            mb-3
            text-[8px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-black/30
            dark:text-white/30
          "
        >
          Connect
        </div>

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-x-4
            gap-y-2
          "
        >
          {SOCIALS.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit my ${item.name}`}
                className="
                  group
                  flex
                  items-center
                  gap-1.5
                  text-[10px]
                  text-black/45
                  transition-colors
                  duration-300
                  hover:text-teal-500
                  dark:text-white/45
                  dark:hover:text-teal-400
                "
              >
                <Icon
                  className="
                    text-xs
                    text-black/55
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:text-teal-500
                    dark:text-white/55
                    dark:group-hover:text-teal-400
                  "
                />

                <span>{item.name}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom-right scroll cue */}
      <div
        data-cue
        className="
          absolute
          bottom-7 right-6
          z-20
          flex
          items-center
          gap-3
          text-[9px]
          font-medium
          uppercase
          tracking-[0.28em]
          text-black/35
          dark:text-white/35
          md:right-10
          lg:right-14
        "
      >
        <FiMousePointer
          className="
            text-sm
            text-teal-600
            dark:text-teal-400
          "
        />

        <span>
          Scroll to explore
        </span>
      </div>
    </section>
  );
}