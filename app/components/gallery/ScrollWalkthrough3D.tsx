"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  Compass,
  Layers,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Maximize2,
  Eye,
  Map,
  Navigation2,
} from "lucide-react";
import { GalleryFloor, GalleryHotspot, WalkthroughStation, galleryFloors } from "@/lib/galleryData";
import { evaluateCameraTransform } from "@/lib/cameraPaths";
import { lenisScrollTo } from "@/app/components/SmoothScroll";
import GalleryAsideDrawer from "./GalleryAsideDrawer";
import GalleryAudioPlayer from "./GalleryAudioPlayer";
import GalleryFloorSelector from "./GalleryFloorSelector";
import LocationsModal from "./LocationsModal";
import MaterialLibraryModal from "./MaterialLibraryModal";
import WalkthroughRouteMapModal from "./WalkthroughRouteMapModal";

interface Props {
  currentFloor: GalleryFloor;
  onSelectFloor: (floor: GalleryFloor) => void;
  onExitToIsometric: () => void;
}

export default function ScrollWalkthrough3D({
  currentFloor,
  onSelectFloor,
  onExitToIsometric,
}: Props) {
  // DOM Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHolderRef = useRef<HTMLDivElement>(null);

  // State
  const [loading, setLoading] = useState(true);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [freeLookMode, setFreeLookMode] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<GalleryHotspot | null>(null);

  // Modals & Navigation
  const [routeMapOpen, setRouteMapOpen] = useState(false);
  const [storyCardCollapsed, setStoryCardCollapsed] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const activeModelRef = useRef<THREE.Group | null>(null);

  // Smooth Scroll Interpolation (Lerp)
  const targetProgressRef = useRef(0);
  const smoothedProgressRef = useRef(0);

  // Mouse Parallax Offset
  const mouseOffsetRef = useRef({ x: 0, y: 0 });
  const mouseTargetRef = useRef({ x: 0, y: 0 });

  // Free Look Drag state
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const freeLookEulerRef = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const freeLookTargetEulerRef = useRef(new THREE.Euler(0, 0, 0, "YXZ"));

  // 2D Projected Hotspots
  const [screenHotspots, setScreenHotspots] = useState<
    { hotspot: GalleryHotspot; x: number; y: number; visible: boolean }[]
  >([]);

  const stations = currentFloor.stations || [];
  const currentStation = stations[activeStationIndex] || stations[0];

  // Play audio helper
  const playSfx = useCallback((soundFile: string) => {
    try {
      const audio = new Audio(`/audio/${soundFile}`);
      audio.volume = 0.35;
      audio.play().catch(() => { });
    } catch { }
  }, []);



  // Reset progress and scroll when switching floor
  useEffect(() => {
    targetProgressRef.current = 0;
    smoothedProgressRef.current = 0;
    setScrollProgress(0);
    setActiveStationIndex(0);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentFloor.slug]);

  // 2. Initialize Three.js Scene, Camera, Lighting, Model
  useEffect(() => {
    const mount = canvasHolderRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x141312); // Deep atmospheric architectural bronze-black
    sceneRef.current = scene;

    // Dynamic FOV calibrated per floor:
    // First Floor and Underground are enclosed spaces author-calibrated at 45°/56°/68°
    // Ground Floor entrance camera was authored in Blender with 22.89° FOV
    const getDeviceFov = (w: number, floorSlug?: string) => {
      if (floorSlug === "ground-floor") {
        if (w < 640) return 32; // mobile portrait
        if (w < 1024) return 28; // tablet
        return 23; // desktop
      }
      if (w < 640) return 68; // mobile portrait
      if (w < 1024) return 56; // tablet
      return 45; // desktop
    };

    const camera = new THREE.PerspectiveCamera(getDeviceFov(width, currentFloor.slug), width / height, 0.1, 150);
    const initialPos = new THREE.Vector3();
    const initialQuat = new THREE.Quaternion();
    evaluateCameraTransform(
      currentFloor.slug,
      targetProgressRef.current || 0,
      initialPos,
      initialQuat
    );
    camera.position.copy(initialPos);
    camera.quaternion.copy(initialQuat);
    freeLookEulerRef.current.setFromQuaternion(camera.quaternion);
    freeLookTargetEulerRef.current.copy(freeLookEulerRef.current);
    cameraRef.current = camera;

    // High-performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Studio Reflection Environment Map
    const texLoader = new THREE.TextureLoader();
    texLoader.load("/pov_env.jpg", (envTex) => {
      envTex.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = envTex;
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff3e2, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 1.9);
    keyLight.position.set(10, 20, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xced8e8, 1.1);
    fillLight.position.set(-15, 12, -15);
    scene.add(fillLight);

    // Load 3D Architectural Model
    setLoading(true);
    const loader = new GLTFLoader();
    loader.load(
      currentFloor.modelPath,
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.min(Math.max(mat.roughness, 0.15), 0.9);
              mat.envMapIntensity = 1.25;
            }
          }
        });

        scene.add(model);
        activeModelRef.current = model;

        // Ground floor entrance portal enclosure:
        // In ground_floor.glb, the room geometry terminates at Z = 16.31, while Blender's architectural
        // camera path begins at Z = 24.62 (outside the threshold). Enclose the entrance chamber with
        // matching architectural floor, ceiling, and portal surfaces to ensure zero black voids on any screen size.
        if (currentFloor.slug === "ground-floor") {
          const extGroup = new THREE.Group();
          extGroup.name = "gf_portal_enclosure";

          // Floor extension slab at Y = 0.00 (Z from 16.0 to 38.0, X from -35.0 to 35.0)
          const floorGeo = new THREE.PlaneGeometry(70, 24);
          const floorMat = new THREE.MeshStandardMaterial({
            color: 0xded7c8,
            roughness: 0.72,
            metalness: 0.05,
          });
          const floorMesh = new THREE.Mesh(floorGeo, floorMat);
          floorMesh.rotation.x = -Math.PI / 2;
          floorMesh.position.set(0, 0, 27);
          floorMesh.receiveShadow = true;
          extGroup.add(floorMesh);

          // Ceiling extension slab at Y = 4.30 (Z from 16.0 to 38.0, X from -35.0 to 35.0)
          const ceilGeo = new THREE.PlaneGeometry(70, 24);
          const ceilMat = new THREE.MeshStandardMaterial({
            color: 0xe4dfd4,
            roughness: 0.88,
            metalness: 0.0,
          });
          const ceilMesh = new THREE.Mesh(ceilGeo, ceilMat);
          ceilMesh.rotation.x = Math.PI / 2;
          ceilMesh.position.set(0, 4.30, 27);
          ceilMesh.receiveShadow = true;
          extGroup.add(ceilMesh);

          // Left portal perimeter wall at X = -26.1
          const leftWallGeo = new THREE.PlaneGeometry(24, 4.30);
          const wallMat = new THREE.MeshStandardMaterial({
            color: 0xd6cdbf,
            roughness: 0.82,
            metalness: 0.05,
          });
          const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
          leftWall.rotation.y = Math.PI / 2;
          leftWall.position.set(-26.1, 2.15, 27);
          extGroup.add(leftWall);

          // Right portal perimeter wall at X = 32.0
          const rightWallGeo = new THREE.PlaneGeometry(24, 4.30);
          const rightWall = new THREE.Mesh(rightWallGeo, wallMat);
          rightWall.rotation.y = -Math.PI / 2;
          rightWall.position.set(32.0, 2.15, 27);
          extGroup.add(rightWall);

          // Rear wall behind the camera at Z = 38.0
          const rearWallGeo = new THREE.PlaneGeometry(70, 4.30);
          const rearWall = new THREE.Mesh(rearWallGeo, wallMat);
          rearWall.position.set(0, 2.15, 38.0);
          extGroup.add(rearWall);

          model.add(extGroup);
        }

        setLoading(false);
      },
      undefined,
      (err) => {
        console.warn("Failed to load model:", currentFloor.modelPath, err);
        setLoading(false);
      }
    );

    // Animation & Smooth Dolly Loop
    let animId: number;
    const tempPos = new THREE.Vector3();
    const tempQuat = new THREE.Quaternion();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);

      // Smooth Lerp scroll progress towards target
      smoothedProgressRef.current +=
        (targetProgressRef.current - smoothedProgressRef.current) * 0.085;
      const progress = Math.max(0, Math.min(1, smoothedProgressRef.current));
      setScrollProgress(progress);

      // Smooth mouse parallax
      mouseOffsetRef.current.x += (mouseTargetRef.current.x - mouseOffsetRef.current.x) * 0.05;
      mouseOffsetRef.current.y += (mouseTargetRef.current.y - mouseOffsetRef.current.y) * 0.05;

      // Evaluate the continuous architectural walkthrough path without wall clipping
      evaluateCameraTransform(
        currentFloor.slug,
        progress,
        tempPos,
        tempQuat,
        !freeLookMode ? mouseOffsetRef.current : undefined
      );

      camera.position.copy(tempPos);

      if (!freeLookMode) {
        camera.quaternion.copy(tempQuat);
        freeLookEulerRef.current.setFromQuaternion(camera.quaternion);
        freeLookTargetEulerRef.current.copy(freeLookEulerRef.current);
      } else {
        freeLookEulerRef.current.x +=
          (freeLookTargetEulerRef.current.x - freeLookEulerRef.current.x) * 0.08;
        freeLookEulerRef.current.y +=
          (freeLookTargetEulerRef.current.y - freeLookEulerRef.current.y) * 0.08;
        camera.quaternion.setFromEuler(freeLookEulerRef.current);
      }

      // Update active station based on progress
      if (stations.length > 0) {
        let bestIdx = 0;
        let minDiff = 999;
        stations.forEach((st, idx) => {
          const diff = Math.abs(st.progress - progress);
          if (diff < minDiff) {
            minDiff = diff;
            bestIdx = idx;
          }
        });
        setActiveStationIndex(bestIdx);
      }

      // Project 3D Hotspot positions to 2D Screen Coordinates
      if (currentFloor.hotspots.length > 0) {
        const tempV = new THREE.Vector3();
        const updated = currentFloor.hotspots.map((hs) => {
          tempV.set(hs.position[0], hs.position[1], hs.position[2]);
          tempV.project(camera);
          const isVisible = tempV.z < 1;
          const x = (tempV.x * 0.5 + 0.5) * width;
          const y = (-(tempV.y * 0.5) + 0.5) * height;
          return { hotspot: hs, x, y, visible: isVisible };
        });
        setScreenHotspots(updated);
      } else {
        setScreenHotspots([]);
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    // Resize handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.fov = getDeviceFov(w, currentFloor.slug);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [currentFloor, stations, freeLookMode]);

  // 3. Dual Scroll Listener: Native Scroll + Virtual Wheel/Touch/Keyboard (matching ICG Hermes scroll)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // A. Native Window Scroll
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const p = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      targetProgressRef.current = p;
    };

    // B. Direct Wheel Listener (instant, silky smooth virtual scroll)
    const handleWheel = (e: WheelEvent) => {
      if (activeHotspot || locationsOpen || materialsOpen) return;
      const delta = e.deltaY;
      targetProgressRef.current = Math.max(
        0,
        Math.min(1, targetProgressRef.current + delta * 0.0006)
      );
    };

    // C. Touch Swipe for Mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (activeHotspot || locationsOpen || materialsOpen || e.touches.length === 0) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;
      targetProgressRef.current = Math.max(
        0,
        Math.min(1, targetProgressRef.current + deltaY * 0.0015)
      );
    };

    // D. Keyboard Arrows / Page Navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeHotspot || locationsOpen || materialsOpen || routeMapOpen) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === "ArrowRight") {
        e.preventDefault();
        handleNextSpace();
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevSpace();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("wheel", handleWheel, { passive: true });
  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  window.addEventListener("touchmove", handleTouchMove, { passive: true });
  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("wheel", handleWheel);
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [activeHotspot, locationsOpen, materialsOpen]);

