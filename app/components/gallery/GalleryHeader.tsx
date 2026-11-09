"use client";

import Link from "next/link";
import { Layers, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";

interface Props {
  onOpenContact: () => void;
  onOpenMaterials: () => void;
  onOpenLocations: () => void;
}

export default function GalleryHeader({
  onOpenContact,
  onOpenMaterials,
  onOpenLocations,
}: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 flex items-center justify-between text-[#222222] pointer-events-none">
      {/* Brand Logo - Top Left */}
      <div className="pointer-events-auto">
        <Link
          href="/"
          className="group flex items-center gap-2 font-serif text-xl md:text-2xl tracking-[0.18em] uppercase text-[#1a1a1a] hover:opacity-75 transition-opacity"
        >
          <span>VELQON</span>
          <span className="text-[#8c7b64] text-lg font-sans">✿</span>
          <span className="font-light tracking-[0.25em] text-sm md:text-base">GALLERY</span>
        </Link>
      </div>

      {/* Center Galleries Dropdown Indicator */}
      <div className="hidden md:flex items-center pointer-events-auto">
        <button
          onClick={onOpenLocations}
          className="text-xs tracking-[0.25em] uppercase text-[#2c2c2c] hover:text-black font-serif transition-colors px-4 py-2 border-b border-transparent hover:border-black/30"
        >
          Galleries
        </button>
      </div>

      {/* Right Navigation & Material Library Icon */}
      <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-light pointer-events-auto">
        <button
          onClick={onOpenLocations}
          className="hover:underline text-[#2c2c2c] transition-all"
        >
          Locations
        </button>
        <button
          onClick={onOpenContact}
          className="hover:underline text-[#2c2c2c] transition-all"
        >
          Contact
        </button>

        {/* Material Library Icon (Stacked Squares) */}
        <button
          onClick={onOpenMaterials}
          aria-label="Material Library"
          className="p-2 text-[#2c2c2c] hover:text-black transition-transform hover:scale-110"
          title="Explore Material Library"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden pointer-events-auto">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-black focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#d8d2c4]/98 backdrop-blur-xl z-50 flex flex-col justify-between p-8 pt-24 md:hidden pointer-events-auto">
          <div className="flex justify-between items-center pb-6 border-b border-black/10">
            <span className="font-serif text-xl tracking-[0.2em] uppercase">VELQON GALLERY</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6 text-xl font-serif">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLocations();
              }}
              className="text-left py-2 border-b border-black/10"
            >
              Galleries & Locations
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMaterials();
              }}
              className="text-left py-2 border-b border-black/10"
            >
              Material & Finish Archive
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left py-2 border-b border-black/10"
            >
              Contact & Inquiries
            </button>
          </div>

          <div className="pt-8 border-t border-black/10 text-xs text-[#555555] space-y-2">
            <p>Alserkal Avenue, Dubai · Via Montenapoleone, Milan</p>
            <p>© 2026 VELQON Architectural Ceramics & Interiors</p>
          </div>
        </div>
      )}
    </header>
  );
}

