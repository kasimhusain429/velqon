"use client";

import { useState } from "react";
import { Layers, X, ArrowUpRight } from "lucide-react";
import { galleryFloors, GalleryFloor } from "@/lib/galleryData";

interface Props {
  currentFloor: GalleryFloor;
  onSelectFloor: (floor: GalleryFloor) => void;
  mode: "isometric" | "walkthrough";
}

export default function GalleryFloorSelector({
  currentFloor,
  onSelectFloor,
  mode,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-4 sm:left-8 z-40">
      {/* Trigger Button - Bottom Left */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0c0c10]/85 hover:bg-[#14141a] text-[#fafafa] shadow-lg backdrop-blur-md transition-all duration-300 text-xs tracking-[0.2em] uppercase font-mono border border-white/15 group cursor-pointer"
      >
        <span>Floors</span>
        <Layers className="w-3.5 h-3.5 text-[#c5a880] transition-transform group-hover:scale-110" />
      </button>

      {/* Floating Floor Selector Modal */}
      {open && (
        <div className="absolute bottom-14 left-0 w-72 bg-[#0c0c10]/95 border border-white/10 rounded-sm shadow-2xl p-6 text-[#fafafa] z-50 animate-fade-in backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <span className="text-[10px] tracking-[0.25em] text-[#c5a880] uppercase font-mono">
              Select Architectural Level
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-[#a3a3a8] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {galleryFloors.map((floor) => {
              const isActive = currentFloor.id === floor.id;
              return (
                <button
                  key={floor.id}
                  onClick={() => {
                    onSelectFloor(floor);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded transition-all text-left cursor-pointer ${isActive
                    ? "bg-white/[0.08] text-white border border-[#c5a880]/40 font-medium"
                    : "hover:bg-white/[0.04] text-[#a3a3a8] hover:text-white"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs w-6 ${isActive ? "text-[#c5a880]" : "text-[#73737a]"
                        }`}
                    >
                      {floor.level}
                    </span>
                    <div>
                      <p className="font-serif text-sm">{floor.name}</p>
                      <p
                        className={`text-[9px] tracking-wider line-clamp-1 ${isActive ? "text-[#c5a880]/80" : "text-[#73737a]"
                          }`}
                      >
                        {floor.tagline}
                      </p>
                    </div>
                  </div>

                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-[#73737a] tracking-wider text-center font-mono">
            <span>VELQON ARCHITECTURAL PAVILION</span>
          </div>
        </div>
      )}
    </div>
  );
}

