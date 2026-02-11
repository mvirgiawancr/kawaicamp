"use client";

import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "success",
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !show) return null;

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div
        className={`glass-card-solid px-5 py-3 flex items-center gap-3 shadow-kawaii-lg ${
          type === "success"
            ? "border-kawaii-success/30"
            : "border-kawaii-error/30"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            type === "success"
              ? "bg-kawaii-success/10 text-kawaii-success"
              : "bg-kawaii-error/10 text-kawaii-error"
          }`}
        >
          {type === "success" ? (
            <Check className="w-4 h-4" />
          ) : (
            <X className="w-4 h-4" />
          )}
        </div>
        <div>
          <p className="font-semibold text-sm text-kawaii-text">{message}</p>
          {type === "success" && (
            <p className="text-xs text-kawaii-text/50">
              Your masterpiece has been saved! ✨
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setShow(false);
            setTimeout(onClose, 300);
          }}
          className="ml-2 p-1 rounded-full hover:bg-kawaii-babypink/30 transition-colors"
        >
          <X className="w-3.5 h-3.5 text-kawaii-text/40" />
        </button>
      </div>
    </div>
  );
}
