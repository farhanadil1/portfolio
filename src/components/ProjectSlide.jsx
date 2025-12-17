import { motion, useScroll, useTransform } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { useRef } from "react";

const ProjectSlide = ({ project }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Adjusted offset for better visibility
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ["100%", "0%", "0%", "-100%"] 
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );
  

  return (
  
    <section id="projects" ref={ref} className="h-[200vh] relative bg-gradient-to-b from-white via-gray-50 to-white
        dark:from-gray-950 dark:via-black dark:to-gray-950">
      {/* PINNED AREA: Sticks to the top of the viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x, opacity }} // Applied the fixed transformations
          className="
            absolute inset-0
            flex items-center justify-center
            will-change-transform
          "
        >
          {/* CARD */}
          <div
            className="
              max-w-6xl w-full mx-auto px-6
              grid md:grid-cols-2 gap-16 items-center
              bg-white/80 dark:bg-gray-900/70
              backdrop-blur-xl
              rounded-3xl
              border border-gray-200/60 dark:border-gray-800
              shadow-[0_40px_120px_-40px_rgba(0,0,0,0.4)]
              p-8 md:p-12
            "
          >
            {/* IMAGE */}
            <div>
              <img
                src={project.imgSrc}
                alt={project.title}
                className="w-full h-[320px] md:h-[420px] object-contain rounded-2xl"
                draggable={false}
              />
            </div>

            {/* CONTENT */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                {project.title}
              </h3>

              <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 rounded-full border border-gray-300/60 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex gap-4">
                <a
                  href={project.liveLink}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-600 text-white font-medium hover:bg-teal-500 transition"
                >
                  <FiExternalLink /> Live Demo
                </a>

                <a
                  href={project.githubLink}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <FiGithub /> GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectSlide;