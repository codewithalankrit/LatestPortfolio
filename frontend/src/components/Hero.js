import React, { useEffect, useRef } from "react";
import { mockPersonalInfo } from "../utils/mockData";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = mockPersonalInfo.resumeUrl;
    // Use the actual file name from the URL
    const fileName =
      mockPersonalInfo.resumeUrl.split("/").pop() || "resume.pdf";
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>

      <div
        ref={heroRef}
        className="relative z-10 text-center max-w-4xl mx-auto px-4 opacity-0 translate-y-10 transition-all duration-1000"
      >
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-1 mb-8 mx-auto transform hover:scale-110 transition-transform duration-300">
              <img
                src="./image.png"
                alt={mockPersonalInfo.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-gray-900 animate-pulse"></div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            {mockPersonalInfo.name}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
          {mockPersonalInfo.title}
        </p>

        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-lg text-gray-400 leading-relaxed">
            {mockPersonalInfo.bio}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() =>
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            <span className="relative z-10">Get In Touch</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          {/* Button triggers download, but also provide a fallback link for accessibility */}
          <button
            onClick={downloadResume}
            className="px-8 py-4 border-2 border-cyan-500 text-cyan-500 rounded-full font-semibold hover:bg-cyan-500 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
          >
            Download Resume
          </button>
          <a
            href={mockPersonalInfo.resumeUrl}
            download
            className="sr-only"
            aria-label="Download Resume PDF"
          >
            Download Resume
          </a>
        </div>

        <div className="flex justify-center space-x-6">
          {Object.entries(mockPersonalInfo.social).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-500 transition-all duration-300 transform hover:scale-110"
            >
              {platform === "linkedin" && "💼"}
              {platform === "github" && "🐙"}
              {platform === "dribbble" && "🏀"}
              {platform === "instagram" && "📸"}
            </a>
          ))}
        </div>
      </div>

      {/* Floating 3D Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg transform rotate-12 hover:rotate-45 transition-transform duration-500 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full transform hover:scale-125 transition-transform duration-500 animate-float-delay"></div>
      <div className="absolute top-1/2 left-20 w-8 h-8 bg-gradient-to-br from-green-400 to-teal-600 rounded-full transform hover:scale-150 transition-transform duration-500 animate-bounce"></div>
      <div className="absolute bottom-1/3 right-20 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg transform rotate-45 hover:rotate-90 transition-transform duration-500 animate-pulse"></div>
    </section>
  );
};

export default Hero;
