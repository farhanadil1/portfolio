import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const featuredProject = {
  title: "EcoKart",
  description:
    "An eco-friendly e-commerce platform focused on sustainable living. Designed with clean UI, smooth interactions, and a scalable architecture.",
  imgSrc: "/ecokart.png",
  liveLink: "https://ecokart-adil-farhan.netlify.app/",
};

const projects = [
  { title: "CVCraft", imgSrc: "/cvcraft.png", href: "/projects/cvcraft" },
  { title: "FitMe", imgSrc: "/fitme.png", href: "/projects/fitme" },
  {
    title: "FarmPredict",
    imgSrc: "/farmpredict.PNG",
    href: "/projects/farmpredict",
  },
  { title: "Weatheria", imgSrc: "/weatheria.png", href: "/projects/weatheria" },
];

const CATEGORIES = [
  "UI DESIGN",
  "FULL STACK",
  "MOTION SYSTEMS",
  "PERFORMANCE",
  "REACT",
  "SPRING BOOT",
];

const EASE = [0.16, 1, 0.3, 1];
const REVEAL = { duration: 1, ease: EASE };
function MaskedHeading({ text, className }) {
  const words = text.split(" ");

  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.06,
              delayChildren: 0.05,
            },
          },
        }}
      >
        {words.map((word, wordIndex) => (
          <span
            key={`${word}-${wordIndex}`}
            className="mr-[0.3em] inline-block overflow-hidden align-bottom"
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${char}-${charIndex}`}
                className="inline-block"
                variants={{
                  hidden: {
                    y: "110%",
                    opacity: 0,
                    filter: "blur(6px)",
                  },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    filter: "blur(0px)",
                  },
                }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/* A running strip of category words — cheap to build, reads as premium.
   Content is duplicated once so the loop has no seam. */
function Marquee() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mt-10 overflow-hidden border-y border-black/10 py-3">
      <div
        className={`flex w-max gap-10 whitespace-nowrap text-xs tracking-[0.25em] text-neutral-400  ${
          reduce ? "" : "animate-[marquee_22s_linear_infinite]"
        }`}
      >
        {[...CATEGORIES, ...CATEGORIES].map((cat, i) => (
          <span key={i} className="flex items-center gap-10">
            {cat}
            <span className="h-1 w-1 rounded-full bg-teal-500/60" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* Follows the cursor while it's over the card. Position is page-relative,
   clamped to the card's own box, spring-smoothed so it trails slightly
   rather than snapping — the signature "hover a link, a tag follows the
   mouse" trick most Awwwards project pages use. */
function CursorTag({ parentRef, label }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 22, mass: 0.4 });

  const handleMove = (e) => {
    const rect = parentRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      className="absolute inset-0 z-20 hidden md:block"
    >
      <motion.span
        style={{ left: springX, top: springY }}
        initial={{ opacity: 0, scale: 0.6 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-xs font-medium tracking-wide text-black shadow-xl"
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

function FeaturedProject() {
  const cardRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-48, 48]
  );

  /* 3D tilt toward the cursor. Small, held on a spring so it settles
     rather than jitters. */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const tiltX = useSpring(rotateX, { stiffness: 150, damping: 18 });
  const tiltY = useSpring(rotateY, { stiffness: 150, damping: 18 });

  const handleTilt = (e) => {
    if (reduce) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(-py * 6);
  };
  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.a
      ref={cardRef}
      href={featuredProject.liveLink}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
      style={{
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1200,
      }}
      className="group relative mb-10 block aspect-[16/10] overflow-hidden bg-neutral-100 will-change-transform  md:aspect-[20/9]"
    >
      {/* TEMP DEBUG confirmed this is safe on its own. Now restoring
          parallax + hover (neither gated by whileInView, so both render
          immediately) and adding the reveal back as a curtain wipe
          instead of clip-path — same fix as the grid cards below. */}
      <motion.img
        src={featuredProject.imgSrc}
        alt={featuredProject.title}
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{ y: parallaxY }}
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: EASE }}
        style={{ transformOrigin: "bottom" }}
        className="absolute inset-0 z-[1] bg-neutral-100 "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

      <CursorTag parentRef={cardRef} label="View project ↗" />

      <div className="absolute inset-x-0 bottom-0 z-10 p-8 text-white md:p-12">
        <p className="mb-3 text-xs tracking-[0.2em] text-white/60">
          Featured project
        </p>

        <h3 className="overflow-hidden text-2xl font-semibold tracking-tight md:text-4xl">
          <motion.span
            className="block"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            {featuredProject.title}
          </motion.span>
        </h3>

        <p className="mt-4 max-w-lg text-xs text-white/75 md:text-base">
          {featuredProject.description}
        </p>

        {/* Arrow stays as a fallback affordance for touch / reduced motion,
            the cursor tag carries the interaction on desktop hover. */}
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium md:hidden">
          View project
          <FiArrowUpRight />
        </div>
      </div>
    </motion.a>
  );
}

function MagneticArrow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.5);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white"
    >
      <FiArrowUpRight />
    </motion.span>
  );
}

function ProjectCard({ project, index }) {
  const reduce = useReducedMotion();

  const titleVariants = {
    rest: {},
    hover: {},
  };

  const letterVariants = {
    rest: {
      y: "115%",
      opacity: 0,
      filter: "blur(8px)",
    },
    hover: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <motion.a
      href={project.href}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative block aspect-[16/10] overflow-hidden bg-neutral-100 "
    >
      {/* Large ghost index */}
      <motion.span
        aria-hidden
        variants={{
          rest: {
            opacity: 0,
            scale: 0.85,
            y: 20,
          },
          hover: {
            opacity: 1,
            scale: 1,
            y: 0,
          },
        }}
        transition={{
          duration: 0.7,
          ease: EASE,
        }}
        className="pointer-events-none absolute -right-3 -top-5 z-0 select-none text-[8rem] font-bold leading-none tracking-[-0.08em] text-white/10"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Project image */}
      <motion.img
        src={project.imgSrc}
        alt={project.title}
        loading="lazy"
        decoding="async"
        draggable={false}
        whileHover={
          reduce
            ? {}
            : {
                scale: 1.08,
                rotate: index % 2 ? 0.6 : -0.6,
              }
        }
        transition={{
          duration: 0.8,
          ease: EASE,
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Reveal curtain */}
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: 0.8,
          ease: EASE,
          delay: reduce ? 0 : index * 0.08,
        }}
        style={{ transformOrigin: "bottom" }}
        className="absolute inset-0 z-[1] bg-neutral-100 "
      />

      {/* Hover atmosphere */}
      <motion.div
        variants={{
          rest: {
            opacity: 0.12,
          },
          hover: {
            opacity: 0.52,
          },
        }}
        transition={{
          duration: 0.6,
          ease: EASE,
        }}
        className="absolute inset-0 z-[1] bg-black"
      />

      {/* Subtle radial glow */}
      <motion.div
        variants={{
          rest: {
            opacity: 0,
            scale: 0.7,
          },
          hover: {
            opacity: 1,
            scale: 1,
          },
        }}
        transition={{
          duration: 0.8,
          ease: EASE,
        }}
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_55%,rgba(45,212,191,0.12),transparent_55%)]"
      />

      {/* Project information */}
      <motion.div
        variants={{
          rest: {
            y: 18,
            opacity: 0,
          },
          hover: {
            y: 0,
            opacity: 1,
          },
        }}
        transition={{
          duration: 0.5,
          ease: EASE,
        }}
        className="absolute inset-0 z-[2] hidden flex-col items-center justify-center text-white md:flex"
      >

        {/* Animated title */}
        <motion.h4
          variants={titleVariants}
          className="overflow-hidden px-6 text-center text-3xl font-medium tracking-wider md:text-4xl"
        >
          <span className="flex justify-center overflow-hidden">
            {project.title.split("").map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                variants={letterVariants}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + i * 0.035,
                  ease: EASE,
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </motion.h4>

        {/* Bottom interaction */}
        <motion.div
          variants={{
            rest: {
              opacity: 0,
              y: 12,
            },
            hover: {
              opacity: 1,
              y: 0,
            },
          }}
          transition={{
            duration: 0.45,
            delay: 0.25,
            ease: EASE,
          }}
          className="mt-4 flex items-center gap-3"
        >

          <MagneticArrow />
        </motion.div>
      </motion.div>

      {/* Mobile */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-2 bg-black/30 text-white md:hidden">
        <h4 className="text-xl font-semibold tracking-tight">
          {project.title}
        </h4>

        <div className="flex items-center gap-2 text-xs opacity-80">
          View project
          <FiArrowUpRight />
        </div>
      </div>
    </motion.a>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white px-6 py-28 text-black  md:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gray-500 ">
            <MaskedHeading text="SELECTED WORK" />
          </p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ ...REVEAL, delay: 0.1 }}
            className="mt-3 max-w-xl text-gray-600"
          >
            A curated set of projects focused on interaction design, system
            thinking, and real-world problem solving.
          </motion.p>
        </div>

        <Marquee />

        <div className="mt-16">
          <FeaturedProject />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={REVEAL}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/farhanadil1"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-700 outline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-teal-500"
          >
            <span className="relative">
              View more projects on GitHub
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] group-hover:origin-left group-hover:scale-x-100" />
            </span>
            <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}