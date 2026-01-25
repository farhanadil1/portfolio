import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const email = "imfarhan574@gmail.com";
  const linkedinURL =
    "https://www.linkedin.com/in/md-adil-farhan-b4956424a/";

  const sectionRef = useRef(null);
  const ctaRef = useRef(null);
  const dotRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Section reveal */
      gsap.from(".contact-reveal", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      /* CTA emphasis (once) */
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.97 },
        {
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      /* Availability pulse (calm) */
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          opacity: 0.4,
          scale: 1.4,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        relative py-20 sm:pt-36 sm:pb-20
        bg-white text-black
        dark:bg-[#0f0f0f] dark:text-white
      "
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Intro */}
        <div className="contact-reveal max-w-2xl">
          <p className="text-sm tracking-[0.2em] text-gray-500 dark:text-gray-400 pb-4">
            CONTACT
          </p>

          <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
            Let’s build something meaningful
          </h2>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
            I’m open to internships, full-time roles, and thoughtful
            collaborations where engineering and design meet.
          </p>

          {/* Availability */}
          <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
            <span
              ref={dotRef}
              className="relative h-2 w-2 rounded-full bg-teal-500"
            />
            Available for opportunities
          </div>
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="contact-reveal mt-10 flex flex-col md:flex-row gap-6"
        >
          {/* Email */}
          <button
            onClick={copyEmail}
            className="
              group relative flex items-center justify-between
              w-full md:w-[300px]
              px-6 py-3.5
              rounded-full
              border border-black/10 dark:border-white/10
              text-base font-medium
              transition-all duration-300
              hover:border-teal-500 hover:dark:border-teal-500
            "
          >
            <span className="flex items-center gap-3">
              <FaEnvelope />
              {copied ? "Email copied" : "Start a conversation"}
            </span>

            {copied ? (
              <FiCheck className="text-lg text-teal-500" />
            ) : (
              <FiArrowUpRight className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            )}
          </button>

          {/* LinkedIn */}
          <a
            href={linkedinURL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative flex items-center justify-between
              w-full md:w-[300px]
              px-6 py-3.5
              rounded-full
              text-base font-medium
              text-gray-600 dark:text-gray-400
              border border-black/10 dark:border-white/10 dark:hover:border-white/50
              transition-colors duration-300
              hover:text-black dark:hover:text-white
            "
          >
            <span className="flex items-center gap-3">
              <FaLinkedin />
              LinkedIn
            </span>

            <FiArrowUpRight className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        {/* Footer note */}
        <p className="contact-reveal mt-20 text-sm text-gray-500">
          Based in India · Open to remote & on-site roles
        </p>
      </div>
    </section>
  );
}
