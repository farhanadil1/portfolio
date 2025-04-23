import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import myPhoto from '../assets/pp.jpg';

const HeroSection = () => {
  const linkedinURL = 'https://www.linkedin.com/in/md-adil-farhan-b4956424a/';
  const githubURL = 'https://github.com/farhanadil1'; 
  const emailURL = 'mailto:imfarhan574@gmail.com'; 
  const resumeURL = '/MdAdilFarhan_CV.pdf';

  return (
    <section
      id="home"
      className="min-h-screen pt-24 md:pt-16 flex flex-col md:flex-row items-center justify-center gap-10 px-4 sm:px-6 md:px-20 
                 bg-gradient-to-br from-teal-200 via-teal-200 to-teal-500 
                 dark:from-teal-500/40 dark:to-gray-900/80 
                 backdrop-blur-2xl 
                 text-gray-900 dark:text-white transition-colors duration-500"
    >
      {/* Left - Profile Image */}
      <motion.div
        className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-teal-500 shadow-xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={myPhoto}
          alt="Md Adil Farhan"
          className="object-cover w-full h-full"
        />
      </motion.div>

      {/* Right - Content */}
      <motion.div
        className="text-center md:text-left max-w-xl"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          Hi, I'm <span className="text-teal-700 dark:text-teal-300">Md Adil Farhan</span>
        </h1>
        <p className="text-base md:text-lg text-gray-800 dark:text-teal-100 mb-4">
          A passionate <strong className="text-teal-900 dark:text-white">Full Stack Developer</strong> building modern, responsive web apps with MERN and beyond.
        </p>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
          Pursuing B.Tech in CSE at MCKVIE. Skilled in JavaScript, React, Node.js, MongoDB, and Tailwind CSS. I craft beautiful UIs with great UX.
        </p>

        {/* Resume Button */}
        <a
          href={resumeURL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-5 py-2.5 bg-white dark:bg-teal-300 text-teal-700 dark:text-teal-900 font-semibold rounded-full shadow-md hover:scale-105 transition-all duration-300 mb-8"
        >
          Resume
        </a>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-start space-x-6">
          <a
            href={linkedinURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-500 transition-colors duration-300"
          >
            <FaLinkedin size={30} />
          </a>
          <a
            href={githubURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-500 transition-colors duration-300"
          >
            <FaGithub size={30} />
          </a>
          <a
            href={emailURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-500 transition-colors duration-300"
          >
            <FaEnvelope size={30} />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;