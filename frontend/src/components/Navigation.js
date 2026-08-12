import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["hero", "about", "experience", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const getNavItemClass = (sectionId) => {
    const isActive = activeSection === sectionId;
    return isActive
      ? "text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1 transition-all duration-300"
      : "text-gray-300 hover:text-white transition-all duration-300";
  };

  const getMobileNavItemClass = (sectionId) => {
    const isActive = activeSection === sectionId;
    return isActive
      ? "block w-full text-left px-3 py-2 text-cyan-400 font-bold bg-gray-700/60 border-l-4 border-cyan-400 transition-all"
      : "block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/40 transition-all";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-white hover:text-cyan-400 transition-colors"
          >
            <img
              src="/favicon.svg"
              alt="Portfolio logo"
              className="w-8 h-8"
            />
            Portfolio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className={getNavItemClass("hero")}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={getNavItemClass("about")}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className={getNavItemClass("experience")}
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={getNavItemClass("projects")}
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className={getNavItemClass("skills")}
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={getNavItemClass("contact")}
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection("hero")}
                className={getMobileNavItemClass("hero")}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={getMobileNavItemClass("about")}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className={getMobileNavItemClass("experience")}
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className={getMobileNavItemClass("projects")}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className={getMobileNavItemClass("skills")}
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={getMobileNavItemClass("contact")}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
