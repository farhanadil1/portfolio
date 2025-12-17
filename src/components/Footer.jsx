import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

const socials = [
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/md-adil-farhan-b4956424a/",
    label: "LinkedIn",
  },
  {
    icon: <FaGithub />,
    href: "https://github.com/farhanadil1",
    label: "GitHub",
  },
  {
    icon: <FaInstagram />,
    href: "https://www.instagram.com/farhanadil_",
    label: "Instagram",
  },
];

const Footer = () => {
  return (
    <footer
      className="
        relative overflow-hidden
        bg-gradient-to-b from-white via-gray-50 to-white
        dark:from-gray-950 dark:via-black dark:to-gray-950
        pt-12 pb-12
      "
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[420px] h-[420px] bg-teal-400/10 blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-cyan-400/10 blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* BIG STATEMENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2
            className="
              text-4xl md:text-6xl font-semibold tracking-tight
              bg-gradient-to-r from-teal-500 via-cyan-400 to-purple-400
              bg-[length:200%_200%]
              bg-clip-text text-transparent
            "
          >
            Designed with intent. Built with care.
          </h2>

          <p className="mt-6 max-w-xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            I build thoughtful digital experiences with clean code, modern design,
            and scalable architecture.
          </p>
        </motion.div>

        {/* NAME + ROLE */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h3
              className="
                text-2xl md:text-3xl font-semibold
                bg-gradient-to-r from-teal-600 to-cyan-500
                bg-clip-text text-transparent
              "
            >
              Md Adil Farhan
            </h3>

            <p className="mt-2 text-sm tracking-wide text-gray-500 dark:text-gray-400">
              Full-Stack Developer · UI Engineer · Problem Solver
            </p>
          </div>

          {/* SOCIALS */}
          <div className="flex items-center gap-8">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="
                  group flex items-center gap-2
                  text-gray-600 dark:text-gray-300
                  hover:text-teal-500 dark:hover:text-teal-500
                  transition-colors duration-300
                "
              >
                <span className="text-xl">{s.icon}</span>
                <span className="text-sm uppercase tracking-wider hidden sm:block">
                  {s.label}
                </span>
                <FiArrowUpRight
                  className="
                    text-sm opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-300
                  "
                />
              </motion.a>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-gray-300/40 to-transparent dark:via-gray-700/40" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Md Adil Farhan · All rights reserved
          </p>

          <p className="tracking-wide">
            Built with React · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
