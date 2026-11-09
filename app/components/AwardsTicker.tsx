export default function AwardsTicker() {
  const awards = [
    "DEZEEN AWARDS 2025 · SHORTLISTED",
    "ARCHITECTURAL DIGEST MIDDLE EAST · TOP 50 DESIGN STUDIOS",
    "WORLD ARCHITECTURE FESTIVAL · BEST RESIDENTIAL INTERIOR",
    "WALLPAPER* DESIGN AWARDS · BESPOKE CRAFT HONOREE",
    "FRAME AWARDS · RESIDENCE OF THE YEAR FINALIST",
    "PRIX VERSAILLES · ARCHITECTURAL EXCELLENCE",
  ];

  return (
    <div className="py-7 bg-[#060608] border-y border-white/[0.08] overflow-hidden whitespace-nowrap select-none">
      <div className="flex gap-12 items-center animate-[marquee_30s_linear_infinite]">
        {[...awards, ...awards, ...awards].map((award, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#8c8c94] hover:text-[#c5a880] transition-colors font-mono font-medium">
              {award}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
