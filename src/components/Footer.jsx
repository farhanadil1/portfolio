import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return ( 
    <footer
      className="
        py-12 
        bg-gradient-to-b from-white to-gray-100
        dark:from-gray-900 dark:to-black
        text-white
      "
    >
      <div className="max-w-screen-xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          
          {/* Name + Subtitle */}
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h3
              className="
                text-2xl font-semibold 
                bg-gradient-to-r from-teal-600 to-cyan-500
                bg-clip-text text-transparent
              "
            >
              Md Adil Farhan
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Web Developer | Programmer | Technology Enthusiast
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6 justify-center sm:justify-end mb-6 sm:mb-0">
            <a
              href="https://www.linkedin.com/in/md-adil-farhan-b4956424a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-300"
            >
              <FaLinkedin size={24} />
            </a>

            <a
              href="https://github.com/farhanadil1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-300"
            >
              <FaGithub size={24} />
            </a>

            <a
              href="https://www.instagram.com/farhanadil_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-300"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-500">
            &copy; 2025 Md Adil Farhan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
