import { FiExternalLink, FiGithub } from "react-icons/fi";

const ProjectCard = ({ project }) => {
  return (
    <section
      className="
        min-w-full h-full flex items-center
        px-6 md:px-20
        bg-white text-black
        dark:bg-[#0f0f0f] dark:text-white
      "
    >
      <div
        className="
          max-w-7xl w-full mx-auto
          grid md:grid-cols-2 gap-12 md:gap-24 items-center
        "
      >
        {/* IMAGE */}
        <a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block"
        >
          <img
            src={project.imgSrc}
            alt={project.title}
            draggable={false}
            className="
              w-full h-[340px] md:h-[420px]
              object-contain
              transition-transform duration-700 ease-out
              group-hover:scale-[1.03]
              group-hover:-translate-y-1
            "
          />
        </a>

        {/* CONTENT */}
        <div className="relative">
          <h3
            className="
              text-3xl md:text-4xl font-medium
              tracking-tight leading-tight
            "
          >
            {project.title}
          </h3>

          {/* Accent rule */}
          <div className="mt-3 w-24 h-px bg-teal-500" />

          <p
            className="
              mt-6 text-sm md:text-base
              leading-relaxed
              text-gray-600 dark:text-gray-400
              max-w-xl
            "
          >
            {project.description}
          </p>

          {/* TECH */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="
                  px-3 py-1 text-[11px] font-medium
                  uppercase tracking-wider
                  rounded-full
                  bg-black/[0.04] text-gray-700
                  dark:bg-white/[0.06] dark:text-gray-300
                "
              >
                {tag}
              </span>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="mt-10 flex items-center gap-10 text-sm">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group inline-flex items-center gap-2
                text-teal-600 dark:text-teal-400
              "
            >
              <span className="relative">
                Live Demo
                <span
                  className="
                    absolute left-0 -bottom-1
                    h-px w-0 bg-current
                    transition-all duration-300
                    group-hover:w-full
                  "
                />
              </span>
              <FiExternalLink size={16} />
            </a>

            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group inline-flex items-center gap-2
                text-gray-700 dark:text-gray-300
              "
            >
              <span className="relative">
                GitHub
                <span
                  className="
                    absolute left-0 -bottom-1
                    h-px w-0 bg-current
                    transition-all duration-300
                    group-hover:w-full
                  "
                />
              </span>
              <FiGithub size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;
