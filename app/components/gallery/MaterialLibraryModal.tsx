"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Layers, Sparkles, Filter, Check, ArrowRight } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRequestSample?: (materialName: string) => void;
}

interface MaterialSpec {
  id: string;
  name: string;
  category: "stone" | "porcelain" | "wood" | "metal";
  categoryLabel: string;
  origin: string;
  finish: string;
  thickness: string;
  image: string;
  description: string;
  features: string[];
}

const materialsData: MaterialSpec[] = [
  {
    id: "mat-1",
    name: "Roman Travertine Navona",
    category: "stone",
    categoryLabel: "Natural Stone",
    origin: "Tivoli Quarries, Italy",
    finish: "Honed Matte & Water-repellent Infused",
    thickness: "20mm / 30mm Solid Slab",
    image: "/images/rooms/room-1.jpg",
    description: "Classic Italian porous limestone celebrated for its warm ivory hues, horizontal sediment banding, and tactile warmth.",
    features: ["Cross-cut vein alignment", "UV & Thermal stable", "Seamless monolithic edge-bonding"],
  },
  {
    id: "mat-2",
    name: "Calacatta Viola Borghini",
    category: "stone",
    categoryLabel: "Natural Stone",
    origin: "Carrara, Tuscany, Italy",
    finish: "Silken Leathered / Bookmatched",
    thickness: "20mm",
    image: "/images/rooms/room-3.jpg",
    description: "Dramatic deep burgundy, plum, and cabernet veins intersecting an antique cream calcite background.",
    features: ["Bookmatched mirror symmetry", "High abrasion resistance", "Exclusive extraction lot"],
  },
  {
    id: "mat-3",
    name: "Fior di Bosco Sintered Surface",
    category: "porcelain",
    categoryLabel: "Architectural Porcelain",
    origin: "Fiorano Modenese, Italy",
    finish: "Natural Satin Soft-Touch",
    thickness: "6mm / 12mm / 20mm MaxFine",
    image: "/images/projects/project-1.jpg",
    description: "Refined graphite-grey surface traversed by delicate amber and silver micro-veins. Zero-porosity engineered porcelain.",
    features: ["Zero moisture absorption (0.05%)", "Direct induction cooking compatible", "100% Recyclable mineral clay"],
  },
  {
    id: "mat-4",
    name: "Smoked French Oak Fluted",
    category: "wood",
    categoryLabel: "Fine Woods",
    origin: "Black Forest, Germany / Vosges, France",
    finish: "Brushed Organic Wax Oil",
    thickness: "18mm Profiled Batten",
    image: "/images/rooms/room-2.jpg",
    description: "Fumed slow-growth European oak exhibiting deep charred mocha undertones and prominent acoustic fluting.",
    features: ["FSC 100% Certified sustainable", "Integrated acoustic diffusion", "Low VOC emission certified"],
  },
  {
    id: "mat-5",
    name: "PVD Brushed Gunmetal",
    category: "metal",
    categoryLabel: "Architectural Metals",
    origin: "Milan, Italy",
    finish: "Vapor Deposition Satin Sheen",
    thickness: "2.5mm Stainless Base",
    image: "/images/projects/project-2.jpg",
    description: "Ultra-hard vacuum physical vapor deposition layer delivering an iridescent graphite-bronze finish with fingerprint resistance.",
    features: ["10x Scratch resistance vs lacquer", "Corrosion immune", "Marine-grade 316L substrate"],
  },
  {
    id: "mat-6",
    name: "Ceppo di Gré Stone Monolith",
    category: "stone",
    categoryLabel: "Natural Stone",
    origin: "Lake Iseo, Lombardy, Italy",
    finish: "Honed Micro-Porous",
    thickness: "30mm / 50mm",
    image: "/images/rooms/room-4.jpg",
    description: "Distinctive dolomitic conglomerate rock rich in rounded sedimentary pebbles, defining Milanese modernist architecture.",
    features: ["Exceptional freeze-thaw durability", "Tactile pebble mosaic surface", "Ideal for cantilevered steps"],
  },
];

