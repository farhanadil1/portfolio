import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";

const ContactSection = () => {
  const email = "imfarhan574@gmail.com";
  const linkedinURL =
    "https://www.linkedin.com/in/md-adil-farhan-b4956424a/";

  const [copied, setCopied] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      id="contact"
      className="
        relative py-24 overflow-hidden
        bg-gradient-to-b from-white via-gray-50 to-white
        dark:from-gray-950 dark:via-black dark:to-gray-950
      "
    >
      {/* Cursor reactive glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px,
            rgba(45,212,191,0.12),
            transparent 70%)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
            Contact
          </p>

          <h2
            className="
              text-4xl md:text-5xl font-semibold tracking-tight
              bg-gradient-to-r from-teal-500 to-cyan-400
              bg-clip-text text-transparent
            "
          >
            Let’s build something impactful
          </h2>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
            I’m open to internships, full-time roles, collaborations, and
            interesting conversations around tech & design.
          </p>

          {/* Availability indicator */}
          <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            Available for opportunities
          </div>
        </motion.div>

        {/* Actions */}
        <div className="mt-12 flex flex-col md:flex-row gap-10">
          {/* EMAIL – Primary */}
          <motion.button
            onClick={copyEmail}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="
              group relative flex items-center justify-between
              w-full md:w-[340px]
              px-8 py-3
              bg-teal-500 text-black
              rounded-full
              font-medium text-lg
              overflow-hidden
            "
          >
            <span className="flex items-center gap-4">
              <FaEnvelope />
              {copied ? "Email copied!" : "Copy my email"}
            </span>

            <span className="relative">
              {copied ? (
                <FiCheck className="text-xl" />
              ) : (
                <FiArrowUpRight
                  className="
                    text-xl
                    transition-transform duration-300
                    group-hover:translate-x-1 group-hover:-translate-y-1
                  "
                />
              )}
            </span>

            {/* Hover sheen */}
            <span
              className="
                absolute inset-0
                bg-gradient-to-r from-transparent via-white/40 to-transparent
                translate-x-[-120%] group-hover:translate-x-[120%]
                transition-transform duration-700
              "
            />
          </motion.button>

          {/* LINKEDIN – Secondary */}
          <motion.a
            href={linkedinURL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 6 }}
            className="
              group flex items-center justify-between
              w-full md:w-[380px]
              px-8 py-6
              text-gray-800 dark:text-gray-200
              border-b border-gray-300/60 dark:border-gray-700
              transition-colors duration-300
              hover:text-teal-500
            "
          >
            <span className="flex items-center gap-4">
              <FaLinkedin />
              Connect on LinkedIn
            </span>

            <FiArrowUpRight
              className="
                text-xl
                transition-transform duration-300
                group-hover:translate-x-1 group-hover:-translate-y-1
              "
            />
          </motion.a>
        </div>

        {/* Footer micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 md:mt-14 text-sm text-gray-500"
        >
          Based in India · Open to remote & on-site opportunities
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
