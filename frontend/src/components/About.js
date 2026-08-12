import React, { useEffect, useRef } from "react";
import { mockPersonalInfo, mockExpertise } from "../utils/mockData";

const About = () => {
  const aboutRef = useRef(null);

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

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div
          ref={aboutRef}
          className="opacity-0 translate-y-10 transition-all duration-1000"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="prose prose-lg text-gray-300 max-w-none">
              <p className="text-lg leading-relaxed">
                Hello! I'm {mockPersonalInfo.name}, a {mockPersonalInfo.title}{" "}
                based in {mockPersonalInfo.location}. {mockPersonalInfo.bio}
              </p>

              <p className="text-lg leading-relaxed">
                I blend AI-powered content creation with traditional design
                skills — from prompt engineering and AI video generation to
                wireframing, prototyping, and building responsive web
                experiences. Whether it's crafting product visuals for brands
                or designing full-stack platforms, I focus on storytelling
                and user-centered design.
              </p>

              <p className="text-lg leading-relaxed">
                Currently working as a Creative AI Designer at Silphony Pvt
                Ltd, I also mentor aspiring designers and take on freelance
                UI/UX projects for clients who need end-to-end digital
                solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {mockExpertise.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gray-800/50 text-cyan-400 rounded-full text-sm font-medium border border-gray-700 hover:border-cyan-400 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
