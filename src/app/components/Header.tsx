"use client"

import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="w-full bg-white shadow-md font-montserrat fixed top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link className="text-gray-700 uppercase font-bold" href="/">
              &lt;Noman Khaliq /&gt;
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 font-normal">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('work')}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Contact
            </button>
          </nav>

          <div className="md:hidden">
            <button 
              className="text-gray-700 hover:text-gray-900 focus:outline-none p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>


        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 font-normal">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('work')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
