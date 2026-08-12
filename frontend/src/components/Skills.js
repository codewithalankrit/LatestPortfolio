import React, { useEffect, useRef } from "react";
import { mockSkills, mockExpertise } from "../utils/mockData";

const ToolCard = ({ tool }) => (
  <div className="flex flex-col items-center bg-gray-900/40 rounded-xl p-4 shadow-sm transition-transform duration-300 transform hover:scale-105 hover:border hover:border-cyan-400 hover:shadow-lg cursor-pointer">
    {tool.icon &&
    (tool.icon.startsWith("http") || tool.icon.startsWith("/")) ? (
      <img
        src={tool.icon}
        alt={tool.name}
        className={`w-10 h-10 mb-2${
          ["Photoshop", "Illustrator"].includes(tool.name) ? " filter invert" : ""
        }`}
      />
    ) : (
      <span className="text-4xl mb-2">{tool.icon}</span>
    )}
    <span className="font-semibold text-white text-center text-sm tracking-wide mt-2">
      {tool.name}
    </span>
  </div>
);

const Skills = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div
          ref={titleRef}
          className="text-center mb-16 opacity-0 translate-y-10 transition-all duration-1000"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Skills & Tools
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A diverse set of design, AI, and development skills I bring to every
            project
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl shadow-lg p-8 border border-gray-700 mb-8">
          <h3 className="text-2xl font-bold mb-4 tracking-wide text-white">
            Core Expertise
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mb-6"></div>
          <div className="flex flex-wrap gap-3">
            {mockExpertise.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gray-900/60 text-cyan-400 rounded-full text-sm font-medium border border-gray-700 hover:border-cyan-400 transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {mockSkills.map((category) => (
            <div
              key={category.category}
              className="bg-gray-800/50 rounded-2xl shadow-lg p-8 border border-gray-700"
            >
              <h3 className="text-xl font-bold mb-4 tracking-wide text-white">
                {category.category}
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mb-6"></div>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg transform rotate-45 hover:rotate-90 transition-transform duration-500 animate-pulse opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full transform hover:scale-125 transition-transform duration-500 animate-bounce opacity-20"></div>
    </section>
  );
};

export default Skills;
