"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function GalleryAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/bg.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn("Audio autoplay blocked by browser policy:", e);
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-4 sm:right-8 md:right-12 z-40 flex items-center gap-3 text-xs font-mono text-white/70 select-none bg-[#0c0c10]/80 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
      {/* Audio Visualizer Button */}
      <button
        onClick={toggleAudio}
        aria-label="Toggle experience audio"
        className="flex items-center gap-2 transition-colors cursor-pointer group hover:text-white"
        title={isPlaying ? "Mute Gallery Soundtrack" : "Play Gallery Soundtrack"}
      >
        <div className="flex items-end gap-[3px] h-3.5 w-4 justify-center">
          <span
            className={`w-[2px] rounded-full transition-all duration-300 ${
              isPlaying
                ? "bg-[#c5a880] h-3 animate-[pulse_0.8s_ease-in-out_infinite]"
                : "bg-white/40 h-1"
            }`}
          />
          <span
            className={`w-[2px] rounded-full transition-all duration-300 ${
              isPlaying
                ? "bg-[#c5a880] h-4 animate-[pulse_0.6s_ease-in-out_0.2s_infinite]"
                : "bg-white/40 h-1.5"
            }`}
          />
          <span
            className={`w-[2px] rounded-full transition-all duration-300 ${
              isPlaying
                ? "bg-[#c5a880] h-2.5 animate-[pulse_1.0s_ease-in-out_0.4s_infinite]"
                : "bg-white/40 h-1"
            }`}
          />
        </div>
        <span className="text-[10px] tracking-wider uppercase font-mono">
          {isPlaying ? "Sound On" : "Sound"}
        </span>
      </button>
    </div>
  );
}

