"use client";

import React from "react";
import { FILTERS, type FilterType } from "@/data/items";
import { Palette } from "lucide-react";

interface FilterSelectProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterSelect({
  activeFilter,
  onFilterChange,
}: FilterSelectProps) {
  return (
    <div className="flex items-center gap-2 px-3 pb-3 pt-1">
      <Palette className="w-3.5 h-3.5 text-kawaii-text/30 flex-shrink-0" />
      <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-medium transition-all duration-200 ${
              activeFilter === filter.id
                ? "bg-kawaii-pink text-white shadow-kawaii"
                : "bg-white/30 text-kawaii-text/40 hover:bg-white/50"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