// 4. Mouse Parallax Movement
const handleMouseMove = (e: React.MouseEvent) => {
  const nx = (e.clientX / window.innerWidth) * 2 - 1;
  const ny = -(e.clientY / window.innerHeight) * 2 + 1;
  mouseTargetRef.current = { x: nx, y: ny };
};

// 5. Free Look 360 Drag Controls
const handlePointerDown = (e: React.PointerEvent) => {
  if (!freeLookMode) return;
  isDraggingRef.current = true;
  prevMouseRef.current = { x: e.clientX, y: e.clientY };
};

const handlePointerMove = (e: React.PointerEvent) => {
  if (!freeLookMode || !isDraggingRef.current) return;
  const deltaX = e.clientX - prevMouseRef.current.x;
  const deltaY = e.clientY - prevMouseRef.current.y;
  prevMouseRef.current = { x: e.clientX, y: e.clientY };

  freeLookTargetEulerRef.current.y -= deltaX * 0.003;
  freeLookTargetEulerRef.current.x -= deltaY * 0.0025;
  freeLookTargetEulerRef.current.x = Math.max(
    -Math.PI / 3,
    Math.min(Math.PI / 3, freeLookTargetEulerRef.current.x)
  );
};

const handlePointerUp = () => {
  isDraggingRef.current = false;
};

