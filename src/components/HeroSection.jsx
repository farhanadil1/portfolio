import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.12,
      });

      const move = (e) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 40;
        const y = (e.clientY / innerHeight - 0.5) * 40;

        gsap.to(bgRef.current, {
          x,
          y,
          duration: 0.6,
          ease: "power3.out",
        });

        gsap.to(textRef.current, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="
        relative min-h-screen overflow-hidden
        flex items-center
        px-6 md:px-20
        bg-white text-black
        dark:bg-[#1E1E1E] dark:text-white
      "
    >
      {/* Reactive background */}
      <div
        ref={bgRef}
        className="
          absolute inset-[-20%]
          bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.18),transparent_60%)]
          dark:bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.12),transparent_65%)]
          transition-colors
        "
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-4xl space-y-6"
      >
        <p className="text-xs tracking-[0.3em] text-gray-500 dark:text-gray-400">
          FULL STACK DEVELOPER
        </p>

        <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-medium leading-none"
          ref={textRef}
        >
          MD ADIL
          <br />
          FARHAN
        </h1>

        <p className="max-w-xl text-gray-600 dark:text-gray-300 text-base">
          I design and engineer interactive web systems where motion,
          performance, and structure work together not separately.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          React · Tailwind CSS · Java · Spring Boot · Node · MongoDB
        </p>
      </div>
    </section>
  );
}
