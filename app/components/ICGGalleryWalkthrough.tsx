"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  ArrowUpRight,
  Compass,
  Armchair,
  BookOpen,
} from "lucide-react";
import { galleryRooms, GalleryRoom, floorsData, FloorInfo } from "@/lib/data";
import LocationsModal from "./gallery/LocationsModal";
import MaterialLibraryModal from "./gallery/MaterialLibraryModal";

interface Props {
  initialFloorIndex?: number;
  initialViewMode?: "isometric" | "walkthrough";
}

export default function ICGGalleryWalkthrough({
  initialFloorIndex = 1,
  initialViewMode = "isometric",
}: Props = {}) {
  const [viewMode, setViewMode] = useState<"isometric" | "walkthrough">(initialViewMode);
  const [isDiving, setIsDiving] = useState(false);
  const [activeFloorIndex, setActiveFloorIndex] = useState(initialFloorIndex); // 0 = Underground, 1 = Ground Floor, 2 = First Floor, 3 = Pop-Up
  const [activeRoomIndex, setActiveRoomIndex] = useState(() => {
    return floorsData[initialFloorIndex]?.defaultRoomIndex ?? 0;
  });
  const [activeModalRoom, setActiveModalRoom] = useState<GalleryRoom | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [floorsDrawerOpen, setFloorsDrawerOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);

  // Audio equalizer state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Interactive mouse parallax state for isometric view
  const [isoMouse, setIsoMouse] = useState({ x: 0, y: 0 });
  // Interactive mouse look / pan for walkthrough view
  const [lookPan, setLookPan] = useState({ x: 0, y: 0 });

  const currentFloor = floorsData[activeFloorIndex] || floorsData[1];
  const currentRoom = galleryRooms[activeRoomIndex] || galleryRooms[0];

  // Sound effect helper
  const playSfx = useCallback((soundFile: string) => {
    try {
      const audio = new Audio(`/audio/${soundFile}`);
      audio.volume = 0.35;
      audio.play().catch(() => {});
    } catch {}
  }, []);

  // Ambient sound initialization
  useEffect(() => {
    audioRef.current = new Audio("/audio/floor.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch(() => {
          setIsPlayingAudio(true);
        });
    }
  };

  // Isometric mouse move handler (subtle 3D tilt)
  const handleIsoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setIsoMouse({ x: nx, y: ny });
  };

  const handleIsoMouseLeave = () => {
    setIsoMouse({ x: 0, y: 0 });
  };

  // Walkthrough mouse look handler (panoramic smooth pan)
  const handleWalkthroughMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    // Map to smooth pixel offset
    setLookPan({ x: -nx * 26, y: -ny * 14 });
  };

  // Floor navigation
  const handlePrevFloor = () => {
    playSfx("click.mp3");
    setActiveFloorIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextFloor = () => {
    playSfx("click.mp3");
    setActiveFloorIndex((prev) => Math.min(floorsData.length - 1, prev + 1));
  };

  const selectFloor = (index: number) => {
    playSfx("click.mp3");
    setActiveFloorIndex(index);
    setFloorsDrawerOpen(false);
    const targetRoom = floorsData[index]?.defaultRoomIndex ?? 0;
    setActiveRoomIndex(targetRoom);
  };

  // Cinematic Step Inside dive
  const enterWalkthrough = (roomIdx?: number) => {
    playSfx("floor.mp3");
    const idx = roomIdx !== undefined ? roomIdx : currentFloor.defaultRoomIndex;
    setActiveRoomIndex(idx);
    setIsDiving(true);

    setTimeout(() => {
      setViewMode("walkthrough");
      setIsDiving(false);
    }, 850);
  };

  const exitWalkthrough = () => {
    playSfx("click.mp3");
    setViewMode("isometric");
    setActiveModalRoom(null);
  };

  // Room navigation inside floor
  const handleNextRoom = () => {
    playSfx("click.mp3");
    setActiveRoomIndex((prev) => (prev + 1) % galleryRooms.length);
  };

  const handlePrevRoom = () => {
    playSfx("click.mp3");
    setActiveRoomIndex((prev) => (prev - 1 + galleryRooms.length) % galleryRooms.length);
  };

  const handleOpenHotspot = (room: GalleryRoom) => {
    playSfx("pin.mp3");
    setActiveModalRoom(room);
    setModalImageIndex(0);
  };

  return (
    <section
      id="gallery-walkthrough"
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] bg-[#cdc4b3] text-[#1a1a1a] overflow-hidden select-none font-sans"
    >
      {/* 1. Subtle hairline frame outline (matching ICG Gallery 20px inset) */}
      <div className="absolute inset-3 sm:inset-5 border border-black/12 rounded-sm pointer-events-none z-30" />

      {/* 2. Top Header Navigation (ICG GALLERY minimal design) */}
      <header className="absolute top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 sm:py-7 flex items-center justify-between pointer-events-auto">
        <Link
          href="/"
          className="flex items-center gap-2 group text-[#1a1a1a] hover:opacity-80 transition-opacity"
        >
          <span className="font-serif text-lg sm:text-xl tracking-[0.22em] font-medium text-black">
            VELQON
          </span>
          <span className="text-xs text-[#7e7669] font-light">✣</span>
          <span className="text-[10px] tracking-[0.3em] text-[#3a352c] uppercase font-light">
            GALLERY
          </span>
        </Link>

        {/* Center label */}
        <div className="hidden md:flex items-center gap-1.5 text-xs tracking-[0.25em] uppercase font-medium text-[#222222]">
          <span className="relative pb-0.5">
            Galleries
            <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#222222]" />
          </span>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-5 sm:gap-7 text-[11px] tracking-[0.2em] uppercase">
          <Link
            href="/projects"
            className="hidden sm:inline text-[#555046] hover:text-black transition-colors"
          >
            Projects
          </Link>
          <button
            onClick={() => setLocationsOpen(true)}
            className="text-[#555046] hover:text-black transition-colors cursor-pointer"
          >
            Locations
          </button>
          <button
            onClick={() => setMaterialsOpen(true)}
            className="hidden sm:inline text-[#555046] hover:text-black transition-colors cursor-pointer"
          >
            Materials
          </button>
          <Link
            href="/contact"
            className="text-[#1a1a1a] font-medium hover:text-black transition-colors underline underline-offset-4"
          >
            Contact
          </Link>
          <button
            onClick={() => setMaterialsOpen(true)}
            title="Open Material Library"
            className="w-5 h-5 text-neutral-800 hover:text-black transition-transform hover:scale-110 flex items-center justify-center border border-black/25 rounded-xs cursor-pointer"
          >
            <span className="text-[10px]">⊡</span>
          </button>
        </div>
      </header>

      {/* 3. ISOMETRIC 3D CUTAWAY VIEW */}
      {viewMode === "isometric" && (
        <div
          onMouseMove={handleIsoMouseMove}
          onMouseLeave={handleIsoMouseLeave}
          className="relative w-full h-full flex flex-col items-center justify-center z-20"
        >
          {/* Faint drifting sunlight & branch shadow overlay (shadow_leaves.jpg) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.14] mix-blend-multiply bg-repeat transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: "url(/shadow_leaves.jpg)",
              backgroundSize: "600px 600px",
              transform: `translate(${isoMouse.x * 12}px, ${isoMouse.y * 12}px)`,
            }}
          />

          {/* Left vertical floor switcher */}
          {activeFloorIndex > 0 && (
            <button
              onClick={handlePrevFloor}
              className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2.5 -rotate-90 origin-left text-[11px] tracking-[0.28em] uppercase text-[#666055] hover:text-black transition-colors group cursor-pointer"
            >
              <span className="group-hover:-translate-x-1 transition-transform text-[9px]">◀</span>
              <span className="font-medium">{floorsData[activeFloorIndex - 1].name}</span>
            </button>
          )}

          {/* Right vertical floor switcher */}
          {activeFloorIndex < floorsData.length - 1 && (
            <button
              onClick={handleNextFloor}
              className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2.5 rotate-90 origin-right text-[11px] tracking-[0.28em] uppercase text-[#666055] hover:text-black transition-colors group cursor-pointer"
            >
              <span className="font-medium">{floorsData[activeFloorIndex + 1].name}</span>
              <span className="group-hover:translate-x-1 transition-transform text-[9px]">▶</span>
            </button>
          )}

          {/* Center 3D Isometric Model with Mouse Parallax & Cinematic Dive */}
          <div
            className={`relative w-full max-w-4xl px-4 sm:px-6 flex flex-col items-center text-center transition-all duration-700 ease-out ${
              isDiving ? "scale-[3.2] opacity-0 blur-[2px]" : "scale-100 opacity-100"
            }`}
            style={{
              transform: isDiving
                ? "scale(3.2) translateY(-40px)"
                : `perspective(1200px) rotateX(${isoMouse.y * -4}deg) rotateY(${
                    isoMouse.x * 6
                  }deg) translate3d(${isoMouse.x * 10}px, ${isoMouse.y * 6}px, 0)`,
            }}
          >
            <div className="relative w-[340px] sm:w-[500px] md:w-[640px] lg:w-[720px] aspect-[16/11] mb-2 flex items-center justify-center">
              <Image
                key={currentFloor.isoImage}
                src={currentFloor.isoImage}
                alt={`${currentFloor.name} Isometric Cutaway`}
                fill
                priority
                className="object-contain transition-all duration-700"
                sizes="(max-width: 768px) 95vw, 720px"
              />
            </div>

            {/* Floor Name */}
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl text-[#1c1b18] tracking-tight mb-4 font-normal">
              {currentFloor.name}
            </h2>

            {/* Step Inside Button (exact dark charcoal styling from reference) */}
            <button
              onClick={() => enterWalkthrough()}
              className="px-7 py-2.5 bg-[#202020] hover:bg-black text-[#fafafa] text-[12px] tracking-[0.22em] uppercase font-normal rounded-[4px] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Step Inside
            </button>
          </div>
        </div>
      )}

      {/* 4. FIRST-PERSON INTERIOR WALKTHROUGH */}
      {viewMode === "walkthrough" && (
        <div
          onMouseMove={handleWalkthroughMouseMove}
          className="relative w-full h-full z-20 overflow-hidden"
        >
          {/* Room Image with Smooth Mouse Pan & Inertia */}
          <div
            className="absolute -inset-8 transition-transform duration-500 ease-out"
            style={{
              transform: `scale(1.06) translate3d(${lookPan.x}px, ${lookPan.y}px, 0)`,
            }}
          >
            <Image
              key={currentRoom.image}
              src={currentRoom.image}
              alt={currentRoom.title}
              fill
              priority
              className="object-cover transition-opacity duration-700 ease-out"
              sizes="100vw"
            />
          </div>

          {/* Top-left: Back to Model View Pill */}
          <div className="absolute top-20 sm:top-24 left-6 sm:left-12 z-30">
            <button
              onClick={exitWalkthrough}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 text-white text-[10px] tracking-[0.2em] uppercase backdrop-blur-md border border-white/20 transition-all shadow-lg cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#e0cfab]" />
              <span>Model View</span>
            </button>
          </div>

          {/* The Eye Hotspot Pin (Exact White Circle with Eye Icon & Pulse Ring) */}
          <div
            style={{
              left: `${currentRoom.hotspot.x}%`,
              top: `${currentRoom.hotspot.y}%`,
              transform: `translate(calc(-50% + ${lookPan.x * 0.7}px), calc(-50% + ${
                lookPan.y * 0.7
              }px))`,
            }}
            className="absolute z-30 group"
          >
            {/* Outer animated radar pulse ring */}
            <span className="absolute -inset-2.5 rounded-full bg-white/45 animate-ping opacity-75 pointer-events-none" />

            {/* White Eye Button */}
            <button
              onClick={() => handleOpenHotspot(currentRoom)}
              aria-label="Discover architectural feature"
              className="relative w-11 h-11 rounded-full bg-white text-black hover:bg-[#1a1a1a] hover:text-white flex items-center justify-center transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] cursor-pointer hover:scale-110 active:scale-95"
            >
              <Eye className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Hover tooltip card */}
            <div className="hidden group-hover:block absolute left-14 top-1/2 -translate-y-1/2 w-64 bg-[#1f1d1a]/95 text-white border border-white/20 p-3 rounded-sm shadow-2xl backdrop-blur-md pointer-events-none z-40 transition-all">
              <span className="text-[9px] tracking-[0.25em] text-[#d6c49e] uppercase block font-mono">
                DISCOVER SPECIFICATION
              </span>
              <p className="text-xs font-serif text-white font-medium mt-0.5">
                {currentRoom.hotspot.title}
              </p>
              <p className="text-[10px] text-[#b3ada4] tracking-wider mt-0.5">
                Click 👁 to inspect materials & origin
              </p>
            </div>
          </div>

          {/* Room Navigation Arrows */}
          <button
            onClick={handlePrevRoom}
            aria-label="Previous gallery space"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all shadow-xl cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextRoom}
            aria-label="Next gallery space"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all shadow-xl cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Room Title overlay at bottom */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none drop-shadow-md">
            <span className="text-[10px] tracking-[0.3em] text-[#e0cfab] uppercase font-mono">
              SPACE {currentRoom.number} / 08
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-white font-light mt-0.5">
              {currentRoom.name}
            </h3>
            <p className="text-[11px] text-[#e2ded6] tracking-widest uppercase mt-0.5">
              {currentRoom.subtitle}
            </p>
          </div>
        </div>
      )}

      {/* 5. EDITORIAL SLIDE-OUT ASIDE DRAWER (Exact Match of icg-pin-modal.png) */}
      {activeModalRoom && (
        <aside
          role="dialog"
          aria-modal="true"
          className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-[#f6f4ee] text-[#1a1a1a] shadow-[-25px_0_60px_rgba(0,0,0,0.35)] flex flex-col justify-between p-7 sm:p-10 overflow-y-auto animate-fade-in border-l border-black/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#ddd6ca] pb-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xs tracking-[0.25em] font-medium text-black uppercase">
                VELQON GALLERY
              </span>
              <span className="text-xs text-[#8c8275]">·</span>
              <span className="text-[10px] tracking-[0.2em] text-[#736c61] uppercase">
                {activeModalRoom.floor}
              </span>
            </div>

            <button
              onClick={() => setActiveModalRoom(null)}
              className="p-1 text-[#444444] hover:text-black transition-colors cursor-pointer"
              aria-label="Close specification modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Editorial Content */}
          <div className="space-y-6 py-6 flex-1">
            <h3 className="font-serif text-xl sm:text-2xl text-[#1a1a1a] leading-snug font-normal">
              {activeModalRoom.hotspot.heading}
            </h3>

            {/* Two-column editorial description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs text-[#444444] font-light leading-relaxed">
              <p>{activeModalRoom.hotspot.col1}</p>
              <p>{activeModalRoom.hotspot.col2}</p>
            </div>

            {/* Material Specimen Carousel */}
            <div className="space-y-2.5 pt-2">
              <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-[#ddd5c7] shadow-md bg-neutral-200">
                <Image
                  key={activeModalRoom.hotspot.images[modalImageIndex]}
                  src={activeModalRoom.hotspot.images[modalImageIndex] || activeModalRoom.image}
                  alt={activeModalRoom.hotspot.title}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 550px"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-[#736c61] font-mono tracking-widest">
                  PLATE {modalImageIndex + 1} / {activeModalRoom.hotspot.images.length}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      setModalImageIndex(
                        (prev) =>
                          (prev - 1 + activeModalRoom.hotspot.images.length) %
                          activeModalRoom.hotspot.images.length
                      )
                    }
                    className="p-2 bg-[#e5ded4] hover:bg-black hover:text-white rounded transition-colors cursor-pointer"
                    aria-label="Previous plate"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setModalImageIndex(
                        (prev) => (prev + 1) % activeModalRoom.hotspot.images.length
                      )
                    }
                    className="p-2 bg-[#e5ded4] hover:bg-black hover:text-white rounded transition-colors cursor-pointer"
                    aria-label="Next plate"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Specification Grid */}
            <div className="p-4 bg-[#ece6dc] rounded-sm border border-[#ddd5c7] grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[9px] tracking-[0.2em] text-[#736c61] uppercase block mb-0.5">
                  Primary Material
                </span>
                <span className="text-black font-medium">{activeModalRoom.hotspot.material}</span>
              </div>
              <div>
                <span className="text-[9px] tracking-[0.2em] text-[#736c61] uppercase block mb-0.5">
                  Origin / Atelier
                </span>
                <span className="text-black font-medium">{activeModalRoom.hotspot.origin}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[9px] tracking-[0.2em] text-[#736c61] uppercase block mb-0.5">
                  Dimensions and Tolerances
                </span>
                <span className="text-black font-mono text-[11px]">
                  {activeModalRoom.hotspot.dimensions}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4 border-t border-[#ddd6ca]">
            <Link
              href={`/contact?subject=${encodeURIComponent(
                "Specification Inquiry: " + activeModalRoom.hotspot.title
              )}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#1a1a1a] hover:bg-black text-[#fafafa] text-xs tracking-[0.2em] uppercase font-medium rounded-sm transition-colors shadow-lg"
            >
              <span>Enquire About This Specification</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </aside>
      )}

      {/* 6. BOTTOM BAR (Pop-Up Window, Floors Drawer, Equalizer) */}
      <footer className="absolute bottom-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 sm:py-7 flex items-center justify-between pointer-events-auto">
        {/* Left: Pop-Up Window & Floors buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSfx("click.mp3");
              selectFloor(3);
              enterWalkthrough(7);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white text-neutral-900 text-[11px] tracking-wider backdrop-blur-md border border-black/10 shadow-sm transition-all cursor-pointer"
          >
            <Armchair className="w-3.5 h-3.5 text-neutral-700" />
            <span className="font-medium">Pop-Up Window</span>
          </button>

          <div className="relative">
            <button
              onClick={() => {
                playSfx("click.mp3");
                setFloorsDrawerOpen(!floorsDrawerOpen);
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-black text-[11px] tracking-[0.2em] uppercase backdrop-blur-md border border-black/15 shadow-sm transition-all cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-neutral-800" />
              <span className="font-medium">Floors</span>
            </button>

            {/* Floating CHANGE FLOOR Modal */}
            {floorsDrawerOpen && (
              <div className="absolute bottom-12 left-0 w-72 bg-[#f6f4ee] text-[#1a1a1a] border border-black/15 p-5 rounded-sm shadow-2xl space-y-3 animate-fade-in z-50">
                <div className="flex items-center justify-between border-b border-black/10 pb-2">
                  <span className="text-[11px] tracking-[0.25em] font-medium uppercase text-neutral-900">
                    CHANGE FLOOR
                  </span>
                  <button
                    onClick={() => setFloorsDrawerOpen(false)}
                    className="text-xs text-neutral-500 hover:text-black cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-1">
                  {[...floorsData].reverse().map((floor, revIdx) => {
                    const originalIdx = floorsData.length - 1 - revIdx;
                    const isActive = activeFloorIndex === originalIdx;
                    return (
                      <button
                        key={floor.id}
                        onClick={() => selectFloor(originalIdx)}
                        className={`w-full text-left py-2 px-2.5 rounded-sm transition-all flex items-center justify-between cursor-pointer border-b border-black/5 ${
                          isActive
                            ? "bg-black text-white font-medium"
                            : "hover:bg-black/5 text-[#333333]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <strong className="text-xs font-mono">{floor.number}</strong>
                          <span className="text-xs">{floor.name}</span>
                        </div>
                        {isActive && <span className="text-xs">●</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Room selector pills (walkthrough mode) */}
        {viewMode === "walkthrough" && (
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-xl">
            {galleryRooms.map((room, idx) => (
              <button
                key={room.id}
                onClick={() => {
                  playSfx("click.mp3");
                  setActiveRoomIndex(idx);
                }}
                className={`px-2.5 py-1 text-[9px] tracking-wider uppercase rounded-full transition-all cursor-pointer ${
                  activeRoomIndex === idx
                    ? "bg-white text-black font-medium shadow-sm"
                    : "text-[#a3a3a3] hover:text-white"
                }`}
              >
                {room.number} {room.name}
              </button>
            ))}
          </div>
        )}

        {/* Right: Audio Equalizer (En . |||||) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            aria-label="Toggle ambient audio"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white text-black text-[10px] tracking-[0.2em] uppercase backdrop-blur-md border border-black/10 transition-all shadow-sm group cursor-pointer"
          >
            <span className="font-medium">En .</span>
            <div className="flex items-end gap-[2px] h-3 w-4">
              <span
                className={`w-[2px] bg-neutral-800 rounded-full transition-all ${
                  isPlayingAudio ? "h-3 animate-[pulse_0.6s_ease-in-out_infinite]" : "h-1"
                }`}
              />
              <span
                className={`w-[2px] bg-neutral-800 rounded-full transition-all ${
                  isPlayingAudio ? "h-2 animate-[pulse_0.4s_ease-in-out_infinite]" : "h-1.5"
                }`}
              />
              <span
                className={`w-[2px] bg-neutral-800 rounded-full transition-all ${
                  isPlayingAudio ? "h-3.5 animate-[pulse_0.8s_ease-in-out_infinite]" : "h-2"
                }`}
              />
              <span
                className={`w-[2px] bg-neutral-800 rounded-full transition-all ${
                  isPlayingAudio ? "h-2 animate-[pulse_0.5s_ease-in-out_infinite]" : "h-1"
                }`}
              />
            </div>
          </button>
        </div>
      </footer>

      {/* 7. International Locations Modal */}
      <LocationsModal isOpen={locationsOpen} onClose={() => setLocationsOpen(false)} />

      {/* 8. Material Library & Sample Archive Modal */}
      <MaterialLibraryModal isOpen={materialsOpen} onClose={() => setMaterialsOpen(false)} />
    </section>
  );
}
