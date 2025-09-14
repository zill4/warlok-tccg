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
  const isWebSpatial = process.env.XR_ENV === 'avp';

  React.useEffect(() => {
    // Add spatial class to html element if in XR mode
    // if (isWebSpatial && typeof document !== 'undefined') {
    //   document.documentElement.classList.add('is-spatial');
    // }
    
    console.log('XR Environment:', process.env.XR_ENV, 'isWebSpatial:', isWebSpatial);
    
    // // Add debug info to title for easy verification
    // if (typeof document !== 'undefined') {
    //   document.title = isWebSpatial ? 'WARLOK Card Shop (XR Mode)' : 'WARLOK Card Shop';
    // }
  }, []);

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
              style={isWebSpatial ? {
                "--xr-background-material": filter === f.value ? "thin" : "thick"
              } as React.CSSProperties : {}}
              className={`aqua-segment ${
                filter === f.value ? "active" : ""
              } ${
                isWebSpatial 
                  ? filter === f.value 
                    ? "text-gray-100" 
                    : "text-gray-900"
                  : ""
              }`}
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
            style={isWebSpatial ? {
              "--xr-background-material": "ultraThin"
            } as React.CSSProperties : {}}
          />
        </div>
      </div>

      <div 
        className="auto-fill-grid gap-4 sm:gap-6 p-2"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
        }}
      >
        {filtered.length > 0 ? (
          filtered.map((c) => (
            <Card key={c.id} card={c} className="cursor-default" />
          ))
        ) : (
          <div className="col-span-full text-center py-8 sm:py-12">
            <p className="text-lg sm:text-xl text-gray-600">
              No cards found matching your criteria.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => {
                setFilter("All");
                setQuery("");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