export default function MaterialLibraryModal({ isOpen, onClose, onRequestSample }: Props) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [sampleOrdered, setSampleOrdered] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const filteredMaterials = selectedFilter === "all"
    ? materialsData
    : materialsData.filter((m) => m.category === selectedFilter);

  const handleSampleRequest = (material: MaterialSpec) => {
    setSampleOrdered((prev) => ({ ...prev, [material.id]: true }));
    if (onRequestSample) {
      onRequestSample(material.name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#0c0c10] border border-white/10 rounded-sm shadow-2xl flex flex-col text-[#fafafa] overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-6 sm:px-10 py-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#c5a880]" />
              <span className="text-[10px] tracking-[0.25em] text-[#c5a880] uppercase font-mono">
                VELQON Architectural Archive
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#fafafa] mt-1">
              Material & Surface Library
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#a3a3a8] hover:text-white hover:border-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-6 sm:px-10 py-3.5 border-b border-white/10 flex items-center gap-2 overflow-x-auto bg-[#08080a]">
          <span className="text-[11px] font-mono tracking-widest text-[#8c8c94] uppercase mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#c5a880]" /> Filter:
          </span>
          {[
            { id: "all", label: "All Palette" },
            { id: "stone", label: "Natural Stone" },
            { id: "porcelain", label: "Architectural Porcelain" },
            { id: "wood", label: "Fine Woods" },
            { id: "metal", label: "Architectural Metals" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === tab.id
                  ? "bg-[#c5a880] text-black font-medium"
                  : "bg-white/[0.04] hover:bg-white/[0.08] text-[#a3a3a8] hover:text-[#fafafa] border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Materials Grid */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scrollbar-thin scrollbar-thumb-white/10">
          {filteredMaterials.map((mat) => (
            <div
              key={mat.id}
              className="group bg-white/[0.02] rounded-sm border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#c5a880]/40 transition-all"
            >
              <div>
                {/* Surface Preview Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <Image
                    src={mat.image}
                    alt={mat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase bg-black/70 text-[#c5a880] border border-white/10 backdrop-blur-sm">
                      {mat.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif text-lg text-[#fafafa] leading-snug group-hover:text-[#c5a880] transition-colors">
                      {mat.name}
                    </h3>
                    <p className="text-[11px] font-mono text-[#c5a880] mt-0.5">
                      {mat.origin}
                    </p>
                  </div>

                  <p className="text-xs text-[#a3a3a8] font-light leading-relaxed">
                    {mat.description}
                  </p>

                  <div className="pt-2 border-t border-white/10 space-y-1 text-[11px] text-[#8c8c94]">
                    <div className="flex justify-between">
                      <span className="text-[#73737a]">Finish:</span>
                      <span className="font-medium text-[#fafafa]">{mat.finish}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#73737a]">Thickness:</span>
                      <span className="font-mono text-[#fafafa]">{mat.thickness}</span>
                    </div>
                  </div>

                  {/* Micro features */}
                  <div className="pt-2 flex flex-wrap gap-1">
                    {mat.features.map((feat, i) => (
                      <span
                        key={i}
                        className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-[#c5a880] border border-white/5 font-light"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sample Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => handleSampleRequest(mat)}
                  className={`w-full py-2.5 px-3 rounded text-xs font-serif tracking-[0.15em] uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    sampleOrdered[mat.id]
                      ? "bg-[#c5a880] text-black font-medium"
                      : "bg-white/[0.04] hover:bg-[#c5a880] hover:text-black text-[#fafafa] border border-white/10"
                  }`}
                >
                  {sampleOrdered[mat.id] ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Sample Box Requested
                    </>
                  ) : (
                    <>Request Architectural Sample</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-10 py-4 bg-[#08080a] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8c8c94] gap-2">
          <span>Physical sample kits delivered worldwide within 48 hours to registered practices.</span>
          <span className="font-mono text-[#c5a880]">spec@velqon.com</span>
        </div>
      </div>
    </div>
  );
}

