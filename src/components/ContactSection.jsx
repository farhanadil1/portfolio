import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

const ContactSection = () => {
  const linkedinURL =
    "https://www.linkedin.com/in/md-adil-farhan-b4956424a/";
  const email = "imfarhan574@gmail.com";

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section
      id="contact"
      className="
        py-20 
        bg-gradient-to-b from-white to-gray-100
        dark:from-gray-900 dark:to-black
        transition-colors duration-500
      "
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          className="relative mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Get in Touch
          </h2>
          <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="
            bg-white/70 dark:bg-gray-900/40 
            backdrop-blur-xl 
            rounded-xl shadow-lg p-6
            border border-gray-200/40 dark:border-gray-700
          "
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -3, transition: { duration: 0.3 } }}
        >
          <motion.p
            className="
              text-base text-gray-600 dark:text-gray-300 
              text-center mb-6 leading-relaxed
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Excited to connect! Reach out via email or LinkedIn.
          </motion.p>

          <div className="flex flex-col space-y-4 items-center">
            {/* Email Button */}
            <motion.a
              href={`mailto:${email}`}
              className="
                relative w-full md:w-2/3 group overflow-hidden 
                rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 
                text-white font-medium py-3 px-6 flex items-center 
                justify-center text-base shadow-sm
              "
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaEnvelope className="mr-2" size={20} />
              Send Email
              <span className="absolute inset-0 bg-teal-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.a>

            {/* LinkedIn Button */}
            <motion.a
              href={linkedinURL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative w-full md:w-2/3 group overflow-hidden 
                rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 
                text-white font-medium py-3 px-6 flex items-center 
                justify-center text-base shadow-sm
              "
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaLinkedin className="mr-2" size={20} />
              Connect on LinkedIn
              <span className="absolute inset-0 bg-blue-800 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
