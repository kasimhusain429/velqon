"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RotateCcw, Sun, Moon, Sparkles, Box, Info, Layers, Eye } from "lucide-react";

interface ModelHotspot {
  name: string;
  pos: [number, number, number];
  material: string;
  notes: string;
}

const hotspots: ModelHotspot[] = [
  {
    name: "Monolithic Kitchen Island",
    pos: [-4.5, 1.2, 2.5],
    material: "Honed Grigio Carnico Marble",
    notes: "3.2m seamless island with bookmatched veins",
  },
  {
    name: "Bouclé Lounge Sectional",
    pos: [3.2, 0.8, -1.0],
    material: "Charcoal Bouclé & Smoked Oak",
    notes: "Low center of gravity architectural lounge",
  },
  {
    name: "Travertine Coffee Table",
    pos: [3.2, 0.4, 0.6],
    material: "Roman Travertine Classico",
    notes: "Honed raw stone carved block",
  },
  {
    name: "Sculptural Pedestal",
    pos: [6.5, 1.6, -4.5],
    material: "Hand-patinated Cast Brass",
    notes: "Limited edition architectural sphere sculpture",
  },
];

export default function Interactive3DExplorer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [lightPreset, setLightPreset] = useState<"warm" | "night" | "day">("warm");
  const [selectedHotspot, setSelectedHotspot] = useState<ModelHotspot | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const lightsRef = useRef<{ dir: THREE.DirectionalLight; amb: THREE.AmbientLight } | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 560;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0e0e);
    scene.fog = new THREE.FogExp2(0x0e0e0e, 0.035);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 10);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go under floor
    controls.minDistance = 2;
    controls.maxDistance = 22;
    controls.target.set(0, 1.2, 0);
    controlsRef.current = controls;

    // 5. Lighting
    const ambLight = new THREE.AmbientLight(0xfff3e0, 0.6);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xffecd2, 1.6);
    dirLight.position.set(6, 10, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    lightsRef.current = { dir: dirLight, amb: ambLight };

    // 6. Architectural Grid Ground Plane Helper
    const grid = new THREE.GridHelper(24, 24, 0x333333, 0x1a1a1a);
    grid.position.y = -0.01;
    scene.add(grid);

    // 7. Load Blender Exported GLB Model
    const loader = new GLTFLoader();
    loader.load(
      "/models/velqon-gallery.glb",
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });
        scene.add(model);
        modelRef.current = model;
        setLoading(false);
      },
      undefined,
      (err) => {
        console.warn("Could not load /models/velqon-gallery.glb, building procedural scene:", err);
        // Fallback procedural architectural scene
        const group = new THREE.Group();
        const floorGeo = new THREE.PlaneGeometry(16, 16);
        const floorMat = new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.3 });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        group.add(floor);

        const islandGeo = new THREE.BoxGeometry(3.2, 0.95, 1.2);
        const marbleMat = new THREE.MeshStandardMaterial({ color: 0xd8d4cb, roughness: 0.2 });
        const island = new THREE.Mesh(islandGeo, marbleMat);
        island.position.set(-3.5, 0.475, 1.5);
        island.castShadow = true;
        group.add(island);

        const sofaGeo = new THREE.BoxGeometry(3.4, 0.5, 1.4);
        const sofaMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.85 });
        const sofa = new THREE.Mesh(sofaGeo, sofaMat);
        sofa.position.set(3, 0.25, -1);
        group.add(sofa);

        scene.add(group);
        modelRef.current = group;
        setLoading(false);
      }
    );

    // 8. Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Wireframe toggle
  useEffect(() => {
    if (!modelRef.current) return;
    modelRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.wireframe = wireframe;
        }
      }
    });
  }, [wireframe]);

  // Lighting preset change
  const applyLighting = (preset: "warm" | "night" | "day") => {
    setLightPreset(preset);
    if (!lightsRef.current || !sceneRef.current) return;
    const { dir, amb } = lightsRef.current;

    if (preset === "warm") {
      dir.color.setHex(0xffecd2);
      dir.intensity = 1.6;
      amb.color.setHex(0xfff3e0);
      amb.intensity = 0.6;
      sceneRef.current.background = new THREE.Color(0x0e0e0e);
    } else if (preset === "night") {
      dir.color.setHex(0x5c7cfa);
      dir.intensity = 0.7;
      amb.color.setHex(0x182030);
      amb.intensity = 0.3;
      sceneRef.current.background = new THREE.Color(0x05070a);
    } else {
      dir.color.setHex(0xffffff);
      dir.intensity = 2.0;
      amb.color.setHex(0xf8f9fa);
      amb.intensity = 0.8;
      sceneRef.current.background = new THREE.Color(0x181818);
    }
  };

  const resetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(0, 3.5, 10);
    controlsRef.current.target.set(0, 1.2, 0);
    controlsRef.current.update();
  };

  return (
    <div className="relative w-full rounded-sm overflow-hidden border border-white/10 bg-[#0e0e0e] shadow-2xl">
      {/* 3D Canvas mount container */}
      <div ref={mountRef} className="w-full h-[520px] md:h-[640px] cursor-grab active:cursor-grabbing" />

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-30">
          <div className="w-8 h-8 rounded-full border-2 border-[#c9a96e] border-t-transparent animate-spin" />
          <span className="text-[11px] tracking-[0.3em] text-[#a3a3a3] uppercase font-light">
            Streaming Blender 3D Interior Model...
          </span>
        </div>
      )}

      {/* Top Banner / Info overlay */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-3">
        <div className="px-3.5 py-1.5 rounded-full bg-black/75 border border-white/15 backdrop-blur-md flex items-center gap-2">
          <Box className="w-3.5 h-3.5 text-[#c9a96e]" />
          <span className="text-[10px] tracking-[0.25em] text-[#fafafa] uppercase font-medium">
            3D Spatial Gallery
          </span>
        </div>
        <span className="hidden sm:inline-block text-[10px] tracking-[0.2em] text-[#737373] uppercase">
          Drag to rotate · Scroll to zoom
        </span>
      </div>

      {/* Interactive Controls Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 p-3 rounded bg-black/80 border border-white/10 backdrop-blur-xl">
        {/* Lighting preset buttons */}
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] tracking-[0.2em] text-[#737373] uppercase mr-2 hidden md:inline">
            Illumination:
          </span>
          <button
            onClick={() => applyLighting("warm")}
            className={`px-2.5 py-1 text-[10px] tracking-[0.15em] rounded transition-colors uppercase ${
              lightPreset === "warm"
                ? "bg-[#c9a96e] text-black font-medium"
                : "text-[#888888] hover:text-[#fafafa] bg-white/5"
            }`}
          >
            Twilight 2700K
          </button>
          <button
            onClick={() => applyLighting("day")}
            className={`px-2.5 py-1 text-[10px] tracking-[0.15em] rounded transition-colors uppercase ${
              lightPreset === "day"
                ? "bg-[#c9a96e] text-black font-medium"
                : "text-[#888888] hover:text-[#fafafa] bg-white/5"
            }`}
          >
            Daylight 5000K
          </button>
          <button
            onClick={() => applyLighting("night")}
            className={`px-2.5 py-1 text-[10px] tracking-[0.15em] rounded transition-colors uppercase ${
              lightPreset === "night"
                ? "bg-[#c9a96e] text-black font-medium"
                : "text-[#888888] hover:text-[#fafafa] bg-white/5"
            }`}
          >
            Moody Indigo
          </button>
        </div>

        {/* View toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`flex items-center gap-1.5 px-3 py-1 text-[10px] tracking-[0.2em] uppercase rounded border transition-colors ${
              wireframe
                ? "border-[#c9a96e] bg-[#c9a96e]/20 text-[#fafafa]"
                : "border-white/10 text-[#888888] hover:text-[#fafafa]"
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>{wireframe ? "Wireframe" : "Shaded"}</span>
          </button>

          <button
            onClick={resetCamera}
            className="flex items-center gap-1.5 px-3 py-1 text-[10px] tracking-[0.2em] uppercase rounded border border-white/10 text-[#888888] hover:text-[#fafafa] hover:border-white/30 transition-colors"
            title="Reset Camera Target"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Hotspots Quick Inspector Drawer */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 max-w-[200px] hidden md:flex">
        <span className="text-[9px] tracking-[0.2em] text-[#737373] uppercase text-right mb-1">
          Architectural Features
        </span>
        {hotspots.map((item, idx) => (
          <button
            key={item.name}
            onClick={() => {
              setSelectedHotspot(item);
              if (controlsRef.current && cameraRef.current) {
                controlsRef.current.target.set(item.pos[0], item.pos[1], item.pos[2]);
                cameraRef.current.position.set(item.pos[0] + 3, item.pos[1] + 2, item.pos[2] + 4);
                controlsRef.current.update();
              }
            }}
            className={`text-right text-[10px] px-2.5 py-1.5 rounded transition-all backdrop-blur-md border ${
              selectedHotspot?.name === item.name
                ? "bg-[#c9a96e] text-black border-[#c9a96e] font-medium"
                : "bg-black/60 text-[#a3a3a3] hover:text-white border-white/10"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

