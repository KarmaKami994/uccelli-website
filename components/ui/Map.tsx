"use client";

import { useEffect, useRef, useState } from "react";

interface MapProps {
  lat: number;
  lng: number;
  zoom?: number;
  className?: string;
}

export function Map({ lat, lng, zoom = 14, className = "" }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || loaded) return;

    // Dynamic import to avoid SSR issues
    Promise.all([
      import("leaflet"),
      import("leaflet/dist/leaflet.css"),
    ]).then(([L]) => {
      if (!mapRef.current) return;

      const map = L.default.map(mapRef.current).setView([lat, lng], zoom);

      L.default.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // Custom marker
      const icon = L.default.divIcon({
        html: `<div style="width:24px;height:24px;background:#5170FF;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        className: "",
      });

      L.default.marker([lat, lng], { icon }).addTo(map);

      setLoaded(true);

      return () => { map.remove(); };
    });
  }, [lat, lng, zoom, loaded]);

  return (
    <div
      ref={mapRef}
      className={`w-full rounded-[12px] overflow-hidden ${className}`}
      style={{ height: "100%", minHeight: "280px" }}
    />
  );
}
