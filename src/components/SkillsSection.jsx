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
  { icon: <FaReact size={28} />, label: "React", color: "text-teal-500" },
  { icon: <FaJsSquare size={28} />, label: "JavaScript", color: "text-yellow-500" },
  { icon: <FaNodeJs size={28} />, label: "Node.js", color: "text-green-500" },
  { icon: <FaPython size={28} />, label: "Python", color: "text-blue-500" },
  { icon: <FaJava size={28} />, label: "Java", color: "text-red-500" },
  { icon: <SiSpringboot size={28} />, label: "Spring Boot", color: "text-green-400" },
  { icon: <SiTailwindcss size={28} />, label: "Tailwind", color: "text-sky-400" },
  { icon: <SiMongodb size={28} />, label: "MongoDB", color: "text-green-700" },
  { icon: <SiMysql size={28} />, label: "MySQL", color: "text-blue-600" },
  { icon: <SiExpress size={28} />, label: "Express", color: "text-gray-700" },
  { icon: <SiHtml5 size={28} />, label: "HTML5", color: "text-orange-500" },
  { icon: <SiCss3 size={28} />, label: "CSS3", color: "text-blue-600" },
  { icon: <SiFigma size={28} />, label: "Figma", color: "text-purple-500" },
  { icon: <FaCuttlefish size={28} />, label: "C", color: "text-blue-500" },
  { icon: <TbBrandCpp size={28} />, label: "C++", color: "text-blue-800" },
  { icon: <FaGitAlt size={28} />, label: "Git", color: "text-orange-600" },
  { icon: <FaGithub size={28} />, label: "GitHub", color: "text-black dark:text-white" },
  { icon: <SiRedhat size={28} />, label: "Red Hat", color: "text-red-600" },
];

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="
        py-20 relative overflow-hidden
        bg-gradient-to-b from-white to-gray-100
        dark:from-gray-900 dark:to-black
      "
    >
      {/* Background Accents */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-12 right-16 w-72 h-72 bg-teal-400/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-12 left-16 w-80 h-80 bg-purple-500/20 blur-[130px] rounded-full" />
      </div>

      {/* Heading (no fade) */}
      <h2
        className="
          text-4xl font-bold text-center mb-14
          bg-gradient-to-r from-teal-600 to-cyan-500
          bg-clip-text text-transparent
        "
      >
       Tech Skills
      </h2>

      {/* Skills Grid */}
      <div
        className="
          max-w-6xl mx-auto px-6
          grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6
        "
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.12,
              y: -6,
              transition: { duration: 0.2 },
            }}
            className="
              flex flex-col items-center p-4 rounded-xl
              backdrop-blur-lg
              bg-white/60 dark:bg-gray-900/40
              border border-gray-200/40 dark:border-gray-700
              shadow-sm hover:shadow-xl
              hover:border-teal-500/50 dark:hover:border-teal-400/50
              transition cursor-pointer
            "
          >
            {/* Icon circle */}
            <motion.div
              whileHover={{ rotate: 6 }}
              className={`
                p-3 rounded-full bg-white dark:bg-gray-900 shadow 
                ${skill.color}
              `}
            >
              {skill.icon}
            </motion.div>

            <p className="mt-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
              {skill.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
