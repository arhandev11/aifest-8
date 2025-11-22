import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-4 sm:py-5 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <motion.a
          href="#home"
          className="block transition-transform duration-200 hover:scale-105 flex-shrink-0"
          whileHover={{ rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src="/assets/logo.png"
            alt="Aisyah Festival Logo"
            className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] object-contain"
          />
        </motion.a>

        {/* Navigation */}
        <nav className="bg-festival-cream rounded-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
          <ul className="flex items-center gap-3 sm:gap-5 lg:gap-8">
            <li>
              <a
                href="#home"
                className="font-inter font-medium text-[14px] sm:text-[15px] lg:text-[16px] text-gray-800 hover:text-festival-gold transition-all duration-200 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-800"></span>
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="font-inter font-medium text-[14px] sm:text-[15px] lg:text-[16px] text-gray-800 hover:text-festival-gold transition-all duration-200 relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-festival-gold transition-all duration-200 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
