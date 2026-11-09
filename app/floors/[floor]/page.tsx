import { notFound } from "next/navigation";
import { galleryFloors } from "@/lib/galleryData";
import FloorWalkthroughClient from "./FloorWalkthroughClient";

interface PageProps {
  params: Promise<{
    floor: string;
  }>;
}

export function generateStaticParams() {
  const params = galleryFloors.map((floor) => ({
    floor: floor.slug,
  }));
  // Also include alias underground-floor
  params.push({ floor: "underground-floor" });
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { floor: floorSlug } = await params;
  const normalizedSlug = floorSlug === "underground-floor" ? "underground" : floorSlug;
  const floor = galleryFloors.find((f) => f.slug === normalizedSlug || f.id === normalizedSlug);

  if (!floor) return { title: "Floor Walkthrough | VELQON" };

  return {
    title: `${floor.name} (${floor.level}) Walkthrough | VELQON`,
    description: floor.tagline,
  };
}

export default async function FloorPage({ params }: PageProps) {
  const { floor: floorSlug } = await params;
  const normalizedSlug = floorSlug === "underground-floor" ? "underground" : floorSlug;
  const floor = galleryFloors.find((f) => f.slug === normalizedSlug || f.id === normalizedSlug);

  if (!floor) {
    notFound();
  }

  return <FloorWalkthroughClient initialFloor={floor} />;
}
