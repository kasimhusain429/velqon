"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Compass,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowUpRight,
  Maximize2,
} from "lucide-react";
import GalleryViewer3D from "./GalleryViewer3D";
import ScrollWalkthrough3D from "./ScrollWalkthrough3D";
import GalleryHeader from "./GalleryHeader";
import GalleryFloorSelector from "./GalleryFloorSelector";
import GalleryAudioPlayer from "./GalleryAudioPlayer";
import GalleryAsideDrawer from "./GalleryAsideDrawer";
import LocationsModal from "./LocationsModal";
import MaterialLibraryModal from "./MaterialLibraryModal";
import { galleryFloors, GalleryFloor, GalleryHotspot } from "@/lib/galleryData";

interface Props {
  initialFloorSlug?: string;
  initialMode?: "isometric" | "walkthrough";
  hideHeader?: boolean;
}

export default function GalleryExperience({
  initialFloorSlug = "ground-floor",
  initialMode = "isometric",
  hideHeader = false,
}: Props) {
  // Current active floor
  const [currentFloor, setCurrentFloor] = useState<GalleryFloor>(() => {
    return (
      galleryFloors.find((f) => f.slug === initialFloorSlug) || galleryFloors[0]
    );
  });

  // Current view mode
  const [mode, setMode] = useState<"isometric" | "walkthrough">(initialMode);

  // Selected hotspot for drawer
  const [activeHotspot, setActiveHotspot] = useState<GalleryHotspot | null>(null);

  // Modals state
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);

  // Floor index helper
  const currentIndex = galleryFloors.findIndex((f) => f.id === currentFloor.id);
  const prevFloor = currentIndex > 0 ? galleryFloors[currentIndex - 1] : galleryFloors[galleryFloors.length - 1];
  const nextFloor = currentIndex < galleryFloors.length - 1 ? galleryFloors[currentIndex + 1] : galleryFloors[0];

  // Sound effect
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

  const handleEnterWalkthrough = () => {
    playSfx("floor.mp3");
    setMode("walkthrough");
  };

  const handleExitWalkthrough = () => {
    playSfx("click.mp3");
    setMode("isometric");
    setActiveHotspot(null);
  };

  const handleSelectHotspot = (hotspot: GalleryHotspot) => {
    setActiveHotspot(hotspot);
  };

  const handleCloseDrawer = () => {
    setActiveHotspot(null);
  };

  if (mode === "walkthrough") {
    return (
      <ScrollWalkthrough3D
        currentFloor={currentFloor}
        onSelectFloor={handleSelectFloor}
        onExitToIsometric={handleExitWalkthrough}
      />
    );
  }

  return (
    <div className="relative w-full h-screen min-h-[640px] max-h-[1080px] bg-[#08080a] text-[#fafafa] overflow-hidden select-none">
      {/* 1. Full-bleed WebGL 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <GalleryViewer3D
          currentFloor={currentFloor}
          mode={mode}
          activeHotspot={activeHotspot}
          onSelectHotspot={handleSelectHotspot}
          onEnterWalkthrough={handleEnterWalkthrough}
          onExitWalkthrough={handleExitWalkthrough}
        />
      </div>

      {/* 2. Architectural Framed Viewport Border */}
      <div className="absolute inset-3 sm:inset-5 border border-white/10 rounded-sm pointer-events-none z-20 transition-opacity duration-500" />

      {/* 3. Global Luxury Gallery Header (omitted when global Navbar is present) */}
      {!hideHeader && (
        <GalleryHeader
          onOpenContact={() => {
            window.location.href = "/contact";
          }}
          onOpenMaterials={() => setMaterialsOpen(true)}
          onOpenLocations={() => setLocationsOpen(true)}
        />
      )}

      {/* 4. Center Bottom Floor Carousel Controls (Isometric Mode) */}
      <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 z-30 flex flex-col items-center justify-center px-4 pointer-events-none animate-fade-in">
        <div className="flex items-center justify-between w-full max-w-4xl px-4 pointer-events-auto">
          {/* Previous Floor Button */}
          <button
            onClick={() => handleSelectFloor(prevFloor)}
            className="group flex items-center gap-2 text-xs md:text-sm font-mono tracking-[0.2em] uppercase text-[#fafafa] hover:text-[#c5a880] transition-all bg-[#0c0c10]/80 hover:bg-[#14141a] backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 shadow-lg hover:scale-105 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#c5a880]" />
            <span className="hidden sm:inline">{prevFloor.name}</span>
          </button>

          {/* Current Floor Title & Step Inside CTA */}
          <div className="flex flex-col items-center text-center max-w-md mx-2">
            <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-[#c5a880] mb-1">
              Level {currentFloor.level}
            </span>
            <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl text-[#fafafa] tracking-tight font-normal drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
              {currentFloor.name}
            </h1>
            <p className="text-xs md:text-sm font-serif italic text-[#a3a3a8] mt-1 line-clamp-1">
              {currentFloor.tagline}
            </p>

            {/* Step Inside Hero Button */}
            <button
              onClick={handleEnterWalkthrough}
              className="mt-5 px-8 py-3.5 bg-[#f7f7f5] hover:bg-[#c5a880] text-black rounded-full text-xs md:text-sm font-medium tracking-[0.25em] uppercase shadow-[0_10px_35px_rgba(255,255,255,0.15)] hover:shadow-[0_10px_35px_rgba(197,168,128,0.35)] transition-all duration-300 hover:scale-105 flex items-center gap-3 border border-white/20 group cursor-pointer"
            >
              <span>Step Inside</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Next Floor Button */}
          <button
            onClick={() => handleSelectFloor(nextFloor)}
            className="group flex items-center gap-2 text-xs md:text-sm font-mono tracking-[0.2em] uppercase text-[#fafafa] hover:text-[#c5a880] transition-all bg-[#0c0c10]/80 hover:bg-[#14141a] backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 shadow-lg hover:scale-105 cursor-pointer"
          >
            <span className="hidden sm:inline">{nextFloor.name}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#c5a880]" />
          </button>
        </div>
      </div>

      {/* 7. Bottom Left Floor Selector Drawer */}
      <GalleryFloorSelector
        currentFloor={currentFloor}
        onSelectFloor={handleSelectFloor}
        mode={mode}
      />

      {/* 8. Bottom Right Ambient Audio Visualizer */}
      <GalleryAudioPlayer />

      {/* 9. Slide-Over Specification Drawer (`modal-aside`) */}
      <GalleryAsideDrawer
        hotspot={activeHotspot}
        onClose={handleCloseDrawer}
        onOpenMaterials={() => setMaterialsOpen(true)}
        onOpenContact={() => {
          window.location.href = "/contact";
        }}
      />

      {/* 10. Modals: Locations & Materials */}
      <LocationsModal
        isOpen={locationsOpen}
        onClose={() => setLocationsOpen(false)}
        onSelectContact={() => {
          window.location.href = "/contact";
        }}
      />

      <MaterialLibraryModal
        isOpen={materialsOpen}
        onClose={() => setMaterialsOpen(false)}
        onRequestSample={(materialName) => {
          console.log("Sample requested for:", materialName);
        }}
      />
    </div>
  );
}

