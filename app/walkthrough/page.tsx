import { Suspense } from "react";
import WalkthroughClient from "./WalkthroughClient";

export const metadata = {
  title: "3D Spatial Walkthrough | VELQON",
  description:
    "Experience the immersive first-person 3D architectural walkthrough of VELQON's continuous spatial interior in Dubai.",
};

export default function WalkthroughPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#08080a] flex flex-col items-center justify-center gap-4 text-[#fafafa]">
          <div className="w-10 h-10 rounded-full border-2 border-[#c5a880]/20 border-t-[#c5a880] animate-spin" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c5a880]">
            Loading VELQON Spatial Walkthrough...
          </span>
        </div>
      }
    >
      <WalkthroughClient />
    </Suspense>
  );
}

