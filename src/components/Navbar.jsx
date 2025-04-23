import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const sections = ["Home", "About", "Projects", "Skills", "Contact"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // Trigger when 60% of the section is in view
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.toLowerCase());
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.toLowerCase());
        if (element) observer.unobserve(element);
      });
    };
  }, [sections]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-lg border-b-2 border-gray-100 dark:border-gray-700 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full" />

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-3 rounded-full text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-transform duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navbar links */}
        <ul className={`flex gap-6 text-lg font-medium items-center md:flex ${isMenuOpen ? 'flex-col absolute bg-white dark:bg-gray-900 w-full top-full left-0 py-4 shadow-xl md:static' : 'hidden md:flex'}`}>
          {sections.map((section) => (
            <li key={section}>
              <a
                href={`#${section.toLowerCase()}`}
                className={`relative text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-all duration-300 py-2 ${
                  activeSection === section.toLowerCase() ? 'text-teal-500 dark:text-teal-400' : ''
                }`}
              >
                {section}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-teal-500 transform origin-bottom-right transition-all duration-300 ${
                    activeSection === section.toLowerCase() ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                  }`}
                ></span>
              </a>
            </li>
          ))}

          {/* Theme toggle button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-6 p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-transform duration-300 shadow-md"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} color="#F1C40F" /> : <Moon size={20} color="#BDC3C7" />}
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;