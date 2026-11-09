import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { servicesData, studioInfo } from "@/lib/data";

export const metadata = {
  title: "Services & Architectural Capabilities",
  description:
    "Explore VELQON's services: Residential Interior Architecture, Hospitality & Commercial, Bespoke Millwork, Turnkey Fit-out, 3D CGI, and Lighting Design.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#08080a] text-[#fafafa]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-44 pb-20 border-b border-white/[0.06] overflow-hidden">
        <div className="velqon-container relative z-10 max-w-3xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#c5a880]" />
            <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase">
              Capabilities & Craft
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05] text-[#fafafa]">
            Architecture, Interiors, and Millwork.
          </h1>
          <p className="text-base sm:text-lg text-[#a3a3a3] font-light leading-relaxed">
            From single-room spatial interventions to sprawling 25,000 sq ft beachfront estates, we provide end-to-end design, engineering, and turnkey execution.
          </p>
        </div>
      </section>

      {/* Services Detailed List */}
      <section className="py-24 md:py-32">
        <div className="velqon-container space-y-28">
          {servicesData.map((svc, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={svc.id}
                id={svc.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-16 border-t border-white/[0.08]"
              >
                {/* Visual Image Column */}
                <div
                  className={`lg:col-span-5 relative ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="font-serif text-3xl text-[#c5a880]">
                        {svc.number}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[10px] tracking-[0.25em] text-[#c5a880] uppercase font-light">
                      {svc.tagline}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#fafafa]">
                      {svc.title}
                    </h2>
                  </div>

                  <p className="text-sm text-[#a3a3a3] font-light leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.06]">
                    {/* Scope list */}
                    <div className="space-y-2.5">
                      <h4 className="text-[10px] tracking-[0.2em] text-[#fafafa] uppercase font-medium">
                        Core Scope
                      </h4>
                      <ul className="space-y-2">
                        {svc.scope.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#888888]">
                            <Check className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables list */}
                    <div className="space-y-2.5">
                      <h4 className="text-[10px] tracking-[0.2em] text-[#fafafa] uppercase font-medium">
                        Deliverables
                      </h4>
                      <ul className="space-y-2">
                        {svc.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#888888]">
                            <Check className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs text-[#737373] tracking-widest font-mono">
                      <span>EST. TIMELINE: </span>
                      <span className="text-[#fafafa]">{svc.timeline}</span>
                    </div>

                    <Link
                      href={`/contact?service=${encodeURIComponent(svc.title)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#fafafa] text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#c5a880] transition-colors"
                    >
                      <span>Enquire For This Service</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 border-t border-white/[0.06] bg-[#0c0c10] text-center">
        <div className="velqon-container max-w-2xl space-y-6">
          <h2 className="font-serif text-3xl md:text-5xl text-[#fafafa]">
            Have a custom brief in mind?
          </h2>
          <p className="text-sm text-[#888888] font-light">
            We regularly collaborate with private collectors, international developers, and architectural studios on custom scopes.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#fafafa] text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#c5a880] transition-colors"
            >
              <span>Initiate Direct Dialogue</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

