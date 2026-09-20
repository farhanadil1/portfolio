import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* Fill this in with your 4 roles. Shape expected by the render below:
{
  id: "role-1",
  period: "2024 — Present",
  current: true,               // shows "· Present" pulse instead of a static period
  title: "Frontend Engineer",
  org: "Company Name",
  location: "Remote",
  type: "Full-time",
  desc: "Two or three sentences on scope and impact.",
  stack: ["React", "TypeScript", "GraphQL"],
}
*/
const experiences = [
  {
    title: "Software Developer Engineer Intern",
    org: "Cognizant",
    period: "February 2026 – Present",
    desc:
      "Java Full Stack Intern in ISG practice, building enterprise apps with Java and Angular. Working with JUnit, Mockito, SLF4J, Docker, Jenkins CI/CD, Agile, Cloud, and GenAI concepts."
  },
  {
    title: "Software Product Developer",
    org: "CodeClouds",
    period: "September 2025 – February 2026",
    desc:
      "Built and maintained scalable SaaS platforms with strong focus on performance, UX, and system reliability.",
  },
  {
    title: "Machine Learning Intern",
    org: "IBM Edunet Foundation",
    period: "2025",
    desc:
      "Built an Employee Salary Management system using machine learning models and real-world datasets.",
  },
  {
    title: "Java Full Stack Trainee",
    org: "Globsyn Finishing School",
    period: "2025",
    desc:
      "Hands-on training in Java, Spring Boot, databases, and full stack application development.",
  },
];

const EASE = [0.16, 1, 0.3, 1];

/* Sticky-panel scrollytelling instead of a vertical timeline: the section
   is tall (one viewport per role), the inner panel is `sticky`, and a
   ScrollTrigger reads progress through that tall space to drive which
   role is showing. No manual pin/spacer bookkeeping, and it degrades
   gracefully — remove the ScrollTrigger and it's just a sticky panel
   showing the last role, nothing breaks. */
