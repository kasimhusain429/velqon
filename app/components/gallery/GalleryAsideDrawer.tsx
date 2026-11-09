"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Layers, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { GalleryHotspot } from "@/lib/galleryData";

interface Props {
  hotspot: GalleryHotspot | null;
  onClose: () => void;
  onOpenMaterials?: () => void;
  onOpenContact?: () => void;
}

export default function GalleryAsideDrawer({
  hotspot,
  onClose,
  onOpenMaterials,
  onOpenContact,
}: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when hotspot changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [hotspot?.id]);

  if (!hotspot) return null;

  const images = hotspot.images && hotspot.images.length > 0
    ? hotspot.images
    : ["/images/rooms/room-1.jpg"];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-label={hotspot.name}
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[540px] md:w-[620px] lg:w-[680px] bg-[#0c0c10]/98 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col text-[#fafafa] transition-transform duration-500 ease-out"
    >
      {/* Top Bar / Category and Close */}
      <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c5a880]" />
          <span className="text-[11px] tracking-[0.25em] uppercase font-mono text-[#c5a880] font-medium">
            {hotspot.category || "ARCHITECTURAL ATELIER"}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close Specification Drawer"
          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#a3a3a8] hover:text-white hover:border-white transition-all duration-200 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Editorial Content */}
      <div className="flex-1 overflow-y-auto px-8 md:px-12 py-8 space-y-10 scrollbar-thin scrollbar-thumb-white/10">
        {/* Title & Subheading */}
        <div>
          <span className="text-xs font-mono tracking-widest text-[#c5a880] uppercase block mb-2">
            Vantage Point Focus
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-[#fafafa] font-normal tracking-tight leading-tight">
            {hotspot.title}
          </h2>
          <p className="text-sm font-serif italic text-[#a3a3a8] mt-2">
            {hotspot.subtitle}
          </p>
        </div>

        {/* High-Resolution Architectural Carousel */}
        <div className="relative group rounded-sm overflow-hidden bg-[#14141a] border border-white/10 shadow-md">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={images[currentImageIndex]}
              alt={`${hotspot.name} perspective ${currentImageIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 680px"
              className="object-cover transition-opacity duration-300"
              priority
            />
          </div>

          {images.length > 1 && (
            <>
              {/* Carousel Navigation Buttons */}
              <button
                onClick={handlePrevImage}
                aria-label="Previous view"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-80 hover:opacity-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextImage}
                aria-label="Next view"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-80 hover:opacity-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots / Indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentImageIndex ? "w-5 bg-[#c5a880]" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Overview Thesis */}
        <div className="border-l-2 border-[#c5a880] pl-5 py-1">
          <p className="font-serif text-base md:text-lg text-[#eaeaea] leading-relaxed">
            {hotspot.overview}
          </p>
        </div>

        {/* Two-Column Editorial Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm text-[#a3a3a8] leading-relaxed font-light">
          <div>
            <p>{hotspot.descriptionCol1}</p>
          </div>
          <div>
            <p>{hotspot.descriptionCol2}</p>
          </div>
        </div>

        {/* Architectural Materials Breakdown */}
        {hotspot.materials && hotspot.materials.length > 0 && (
          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#c5a880]" />
                <h3 className="text-xs font-serif tracking-[0.2em] uppercase text-[#fafafa] font-medium">
                  Material Palette & Surface Specs
                </h3>
              </div>
              {onOpenMaterials && (
                <button
                  onClick={onOpenMaterials}
                  className="text-[11px] font-mono tracking-wider text-[#c5a880] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Full Catalog <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              {hotspot.materials.map((mat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded bg-white/[0.03] border border-white/[0.08] hover:border-[#c5a880]/30 transition-all flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-serif text-sm text-[#fafafa] font-normal">{mat.name}</h4>
                    <p className="text-[11px] text-[#8c8c94] mt-0.5">
                      {mat.type} · {mat.origin}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-[#c5a880] border border-white/10">
                    {mat.finish}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interaction / Inquire CTA Box */}
        <div className="p-6 rounded bg-[#14141a] border border-white/10 text-[#fafafa] space-y-4">
          <div className="flex items-center gap-2 text-[#c5a880]">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase">
              Private Architectural Curation
            </span>
          </div>
          <p className="text-xs text-[#a3a3a8] font-light leading-relaxed">
            Specify this spatial configuration or schedule a physical material review with our senior design associates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onOpenContact}
              className="flex-1 px-4 py-2.5 bg-[#c5a880] hover:bg-[#d6ba94] text-black text-xs tracking-[0.18em] uppercase font-serif font-medium rounded transition-colors text-center cursor-pointer"
            >
              Request Spec Sheet
            </button>
            <button
              onClick={onOpenContact}
              className="px-4 py-2.5 border border-white/20 hover:border-[#c5a880] text-white text-xs tracking-[0.18em] uppercase font-serif rounded transition-colors text-center cursor-pointer"
            >
              Book Atelier Visit
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

