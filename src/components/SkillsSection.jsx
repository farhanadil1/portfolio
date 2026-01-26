import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React", note: "Scalable component-based UIs" },
  { name: "JavaScript", note: "Modern ES & async logic" },
  { name: "Tailwind CSS", note: "Utility-first design systems" },
  { name: "Java", note: "Strong OOP foundations" },
  { name: "Spring Boot", note: "Production-ready REST APIs" },
  { name: "Hibernate", note: "Efficient ORM mappings" },
  { name: "Node.js", note: "Event-driven backend services" },
  { name: "Express", note: "Minimal API architecture" },
  { name: "MongoDB", note: "Flexible document modeling" },
  { name: "MySQL", note: "Structured relational queries" },
  { name: "Git", note: "Version control workflows" },
  { name: "GitHub", note: "Collaborative code reviews" },
  { name: "Postman", note: "API testing & validation" },
  { name: "Figma", note: "Interface prototyping" },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".skill-item");
      let armed = false;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 50%",
        onEnter: () => (armed = true),
        onLeaveBack: () => (armed = false),
      });

      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => armed && focus(index),
          onEnterBack: () => armed && focus(index),
        });
      });

      function focus(activeIndex) {
        items.forEach((item, i) => {
          const d = Math.abs(i - activeIndex);

          gsap.to(item, {
            opacity: d === 0 ? 1 : d === 1 ? 0.55 : 0.25,
            filter:
              d === 0
                ? "blur(0px)"
                : d === 1
                ? "blur(0.8px)"
                : "blur(1.6px)",
            y: d === 0 ? 0 : d * 3,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        const active = items[activeIndex];
        const bounds = active.getBoundingClientRect();
        const sectionBounds = sectionRef.current.getBoundingClientRect();

        gsap.to(glowRef.current, {
          y:
            bounds.top -
            sectionBounds.top +
            bounds.height / 2 -
            120,
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });

        const popupEl = popupRef.current;
        popupEl.textContent = skills[activeIndex].note;

        const popupWidth = popupEl.offsetWidth || 180;
        const popupHeight = popupEl.offsetHeight || 32;
        const GAP = 16;

        let x =
          bounds.left -
          sectionBounds.left +
          bounds.width +
          GAP;

        const maxX = sectionBounds.width - popupWidth - 12;
        if (x > maxX) {
          x =
            bounds.left -
            sectionBounds.left -
            popupWidth -
            GAP;
        }

        const y =
          bounds.top -
          sectionBounds.top +
          bounds.height / 2 -
          popupHeight / 2;

        gsap.to(popupEl, {
          x,
          y,
          opacity: 1,
          scale: 1,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="
        relative py-24 px-6 md:px-20
        bg-[#1E1E1E] text-white
        overflow-hidden
      "
    >
      {/* Glow */}
      <div
        ref={glowRef}
        className="
          pointer-events-none absolute left-1/2 -translate-x-1/2
          w-[420px] h-[240px]
          rounded-full
          bg-[radial-gradient(circle,rgba(20,184,166,0.18),transparent_70%)]
          blur-3xl opacity-0
        "
      />

      {/* Popup */}
      <div
        ref={popupRef}
        className="
          pointer-events-none absolute top-0 left-0 z-20
          px-3 py-2
          ml-[320px] sm:ml-[400px]
          text-xs
          rounded-2xl
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          shadow-lg
          text-white
          opacity-0 scale-95
          will-change-transform
        "
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
        <div className="text-sm tracking-[0.25em] text-white/40">
          SKILLS
        </div>

        <div className="md:col-span-2 space-y-5">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="
                skill-item
                ml-8
                text-2xl md:text-3xl
                font-medium tracking-tight
                opacity-30
              "
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
