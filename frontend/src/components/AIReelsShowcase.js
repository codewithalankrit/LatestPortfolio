import React, { useState, useRef, useEffect } from "react";
import { mockAiReels } from "../utils/mockData";

const AIReelsShowcase = () => {
  const [activeReelIndex, setActiveReelIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const modalVideoRef = useRef(null);

  const selectedReel = activeReelIndex !== null ? mockAiReels[activeReelIndex] : null;

  const handlePrevReel = () => {
    if (activeReelIndex !== null) {
      setActiveReelIndex((prev) => (prev > 0 ? prev - 1 : mockAiReels.length - 1));
    }
  };

  const handleNextReel = () => {
    if (activeReelIndex !== null) {
      setActiveReelIndex((prev) => (prev < mockAiReels.length - 1 ? prev + 1 : 0));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeReelIndex === null) return;
      if (e.key === "Escape") setActiveReelIndex(null);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") handlePrevReel();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") handleNextReel();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeReelIndex]);

  return (
    <section id="ai-reels" className="py-20 relative bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/50 border border-purple-500/40 text-purple-300 text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
            Kling AI + Flow Showcase
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Video Reels Showcase</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Swipe and tap through my AI video reels created with Kling AI and Flow.
          </p>
        </div>

        {/* 9:16 Vertical Reels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {mockAiReels.map((reel, idx) => (
            <div
              key={reel.id}
              onClick={() => {
                setActiveReelIndex(idx);
                setIsPlaying(true);
              }}
              className="group relative cursor-pointer rounded-2xl overflow-hidden bg-gray-950 border border-gray-800 hover:border-purple-500/80 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 aspect-[9/16] flex flex-col justify-between"
            >
              {/* Video Element (Autoplay on Hover) */}
              <video
                src={reel.videoUrl}
                muted
                loop
                playsInline
                onMouseOver={(e) => e.target.play().catch(() => {})}
                onMouseOut={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Top Bar Overlay */}
              <div className="relative z-10 p-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex justify-between items-center">
                <span className="bg-purple-900/80 text-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-500/30 backdrop-blur-md">
                  {reel.aiModel}
                </span>
                <span className="bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                  {reel.duration}
                </span>
              </div>

              {/* Center Play Button Hover Overlay */}
              <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[1px]">
                <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center text-xl shadow-lg border border-purple-400/50 transform group-hover:scale-110 transition-transform">
                  ▶
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="relative z-10 p-3 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent">
                <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1 mb-1">
                  {reel.title}
                </h4>
                <p className="text-[10px] text-gray-400 line-clamp-1 italic">
                  "{reel.prompt}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instagram / TikTok Style Vertical Reel Fullscreen Modal */}
      {selectedReel && (
        <div className="fixed inset-0 z-50 bg-gray-950/80 backdrop-blur-2xl flex items-center justify-center p-4 overflow-hidden">
          {/* Ambient Video Glow Background (No Black Screen) */}
          <video
            key={`modal-bg-${selectedReel.videoUrl}`}
            src={selectedReel.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover filter blur-3xl opacity-40 scale-150 pointer-events-none"
          />

          {/* Close Modal Button */}
          <button
            onClick={() => setActiveReelIndex(null)}
            className="absolute top-6 right-6 z-50 text-gray-300 hover:text-white bg-gray-900/80 hover:bg-gray-800 p-3 rounded-full border border-gray-700 transition-all shadow-xl backdrop-blur-md"
            title="Close (Esc)"
          >
            ✕
          </button>

          {/* Modal Content Container */}
          <div className="relative z-10 w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[85vh] bg-black rounded-3xl overflow-hidden border border-purple-500/40 shadow-2xl flex flex-col justify-between">
            {/* Main Vertical Video */}
            <video
              ref={modalVideoRef}
              key={selectedReel.videoUrl}
              src={selectedReel.videoUrl}
              autoPlay={isPlaying}
              loop
              muted={isMuted}
              playsInline
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            />

            {/* Top Reel Info Overlay */}
            <div className="relative z-20 p-4 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex justify-between items-center">
              <div>
                <span className="text-xs text-purple-300 font-bold bg-purple-950/80 border border-purple-600/40 px-2.5 py-1 rounded-full backdrop-blur-md">
                  Reel {activeReelIndex + 1} of {mockAiReels.length}
                </span>
                <span className="ml-2 text-xs text-gray-300 font-medium">
                  {selectedReel.aiModel}
                </span>
              </div>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="bg-black/60 hover:bg-black/90 text-white p-2 rounded-full border border-white/20 backdrop-blur-md transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? "🔇" : "🔊"}
              </button>
            </div>

            {/* Previous & Next Floating Nav Arrows */}
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 z-30 flex justify-between pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevReel();
                }}
                className="pointer-events-auto bg-black/60 hover:bg-purple-600 text-white p-3 rounded-full border border-purple-500/30 shadow-lg backdrop-blur-md transition-all transform hover:scale-110"
                title="Previous Reel (Left Arrow)"
              >
                ◀
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextReel();
                }}
                className="pointer-events-auto bg-black/60 hover:bg-purple-600 text-white p-3 rounded-full border border-purple-500/30 shadow-lg backdrop-blur-md transition-all transform hover:scale-110"
                title="Next Reel (Right Arrow)"
              >
                ▶
              </button>
            </div>

            {/* Bottom Reel Caption Overlay */}
            <div className="relative z-20 p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
              <h3 className="text-lg font-bold text-white mb-1">
                {selectedReel.title}
              </h3>
              <p className="text-xs text-gray-300 italic bg-gray-900/90 p-2.5 rounded-xl border border-gray-800 mb-3">
                "{selectedReel.prompt}"
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Use ← → keys to switch reels</span>
                <span className="text-purple-400 font-semibold">{selectedReel.duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AIReelsShowcase;
