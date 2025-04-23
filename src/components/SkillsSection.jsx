import { motion } from 'framer-motion';
import {
  FaReact, FaJsSquare, FaNodeJs, FaPython, FaJava, FaCuttlefish,
  FaGitAlt, FaGithub
} from 'react-icons/fa';
import {
  SiTailwindcss, SiMongodb, SiPostgresql, SiHtml5, SiCss3, SiSpringboot,
  SiMysql, SiExpress, SiFigma, SiRedhat
} from 'react-icons/si';
import { TbBrandCpp } from 'react-icons/tb';

const skills = [
  { icon: <FaReact size={28} />, label: 'React', bgColor: 'text-teal-500' },
  { icon: <FaJsSquare size={28} />, label: 'JavaScript', bgColor: 'text-yellow-500' },
  { icon: <FaNodeJs size={28} />, label: 'Node.js', bgColor: 'text-green-500' },
  { icon: <FaPython size={28} />, label: 'Python', bgColor: 'text-blue-500' },
  { icon: <FaJava size={28} />, label: 'Java', bgColor: 'text-red-500' },
  { icon: <SiSpringboot size={28} />, label: 'Spring Boot', bgColor: 'text-green-400' },
  { icon: <SiTailwindcss size={28} />, label: 'Tailwind', bgColor: 'text-sky-400' },
  { icon: <SiMongodb size={28} />, label: 'MongoDB', bgColor: 'text-green-700' },
  { icon: <SiMysql size={28} />, label: 'MySQL', bgColor: 'text-blue-600' },
  { icon: <SiExpress size={28} />, label: 'Express', bgColor: 'text-gray-700' },
  { icon: <SiHtml5 size={28} />, label: 'HTML5', bgColor: 'text-orange-500' },
  { icon: <SiCss3 size={28} />, label: 'CSS3', bgColor: 'text-blue-600' },
  { icon: <SiFigma size={28} />, label: 'Figma', bgColor: 'text-purple-500' },
  { icon: <FaCuttlefish size={28} />, label: 'C', bgColor: 'text-blue-500' },
  { icon: <TbBrandCpp size={28} />, label: 'C++', bgColor: 'text-blue-800' },
  { icon: <FaGitAlt size={28} />, label: 'Git', bgColor: 'text-orange-600' },
  { icon: <FaGithub size={28} />, label: 'GitHub', bgColor: 'text-black dark:text-white' },
  { icon: <SiRedhat size={28} />, label: 'Red Hat', bgColor: 'text-red-600' },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 bg-gradient-to-b from-teal-50 to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <motion.h2
        className="text-3xl font-semibold mb-10 text-center text-teal-600 dark:text-teal-400"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Skills
      </motion.h2>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 px-2">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center"
            initial={{ y: 0 }}
            animate={{ y: [0, -6, 0] }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: Math.random() * 2.5 + 2,
              ease: 'easeInOut'
            }}
          >
            <div className={`p-3 rounded-full shadow ${skill.bgColor} bg-white dark:bg-gray-900`}>
              {skill.icon}
            </div>
            <p className="mt-1 text-xs font-semibold text-gray-800 dark:text-gray-200">{skill.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
