import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: "React",
    category: "Frontend",
    note: "Scalable component-based interfaces",
  },
  {
    name: "Angular",
    category: "Frontend",
    note: "Enterprise single-page applications",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    note: "Modern ES, async logic & interaction",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    note: "Utility-first design systems",
  },

  {
    name: "Java",
    category: "Backend",
    note: "Enterprise-grade object-oriented systems",
  },
  {
    name: "Spring Boot",
    category: "Backend",
    note: "Production-ready REST architectures",
  },
  {
    name: "Hibernate / JPA",
    category: "Backend",
    note: "ORM & persistence architecture",
  },
  {
    name: "Node.js",
    category: "Backend",
    note: "Event-driven backend services",
  },
  {
    name: "Express",
    category: "Backend",
    note: "Lightweight API architecture",
  },

  {
    name: "MongoDB",
    category: "Databases",
    note: "Flexible document-based data modeling",
  },
  {
    name: "MySQL",
    category: "Databases",
    note: "Structured relational data systems",
  },

  {
    name: "JUnit",
    category: "Testing & Logging",
    note: "Unit testing & test-driven development",
  },
  {
    name: "Mockito",
    category: "Testing & Logging",
    note: "Mocking & isolated test environments",
  },
  {
    name: "SLF4J",
    category: "Testing & Logging",
    note: "Structured application logging",
  },

  {
    name: "Git",
    category: "DevOps & Tools",
    note: "Version control & branching workflows",
  },
  {
    name: "GitHub",
    category: "DevOps & Tools",
    note: "Collaboration & code review",
  },
  {
    name: "Jenkins",
    category: "DevOps & Tools",
    note: "Continuous integration & delivery",
  },
  {
    name: "Docker",
    category: "DevOps & Tools",
    note: "Containerized application deployment",
  },
  {
    name: "Postman",
    category: "DevOps & Tools",
    note: "API testing & validation",
  },

  {
    name: "Cloud",
    category: "Emerging",
    note: "Deployment & infrastructure fundamentals",
  },
  {
    name: "GenAI",
    category: "Emerging",
    note: "AI-assisted enterprise solutions",
  },
  {
    name: "Figma",
    category: "Emerging",
    note: "Interface design & prototyping",
  },
];

