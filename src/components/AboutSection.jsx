import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

/* Files in public/ are referenced by URL, not imported. */
const PROFILE_IMG = "/pp.jpeg";
const RESUME_URL = "/farhanadil_cv.pdf";

const BIO = [
  "B.Tech CSE student based in India, focused on building calm, scalable, and well-engineered digital systems.",
  "I enjoy working at the intersection of frontend motion, backend architecture, and product design thinking.",
];

const META = {
  Experience: ["Frontend Development", "Full Stack Projects", "UI Motion Design"],
  Interests: ["Product Engineering", "Motion Systems", "Design Psychology"],
};

/* Words as individual spans so scroll can "develop" the paragraph. */
function ScrubText({ children }) {
  return (
    <p className="text-[1.0625rem] leading-relaxed">
      {children.split(" ").map((word, i) => (
        <span key={i} data-word className="inline-block text-white">
          {word}
          {"\u00A0"}
        </span>
      ))}
    </p>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const slabRef = useRef(null);
  const curveRef = useRef(null);
  const portraitRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* Layout shifts from the late-loading portrait would desync every
         trigger below. Reserve space in CSS, then refresh on load. */
      const img = imgRef.current;
      if (img && !img.complete) {
        const refresh = () => ScrollTrigger.refresh();
        img.addEventListener("load", refresh);
        img.addEventListener("error", refresh);
      }

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* --- The slab docks: a rounded inset card expands to full bleed ---
           An element of its own, so the theme classes underneath stay live
           and nothing writes inline styles onto the section. */
        gsap.fromTo(
          slabRef.current,
          { left: "5vw", right: "5vw", borderRadius: "40px" },
          {
            left: "0vw",
            right: "0vw",
            borderRadius: "0px",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "top 25%",
              scrub: 0.5,
            },
          }
        );

        /* --- Heading lines rise out of their masks --- */
        gsap.from("[data-line-inner]", {
          yPercent: 115,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-head]", start: "top 82%" },
        });

        /* --- Bio develops word by word as you scroll through it --- */
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.35,
            scrollTrigger: {
              trigger: "[data-bio]",
              start: "top 78%",
              end: "bottom 60%",
              scrub: 0.4,
            },
          }
        );

        /* --- Meta columns --- */
        gsap.from("[data-meta] li", {
          y: 18,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: "[data-meta]", start: "top 85%" },
        });

        /* --- Portrait: wipes up, image counter-drifts behind the frame --- */
        gsap.fromTo(
          portraitRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: { trigger: portraitRef.current, start: "top 85%" },
          }
        );

        gsap.fromTo(
          imgRef.current,
          { yPercent: -8, scale: 1.14 },
          {
            yPercent: 8,
            scale: 1.14,
            ease: "none",
            scrollTrigger: {
              trigger: portraitRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.from("[data-tag]", {
          x: 24,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: portraitRef.current, start: "top 70%" },
        });

        /* --- Curve draws against its measured length, not a guess --- */
        const path = curveRef.current;
        if (path) {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: 1,
            },
          });
        }
      });

      /* Reduced motion: no scroll choreography, everything legible. */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(slabRef.current, { left: 0, right: 0, borderRadius: 0 });
        gsap.set("[data-word]", { opacity: 1 });
        gsap.set(curveRef.current, { strokeDashoffset: 0 });
      });

      return () => {
        if (img) {
          img.removeEventListener("load", ScrollTrigger.refresh);
          img.removeEventListener("error", ScrollTrigger.refresh);
        }
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#FAFAF9] py-28 dark:bg-[#141414] sm:py-36"
    >
      {/* The dark slab — its own layer, so theme classes stay untouched */}
      <div
        ref={slabRef}
        aria-hidden
        className="absolute bottom-0 top-0 bg-[#111111]"
        style={{ left: "5vw", right: "5vw", borderRadius: "40px" }}
      />

      {/* Curve */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-20 h-64 w-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          ref={curveRef}
          d="M0,100 C300,160 900,40 1200,100"
          fill="none"
          stroke="rgba(20,184,166,0.35)"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-16 px-8 text-white md:grid-cols-3 md:gap-20 md:px-20">
        {/* LEFT */}
        <div className="md:col-span-2">
          <div data-head className="mb-12">
            <p className="mb-5 text-sm text-white/45">About</p>
            <h2 className="text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
              {["Md Adil", "Farhan"].map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <span data-line-inner className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          <div data-bio className="max-w-xl space-y-5 text-white/85">
            {BIO.map((para) => (
              <ScrubText key={para}>{para}</ScrubText>
            ))}
          </div>

          <div
            data-meta
            className="mt-16 grid grid-cols-1 gap-10 text-sm sm:grid-cols-2"
          >
            {Object.entries(META).map(([heading, items]) => (
              <div key={heading}>
                <h3 className="mb-4 text-white/40">{heading}</h3>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="group flex items-center gap-3 text-white/70 transition-colors duration-300 hover:text-white"
                    >
                      <span className="h-px w-4 bg-white/20 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:w-8 group-hover:bg-teal-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center md:justify-end">
          <div className="w-60 md:w-72">
            {/* aspect-ratio reserves the box before the file arrives */}
            <div
              ref={portraitRef}
              className="group relative overflow-hidden bg-white/5"
              style={{ aspectRatio: "3 / 4" }}
            >
              <img
                ref={imgRef}
                src={PROFILE_IMG}
                alt="Md Adil Farhan"
                width={576}
                height={768}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover grayscale contrast-[1.1] transition-[filter] duration-700 ease-out group-hover:grayscale-0"
              />
              {/* teal wash lifts on hover — the portrait comes alive */}
              <span className="pointer-events-none absolute inset-0 bg-teal-500/25 mix-blend-color opacity-100 transition-opacity duration-700 group-hover:opacity-0" />
            </div>

            <div className="mt-5 flex flex-col items-end gap-2.5 text-xs tracking-[0.18em]">
              <a
                data-tag
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-teal-500/40 px-4 py-2 text-teal-400 outline-offset-4 transition-colors duration-300 hover:border-teal-500 hover:bg-teal-500 hover:text-[#111] focus-visible:outline-2 focus-visible:outline-teal-500"
              >
                Resume
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                 <FiArrowUpRight className="h-4 w-4" />
                </span>
              </a>
              <p data-tag className="text-white/40">
                [ INDIA ]
              </p>
              <p data-tag className="text-white/40">
                [ COMPUTER SCIENCE ]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}