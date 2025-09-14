"use client";

import React from "react";
import { Card, starterCards } from "./cards";
import type { CardType } from "./cards";

const FILTERS: Array<{ label: string; value: "All" | CardType }> = [
  { label: "All", value: "All" },
  { label: "Monster", value: "Monster" },
  { label: "Spell", value: "Spell" },
  { label: "Trap", value: "Trap" },
];

export default function CardShop() {
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<"All" | CardType>("All");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return starterCards.filter((c) => {
      const matchesFilter = filter === "All" ? true : c.type === filter;
      const matchesQuery =
        q.length === 0
          ? true
          : c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="aqua-toolbar-controls">
        <div className="aqua-segmented">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`aqua-segment ${filter === f.value ? "active" : ""}`}
              onClick={() => setFilter(f.value)}
              type="button"
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="aqua-search">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cards"
            className="aqua-search-input"
            aria-label="Search cards"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-2">
        {filtered.map((c) => (
          <Card key={c.id} card={c} className="cursor-default" />
        ))}
      </div>
    </div>
  );
}


