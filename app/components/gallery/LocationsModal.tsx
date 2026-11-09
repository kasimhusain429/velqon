"use client";

import { X, MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectContact?: () => void;
}

const locations = [
  {
    city: "Milan Atelier",
    region: "Italy",
    address: "Via Solferino 11, Brera Design District, 20121 Milano MI",
    hours: "Mon – Fri: 09:30 – 19:00 · Sat by appointment",
    phone: "+39 02 8905 4412",
    email: "milano@velqon.com",
    focus: "Global Material Archive & Marble Ateliers",
  },
  {
    city: "Dubai Gallery",
    region: "UAE",
    address: "Building 7, Suite 402, Dubai Design District (d3), Dubai",
    hours: "Sun – Thu: 10:00 – 20:00 · Fri: 14:00 – 20:00",
    phone: "+971 4 567 8900",
    email: "dubai@velqon.com",
    focus: "Ultra-Luxury Residential & Hospitality Showcase",
  },
  {
    city: "London Mayfair",
    region: "United Kingdom",
    address: "14 Berkeley Square, Mayfair, London W1J 6BD",
    hours: "Mon – Fri: 10:00 – 18:30 · Private viewings on request",
    phone: "+44 20 7493 8810",
    email: "london@velqon.com",
    focus: "Bespoke Architectural Stonework & Joinery",
  },
  {
    city: "New York Studio",
    region: "United States",
    address: "520 West 28th Street, Chelsea High Line, New York, NY 10001",
    hours: "Mon – Fri: 09:00 – 18:00",
    phone: "+1 212 929 7700",
    email: "newyork@velqon.com",
    focus: "Monumental Slabs & Monolithic Islands",
  },
];

export default function LocationsModal({ isOpen, onClose, onSelectContact }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c10] border border-white/10 rounded-sm shadow-2xl flex flex-col text-[#fafafa] overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-10 py-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#c5a880] uppercase font-mono block">
              International Network
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#fafafa] mt-1">
              VELQON Galleries & Ateliers
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#a3a3a8] hover:text-white hover:border-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Locations Grid */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 scrollbar-thin scrollbar-thumb-white/10">
          {locations.map((loc) => (
            <div
              key={loc.city}
              className="p-6 rounded-sm bg-white/[0.03] border border-white/10 hover:border-[#c5a880]/30 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono tracking-widest text-[#c5a880] uppercase">
                    {loc.region}
                  </span>
                  <MapPin className="w-4 h-4 text-[#c5a880]" />
                </div>
                <h3 className="font-serif text-xl text-[#fafafa] group-hover:text-[#c5a880] transition-colors">
                  {loc.city}
                </h3>
                <p className="text-xs font-serif italic text-[#a3a3a8] mt-1 mb-4">
                  {loc.focus}
                </p>

                <div className="space-y-2 text-xs text-[#8c8c94]">
                  <p className="flex items-start gap-2">
                    <span className="w-4 flex-shrink-0 text-[#c5a880]">·</span>
                    <span>{loc.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#c5a880] flex-shrink-0" />
                    <span>{loc.hours}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#c5a880] flex-shrink-0" />
                    <span className="font-mono">{loc.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#c5a880] flex-shrink-0" />
                    <span>{loc.email}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    onClose();
                    if (onSelectContact) onSelectContact();
                  }}
                  className="text-xs font-serif tracking-[0.15em] uppercase text-[#c5a880] hover:text-[#d6ba94] flex items-center gap-1 group-hover:underline cursor-pointer"
                >
                  Schedule Private Visit <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-10 py-4 bg-stone-100 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#706c64] gap-2">
          <span>Global Concierge: concierge@velqon.com</span>
          <span>By appointment for private architects, designers & developers</span>
        </div>
      </div>
    </div>
  );
}

