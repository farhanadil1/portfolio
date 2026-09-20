import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";
import { projects } from "../data/projects";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects[slug];

  if (!project) {
    return <div className="p-20">Project not found</div>;
  }

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white">
      {/* HERO */}
      <section className="px-6 md:px-20 pt-8">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white"
          >
            <FiArrowLeft /> Back to projects
          </Link>

          <h1 className="mt-8 text-4xl md:text-5xl font-semibold tracking-tight">
            {project.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="mt-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden">
          <img
            src={project.hero}
            alt={project.title}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 md:px-20 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <p className="text-sm tracking-[0.2em] text-gray-500 mb-4">
                OVERVIEW
              </p>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {project.overview}
              </p>
            </div>

            <div>
              <p className="text-sm tracking-[0.2em] text-gray-500 mb-4">
                HIGHLIGHTS
              </p>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 bg-teal-500 rounded-full" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* GALLERY */}
            <div className="space-y-6">
              {project.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="rounded-xl"
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-10">
            <div>
              <p className="text-sm tracking-[0.2em] text-gray-500 mb-4">
                TECH STACK
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs rounded-full bg-black/5 dark:bg-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <a
                href={project.live}
                target="_blank"
                className="flex justify-between items-center px-6 py-4 rounded-full bg-teal-500 text-black"
              >
                Live demo <FiExternalLink />
              </a>

              <a
                href={project.github}
                target="_blank"
                className="flex justify-between items-center px-6 py-4 rounded-full border border-gray-300 dark:border-gray-700"
              >
                View source <FiGithub />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
