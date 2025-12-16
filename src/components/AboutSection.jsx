import { motion, useScroll, useTransform } from "framer-motion";
import devImage from "/pp.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const AboutSection = () => {
  const { scrollYProgress } = useScroll();

  const floatY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const floatRotate = useTransform(scrollYProgress, [0, 1], ["0deg", "6deg"]);
  const textBlur = useTransform(scrollYProgress, [0, 0.25], ["6px", "0px"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);

  return (
    <section
      id="about"
      className="
        relative py-24 px-6 md:px-20
        bg-gradient-to-b from-white via-gray-50 to-white
        dark:from-gray-950 dark:via-black dark:to-gray-950
        overflow-hidden
      "
    >
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 -z-10 opacity-[0.05]">
        <motion.div
          animate={{ y: [0, -60, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="
            w-full h-full
            bg-[linear-gradient(90deg,transparent_96%,rgba(0,0,0,0.4)_96%),linear-gradient(transparent_96%,rgba(0,0,0,0.4)_96%)]
            dark:bg-[linear-gradient(90deg,transparent_96%,rgba(255,255,255,0.25)_96%),linear-gradient(transparent_96%,rgba(255,255,255,0.25)_96%)]
            bg-[size:48px_48px]
          "
        />
      </div>

      {/* AMBIENT BLOBS */}
      <div className="absolute top-24 left-16 w-72 h-72 bg-teal-400/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-24 right-16 w-80 h-80 bg-purple-500/20 blur-[160px] rounded-full" />

      {/* HEADING */}
      <motion.h2
        className="
          text-4xl md:text-5xl font-bold text-center mb-16
          bg-gradient-to-r from-teal-400 via-teal-200 to-purple-200
          bg-[length:200%_200%]
          bg-clip-text text-transparent
        "
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        About Me
      </motion.h2>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* AVATAR CARD */}
        <motion.div
          style={{ y: floatY, rotate: floatRotate }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 180 }}
          className="
            relative mx-auto
            w-64 md:w-80
            rounded-3xl
            bg-white/10 dark:bg-white/5
            backdrop-blur-xl
            border border-white/20
            shadow-[0_0_80px_-20px_rgba(45,212,191,0.6)]
          "
        >
          {/* Neon border */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-teal-400/40 via-purple-500/30 to-pink-500/40 blur-md -z-10" />

          <img
            src={devImage}
            alt="Md Adil Farhan"
            className="rounded-3xl w-full h-auto"
            draggable={false}
          />
        </motion.div>

        {/* TEXT */}
        <motion.div
          style={{ filter: textBlur, opacity: textOpacity }}
          className="
            text-gray-700 dark:text-gray-300
            text-lg md:text-xl
            leading-relaxed space-y-7
          "
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.p variants={fadeUp}>
            I’m{" "}
            <span className="text-teal-500 font-semibold">
              Md Adil Farhan
            </span>
            , a full-stack developer passionate about crafting smooth,
            futuristic digital experiences.
          </motion.p>

          <motion.p variants={fadeUp}>
            I specialize in building clean, high-performance UIs and scalable
            backend systems that feel predictable and robust.
          </motion.p>

          <motion.p variants={fadeUp}>
            Currently pursuing B.Tech CSE at{" "}
            <span className="text-teal-400">MCKVIE</span>, constantly exploring
            better ways to engineer and design products.
          </motion.p>

          <motion.p variants={fadeUp}>
            Outside of coding, I explore UI motion design, fitness science,
            football tactics, and the psychology of great user experiences.
          </motion.p>

          {/* TECH STACK */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-3 pt-4"
          >
            {[
              "React",
              "Tailwind",
              "Node.js",
              "Spring Boot",
              "MongoDB",
              "Hibernate",
              "MySQL",
              "Express",
              "JavaScript",
              "Java"
            ].map((tech) => (
              <span
                key={tech}
                className="
                  px-4 py-1.5 rounded-full text-sm font-medium
                  bg-white/10 dark:bg-white/5
                  border border-white/20
                  backdrop-blur-md
                  text-teal-500
                "
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
