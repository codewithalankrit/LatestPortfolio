import React, { useEffect, useRef } from "react";
import { mockPersonalInfo } from "../utils/mockData";

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
      { threshold: 0.1 }
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

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                <img
                  src="./pp.PNG"
                  alt={mockPersonalInfo.name}
                  className="relative w-full h-96 object-cover rounded-lg shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating elements around the image */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-400 rounded-lg transform rotate-45 animate-pulse"></div>
              <div className="absolute top-1/2 -right-8 w-6 h-6 bg-purple-400 rounded-full animate-ping"></div>
            </div>

            <div className="space-y-6">
              <div className="prose prose-lg text-gray-300 max-w-none">
                <p className="text-lg leading-relaxed">
                  Hello! I'm {mockPersonalInfo.name}, a passionate{" "}
                  {mockPersonalInfo.title}, based in {mockPersonalInfo.location}
                  . I specialize in creating beautiful, functional, and
                  user-centered digital experiences.
                </p>

                <p className="text-lg leading-relaxed">
                  With expertise in modern web technologies, I enjoy solving
                  complex problems and bringing creative ideas to life through
                  code. I'm always eager to learn new technologies and push the
                  boundaries of what's possible on the web.
                </p>

                <p className="text-lg leading-relaxed">
                  When I'm not coding, you can find me exploring new design
                  trends, contributing to open-source projects, or experimenting
                  with the latest web technologies.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  "React",
                  "JavaScript",
                  "TypeScript",
                  "Figma",
                  "Photoshop",
                  "Illustrator",
                  "Wireframing",
                  "Design Systems",
                ].map((tech) => (
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
      </div>
    </section>
  );
};

export default About;
