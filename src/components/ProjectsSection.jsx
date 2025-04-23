import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, imgSrc, githubLink, liveLink }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    {/* Image */}
    <div className="relative mb-6">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-48 object-cover rounded-lg transition-all duration-300 group-hover:scale-105"
      />
    </div>

    {/* Title and Description */}
    <h3 className="text-xl font-semibold text-teal-500 dark:text-teal-400 mb-4">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

    {/* Buttons */}
    <div className="flex items-center justify-start gap-4 mt-4">
      <a
        href={githubLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-5 py-2 bg-teal-500 text-white rounded-full text-sm hover:bg-teal-600 transition-all duration-300"
      >
        GitHub Repo
      </a>
      <a
        href={liveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-5 py-2 bg-teal-500 text-white rounded-full text-sm hover:bg-teal-600 transition-all duration-300"
      >
        Live View
      </a>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Virtual Herbal Garden',
      description: 'A web app for learning about different herbs, their benefits, and preparation methods.',
      imgSrc: 'https://picsum.photos/500/300?random=1', // Random image
      githubLink: 'https://github.com/yourusername/virtual-herbal-garden',
      liveLink: 'https://your-website.com/virtual-herbal-garden',
    },
    {
      title: 'E-commerce Website',
      description: 'A fully functional e-commerce website built with React and Hibernate for back-end.',
      imgSrc: 'https://picsum.photos/500/300?random=2', // Random image
      githubLink: 'https://github.com/yourusername/e-commerce-website',
      liveLink: 'https://your-website.com/e-commerce',
    },
    {
      title: 'Fitness Tracker App',
      description: 'An app to track workouts, nutrition, and fitness goals with real-time progress updates.',
      imgSrc: 'https://picsum.photos/500/300?random=3', // Random image
      githubLink: 'https://github.com/yourusername/fitness-tracker',
      liveLink: 'https://your-website.com/fitness-tracker',
    },
    // Add more projects here
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-teal-100 to-teal-50  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <motion.h2
        className="text-3xl font-bold text-center mb-12 text-teal-700 dark:text-teal-300"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
