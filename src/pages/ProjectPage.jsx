import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiExternalLink,
  FiGithub,
} from "react-icons/fi";
import { projects } from "../data/projects";

const EASE = [0.16, 1, 0.3, 1];

const reveal = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE,
    },
  },
};

function Marquee({ reverse = false }) {
  const items = [
    "DIGITAL EXPERIENCE",
    "INTERACTION DESIGN",
    "FULL STACK DEVELOPMENT",
    "MOTION & DETAIL",
    "BUILT WITH INTENT",
  ];

  return (
    <div className="relative overflow-hidden border-y border-black/10 py-4 dark:border-white/10">
      <motion.div
        animate={
          reverse
            ? { x: ["-50%", "0%"] }
            : { x: ["0%", "-50%"] }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex w-max whitespace-nowrap"
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center"
          >
            <span className="px-7 text-[10px] font-medium tracking-[0.28em] text-gray-400 dark:text-gray-500 md:text-xs">
              {item}
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function MagneticButton({ href, children, icon }) {
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 220,
    damping: 20,
  });

  const springY = useSpring(y, {
    stiffness: 220,
    damping: 20,
  });

  const handleMove = (e) => {
    if (reduce) return;

    const rect = e.currentTarget.getBoundingClientRect();

    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.15);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.15);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className="group flex items-center justify-between rounded-full bg-teal-500 px-6 py-4 text-sm font-medium text-black transition-colors duration-300 hover:bg-teal-400"
    >
      <span>{children}</span>

      <span className="grid h-8 w-8 place-items-center rounded-full bg-black/10">
        {icon}
      </span>
    </motion.a>
  );
}

