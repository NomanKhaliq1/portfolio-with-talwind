"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
      setIsScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerClasses = isScrolled
    ? "border-white/10 bg-slate-950/70 shadow-lg shadow-slate-950/20"
    : "border-white/5 bg-slate-950/40";

  return (
    <header className="fixed top-0 z-50 w-full">
      <div
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border px-4 transition-all duration-300 sm:px-6 lg:px-8 ${containerClasses}`}
      >
        <div className="flex items-center gap-3 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 text-xs font-semibold uppercase">
            nk
          </div>
          <Link className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80" href="/">
            NOMAN KHALIQ
          </Link>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/60 md:flex">
          {["about", "work", "testimonials", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="group relative transition hover:text-white"
            >
              <span className="capitalize">{section}</span>
              <span className="absolute inset-x-0 -bottom-2 h-px origin-left scale-x-0 bg-gradient-to-r from-emerald-400 to-sky-400 transition-transform duration-300 ease-out group-hover:scale-x-100 md:group" />
            </button>
          ))}
        </nav>

        <div className="md:hidden">
          <button
            className="rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:border-white/40 hover:bg-white/20"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`mx-auto mt-2 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 text-white transition-[max-height,opacity] duration-300 md:hidden ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4 text-sm font-medium text-white/70">
          {["home", "about", "work", "testimonials", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="flex w-full items-center rounded-xl px-3 py-2 capitalize transition hover:bg-white/10"
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
