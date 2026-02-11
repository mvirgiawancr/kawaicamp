"use client";

import React from "react";
import { ITEMS, type PhotoItem, type ItemCategory, CATEGORIES } from "@/data/items";
import { getPropImage } from "@/data/propImages";

interface PropBarProps {
  activeCategory: ItemCategory;
  activeItem: PhotoItem | null;
  onCategoryChange: (category: ItemCategory) => void;
  onItemSelect: (item: PhotoItem | null) => void;
}

export default function PropBar({
  activeCategory,
  activeItem,
  onCategoryChange,
  onItemSelect,
}: PropBarProps) {
  const filteredItems =
    activeCategory === "all"
      ? ITEMS
      : ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="flex flex-col gap-2">
      {/* Category pills */}
      <div className="flex gap-1.5 justify-center px-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              activeCategory === cat.id
                ? "bg-kawaii-pink text-white shadow-kawaii"
                : "bg-white/40 text-kawaii-text/50 hover:bg-white/60"
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Props horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto px-3 pb-1 scrollbar-none">
        {/* None option */}
        <button
          onClick={() => onItemSelect(null)}
          className={`flex-shrink-0 flex flex-col items-center gap-1 transition-all duration-200 ${
            activeItem === null ? "scale-110" : "opacity-60 hover:opacity-100"
          }`}
        >
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg
              ${
                activeItem === null
                  ? "bg-kawaii-pink text-white shadow-kawaii ring-2 ring-kawaii-pink ring-offset-2"
                  : "bg-white/50 text-kawaii-text/40"
              }`}
          >
            ✕
          </div>
          <span className="text-[9px] font-medium text-kawaii-text/50">
            None
          </span>
        </button>

        {filteredItems.map((item) => {
          const propImg = getPropImage(item);
          const isActive = activeItem?.id === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onItemSelect(isActive ? null : item)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 transition-all duration-200 ${
                isActive ? "scale-110" : "opacity-70 hover:opacity-100"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden
                  ${
                    isActive
                      ? "bg-kawaii-babypink shadow-kawaii ring-2 ring-kawaii-pink ring-offset-2"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
              >
                {propImg ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={propImg}
                    alt={item.name}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <span className="text-2xl">{item.emoji}</span>
                )}
              </div>
              <span className="text-[9px] font-medium text-kawaii-text/50 truncate max-w-[56px]">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
