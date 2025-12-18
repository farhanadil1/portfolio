import { FiExternalLink, FiGithub } from "react-icons/fi";

const ProjectCard = ({ project }) => {
  return (
    <section
      id="projects"
      className="
        min-w-full h-full flex items-center
        px-8 md:px-16 pb-4 md:pb-0
        bg-gradient-to-b
        from-white via-gray-50 to-white
        dark:from-gray-950 dark:via-black dark:to-gray-950
      "
    >
      <div
        className="
          max-w-7xl w-full mx-auto
          grid md:grid-cols-2 gap-8 md:gap-20 items-center
        "
      >
        {/* IMAGE SIDE */}
        <div className="relative">
          {/* subtle glow */}
          <div className="absolute inset-0 bg-teal-400/10 blur-[120px] -z-10" />
          <a href={project.liveLink} target="blnk">
          <img
            src={project.imgSrc}
            alt={project.title}
            draggable={false}
            className="
              w-full h-[360px] md:h-[420px]
              object-contain
              opacity-95
              transition-transform duration-700
              will-change-transform
            "
          />
          </a>
        </div>

        {/* CONTENT SIDE */}
        <div className="relative">
          {/* tiny accent line */}
         

          <h3
            className="
              text-3xl md:text-4xl
              font-semibold
              tracking-tight
              leading-tight
            "
          >
            {project.title}
             <div className="w-28 h-[2px] bg-teal-500 mb-6" />
          </h3>

          <p
            className="
              mt-6
              text-xs md:text-base
              leading-relaxed
              text-gray-600 dark:text-gray-400
              max-w-xl
            "
          >
            {project.description}
          </p>

          {/* TECH STACK */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="
                  py-1 px-2 rounded-full font-medium
                  bg-white/10 dark:bg-white/5 text-xs uppercase tracking-wider
                  border border-black/20 dark:border-white/30
                  hover:border-teal-500 dark:hover:border-teal-400
                  backdrop-blur-md cursor-pointer transition-all duration-200
                  text-teal-500 hover:scale-[1.04]
                "
              >
                {tag}
              </span>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="mt-10 flex items-center gap-8">
            <a
              href={project.liveLink}
              target="_blank"
              className="
                group inline-flex items-center gap-2
                text-sm font-medium
                text-teal-600 dark:text-teal-400
              "
            >
              Live Demo
              <FiExternalLink
                className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </a>

            <a
              href={project.githubLink}
              target="_blank"
              className="
                group inline-flex items-center gap-2
                text-sm font-medium
                text-gray-800 dark:text-gray-300
              "
            >
              GitHub
              <FiGithub
                className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;
