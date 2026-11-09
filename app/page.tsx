import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PhilosophySection from "./components/PhilosophySection";
import AwardsTicker from "./components/AwardsTicker";
import FeaturedProjects from "./components/FeaturedProjects";
import ServicesPreview from "./components/ServicesPreview";
import Footer from "./components/Footer";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import { studioInfo } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08080a] text-[#fafafa] selection:bg-[#c5a880] selection:text-black">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Flagship 3D Architectural Spatial Explorer Hero */}
      <section id="hero" className="relative w-full">
        <Hero />
      </section>

      {/* 3. Studio Philosophy & Architectural Milestones */}
      <PhilosophySection />

      {/* 4. Awards & Global Recognition Ticker */}
      <AwardsTicker />

      {/* 5. Featured Projects / Selected Commissions Portfolio Grid */}
      <FeaturedProjects />

      {/* 6. Capabilities & Architectural Services */}
      <ServicesPreview />

      {/* 7. High-Impact Consultation Concierge Banner */}
      <section className="relative py-24 md:py-32 bg-[#0c0c10] border-t border-white/[0.08] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#c5a880]/10 via-transparent to-transparent pointer-events-none" />

        <div className="velqon-container relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
              <span className="text-[10px] tracking-[0.3em] text-[#c5a880] uppercase font-mono">
                Initiate Private Commission
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-[#fafafa]">
              Ready to sculpt your next architectural residence?
            </h2>
            <p className="text-sm md:text-base text-[#a3a3a8] font-light leading-relaxed">
              We welcome private consultations for discerning homeowners, estate developers, and global collectors seeking bespoke interior architecture in Dubai and worldwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#f7f7f5] hover:bg-[#c5a880] text-black text-[11px] tracking-[0.24em] uppercase font-medium rounded-[2px] transition-all shadow-[0_10px_35px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_35px_rgba(197,168,128,0.35)]"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href={studioInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 border border-white/20 hover:border-[#c5a880] bg-white/[0.03] hover:bg-white/[0.08] text-[#f7f7f5] text-[11px] tracking-[0.2em] uppercase font-light rounded-[2px] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. Comprehensive Architectural Studio Footer */}
      <Footer />
    </main>
  );
}
