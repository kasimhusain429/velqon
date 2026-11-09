import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Shield, Award, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AwardsTicker from "../components/AwardsTicker";
import { teamMembers, studioInfo } from "@/lib/data";

export const metadata = {
  title: "About The Studio",
  description:
    "Learn about VELQON's design philosophy, founding story in Dubai, and leadership team crafting quiet luxury residences.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#08080a] text-[#fafafa]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-44 pb-24 border-b border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent pointer-events-none" />
        <div className="velqon-container relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c5a880]" />
              <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase">
                The Studio · Story & Vision
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05] text-[#fafafa]">
              We craft interiors that speak in silence.
            </h1>
            <p className="text-base sm:text-lg text-[#a3a3a3] font-light leading-relaxed">
              Founded in Dubai in 2018, VELQON is an architectural interior design atelier devoted to the principles of proportion, shadow, and uncompromised materiality.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative & Philosophy Grid */}
      <section className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="velqon-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/rooms/room-2.jpg"
                  alt="VELQON Studio Interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[9px] tracking-[0.25em] text-[#c5a880] uppercase block">
                    Dubai Atelier
                  </span>
                  <p className="font-serif text-lg text-white">
                    Alserkal Avenue Design District
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.3em] text-[#737373] uppercase">
                  Our Background
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#fafafa] leading-snug">
                  Rejecting superficial trends in favor of enduring architectural calm.
                </h2>
              </div>

              <div className="space-y-4 text-sm text-[#a3a3a3] font-light leading-relaxed">
                <p>
                  VELQON was founded to challenge the saturated, glittery aesthetic that often defines modern development. We recognized that true global collectors and tastemakers long for sanctuaries—homes where the mind can decelerate and find stillness.
                </p>
                <p>
                  Every commission begins with a study of light. We map how the desert sun travels across your spatial footprint, positioning monolithic stone elements, micro-textured lime plaster, and acoustic timber joinery so that the home transforms organically throughout the day.
                </p>
                <p>
                  With in-house master joinery ateliers and direct supply partnerships with historic stone quarries in Tivoli and Carrara, we maintain end-to-end quality control from the raw mineral block to final white-glove styling.
                </p>
              </div>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#c5a880]">
                    <Compass className="w-4 h-4" />
                    <span className="text-xs tracking-wider uppercase font-medium">Proportion</span>
                  </div>
                  <p className="text-xs text-[#737373] leading-relaxed">
                    Golden ratio alignments and generous ceiling clearances that induce immediate calm.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#c5a880]">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs tracking-wider uppercase font-medium">Authenticity</span>
                  </div>
                  <p className="text-xs text-[#737373] leading-relaxed">
                    Real materials that patinate beautifully over decades: stone, unlacquered bronze, and linen.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#c5a880]">
                    <Award className="w-4 h-4" />
                    <span className="text-xs tracking-wider uppercase font-medium">Precision</span>
                  </div>
                  <p className="text-xs text-[#737373] leading-relaxed">
                    0.5mm joinery tolerances and zero-gap architectural flush trims throughout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="velqon-container">
          <div className="max-w-2xl space-y-4 mb-16">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c5a880]" />
              <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase">
                Studio Leadership
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-[#fafafa]">
              The Principals Behind The Work
            </h2>
            <p className="text-sm text-[#888888] font-light">
              Architects, industrial engineers, and material curators united by a singular standard of craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group p-6 bg-[#0c0c10] border border-white/[0.06] rounded-sm space-y-5"
              >
                <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-black">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover filter grayscale contrast-125 group-hover:filter-none transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl text-[#fafafa] group-hover:text-[#c5a880] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#c5a880] tracking-[0.1em] uppercase font-light">
                    {member.role}
                  </p>
                  <p className="text-[10px] text-[#737373] tracking-widest font-mono">
                    {member.qualification}
                  </p>
                </div>

                <p className="text-xs text-[#888888] font-light leading-relaxed pt-3 border-t border-white/[0.06]">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-24 md:py-32 border-b border-white/[0.06] bg-[#0c0c10]">
        <div className="velqon-container">
          <div className="max-w-2xl space-y-4 mb-16">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c5a880]" />
              <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase">
                Methodology
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-[#fafafa]">
              Our Turnkey Creation Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Spatial Narrative & Discovery",
                desc: "We analyze site solar orientation, circulation habits, and acoustic conditions before presenting curated conceptual masterplans.",
              },
              {
                step: "02",
                title: "3D Digital Twin & Materials",
                desc: "Every room is modeled in high-resolution 3D CGI with exact material shaders, accompanied by physical quarry stone and timber sample boxes.",
              },
              {
                step: "03",
                title: "Bespoke Joinery & Fit-Out",
                desc: "Fabricated with Swiss precision in our dedicated ateliers. Complete MEP, smart lighting, and zero-tolerance architectural wall installations.",
              },
              {
                step: "04",
                title: "White-Glove Turnkey Handover",
                desc: "Artwork hung, bespoke scented candles lit, custom linens pressed. We hand over the keys to a completely realized, living work of art.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-8 bg-[#08080a] border border-white/[0.06] rounded-sm space-y-4 relative"
              >
                <span className="font-serif text-3xl text-[#c5a880] block">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl text-[#fafafa] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#888888] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Ticker */}
      <AwardsTicker />

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="velqon-container max-w-2xl space-y-6">
          <h2 className="font-serif text-3xl md:text-5xl text-[#fafafa]">
            Ready to conceive your private residence?
          </h2>
          <p className="text-sm text-[#888888] font-light">
            We accept a strictly limited number of private residential and commercial commissions each year to ensure uncompromising principal-led attention.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#fafafa] text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#c5a880] transition-colors"
            >
              <span>Schedule Initial Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

