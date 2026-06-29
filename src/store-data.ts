/**
 * Domain types and mock data for the AtherSMP store prototype.
 */

/** A line in the shopping cart. */
export type CartLine = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

/** A purchasable rank package. */
export type Rank = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  color: string;
  glow: string;
  description: string;
  perks: string[];
  commands: string[];
  popular?: boolean;
  /** Payhip direct checkout URL — clicking buy opens this in a new tab. */
  buyUrl: string;
};

/** A purchasable in-game crate key. */
export type StoreItem = {
  id: string;
  name: string;
  category: 'Keys';
  price: number;
  originalPrice?: number;
  emoji: string;
  tag?: string;
  /** Payhip direct checkout URL. */
  buyUrl: string;
};

/** The available ranks for purchase. */
export const ranks: Rank[] = [
  {
    id: 'knight',
    name: 'Knight',
    price: 4.99,
    color: '#ffb800',
    glow: 'rgba(255,184,0,0.45)',
    description: 'The Knight rank will give you various useful perks on the server. You can obtain Knight in the coinshop!',
    perks: ['Prefix: KNIGHT', 'Access to set 5x Homes', 'Kit Knight'],
    commands: ['/Nick', '/Back', '/Recipe', '/Feed', '/Disposal'],
    buyUrl: 'https://payhip.com/order?link=UXiKP&pricing_plan=ANzp0Y4LzX',
  },
  {
    id: 'lord',
    name: 'Lord',
    price: 9.99,
    color: '#4ade80',
    glow: 'rgba(74,222,128,0.45)',
    description: 'The Lord rank will give you various useful perks on the server. You can obtain Lord in the coinshop!',
    perks: ['Prefix: LORD', 'Access to set 10x Homes', 'Kit Lord'],
    commands: ['/Nick', '/Back', '/Recipe', '/Feed', '/Disposal', '/Near', '/Craft'],
    buyUrl: 'https://payhip.com/order?link=UXiKP&pricing_plan=rjznKrL8B7',
  },
  {
    id: 'paladin',
    name: 'Paladin',
    price: 14.99,
    color: '#33c1ff',
    glow: 'rgba(51,193,255,0.45)',
    description: 'The Paladin rank will give you various useful perks on the server. You can obtain Paladin in the coinshop!',
    perks: ['Prefix: PALADIN', 'Access to set Unlimited Homes', 'Kit Paladin'],
    commands: ['/Nick', '/Back', '/Recipe', '/Feed', '/Disposal', '/Near', '/Craft', '/Enderchest', '/Ptime'],
    popular: true,
    buyUrl: 'https://payhip.com/order?link=UXiKP&pricing_plan=PAWg3JLKWK',
  },
  {
    id: 'duke',
    name: 'Duke',
    price: 19.99,
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.45)',
    description: 'The Duke rank will give you various useful perks on the server. You can obtain Duke in the coinshop!',
    perks: ['Prefix: DUKE', 'Access to set Unlimited Homes', 'Kit Duke'],
    commands: ['/Nick', '/Back', '/Recipe', '/Feed', '/Disposal', '/Near', '/Craft', '/Enderchest', '/Ptime', '/Heal', '/Fly'],
    buyUrl: 'https://payhip.com/order?link=UXiKP&pricing_plan=91zw8aYVBL',
  },
  {
    id: 'king',
    name: 'King',
    price: 24.99,
    color: '#ff3b3b',
    glow: 'rgba(255,59,59,0.5)',
    description: 'The King rank will give you various useful perks on the server. You can obtain King in the coinshop!',
    perks: ['Prefix: KING', 'Access to set Unlimited Homes', 'Kit King'],
    commands: ['/Nick', '/Back', '/Recipe', '/Feed', '/Disposal', '/Near', '/Craft', '/Enderchest', '/Ptime', '/Heal', '/Fly', '/Pweather', '/Repair'],
    buyUrl: 'https://payhip.com/order?link=UXiKP&pricing_plan=20zAXYjwWr',
  },
];

/** The available crate keys. */
export const items: StoreItem[] = [
  {
    id: 'rare-key',
    name: 'Rare Key',
    category: 'Keys',
    price: 2.99,
    emoji: '🗝️',
    buyUrl: 'https://payhip.com/order?link=UXiKP&pricing_plan=O3Bem2LyB5',
  },
  {
    id: 'superior-key',
    name: 'Superior Key',
    category: 'Keys',
    price: 4.99,
    emoji: '💎',
    buyUrl: 'https://payhip.com/order?link=UXiKP&pricing_plan=nLWRaw6vGa',
  },
  {
    id: 'epic-key',
    name: 'Epic Key',
    category: 'Keys',
    price: 7.99,
    emoji: '🔮',
    tag: 'Best Value',
    buyUrl: 'https://payhip.com/order?link=UXiKP&pricing_plan=rdWQ8wZ6Gj',
  },
];
