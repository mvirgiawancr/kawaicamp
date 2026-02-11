export interface PhotoItem {
    id: string;
    name: string;
    category: ItemCategory;
    emoji: string;
    defaultScale: number;
}

export type ItemCategory =
    | "all"
    | "hats"
    | "glasses"
    | "props"
    | "stickers";

export const CATEGORIES: { id: ItemCategory; label: string; emoji: string }[] = [
    { id: "all", label: "All", emoji: "✨" },
    { id: "hats", label: "Hats", emoji: "🎩" },
    { id: "glasses", label: "Glasses", emoji: "👓" },
    { id: "props", label: "Props", emoji: "🎈" },
    { id: "stickers", label: "Stickers", emoji: "⭐" },
];

export const ITEMS: PhotoItem[] = [
    // Hats & Headwear
    { id: "neko-ears", name: "Neko Ears", category: "hats", emoji: "🐱", defaultScale: 0.8 },
    { id: "pink-beret", name: "Pink Beret", category: "hats", emoji: "🎀", defaultScale: 0.7 },
    { id: "crown", name: "Crown", category: "hats", emoji: "👑", defaultScale: 0.7 },
    { id: "bunny-ears", name: "Bunny Ears", category: "hats", emoji: "🐰", defaultScale: 0.8 },
    { id: "flower-crown", name: "Flower Crown", category: "hats", emoji: "🌸", defaultScale: 0.7 },
    { id: "witch-hat", name: "Witch Hat", category: "hats", emoji: "🧙‍♀️", defaultScale: 0.8 },
    { id: "unicorn-horn", name: "Unicorn Horn", category: "hats", emoji: "🦄", defaultScale: 0.7 },
    { id: "fancy-bow", name: "Fancy Bow", category: "hats", emoji: "🎀", defaultScale: 0.6 },

    // Glasses & Face Accessories
    { id: "heart-glass", name: "Heart Glass", category: "glasses", emoji: "💕", defaultScale: 0.6 },
    { id: "star-glasses", name: "Star Glasses", category: "glasses", emoji: "⭐", defaultScale: 0.6 },
    { id: "round-glasses", name: "Round Glasses", category: "glasses", emoji: "🤓", defaultScale: 0.6 },
    { id: "sunglasses", name: "Sunglasses", category: "glasses", emoji: "😎", defaultScale: 0.6 },
    { id: "blushie", name: "Blushie", category: "glasses", emoji: "☺️", defaultScale: 0.5 },
    { id: "mustache", name: "Mustache", category: "glasses", emoji: "🥸", defaultScale: 0.5 },

    // Props
    { id: "sparkles", name: "Sparkles", category: "props", emoji: "✨", defaultScale: 0.5 },
    { id: "balloon", name: "Balloon", category: "props", emoji: "🎈", defaultScale: 0.6 },
    { id: "flower", name: "Flower", category: "props", emoji: "🌹", defaultScale: 0.5 },
    { id: "speech-hi", name: "Say Hi!", category: "props", emoji: "💬", defaultScale: 0.6 },
    { id: "rainbow", name: "Rainbow", category: "props", emoji: "🌈", defaultScale: 0.7 },
    { id: "candy", name: "Candy", category: "props", emoji: "🍭", defaultScale: 0.5 },
    { id: "magic-wand", name: "Magic Wand", category: "props", emoji: "🪄", defaultScale: 0.5 },
    { id: "cherry", name: "Cherry", category: "props", emoji: "🍒", defaultScale: 0.5 },

    // Stickers & Emojis
    { id: "heart", name: "Heart", category: "stickers", emoji: "❤️", defaultScale: 0.4 },
    { id: "star", name: "Star", category: "stickers", emoji: "⭐", defaultScale: 0.4 },
    { id: "kiss", name: "Kiss", category: "stickers", emoji: "💋", defaultScale: 0.4 },
    { id: "fire", name: "Fire", category: "stickers", emoji: "🔥", defaultScale: 0.4 },
    { id: "butterfly", name: "Butterfly", category: "stickers", emoji: "🦋", defaultScale: 0.5 },
    { id: "moon", name: "Moon", category: "stickers", emoji: "🌙", defaultScale: 0.5 },
    { id: "cloud", name: "Cloud", category: "stickers", emoji: "☁️", defaultScale: 0.5 },
    { id: "diamond", name: "Diamond", category: "stickers", emoji: "💎", defaultScale: 0.4 },
];

export type FilterType = "none" | "grayscale" | "sepia" | "vintage" | "warm" | "cool" | "pink";

export const FILTERS: { id: FilterType; label: string; css: string }[] = [
    { id: "none", label: "None", css: "none" },
    { id: "grayscale", label: "B&W", css: "grayscale(100%)" },
    { id: "sepia", label: "Sepia", css: "sepia(80%)" },
    { id: "vintage", label: "Vintage", css: "sepia(40%) contrast(110%) brightness(90%)" },
    { id: "warm", label: "Warm", css: "saturate(130%) brightness(105%) hue-rotate(-10deg)" },
    { id: "cool", label: "Cool", css: "saturate(90%) brightness(105%) hue-rotate(20deg)" },
    { id: "pink", label: "Kawaii", css: "saturate(120%) brightness(105%) hue-rotate(-20deg) contrast(95%)" },
];