export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const railFillRef = useRef(null);
  const markerRef = useRef(null);
  const cueRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isNarrative, setIsNarrative] = useState(true);

  const n = experiences.length;

  /* Full pinned scrollytelling only where it actually works well: a wide
     viewport, a real pointer, and no reduced-motion preference. Small
     screens get a plain stacked list below instead of fighting mobile
     viewport-height jitter and touch scrolling against a pinned panel. */
  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => setIsNarrative(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isNarrative || n === 0) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(n - 1, Math.floor(self.progress * n));
          setActiveIndex((prev) => (prev === idx ? prev : idx));

          /* Direct DOM writes for the continuous rail + marker — these
             fire on every scroll tick, so they bypass React state to
             avoid re-rendering the whole panel 60x/second. */
          if (railFillRef.current) {
            railFillRef.current.style.transform = `scaleY(${self.progress})`;
          }
          if (markerRef.current) {
            markerRef.current.style.top = `${self.progress * 100}%`;
          }
          /* Cue only matters before the story has moved anywhere — fade
             it out over the first role's scroll range, same direct-write
             approach as the rail so it doesn't add a state update. */
          if (cueRef.current) {
            const fade = Math.min(self.progress * n * 1.6, 1);
            cueRef.current.style.opacity = String(1 - fade);
          }
        },
      });

      return () => trigger.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, [isNarrative, n]);

  if (n === 0) {
    return (
      <section
        id="experience"
        className="bg-[#1E1E1E] px-6 py-28 text-center text-white/40 md:px-20"
      >
        Add your roles to the `experiences` array to populate this section.
      </section>
    );
  }

  const active = experiences[activeIndex];

  const jumpTo = (index) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const targetY =
      el.offsetTop + (total * (index + 0.5)) / n;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  /* ---------------- Mobile / reduced-motion fallback ---------------- */
  if (!isNarrative) {
    return (
      <section
        id="experience"
        className="bg-[#1E1E1E] px-6 py-28 text-white md:px-20"
      >
        <div className="mx-auto mb-16 max-w-2xl">
          <p className="text-sm tracking-[0.25em] text-white/40">
            EXPERIENCE
          </p>
          <h2 className="mt-4 text-4xl font-medium tracking-wide">
            Professional journey
          </h2>
        </div>

        <div className="mx-auto max-w-2xl space-y-16">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id ?? i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="border-l-2 border-teal-400/40 pl-6"
            >
              <p className="text-xs tracking-widest text-teal-400">
                {exp.period}
              </p>
              <h3 className="mt-2 text-2xl font-medium">{exp.title}</h3>
              <p className="mt-1 text-sm text-white/60">{exp.org}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {exp.desc}
              </p>
              {exp.stack?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  /* ---------------- Desktop pinned narrative ---------------- */
  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{ height: `${n * 100}vh` }}
      className="relative bg-[#1E1E1E] text-white"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-10 md:px-20">
        {/* Ambient glow, echoing the hero's aurora for cohesion */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-1/2 h-[50vw] w-[50vw] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.12),transparent_70%)] blur-3xl"
        />

        {/* Scroll cue — tells you the pin keeps going. Fades out over the
            first role's scroll range via the direct DOM write above. */}
        <div
          ref={cueRef}
          aria-hidden
          className="pointer-events-none absolute bottom-20 left-20 z-10 flex items-center gap-3"
        >
          <span className="relative h-10 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[expCue_2s_cubic-bezier(.16,1,.3,1)_infinite] bg-teal-400" />
          </span>
          <span className="text-[0.8rem] tracking-wide text-white/40">
            Scroll
          </span>
        </div>

        {/* Ghost numeral — the current role's index, huge and faint,
            sitting behind everything as a background layer. */}
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            aria-hidden
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="pointer-events-none absolute right-[2%] top-1/2 -translate-y-1/2 select-none text-[clamp(10rem,26vw,26rem)] font-bold leading-none text-white/[0.04]"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>

        <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 gap-16 md:grid-cols-[minmax(0,1fr)_260px]">
          {/* Content */}
          <div>
            <div className="mb-10 flex items-center gap-4 text-sm text-white/40">
              <span className="tracking-[0.25em]">EXPERIENCE</span>
              <span className="h-px flex-1 max-w-16 bg-white/15" />
              <span className="tabular-nums">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(n).padStart(2, "0")}
              </span>
            </div>

            <div aria-live="polite" className="min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -28, filter: "blur(6px)" }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <p className="flex items-center gap-2 text-xs tracking-widest text-teal-400">
                    {active.period}
                    {active.current && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-300" />
                      </span>
                    )}
                  </p>

                  <h3 className="mt-3 text-4xl font-medium tracking-tight md:text-5xl">
                    {active.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-x-2 text-white/55">
                    <span>{active.org}</span>
                    {active.location && (
                      <>
                        <span className="text-white/20">·</span>
                        <span>{active.location}</span>
                      </>
                    )}
                    {active.type && (
                      <>
                        <span className="text-white/20">·</span>
                        <span>{active.type}</span>
                      </>
                    )}
                  </div>

                  <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/70">
                    {active.desc}
                  </p>

                  {active.stack?.length > 0 && (
                    <div className="mt-7 flex flex-wrap gap-2">
                      {active.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Stepper + progress rail */}
          <div className="hidden items-stretch gap-6 md:flex">
            <div className="relative w-px bg-white/10">
              <div
                ref={railFillRef}
                style={{ transformOrigin: "top" }}
                className="absolute inset-0 origin-top scale-y-0 bg-teal-400"
              />
              <div
                ref={markerRef}
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <span className="block h-2.5 w-2.5 rounded-full bg-teal-300 shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
              </div>
            </div>

            <ul className="flex flex-1 flex-col justify-between py-1 text-sm">
              {experiences.map((exp, i) => (
                <li key={exp.id ?? i}>
                  <button
                    onClick={() => jumpTo(i)}
                    className={`group block text-left outline-offset-4 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-teal-500 ${
                      i === activeIndex
                        ? "text-white"
                        : "text-white/35 hover:text-white/60"
                    }`}
                  >
                    <span className="text-xs text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-0.5 block font-medium">
                      {exp.title}
                    </span>
                    <span className="block text-xs text-white/40">
                      {exp.org}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes expCue {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}