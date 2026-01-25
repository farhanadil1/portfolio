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
  const pinRef = useRef(null);
  const glowRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".skill-item");
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      /* =========================
         SHARED FOCUS FUNCTION
      ========================== */
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
            y: d === 0 ? 0 : d * 4,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        const active = items[activeIndex];
        const bounds = active.getBoundingClientRect();
        const sectionBounds = sectionRef.current.getBoundingClientRect();

        // glow
        gsap.to(glowRef.current, {
          y: bounds.top - sectionBounds.top + bounds.height / 2 - 120,
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
        });

        // popup
        const popup = popupRef.current;
        popup.textContent = skills[activeIndex].note;

        const popupWidth = popup.offsetWidth || 180;
        const popupHeight = popup.offsetHeight || 32;
        const GAP = 18;

        let x =
          bounds.left - sectionBounds.left + bounds.width + GAP;

        if (x + popupWidth > sectionBounds.width) {
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

        gsap.to(popup, {
          x,
          y,
          opacity: 1,
          scale: 1,
          duration: 0.22,
          ease: "power2.out",
        });
      }

      /* =========================
         DESKTOP — VIEWPORT BASED
      ========================== */
      if (!isMobile) {
        items.forEach((item, index) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: () => focus(index),
            onEnterBack: () => focus(index),
          });
        });
        return;
      }

      /* =========================
         MOBILE — PINNED + SCRUB
      ========================== */

      const total = items.length;

      // Give section controlled scroll length
      gsap.set(sectionRef.current, {
        height: `${total * 100}vh`,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${total * window.innerHeight}`,
        pin: pinRef.current,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const index = Math.min(
            total - 1,
            Math.floor(self.progress * total)
          );
          focus(index);
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
        relative
        bg-white text-black
        dark:bg-[#0f0f0f] dark:text-white
        overflow-hidden
      "
    >
      {/* glow */}
      <div
        ref={glowRef}
        className="
          pointer-events-none
          absolute left-1/2 -translate-x-1/2
          w-[420px] h-[240px]
          rounded-full
          bg-[radial-gradient(circle,rgba(20,184,166,0.18),transparent_70%)]
          blur-3xl
          opacity-0
        "
      />

      {/* popup */}
      <div
        ref={popupRef}
        className="
          pointer-events-none
          absolute top-0 left-0 z-20
          px-3 py-2 text-xs
          ml-[350px] sm:ml-[400px]
          rounded-2xl
          bg-white/70 dark:bg-white/10
          backdrop-blur-xl
          border border-white/30 dark:border-white/20
          shadow-lg
          text-gray-800 dark:text-gray-200
          opacity-0 scale-95
        "
      />

      {/* PIN CONTENT */}
      <div
        ref={pinRef}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 py-24 grid md:grid-cols-3 gap-16"
      >
        <div>
          <div className="text-sm tracking-[0.2em] text-gray-500 dark:text-gray-400">
            SKILLS
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </div>

        <div className="md:col-span-2 space-y-5">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="
                skill-item
                text-2xl md:text-3xl
                font-medium tracking-tight
                opacity-30
                px-6 sm:px-0
                will-change-transform will-change-filter
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
