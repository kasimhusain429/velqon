"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projectsData } from "@/lib/data";

const categories = ["All", "Residential", "Hospitality", "Commercial", "Penthouse"] as const;

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section className="relative py-28 md:py-36 bg-[#08080a] text-[#fafafa] border-t border-white/[0.08]">
      <div className="velqon-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c5a880]" />
              <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase font-mono">
                Selected Commissions
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-[#fafafa]">
              Featured Projects
            </h2>
            <p className="text-sm text-[#8c8c94] font-light">
              Explore our portfolio of private residences, bespoke penthouses, and signature commercial spaces delivered across Dubai and internationally.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-[10.5px] tracking-[0.2em] uppercase rounded-full border transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "bg-[#f7f7f5] text-black border-[#f7f7f5] font-medium shadow-[0_4px_16px_rgba(255,255,255,0.15)]"
                    : "border-white/10 text-[#8c8c94] hover:text-[#fafafa] hover:border-white/30 bg-white/[0.02]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block relative overflow-hidden bg-[#0c0c10] border border-white/[0.08] hover:border-[#c5a880]/50 transition-all duration-500 rounded-[2px] shadow-xl hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
            >
              {/* Image container */}
              <div className="relative aspect-[16/11] overflow-hidden bg-black">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-black/25 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />
                
                {/* Category tag badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-[9px] tracking-[0.25em] uppercase rounded-full bg-black/70 border border-white/20 text-[#fafafa] backdrop-blur-md font-mono">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Info content */}
              <div className="p-6 md:p-8 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#8c8c94] tracking-widest font-mono">
                  <span>{project.location}</span>
                  <span>{project.year}</span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl md:text-3xl text-[#fafafa] group-hover:text-[#c5a880] transition-colors font-normal">
                    {project.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-[#c5a880] group-hover:bg-[#c5a880] text-[#fafafa] group-hover:text-black flex items-center justify-center transition-all shrink-0 ml-4">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-[#8c8c94] font-light line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Specs footer */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-[#73737a] tracking-wider uppercase font-mono">
                  <span>{project.area}</span>
                  <span>{project.duration}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View full archive link */}
        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-[#c5a880] text-xs tracking-[0.24em] uppercase text-[#fafafa] hover:bg-[#f7f7f5] hover:text-black transition-all font-medium rounded-[2px]"
          >
            <span>Explore Complete Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
