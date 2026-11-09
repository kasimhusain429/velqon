"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { MessageCircle, Menu, X, ArrowUpRight, Volume2, VolumeX, Sparkles } from "lucide-react";
import { studioInfo } from "@/lib/data";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "PROJECTS", href: "/projects" },
  { label: "WALKTHROUGH", href: "/walkthrough" },
  { label: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.1, ease: "power3.out" }
      );
    }
  }, []);

  const toggleSound = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/floor.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    if (soundEnabled) {
      audioRef.current.pause();
      setSoundEnabled(false);
    } else {
      audioRef.current
        .play()
        .then(() => setSoundEnabled(true))
        .catch(() => setSoundEnabled(false));
    }
  }, [soundEnabled]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#08080a]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.65)] py-4"
            : "bg-[#08080a]/75 backdrop-blur-lg border-b border-white/[0.05] py-5"
        }`}
      >
        <div className="velqon-container flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex flex-col items-start focus:outline-none transition-transform duration-300 hover:translate-x-0.5"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl md:text-3xl tracking-[0.22em] font-normal text-[#f7f7f5] group-hover:text-[#c5a880] transition-colors duration-300">
                VELQON
              </span>
              <span className="w-1 h-1 rounded-full bg-[#c5a880] opacity-80" />
            </div>
            <span className="text-[8.5px] tracking-[0.38em] text-[#8c8c94] uppercase font-light -mt-0.5">
              Dubai · Interior Architecture
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-9">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href === "/walkthrough" &&
                  (pathname === "/walkthrough" || pathname.startsWith("/floors")));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group relative text-[10.5px] tracking-[0.24em] font-medium transition-all duration-300 py-1.5 ${
                    active ? "text-[#f7f7f5]" : "text-[#94949c] hover:text-[#f7f7f5]"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c5a880] rounded-full" />
                  )}
                  {!active && (
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a880]/60 group-hover:w-full transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? "Mute Atmospheric Sound" : "Enable Atmospheric Sound"}
              className={`p-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                soundEnabled
                  ? "bg-[#c5a880]/15 border-[#c5a880] text-[#c5a880]"
                  : "bg-white/[0.03] border-white/10 text-[#8c8c94] hover:text-white hover:border-white/20"
              }`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="text-[9px] tracking-[0.2em] uppercase font-mono pr-1">Audio On</span>
                </>
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Direct WhatsApp Concierge */}
            <a
              href={studioInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Concierge"
              title="Chat with Senior Design Concierge"
              className="flex items-center gap-2 text-[10.5px] tracking-[0.2em] text-[#a3a3a8] hover:text-[#f7f7f5] transition-all px-3 py-2 rounded-full border border-white/10 hover:border-[#c5a880]/40 bg-white/[0.02]"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>WHATSAPP</span>
            </a>

            {/* Book Consultation CTA */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-[10.5px] tracking-[0.22em] uppercase text-[#08080a] bg-[#f7f7f5] hover:bg-[#c5a880] transition-all duration-400 font-medium rounded-[2px] shadow-[0_4px_20px_rgba(255,255,255,0.08)] hover:shadow-[0_8px_25px_rgba(197,168,128,0.35)]"
            >
              <span>CONSULTATION</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobile}
            className="lg:hidden p-2 text-[#fafafa] hover:text-[#c5a880] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#08080a]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-32 lg:hidden">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-[10px] tracking-[0.3em] text-[#c5a880] uppercase">
                Atelier Navigation
              </span>
              <button
                onClick={toggleSound}
                className="flex items-center gap-1.5 text-xs text-[#a3a3a3]"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-[#c5a880]" /> : <VolumeX className="w-4 h-4" />}
                <span>{soundEnabled ? "Audio On" : "Audio Off"}</span>
              </button>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-serif tracking-[0.1em] transition-colors ${
                  pathname === item.href ? "text-[#c5a880]" : "text-[#fafafa] hover:text-[#c5a880]"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="text-xs font-mono tracking-[0.2em] text-[#8c8c94] hover:text-white uppercase pt-4 border-t border-white/10"
            >
              Admin Management Portal →
            </Link>
          </div>

          <div className="flex flex-col gap-4 pt-8 border-t border-white/10">
            <a
              href={studioInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 border border-white/15 text-xs tracking-[0.2em] uppercase text-[#fafafa] bg-white/[0.03]"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Direct Concierge</span>
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center py-3.5 px-4 bg-[#f7f7f5] hover:bg-[#c5a880] text-black text-xs tracking-[0.2em] uppercase font-medium transition-colors"
            >
              Initiate Private Commission
            </Link>
            <p className="text-[11px] text-[#737373] text-center tracking-widest pt-1">
              Alserkal Avenue, Dubai · Palm Jumeirah · Worldwide
            </p>
          </div>
        </div>
      )}
    </>
  );
}
