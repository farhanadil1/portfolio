import { motion, useScroll, useTransform } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { useRef } from "react";

const ProjectSlide = ({ project }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Softer horizontal travel (less aggressive)
  const x = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    ["60%", "0%", "0%", "-60%"]
  );

  // Cleaner opacity window
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  // Optional subtle scale for depth
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.96, 1, 1, 0.96]
  );

  return (
    <section
      ref={ref}
      className="
        relative h-[200vh]
        bg-white dark:bg-[#0f0f0f]
      "
    >
      {/* PINNED FRAME */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          style={{ x, opacity, scale }}
          transition={{ ease: "easeOut" }}
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
              bg-white dark:bg-[#0b0b0b]
              border border-black/5 dark:border-white/10
              p-10 md:p-14
            "
          >
            {/* IMAGE */}
            <div>
              <img
                src={project.imgSrc}
                alt={project.title}
                className="w-full h-[320px] md:h-[420px] object-contain"
                draggable={false}
              />
            </div>

            {/* CONTENT */}
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold">
                {project.title}
              </h3>

              <div className="mt-3 w-24 h-px bg-teal-500" />

              <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                {project.description}
              </p>

              {/* TAGS */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      px-3 py-1 text-xs uppercase tracking-wide
                      bg-black/[0.04] dark:bg-white/[0.06]
                      text-gray-700 dark:text-gray-300
                      rounded-full
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="mt-10 flex gap-8 text-sm">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400"
                >
                  Live Demo <FiExternalLink />
                </a>

                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  GitHub <FiGithub />
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
