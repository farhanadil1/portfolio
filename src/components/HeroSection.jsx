import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function HeroSection() {
  const linkedinURL = "https://www.linkedin.com/in/md-adil-farhan-b4956424a/";
  const githubURL = "https://github.com/farhanadil1";
  const emailURL = "mailto:imfarhan574@gmail.com";
  const resumeURL = "/farhanadil_cv.pdf";

  return (
    <section
      id="home"
      className="
        relative min-h-screen flex flex-col md:flex-row items-center justify-center 
        px-6 md:px-20 pt-28 md:pt-16 md:py-0 py-10 gap-12
        bg-gradient-to-b from-white to-gray-100 
        dark:from-gray-900 dark:to-black
        transition-all duration-500 
      "
    >

      {/* Soft Background Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5 }}
          className="absolute top-10 left-10 w-64 h-64 bg-teal-400/20 blur-[120px] rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/20 blur-[150px] rounded-full"
        />
      </div>

      {/* Avatar Video (Floating Hologram Look) */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        className="
          relative rounded-full w-44 h-44 sm:w-56 sm:h-56 md:w-80 md:h-80 
          overflow-hidden shadow-2xl 
          ring-4 ring-white dark:ring-gray-700 ring-offset-2
        "
      >
        {/* Hologram Glow Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="
            absolute inset-0 rounded-full 
            bg-gradient-to-tr from-teal-400/40 via-transparent to-purple-500/40
            pointer-events-none
          "
        />

        {/* Avatar Video */}
        <video
          src="/a_converted.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="object-cover object-[50%_20%] w-full h-full"
        />
      </motion.div>

      {/* Right Side Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="text-center md:text-left max-w-2xl"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Hi, I’m{" "}
          <span className="text-teal-600 dark:text-teal-300">
            Md Adil Farhan
          </span>
        </motion.h1>

        <motion.p
          className="mt-3 text-lg text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Full Stack Developer crafting elegant, high-performance apps with
          <span className="font-semibold text-teal-700 dark:text-teal-300">
            {" "}
            MERN & Java.
          </span>
        </motion.p>

        <motion.p
          className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          B.Tech CSE @ MCKVIE | React, Spring Boot, Hibernate, MySQL, Node.js, Express,
          MongoDB. I build functional and beautiful digital experiences.
        </motion.p>

        {/* Resume Button */}
        <motion.a
          href={resumeURL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="
            inline-block mt-6 px-6 py-3 rounded-full font-semibold shadow-lg
            bg-teal-600 text-white dark:bg-teal-300 dark:text-gray-900 
            hover:shadow-xl hover:bg-teal-500 dark:hover:bg-teal-200
            transition-all
          "
        >
          Download Resume
        </motion.a>

        {/* Social Icons */}
        <motion.div
          className="flex justify-center md:justify-start mt-8 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {[
            { icon: <FaLinkedin size={32} />, url: linkedinURL },
            { icon: <FaGithub size={32} />, url: githubURL },
            { icon: <FaEnvelope size={32} />, url: emailURL },
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-500 dark:text-gray-300 hover:text-teal-500 transition"
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