function GalleryImage({ src, index }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: reduce ? 0 : 70,
        scale: reduce ? 1 : 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 1,
        ease: EASE,
        delay: index * 0.05,
      }}
      className="group relative overflow-hidden bg-neutral-100 dark:bg-neutral-900"
    >
      <motion.img
        src={src}
        alt=""
        loading="lazy"
        draggable={false}
        whileHover={
          reduce
            ? undefined
            : {
                scale: 1.035,
              }
        }
        transition={{
          duration: 0.8,
          ease: EASE,
        }}
        className="block w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

      <div className="pointer-events-none absolute bottom-5 left-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition-all duration-500 group-hover:opacity-100">
        <FiArrowUpRight size={14} />
      </div>
    </motion.div>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects[slug];

  const heroRef = useRef(null);
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const imageX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    if (reduce) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, reduce]);

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF9] text-black dark:bg-[#1E1E1E] dark:text-white">
        <div className="text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-gray-400">
            404
          </p>

          <h1 className="text-4xl font-medium tracking-tight">
            Project not found
          </h1>

          <Link
            to="/#projects"
            className="mt-8 inline-flex items-center gap-2 text-sm text-teal-500"
          >
            <FiArrowLeft />
            Back to projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-hidden bg-[#FAFAF9] text-black dark:bg-[#1E1E1E] dark:text-white">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen px-6 pb-20 pt-7 md:px-12 lg:px-20"
      >
        {/* Top navigation */}
        <div className="relative z-20 mx-auto flex max-w-7xl items-center justify-between">
          <Link
            to="/#projects"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-black/10 transition-transform duration-300 group-hover:-translate-x-1 dark:border-white/10">
              <FiArrowLeft size={13} />
            </span>

            Back to projects
          </Link>

          <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
            Case study
          </span>
        </div>

        <div className="mx-auto flex min-h-[calc(100vh-100px)] max-w-7xl flex-col justify-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: EASE,
              delay: 0.1,
            }}
            className="mb-6 flex items-center gap-3"
          >
           

            
          </motion.div>

          {/* Giant title */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 1.15,
                ease: EASE,
                delay: 0.15,
              }}
              className="max-w-6xl text-[clamp(4rem,12vw,11rem)] font-medium leading-[0.82] tracking-[-0.065em]"
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: EASE,
              delay: 0.45,
            }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 md:ml-[8vw] md:text-lg"
          >
            {project.subtitle}
          </motion.p>

          {/* Hero image */}
          <motion.div
            initial={{
              opacity: 0,
              y: 80,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 1.2,
              ease: EASE,
              delay: 0.5,
            }}
            className="relative mt-16 md:mt-20"
          >
            <motion.div
              style={{
                x: reduce ? 0 : imageX,
                y: reduce ? 0 : imageY,
              }}
              className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-900"
            >
              <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{
                  duration: 1.3,
                  ease: EASE,
                  delay: 0.65,
                }}
                style={{
                  transformOrigin: "bottom",
                }}
                className="absolute inset-0 z-10 bg-[#FAFAF9] dark:bg-[#1E1E1E]"
              />

              <img
                src={project.hero}
                alt={project.title}
                draggable={false}
                className="block h-auto w-full"
              />
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.2,
            }}
            className="mt-8 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500"
          >
            <span>Scroll to explore</span>

            <motion.span
              animate={
                reduce
                  ? undefined
                  : {
                      y: [0, 6, 0],
                    }
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-teal-500"
            >
              ↓
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* MOVING RIBBON */}
      <Marquee />

      {/* PROJECT INTRO */}
      <section className="px-6 py-28 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_0.35fr] lg:gap-24">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
          >
            <p className="mb-7 text-[10px] font-medium uppercase tracking-[0.3em] text-teal-500">
              Overview
            </p>

            <p className="max-w-4xl text-2xl font-medium leading-[1.3] tracking-tight md:text-4xl lg:text-5xl">
              {project.overview}
            </p>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="self-end"
          >
            <div className="h-px w-full bg-black/10 dark:bg-white/10" />

            <div className="mt-5 flex justify-between text-[9px] uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
              <span>Project</span>
              <span>01</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="border-y border-black/10 dark:border-white/10">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="border-b border-black/10 px-6 py-14 dark:border-white/10 md:border-b-0 md:border-r md:px-10 lg:px-14"
          >
            <p className="mb-10 text-[10px] uppercase tracking-[0.28em] text-gray-400 dark:text-gray-500">
              Highlights
            </p>

            <div className="space-y-6">
              {project.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: EASE,
                    delay: index * 0.08,
                  }}
                  className="flex gap-4"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />

                  <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {highlight}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              ease: EASE,
              delay: 0.1,
            }}
            className="border-b border-black/10 px-6 py-14 dark:border-white/10 md:border-b-0 md:border-r md:px-10 lg:px-14"
          >
            <p className="mb-10 text-[10px] uppercase tracking-[0.28em] text-gray-400 dark:text-gray-500">
              Technology
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {project.tech.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: EASE,
                    delay: index * 0.06,
                  }}
                  className="text-xs font-medium uppercase tracking-[0.16em] text-gray-700 dark:text-gray-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              ease: EASE,
              delay: 0.2,
            }}
            className="px-6 py-14 md:px-10 lg:px-14"
          >
            <p className="mb-10 text-[10px] uppercase tracking-[0.28em] text-gray-400 dark:text-gray-500">
              Explore
            </p>

            <div className="space-y-4">
              <MagneticButton
                href={project.live}
                icon={<FiExternalLink size={15} />}
              >
                Live demo
              </MagneticButton>

              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                transition={{
                  duration: 0.3,
                  ease: EASE,
                }}
                className="flex items-center justify-between border-b border-black/15 py-4 text-sm dark:border-white/15"
              >
                <span>View source</span>

                <FiGithub size={16} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      {project.images?.length > 0 && (
        <section className="px-6 py-28 md:px-12 md:py-20 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex items-end justify-between">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: EASE,
                }}
              >
                <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-teal-500">
                  Visual system
                </p>

                <h2 className="text-4xl font-medium tracking-[-0.04em] md:text-6xl">
                  Inside the
                  <br />
                  experience.
                </h2>
              </motion.div>

              <span className="hidden text-[9px] uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500 md:block">
                Selected screens
              </span>
            </div>

            <div className="space-y-8 md:space-y-12">
              {project.images.map((image, index) => (
                <GalleryImage
                  key={`${image}-${index}`}
                  src={image}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECOND MARQUEE */}
      <Marquee reverse />

      {/* CLOSING CTA */}
      <section className="relative px-6 py-32 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 1,
              ease: EASE,
            }}
            className="relative overflow-hidden rounded-[2rem] bg-[#111111] px-7 py-16 text-white dark:bg-[#0F0F0F] md:px-14 md:py-24"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl"
            />

            <div className="relative z-10">
              <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-teal-400">
                Next project
              </p>

              <h2 className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
                Have an idea?
                <br />
                Let's build it.
              </h2>

              <div className="mt-12">
                <Link
                  to="/#contact"
                  className="group inline-flex items-center gap-4 text-sm font-medium"
                >
                  <span className="relative">
                    Start a conversation

                    <span className="absolute -bottom-2 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:origin-left group-hover:scale-x-100" />
                  </span>

                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white group-hover:text-black">
                    <FiArrowUpRight size={17} />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

