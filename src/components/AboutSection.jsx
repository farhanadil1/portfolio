import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-20 bg-gradient-to-b from-white via-teal-50 to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500"
    >
      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-teal-500 to-teal-300 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      {/* Card Container */}
      <motion.div
        className="relative max-w-4xl mx-auto bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-3xl p-8 md:p-12 shadow-[8px_8px_20px_rgba(0,0,0,0.1),_-4px_-4px_12px_rgba(255,255,255,0.2)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.6),_-2px_-2px_6px_rgba(255,255,255,0.05)] transition-all duration-500"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        
        {/* Content */}
        <div className="space-y-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed text-justify">
        <p>
  I'm <span className="font-semibold text-teal-600 dark:text-teal-400">Md Adil Farhan</span>, a full stack developer with a good command over the Java Full Stack and MERN stack technologies. I enjoy building web apps that are clean, scalable, and user focused.
</p>
<p>
  I specialize in crafting responsive UIs and writing maintainable backend logic. My approach blends performance, usability, and sleek design to deliver quality digital experiences.
</p>
<p>
  I'm currently pursuing a B.Tech in Computer Science at <strong className="text-teal-700 dark:text-teal-300">MCKV Institute of Engineering</strong>. I'm committed to continuous learning and keeping up with modern development practices.
</p>
<p>
  Outside of tech, I enjoy UI/UX design, motion effects, and analyzing football tactics. I’m also passionate about fitness and love exploring different cuisines. I’m always eager to grow through meaningful projects and collaboration.
</p>



        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
