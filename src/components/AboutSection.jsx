import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "/pp.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const curveRef = useRef(null);
  const resumeURL = "/farhanadil_cv.pdf";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // text reveal
      gsap.from(".about-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // curve draw
      gsap.fromTo(
        curveRef.current,
        { strokeDashoffset: 1200 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      const isDark =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      gsap.fromTo(
        sectionRef.current,
        {
          backgroundColor: isDark ? "#1E1E1E" : "#ffffff",
        },
        {
          backgroundColor: "#1E1E1E",
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        relative py-24 sm:py-28 px-6 md:px-20
        text-white
        overflow-hidden
      "
    >
      {/* Curved divider */}
      <svg
        className="absolute inset-x-0 bottom-24 w-full h-64 pointer-events-none"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <path
          ref={curveRef}
          d="M0,100 C300,160 900,40 1200,100"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="3"
          strokeDasharray="1200"
          strokeDashoffset="1200"
        />
      </svg>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
        {/* LEFT COLUMN */}
        <div className="md:col-span-2 space-y-10">
          <div className="about-reveal">
            <span className="text-sm tracking-[0.2em] text-gray-500">
              ABOUT ME
            </span>
          </div>

          <div className="about-reveal space-y-2">
            <p className="text-sm text-white/60 tracking-wide">Md</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Adil Farhan
            </h2>
          </div>

          <div className="about-reveal max-w-xl text-white/70 leading-relaxed space-y-4">
            <p>
              B.Tech CSE student based in India, focused on building
              calm, scalable, and well-engineered digital systems.
            </p>
            <p>
              I enjoy working at the intersection of frontend motion,
              backend architecture, and product design thinking.
            </p>
          </div>

          <div className="about-reveal grid grid-cols-2 gap-10 text-sm text-white/60">
            <div>
              <p className="mb-2 text-white/40">Experience</p>
              <p>Frontend Development</p>
              <p>Full Stack Projects</p>
              <p>UI Motion Design</p>
            </div>

            <div>
              <p className="mb-2 text-white/40">Interests</p>
              <p>Product Engineering</p>
              <p>Motion Systems</p>
              <p>Design Psychology</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="about-reveal flex justify-center md:justify-end">
          <div className="relative w-60 md:w-72">
            <img
              src={profileImg}
              alt="Md Adil Farhan"
              className="w-full grayscale contrast-110"
              draggable={false}
            />
            <a 
              href={resumeURL}
              target="_blank"
              rel="noopener noreferrer"
            >
            <p className="mt-4 text-xs text-teal-500 tracking-widest text-end">[ RESUME ]</p>
              
            </a>
            <p className="mt-2 text-xs text-white/40 tracking-widest text-end">
              [ INDIA ]
            </p>
            <p className="mt-2 text-xs text-white/40 tracking-widest text-end">
              [ COMPUTER SCIENCE ]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
