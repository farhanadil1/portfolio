import { motion, useScroll, useTransform } from "framer-motion";
import devImage from "/pp.jpeg"; // add illustration of your choice

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } }
};

const AboutSection = () => {
  const { scrollYProgress } = useScroll();

  // subtle parallax floating for the illustration
  const floatY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const floatRotate = useTransform(scrollYProgress, [0, 1], ["0deg", "6deg"]);

  return (
    <section
      id="about"
      className="
        relative py-32 px-6 md:px-20
        bg-gradient-to-b from-white to-gray-50
        dark:from-gray-900 dark:to-black
        overflow-hidden
      "
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-10 opacity-[0.06] pointer-events-none">
        <motion.div
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="
            w-full h-full 
            bg-[linear-gradient(90deg,transparent_95%,rgba(0,0,0,0.4)_95%),linear-gradient(transparent_95%,rgba(0,0,0,0.4)_95%)]
            dark:bg-[linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.2)_95%),linear-gradient(transparent_95%,rgba(255,255,255,0.2)_95%)]
            bg-[size:50px_50px]
          "
        />
      </div>

      {/* Soft ambient blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="absolute top-20 left-12 w-72 h-72 bg-teal-400/20 blur-[140px] rounded-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6 }}
        className="absolute bottom-24 right-12 w-80 h-80 bg-purple-500/20 blur-[150px] rounded-full"
      />

      {/* Section Heading */}
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-center mb-20
        bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-200 dark:to-gray-400
        bg-clip-text text-transparent"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      {/* Two-column layout */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* Floating Illustration */}
        <motion.div
          style={{ y: floatY, rotate: floatRotate }}
          className="w-64 md:w-80 opacity-90"
        >
          <img
            src={devImage}
            alt="Developer Illustration"
            className="w-full h-auto drop-shadow-xl cursor-pointer"
            draggable='false'
          />
        </motion.div>

        {/* Animated Text */}
        <motion.div
          className="text-gray-700 dark:text-gray-300 
          text-lg md:text-xl space-y-7 leading-relaxed max-w-2xl"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.p variants={fadeUp}>
            I’m <span className="text-teal-600 dark:text-teal-400 font-semibold">Md Adil Farhan</span>, a full-stack developer who loves crafting smooth, modern digital experiences.
          </motion.p>

          <motion.p variants={fadeUp}>
            I focus on building fast, clean UIs and writing backend logic that feels predictable and scalable.
          </motion.p>

          <motion.p variants={fadeUp}>
            Currently pursuing B.Tech CSE at 
            <span className="text-teal-600 dark:text-teal-400"> MCKVIE</span>, always exploring better ways to build and design.
          </motion.p>

          <motion.p variants={fadeUp}>
            Outside of coding, I dive into UI/UX motion, fitness, football tactics, and the science of good food.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
