"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { projectsData } from "@/lib/data";

const categories = ["All", "Residential", "Hospitality", "Commercial", "Penthouse"] as const;

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filtered = projectsData.filter((p) => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#08080a] text-[#fafafa]">
      <Navbar />

      {/* Header */}
      <section className="relative pt-44 pb-16 border-b border-white/[0.06] overflow-hidden">
        <div className="velqon-container relative z-10 max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#c5a880]" />
            <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase">
              Portfolio & Archives
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05] text-[#fafafa]">
            Selected Architectural Commissions
          </h1>
          <p className="text-base sm:text-lg text-[#a3a3a3] font-light leading-relaxed">
            A curated record of private beachfront villas, sky penthouses, and signature hospitality environments delivered across Dubai and internationally.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 bg-[#0c0c10] border-b border-white/[0.06] sticky top-20 md:top-24 z-30 backdrop-blur-md">
        <div className="velqon-container flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase rounded-full border transition-all ${
                  activeCategory === cat
                    ? "bg-[#fafafa] text-black border-[#fafafa] font-medium"
                    : "border-white/10 text-[#888888] hover:text-[#fafafa] hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, location..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-[#fafafa] placeholder-[#555555] focus:outline-none focus:border-[#c5a880] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-28">
        <div className="velqon-container">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#737373] space-y-3">
              <p className="text-base font-serif">No commissions match your search criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs text-[#c5a880] underline uppercase tracking-wider"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filtered.map((proj) => (
                <Link
                  key={proj.slug}
                  href={`/projects/${proj.slug}`}
                  className="group block bg-[#0c0c10] border border-white/[0.06] hover:border-[#c5a880]/40 transition-all duration-500 rounded-sm overflow-hidden"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={proj.coverImage}
                      alt={proj.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-[9px] tracking-[0.25em] uppercase rounded-full bg-black/60 border border-white/15 text-[#fafafa] backdrop-blur-md">
                        {proj.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 space-y-4">
                    <div className="flex items-center justify-between text-[11px] text-[#737373] tracking-widest font-mono">
                      <span>{proj.location}</span>
                      <span>{proj.year}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl md:text-3xl text-[#fafafa] group-hover:text-[#c5a880] transition-colors">
                        {proj.title}
                      </h3>
                      <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-[#c5a880] group-hover:bg-[#c5a880] text-[#fafafa] group-hover:text-black flex items-center justify-center transition-all shrink-0 ml-4">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-xs text-[#888888] font-light line-clamp-2 leading-relaxed">
                      {proj.tagline}
                    </p>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-[#737373] tracking-wider uppercase font-mono">
                      <span>{proj.area}</span>
                      <span>{proj.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

