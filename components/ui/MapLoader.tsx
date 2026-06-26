"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map").then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[280px] bg-neutral-100 flex items-center justify-center rounded-[12px]">
      <p className="text-neutral-400 text-[14px]">Karte wird geladen...</p>
    </div>
  ),
});

export function MapLoader({ lat, lng, zoom }: { lat: number; lng: number; zoom?: number }) {
  return <Map lat={lat} lng={lng} zoom={zoom} />;
}
