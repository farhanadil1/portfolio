import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import { useState } from "react";

const projects = [
  {
    title: "EcoKart ",
    short: "Full MERN eco-friendly product selling store with authentication. ",
    description:"It provides a cohesive visual design system, modular components, and essential utilities to streamline development and ensure a responsive shopping experience.",
    imgSrc: "./ecokart.png",
    githubLink: "https://github.com/farhanadil1/EcoKart",
    liveLink: "https://anythingecom.netlify.app/",
    tags: ["MERN", "JWT Auth", "Product API", "Cart Context", "Figma"],
  },
  {
    title: "CVCraft - CV Builder",
    short: "A full-stack MERN application for building professional, ATS-friendly resumes quickly and efficiently.",
    description:
      "CVCraft is a feature-rich full-stack resume builder designed for professionals and students to create ATS-friendly resumes efficiently.Built with React on the frontend and Node.js + Express + MongoDB on the backend.",
    imgSrc: "./cvcraft.png",
    githubLink: "https://github.com/farhanadil1",
    liveLink: "#",
    tags: ["React", "Express", "Node.js", "MongoDB", "Figma", "JWT Auth"],
  },
  {
    title: "FitMe – Fitness Tracker",
    short: "React + Spring Boot fitness tracker.",
    description:
      "FitMe allows users to log workouts, track nutrition, set fitness goals, and securely authenticate using JWT. Built with React and Spring Boot, it offers realtime UI interactions, analytics, and clean user flow.",
    imgSrc: "./fitme.jpg",
    githubLink: "https://github.com/farhanadil1/FitMe",
    liveLink: "https://fitmeui.netlify.app/",
    tags: ["React", "Spring Boot", "JWT", "Fitness Algorithms"],
  },
  {
    title: "Weatheria Weather App",
    short: "Weatheria is a sleek, modern weather app with animated UI.",
    description:
      "Weatheria is a fully responsive weather platform that fetches real-time meteorological data, hourly updates, multi-day forecasts, and interactive visual UI elements. Built with React and OpenWeather API, it features smooth animations, dynamic backgrounds, and intuitive user experience.",
    imgSrc: "./weatheria.png",
    githubLink: "https://github.com/farhanadil1/Weatheria",
    liveLink: "https://weatheria123.netlify.app/",
    tags: ["React", "Weather API", "Responsive UI", "Animations"],
  },
];

const cardAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState(null);

  const visibleProjects = projects.slice(0, 4);

  return (
    <section
      id="projects"
      className="pb-6 md:py-20 bg-gradient-to-b from-white to-teal-50 dark:from-gray-900 dark:to-gray-950"
    >
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center py-10 md:py-0 md:mb-12"
      >
        <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
         Featured Projects
        </span>
      </motion.h2>

      {/* Cards */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-8"
      >
        {visibleProjects.map((p) => (
          <motion.article
            key={p.title}
            variants={cardAnim}
            onClick={() => setActiveProject(p)}
            className="
              group cursor-pointer rounded-2xl 
              border border-gray-200/50 dark:border-gray-800
              bg-white/70 dark:bg-gray-900/40 backdrop-blur-lg
              shadow-md hover:shadow-xl transition overflow-hidden
            "
          >
            <img
              src={p.imgSrc}
              className="w-full h-56 object-contain group-hover:scale-105 transition duration-500"
            />

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {p.title}
              </h3>

              <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
                {p.short}
              </p>

              {/* Tech badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Live button on card */}
              <div className="mt-5 flex gap-4">
                <a
                  href={p.liveLink}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  className="
                    inline-flex items-center gap-2 px-5 py-2 
                    bg-teal-600 text-white rounded-full 
                    hover:bg-teal-500 transition
                  "
                >
                  <FiExternalLink /> Live Demo
                </a>
                <a
                  href={p.githubLink}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <FiGithub /> GitHub
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* GitHub button */}
      <div className="mt-12 flex justify-center">
        <a
          href="https://github.com/farhanadil1"
          target="_blank"
          className="px-8 py-3 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-500 transition active:scale-95"
        >
          Explore All Projects →
        </a>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl md:h-screen md:py-4 max-w-4xl w-full p-6 shadow-xl border border-gray-200 dark:border-gray-800"
            >
              <button
                onClick={() => setActiveProject(null)}
                className="ml-auto block text-gray-500 hover:scale-110"
              >
                <FiX size={26} />
              </button>

              <img
                src={activeProject.imgSrc}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />

              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {activeProject.title}
              </h3>

              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {activeProject.description}
              </p>

              {/* Tech badges */}
              <h4 className="mt-6 mb-2 text-gray-800 dark:text-gray-200 font-semibold">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-3">
                <a
                  href={activeProject.liveLink}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-600 text-white hover:bg-teal-500"
                >
                  <FiExternalLink /> Live Demo
                </a>
                <a
                  href={activeProject.githubLink}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <FiGithub /> GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