const categories = [
  "Frontend",
  "Backend",
  "Databases",
  "Testing & Logging",
  "DevOps & Tools",
  "Emerging",
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  const glowRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const activeLineRef = useRef(null);

  const categoryRef = useRef(null);
  const nameRef = useRef(null);
  const noteRef = useRef(null);
  const counterRef = useRef(null);

  const backgroundWordRef = useRef(null);

  const activeIndexRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray(".skill-item");

        

        gsap.from(".skills-eyebrow", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });

        gsap.from(".skills-heading-line", {
          opacity: 0,
          y: 70,
          duration: 1,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });

        gsap.from(".skills-description", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });

        

        gsap.from(items, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.025,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
          },
        });

        

        function focusSkill(index, instant = false) {
          if (index < 0 || index >= skills.length) return;

          activeIndexRef.current = index;

          const activeItem = items[index];
          const skill = skills[index];

          

          items.forEach((item, i) => {
            const distance = Math.abs(i - index);

            let opacity = 0.22;
            let scale = 1;
            let x = 0;

            if (i === index) {
              opacity = 1;
              scale = 1.025;
              x = 10;
            } else if (distance === 1) {
              opacity = 0.5;
            }

            gsap.to(item, {
              opacity,
              scale,
              x,
              duration: instant ? 0 : 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });

            const title = item.querySelector(".skill-title");

            gsap.to(title, {
              color:
                i === index
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0.3)",
              duration: instant ? 0 : 0.4,
              ease: "power2.out",
            });

            const number = item.querySelector(".skill-number");

            gsap.to(number, {
              color:
                i === index
                  ? "rgba(45,212,191,0.9)"
                  : "rgba(255,255,255,0.18)",
              duration: instant ? 0 : 0.4,
            });

            const arrow = item.querySelector(".skill-arrow");

            gsap.to(arrow, {
              opacity: i === index ? 1 : 0.15,
              x: i === index ? 0 : -4,
              duration: instant ? 0 : 0.35,
            });
          });

          

          const bounds = activeItem.getBoundingClientRect();
          const sectionBounds =
            sectionRef.current.getBoundingClientRect();

          const center =
            bounds.top -
            sectionBounds.top +
            bounds.height / 2;

          
          gsap.to(glowRef.current, {
            y: center - 180,
            opacity: 1,
            duration: instant ? 0 : 0.65,
            ease: "power3.out",
            overwrite: "auto",
          });

          

          gsap.to(activeLineRef.current, {
            y: center,
            opacity: 1,
            duration: instant ? 0 : 0.45,
            ease: "power3.out",
            overwrite: "auto",
          });

          

          gsap.to(backgroundWordRef.current, {
            opacity: 0,
            y: 15,
            duration: instant ? 0 : 0.18,
            ease: "power2.in",
            onComplete: () => {
              backgroundWordRef.current.textContent =
                skill.category.toUpperCase();

              gsap.to(backgroundWordRef.current, {
                opacity: 1,
                y: 0,
                duration: instant ? 0 : 0.5,
                ease: "power3.out",
              });
            },
          });

          

          const elements = [
            categoryRef.current,
            nameRef.current,
            noteRef.current,
          ];

          if (instant) {
            categoryRef.current.textContent =
              skill.category.toUpperCase();

            nameRef.current.textContent = skill.name;

            noteRef.current.textContent = skill.note;

            counterRef.current.textContent =
              `${String(index + 1).padStart(2, "0")} / ${String(
                skills.length
              ).padStart(2, "0")}`;

            gsap.set(elements, {
              opacity: 1,
              y: 0,
            });

            return;
          }

          const tl = gsap.timeline();

          tl.to(elements, {
            opacity: 0,
            y: -8,
            duration: 0.13,
            stagger: 0.015,
            ease: "power2.in",
          });

          tl.call(() => {
            categoryRef.current.textContent =
              skill.category.toUpperCase();

            nameRef.current.textContent = skill.name;

            noteRef.current.textContent = skill.note;

            counterRef.current.textContent =
              `${String(index + 1).padStart(2, "0")} / ${String(
                skills.length
              ).padStart(2, "0")}`;
          });

          tl.fromTo(
            elements,
            {
              opacity: 0,
              y: 12,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.035,
              ease: "power3.out",
            }
          );
        }

        

        focusSkill(0, true);

        

        items.forEach((item, index) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 62%",
            end: "bottom 38%",

            onEnter: () => {
              focusSkill(index);
            },

            onEnterBack: () => {
              focusSkill(index);
            },
          });

         

          item.addEventListener("mouseenter", () => {
            focusSkill(index);
          });
        });

       

        const handleMouseMove = (event) => {
          const rect =
            sectionRef.current.getBoundingClientRect();

          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          gsap.to(cursorGlowRef.current, {
            x,
            y,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        sectionRef.current.addEventListener(
          "mousemove",
          handleMouseMove
        );


        return () => {
          sectionRef.current?.removeEventListener(
            "mousemove",
            handleMouseMove
          );
        };
      });

      

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".skill-item", {
          opacity: 1,
          x: 0,
          scale: 1,
        });
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
        overflow-hidden
        bg-[#1E1E1E]
        px-6
        py-28
        text-white
        md:px-12
        lg:px-20
        xl:px-24
      "
    >
     

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
          [background-size:80px_80px]
        "
      />

      

      <div
        ref={backgroundWordRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-5%]
          top-[35%]
          z-0
          select-none
          whitespace-nowrap
          text-[12vw]
          font-semibold
          tracking-[-0.08em]
          text-white/[0.018]
        "
      >
        FRONTEND
      </div>

     
      <div
        ref={cursorGlowRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-0
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-teal-400/[0.025]
          blur-[120px]
        "
      />

     

      <div
        ref={glowRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[35%]
          top-0
          z-0
          h-[360px]
          w-[360px]
          rounded-full
          bg-teal-400/[0.045]
          blur-[110px]
          opacity-0
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">
       

        <div className="mb-20 grid gap-12 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* LEFT */}

          <div className="skills-eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-teal-400" />

            <span className="text-[12px] font-medium tracking-[0.3em] text-white/40">
              SKILLS
            </span>
          </div>

          {/* RIGHT */}

          <div>
            <h2
              className="
                overflow-hidden
                text-5xl
                font-medium
                leading-[0.9]
                tracking-[-0.055em]
                sm:text-5xl
                lg:text-[6.5rem]
              "
            >
              <span className="skills-heading-line block">
                The tools
              </span>

              <span className="skills-heading-line block text-white/35">
                behind the work.
              </span>
            </h2>

            <p
              className="
                skills-description
                mt-8
                max-w-xl
                text-sm
                leading-relaxed
                text-white/40
                md:text-base
              "
            >
              Technologies I use to turn ideas into scalable,
              maintainable and thoughtful digital products.
            </p>
          </div>
        </div>

       

        <div
          className="
            grid
            items-start
            gap-16
            lg:grid-cols-[280px_minmax(0,1fr)]
          "
        >
          

          <aside
            className="
              lg:sticky
              lg:top-24
              lg:h-fit
            "
          >
            <div className="border-t border-white/10 pt-6">
              <p
                ref={categoryRef}
                className="
                  text-[10px]
                  font-medium
                  tracking-[0.3em]
                  text-teal-400
                "
              >
                FRONTEND
              </p>

              <p
                ref={nameRef}
                className="
                  mt-5
                  text-3xl
                  font-medium
                  tracking-[-0.04em]
                  md:text-4xl
                "
              >
                React
              </p>

              <p
                ref={noteRef}
                className="
                  mt-4
                  max-w-[240px]
                  text-sm
                  leading-relaxed
                  text-white/40
                "
              >
                Scalable component-based interfaces
              </p>
            </div>

            {/* COUNTER */}

            <div
              className="
                mt-8
                flex
                items-center
                justify-between
                border-t
                border-white/10
                pt-5
              "
            >
              <span
                ref={counterRef}
                className="
                  font-mono
                  text-[10px]
                  tracking-widest
                  text-white/30
                "
              >
                01 / 22
              </span>

              <span
                className="
                  text-[9px]
                  tracking-[0.25em]
                  text-white/20
                "
              >
                EXPLORE
              </span>
            </div>

            {/* CATEGORY INDEX */}

            <div className="mt-12 hidden space-y-3 lg:block">
              {categories.map((category, index) => (
                <div
                  key={category}
                  className="flex items-center gap-3"
                >
                  <span className="font-mono text-[9px] text-white/15">
                    0{index + 1}
                  </span>

                  <span className="text-[9px] tracking-[0.2em] text-white/20">
                    {category.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </aside>

      

          <div
            ref={listRef}
            className="relative"
          >
            {/* ACTIVE SCAN LINE */}

            <div
              ref={activeLineRef}
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-5
                hidden
                h-px
                w-[calc(100%+20px)]
                bg-gradient-to-r
                from-teal-400
                via-teal-400/30
                to-transparent
                lg:block
              "
            />

            {categories.map((category) => {
              const categorySkills = skills.filter(
                (skill) => skill.category === category
              );

              return (
                <div
                  key={category}
                  className="mb-16 last:mb-0"
                >
                  {/* CATEGORY HEADER */}

                  <div className="mb-4 flex items-center gap-4">
                    <span
                      className="
                        text-[10px]
                        font-medium
                        tracking-[0.3em]
                        text-white/25
                      "
                    >
                      {category.toUpperCase()}
                    </span>

                    <span className="h-px flex-1 bg-white/[0.06]" />
                  </div>

                  {/* SKILLS */}

                  <div className="grid gap-x-10 md:grid-cols-2">
                    {categorySkills.map((skill) => {
                      const index = skills.findIndex(
                        (item) => item.name === skill.name
                      );

                      return (
                        <div
                          key={skill.name}
                          className="
                            skill-item
                            group
                            relative
                            origin-left
                            cursor-default
                            border-b
                            border-white/[0.07]
                            py-5
                            will-change-transform
                          "
                        >
                          <div
                            className="
                              flex
                              items-center
                              gap-4
                            "
                          >
                            {/* NUMBER */}

                            <span
                              className="
                                skill-number
                                w-5
                                shrink-0
                                font-mono
                                text-[9px]
                                tracking-wider
                                text-white/20
                              "
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* NAME */}

                            <span
                              className="
                                skill-title
                                text-2xl
                                font-medium
                                tracking-[-0.035em]
                                text-white/30
                                transition-transform
                                duration-500
                                group-hover:translate-x-2
                                sm:text-[1.7rem]
                              "
                            >
                              {skill.name}
                            </span>

                            {/* ARROW */}

                            <span
                              className="
                                skill-arrow
                                ml-auto
                                text-sm
                                text-teal-400
                                opacity-15
                              "
                            >
                             <FiArrowUpRight className="h-4 w-4" />
                            </span>
                          </div>

                          {/* HOVER LINE */}

                          <div
                            className="
                              absolute
                              bottom-0
                              left-0
                              h-px
                              w-0
                              bg-teal-400
                              transition-all
                              duration-700
                              ease-out
                              group-hover:w-full
                            "
                          />

                          {/* HOVER DESCRIPTION */}

                          <div
                            className="
                              pointer-events-none
                              absolute
                              bottom-full
                              left-0
                              z-20
                              mb-2
                              hidden
                              w-64
                              rounded-lg
                              border
                              border-white/10
                              bg-[#242424]/95
                              p-4
                              opacity-0
                              backdrop-blur-xl
                              transition-all
                              duration-300
                              group-hover:opacity-100
                              md:block
                            "
                          >
                            <p className="text-[10px] leading-relaxed text-white/45">
                              {skill.note}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        <div
          className="
            mt-24
            flex
            items-center
            justify-between
            border-t
            border-white/10
            pt-6
          "
        >
          <p className="text-[9px] tracking-[0.3em] text-white/20">
            ALWAYS LEARNING
          </p>

          <p className="text-[9px] tracking-[0.3em] text-white/20">
            {skills.length} TECHNOLOGIES
          </p>
        </div>
      </div>
    </section>
  );
}