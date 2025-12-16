import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "EcoKart",
    description:
      "EcoKart is an eco-friendly product selling web app built with React & Tailwind CSS. It offers sustainable products in categories like Skincare, Household, Baby Care, and Personal Care. Features include a product carousel, reviews, cart system, and responsive design for seamless shopping.",
    imgSrc: "./ecokart.png",
    githubLink: "https://github.com/farhanadil1/EcoKart",
    liveLink: "https://ecokart-adil-farhan.netlify.app/",
    tags: ["MERN", "JWT", "Cart Context", "Figma"],
  },
  {
    title: "CVCraft - Resume Builder",
    description:
      "CVCraft is a feature-rich full-stack resume builder designed for professionals and students to create ATS-friendly resumes efficiently. Built with React + Tailwind CSS on the frontend and Node.js + Express + MongoDB on the backend.",
    imgSrc: "./cvcraft.png",
    githubLink: "https://github.com/farhanadil1",
    liveLink: "https://cv-craftt.netlify.app/",
    tags: ["React", "Node", "MongoDB", "JWT"],
  },
  {
    title: "FitMe - Fitness Tracker",
    description:
      "FitMe is a fitness tracking and personal development web application designed to help users achieve their fitness goals. It includes workout logging, progress tracking, nutrition guidance, and more.",
    imgSrc: "./fitme.png",
    githubLink: "https://github.com/farhanadil1/FitMe",
    liveLink: "https://fitmeui.netlify.app/",
    tags: ["React", "Tailwind", "Spring Boot", "Hibernate", "MySQL"],
  },
  {
    title: "Weatheria",
    description:
      "Weatheria is a sleek weather web app built with React.js that fetches real-time weather data using an API. It features dark/light mode and smooth animations.",
    imgSrc: "./weatheria.png",
    githubLink: "https://github.com/farhanadil1/Weatheria",
    liveLink: "https://weatheria123.netlify.app/",
    tags: ["React", "API", "Animations"],
  },
];

const PIN_SCROLL = 1;
const TRANSITION_SCROLL = 1;

const ProjectsSection = () => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const totalScrollUnits =
    projects.length * (PIN_SCROLL + TRANSITION_SCROLL);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    enabled: !isMobile,
  });

  const x = useTransform(scrollYProgress, (v) => {
    if (isMobile) return "0%";

    const total = totalScrollUnits;
    const progress = v * total;

    const index = Math.floor(progress / (PIN_SCROLL + TRANSITION_SCROLL));
    const local = progress % (PIN_SCROLL + TRANSITION_SCROLL);

    // PIN phase
    if (local < PIN_SCROLL) {
      return `-${index * 100}%`;
    }

    // SLIDE phase
    const t = (local - PIN_SCROLL) / TRANSITION_SCROLL;
    return `-${(index + t) * 100}%`;
  });

  return (
    <section
      id="projects"
      ref={ref}
      className="
        relative
        bg-gradient-to-b from-white via-gray-50 to-white
        dark:from-gray-950 dark:via-black dark:to-gray-950
      "
      style={{ height: isMobile ? "auto" : `${totalScrollUnits * 100}vh` }}
    >
      {/* Section Title */}
      <motion.h2
        className="
          text-4xl md:text-5xl font-bold text-center pt-10 md:pt-12 pb-4
          bg-gradient-to-r from-teal-700 via-teal-500 to-teal-600
          bg-[length:200%_200%]
          bg-clip-text text-transparent
        "
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        Projects
      </motion.h2>

      {/* PROJECTS VIEW */}
      {isMobile ? (
       
        <div className="px-4 space-y-20 pb-24">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      ) : (
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full will-change-transform"
          >
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
