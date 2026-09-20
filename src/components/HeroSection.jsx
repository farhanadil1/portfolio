import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAME_LINES = ["MD ADIL", "FARHAN"];
const STACK = ["React", "Tailwind", "Java", "Spring Boot", "Node", "MongoDB"];

/* Split a string into per-character spans wrapped in a masked line. */
function MaskedLine({ text, lineIndex }) {
  let charIndex = 0;
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <span className="block">
        {text.split("").map((ch, i) => (
          <span
            key={i}
            data-char
            data-line={lineIndex}
            style={{ "--i": charIndex++ }}
            className="inline-block will-change-transform"
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function HeroSection() {
  const heroRef = useRef(null);
  const auroraRef = useRef(null);
  const spotRef = useRef(null);
  const contentRef = useRef(null);
  const nameRef = useRef(null);
  const magnetRefs = useRef([]);

  magnetRefs.current = [];
  const addMagnet = (el) => {
    if (el && !magnetRefs.current.includes(el)) magnetRefs.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ---------------- FULL MOTION ---------------- */
      mm.add(
        {
          motionOK: "(prefers-reduced-motion: no-preference)",
          isDesktop: "(min-width: 768px) and (pointer: fine)",
        },
        (context) => {
          const { motionOK, isDesktop } = context.conditions;
          if (!motionOK) return;

          const chars = gsap.utils.toArray("[data-char]");

          /* --- Entrance: one orchestrated sequence --- */
          const tl = gsap.timeline({
            defaults: { ease: "expo.out" },
            delay: 0.15,
          });

          tl.set(heroRef.current, { autoAlpha: 1 })
            .from("[data-status]", { yPercent: 120, opacity: 0, duration: 1 })
            .from(
              chars,
              {
                yPercent: 118,
                rotateX: -78,
                opacity: 0,
                duration: 1.5,
                stagger: { each: 0.028, from: "start" },
              },
              "-=0.75"
            )
            .from(
              "[data-bio] > *",
              { y: 24, opacity: 0, duration: 1.1, stagger: 0.09 },
              "-=1.05"
            )
            .from(
              "[data-stack] li",
              { y: 18, opacity: 0, duration: 0.9, stagger: 0.05 },
              "-=0.9"
            )
            .from("[data-cue]", { opacity: 0, duration: 1 }, "-=0.6");

          /* --- Ambient aurora drift --- */
          gsap.utils.toArray("[data-blob]").forEach((blob, i) => {
            gsap.to(blob, {
              xPercent: i % 2 ? -14 : 16,
              yPercent: i % 2 ? 12 : -10,
              scale: 1.18,
              duration: 14 + i * 5,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          });

          /* --- Cursor parallax --- */
          if (isDesktop) {
            const auroraX = gsap.quickTo(auroraRef.current, "x", {
              duration: 0.9,
              ease: "power3.out",
            });
            const auroraY = gsap.quickTo(auroraRef.current, "y", {
              duration: 0.9,
              ease: "power3.out",
            });
            const spotX = gsap.quickTo(spotRef.current, "x", {
              duration: 0.45,
              ease: "power3.out",
            });
            const spotY = gsap.quickTo(spotRef.current, "y", {
              duration: 0.45,
              ease: "power3.out",
            });
            const nameRotY = gsap.quickTo(nameRef.current, "rotationY", {
              duration: 1,
              ease: "power3.out",
            });
            const nameRotX = gsap.quickTo(nameRef.current, "rotationX", {
              duration: 1,
              ease: "power3.out",
            });

            const onMove = (e) => {
              const { innerWidth: w, innerHeight: h } = window;
              const nx = e.clientX / w - 0.5;
              const ny = e.clientY / h - 0.5;

              auroraX(nx * 70);
              auroraY(ny * 70);
              spotX(e.clientX);
              spotY(e.clientY);
              nameRotY(nx * 7);
              nameRotX(-ny * 5);

              chars.forEach((c) => {
                const r = c.getBoundingClientRect();
                const d = (r.left + r.width / 2) / w - 0.5;
                gsap.to(c, {
                  y: ny * 16 * (0.4 + Math.abs(d)),
                  x: nx * 22 * d * 2,
                  duration: 1.1,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              });
            };

            const onLeave = () => {
              gsap.to(chars, { x: 0, y: 0, duration: 1, ease: "power3.out" });
              nameRotX(0);
              nameRotY(0);
            };

            window.addEventListener("mousemove", onMove);
            document.addEventListener("mouseleave", onLeave);

            const cleanups = magnetRefs.current.map((el) => {
              const xTo = gsap.quickTo(el, "x", {
                duration: 0.5,
                ease: "power3.out",
              });
              const yTo = gsap.quickTo(el, "y", {
                duration: 0.5,
                ease: "power3.out",
              });
              const enter = (e) => {
                const r = el.getBoundingClientRect();
                xTo((e.clientX - (r.left + r.width / 2)) * 0.4);
                yTo((e.clientY - (r.top + r.height / 2)) * 0.5);
              };
              const leave = () => {
                xTo(0);
                yTo(0);
              };
              el.addEventListener("mousemove", enter);
              el.addEventListener("mouseleave", leave);
              return () => {
                el.removeEventListener("mousemove", enter);
                el.removeEventListener("mouseleave", leave);
              };
            });

            return () => {
              window.removeEventListener("mousemove", onMove);
              document.removeEventListener("mouseleave", onLeave);
              cleanups.forEach((fn) => fn());
            };
          }
        }
      );

      /* --- Scroll: the hero recedes instead of just scrolling away --- */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        };

        gsap.to(contentRef.current, {
          yPercent: -14,
          scale: 0.94,
          opacity: 0,
          filter: "blur(14px)",
          ease: "none",
          scrollTrigger: st,
        });

        gsap.to(auroraRef.current, {
          yPercent: 22,
          scale: 1.25,
          ease: "none",
          scrollTrigger: st,
        });

        /* Letters peel off at different speeds on the way out.
           fromTo with an EXPLICIT start (yPercent: 0) — not a plain .to().
           A .to() with no "from" captures whatever the current value is
           AT THE MOMENT THE TWEEN IS CREATED as its implicit start. This
           tween is created synchronously on mount, before the entrance
           timeline above has actually played (it has a 0.15s delay), so
           without an explicit start it would snapshot the pre-entrance,
           off-screen position (yPercent: 118) as "start." Scroll back up
           later, and ScrollTrigger forces this tween's progress back to 0
           — rendering that stale off-screen snapshot instead of the
           visible resting state. That was the empty-name-on-scroll-up bug. */
        gsap.fromTo(
          "[data-char]",
          { yPercent: 0 },
          {
            yPercent: () => gsap.utils.random(-70, 20),
            ease: "none",
            scrollTrigger: { ...st, end: "bottom 20%" },
          }
        );

        gsap.to("[data-cue]", {
          opacity: 0,
          y: 30,
          ease: "none",
          scrollTrigger: { ...st, end: "15% top" },
        });
      });

      /* Reduced motion: show everything, animate nothing. */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(heroRef.current, { autoAlpha: 1 });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      style={{ visibility: "hidden" }}
      className="
        relative isolate min-h-[100svh] overflow-hidden
        flex items-center
        px-6 pt-24 md:px-20 md:pt-10
        bg-[#FAFAF9] text-[#101010]
        dark:bg-[#141414] dark:text-white
      "
    >
      {/* Aurora field */}
      <div
        ref={auroraRef}
        aria-hidden
        className="pointer-events-none absolute inset-[-25%] -z-10"
      >
        <div
          data-blob
          className="absolute left-[8%] top-[18%] h-[46vw] w-[46vw] rounded-full blur-[110px]
                     bg-[radial-gradient(circle,rgba(20,184,166,0.30),transparent_70%)]
                     dark:bg-[radial-gradient(circle,rgba(20,184,166,0.26),transparent_70%)]"
        />
        <div
          data-blob
          className="absolute right-[6%] top-[38%] h-[38vw] w-[38vw] rounded-full blur-[120px]
                     bg-[radial-gradient(circle,rgba(56,189,248,0.20),transparent_70%)]
                     dark:bg-[radial-gradient(circle,rgba(99,102,241,0.22),transparent_70%)]"
        />
        <div
          data-blob
          className="absolute left-[38%] bottom-[8%] h-[30vw] w-[30vw] rounded-full blur-[100px]
                     bg-[radial-gradient(circle,rgba(244,114,182,0.14),transparent_70%)]
                     dark:bg-[radial-gradient(circle,rgba(20,184,166,0.14),transparent_70%)]"
        />
      </div>

      {/* Hairline grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10
                   bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px)]
                   dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px)]
                   bg-[size:7.5rem_100%]
                   [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
      />

      {/* Cursor spotlight */}
      <div
        ref={spotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 -z-10 hidden h-[480px] w-[480px]
                   -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 md:block
                   bg-[radial-gradient(circle,rgba(20,184,166,0.16),transparent_62%)]
                   mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.14] dark:opacity-[0.10]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-5xl will-change-transform"
      >
        <div className="mb-10 flex items-center gap-5">
          <span className="overflow-hidden">
            <span
              data-status
              className="flex items-center gap-2.5 text-[0.8rem] text-neutral-600 dark:text-neutral-400"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-500" />
              </span>
              Full stack developer, open to work
            </span>
          </span>
          <span
            data-rule
            className="h-px flex-1 bg-gradient-to-r from-teal-500/50 to-transparent"
          />
        </div>

        <h1
          ref={nameRef}
          className="font-medium leading-[0.85] tracking-[-0.03em]
                     text-[clamp(3.25rem,7vw,9rem)]
                     [transform-style:preserve-3d]"
          style={{ perspective: "800px" }}
        >
          <span className="sr-only">MD Adil Farhan</span>
          <span aria-hidden>
            {NAME_LINES.map((line, i) => (
              <MaskedLine key={line} text={line} lineIndex={i} />
            ))}
          </span>
        </h1>

        <div data-bio className="mt-10 md:mt-1 max-w-xl space-y-6">
          <p className="text-[1.0625rem] leading-relaxed text-neutral-600 dark:text-neutral-300">
            I design and engineer interactive web systems where motion,
            performance, and structure work together — not separately.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              ref={addMagnet}
              href="#work"
              className="group relative inline-flex items-center overflow-hidden rounded-full
                         bg-[#101010] px-7 py-3.5 text-sm text-white
                         outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-500
                         dark:bg-white dark:text-[#101010]"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-teal-500 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
              <span className="relative transition-colors duration-300 group-hover:text-white dark:group-hover:text-white">
                See selected work
              </span>
            </a>

            <a
              ref={addMagnet}
              href="#contact"
              className="rounded-full border border-black/15 px-7 py-3.5 text-sm
                         transition-colors duration-300 hover:border-teal-500 hover:text-teal-600
                         outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-500
                         dark:border-white/15 dark:hover:text-teal-400"
            >
              Get in touch
            </a>
          </div>
        </div>

        <ul
          data-stack
          className="mt-12 md:mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[0.8125rem] text-neutral-500 dark:text-neutral-400"
        >
          {STACK.map((tech) => (
            <li
              key={tech}
              className="relative cursor-default transition-colors duration-300 hover:text-teal-600 dark:hover:text-teal-400
                         after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right
                         after:scale-x-0 after:bg-teal-500 after:transition-transform after:duration-500
                         after:ease-[cubic-bezier(.16,1,.3,1)] hover:after:origin-left hover:after:scale-x-100"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll cue */}
      <div
        data-cue
        aria-hidden
        className="absolute bottom-8  z-10 flex items-center gap-3 right-20"
      >
        <span className="relative h-10 w-px overflow-hidden bg-black/15 dark:bg-white/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[cue_2s_cubic-bezier(.16,1,.3,1)_infinite] bg-teal-500" />
        </span>
        <span className="text-[0.8rem] text-neutral-500 dark:text-neutral-500">
          Scroll
        </span>
      </div>

      <style>{`
        @keyframes cue {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-cue] span { animation: none !important; }
        }
      `}</style>
    </section>
  );
}