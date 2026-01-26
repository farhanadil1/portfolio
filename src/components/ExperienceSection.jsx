import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Software Product Developer",
    org: "CodeClouds",
    period: "September 2025 – Present",
    desc:
      "Building and maintaining scalable SaaS platforms with strong focus on performance, UX, and system reliability.",
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

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 0%",
            end: "bottom bottom",
            scrub: 2,
          },
        }
      );

      gsap.utils.toArray(".exp-item").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onEnter: () => activate(el),
          onEnterBack: () => activate(el),
        });
      });

      function activate(activeEl) {
        gsap.utils.toArray(".exp-item").forEach((el) => {
          gsap.to(el, {
            opacity: el === activeEl ? 1 : 0.35,
            filter: el === activeEl ? "blur(0px)" : "blur(1px)",
            duration: 0.25,
            ease: "power2.out",
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="
        relative py-28 px-6 md:px-20
        bg-[#1E1E1E] text-white
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-24">
        <p className="text-sm tracking-[0.25em] text-white/40">
          EXPERIENCE
        </p>
        <h2 className="mt-4 text-4xl  font-medium tracking-wide">
          Professional Journey
        </h2>
      </div>

      {/* TIMELINE */}
      <div className="relative max-w-6xl mx-auto">
        {/* base line */}
        <div
          className="
            absolute top-0 h-full w-px bg-white/10
            left-4 md:left-1/2 -translate-x-1/2
          "
        />

        {/* progress line */}
        <div
          ref={progressRef}
          className="
            absolute top-0 h-full w-[2px]
            origin-top
            bg-teal-400
            left-4 md:left-1/2 -translate-x-1/2
          "
        />

        {/* ITEMS */}
        <div className="space-y-32">
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div
                key={exp.title}
                className={`
                  exp-item relative
                  flex
                  ${isLeft ? "md:justify-start" : "md:justify-end"}
                `}
              >
                {/* stop dot */}
                <span
                  className="
                    absolute top-2
                    left-4 md:left-1/2
                    -translate-x-1/2
                    w-2.5 h-2.5 rounded-full
                    bg-[#1E1E1E]
                    border border-teal-400
                  "
                />

                <div
                  className={`
                    w-full md:w-[44%]
                    pl-12 md:pl-0 py-10
                    ${isLeft ? "md:pr-10 md:text-left" : "md:pl-10 md:text-right"}
                  `}
                >
                  <p className="text-xs tracking-widest text-teal-400">
                    {exp.period}
                  </p>

                  <h3 className="mt-2 text-2xl md:text-3xl font-medium">
                    {exp.title}
                  </h3>

                  <p className="mt-1 text-sm text-white/60">
                    {exp.org}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    {exp.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
