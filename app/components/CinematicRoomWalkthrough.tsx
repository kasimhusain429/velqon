"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  ArrowRight,
  Sparkles,
  Compass,
  Layers,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

interface MaterialSpec {
  name: string;
  type: string;
  origin: string;
  finish: string;
}

interface RoomHotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  subtitle: string;
  heading: string;
  descriptionCol1: string;
  descriptionCol2: string;
  materials: MaterialSpec[];
  images: string[];
}

interface WalkthroughRoom {
  id: string;
  step: string;
  name: string;
  tagline: string;
  quote: string;
  footprint: string;
  ceiling: string;
  materialsPreview: string;
  image: string;
  hotspots: RoomHotspot[];
}

const walkthroughRooms: WalkthroughRoom[] = [
  {
    id: "living-pavilion",
    step: "01",
    name: "The Grand Living Pavilion",
    tagline: "Monolithic Roman Travertine & Smoked Oak",
    quote: "Proportion is the silent dialogue between natural sunlight and carved stone.",
    footprint: "145 m² / 1,560 sq ft",
    ceiling: "4.2m Continuous Slab",
    materialsPreview: "Honed Roman Travertine · Smoked French Oak · Brushed Gunmetal",
    image: "/images/rooms/room-1.jpg",
    hotspots: [
      {
        id: "hs-living-1",
        x: 48,
        y: 64,
        title: "Monolithic Travertine Plinth & Bouclé Seating",
        subtitle: "Honed Roman Travertine & Dedar Milano Textiles",
        heading: "A low center-of-gravity conversation salon sculpted from solid mineral blocks.",
        descriptionCol1:
          "Anchoring the expansive living volume, the monolithic coffee table plinth is carved from unbroken Roman travertine blocks sourced directly from Tivoli, Italy.",
        descriptionCol2:
          "Low-profile bespoke seating upholstered in natural wool-bouclé by Dedar Milano absorbs ambient acoustics, creating a serene sanctuary within the residence.",
        materials: [
          { name: "Roman Travertine", type: "Monolith Slab", origin: "Tivoli, Italy", finish: "Honed Matte Anti-Reflective" },
          { name: "Smoked French Oak", type: "Architectural Base", origin: "Black Forest, Germany", finish: "Organic Wax Oil" },
          { name: "Milano Wool Bouclé", type: "Custom Upholstery", origin: "Milan, Italy", finish: "Raw Natural Weave" },
        ],
        images: ["/images/rooms/material-1.jpg", "/images/rooms/room-1.jpg", "/images/rooms/material-2.jpg"],
      },
      {
        id: "hs-living-2",
        x: 78,
        y: 42,
        title: "Floor-to-Ceiling Light Modulation Portal",
        subtitle: "Acoustic Triple-Glazed Minimalist Profiles",
        heading: "Engineered to filter high-intensity desert sunlight into a gentle ambient glow.",
        descriptionCol1:
          "Custom ultra-slim architectural frames with recessed thermal breaks allow unobstructed sightlines into the landscaped water gardens.",
        descriptionCol2:
          "Concealed automated linen shading systems disappear flush into the acoustic ceiling pocket when retracted.",
        materials: [
          { name: "Anodized Gunmetal", type: "Slender Glazing Profiles", origin: "Switzerland", finish: "Micro-Bead Blasted" },
          { name: "Organic Raw Linen", type: "Automated Shading", origin: "Flanders, Belgium", finish: "Semi-Sheer Weave" },
        ],
        images: ["/images/rooms/material-3.jpg", "/images/rooms/room-fireplace.jpg"],
      },
    ],
  },
  {
    id: "dining-salon",
    step: "02",
    name: "The Sculptural Dining Salon",
    tagline: "Cast Bronze Lighting & Hand-Applied Lime Plaster",
    quote: "A room calibrated for intimate culinary gatherings and contemplative stillness.",
    footprint: "88 m² / 947 sq ft",
    ceiling: "3.8m Recessed Coffer",
    materialsPreview: "Patinated Architectural Bronze · Fluted Walnut · Micro-Cement",
    image: "/images/rooms/room-2.jpg",
    hotspots: [
      {
        id: "hs-dining-1",
        x: 46,
        y: 52,
        title: "Bespoke Bronze Luminaire & Walnut Dining Plinth",
        subtitle: "Hand-Poured Architectural Bronze & Solid American Walnut",
        heading: "A suspended sculptural centerpiece engineered to diffuse warm candlelight ambiance.",
        descriptionCol1:
          "Each bronze sphere is sand-cast in Milan and patinated by hand, emitting a calibrated 2400K architectural wash across the timber table surface.",
        descriptionCol2:
          "The dining table seats twelve and features bookmatched solid walnut planks joined with hand-cut bronze butterfly keys.",
        materials: [
          { name: "Cast Architectural Bronze", type: "Suspended Chandelier", origin: "Milan, Italy", finish: "Acid-Etched Dark Patina" },
          { name: "American Black Walnut", type: "Monolith Dining Table", origin: "Pennsylvania, USA", finish: "Matte Deep Penetrating Oil" },
        ],
        images: ["/images/rooms/material-2.jpg", "/images/rooms/room-2.jpg"],
      },
    ],
  },
  {
    id: "culinary-atelier",
    step: "03",
    name: "The Culinary Atelier & Bar",
    tagline: "Taj Mahal Quartzite & Concealed Pocket Joinery",
    quote: "Every utensil and function concealed behind continuous bookmatched stone surfaces.",
    footprint: "110 m² / 1,184 sq ft",
    ceiling: "3.6m Shadow Gap",
    materialsPreview: "Taj Mahal Quartzite · Smoked Eucalyptus · Gunmetal Hardware",
    image: "/images/rooms/room-3.jpg",
    hotspots: [
      {
        id: "hs-kitchen-1",
        x: 52,
        y: 56,
        title: "4.8-Meter Monolithic Quartzite Waterfall Island",
        subtitle: "Continuous Vein-Matched Taj Mahal Quartzite",
        heading: "An unbroken mineral island engineered with flush induction and hidden service channels.",
        descriptionCol1:
          "Sourced from the historic quarries of Brazil, Taj Mahal quartzite delivers the visual translucency of onyx with the extreme hardness of granite.",
        descriptionCol2:
          "Concealed pocket doors slide smoothly on Swiss magnetic tracks to reveal an auxiliary staging pantry and temperature-zoned wine cellar.",
        materials: [
          { name: "Taj Mahal Quartzite", type: "Waterfall Counter & Splash", origin: "Ceará, Brazil", finish: "Leathered Velvet Texture" },
          { name: "Smoked Fumed Eucalyptus", type: "Full-Height Pocket Cabinets", origin: "Austria", finish: "Ultra-Matte Natural Poly" },
        ],
        images: ["/images/rooms/material-4.jpg", "/images/rooms/room-3.jpg"],
      },
    ],
  },
  {
    id: "master-sanctuary",
    step: "04",
    name: "The Primary Master Sanctuary",
    tagline: "Acoustic Slatted Timber & Textured Raw Linens",
    quote: "An architectural shelter where the morning sun is modulated into deep restorative calm.",
    footprint: "125 m² / 1,345 sq ft",
    ceiling: "3.8m Perimeter Light Cove",
    materialsPreview: "Acoustic Oak Slats · Natural Wool Carpet · Italian Silk Linen",
    image: "/images/rooms/room-4.jpg",
    hotspots: [
      {
        id: "hs-suite-1",
        x: 35,
        y: 58,
        title: "Acoustic Timber Headboard & Integrated Nightstands",
        subtitle: "German Micro-Slatted Joinery with Integrated Ambient LED",
        heading: "Precision-milled acoustic oak slats engineered to eliminate exterior resonance.",
        descriptionCol1:
          "Behind the natural timber slats lies recycled acoustic fleece that absorbs sound frequencies between 250Hz and 4000Hz, providing whisper-level quiet.",
        descriptionCol2:
          "Integrated floating bedside consoles feature hidden wireless charging coils and machined brass tactile dimmer wheels.",
        materials: [
          { name: "Quarter-Cut White Oak", type: "Acoustic Wall Paneling", origin: "Bavaria, Germany", finish: "Wire-Brushed Natural" },
          { name: "Belgian Raw Linen", type: "Custom Platform Bedding", origin: "Ghent, Belgium", finish: "Stonewashed Organic" },
        ],
        images: ["/images/rooms/material-1.jpg", "/images/rooms/room-4.jpg"],
      },
    ],
  },
  {
    id: "zen-courtyard",
    step: "05",
    name: "The Courtyard & Reflective Pool",
    tagline: "Volcanic Basalt Stone & Desert Skylight Void",
    quote: "The sky framed as living architectural art inside the heart of the residence.",
    footprint: "95 m² / 1,022 sq ft",
    ceiling: "Open-Air Sky Well",
    materialsPreview: "Honed Volcanic Basalt · Architectural Water Basin · Olive Grove",
    image: "/images/rooms/room-5.jpg",
    hotspots: [
      {
        id: "hs-garden-1",
        x: 50,
        y: 65,
        title: "Zero-Edge Volcanic Basalt Reflection Pool",
        subtitle: "Submerged Stepping Pavers & Acoustic Water Weir",
        heading: "A silent mirror of water cooling the desert breeze and reflecting dramatic evening skies.",
        descriptionCol1:
          "Basalt stones carved from ancient lava beds remain cool under direct sunlight and resist mineral staining from natural water evaporation.",
        descriptionCol2:
          "A centenarian olive tree transplanted from Andalusia serves as the sculptural focal point seen from every public corridor.",
        materials: [
          { name: "Charcoal Volcanic Basalt", type: "Pool Basin & Paving", origin: "Mount Etna, Italy", finish: "Flamed & Brushed Anti-Slip" },
          { name: "Black River Pebble", type: "Perimeter Drainage Swale", origin: "Kyoto, Japan", finish: "Natural Water-Worn" },
        ],
        images: ["/images/rooms/material-3.jpg", "/images/rooms/room-5.jpg"],
      },
    ],
  },
  {
    id: "wellness-spa",
    step: "06",
    name: "The Wellness Spa & Monolithic Bath",
    tagline: "Ceppo di Gré Stone & Natural Rain Oculi",
    quote: "Tactile mineral restoration beneath natural zenithal skylight apertures.",
    footprint: "75 m² / 807 sq ft",
    ceiling: "3.8m Oculi Void",
    materialsPreview: "Italian Ceppo di Gré · Thermally Treated Teak · Brushed Gunmetal",
    image: "/images/rooms/room-6.jpg",
    hotspots: [
      {
        id: "hs-bath-1",
        x: 48,
        y: 60,
        title: "Monolithic Ceppo di Gré Soaking Tub",
        subtitle: "Carved from a Single 2.4-Ton Italian Sediment Block",
        heading: "A sculptural bath monolith celebrating dramatic aggregate mineral patterns.",
        descriptionCol1:
          "Quarried in Lake Iseo, Italy, Ceppo di Gré is renowned for its organic pebble aggregate pattern, famously utilized in Milanese modernist palaces.",
        descriptionCol2:
          "A motorized concealed ceiling rain shower releases warm rainfall directly beneath an open glass skylight open to the stars.",
        materials: [
          { name: "Ceppo di Gré", type: "Carved Soaking Tub & Walls", origin: "Lombardy, Italy", finish: "Honed Fine-Grit Water-Sealed" },
          { name: "Brushed Gunmetal PVD", type: "Floor-Mounted Water Column", origin: "Arezzo, Italy", finish: "PVD Scratch-Proof Satin" },
        ],
        images: ["/images/rooms/material-4.jpg", "/images/rooms/room-6.jpg"],
      },
    ],
  },
  {
    id: "sky-terrace",
    step: "07",
    name: "The Panoramic Sky Terrace",
    tagline: "Continuous Terrazzo Plinth & Horizon Fire Well",
    quote: "Where rectilinear interior architecture dissolves seamlessly into the Dubai skyline.",
    footprint: "210 m² / 2,260 sq ft",
    ceiling: "Panoramic Horizon",
    materialsPreview: "Custom Marble Terrazzo · Patinated Bronze Fire Table · Sunken Lounge",
    image: "/images/rooms/room-7.jpg",
    hotspots: [
      {
        id: "hs-terrace-1",
        x: 58,
        y: 52,
        title: "Sunken Conversation Pit & Linear Fire Plinth",
        subtitle: "Bespoke Venetian Terrazzo & Concealed Ethanol Hearth",
        heading: "An elevated open-air salon looking across the Arabian Gulf and Burj Al Arab silhouette.",
        descriptionCol1:
          "Continuous cast-in-place terrazzo with green Alpi and Carrara marble aggregates eliminates floor joints across the entire 210-square-meter terrace.",
        descriptionCol2:
          "The sunken seating area creates intimate wind-protected shelter for evening entertaining around an architectural linear flame.",
        materials: [
          { name: "Venetian Custom Terrazzo", type: "Continuous Seamless Floor", origin: "Veneto, Italy", finish: "Semi-Honed Matte Sealant" },
          { name: "Cast Architectural Bronze", type: "Linear Fire Table Structure", origin: "Dubai Atelier", finish: "Raw Weathering Patina" },
        ],
        images: ["/images/rooms/material-2.jpg", "/images/rooms/room-7.jpg"],
      },
    ],
  },
];

