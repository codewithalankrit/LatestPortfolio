import React, { useEffect, useRef, useState } from "react";
import { mockSkills } from "../utils/mockData";

const SkillBar = ({ skill, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={barRef}
      className={`bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-cyan-400 transition-all duration-500 transform hover:scale-105 opacity-0 translate-y-10 ${
        isVisible ? "animate-slide-up" : ""
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{skill.icon}</span>
          <span className="font-semibold text-white">{skill.name}</span>
        </div>
        <span className="text-cyan-400 font-bold">{skill.level}%</span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-cyan-400 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${skill.level}%` : "0%",
            transitionDelay: `${index * 100}ms`,
          }}
        ></div>
      </div>
    </div>
  );
};

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
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Split mockSkills into tools and toolsOthers
  const tools =
    mockSkills.find((cat) => cat.category === "Frontend")?.skills || [];
  const toolsOthers =
    mockSkills.find((cat) => cat.category === "Tools & Others")?.skills || [];

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div
          ref={titleRef}
          className="text-center mb-16 opacity-0 translate-y-10 transition-all duration-1000"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              My Skills
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Here's what I bring to the table - a diverse set of technical skills
            and expertise
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch">
          {/* Software & Tools Card */}
          <div className="bg-gray-800/50 rounded-2xl shadow-lg p-8 flex-1 min-w-[320px] max-w-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 tracking-wide text-white">
              SKILLS
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col items-center bg-gray-900/40 rounded-xl p-4 shadow-sm transition-transform duration-300 transform hover:scale-105 hover:border hover:border-cyan-400 hover:shadow-lg cursor-pointer"
                >
                  {tool.icon && tool.icon.startsWith("http") ? (
                    <img
                      src={tool.icon}
                      alt={tool.name}
                      className={`w-10 h-10 mb-2${
                        ["Three.js", "Shadcn UI", "Photoshop"].includes(
                          tool.name
                        )
                          ? " filter invert"
                          : ""
                      }`}
                    />
                  ) : (
                    <span className="text-4xl mb-2">{tool.icon}</span>
                  )}
                  <span className="font-semibold text-white text-center text-sm tracking-wide mt-2">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expertise Areas Card (now Tools & Others) */}
          <div className="bg-gray-800/50 rounded-2xl shadow-lg p-8 flex-1 min-w-[260px] max-w-sm border border-gray-700 flex flex-col">
            <h3 className="text-2xl font-bold mb-4 tracking-wide text-white">
              TOOLS & OTHERS
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mb-8"></div>
            <div className="flex flex-col gap-4 flex-1 justify-center">
              {toolsOthers.map((tool) => (
                <div
                  key={tool.name}
                  className="bg-gray-900/40 rounded-xl py-4 px-2 flex flex-col items-center text-center font-semibold text-white text-base tracking-wide shadow-sm transition-transform duration-300 transform hover:scale-105 hover:border hover:border-cyan-400 hover:shadow-lg cursor-pointer"
                >
                  {tool.icon && tool.icon.startsWith("http") ? (
                    <img
                      src={tool.icon}
                      alt={tool.name}
                      className={`w-8 h-8 mb-2${
                        ["Three.js", "Shadcn UI", "Photoshop"].includes(
                          tool.name
                        )
                          ? " filter invert"
                          : ""
                      }`}
                    />
                  ) : (
                    <span className="text-3xl mb-2">{tool.icon}</span>
                  )}
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Keep the floating 3D elements and background as is */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg transform rotate-45 hover:rotate-90 transition-transform duration-500 animate-pulse opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full transform hover:scale-125 transition-transform duration-500 animate-bounce opacity-20"></div>
      <div className="absolute top-1/2 right-20 w-8 h-8 bg-gradient-to-br from-green-400 to-teal-600 rounded-full transform hover:scale-150 transition-transform duration-500 animate-ping opacity-20"></div>
    </section>
  );
};

export default Skills;