// 6. Jump to Station by clicking route button, timeline, or blueprint map
const jumpToStation = (station: WalkthroughStation) => {
  playSfx("click.mp3");
  targetProgressRef.current = station.progress;
  const container = containerRef.current;
  if (!container) return;

  const totalScrollable = container.scrollHeight - window.innerHeight;
  const targetScrollY = container.offsetTop + station.progress * totalScrollable;

  lenisScrollTo(targetScrollY, { duration: 1.1 });
};

const handlePrevSpace = () => {
  if (!stations.length) return;
  const prevIdx = (activeStationIndex - 1 + stations.length) % stations.length;
  jumpToStation(stations[prevIdx]);
};

const handleNextSpace = () => {
  if (!stations.length) return;
  const nextIdx = (activeStationIndex + 1) % stations.length;
  jumpToStation(stations[nextIdx]);
};

// 7. Auto-Tour Playback
useEffect(() => {
  if (!isAutoPlaying) return;

  const interval = setInterval(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalScrollable = container.scrollHeight - window.innerHeight;
    const nextProgress = targetProgressRef.current + 0.0025;

    if (nextProgress >= 1.0) {
      setIsAutoPlaying(false);
      return;
    }

    lenisScrollTo(container.offsetTop + nextProgress * totalScrollable, { immediate: true });
  }, 30);

  return () => clearInterval(interval);
}, [isAutoPlaying]);

