import { motion } from "framer-motion";
import {
  FaReact, FaJsSquare, FaNodeJs, FaPython, FaJava, FaCuttlefish,
  FaGitAlt, FaGithub
} from "react-icons/fa";
import {
  SiTailwindcss, SiMongodb, SiHtml5, SiCss3,
  SiSpringboot, SiMysql, SiExpress, SiFigma, SiRedhat
} from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";

const skills = [
  { icon: <FaReact />, label: "React" },
  { icon: <FaJsSquare />, label: "JavaScript" },
  { icon: <FaNodeJs />, label: "Node.js" },
  { icon: <FaPython />, label: "Python" },
  { icon: <FaJava />, label: "Java" },
  { icon: <SiSpringboot />, label: "Spring Boot" },
  { icon: <SiTailwindcss />, label: "Tailwind CSS" },
  { icon: <SiMongodb />, label: "MongoDB" },
  { icon: <SiMysql />, label: "MySQL" },
  { icon: <SiExpress />, label: "Express" },
  { icon: <SiHtml5 />, label: "HTML5" },
  { icon: <SiCss3 />, label: "CSS3" },
  { icon: <SiFigma />, label: "Figma" },
  { icon: <FaCuttlefish />, label: "C" },
  { icon: <TbBrandCpp />, label: "C++" },
  { icon: <FaGitAlt />, label: "Git" },
  { icon: <FaGithub />, label: "GitHub" },
  { icon: <SiRedhat />, label: "Red Hat" },
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="
        relative py-24
        bg-gradient-to-b from-white via-gray-50 to-white
        dark:from-gray-950 dark:via-black dark:to-gray-950
        overflow-hidden
      "
    >
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-teal-400/10 blur-[160px]" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-400/10 blur-[160px]" />
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <h2 className="
          text-4xl md:text-5xl font-semibold tracking-tight
          bg-gradient-to-r from-teal-500 to-cyan-400
          bg-clip-text text-transparent
        ">
          Tech Stack
        </h2>
        <p className="mt-4 max-w-xl text-gray-600 dark:text-gray-400">
          Technologies and tools I use to design, build, and scale modern applications.
        </p>
      </div>

      {/* Skills Grid */}
      <div
        className="
          max-w-6xl mx-auto px-6
          grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-14 gap-x-8
        "
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.08 }}
            className="
              group flex flex-col items-center gap-3
              transition-transform duration-300
            "
          >
            {/* Icon */}
            <div
              className="
                text-3xl text-gray-800 dark:text-gray-200
                transition-colors duration-300
                group-hover:text-teal-500
              "
            >
              {skill.icon}
            </div>

            {/* Label */}
            <span
              className="
                text-xs uppercase tracking-widest
                text-gray-500 dark:text-gray-500
                group-hover:text-teal-500 transition-colors
              "
            >
              {skill.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
