"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GalleryFloor, GalleryHotspot } from "@/lib/galleryData";

interface Props {
  currentFloor: GalleryFloor;
  mode: "isometric" | "walkthrough";
  activeHotspot: GalleryHotspot | null;
  onSelectHotspot: (hotspot: GalleryHotspot) => void;
  onEnterWalkthrough: () => void;
  onExitWalkthrough: () => void;
}

export default function GalleryViewer3D({
  currentFloor,
  mode,
  activeHotspot,
  onSelectHotspot,
  onEnterWalkthrough,
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [screenHotspots, setScreenHotspots] = useState<
    { hotspot: GalleryHotspot; x: number; y: number; visible: boolean }[]
  >([]);

  // Three.js instances stored in refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const activeModelRef = useRef<THREE.Group | null>(null);
  const shadowMeshRef = useRef<THREE.Mesh | null>(null);
  const shadowTexRef = useRef<THREE.Texture | null>(null);

  // Camera animation / look controls
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const eulerRef = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const targetEulerRef = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const manualIsoAngleRef = useRef(0);

  // Camera transition tween
  const isTransitioningRef = useRef(false);
  const transitionStartRef = useRef<{
    pos: THREE.Vector3;
    rot: THREE.Euler;
    time: number;
    duration: number;
  } | null>(null);
  const transitionTargetRef = useRef<{
    pos: THREE.Vector3;
    lookAt: THREE.Vector3;
  } | null>(null);

  // Play audio helper
  const playSfx = useCallback((name: string) => {
    try {
      const audio = new Audio(`/audio/${name}`);
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch {}
  }, []);

  // 1. Initialize Scene, Renderer, Environment
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x08080a); // Luxury charcoal studio background
    sceneRef.current = scene;

    // Camera
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const initialFov = isMobile ? 54 : isTablet ? 47 : 42;
    const camera = new THREE.PerspectiveCamera(initialFov, width / height, 0.1, 200);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Environment map
    const texLoader = new THREE.TextureLoader();
    texLoader.load("/pov_env.jpg", (envTex) => {
      envTex.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = envTex;
    });

    // Lights
    const ambLight = new THREE.AmbientLight(0xfff8ee, 1.2);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xfff3e2, 1.8);
    dirLight.position.set(15, 25, 20);
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xdde8f8, 0.8);
    fillLight.position.set(-15, 10, -15);
    scene.add(fillLight);

    // Tree leaf shadow projection on floor (matching ICG Gallery shadow-leaves)
    texLoader.load("/shadow_leaves.jpg", (shadowTex) => {
      shadowTex.wrapS = THREE.RepeatWrapping;
      shadowTex.wrapT = THREE.RepeatWrapping;
      shadowTex.repeat.set(1.5, 1.5);
      shadowTexRef.current = shadowTex;

      const planeGeo = new THREE.PlaneGeometry(50, 50);
      const planeMat = new THREE.MeshBasicMaterial({
        color: 0x332a1e,
        alphaMap: shadowTex,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
      });
      const shadowMesh = new THREE.Mesh(planeGeo, planeMat);
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.position.y = -0.05;
      scene.add(shadowMesh);
      shadowMeshRef.current = shadowMesh;
    });

    // Initial camera position for isometric mode
    camera.position.set(16, 20, 16);
    camera.lookAt(0, 0, 0);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Animate tree shadow drift (sunlight through swaying branches)
      if (shadowTexRef.current) {
        shadowTexRef.current.offset.x = Math.sin(elapsed * 0.15) * 0.05;
        shadowTexRef.current.offset.y = Math.cos(elapsed * 0.12) * 0.05;
      }

      // Smooth camera interpolation
      if (isTransitioningRef.current && transitionStartRef.current && transitionTargetRef.current) {
        const { pos: startPos, time: startTime, duration } = transitionStartRef.current;
        const progress = Math.min((performance.now() - startTime) / duration, 1);
        // Cubic easing
        const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        camera.position.lerpVectors(startPos, transitionTargetRef.current.pos, ease);
        camera.lookAt(transitionTargetRef.current.lookAt);

        if (progress >= 1) {
          isTransitioningRef.current = false;
          // Set final euler rotation from camera
          eulerRef.current.setFromQuaternion(camera.quaternion);
          targetEulerRef.current.copy(eulerRef.current);
        }
      } else if (mode === "walkthrough") {
        // Smooth mouse look inertia
        eulerRef.current.x += (targetEulerRef.current.x - eulerRef.current.x) * 0.08;
        eulerRef.current.y += (targetEulerRef.current.y - eulerRef.current.y) * 0.08;
        camera.quaternion.setFromEuler(eulerRef.current);
      } else if (mode === "isometric") {
        const w = container.clientWidth;
        const mob = w < 768;
        const tab = w >= 768 && w < 1024;
        const radius = mob ? 36 : tab ? 30 : 25;
        const camY = mob ? 22 : tab ? 19 : 17;
        const lookY = mob ? 1.0 : 1.5;

        // Gentle subtle rotation in isometric mode + manual user swipe offset
        const autoAngle = elapsed * 0.04 + manualIsoAngleRef.current;
        camera.position.x = Math.cos(autoAngle) * radius;
        camera.position.z = Math.sin(autoAngle) * radius;
        camera.position.y = camY;
        camera.lookAt(0, lookY, 0);
      }

      // Project 3D Hotspot positions to Screen 2D Coordinates
      if (mode === "walkthrough" && currentFloor.hotspots.length > 0) {
        const tempV = new THREE.Vector3();
        const updated = currentFloor.hotspots.map((hs) => {
          tempV.set(hs.position[0], hs.position[1], hs.position[2]);
          // Check if behind camera
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

    animate();

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const mob = w < 768;
      const tab = w >= 768 && w < 1024;
      camera.fov = mob ? 54 : tab ? 47 : 42;
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

  // 2. Load 3D Model when Floor or Mode Changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    setLoading(true);

    // Remove existing model
    if (activeModelRef.current) {
      scene.remove(activeModelRef.current);
      activeModelRef.current = null;
    }

    const loader = new GLTFLoader();
    const modelToLoad =
      mode === "isometric" ? "/models/isometric_slider.glb" : currentFloor.modelPath;

    loader.load(
      modelToLoad,
      (gltf) => {
        const model = gltf.scene;

        if (mode === "isometric") {
          model.position.set(0, 0, 0);
          model.scale.set(1, 1, 1);

          // Find active floor group name: gf_iso (ground), ff_iso (first), uf_iso (underground)
          let activeGroupName = "gf_iso";
          if (currentFloor.slug === "first-floor") activeGroupName = "ff_iso";
          else if (currentFloor.slug.includes("underground")) activeGroupName = "uf_iso";

          // Show only active floor group
          model.children.forEach((child) => {
            if (child.name === "gf_iso" || child.name === "ff_iso" || child.name === "uf_iso") {
              child.visible = child.name === activeGroupName;
            }
          });

          // Style the meshes with rich editorial architectural palette
          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;

              const name = mesh.name.toLowerCase();

              // Hide the flat 95m shadow plane inside GLB since we have the dynamic shadow_leaves projector
              if (name.includes("plane_shadow") || name.includes("shadow_ao")) {
                mesh.visible = false;
                return;
              }

              if (name.includes("floor")) {
                // Honed Italian travertine flooring
                mesh.material = new THREE.MeshStandardMaterial({
                  color: 0xc4baa8,
                  roughness: 0.65,
                  metalness: 0.05,
                });
              } else if (name.includes("wall")) {
                // Minimalist warm alabaster walls
                mesh.material = new THREE.MeshStandardMaterial({
                  color: 0xe5dfd5,
                  roughness: 0.85,
                  metalness: 0.02,
                });
              } else if (
                name.includes("table") ||
                name.includes("shelf") ||
                name.includes("desk") ||
                name.includes("billiards")
              ) {
                // Smoked oak & charred timber
                mesh.material = new THREE.MeshStandardMaterial({
                  color: 0x3d352e,
                  roughness: 0.45,
                  metalness: 0.08,
                });
              } else if (name.includes("marble") || name.includes("sheet") || name.includes("plinth")) {
                // Monolithic Nero Marquina & Roman Travertine slabs
                mesh.material = new THREE.MeshStandardMaterial({
                  color: 0x242220,
                  roughness: 0.28,
                  metalness: 0.12,
                });
              } else if (
                name.includes("armchair") ||
                name.includes("sopha") ||
                name.includes("pouf") ||
                name.includes("stool")
              ) {
                // Bouclé & warm cognac leather upholstery
                mesh.material = new THREE.MeshStandardMaterial({
                  color: 0x9b7a5a,
                  roughness: 0.8,
                  metalness: 0.02,
                });
              } else {
                // Fine architectural plaster
                mesh.material = new THREE.MeshStandardMaterial({
                  color: 0xd6cfc3,
                  roughness: 0.7,
                  metalness: 0.05,
                });
              }
            }
          });
        } else {
          // Walkthrough 1:1 scale with all high-res embedded textures
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
                mat.envMapIntensity = 1.2;
              }
            }
          });
        }

        scene.add(model);
        activeModelRef.current = model;
        setLoading(false);

        // Adjust background for mode
        if (mode === "walkthrough") {
          scene.background = new THREE.Color(0x0c0c10); // Moody ambient interior ceiling
          if (shadowMeshRef.current) shadowMeshRef.current.visible = false;
        } else {
          scene.background = new THREE.Color(0x08080a); // Luxury charcoal studio
          if (shadowMeshRef.current) shadowMeshRef.current.visible = true;
        }
      },
      undefined,
      (err) => {
        console.warn("Could not load model:", modelToLoad, err);
        setLoading(false);
      }
    );
  }, [currentFloor, mode]);

  // 3. Handle Mode Transitions (Dive from Isometric to Walkthrough)
  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    if (mode === "walkthrough") {
      playSfx("floor.mp3");
      // Animate camera dive into floor default POV
      const targetPos = new THREE.Vector3(
        currentFloor.defaultCameraPos[0],
        currentFloor.defaultCameraPos[1],
        currentFloor.defaultCameraPos[2]
      );
      const targetLook = new THREE.Vector3(
        currentFloor.defaultCameraTarget[0],
        currentFloor.defaultCameraTarget[1],
        currentFloor.defaultCameraTarget[2]
      );

      transitionStartRef.current = {
        pos: camera.position.clone(),
        rot: camera.rotation.clone(),
        time: performance.now(),
        duration: 1800, // 1.8s smooth dive
      };
      transitionTargetRef.current = {
        pos: targetPos,
        lookAt: targetLook,
      };
      isTransitioningRef.current = true;
    } else {
      // Return to isometric
      const w = mountRef.current?.clientWidth || window.innerWidth;
      const mob = w < 768;
      const tab = w >= 768 && w < 1024;
      const radius = mob ? 36 : tab ? 30 : 25;
      const camY = mob ? 22 : tab ? 19 : 17;
      const lookY = mob ? 1.0 : 1.5;

      const targetPos = new THREE.Vector3(Math.cos(0.5) * radius, camY, Math.sin(0.5) * radius);
      const targetLook = new THREE.Vector3(0, lookY, 0);

      transitionStartRef.current = {
        pos: camera.position.clone(),
        rot: camera.rotation.clone(),
        time: performance.now(),
        duration: 1400,
      };
      transitionTargetRef.current = {
        pos: targetPos,
        lookAt: targetLook,
      };
      isTransitioningRef.current = true;
    }
  }, [mode, currentFloor, playSfx]);

  // 4. Handle Hotspot Click (Smooth camera glide to viewpoint)
  const handleHotspotClick = (hs: GalleryHotspot) => {
    playSfx("pin.mp3");
    onSelectHotspot(hs);

    const camera = cameraRef.current;
    if (!camera) return;

    const targetPos = new THREE.Vector3(hs.cameraPos[0], hs.cameraPos[1], hs.cameraPos[2]);
    const targetLook = new THREE.Vector3(hs.cameraTarget[0], hs.cameraTarget[1], hs.cameraTarget[2]);

    transitionStartRef.current = {
      pos: camera.position.clone(),
      rot: camera.rotation.clone(),
      time: performance.now(),
      duration: 1600, // 1.6s smooth glide
    };
    transitionTargetRef.current = {
      pos: targetPos,
      lookAt: targetLook,
    };
    isTransitioningRef.current = true;
  };

  // 5. Interactive Mouse / Touch Drag to Look Around
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isTransitioningRef.current) return;
    isDraggingRef.current = true;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || isTransitioningRef.current) return;
    const deltaX = e.clientX - prevMouseRef.current.x;
    const deltaY = e.clientY - prevMouseRef.current.y;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };

    if (mode === "walkthrough") {
      // Update target euler angles with smooth sensitivity
      targetEulerRef.current.y -= deltaX * 0.0028;
      targetEulerRef.current.x -= deltaY * 0.0022;

      // Pitch limits (don't look past straight up/down)
      targetEulerRef.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetEulerRef.current.x));
    } else if (mode === "isometric") {
      manualIsoAngleRef.current -= deltaX * 0.005;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={mountRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full h-full select-none cursor-grab active:cursor-grabbing overflow-hidden touch-none"
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-[#08080a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-4 z-40">
          <div className="w-10 h-10 rounded-full border-2 border-[#c5a880]/20 border-t-[#c5a880] animate-spin" />
          <span className="text-xs tracking-[0.3em] text-[#fafafa] uppercase font-mono">
            Loading VELQON 3D Architectural Space...
          </span>
        </div>
      )}

      {/* 2D Projected Eye Pins (matching ICG Gallery 👁) */}
      {mode === "walkthrough" &&
        screenHotspots.map(({ hotspot, x, y, visible }) => {
          if (!visible || x < 0 || x > (mountRef.current?.clientWidth || 2000)) return null;

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
                {/* Outer pulse wave */}
                <span className="absolute -inset-2.5 rounded-full bg-white/40 animate-ping opacity-60 pointer-events-none" />

                {/* The Exact Reference Eye Pin Button */}
                <button
                  onClick={() => handleHotspotClick(hotspot)}
                  aria-label={`Vantage Point: ${hotspot.name}`}
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 backdrop-blur-sm cursor-pointer ${
                    isSelected
                      ? "bg-black text-white scale-110"
                      : "bg-white/95 text-black hover:scale-115 hover:bg-white"
                  }`}
                >
                  {/* Clean Eye Icon */}
                  <svg
                    className="w-6 h-6 fill-none stroke-current stroke-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                </button>

                {/* Tooltip on hover */}
                <div className="hidden group-hover:block absolute left-16 top-1/2 -translate-y-1/2 w-64 bg-black/90 border border-white/20 p-3 rounded shadow-2xl text-left pointer-events-none backdrop-blur-md">
                  <span className="text-[9px] tracking-[0.25em] text-[#c9a96e] uppercase block">
                    Vantage Point
                  </span>
                  <p className="text-xs font-serif text-[#fafafa] font-medium leading-snug">
                    {hotspot.name}
                  </p>
                  <p className="text-[10px] text-[#888888] tracking-wider mt-0.5">
                    {hotspot.subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
