import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "React",
  "JavaScript",
  "Tailwind CSS",
  "Java",
  "Spring Boot",
  "Hibernate",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "Git",
  "GitHub",
  "Postman",
  "Figma",
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const ribbonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".skill-item");

      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => focus(index),
          onEnterBack: () => focus(index),
        });
      });

      function focus(activeIndex) {
        items.forEach((item, i) => {
          const d = Math.abs(i - activeIndex);

          gsap.to(item, {
            opacity: d === 0 ? 1 : d === 1 ? 0.6 : 0.25,
            filter:
              d === 0
                ? "blur(0px)"
                : d === 1
                ? "blur(1px)"
                : "blur(2px)",
            duration: 0.35,
            ease: "power2.out",
          });
        });
      }

      const path = ribbonRef.current.querySelector("path");

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });

      // subtle horizontal drift (water feel)
      gsap.to(ribbonRef.current, {
        x: 12,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="
        relative py-16 px-6 md:px-20
        bg-white text-black
        dark:bg-[#0f0f0f] dark:text-white
        overflow-hidden
      "
    >
      {/* Curvy Ribbon */}
      <div
        ref={ribbonRef}
        className="absolute left-80 top-0 h-full w-20 pointer-events-none"
      >
        <svg
          viewBox="0 0 100 1200"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="
              M50 0
              C30 150, 70 300, 50 450
              C30 600, 70 750, 50 900
              C30 1050, 70 1200, 50 1350
            "
            fill="none"
            stroke="rgba(20,184,166,0.6)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="1400"
            strokeDashoffset="1400"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
        {/* Label */}
        <div className="text-sm tracking-[0.2em] text-gray-500 dark:text-gray-400">
          SKILLS
        </div>

        {/* Skills List */}
        <div className="text-center sm:text-justify md:col-span-2 space-y-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="
                skill-item
                text-2xl md:text-3xl
                font-medium tracking-tight
                opacity-30
                will-change-filter
              "
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
