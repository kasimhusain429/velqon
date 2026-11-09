"use client";

import { useState } from "react";
import Interactive3DExplorer from "./Interactive3DExplorer";
import { Box, Film, Sparkles } from "lucide-react";

export default function SpatialShowcase() {
  return (
    <section className="relative py-28 md:py-36 bg-[#0a0a0a] text-[#fafafa] border-t border-white/[0.06]">
      <div className="velqon-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c9a96e]" />
              <span className="text-[10px] tracking-[0.35em] text-[#c9a96e] uppercase">
                Interactive Spatial Experience
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-[#fafafa]">
              3D Architectural Interior
            </h2>
            <p className="text-sm text-[#888888] font-light leading-relaxed">
              Explore our architectural spatial model created with Blender 3D and rendered natively in the browser. Rotate, zoom, and inspect tactile materials in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-[0.2em] text-[#a3a3a3] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a96e]" />
              Interactive WebGL
            </span>
          </div>
        </div>

        {/* 3D Model Explorer */}
        <Interactive3DExplorer />
      </div>
    </section>
  );
}

