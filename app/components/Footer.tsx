"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { studioInfo } from "@/lib/data";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 4000);
  };

  return (
    <footer className="relative bg-[#060608] text-[#fafafa] border-t border-white/[0.08] pt-20 pb-12 overflow-hidden select-none">
      {/* Background glow hairline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/40 to-transparent" />

      <div className="velqon-container">
        {/* Top statement banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.06]">
          <div className="lg:col-span-7">
            <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase mb-4 block font-mono">
              Private Commission & Turnkey Architecture
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-[#fafafa] font-normal">
              Crafting extraordinary spaces that honor silence, proportion, and materiality.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end items-start lg:items-end gap-6">
            <p className="text-sm text-[#8c8c94] font-light max-w-sm leading-relaxed">
              Available for bespoke residential, penthouse, and commercial commissions in Dubai, Abu Dhabi, Riyadh, and worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f7f7f5] text-black text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-[#c5a880] transition-colors rounded-[2px]"
              >
                <span>Initiate Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={studioInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/15 text-[11px] tracking-[0.2em] uppercase text-[#fafafa] hover:border-[#c5a880] hover:text-[#c5a880] transition-colors rounded-[2px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Column links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-white/[0.06]">
          {/* Col 1: Studio info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl tracking-[0.2em] text-[#fafafa]">
                VELQON
              </span>
              <span className="w-1 h-1 rounded-full bg-[#c5a880]" />
            </div>
            <p className="text-xs text-[#8c8c94] leading-relaxed font-light">
              A bespoke architectural interior practice founded in Dubai. We translate raw materials into sculptural residences.
            </p>
            <div className="pt-2 flex items-center gap-4 text-[10.5px] tracking-[0.2em] font-mono">
              <a
                href={studioInfo.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-[#73737a] hover:text-[#c5a880] transition-colors"
              >
                INSTAGRAM
              </a>
              <span className="text-white/20">/</span>
              <a
                href={studioInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-[#73737a] hover:text-[#c5a880] transition-colors"
              >
                LINKEDIN
              </a>
              <span className="text-white/20">/</span>
              <a
                href={studioInfo.socials.behance}
                target="_blank"
                rel="noreferrer"
                className="text-[#73737a] hover:text-[#c5a880] transition-colors"
              >
                BEHANCE
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-[10.5px] tracking-[0.25em] text-[#fafafa] uppercase mb-5 font-mono font-medium">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs tracking-[0.16em]">
              <li>
                <Link href="/" className="inline-block py-1 text-[#8c8c94] hover:text-[#fafafa] transition-colors">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/about" className="inline-block py-1 text-[#8c8c94] hover:text-[#fafafa] transition-colors">
                  THE STUDIO
                </Link>
              </li>
              <li>
                <Link href="/services" className="inline-block py-1 text-[#8c8c94] hover:text-[#fafafa] transition-colors">
                  SERVICES & CRAFT
                </Link>
              </li>
              <li>
                <Link href="/projects" className="inline-block py-1 text-[#8c8c94] hover:text-[#fafafa] transition-colors">
                  PORTFOLIO & ARCHIVE
                </Link>
              </li>
              <li>
                <Link href="/walkthrough" className="inline-block py-1 text-[#8c8c94] hover:text-[#fafafa] transition-colors">
                  SPATIAL WALKTHROUGH
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-block py-1 text-[#8c8c94] hover:text-[#fafafa] transition-colors">
                  CONTACT & ENQUIRIES
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Dubai Office & Contacts */}
          <div>
            <h4 className="text-[10.5px] tracking-[0.25em] text-[#fafafa] uppercase mb-5 font-mono font-medium">
              Dubai Studio
            </h4>
            <div className="space-y-3 text-xs text-[#8c8c94] font-light leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                <span>{studioInfo.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                <a href={`tel:${studioInfo.phone}`} className="hover:text-[#fafafa] transition-colors">
                  {studioInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                <a href={`mailto:${studioInfo.email}`} className="hover:text-[#fafafa] transition-colors">
                  {studioInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Private Dispatch Newsletter */}
          <div>
            <h4 className="text-[10.5px] tracking-[0.25em] text-[#fafafa] uppercase mb-5 font-mono font-medium">
              Private Dispatch
            </h4>
            <p className="text-xs text-[#8c8c94] leading-relaxed mb-4 font-light">
              Receive quarterly private architectural monographs and early access to newly completed residences.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-white/[0.04] border border-[#c5a880]/40 text-xs text-[#c5a880] rounded-[2px]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed to Private Dispatch</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-xs text-[#fafafa] placeholder-[#55555c] focus:outline-none focus:border-[#c5a880] transition-colors rounded-[2px]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-white/10 hover:bg-[#f7f7f5] text-[10.5px] tracking-[0.2em] uppercase text-[#fafafa] hover:text-black font-medium transition-colors rounded-[2px] cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10.5px] text-[#73737a] tracking-wider font-mono">
          <p>© 2026 VELQON Interior Architecture LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Dubai, United Arab Emirates</span>
            <span>·</span>
            <Link href="/admin" className="hover:text-[#c5a880] transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