export default function CinematicRoomWalkthrough() {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<RoomHotspot | null>(null);
  const [activePlateIndex, setActivePlateIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const currentRoom = walkthroughRooms[activeRoomIndex];

  // Sound effect helper
  const playSfx = useCallback((soundFile: string) => {
    try {
      const audio = new Audio(`/audio/${soundFile}`);
      audio.volume = 0.25;
      audio.play().catch(() => {});
    } catch {}
  }, []);

  const goToNextRoom = useCallback(() => {
    playSfx("click.mp3");
    setActiveHotspot(null);
    setActiveRoomIndex((prev) => (prev + 1) % walkthroughRooms.length);
  }, [playSfx]);

  const goToPrevRoom = useCallback(() => {
    playSfx("click.mp3");
    setActiveHotspot(null);
    setActiveRoomIndex((prev) => (prev - 1 + walkthroughRooms.length) % walkthroughRooms.length);
  }, [playSfx]);

  const jumpToRoom = (idx: number) => {
    if (idx === activeRoomIndex) return;
    playSfx("click.mp3");
    setActiveHotspot(null);
    setActiveRoomIndex(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeHotspot) {
        if (e.key === "Escape") setActiveHotspot(null);
        return;
      }
      if (e.key === "ArrowRight") goToNextRoom();
      if (e.key === "ArrowLeft") goToPrevRoom();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeHotspot, goToNextRoom, goToPrevRoom]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      goToNextRoom();
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, goToNextRoom]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!sectionRef.current) return;
    if (!document.fullscreenElement) {
      sectionRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleOpenHotspot = (hs: RoomHotspot) => {
    playSfx("pin.mp3");
    setActiveHotspot(hs);
    setActivePlateIndex(0);
  };

  const copyRoomSpecs = () => {
    const text = `VELQON ${currentRoom.name} (${currentRoom.footprint}, ${currentRoom.ceiling}) — Materiality: ${currentRoom.materialsPreview}`;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  return (
    <section
      id="walkthrough"
      ref={sectionRef}
      aria-label="Room-by-Room Architectural Walkthrough"
      className="relative w-full h-screen min-h-[700px] max-h-[1100px] bg-[#08080a] text-[#fafafa] overflow-hidden select-none"
    >
      {/* 1. Full-Bleed Architectural Room Render Background with Crossfade Transition */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {walkthroughRooms.map((room, idx) => {
          const isActive = idx === activeRoomIndex;
          return (
            <div
              key={room.id}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                isActive
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              <Image
                src={room.image}
                alt={room.name}
                fill
                priority={idx <= 1}
                className="object-cover"
                sizes="100vw"
              />
              {/* Luxury architectural shadow overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/35 to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#08080a]/80 via-transparent to-[#08080a]/60" />
            </div>
          );
        })}
      </div>

      {/* 2. Top Header Navigation Bar for Walkthrough */}
      <div className="absolute top-20 md:top-24 left-0 right-0 z-30 px-6 md:px-14 flex items-center justify-between pointer-events-none">
        {/* Left: Space indicator tag */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
            <span className="text-[10px] tracking-[0.28em] text-[#d4d4d4] uppercase font-mono">
              Space {currentRoom.step} / 0{walkthroughRooms.length}
            </span>
          </div>

          <span className="hidden sm:inline-block text-[11px] tracking-[0.2em] text-white/50 uppercase">
            {currentRoom.tagline.split("&")[0].trim()}
          </span>
        </div>

        {/* Right: Controls (Autoplay, Fullscreen, 3D Switch) */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          {/* Autoplay tour button */}
          <button
            onClick={() => {
              setIsAutoPlaying(!isAutoPlaying);
              playSfx("click.mp3");
            }}
            title={isAutoPlaying ? "Pause Automatic Tour" : "Play Cinematic Tour"}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10.5px] tracking-[0.2em] uppercase backdrop-blur-md transition-all cursor-pointer ${
              isAutoPlaying
                ? "bg-[#c5a880] text-black border-[#c5a880] font-medium"
                : "bg-black/50 text-[#d4d4d4] border-white/15 hover:bg-black/80 hover:text-white"
            }`}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span className="hidden md:inline">Playing</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-[#c5a880]" />
                <span className="hidden md:inline">Auto Tour</span>
              </>
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "View Fullscreen"}
            className="p-2 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 text-white/80 hover:text-white backdrop-blur-md transition-all cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Direct link to 3D Floor Model */}
          <Link
            href="/floors/ground-floor"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 text-[10.5px] tracking-[0.2em] text-[#c5a880] uppercase backdrop-blur-md transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3D Model View</span>
          </Link>
        </div>
      </div>

      {/* 3. Interactive Material & Craft Hotspot Pins (👁) */}
      {currentRoom.hotspots.map((hs) => (
        <div
          key={hs.id}
          style={{
            left: `${hs.x}%`,
            top: `${hs.y}%`,
          }}
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group pointer-events-auto"
        >
          {/* Outer radar pulse ring */}
          <span className="absolute -inset-3 rounded-full bg-white/40 animate-ping opacity-60 pointer-events-none" />

          {/* Eye Hotspot Button */}
          <button
            onClick={() => handleOpenHotspot(hs)}
            aria-label={`Inspect ${hs.title}`}
            className="relative w-11 h-11 rounded-full bg-[#f7f7f5] text-black hover:bg-[#c5a880] hover:text-black flex items-center justify-center transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-115 active:scale-95"
          >
            <Eye className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Hover Tooltip Card */}
          <div className="hidden md:group-hover:block absolute left-14 top-1/2 -translate-y-1/2 w-64 bg-[#0c0c10]/95 text-[#fafafa] border border-white/20 p-3.5 rounded-[2px] shadow-2xl backdrop-blur-xl pointer-events-none z-30 transition-all">
            <span className="text-[9px] tracking-[0.28em] text-[#c5a880] uppercase font-mono block">
              Architectural Detail
            </span>
            <p className="text-xs font-serif text-[#fafafa] font-normal leading-snug mt-1">
              {hs.title}
            </p>
            <p className="text-[10px] text-[#8c8c94] tracking-wider mt-1">
              Click 👁 to view material plates & provenance →
            </p>
          </div>
        </div>
      ))}

      {/* 4. Left Side: Editorial Architectural Storytelling Card */}
      <div className="absolute bottom-28 md:bottom-28 left-6 md:left-14 max-w-lg z-20 pointer-events-none">
        <div className="glass-panel-elevated p-6 md:p-8 rounded-[2px] space-y-4 pointer-events-auto max-w-md transition-all duration-500">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-[10.5px] font-mono tracking-[0.3em] text-[#c5a880] uppercase">
              {currentRoom.step} · Spatial Thesis
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#8c8c94] uppercase">
              {currentRoom.footprint}
            </span>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#fafafa] font-normal tracking-tight leading-snug">
              {currentRoom.name}
            </h2>
            <p className="text-xs font-serif italic text-[#c5a880] mt-1 font-light">
              {currentRoom.tagline}
            </p>
          </div>

          <p className="text-xs md:text-sm text-[#b8b8c0] font-light leading-relaxed">
            &ldquo;{currentRoom.quote}&rdquo;
          </p>

          {/* Metrics & Materiality Strip */}
          <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs text-[#8c8c94]">
            <div className="flex justify-between items-center">
              <span className="text-white/45">Primary Materiality:</span>
              <span className="text-[#fafafa] font-light text-right text-[11px] line-clamp-1 ml-2">
                {currentRoom.materialsPreview}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/45">Ceiling Volume:</span>
              <span className="text-[#c5a880] font-mono text-[11px]">{currentRoom.ceiling}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center gap-3">
            {currentRoom.hotspots.length > 0 && (
              <button
                onClick={() => handleOpenHotspot(currentRoom.hotspots[0])}
                className="flex-1 py-2.5 px-3 rounded-[2px] bg-white/[0.08] hover:bg-[#c5a880] text-white hover:text-black border border-white/15 text-[10.5px] tracking-[0.2em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Inspect Materials</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            )}

            <Link
              href={`/contact?ref=${encodeURIComponent(currentRoom.name)}`}
              className="py-2.5 px-3 rounded-[2px] border border-white/15 hover:border-white/30 text-[10.5px] tracking-[0.2em] uppercase text-[#a3a3a8] hover:text-white transition-colors"
            >
              Inquire
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Room Navigation Arrows on Left and Right Viewport */}
      <button
        onClick={goToPrevRoom}
        aria-label="Previous architectural space"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all shadow-2xl cursor-pointer hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNextRoom}
        aria-label="Next architectural space"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all shadow-2xl cursor-pointer hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* 6. Bottom Horizontal Room Scrubber Bar */}
      <div className="absolute bottom-6 left-0 right-0 z-30 px-6 md:px-14 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-none">
        {/* Left: Keyboard helper text */}
        <span className="hidden lg:block text-[9.5px] tracking-[0.25em] text-white/40 uppercase font-mono pointer-events-auto">
          Use [←] and [→] keys to navigate
        </span>

        {/* Center: Numbered Room Pills */}
        <div className="pointer-events-auto flex items-center gap-1.5 md:gap-2 overflow-x-auto max-w-full pb-1 px-2 scrollbar-none">
          {walkthroughRooms.map((room, idx) => {
            const isActive = idx === activeRoomIndex;
            return (
              <button
                key={room.id}
                onClick={() => jumpToRoom(idx)}
                className={`group px-3 md:px-4 py-2 rounded-full text-[10.5px] tracking-[0.16em] uppercase whitespace-nowrap transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? "bg-[#f7f7f5] text-black border-[#f7f7f5] font-medium shadow-[0_4px_20px_rgba(255,255,255,0.2)] scale-105"
                    : "bg-black/60 text-[#a3a3a8] border-white/10 hover:border-white/30 hover:text-white backdrop-blur-md"
                }`}
              >
                <span className={isActive ? "text-[#8a6f47] font-mono mr-1.5" : "text-white/40 font-mono mr-1.5"}>
                  {room.step}
                </span>
                <span className="font-serif">{room.name.replace("The ", "").split("&")[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Copy specs helper */}
        <div className="hidden lg:flex items-center gap-2 pointer-events-auto">
          <button
            onClick={copyRoomSpecs}
            className="text-[9.5px] tracking-[0.25em] text-white/40 hover:text-[#c5a880] uppercase font-mono transition-colors cursor-pointer"
          >
            {copySuccess ? "✓ Specs Copied" : "Copy Spatial Data"}
          </button>
        </div>
      </div>

      {/* 7. Slide-Out Detailed Material Specification Drawer */}
      {activeHotspot && (
        <aside
          role="dialog"
          aria-modal="true"
          className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-[#0e0e12]/95 backdrop-blur-2xl text-[#fafafa] shadow-[-25px_0_70px_rgba(0,0,0,0.85)] flex flex-col justify-between p-7 md:p-10 overflow-y-auto animate-luxury-fade border-l border-white/15"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#c5a880]" />
              <span className="font-serif text-sm tracking-[0.25em] font-medium text-[#fafafa] uppercase">
                VELQON SPECIFICATION
              </span>
              <span className="text-white/30">·</span>
              <span className="text-[10px] tracking-[0.2em] text-[#c5a880] uppercase font-mono">
                {currentRoom.name}
              </span>
            </div>

            <button
              onClick={() => setActiveHotspot(null)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Close specification modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="space-y-6 py-6 flex-1">
            <div>
              <span className="text-[10px] tracking-[0.3em] text-[#c5a880] uppercase font-mono block mb-1">
                Material Palette & Provenance
              </span>
              <h3 className="font-serif text-2xl text-[#fafafa] leading-snug font-normal">
                {activeHotspot.title}
              </h3>
              <p className="text-xs font-serif italic text-[#a3a3a8] mt-1">
                {activeHotspot.subtitle}
              </p>
            </div>

            {/* Editorial Thesis */}
            <div className="space-y-3 text-xs md:text-sm text-[#b8b8c2] font-light leading-relaxed border-l-2 border-[#c5a880] pl-4 py-1">
              <p>{activeHotspot.heading}</p>
            </div>

            {/* Two-column description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-[#9c9ca4] font-light leading-relaxed">
              <p>{activeHotspot.descriptionCol1}</p>
              <p>{activeHotspot.descriptionCol2}</p>
            </div>

            {/* Material Specimen Photography Carousel */}
            {activeHotspot.images.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="relative aspect-[16/10] rounded-[2px] overflow-hidden border border-white/15 shadow-xl bg-black">
                  <Image
                    key={activeHotspot.images[activePlateIndex]}
                    src={activeHotspot.images[activePlateIndex]}
                    alt={activeHotspot.title}
                    fill
                    className="object-cover transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, 550px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10.5px] text-[#8c8c94] font-mono tracking-widest">
                    SPECIMEN PLATE {activePlateIndex + 1} / {activeHotspot.images.length}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setActivePlateIndex(
                          (prev) => (prev - 1 + activeHotspot.images.length) % activeHotspot.images.length
                        )
                      }
                      className="p-2 bg-white/5 hover:bg-[#c5a880] hover:text-black rounded transition-colors cursor-pointer"
                      aria-label="Previous plate"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActivePlateIndex((prev) => (prev + 1) % activeHotspot.images.length)
                      }
                      className="p-2 bg-white/5 hover:bg-[#c5a880] hover:text-black rounded transition-colors cursor-pointer"
                      aria-label="Next plate"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Structured Specifications Grid */}
            <div className="p-4 bg-white/[0.03] rounded-[2px] border border-white/10 space-y-3">
              <span className="text-[10px] tracking-[0.25em] text-[#c5a880] uppercase font-mono block">
                Technical Data & Provenance
              </span>

              <div className="space-y-2.5">
                {activeHotspot.materials.map((mat, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between text-xs py-1.5 border-b border-white/[0.04] last:border-b-0"
                  >
                    <div>
                      <span className="text-[#fafafa] font-medium block">{mat.name}</span>
                      <span className="text-[10px] text-[#73737a] uppercase tracking-wider">{mat.type}</span>
                    </div>
                    <div className="text-left sm:text-right mt-1 sm:mt-0">
                      <span className="text-[#c5a880] font-mono text-[11px] block">{mat.origin}</span>
                      <span className="text-[10px] text-[#8c8c94]">{mat.finish}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={`/contact?ref=${encodeURIComponent(activeHotspot.title)}`}
              className="w-full py-3.5 px-6 rounded-[2px] bg-[#f7f7f5] hover:bg-[#c5a880] text-black text-[11px] tracking-[0.22em] uppercase font-medium text-center transition-all duration-300"
            >
              Commission Similar Space
            </Link>

            <button
              onClick={() => setActiveHotspot(null)}
              className="w-full sm:w-auto py-3.5 px-6 rounded-[2px] border border-white/15 text-[11px] tracking-[0.2em] uppercase text-[#a3a3a8] hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </aside>
      )}
    </section>
  );
}
