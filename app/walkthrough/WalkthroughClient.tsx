"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ScrollWalkthrough3D from "@/app/components/gallery/ScrollWalkthrough3D";
import { galleryFloors, GalleryFloor } from "@/lib/galleryData";

export default function WalkthroughClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const floorParam = searchParams.get("floor");

  const [currentFloor, setCurrentFloor] = useState<GalleryFloor>(() => {
    if (floorParam) {
      const match = galleryFloors.find(
        (f) => f.slug === floorParam || f.id === floorParam
      );
      if (match) return match;
    }
    return galleryFloors[0]; // Ground Floor
  });

  useEffect(() => {
    if (floorParam) {
      const match = galleryFloors.find(
        (f) => f.slug === floorParam || f.id === floorParam
      );
      if (match && match.id !== currentFloor.id) {
        setCurrentFloor(match);
      }
    }
  }, [floorParam, currentFloor.id]);

  const handleSelectFloor = (floor: GalleryFloor) => {
    setCurrentFloor(floor);
    router.replace(`/walkthrough?floor=${floor.slug}`, { scroll: false });
  };

  const handleExit = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#08080a] text-[#fafafa] selection:bg-[#c5a880] selection:text-black">
      <Navbar />
      <div className="relative w-full">
        <ScrollWalkthrough3D
          currentFloor={currentFloor}
          onSelectFloor={handleSelectFloor}
          onExitToIsometric={handleExit}
        />
      </div>
      <Footer />
    </main>
  );
}

