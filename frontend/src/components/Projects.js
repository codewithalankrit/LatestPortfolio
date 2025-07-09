import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { mockProjects } from "../utils/mockData";

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`opacity-0 translate-y-10 transition-all duration-1000 ${
        index % 2 === 0 ? "delay-100" : "delay-300"
      }`}
    >
      <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-cyan-400 transition-all duration-500 transform hover:scale-105">
        <div className="relative overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {project.featured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-3">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-700/50 text-cyan-400 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 bg-gray-700/50 text-gray-400 rounded-full text-sm font-medium">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Link
              to={`/project/${project.id}`}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
            >
              View Details
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            <div className="flex space-x-2">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                title="Live Demo"
              >
                🔗
              </a>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                title="GitHub"
              >
                🐙
              </a>
            </div>
          </div>
        </div>

        {/* 3D Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
};

const Projects = () => {
  const titleRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

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

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div
          ref={titleRef}
          className="text-center mb-16 opacity-0 translate-y-10 transition-all duration-1000"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(showAll ? mockProjects : mockProjects.slice(0, 3)).map(
            (project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            )
          )}
        </div>

        <div className="text-center mt-12">
          {!showAll && (
            <button
              className="px-8 py-4 border-2 border-cyan-500 text-cyan-500 rounded-full font-semibold hover:bg-cyan-500 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              onClick={() => setShowAll(true)}
            >
              View All Projects
            </button>
          )}
          {showAll && (
            <button
              className="px-8 py-4 border-2 border-gray-500 text-gray-500 rounded-full font-semibold hover:bg-gray-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              onClick={() => setShowAll(false)}
            >
              Show Less
            </button>
          )}
        </div>
      </div>

      {/* Floating 3D Elements */}
      <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg transform rotate-12 hover:rotate-45 transition-transform duration-500 animate-float opacity-20"></div>
      <div className="absolute bottom-10 left-10 w-12 h-12 bg-gradient-to-br from-green-400 to-teal-600 rounded-full transform hover:scale-125 transition-transform duration-500 animate-float-delay opacity-20"></div>
    </section>
  );
};

export default Projects;
