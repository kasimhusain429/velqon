"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ScrollWalkthrough3D from "@/app/components/gallery/ScrollWalkthrough3D";
import { GalleryFloor } from "@/lib/galleryData";

interface Props {
  initialFloor: GalleryFloor;
}

export default function FloorWalkthroughClient({ initialFloor }: Props) {
  const router = useRouter();
  const [currentFloor, setCurrentFloor] = useState<GalleryFloor>(initialFloor);

  const handleSelectFloor = (floor: GalleryFloor) => {
    setCurrentFloor(floor);
    router.replace(`/floors/${floor.slug}`, { scroll: false });
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

