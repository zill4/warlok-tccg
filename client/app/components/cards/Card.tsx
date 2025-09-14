"use client";
import React from 'react';
import Image from 'next/image';
import { YuGiOhCard } from './types';
import { initScene } from '@webspatial/react-sdk';

interface CardProps {
  card: YuGiOhCard;
  className?: string;
}

const Card: React.FC<CardProps> = ({ card, className = '' }) => {
  const isWebSpatial = process.env.XR_ENV === 'avp';

  
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    initScene("cardDetailScene", prevConfig => {
      return {
        ...prevConfig,
        defaultSize: {
          width: 1200,
          height: 900,
        },
      };
    });
    
    // Get base URL for WebSpatial environment
    const baseUrl = process.env.XR_ENV === 'avp' && typeof window !== 'undefined'
      ? window.location.origin + '/webspatial/avp'
      : '';
    
    window.open(
      `${baseUrl}/card/${card.id}`,
      "cardDetailScene"
    );
  };
  const rarityColors = {
    'Common': 'from-gray-100 to-gray-200',
    'Rare': 'from-blue-100 to-blue-200',
    'Super Rare': 'from-purple-100 to-purple-200',
    'Ultra Rare': 'from-yellow-100 to-yellow-200',
    'Secret Rare': 'from-red-100 to-red-200'
  };

  const attributeColors = {
    'DARK': 'bg-purple-800',
    'LIGHT': 'bg-yellow-400',
    'FIRE': 'bg-red-500',
    'WATER': 'bg-blue-500',
    'EARTH': 'bg-green-500',
    'WIND': 'bg-cyan-400',
    'DIVINE': 'bg-gradient-to-r from-yellow-400 to-orange-400'
  };

  const renderStars = (level?: number) => {
    if (!level) return null;
    return (
      <div className="flex justify-end mb-2">
        {Array.from({ length: level }, (_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>
    );
  };

  return (
    <div 
      className={`relative w-64 h-96 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105
        bg-gradient-to-b ${rarityColors[card.rarity]} border-2 border-gray-300 card-hover-effect
        ${className}
      `}
      style={isWebSpatial ? {
        "--xr-background-material": "ultraThin",
        "--xr-back": 10,
        position: "relative"
      } as React.CSSProperties : {}}
    >
      {/* Card Name Header */}
      <div className="relative bg-gradient-to-r from-gray-700 to-gray-900 p-2">
        <h3 className="text-white font-bold text-sm text-center truncate">{card.name}</h3>
        {card.attribute && (
          <div className={`absolute -right-1 -top-1 w-6 h-6 rounded-full ${attributeColors[card.attribute]} border border-white flex items-center justify-center`}>
            <span className="text-xs font-bold text-white">{card.attribute[0]}</span>
          </div>
        )}
      </div>

      {/* Level Stars */}
      {card.level && (
        <div className="px-2 pt-1">
          {renderStars(card.level)}
        </div>
      )}

      {/* Card Art */}
      <div className="relative h-40 bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden">
        <Image
          src={card.cardArt}
          alt={card.name}
          width={256}
          height={160}
          className="w-full h-full object-cover border-2 border-gray-400 cursor-pointer transition-transform duration-300 hover:scale-110"
          onClick={handleCardClick}
          style={isWebSpatial ? {
            "--xr-back": 5
          } as React.CSSProperties : {}}
        />
      </div>

      {/* Monster Type/Stats Section */}
      {card.type === 'Monster' && (
        <div className="bg-orange-100 border-y border-orange-300 p-1">
          <p className="text-xs text-center font-medium text-gray-700">
            [{card.monsterType}]
          </p>
        </div>
      )}

      {/* Description */}
      <div className="p-2 bg-white flex-1">
        <p className="text-xs text-gray-700 leading-tight line-clamp-4">
          {card.description}
        </p>
      </div>

      {/* Stats Footer */}
      {card.type === 'Monster' && (
        <div className="bg-orange-200 p-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-xs font-bold">
              <span className="text-red-600">ATK</span>
              <span className="text-gray-700">/{card.attack}</span>
            </div>
            <div className="text-xs font-bold">
              <span className="text-blue-600">DEF</span>
              <span className="text-gray-700">/{card.defense}</span>
            </div>
          </div>
          <div className="text-xs font-bold text-gray-600">
            {card.rarity}
          </div>
        </div>
      )}

      {/* Spell/Trap Footer */}
      {card.type !== 'Monster' && (
        <div className="bg-green-200 p-2 flex justify-between items-center">
          <div className="text-xs font-bold text-gray-700">
            {card.type} Card
          </div>
          <div className="text-xs font-bold text-gray-600">
            {card.rarity}
          </div>
        </div>
      )}

      {/* Holographic Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 pointer-events-none"></div>
    </div>
  );
};

export default Card;
