"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Compass,
  ArrowDown,
} from "lucide-react";
import GalleryViewer3D from "./gallery/GalleryViewer3D";
import { galleryFloors, GalleryFloor, GalleryHotspot } from "@/lib/galleryData";

interface HeroProps {
  initialFloorSlug?: string;
  initialMode?: "isometric" | "walkthrough";
}

export default function Hero({
  initialFloorSlug = "ground-floor",
}: HeroProps) {
  // Current active floor in 3D viewer
  const [currentFloor, setCurrentFloor] = useState<GalleryFloor>(() => {
    return (
      galleryFloors.find((f) => f.slug === initialFloorSlug) || galleryFloors[0]
    );
  });

  const [activeHotspot, setActiveHotspot] = useState<GalleryHotspot | null>(null);

  // Floor index helper for prev/next
  const currentIndex = galleryFloors.findIndex((f) => f.id === currentFloor.id);
  const prevFloor =
    currentIndex > 0
      ? galleryFloors[currentIndex - 1]
      : galleryFloors[galleryFloors.length - 1];
  const nextFloor =
    currentIndex < galleryFloors.length - 1
      ? galleryFloors[currentIndex + 1]
      : galleryFloors[0];

  const playSfx = useCallback((soundFile: string) => {
    try {
      const audio = new Audio(`/audio/${soundFile}`);
      audio.volume = 0.35;
      audio.play().catch(() => {});
    } catch {}
  }, []);

  const handleSelectFloor = (floor: GalleryFloor) => {
    playSfx("click.mp3");
    setCurrentFloor(floor);
    setActiveHotspot(null);
  };

  const scrollToNextSection = () => {
    const target = document.getElementById("philosophy");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1080px] bg-[#08080a] text-[#fafafa] overflow-hidden select-none">
      {/* 1. Live Three.js 3D WebGL Canvas (interactive isometric model) */}
      <div className="absolute inset-0 z-0">
        <GalleryViewer3D
          currentFloor={currentFloor}
          mode="isometric"
          activeHotspot={activeHotspot}
          onSelectHotspot={setActiveHotspot}
          onEnterWalkthrough={() => {}}
          onExitWalkthrough={() => {}}
        />
      </div>

      {/* 2. Architectural Framed Viewport Border */}
      <div className="absolute inset-3 sm:inset-5 border border-white/10 rounded-sm pointer-events-none z-20" />

      {/* 3. Subtle Luxury Atmospheric Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/60 pointer-events-none z-10" />

      {/* 4. Top Header Coordinates Pill */}
      <div className="absolute top-24 sm:top-28 left-0 right-0 z-20 flex justify-center pointer-events-none px-4">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0c0c10]/80 border border-white/10 backdrop-blur-md shadow-lg pointer-events-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
          <span className="text-[9.5px] sm:text-[10px] tracking-[0.28em] text-[#c5a880] uppercase font-mono">
            DUBAI ATELIER · 25.2048° N, 55.2708° E
          </span>
        </div>
      </div>

      {/* 5. Center Hero Brand Presentation */}
      <div className="absolute top-34 sm:top-38 left-0 right-0 z-20 flex flex-col items-center text-center px-4 pointer-events-none">
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.18em] text-[#fafafa] font-normal uppercase drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
          VELQON
        </h1>
        <p className="mt-1.5 sm:mt-2 font-serif italic text-xs sm:text-sm md:text-base text-[#dcdcd9] tracking-wider max-w-lg drop-shadow-md">
          A residence unfolding in the continuous space
        </p>

        {/* 3D Interaction Hint Badge */}
        <div className="mt-2.5 flex items-center gap-2 text-[9px] sm:text-[10px] font-mono tracking-[0.22em] text-[#8c8c94] uppercase bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
          <Compass className="w-3 h-3 text-[#c5a880]" />
          <span>Drag to inspect 3D structure</span>
        </div>
      </div>

      {/* 6. Clean Architectural Bottom Navigation Dock */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-30 flex flex-col items-center justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-center gap-3 bg-[#0c0c10]/90 border border-white/15 backdrop-blur-2xl p-4 sm:p-5 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.85)] max-w-md sm:max-w-lg w-full">
          {/* Level Row: Previous chevron, Level title & level switcher pills, Next chevron */}
          <div className="flex items-center justify-between w-full gap-2 sm:gap-3">
            <button
              onClick={() => handleSelectFloor(prevFloor)}
              aria-label={`Previous Floor: ${prevFloor.name}`}
              className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/15 border border-white/15 text-[#fafafa] hover:text-[#c5a880] flex items-center justify-center transition-all cursor-pointer shrink-0"
              title={`Switch to ${prevFloor.name}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center text-center min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#c5a880] uppercase">
                  Level {currentFloor.level}
                </span>
                <span className="text-white/20">·</span>
                <h2 className="font-serif text-sm sm:text-base text-[#fafafa] font-normal truncate">
                  {currentFloor.name}
                </h2>
              </div>

              {/* Floor Switcher Pills: Underground (-1) | Ground Floor (0) | First Floor (+1) */}
              <div className="flex items-center gap-1.5 mt-1.5">
                {galleryFloors.map((floor) => {
                  const isActive = currentFloor.id === floor.id;
                  return (
                    <button
                      key={floor.id}
                      onClick={() => handleSelectFloor(floor)}
                      className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#c5a880] text-black font-semibold shadow-[0_0_12px_rgba(197,168,128,0.45)]"
                          : "bg-white/[0.04] hover:bg-white/[0.1] text-[#8c8c94] hover:text-white border border-white/10"
                      }`}
                    >
                      <span>{floor.name.split(" ")[0]} ({floor.level})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => handleSelectFloor(nextFloor)}
              aria-label={`Next Floor: ${nextFloor.name}`}
              className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/15 border border-white/15 text-[#fafafa] hover:text-[#c5a880] flex items-center justify-center transition-all cursor-pointer shrink-0"
              title={`Switch to ${nextFloor.name}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2.5 w-full pt-0.5">
            <Link
              href={`/walkthrough?floor=${currentFloor.slug}`}
              className="flex-1 py-2.5 sm:py-3 px-4 bg-[#f7f7f5] hover:bg-[#c5a880] text-black rounded-[2px] text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase font-medium shadow-[0_8px_25px_rgba(255,255,255,0.12)] hover:shadow-[0_8px_25px_rgba(197,168,128,0.35)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer text-center"
            >
              <span>Step Inside Walkthrough</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/projects"
              className="py-2.5 sm:py-3 px-3.5 sm:px-4 border border-white/20 hover:border-[#c5a880] bg-white/[0.03] hover:bg-white/[0.08] text-[#fafafa] rounded-[2px] text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase font-light transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              title="View Completed Architectural Works"
            >
              <span className="hidden sm:inline">Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a880]" />
            </Link>
          </div>
        </div>

        {/* Scroll Prompt Indicator */}
        <button
          onClick={scrollToNextSection}
          aria-label="Scroll down to explore atelier"
          className="mt-3 flex flex-col items-center gap-1 group cursor-pointer pointer-events-auto"
        >
          <span className="text-[8.5px] sm:text-[9px] tracking-[0.3em] text-[#8c8c94] group-hover:text-[#c5a880] uppercase font-mono transition-colors">
            Scroll To Explore Atelier
          </span>
          <ArrowDown className="w-3 h-3 text-[#c5a880] animate-bounce" />
        </button>
      </div>
    </section>
  );
}
