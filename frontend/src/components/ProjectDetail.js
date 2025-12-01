import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { mockProjects } from "../utils/mockData";
import ParticleBackground from "./ParticleBackground";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const foundProject = mockProjects.find((p) => p.id === parseInt(id));
    setProject(foundProject);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Project not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300 mb-8"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Portfolio
          </Link>

          {/* Project Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-cyan-400">
              {project.title}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {project.shortDescription}
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-12">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Project Details - Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left Column - Project Description & Technologies */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">
                Project Description
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                {project.description}
              </p>

              <h3 className="text-xl font-bold mb-4 text-cyan-400">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column - Project Features */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">
                Project Features
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-cyan-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    <h4 className="font-semibold text-white">Modern Design</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Clean, modern interface with attention to detail
                  </p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-cyan-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <h4 className="font-semibold text-white">Performance</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Optimized for speed and performance
                  </p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-cyan-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <h4 className="font-semibold text-white">Responsive</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Fully responsive design that works on all devices
                  </p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-cyan-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                    <h4 className="font-semibold text-white">Maintainable</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Clean code architecture for easy maintenance
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
