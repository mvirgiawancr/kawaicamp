"use client";

import React, { useState } from "react";
import { Download, X, RotateCcw, LayoutGrid, Rows3 } from "lucide-react";

export type PolaroidLayout = "strip" | "grid";

interface PolaroidResult {
  dataUrl: string;
  timestamp: Date;
}

interface PolaroidViewProps {
  photos: PolaroidResult[];
  onClose: () => void;
  onRetake: () => void;
  onDownload: (layout: PolaroidLayout) => void;
}

export default function PolaroidView({
  photos,
  onClose,
  onRetake,
  onDownload,
}: PolaroidViewProps) {
  const [layout, setLayout] = useState<PolaroidLayout>("strip");

  if (photos.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4 overflow-y-auto">
      <div className="relative flex flex-col items-center gap-4 max-w-lg w-full my-auto">
        {/* ... controls ... */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 w-10 h-10 rounded-full bg-white shadow-kawaii flex items-center justify-center hover:bg-neutral-100 transition-colors border-2 border-white text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex gap-1 bg-white/30 backdrop-blur-md rounded-full p-1.5 shadow-lg border border-white/40">
          <button
            onClick={() => setLayout("strip")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              layout === "strip"
                ? "bg-white text-gray-800 shadow-kawaii scale-105"
                : "text-white hover:bg-white/20"
            }`}
          >
            <Rows3 className="w-3.5 h-3.5" />
            Strip
          </button>
          <button
            onClick={() => setLayout("grid")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              layout === "grid"
                ? "bg-white text-gray-800 shadow-kawaii scale-105"
                : "text-white hover:bg-white/20"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Grid
          </button>
        </div>

        {/* Polaroid Frame */}
        <div
          className="relative animate-slide-up origin-center zoom-in-95 duration-500"
          style={{ transform: "rotate(-1deg)" }}
        >
          {/* Card Container */}
          <div
            className={`relative bg-[#FFFAF5] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border-[12px] border-white ${
              layout === "strip" ? "w-72" : "w-80"
            }`}
          >
            {/* Minimal Noise Texture */}
            <div className="absolute inset-0 bg-[#FFFAF5] z-0" />
            <div 
              className="absolute inset-0 z-0 opacity-[0.03]"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Washi Tape Accent - Top Center */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-kawaii-pink/40 rotate-[2deg] z-20 backdrop-blur-sm opacity-80" />

            {/* Content Container */}
            <div className="relative z-10 p-6 flex flex-col gap-5">
              
              {/* Spacer */}
              <div className="h-2" />

              {/* Photos - Clean & Minimal */}
              <div
                className={`gap-4 ${
                  layout === "strip"
                    ? "flex flex-col"
                    : "grid grid-cols-2"
                }`}
              >
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden shadow-sm bg-white p-1"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.dataUrl}
                      alt={`Shot ${index + 1}`}
                      className={`w-full object-cover grayscale-[20%] contrast-[1.05] ${
                        layout === "strip" ? "aspect-[4/3]" : "aspect-square"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Footer - Minimal Aesthetic */}
              <div className="pt-2 pb-6 flex flex-col items-center gap-1">
                
                {/* Date Stamp */}
                <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono">
                  {photos[0].timestamp.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit"
                  }).replace(/\//g, '.')} • {photos[0].timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
                </div>

                {/* Minimal Brand */}
                <div className="font-handwriting text-[#888] text-xl tracking-wide lowercase mt-1">
                  kawaicam
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onRetake}
            className="btn-kawaii-outline bg-white hover:bg-red-50 hover:text-red-500 hover:border-red-200 text-sm px-6 border-gray-200 text-gray-500"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDownload(layout)}
            className="btn-kawaii text-sm px-8 bg-gray-800 text-white hover:bg-black hover:scale-[1.02] shadow-none border-none font-medium tracking-wide"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders aesthetic minimalist polaroid canvas without tacky elements.
 */
export function renderPolaroidStrip(
  photoDataUrls: string[],
  layout: PolaroidLayout = "strip"
): Promise<string> {
  return new Promise((resolve) => {
    const imgPromises = photoDataUrls.map(
      (url) =>
        new Promise<HTMLImageElement>((res) => {
          const img = new Image();
          img.onload = () => res(img);
          img.src = url;
        })
    );

    Promise.all(imgPromises).then((images) => {
      // Dimensions
      const padding = 60; // Generous padding for aesthetic feel
      const photoGap = 25;
      const headerH = 40; // Top margin
      const footerH = 200; // Increased footer height AGAIN
      
      let photoW: number, photoH: number, cols: number, rows: number;

      if (layout === "strip") {
        photoW = 380;
        photoH = 285; // 4:3
        cols = 1;
        rows = images.length;
      } else {
        photoW = 320;
        photoH = 320; // 1:1
        cols = 2;
        rows = Math.ceil(images.length / 2);
      }

      const contentW = cols * photoW + (cols - 1) * photoGap;
      const totalW = contentW + padding * 2;
      const totalH = headerH + rows * photoH + (rows - 1) * photoGap + footerH; // Total Height Calculation

      const canvas = document.createElement("canvas");
      canvas.width = totalW;
      canvas.height = totalH;
      const ctx = canvas.getContext("2d")!;

      // 1. Background (Minimal Cream)
      ctx.fillStyle = "#FFFAF5";
      ctx.fillRect(0, 0, totalW, totalH);

      // 3. Washi Tape (Top Center)
      ctx.save();
      ctx.translate(totalW / 2, padding / 2);
      ctx.rotate(2 * Math.PI / 180);
      ctx.fillStyle = "rgba(255, 183, 213, 0.5)"; // Soft pink tape
      ctx.globalCompositeOperation = "multiply";
      ctx.fillRect(-60, -15, 120, 30);
      ctx.restore();

      // 4. Draw Photos - Clean, Sharp, No Borders
      const startY = padding + headerH;
      
      images.forEach((img, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = padding + col * (photoW + photoGap);
        const y = startY + row * (photoH + photoGap);

        // White Frame Background
        ctx.fillStyle = "white";
        // Very subtle shadow
        ctx.shadowColor = "rgba(0,0,0,0.08)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 8;
        ctx.fillRect(x, y, photoW, photoH);
        ctx.shadowColor = "transparent";

        // Image Drawing (Inset with slight spacing)
        const inset = 12;
        const imgX = x + inset;
        const imgY = y + inset;
        const imgW = photoW - inset * 2;
        const imgH = photoH - inset * 2;

        ctx.save();
        ctx.beginPath();
        // Rectangular crop (not rounded) for sharper look
        ctx.rect(imgX, imgY, imgW, imgH);
        ctx.clip();
        
        // Center crop
        const imgAspect = img.width / img.height;
        const targetAspect = imgW / imgH;
        let sx = 0, sy = 0, sw = img.width, sh = img.height;
        
        if (imgAspect > targetAspect) {
          sw = img.height * targetAspect;
          sx = (img.width - sw) / 2;
        } else {
          sh = img.width / targetAspect;
          sy = (img.height - sh) / 2;
        }
        
        // Apply slight grayscale/contrast filter for aesthetic look
        ctx.filter = "grayscale(20%) contrast(105%)";
        ctx.drawImage(img, sx, sy, sw, sh, imgX, imgY, imgW, imgH);
        ctx.filter = "none";
        ctx.restore();
      });

      // 5. Footer Content
      // Start slightly lower to avoid crowding the photos
      const footerStartY = startY + rows * photoH + (rows - 1) * photoGap + 60;
      
      // Date Stamp
      ctx.fillStyle = "#A0A0A0"; // Neutral Gray
      ctx.font = "14px 'Courier New', monospace"; 
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const dateStr = new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      }).replace(/\//g, '.') + " • " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
      
      // Draw Date
      ctx.fillText(dateStr, totalW / 2, footerStartY);

      // Minimal Brand
      // Position clearly below the date
      ctx.fillStyle = "#666666"; // Much Darker gray for visibility
      ctx.font = "italic 28px serif"; 
      ctx.fillText("kawaicam", totalW / 2, footerStartY + 40);

      resolve(canvas.toDataURL("image/png", 1.0));
    });
  });
}
