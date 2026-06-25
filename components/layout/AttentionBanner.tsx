"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface BannerEvent { name: string; date: string }

const events: BannerEvent[] = [
  { name: "Uccelli Sommerfest", date: "15. August 2026" },
  { name: "Skills4Growth Workshop", date: "22. September 2026" },
];

export function AttentionBanner() {
  const [index, setIndex] = useState(0);
  if (events.length === 0) return null;
  const current = events[index];

  return (
    <div className="bg-black text-white text-[11px] font-bold tracking-[0.1em] uppercase">
      <div className="flex items-center justify-center h-9 px-4 max-w-[1400px] mx-auto gap-3">
        {events.length > 1 && (
          <button onClick={() => setIndex((i) => (i - 1 + events.length) % events.length)}
            className="p-1 hover:opacity-60 transition-opacity cursor-pointer hidden sm:block" aria-label="Vorheriges Event">
            <ChevronLeft size={12} />
          </button>
        )}
        <p className="text-center truncate">{current.name} — {current.date}</p>
        {events.length > 1 && (
          <button onClick={() => setIndex((i) => (i + 1) % events.length)}
            className="p-1 hover:opacity-60 transition-opacity cursor-pointer hidden sm:block" aria-label="Nächstes Event">
            <ChevronRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
