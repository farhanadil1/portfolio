import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const socials = [
  {
    href: "https://www.linkedin.com/in/md-adil-farhan-b4956424a/",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/farhanadil1",
    label: "GitHub",
  },
  {
    href: "https://www.instagram.com/farhanadil_",
    label: "Instagram",
  },
];

export default function Footer() {
  const ref = useRef(null);

  /* local time */
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={ref}
      className="
        relative min-h-screen
        bg-black text-white
        overflow-hidden
      "
    >
      <div
        className="
          max-w-7xl mx-auto px-6
          min-h-screen
          flex flex-col justify-between
          pt-20 pb-12
        "
      >
        {/* TOP GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
          <div>
            <p className="mb-4 tracking-widest text-white/40">
              LINKS
            </p>
            <ul className="space-y-3">
              {["Home", "Projects", "About", "Contact"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="hover:opacity-60 transition-opacity"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 tracking-widest text-white/40">
              SOCIALS
            </p>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-60 transition-opacity"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 tracking-widest text-white/40">
              CONTACT
            </p>
            <a
              href="mailto:imfarhan574@gmail.com"
              className="hover:opacity-60 transition-opacity"
            >
              imfarhan574@gmail.com
            </a>
          </div>

          <div>
            <p className="mb-4 tracking-widest text-white/40">
              LOCAL TIME
            </p>
            <p className="text-lg">{time} IST</p>
          </div>
        </div>

        {/* MASSIVE IDENTITY / SCROLL TO TOP */}
        <motion.div
          onClick={scrollToTop}
          whileHover="hover"
          initial="rest"
          animate="rest"
          className="
            relative cursor-pointer select-none
          "
        >
          <motion.h1
            variants={{
              rest: { letterSpacing: "-0.04em" },
              hover: { letterSpacing: "0.02em" },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="
              text-[22vw] leading-none font-medium
              tracking-tight mt-4
            "
          >
            ADIL
          </motion.h1>

          {/* Desktop hover cue */}
          <motion.div
            variants={{
              rest: { opacity: 0, y: 10 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="
              hidden md:flex
              absolute right-2 bottom-6
              items-center gap-2
              text-sm text-white/50
            "
          >
            <span>Back to top</span>
            <FiArrowUpRight />
          </motion.div>

          {/* Mobile always-visible cue */}
          <div
            className="
              md:hidden
              absolute right-2 bottom-6
              flex items-center gap-2
              text-sm text-white/50
            "
          >
            <span>Back to top</span>
            <FiArrowUpRight />
          </div>
        </motion.div>

        {/* FOOT */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} Md Adil Farhan · All rights reserved
          </p>
          <p>React · Tailwind · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