// Hotspot Click
const handleHotspotClick = (hs: GalleryHotspot) => {
  playSfx("pin.mp3");
  setActiveHotspot(hs);
};

return (
  <div
    ref={containerRef}
    onMouseMove={handleMouseMove}
    style={{ height: `${Math.max(4, stations.length) * 80}vh` }}
    className="relative w-full bg-[#08080a] text-[#e8e4dc]"
  >
    {/* Sticky Viewport Container */}
    <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
      {/* Full-bleed Three.js Canvas */}
      <div
        ref={canvasHolderRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`absolute inset-0 z-0 ${freeLookMode ? "cursor-grab active:cursor-grabbing" : "cursor-default"
          }`}
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-[#141312]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-4 z-50">
          <div className="w-10 h-10 rounded-full border-2 border-[#c9a96e]/20 border-t-[#c9a96e] animate-spin" />
          <span className="text-xs tracking-[0.3em] text-[#d4cdc0] uppercase font-serif">
            Loading 3D Architectural Walkthrough...
          </span>
        </div>
      )}

      {/* Architectural Framed Border */}
      <div className="absolute inset-3 sm:inset-5 border border-white/10 rounded-sm pointer-events-none z-20" />

      {/* Top Header Navigation (positioned below global navbar) */}
      <header className="absolute top-20 sm:top-24 left-0 right-0 z-30 px-4 sm:px-8 md:px-12 py-2 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left: Exit to Model Overview & Route Map Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          <Link
            href="/"
            onClick={() => {
              if (onExitToIsometric) onExitToIsometric();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#08080a]/85 hover:bg-[#c5a880] text-white hover:text-black border border-white/20 text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg"
            title="Return to VELQON Atelier 3D Model Overview"
          >
            <span>← 3D Overview</span>
          </Link>

          {/* Dedicated Blueprint Route Map Button */}
          <button
            onClick={() => {
              setRouteMapOpen(true);
              playSfx("click.mp3");
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#0c0c10]/85 hover:bg-[#1a1a24] text-[#c5a880] border border-[#c5a880]/40 hover:border-[#c5a880] text-[11px] sm:text-xs font-mono tracking-wider uppercase backdrop-blur-md transition-all cursor-pointer shadow-lg group"
            title="Open Interactive Floor Plan Blueprint Route Map"
          >
            <Map className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">Tour Route</span>
          </button>
        </div>

        {/* Center: Quick Space Navigator (Prev / Next Space) */}
        <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-[#0c0c10]/90 border border-white/15 backdrop-blur-xl pointer-events-auto shadow-2xl">
          <button
            onClick={handlePrevSpace}
            aria-label="Previous Space"
            className="p-1.5 sm:p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Go to Previous Space"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setRouteMapOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono tracking-wider text-[#fafafa] hover:text-[#c5a880] transition-colors cursor-pointer"
            title="Click to view all spaces on the route"
          >
            <span className="text-[#c5a880] font-bold">0{activeStationIndex + 1}</span>
            <span className="text-white/30">/</span>
            <span className="text-white/50">0{stations.length}</span>
            <span className="hidden md:inline font-serif text-xs border-l border-white/15 pl-2 ml-1 text-white/90">
              {currentStation?.spaceName?.split("&")[0]?.trim()}
            </span>
          </button>

          <button
            onClick={handleNextSpace}
            aria-label="Next Space"
            className="p-1.5 sm:p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Go to Next Space"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Controls (Free Look, Auto Tour) */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Free Look Toggle */}
          <button
            onClick={() => {
              setFreeLookMode(!freeLookMode);
              playSfx("click.mp3");
            }}
            className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border text-[11px] sm:text-xs font-mono tracking-wider uppercase backdrop-blur-md transition-all cursor-pointer ${
              freeLookMode
                ? "bg-[#c5a880] text-black border-[#c5a880] font-medium"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            }`}
            title="Toggle 360° Free Look"
          >
            <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
            <span className="hidden sm:inline">
              {freeLookMode ? "Free Look" : "360° Look"}
            </span>
          </button>

          {/* Auto-Tour Play/Pause */}
          <button
            onClick={() => {
              setIsAutoPlaying(!isAutoPlaying);
              playSfx("click.mp3");
            }}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-[11px] sm:text-xs font-mono tracking-wider uppercase backdrop-blur-md transition-all cursor-pointer"
            title={isAutoPlaying ? "Pause Cinematic Auto-Tour" : "Play Cinematic Auto-Tour"}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#c5a880]" />
                <span className="hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#c5a880]" />
                <span className="hidden sm:inline">Auto Tour</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* 2D Projected Hotspot Eye Pins (`👁`) */}
      {screenHotspots.map(({ hotspot, x, y, visible }) => {
        if (!visible || x < 0 || x > (canvasHolderRef.current?.clientWidth || 2000)) return null;
        const isSelected = activeHotspot?.id === hotspot.id;

        return (
          <div
            key={hotspot.id}
            style={{
              transform: `translate3d(${x}px, ${y}px, 0)`,
            }}
            className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto"
          >
            <div className="relative group">
              <span className="absolute -inset-2.5 rounded-full bg-white/40 animate-ping opacity-60 pointer-events-none" />
              <button
                onClick={() => handleHotspotClick(hotspot)}
                aria-label={`Inspect ${hotspot.name}`}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 backdrop-blur-sm cursor-pointer ${
                  isSelected
                    ? "bg-[#c5a880] text-black scale-110"
                    : "bg-white/95 text-black hover:scale-115 hover:bg-white"
                }`}
              >
                <Eye className="w-5 h-5 stroke-[2.2]" />
              </button>

              {/* Hover Tooltip */}
              <div className="hidden group-hover:block absolute left-14 top-1/2 -translate-y-1/2 w-64 bg-black/90 border border-white/20 p-3 rounded shadow-2xl text-left pointer-events-none backdrop-blur-md">
                <span className="text-[9px] tracking-[0.25em] text-[#c5a880] uppercase block">
                  Spatial Detail
                </span>
                <p className="text-xs font-serif text-[#fafafa] font-medium leading-snug">
                  {hotspot.name}
                </p>
                <p className="text-[10px] text-[#888888] tracking-wider mt-0.5">
                  Click to view photography & specs →
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Left Side: Editorial Architectural Storytelling Card (Collapsible on Mobile) */}
      {currentStation && (
        <div className="absolute top-36 sm:top-40 left-4 sm:left-12 max-w-[calc(100vw-2rem)] sm:max-w-md z-30 pointer-events-none transition-all duration-500 ease-out">
          {storyCardCollapsed ? (
            /* Minimized Mobile Pill */
            <button
              onClick={() => setStoryCardCollapsed(false)}
              className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0c0c10]/90 border border-[#c5a880]/50 text-white backdrop-blur-xl shadow-2xl text-xs font-serif cursor-pointer hover:border-[#c5a880]"
            >
              <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
              <span className="font-mono text-[10px] text-[#c5a880]">0{activeStationIndex + 1}</span>
              <span className="line-clamp-1">{currentStation.spaceName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#c5a880] ml-1" />
            </button>
          ) : (
            /* Full Editorial Card */
            <div className="bg-[#0c0c10]/90 border border-white/15 p-5 sm:p-7 rounded-sm backdrop-blur-xl shadow-2xl space-y-3.5 pointer-events-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#c5a880] uppercase font-bold">
                    Station {currentStation.step} of 0{stations.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                    {Math.round(scrollProgress * 100)}% Explored
                  </span>
                  <button
                    onClick={() => setStoryCardCollapsed(true)}
                    className="p-1 text-white/40 hover:text-white transition-colors cursor-pointer"
                    title="Minimize Space Details"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-normal tracking-tight leading-snug">
                  {currentStation.spaceName}
                </h2>
                <p className="text-xs font-serif italic text-[#c5a880] mt-0.5">
                  {currentStation.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#b8b4ab] font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
                {currentStation.architecturalThesis}
              </p>

              <div className="pt-2.5 border-t border-white/10 space-y-1 text-[11px] sm:text-xs text-[#8c887e]">
                <div className="flex justify-between">
                  <span className="text-white/40">Featured Material:</span>
                  <span className="text-white font-medium">{currentStation.featuredMaterial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Surface Finish:</span>
                  <span className="text-[#c5a880] font-mono">{currentStation.finish}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Architectural Metric:</span>
                  <span className="text-white/80 font-mono">{currentStation.dimension}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                {currentStation.hotspotId && (
                  <button
                    onClick={() => {
                      const hs = currentFloor.hotspots.find(
                        (h) => h.id === currentStation.hotspotId
                      );
                      if (hs) handleHotspotClick(hs);
                    }}
                    className="flex-1 py-2 px-3 rounded bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-[11px] font-serif tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-1.5 group cursor-pointer"
                  >
                    <span>Inspect Palette</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </button>
                )}

                <button
                  onClick={() => setRouteMapOpen(true)}
                  className="py-2 px-3 rounded bg-white/5 hover:bg-white/15 text-[#c5a880] border border-white/10 text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                  title="View Route Map Blueprint"
                >
                  <Map className="w-3 h-3" />
                  <span>Route Map</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Right Side: Vertical Station Scrubber Timeline */}
      <div className="absolute right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-2.5 pointer-events-auto">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] font-mono tracking-[0.25em] text-[#c5a880] uppercase">
            Tour Route
          </span>
          <button
            onClick={() => setRouteMapOpen(true)}
            className="text-[9px] font-mono text-white/40 hover:text-white underline cursor-pointer"
          >
            Map
          </button>
        </div>
        {stations.map((st, idx) => {
          const isActive = activeStationIndex === idx;
          return (
            <button
              key={st.id}
              onClick={() => jumpToStation(st)}
              className={`group flex items-center gap-3 py-1 text-right transition-all duration-300 cursor-pointer ${
                isActive ? "text-[#c5a880]" : "text-white/40 hover:text-white"
              }`}
            >
              <span
                className={`text-xs font-serif tracking-wider transition-all duration-300 ${
                  isActive
                    ? "opacity-100 translate-x-0 font-medium"
                    : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {st.spaceName.split("&")[0].trim()}
              </span>
              <span className="font-mono text-[11px] tracking-wider w-5">
                {st.step}
              </span>
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#c5a880] scale-125 ring-4 ring-[#c5a880]/20"
                    : "bg-white/20 group-hover:bg-white/60"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Bottom Horizontal Station Pill Strip (Mobile & Tablet) */}
      <div className="absolute bottom-16 sm:bottom-20 left-4 right-4 z-30 lg:hidden flex items-center gap-2 overflow-x-auto pb-2 pointer-events-auto scrollbar-none">
        {stations.map((st, idx) => {
          const isActive = activeStationIndex === idx;
          return (
            <button
              key={st.id}
              onClick={() => jumpToStation(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-serif whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                isActive
                  ? "bg-[#c5a880] text-black border-[#c5a880] font-medium"
                  : "bg-black/70 text-white/70 border-white/10 hover:bg-black/90"
              }`}
            >
              {st.step}. {st.spaceName.split("&")[0].trim()}
            </button>
          );
        })}
      </div>

      {/* End of Walkthrough Route Completion State (Station 07) */}
      {scrollProgress >= 0.95 && (
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2.5 bg-[#0c0c10]/95 border border-[#c5a880]/50 p-4 sm:p-6 rounded-sm shadow-2xl backdrop-blur-2xl animate-fade-in pointer-events-auto max-w-sm sm:max-w-md text-center">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#c5a880] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Floor Explored · {currentFloor.name}</span>
          </div>
          <p className="text-[11px] sm:text-xs text-[#a3a3a8] font-light">
            You have traversed the entire architectural corridor sequence on this level.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => jumpToStation(stations[0])}
              className="px-4 py-2 rounded-[2px] bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono uppercase tracking-wider text-white transition-colors cursor-pointer"
            >
              ↺ Replay From Entrance
            </button>
            <button
              onClick={() => {
                const nextFloor =
                  currentFloor.slug === "ground-floor"
                    ? galleryFloors.find((f) => f.slug === "first-floor")
                    : galleryFloors.find((f) => f.slug === "ground-floor");
                if (nextFloor) onSelectFloor(nextFloor);
              }}
              className="px-5 py-2 rounded-[2px] bg-[#c5a880] hover:bg-[#d6b991] border border-[#c5a880] text-xs font-mono uppercase tracking-wider text-black font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>{currentFloor.slug === "ground-floor" ? "Ascend to First Floor (+1) →" : "Explore Next Floor →"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Left Floor Selector */}
      <GalleryFloorSelector
        currentFloor={currentFloor}
        onSelectFloor={onSelectFloor}
        mode="walkthrough"
      />

      {/* Bottom Right Audio Player */}
      <GalleryAudioPlayer />

      {/* Global Interactive Route Scrubber along Bottom Edge */}
      <div
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = Math.max(0, Math.min(1, clickX / rect.width));
          targetProgressRef.current = ratio;
          const container = containerRef.current;
          if (container) {
            const total = container.scrollHeight - window.innerHeight;
            lenisScrollTo(container.offsetTop + ratio * total, { duration: 1.0 });
          }
        }}
        className="absolute bottom-0 left-0 right-0 h-3 bg-white/5 hover:bg-white/15 transition-colors cursor-pointer group z-40"
        title="Click anywhere along the timeline to scrub through the walkthrough route"
      >
        <div
          style={{ width: `${scrollProgress * 100}%` }}
          className="h-full bg-gradient-to-r from-[#c5a880] via-[#e6d5b8] to-[#c5a880] transition-all duration-75 relative"
        >
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-lg border border-[#c5a880] scale-0 group-hover:scale-100 transition-transform" />
        </div>

        {/* Station Markers along track */}
        {stations.map((st) => (
          <div
            key={st.id}
            style={{ left: `${st.progress * 100}%` }}
            className="absolute top-0 bottom-0 w-[2px] bg-white/20 group-hover:bg-white/50 pointer-events-none"
          />
        ))}
      </div>
    </div>

    {/* Interactive 2D Blueprint Route Map Modal */}
    <WalkthroughRouteMapModal
      isOpen={routeMapOpen}
      onClose={() => setRouteMapOpen(false)}
      currentFloor={currentFloor}
      activeStationIndex={activeStationIndex}
      currentProgress={scrollProgress}
      onSelectStation={(st) => jumpToStation(st)}
    />

    {/* Slide-Over Detailed Drawer */}
    <GalleryAsideDrawer
      hotspot={activeHotspot}
      onClose={() => setActiveHotspot(null)}
      onOpenMaterials={() => setMaterialsOpen(true)}
      onOpenContact={() => {
        window.location.href = "/contact";
      }}
    />

    {/* Modals */}
    <LocationsModal
      isOpen={locationsOpen}
      onClose={() => setLocationsOpen(false)}
      onSelectContact={() => {
        window.location.href = "/contact";
      }}
    />

    <MaterialLibraryModal
      isOpen={materialsOpen}
      onClose={() => setMaterialsOpen(false)}
      onRequestSample={(name) => {
        console.log("Requested sample for:", name);
      }}
    />
  </div>
);
}
