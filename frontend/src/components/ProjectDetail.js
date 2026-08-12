import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { mockProjects } from "../utils/mockData";
import ParticleBackground from "./ParticleBackground";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [activeClip, setActiveClip] = useState(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const foundProject = mockProjects.find((p) => p.id === parseInt(id));
    setProject(foundProject);
    if (foundProject && foundProject.videoClips && foundProject.videoClips.length > 0) {
      setActiveClip(foundProject.videoClips[0]);
    }
  }, [id]);

  useEffect(() => {
    setVideoError(false);
  }, [activeClip]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Project not found</div>
      </div>
    );
  }

  const currentVideo = activeClip ? activeClip.videoUrl : project.videoUrl;
  const currentModel = activeClip ? activeClip.aiModel : project.aiModel;

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

          {/* Hero Media (Video Player or Image) */}
          <div className="mb-12 flex justify-center">
            {currentVideo && !videoError ? (
              <div className="relative w-full max-w-xs sm:max-w-sm aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-purple-500/50 bg-gray-950 group">
                <video
                  key={currentVideo}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={() => setVideoError(true)}
                  className="w-full h-full object-cover rounded-2xl"
                >
                  <source src={currentVideo} type="video/mp4" />
                  <source src={currentVideo} type="video/webm" />
                </video>

                {currentModel && (
                  <div className="absolute top-3 right-3 bg-purple-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md shadow-lg border border-purple-400/40 flex items-center gap-1.5 pointer-events-none z-10">
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
                    <span>AI Model: {currentModel}</span>
                  </div>
                )}
              </div>
            ) : project.images?.[0] ? (
              <div className="relative w-full overflow-hidden rounded-xl bg-gray-950 border border-gray-800 shadow-2xl">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-96 object-cover"
                />
                {currentModel && (
                  <div className="absolute top-4 right-4 bg-purple-600/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg border border-purple-400/30">
                    AI Model: {currentModel}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center bg-gray-950 min-h-[300px] flex flex-col items-center justify-center rounded-xl border border-gray-800 w-full">
                <span className="text-4xl mb-2">🎬</span>
                <p className="text-gray-400 text-sm">AI Video Clip Showcase</p>
              </div>
            )}
          </div>

            {/* AI Video Clips Playlist Selector */}
            {project.videoClips && project.videoClips.length > 0 && (
              <div className="mt-8 bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 border border-gray-700/80 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-cyan-400">🎬</span> AI Video Clips Showcase
                  </h3>
                  <span className="text-xs text-gray-400 bg-gray-900 px-3 py-1 rounded-full border border-gray-700">
                    Click any clip to play
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {project.videoClips.map((clip) => {
                    const isActive = activeClip?.id === clip.id;
                    return (
                      <button
                        key={clip.id}
                        onClick={() => setActiveClip(clip)}
                        className={`text-left p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                          isActive
                            ? "bg-cyan-950/60 border-cyan-400 ring-2 ring-cyan-400/50 shadow-lg"
                            : "bg-gray-900/80 border-gray-700 hover:border-cyan-500/50 hover:bg-gray-800/80"
                        }`}
                      >
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-2.5 bg-black">
                          <video
                            src={clip.videoUrl}
                            muted
                            playsInline
                            onMouseOver={(e) => e.target.play()}
                            onMouseOut={(e) => {
                              e.target.pause();
                              e.target.currentTime = 0;
                            }}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded">
                            {clip.duration}
                          </div>
                          {isActive && (
                            <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                              <span className="bg-cyan-500 text-gray-950 font-bold text-xs px-2.5 py-1 rounded-full shadow">
                                ▶ Playing
                              </span>
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-cyan-300 truncate">
                              {clip.title}
                            </span>
                            <span className="text-[10px] bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded-full border border-purple-700/50">
                              {clip.aiModel}
                            </span>
                          </div>
                          {clip.prompt && (
                            <p className="text-[11px] text-gray-400 line-clamp-2 italic font-mono bg-gray-950/50 p-1.5 rounded border border-gray-800">
                              "{clip.prompt}"
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Project Details - Two Column Layout */}
          <div className="mt-16 mb-16 p-6 sm:p-10 bg-gray-900/50 backdrop-blur-xl border border-gray-800/80 rounded-3xl shadow-2xl grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Project Description, Workflow & Technologies */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-cyan-400">
                  Project Description
                </h2>
                <p className="text-gray-300 leading-relaxed text-base sm:text-lg mb-6">
                  {project.description}
                </p>

                {/* Creative AI Workflow Pipeline */}
                <div className="bg-gray-800/60 p-5 rounded-2xl border border-gray-700/60 shadow-inner">
                  <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>⚡</span> Creative AI Workflow Pipeline
                  </h4>
                  <ul className="space-y-2.5 text-sm text-gray-300">
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 font-bold">01.</span>
                      <span><strong>ChatGPT Prompt Synthesis:</strong> Crafting hyper-detailed aesthetic prompts, camera motions, and scene directions.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 font-bold">02.</span>
                      <span><strong>Kling AI + Flow Generation:</strong> Rendering photorealistic motion dynamics, specular reflections, and physics morphing.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 font-bold">03.</span>
                      <span><strong>9:16 Vertical Formatting:</strong> Fine-tuning color grading and aspect ratio for short-form video reels.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-cyan-400">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2.5 bg-gray-800/90 text-cyan-300 rounded-xl text-sm font-semibold border border-gray-700/80 shadow-md hover:border-cyan-400/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Project Features */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-cyan-400">
                Project Highlights
              </h2>
              <div className="space-y-6">
                {project.features && project.features.length > 0 ? (
                  project.features.map((feat, idx) => (
                    <div key={idx} className="bg-gray-800/80 p-5 sm:p-6 rounded-2xl border border-gray-700/70 hover:border-cyan-400/50 shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <span className="text-cyan-400 font-bold mr-3 text-xl">✦</span>
                        <h4 className="font-semibold text-white text-base sm:text-lg">{feat.title}</h4>
                      </div>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed pl-7">{feat.description}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-gray-800/80 p-5 rounded-2xl border border-gray-700/70">
                      <div className="flex items-center mb-3">
                        <svg
                          className="w-6 h-6 text-cyan-400 mr-3"
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
                        <h4 className="font-semibold text-white text-base">Modern Design</h4>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed pl-9">
                        Clean, modern interface with attention to detail
                      </p>
                    </div>

                    <div className="bg-gray-800/80 p-5 rounded-2xl border border-gray-700/70">
                      <div className="flex items-center mb-3">
                        <svg
                          className="w-6 h-6 text-cyan-400 mr-3"
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
                        <h4 className="font-semibold text-white text-base">Performance</h4>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed pl-9">
                        Optimized for speed and performance
                      </p>
                    </div>

                    <div className="bg-gray-800/80 p-5 rounded-2xl border border-gray-700/70">
                      <div className="flex items-center mb-3">
                        <svg
                          className="w-6 h-6 text-cyan-400 mr-3"
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
                        <h4 className="font-semibold text-white text-base">Responsive</h4>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed pl-9">
                        Fully responsive design that works on all devices
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {(project.liveLink || project.githubLink) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {project.liveLink && (
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
              )}
              {project.githubLink && (
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
