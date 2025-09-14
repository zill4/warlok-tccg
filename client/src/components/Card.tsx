import { FC } from "react";
import { YuGiOhCard } from "../types";
import { initScene } from "@webspatial/react-sdk";

interface CardProps {
  card: YuGiOhCard;
}

const Card: FC<CardProps> = ({ card }) => {
  const isAVP = import.meta.env.XR_ENV === "avp";

  const handleCardClick = () => {
    if (isAVP) {
      initScene("cardDetailScene", (prevConfig) => {
        return {
          ...prevConfig,
          defaultSize: {
            width: 800,
            height: 600,
          },
        };
      });
      window.open(`${__XR_ENV_BASE__}/card/${card.id}`, "cardDetailScene");
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "text-gray-600";
      case "Rare":
        return "text-blue-600";
      case "Super Rare":
        return "text-purple-600";
      case "Ultra Rare":
        return "text-yellow-600";
      case "Secret Rare":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getAttributeColor = (attribute?: string) => {
    switch (attribute) {
      case "LIGHT":
        return "text-yellow-400";
      case "DARK":
        return "text-purple-800";
      case "FIRE":
        return "text-red-600";
      case "WATER":
        return "text-blue-600";
      case "EARTH":
        return "text-green-600";
      case "WIND":
        return "text-gray-400";
      case "DIVINE":
        return "text-gold-400";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      enable-xr
      debugName={`card-${card.id}`}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Card Art */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={card.cardArt}
          alt={card.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-semibold">
          {card.rarity}
        </div>
      </div>

      {/* Card Info */}
      <div
        enable-xr
        debugName={`card-info-${card.id}`}
        className="p-4"
      >
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{card.name}</h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className={`font-semibold ${getRarityColor(card.rarity)}`}>
            {card.type}
          </span>
          {card.attribute && (
            <span className={`text-sm font-medium ${getAttributeColor(card.attribute)}`}>
              {card.attribute}
            </span>
          )}
        </div>

        {card.level && (
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-600 mr-2">Level:</span>
            <div className="flex">
              {Array.from({ length: card.level }).map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
          </div>
        )}

        {card.type === "Monster" && (
          <div
            enable-xr
            className="flex justify-between text-sm mb-2"
          >
            <span className="text-red-600 font-semibold">ATK: {card.attack}</span>
            <span className="text-blue-600 font-semibold">DEF: {card.defense}</span>
          </div>
        )}

        <p className="text-gray-700 text-sm line-clamp-3 mb-3">
          {card.description}
        </p>

        {card.monsterType && (
          <div className="text-xs text-gray-500 mb-2">
            Type: {card.monsterType}
          </div>
        )}

        {card.spellTrapType && (
          <div className="text-xs text-gray-500 mb-2">
            Type: {card.spellTrapType}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
