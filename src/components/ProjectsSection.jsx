import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "../components/ProjectCard";
import { FiArrowUpRight } from "react-icons/fi";


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
      "FitMe is a fitness tracking and personal development web application designed to help users achieve their fitness goals. It includes workout logging, progress tracking, nutrition guidance, and more. With a user-friendly interface and a strong focus on health and fitness.",
    imgSrc: "./fitme.png",
    githubLink: "https://github.com/farhanadil1/FitMe",
    liveLink: "https://fitmeui.netlify.app/",
    tags: ["React", "Tailwind CSS", "Spring Boot", "Hibernate", "MySQL"],
  },
  {
    title: "Weatheria",
    description:
      "Weatheria is a sleek weather web app built with React.js that fetches real-time weather data using a Weather API. It features a clean and modern Ul with dark and light modes and smooth animations powered by Al, providing an engaging and user-friendly experience. Perfect for quick and accurate weather updates with style.",
    imgSrc: "./weatheria.png",
    githubLink: "https://github.com/farhanadil1/Weatheria",
    liveLink: "https://weatheria123.netlify.app/",
    tags: ["React", "API", "Animations"],
  },
];

const PIN_SCROLL = 1;        // how long a project stays pinned
const TRANSITION_SCROLL = 1; // how long slide animation takes

const ProjectsSection = () => {
  const ref = useRef(null);

  const totalScrollUnits =
    projects.length * (PIN_SCROLL + TRANSITION_SCROLL);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /**
   * Convert vertical scroll into horizontal steps:
   * each project gets:
   * - pin
   * - then slide to next
   */
  const x = useTransform(scrollYProgress, (v) => {
    const total = totalScrollUnits;
    const progress = v * total;

    const index = Math.floor(progress / (PIN_SCROLL + TRANSITION_SCROLL));
    const local = progress % (PIN_SCROLL + TRANSITION_SCROLL);

    // PIN phase → no movement
    if (local < PIN_SCROLL) {
      return `-${index * 100}%`;
    }

    // TRANSITION phase → slide
    const t = (local - PIN_SCROLL) / TRANSITION_SCROLL;
    return `-${(index + t) * 100}%`;
  });

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-white via-gray-50 to-white
        dark:from-gray-950 dark:via-black dark:to-gray-950"
      style={{ height: `${totalScrollUnits * 100}vh` }}
    >
      <motion.h2
        className="
          text-4xl pb-8 md:pb-0 z-10 md:text-5xl font-bold text-center
          bg-gradient-to-r from-teal-400 via-teal-200 to-purple-200
          bg-[length:200%_200%]
          bg-clip-text text-transparent
        "
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
         Projects
      </motion.h2>
      {/* PINNED VIEWPORT */}
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
    </section>
  );
};

export default ProjectsSection;
