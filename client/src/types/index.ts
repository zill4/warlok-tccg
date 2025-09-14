export type CardType = "Monster" | "Spell" | "Trap";
export type CardAttribute =
  | "LIGHT"
  | "DARK"
  | "FIRE"
  | "WATER"
  | "EARTH"
  | "WIND"
  | "DIVINE";
export type CardRarity =
  | "Common"
  | "Rare"
  | "Super Rare"
  | "Ultra Rare"
  | "Secret Rare";

export interface YuGiOhCard {
  id: number;
  name: string;
  type: CardType;
  attribute?: CardAttribute;
  level?: number;
  attack?: number;
  defense?: number;
  description: string;
  rarity: CardRarity;
  cardArt: string;
  monsterType?: string;
  spellTrapType?: string;
}
