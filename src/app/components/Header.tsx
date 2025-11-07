"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-slate-200 bg-white/95 backdrop-blur shadow-sm"
          : "border-transparent bg-white/80"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white">
            <div className="flex h-full w-full items-center justify-center text-xs font-semibold">NK</div>
          </div>
          <Link className="text-sm font-semibold uppercase tracking-widest text-slate-900" href="/">
            &lt;Noman Khaliq /&gt;
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
          {["about", "work", "testimonials", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="group relative capitalize transition-colors duration-200 hover:text-slate-900"
            >
              <span>{section}</span>
              <span className="absolute inset-x-0 -bottom-2 h-0.5 scale-x-0 bg-slate-900/70 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="rounded-full border border-slate-300/70 p-2 text-slate-700 transition hover:border-slate-500 hover:bg-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 md:hidden ${
          isMenuOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4 text-sm font-medium text-slate-600">
          {["home", "about", "work", "testimonials", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="flex w-full items-center rounded-lg px-3 py-2 capitalize transition hover:bg-slate-100"
            >
              {section}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
