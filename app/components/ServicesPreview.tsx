"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { servicesData } from "@/lib/data";

export default function ServicesPreview() {
  return (
    <section className="relative py-28 md:py-36 bg-[#08080a] text-[#fafafa] border-t border-white/[0.08]">
      <div className="velqon-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c5a880]" />
              <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase font-mono">
                Expertise & Capabilities
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-[#fafafa]">
              Services & Craft
            </h2>
            <p className="text-sm text-[#8c8c94] font-light">
              From initial architectural concept to turn-key styling and handover, we manage every facet of interior creation.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#c5a880] hover:text-[#fafafa] transition-colors font-medium"
          >
            <span>View All Detailed Scopes</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((svc) => (
            <div
              key={svc.id}
              className="group p-8 md:p-10 bg-[#0c0c10] border border-white/[0.08] hover:border-[#c5a880]/50 transition-all duration-400 rounded-[2px] shadow-xl hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <span className="font-serif text-3xl text-[#c5a880] font-normal">
                    {svc.number}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-[#8c8c94] uppercase font-mono">
                    {svc.timeline}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-[#fafafa] group-hover:text-[#c5a880] transition-colors font-normal">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-[#c5a880] tracking-[0.1em] font-light">
                    {svc.tagline}
                  </p>
                </div>

                <p className="text-xs text-[#8c8c94] font-light leading-relaxed">
                  {svc.description}
                </p>

                {/* Scope highlights */}
                <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
                  {svc.scope.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-[11px] text-[#b8b8c0]">
                      <Check className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={`/contact?service=${encodeURIComponent(svc.title)}`}
                  className="w-full inline-flex items-center justify-between py-3 px-4 border border-white/10 group-hover:border-[#c5a880] text-[10.5px] tracking-[0.2em] uppercase text-[#fafafa] group-hover:bg-[#c5a880] group-hover:text-black font-medium transition-all rounded-[2px]"
                >
                  <span>Commission Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
