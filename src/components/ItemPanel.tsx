"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, ITEMS, type PhotoItem, type ItemCategory } from "@/data/items";

interface ItemPanelProps {
  onAddItem: (item: PhotoItem) => void;
}

export default function ItemPanel({ onAddItem }: ItemPanelProps) {
  const [activeCategory, setActiveCategory] = useState<ItemCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    let items = ITEMS;
    if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter((item) => item.name.toLowerCase().includes(query));
    }
    return items;
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-xl font-bold text-kawaii-text">
          Add Magic <span className="text-kawaii-pink">✨</span>
        </h2>
        <p className="text-xs text-kawaii-text/50 mt-0.5">
          Select props to personalize your photo
        </p>
      </div>

      {/* Search */}
      <div className="px-5 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kawaii-text/40" />
          <input
            type="text"
            placeholder="Search props..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/60 border border-kawaii-babypink/30
                       text-sm text-kawaii-text placeholder:text-kawaii-text/30
                       focus:outline-none focus:border-kawaii-pink/50 focus:ring-2 focus:ring-kawaii-pink/10
                       transition-all duration-200"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-5 pb-3">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`category-tab ${
                activeCategory === cat.id
                  ? "category-tab-active"
                  : "category-tab-inactive"
              }`}
            >
              <span className="mr-1">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Item Grid */}
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-kawaii-text/40">
            <span className="text-3xl mb-2">🔍</span>
            <p className="text-sm">No props found</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onAddItem(item)}
                className="item-card"
                title={item.name}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-[10px] font-medium text-kawaii-text/60 truncate w-full text-center">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
