import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-28 md:py-36 bg-[#08080a] text-[#fafafa] overflow-hidden border-t border-white/[0.08]">
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] flex justify-between px-8 md:px-24">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      <div className="velqon-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c5a880]" />
              <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase font-mono">
                Design Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-[#fafafa]">
              Silence, Proportion, Materiality.
            </h2>

            <p className="text-sm md:text-base text-[#a3a3a8] font-light leading-relaxed">
              At VELQON, we believe that genuine luxury is never loud. It lives in the exact alignment of a shadow gap, the weight of solid Roman travertine beneath barefoot footsteps, and the way afternoon daylight is sculpted as it enters a room.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="font-serif text-3xl md:text-4xl text-[#fafafa] block">150+</span>
                <span className="text-[10px] tracking-[0.2em] text-[#8c8c94] uppercase mt-1 block font-mono">
                  Residences Delivered
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl md:text-4xl text-[#fafafa] block">18</span>
                <span className="text-[10px] tracking-[0.2em] text-[#8c8c94] uppercase mt-1 block font-mono">
                  Design Awards
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl md:text-4xl text-[#fafafa] block">0.5mm</span>
                <span className="text-[10px] tracking-[0.2em] text-[#8c8c94] uppercase mt-1 block font-mono">
                  Joinery Tolerance
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-xs tracking-[0.25em] text-[#fafafa] hover:text-[#c5a880] uppercase font-medium group transition-colors"
              >
                <span>Read Our Full Story</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <Image
                src="/images/rooms/room-3.jpg"
                alt="VELQON Architectural Materiality"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 space-y-2">
                <span className="text-[9px] tracking-[0.3em] text-[#c5a880] uppercase font-mono block">
                  Atelier Focus · Dubai
                </span>
                <p className="font-serif text-xl md:text-2xl text-[#fafafa] leading-snug">
                  &ldquo;A house is not a machine for living; it is an instrument of quietude.&rdquo;
                </p>
                <span className="text-[10.5px] text-[#a3a3a8] tracking-widest block font-light">
                  — Tariq Al-Mansoor, Principal Architect
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
