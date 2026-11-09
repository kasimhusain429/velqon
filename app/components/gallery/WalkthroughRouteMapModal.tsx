"use client";

import { useMemo } from "react";
import { X, Compass, ArrowRight, Check, MapPin, Sparkles, Navigation2 } from "lucide-react";
import { GalleryFloor, WalkthroughStation } from "@/lib/galleryData";
import { architecturalCameraPaths } from "@/lib/cameraPaths";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentFloor: GalleryFloor;
  activeStationIndex: number;
  currentProgress: number;
  onSelectStation: (station: WalkthroughStation) => void;
}

export default function WalkthroughRouteMapModal({
  isOpen,
  onClose,
  currentFloor,
  activeStationIndex,
  currentProgress,
  onSelectStation,
}: Props) {
  if (!isOpen) return null;

  const stations = currentFloor.stations || [];
  const activeStation = stations[activeStationIndex] || stations[0];

  // Project 3D floor coordinates (X, Z) into 2D SVG Map (width: 440, height: 380)
  const { pathSvgString, stationSvgPoints, userDot } = useMemo(() => {
    const rawPath =
      architecturalCameraPaths[currentFloor.slug] ||
      architecturalCameraPaths["ground-floor"];

    // Find bounds
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    rawPath.positions.forEach(([x, , z]) => {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (z < minZ) minZ = z;
      if (z > maxZ) maxZ = z;
    });

    const pad = 8;
    const rangeX = maxX - minX || 1;
    const rangeZ = maxZ - minZ || 1;
    const mapW = 400;
    const mapH = 320;

    const toSvg = (x: number, z: number) => {
      const sx = pad + ((x - minX) / rangeX) * (mapW - pad * 2);
      const sy = pad + ((z - minZ) / rangeZ) * (mapH - pad * 2);
      return [sx, sy];
    };

    // Build SVG path data
    const pts = rawPath.positions.map(([x, , z]) => toSvg(x, z));
    const pathD = pts.reduce((acc, [px, py], i) => {
      return i === 0 ? `M ${px.toFixed(1)} ${py.toFixed(1)}` : `${acc} L ${px.toFixed(1)} ${py.toFixed(1)}`;
    }, "");

    // Project stations
    const sPoints = stations.map((st, idx) => {
      const [sx, sy] = toSvg(st.cameraPos[0], st.cameraPos[2]);
      return {
        station: st,
        index: idx,
        x: sx,
        y: sy,
        isActive: idx === activeStationIndex,
      };
    });

    // Current user position along path
    const uIdx = Math.min(
      rawPath.positions.length - 1,
      Math.max(0, Math.floor(currentProgress * (rawPath.positions.length - 1)))
    );
    const uPos = rawPath.positions[uIdx];
    const [ux, uy] = toSvg(uPos[0], uPos[2]);

    return {
      pathSvgString: pathD,
      stationSvgPoints: sPoints,
      userDot: { x: ux, y: uy },
    };
  }, [currentFloor.slug, stations, activeStationIndex, currentProgress]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in select-none">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#0c0c10] border border-white/15 rounded-sm shadow-2xl flex flex-col text-[#fafafa] overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c5a880] animate-pulse" />
            <div>
              <span className="text-[10px] tracking-[0.3em] text-[#c5a880] uppercase font-mono block">
                Architectural Navigation Blueprint
              </span>
              <h2 className="font-serif text-lg sm:text-xl text-[#fafafa]">
                {currentFloor.name} · Complete Walkthrough Route
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Route Map"
            className="w-9 h-9 rounded-full border border-white/15 hover:border-white flex items-center justify-center text-[#a3a3a8] hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Split Map & Spaces Directory */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {/* Left: 2D Blueprint Schematic Map */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-[#08080a]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] tracking-[0.25em] text-[#8c8c94] uppercase font-mono">
                  Continuous Spatial Trajectory
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#c5a880] font-mono">
                  {Math.round(currentProgress * 100)}% Explored
                </span>
              </div>

              {/* Blueprint Canvas Container */}
              <div className="relative aspect-[4/3] w-full bg-[#050507] border border-white/10 rounded-sm overflow-hidden p-4 flex items-center justify-center shadow-inner">
                {/* Architectural Grid Background */}
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Compass Rose Accent */}
                <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-mono text-[#8c8c94] uppercase">
                  <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>N · Dubai</span>
                </div>

                {/* SVG Blueprint Path */}
                <svg
                  viewBox="0 0 400 320"
                  className="w-full h-full relative z-10 overflow-visible"
                >
                  {/* Outer Corridor Guide Shadow */}
                  <path
                    d={pathSvgString}
                    fill="none"
                    stroke="#c5a880"
                    strokeWidth="8"
                    strokeOpacity="0.12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Main Walkthrough Path */}
                  <path
                    d={pathSvgString}
                    fill="none"
                    stroke="#c5a880"
                    strokeWidth="2.5"
                    strokeDasharray="5 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Current Real-time Camera Position Pulse */}
                  <circle
                    cx={userDot.x}
                    cy={userDot.y}
                    r="12"
                    fill="#c5a880"
                    fillOpacity="0.25"
                    className="animate-ping"
                  />
                  <circle
                    cx={userDot.x}
                    cy={userDot.y}
                    r="5"
                    fill="#ffffff"
                    stroke="#c5a880"
                    strokeWidth="2"
                  />

                  {/* Interactive Station Nodes */}
                  {stationSvgPoints.map(({ station, index, x, y, isActive }) => (
                    <g
                      key={station.id}
                      onClick={() => {
                        onSelectStation(station);
                        onClose();
                      }}
                      className="cursor-pointer group"
                    >
                      {/* Pulse ring for active station */}
                      {isActive && (
                        <circle
                          cx={x}
                          cy={y}
                          r="14"
                          fill="none"
                          stroke="#c5a880"
                          strokeWidth="1.5"
                          strokeOpacity="0.7"
                          className="animate-pulse"
                        />
                      )}

                      {/* Station Dot */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isActive ? "7" : "5.5"}
                        fill={isActive ? "#c5a880" : "#1a1a24"}
                        stroke={isActive ? "#ffffff" : "#c5a880"}
                        strokeWidth="1.5"
                        className="transition-all duration-300 group-hover:scale-125"
                      />

                      {/* Number Tag */}
                      <text
                        x={x}
                        y={y - 10}
                        textAnchor="middle"
                        fill={isActive ? "#c5a880" : "#a3a3a8"}
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight={isActive ? "bold" : "normal"}
                        className="select-none transition-colors group-hover:fill-white"
                      >
                        {station.step}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Legend overlay */}
                <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[9px] font-mono text-[#8c8c94] uppercase bg-black/60 px-2.5 py-1 rounded-sm border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#c5a880]" />
                    <span>Active Station</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-0.5 bg-[#c5a880] inline-block" />
                    <span>Corridor Path</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8c8c94]">
              <span>Click any numbered station on the blueprint to jump smoothly</span>
              <span className="text-[#c5a880] font-mono">01 → 0{stations.length}</span>
            </div>
          </div>

          {/* Right: Sequential Spaces Directory List */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col bg-[#0c0c10]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] tracking-[0.25em] text-[#8c8c94] uppercase font-mono">
                Architectural Spaces Directory
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[#8c8c94] uppercase font-mono">
                {stations.length} Key Vantage Points
              </span>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[420px] pr-2 scrollbar-thin scrollbar-thumb-white/10">
              {stations.map((st, idx) => {
                const isActive = activeStationIndex === idx;
                return (
                  <div
                    key={st.id}
                    onClick={() => {
                      onSelectStation(st);
                      onClose();
                    }}
                    className={`p-3.5 sm:p-4 rounded-sm border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                      isActive
                        ? "bg-[#c5a880]/15 border-[#c5a880] shadow-[0_4px_20px_rgba(197,168,128,0.15)]"
                        : "bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span
                        className={`font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isActive
                            ? "bg-[#c5a880] text-black font-bold"
                            : "bg-white/10 text-white/70 group-hover:text-white"
                        }`}
                      >
                        {st.step}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4
                            className={`font-serif text-sm tracking-wide transition-colors ${
                              isActive ? "text-[#c5a880] font-medium" : "text-[#fafafa] group-hover:text-white"
                            }`}
                          >
                            {st.spaceName}
                          </h4>
                          {isActive && (
                            <span className="text-[9px] tracking-wider uppercase font-mono px-1.5 py-0.5 rounded bg-[#c5a880]/20 text-[#c5a880]">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#8c8c94] font-light line-clamp-1">
                          {st.subtitle}
                        </p>
                        <div className="flex items-center gap-2 pt-0.5 text-[10px] text-[#73737a] font-mono">
                          <span>{st.featuredMaterial}</span>
                          <span>·</span>
                          <span className="text-[#a3a3a8]">{st.dimension}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      aria-label={`Jump to ${st.spaceName}`}
                      className={`p-2 rounded-full transition-all shrink-0 ${
                        isActive
                          ? "bg-[#c5a880] text-black"
                          : "text-white/40 group-hover:text-white group-hover:bg-white/10"
                      }`}
                    >
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions at bottom */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  if (stations[0]) onSelectStation(stations[0]);
                  onClose();
                }}
                className="px-4 py-2 text-xs tracking-wider uppercase font-mono rounded bg-white/5 hover:bg-white/10 text-[#fafafa] border border-white/10 transition-colors cursor-pointer"
              >
                ↺ Start From 01
              </button>

              <button
                onClick={() => {
                  const nextIdx = (activeStationIndex + 1) % stations.length;
                  onSelectStation(stations[nextIdx]);
                  onClose();
                }}
                className="px-5 py-2 text-xs tracking-wider uppercase font-mono rounded bg-[#c5a880] hover:bg-[#d6b991] text-black font-medium transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Next Space →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

