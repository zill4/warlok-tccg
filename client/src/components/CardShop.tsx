import { FC, useState, useEffect } from "react";
import Card from "./Card";
import { YuGiOhCard } from "../types";
import cardsData from "../data/cards.json";

const CardShop: FC = () => {
  const [cards, setCards] = useState<YuGiOhCard[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const isAVP = import.meta.env.XR_ENV === "avp";

  useEffect(() => {
    setCards(cardsData as YuGiOhCard[]);
    
    if (isAVP) {
      document.documentElement.classList.add("is-spatial");
      document.title = "WARLOK TCG - Spatial Card Shop";
    }
  }, [isAVP]);

  // Filter cards based on selected filter and search term
  const filteredCards = cards.filter((card) => {
    const matchesFilter = selectedFilter === "All" || card.type === selectedFilter;
    const matchesSearch = 
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterOptions = ["All", "Monster", "Spell", "Trap"];

  const handleClearFilters = () => {
    setSelectedFilter("All");
    setSearchTerm("");
  };

  return (
    <div 
      enable-xr
      debugName="card-shop"
      className="card-shop py-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        WARLOK Card Shop
      </h1>

      {/* Search Bar */}
      <div className="mb-6 max-w-md mx-auto">
        <div className="relative">
          <input
            enable-xr
            type="text"
            placeholder="Search cards..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Filter Controls */}
      <div 
        enable-xr
        debugName="filter-controls"
        className="mb-8"
      >
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                enable-xr
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedFilter === filter
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        {(selectedFilter !== "All" || searchTerm) && (
          <div className="text-center mt-4">
            <button
              enable-xr
              onClick={handleClearFilters}
              className="text-sm text-indigo-600 hover:text-indigo-800 underline"
            >
              Clear Filters ({filteredCards.length} cards shown)
            </button>
          </div>
        )}
      </div>

      {/* Cards Grid */}
      <div 
        enable-xr-monitor
        className="auto-fill-grid gap-6 px-4 max-w-7xl mx-auto"
      >
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <Card key={card.id} card={card} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No cards found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Show All Cards
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardShop;
