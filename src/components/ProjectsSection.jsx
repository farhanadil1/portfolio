import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const featuredProject = {
  title: "EcoKart",
  description:
    "An eco-friendly e-commerce platform focused on sustainable living. Designed with clean UI, smooth interactions, and a scalable architecture.",
  imgSrc: "./ecokart.png",
  liveLink: "https://ecokart-adil-farhan.netlify.app/",
};

const projects = [
  {
    title: "CVCraft",
    imgSrc: "./cvcraft.png",
    href: "/projects/cvcraft",
  },
  {
    title: "FitMe",
    imgSrc: "./fitme.png",
    href: "/projects/fitme",
  },
  {
    title: "FarmPredict",
    imgSrc: "./farmpredict.PNG",
    href: "/projects/farmpredict",
  },
  {
    title: "Weatheria",
    imgSrc: "./weatheria.png",
    href: "/projects/weatheria",
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="
        relative py-28 px-6 md:px-20
        bg-white text-black
        dark:bg-black dark:text-white
      "
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-16">
          <p className="text-sm tracking-[0.25em] text-gray-500 dark:text-gray-400">
            SELECTED WORK
          </p>
          <p className="mt-3 max-w-xl text-gray-600 dark:text-gray-400">
            A curated set of projects focused on interaction design,
            system thinking, and real-world problem solving.
          </p>
        </div>

        {/* FEATURED PROJECT */}
        <motion.a
          href={featuredProject.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover="hover"
          initial="rest"
          animate="rest"
          className="
            group relative mb-10
            md:aspect-[20/9] aspect-[16/10] overflow-hidden
            bg-neutral-100 dark:bg-neutral-900
            block
          "
        >
          <motion.img
            src={featuredProject.imgSrc}
            alt={featuredProject.title}
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.04 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* content */}
          <div
            className="
              absolute bottom-0 left-0
              w-full p-8 md:p-12
              text-white
            "
          >
            <p className="text-xs tracking-[0.2em] opacity-70 mb-3">
              FEATURED PROJECT
            </p>

            <h3 className="text-2xl md:text-4xl font-semibold tracking-tight">
              {featuredProject.title}
            </h3>

            <p className="mt-4 max-w-lg text-white/80 text-xs md:text-base">
              {featuredProject.description}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
              View project
              <FiArrowUpRight />
            </div>
          </div>
        </motion.a>

        {/* GRID PROJECTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <motion.a
              key={project.title}
              href={project.href}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="
                group relative aspect-[16/10]
                overflow-hidden
                bg-neutral-100 dark:bg-neutral-900
                block
              "
            >
              <motion.img
                src={project.imgSrc}
                alt={project.title}
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.06 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />

              <motion.div
                variants={{
                  rest: { opacity: 0.15 },
                  hover: { opacity: 0.35 },
                }}
                className="absolute inset-0 bg-black"
              />

              <motion.div
                variants={{
                  rest: { opacity: 0, y: 8 },
                  hover: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="
                  absolute inset-0
                  flex flex-col items-center justify-center
                  text-white
                "
              >
                <h4 className="text-2xl font-semibold tracking-tight">
                  {project.title}
                </h4>

                <div className="mt-2 flex items-center gap-2 text-sm opacity-80">
                  View project
                  <FiArrowUpRight />
                </div>
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* MORE PROJECTS CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/farhanadil1"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              text-sm font-medium
              text-gray-700 dark:text-gray-300
              hover:text-black dark:hover:text-white
              transition-colors
            "
          >
            View more projects on GitHub
            <FiArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
