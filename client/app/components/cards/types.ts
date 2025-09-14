export interface YuGiOhCard {
  id: string;
  name: string;
  type: "Monster" | "Spell" | "Trap";
  attribute?: "DARK" | "LIGHT" | "FIRE" | "WATER" | "EARTH" | "WIND" | "DIVINE";
  level?: number;
  attack?: number;
  defense?: number;
  description: string;
  rarity: "Common" | "Rare" | "Super Rare" | "Ultra Rare" | "Secret Rare";
  cardArt: string;
  monsterType?: string;
  spellTrapType?:
    | "Normal"
    | "Quick-Play"
    | "Ritual"
    | "Equip"
    | "Field"
    | "Continuous"
    | "Counter";
}

export type CardRarity = YuGiOhCard["rarity"];
export type CardType = YuGiOhCard["type"];
export type CardAttribute = YuGiOhCard["attribute"];
