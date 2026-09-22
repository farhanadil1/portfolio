import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowUpRight,
  FiCloud,
  FiCpu,
  FiFigma,
} from "react-icons/fi";
import {
  SiAngular,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiHibernate,
  SiJavascript,
  SiJenkins,
  SiJunit5,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: "React",
    category: "Frontend",
    note: "Scalable component-based interfaces",
    icon: SiReact,
  },
  {
    name: "Angular",
    category: "Frontend",
    note: "Enterprise single-page applications",
    icon: SiAngular,
  },
  {
    name: "JavaScript",
    category: "Frontend",
    note: "Modern ES, async logic & interaction",
    icon: SiJavascript,
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    note: "Utility-first design systems",
    icon: SiTailwindcss,
  },

  {
    name: "Java",
    category: "Backend",
    note: "Enterprise-grade object-oriented systems",
    icon: null,
  },
  {
    name: "Spring Boot",
    category: "Backend",
    note: "Production-ready REST architectures",
    icon: SiSpringboot,
  },
  {
    name: "Hibernate / JPA",
    category: "Backend",
    note: "ORM & persistence architecture",
    icon: SiHibernate,
  },
  {
    name: "Node.js",
    category: "Backend",
    note: "Event-driven backend services",
    icon: SiNodedotjs,
  },
  {
    name: "Express",
    category: "Backend",
    note: "Lightweight API architecture",
    icon: SiExpress,
  },

  {
    name: "MongoDB",
    category: "Databases",
    note: "Flexible document-based data modeling",
    icon: SiMongodb,
  },
  {
    name: "MySQL",
    category: "Databases",
    note: "Structured relational data systems",
    icon: SiMysql,
  },

  {
    name: "JUnit",
    category: "Testing & Logging",
    note: "Unit testing & test-driven development",
    icon: SiJunit5,
  },
  {
    name: "Mockito",
    category: "Testing & Logging",
    note: "Mocking & isolated test environments",
    icon: null,
  },
  {
    name: "SLF4J",
    category: "Testing & Logging",
    note: "Structured application logging",
    icon: null,
  },

  {
    name: "Git",
    category: "DevOps & Tools",
    note: "Version control & branching workflows",
    icon: SiGit,
  },
  {
    name: "GitHub",
    category: "DevOps & Tools",
    note: "Collaboration & code review",
    icon: SiGithub,
  },
  {
    name: "Jenkins",
    category: "DevOps & Tools",
    note: "Continuous integration & delivery",
    icon: SiJenkins,
  },
  {
    name: "Docker",
    category: "DevOps & Tools",
    note: "Containerized application deployment",
    icon: SiDocker,
  },
  {
    name: "Postman",
    category: "DevOps & Tools",
    note: "API testing & validation",
    icon: SiPostman,
  },

  {
    name: "Cloud",
    category: "Emerging",
    note: "Deployment & infrastructure fundamentals",
    icon: FiCloud,
  },
  {
    name: "GenAI",
    category: "Emerging",
    note: "AI-assisted enterprise solutions",
    icon: FiCpu,
  },
  {
    name: "Figma",
    category: "Emerging",
    note: "Interface design & prototyping",
    icon: SiFigma || FiFigma,
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

const TOTAL = skills.length;

const EASE = "power3.out";

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  const cursorGlowRef = useRef(null);
  const ambientGlowRef = useRef(null);
  const activeLineRef = useRef(null);
  const activeDotRef = useRef(null);
  const backgroundWordRef = useRef(null);
  const activeIconRef = useRef(null);

  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const activeSkill = skills[activeIndex];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".skill-item");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /*
         * Intro animation
         */
        const intro = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        });

        intro
          .from(".skills-eyebrow", {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: EASE,
          })
          .from(
            ".skills-heading-line",
            {
              opacity: 0,
              y: 80,
              duration: 1,
            },
            "-=0.45"
          )
          .from(
            ".skills-description",
            {
              opacity: 0,
              y: 20,
              duration: 0.7,
            },
            "-=0.65"
          );

        /*
         * Initial list reveal
         */
        gsap.from(items, {
          opacity: 0,
          y: 35,
          duration: 0.8,
          stagger: 0.035,
          ease: EASE,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 82%",
            once: true,
          },
        });

        /*
         * Updates the large background word.
         */
        const updateBackgroundWord = (skill, instant = false) => {
          if (!backgroundWordRef.current) return;

          if (instant) {
            backgroundWordRef.current.textContent =
              skill.name.toUpperCase();

            gsap.set(backgroundWordRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            });

            return;
          }

          gsap.killTweensOf(backgroundWordRef.current);

          gsap.to(backgroundWordRef.current, {
            opacity: 0,
            y: 25,
            scale: 0.97,
            filter: "blur(8px)",
            duration: 0.18,
            ease: "power2.in",
            overwrite: true,
            onComplete: () => {
              if (!backgroundWordRef.current) return;

              backgroundWordRef.current.textContent =
                skill.name.toUpperCase();

              gsap.fromTo(
                backgroundWordRef.current,
                {
                  opacity: 0,
                  y: -20,
                  scale: 1.02,
                  filter: "blur(8px)",
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 0.65,
                  ease: "power3.out",
                }
              );
            },
          });
        };

        /*
         * Moves the active rail indicator.
         */
        const moveIndicator = (item, instant = false) => {
          if (!item || !listRef.current) return;

          const listBounds = listRef.current.getBoundingClientRect();
          const itemBounds = item.getBoundingClientRect();

          const center =
            itemBounds.top -
            listBounds.top +
            itemBounds.height / 2;

          gsap.to(activeLineRef.current, {
            y: center,
            opacity: 1,
            duration: instant ? 0 : 0.65,
            ease: EASE,
            overwrite: true,
          });

          gsap.to(activeDotRef.current, {
            y: center,
            scale: 1,
            duration: instant ? 0 : 0.55,
            ease: EASE,
            overwrite: true,
          });
        };

        /*
         * Main focus system.
         *
         * Only one skill owns the visual focus at a time.
         */
        const focusSkill = (index, instant = false) => {
          if (index < 0 || index >= TOTAL) return;

          const previousIndex = activeIndexRef.current;

          if (!instant && previousIndex === index) return;

          activeIndexRef.current = index;

          const item = items[index];
          const skill = skills[index];

          if (!item) return;

          setActiveIndex(index);

          /*
           * Skill rows
           */
          items.forEach((skillItem, i) => {
            const distance = Math.abs(i - index);

            let opacity = 0.18;
            let x = 0;
            let scale = 1;

            if (i === index) {
              opacity = 1;
              x = 12;
              scale = 1.015;
            } else if (distance === 1) {
              opacity = 0.48;
            }

            gsap.to(skillItem, {
              opacity,
              x,
              scale,
              duration: instant ? 0 : 0.55,
              ease: EASE,
              overwrite: "auto",
            });

            const title =
              skillItem.querySelector(".skill-title");

            const number =
              skillItem.querySelector(".skill-number");

            const icon =
              skillItem.querySelector(".skill-row-icon");

            const arrow =
              skillItem.querySelector(".skill-arrow");

            const meta =
              skillItem.querySelector(".skill-meta");

            gsap.to(title, {
              color:
                i === index
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0.25)",
              duration: instant ? 0 : 0.45,
              ease: "power2.out",
              overwrite: true,
            });

            gsap.to(number, {
              color:
                i === index
                  ? "rgba(45,212,191,0.95)"
                  : "rgba(255,255,255,0.18)",
              duration: instant ? 0 : 0.4,
              overwrite: true,
            });

            gsap.to(icon, {
              opacity: i === index ? 1 : 0.25,
              scale: i === index ? 1.05 : 1,
              duration: instant ? 0 : 0.45,
              ease: EASE,
              overwrite: true,
            });

            gsap.to(arrow, {
              opacity: i === index ? 1 : 0.12,
              x: i === index ? 0 : -5,
              duration: instant ? 0 : 0.4,
              ease: EASE,
              overwrite: true,
            });

            gsap.to(meta, {
              opacity: i === index ? 1 : 0,
              x: i === index ? 0 : 8,
              duration: instant ? 0 : 0.4,
              ease: EASE,
              overwrite: true,
            });
          });

          /*
           * Active indicator
           */
          moveIndicator(item, instant);

          /*
           * Ambient glow
           */
          const sectionBounds =
            section.getBoundingClientRect();

          const itemBounds =
            item.getBoundingClientRect();

          const center =
            itemBounds.top -
            sectionBounds.top +
            itemBounds.height / 2;

          gsap.to(ambientGlowRef.current, {
            y: center - 220,
            opacity: 1,
            duration: instant ? 0 : 0.75,
            ease: EASE,
            overwrite: true,
          });

          /*
           * Background typography
           */
          updateBackgroundWord(skill, instant);

          /*
           * Active icon
           */
          if (activeIconRef.current) {
            gsap.killTweensOf(activeIconRef.current);

            gsap.fromTo(
              activeIconRef.current,
              {
                opacity: instant ? 1 : 0,
                y: instant ? 0 : 10,
                scale: instant ? 1 : 0.85,
                rotate: instant ? 0 : -8,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                duration: instant ? 0 : 0.65,
                ease: EASE,
              }
            );
          }
        };

        /*
         * Initial state
         */
        focusSkill(0, true);

        /*
         * Scroll-driven focus.
         *
         * Each item gets a narrow activation zone so two
         * skills don't fight for focus at the same time.
         */
        items.forEach((item, index) => {
          ScrollTrigger.create({
            trigger: item,
            start: "center 58%",
            end: "center 42%",

            onEnter: () => {
              focusSkill(index);
            },

            onEnterBack: () => {
              focusSkill(index);
            },
          });

          /*
           * Desktop hover interaction
           */
          item.addEventListener("mouseenter", () => {
            focusSkill(index);
          });
        });

        /*
         * Cursor-following ambient light.
         */
        const handleMouseMove = (event) => {
          const rect = section.getBoundingClientRect();

          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          gsap.to(cursorGlowRef.current, {
            x,
            y,
            duration: 0.9,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        section.addEventListener(
          "mousemove",
          handleMouseMove
        );

        /*
         * Keep the indicator aligned after resize.
         */
        const handleResize = () => {
          const currentItem = items[activeIndexRef.current];

          if (currentItem) {
            moveIndicator(currentItem, true);
          }
        };

        window.addEventListener("resize", handleResize);

        return () => {
          section.removeEventListener(
            "mousemove",
            handleMouseMove
          );

          window.removeEventListener(
            "resize",
            handleResize
          );
        };
      });

      /*
       * Reduced motion
       */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const items = gsap.utils.toArray(".skill-item");

        gsap.set(items, {
          opacity: 1,
          x: 0,
          scale: 1,
        });

        gsap.set(".skills-heading-line", {
          opacity: 1,
          y: 0,
        });

        gsap.set(".skills-description", {
          opacity: 1,
          y: 0,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const ActiveIcon = activeSkill.icon;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="
        relative
        overflow-x-clip
        bg-[#1E1E1E]
        px-6
        py-28
        text-white
        md:px-12
        lg:px-20
        xl:px-24
      "
    >
      {/* Background grid */}
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

      {/* Giant active technology */}
      <div
        ref={backgroundWordRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-6%]
          top-[38%]
          z-0
          select-none
          whitespace-nowrap
          text-[14vw]
          font-semibold
          leading-none
          tracking-[-0.09em]
          text-white/[0.018]
        "
      >
        REACT
      </div>

      {/* Cursor glow */}
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

      {/* Active ambient glow */}
      <div
        ref={ambientGlowRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[28%]
          top-0
          z-0
          h-[440px]
          w-[440px]
          rounded-full
          bg-teal-400/[0.045]
          blur-[120px]
          opacity-0
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mb-24 grid gap-12 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Eyebrow */}
          <div className="skills-eyebrow flex items-start gap-3">
            <span
              className="
                mt-1.5
                h-1.5
                w-1.5
                rounded-full
                bg-teal-400
                shadow-[0_0_16px_rgba(45,212,191,0.6)]
              "
            />

            <div>
              <span
                className="
                  text-[11px]
                  font-medium
                  tracking-[0.32em]
                  text-white/45
                "
              >
                SKILLS
              </span>

              <p className="mt-3 max-w-[180px] text-[10px] leading-relaxed text-white/20">
                THE SYSTEMS
                <br />
                BEHIND THE WORK
              </p>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h2
              className="
                overflow-hidden
                text-5xl
                font-medium
                leading-[0.88]
                tracking-[-0.06em]
                sm:text-6xl
                md:text-7xl
                lg:text-[6.5rem]
              "
            >
              <span className="skills-heading-line block">
                The tools
              </span>

              <span className="skills-heading-line block text-white/30">
                behind the work.
              </span>
            </h2>

            <p
              className="
                skills-description
                mt-10
                max-w-xl
                text-sm
                leading-[1.8]
                text-white/40
                md:text-base
              "
            >
              Technologies I use to turn ideas into scalable,
              maintainable and thoughtful digital products.
            </p>
          </div>
        </div>

        {/* =====================================================
            MAIN EXPERIENCE
        ====================================================== */}
        <div
          className="
            grid
            items-start
            gap-16
            lg:grid-cols-[280px_minmax(0,1fr)]
            lg:gap-20
          "
        >
          {/* ===================================================
              STICKY INFORMATION PANEL
          ==================================================== */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            {/* Active skill */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p
                    className="
                      text-[10px]
                      font-medium
                      tracking-[0.3em]
                      text-teal-400
                    "
                  >
                    {activeSkill.category.toUpperCase()}
                  </p>

                  <h3
                    className="
                      mt-5
                      text-3xl
                      font-medium
                      tracking-[-0.05em]
                      md:text-4xl
                    "
                  >
                    {activeSkill.name}
                  </h3>
                </div>

                {/* Active technology icon */}
                <div
                  ref={activeIconRef}
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-teal-400/20
                    bg-teal-400/[0.04]
                    text-teal-400
                  "
                >
                  {ActiveIcon ? (
                    <ActiveIcon className="h-5 w-5" />
                  ) : (
                    <FiCpu className="h-5 w-5" />
                  )}
                </div>
              </div>

              <p
                className="
                  mt-5
                  max-w-[240px]
                  text-sm
                  leading-[1.8]
                  text-white/35
                "
              >
                {activeSkill.note}
              </p>
            </div>

            {/* Progress */}
            <div className="mt-10 border-t border-white/10 pt-5">
              <div className="flex items-center justify-between">
                <span
                  className="
                    font-mono
                    text-[10px]
                    tracking-[0.2em]
                    text-white/30
                  "
                >
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(TOTAL).padStart(2, "0")}
                </span>

                <span
                  className="
                    text-[9px]
                    tracking-[0.28em]
                    text-white/20
                  "
                >
                  ACTIVE
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-px w-full bg-white/[0.07]">
                <div
                  className="
                    h-px
                    bg-teal-400
                    transition-[width]
                    duration-500
                    ease-out
                  "
                  style={{
                    width: `${((activeIndex + 1) / TOTAL) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Category index */}
            <div className="mt-12 hidden lg:block">
              <p
                className="
                  mb-5
                  text-[9px]
                  tracking-[0.28em]
                  text-white/15
                "
              >
                SYSTEM MAP
              </p>

              <div className="space-y-3">
                {categories.map((category, index) => {
                  const categoryStart = skills.findIndex(
                    (skill) => skill.category === category
                  );

                  const isActive =
                    activeSkill.category === category;

                  return (
                    <div
                      key={category}
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <span
                        className={`
                          font-mono
                          text-[9px]
                          transition-colors
                          duration-300
                          ${
                            isActive
                              ? "text-teal-400"
                              : "text-white/15"
                          }
                        `}
                      >
                        0{index + 1}
                      </span>

                      <span
                        className={`
                          text-[9px]
                          tracking-[0.2em]
                          transition-colors
                          duration-300
                          ${
                            isActive
                              ? "text-white/55"
                              : "text-white/20"
                          }
                        `}
                      >
                        {category.toUpperCase()}
                      </span>

                      <span className="ml-auto font-mono text-[8px] text-white/10">
                        {String(categoryStart + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ===================================================
              SKILL LIST
          ==================================================== */}
          <div
            ref={listRef}
            className="
              relative
              pl-0
              lg:pl-8
            "
          >
            {/* Vertical rail */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                hidden
                h-full
                w-px
                bg-white/[0.06]
                lg:block
              "
            />

            {/* Active horizontal scan */}
            <div
              ref={activeLineRef}
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-0
                hidden
                h-px
                w-[calc(100%+32px)]
                bg-gradient-to-r
                from-teal-400
                via-teal-400/30
                to-transparent
                lg:block
              "
            />

            {/* Active rail dot */}
            <div
              ref={activeDotRef}
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-[3px]
                top-0
                hidden
                h-[7px]
                w-[7px]
                rounded-full
                bg-teal-400
                shadow-[0_0_20px_rgba(45,212,191,0.8)]
                lg:block
              "
            />

            {categories.map((category, categoryIndex) => {
              const categorySkills = skills.filter(
                (skill) => skill.category === category
              );

              return (
                <div
                  key={category}
                  className={
                    categoryIndex === categories.length - 1
                      ? ""
                      : "mb-20"
                  }
                >
                  {/* Category heading */}
                  <div className="mb-5 flex items-center gap-4">
                    <span
                      className="
                        font-mono
                        text-[9px]
                        tracking-[0.2em]
                        text-white/15
                      "
                    >
                      0{categoryIndex + 1}
                    </span>

                    <span
                      className="
                        text-[9px]
                        font-medium
                        tracking-[0.3em]
                        text-white/25
                      "
                    >
                      {category.toUpperCase()}
                    </span>

                    <div className="h-px flex-1 bg-white/[0.06]" />
                  </div>

                  {/* Category skills */}
                  <div>
                    {categorySkills.map((skill) => {
                      const index = skills.findIndex(
                        (item) => item.name === skill.name
                      );

                      const SkillIcon = skill.icon;

                      return (
                        <div
                          key={skill.name}
                          className="
                            skill-item
                            group
                            relative
                            origin-left
                            border-b
                            border-white/[0.07]
                            py-7
                            will-change-transform
                          "
                        >
                          <div className="flex items-center gap-5">
                            {/* Number */}
                            <span
                              className="
                                skill-number
                                w-6
                                shrink-0
                                font-mono
                                text-[9px]
                                tracking-[0.15em]
                                text-white/20
                              "
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* Technology icon */}
                            <div
                              className="
                                skill-row-icon
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                text-white/25
                                will-change-transform
                              "
                            >
                              {SkillIcon ? (
                                <SkillIcon className="h-[19px] w-[19px]" />
                              ) : (
                                <FiCpu className="h-[19px] w-[19px]" />
                              )}
                            </div>

                            {/* Skill name */}
                            <span
                              className="
                                skill-title
                                text-[clamp(1.8rem,4vw,3.6rem)]
                                font-medium
                                leading-none
                                tracking-[-0.055em]
                                text-white/25
                              "
                            >
                              {skill.name}
                            </span>

                            {/* Metadata */}
                            <span
                              className="
                                skill-meta
                                ml-auto
                                hidden
                                text-right
                                text-[9px]
                                leading-relaxed
                                tracking-[0.12em]
                                text-white/25
                                opacity-0
                                md:block
                              "
                            >
                              {skill.category.toUpperCase()}
                            </span>

                            {/* Arrow */}
                            <span
                              className="
                                skill-arrow
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/10
                                text-teal-400
                                opacity-[0.12]
                                transition-all
                                duration-500
                                group-hover:border-teal-400/30
                                group-hover:bg-teal-400/[0.04]
                              "
                            >
                              <FiArrowUpRight className="h-4 w-4" />
                            </span>
                          </div>

                          {/* Bottom interaction line */}
                          <div
                            aria-hidden="true"
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

                          {/* Mobile description */}
                          <div
                            className="
                              mt-4
                              pl-[4.5rem]
                              md:hidden
                            "
                          >
                            <p className="max-w-sm text-[10px] leading-[1.7] text-white/25">
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

        {/* =====================================================
            FOOTER
        ====================================================== */}
        <div
          className="
            mt-28
            flex
            flex-col
            gap-4
            border-t
            border-white/10
            pt-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-teal-400
                shadow-[0_0_14px_rgba(45,212,191,0.7)]
              "
            />

            <p
              className="
                text-[9px]
                tracking-[0.3em]
                text-white/25
              "
            >
              ALWAYS LEARNING
            </p>
          </div>

          <p
            className="
              text-[9px]
              tracking-[0.3em]
              text-white/20
            "
          >
            {TOTAL} TECHNOLOGIES
          </p>
        </div>
      </div>
    </section>
  );
}