"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface BannerEvent {
  name: string;
  date: string;
}

const events: BannerEvent[] = [
  { name: "Uccelli Sommerfest", date: "15. August 2026" },
  { name: "Skills4Growth Workshop", date: "22. September 2026" },
];

export function AttentionBanner() {
  const [index, setIndex] = useState(0);
  const current = events[index];

  if (events.length === 0) return null;

  return (
    <div className="bg-brand-black text-brand-white text-xs font-bold font-lato tracking-wide">
      <div className="flex items-center justify-between h-8 px-4 max-w-[1400px] mx-auto">
        <button
          onClick={() => setIndex((i) => (i - 1 + events.length) % events.length)}
          className="p-1 hover:opacity-70 transition-opacity hidden lg:block"
          aria-label="Vorheriges Event"
        >
          <ChevronLeft size={14} />
        </button>
        <p className="text-center flex-1 truncate">
          {current.name}, {current.date}
        </p>
        <button
          onClick={() => setIndex((i) => (i + 1) % events.length)}
          className="p-1 hover:opacity-70 transition-opacity hidden lg:block"
          aria-label="Nächstes Event"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
