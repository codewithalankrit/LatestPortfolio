import React, { useEffect, useRef } from "react";
import {
  mockExperience,
  mockEducation,
  mockCertifications,
  mockAchievements,
} from "../utils/mockData";

const Experience = () => {
  const sectionRef = useRef(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div
          ref={sectionRef}
          className="opacity-0 translate-y-10 transition-all duration-1000"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {mockExperience.map((job, index) => (
                <div
                  key={job.id}
                  className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-cyan-400 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {job.role}
                      </h3>
                      <p className="text-cyan-400 font-medium">{job.company}</p>
                    </div>
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {job.description}
                  </p>
                  {job.highlights && (
                    <ul className="space-y-2 mb-4">
                      {job.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-gray-300 text-sm leading-relaxed"
                        >
                          <span className="text-cyan-400 mt-1 shrink-0">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {job.tools && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-700">
                      {job.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 bg-gray-900/60 text-cyan-400 rounded-full text-xs font-medium border border-gray-700"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">
                  Education
                </h3>
                {mockEducation.map((edu) => (
                  <div key={edu.degree}>
                    <p className="font-semibold text-white">{edu.degree}</p>
                    <p className="text-gray-400 text-sm">{edu.institution}</p>
                    <p className="text-gray-500 text-sm mt-1">{edu.period}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">
                  Certifications
                </h3>
                {mockCertifications.map((cert) => (
                  <div key={cert.name}>
                    <p className="font-semibold text-white">{cert.name}</p>
                    <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    <p className="text-gray-500 text-sm mt-1">{cert.period}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">
                  Achievements
                </h3>
                {mockAchievements.map((item) => (
                  <div key={item.title}>
                    <p className="font-semibold text-white text-sm leading-snug">
                      {item.title}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
