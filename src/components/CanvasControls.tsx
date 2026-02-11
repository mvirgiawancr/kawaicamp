"use client";

import React from "react";
import { Undo2, Redo2, Trash2, X } from "lucide-react";

interface CanvasControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onDeleteSelected: () => void;
  itemCount: number;
}

export default function CanvasControls({
  onUndo,
  onRedo,
  onClear,
  onDeleteSelected,
  itemCount,
}: CanvasControlsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={onUndo}
        className="btn-kawaii-ghost p-2 rounded-lg"
        title="Undo"
      >
        <Undo2 className="w-4 h-4" />
      </button>
      <button
        onClick={onRedo}
        className="btn-kawaii-ghost p-2 rounded-lg"
        title="Redo"
      >
        <Redo2 className="w-4 h-4" />
      </button>
      <button
        onClick={onDeleteSelected}
        className="btn-kawaii-ghost p-2 rounded-lg"
        title="Delete Selected"
      >
        <X className="w-4 h-4" />
      </button>
      {itemCount > 0 && (
        <button
          onClick={onClear}
          className="btn-kawaii-ghost p-2 rounded-lg text-kawaii-error/60 hover:text-kawaii-error hover:bg-red-50"
          title="Clear All"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
