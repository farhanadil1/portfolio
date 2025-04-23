import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return ( 
    <footer className=" text-white py-12 bg-gradient-to-b from-teal-50 to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* About Section */}
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h3 className="text-2xl font-semibold text-teal-500 mb-2">Md Adil Farhan</h3>
            <p className="text-sm text-gray-400">Web Developer | Programmer | Technology Enthusiast</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6 justify-center sm:justify-end mb-6 sm:mb-0">
            <a
              href="https://www.linkedin.com/in/md-adil-farhan-b4956424a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-500 transition-colors duration-300"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com/farhanadil1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-500 transition-colors duration-300"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.instagram.com/farhanadil_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-teal-500 transition-colors duration-300"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">&copy; 2025 Md Adil Farhan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
