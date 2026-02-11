"use client";

import React from "react";
import { Camera, CameraOff, RefreshCw } from "lucide-react";

interface CameraPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isLoading: boolean;
  error: string | null;
  filterCss: string;
  onRetry: () => void;
}

export default function CameraPreview({
  videoRef,
  isLoading,
  error,
  filterCss,
  onRetry,
}: CameraPreviewProps) {
  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-kawaii-babypink/30 to-kawaii-lavender/30 rounded-2xl p-8">
        <div className="w-20 h-20 rounded-full bg-kawaii-babypink/40 flex items-center justify-center">
          <CameraOff className="w-10 h-10 text-kawaii-pink" />
        </div>
        <div className="text-center max-w-sm">
          <h3 className="font-bold text-lg text-kawaii-text mb-2">
            Oops! Camera unavailable 😿
          </h3>
          <p className="text-sm text-kawaii-text/60 mb-4">{error}</p>
          <button onClick={onRetry} className="btn-kawaii text-sm">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-kawaii-babypink/20 to-kawaii-lavender/20 rounded-2xl z-10">
          <div className="w-16 h-16 rounded-full bg-kawaii-pink/10 flex items-center justify-center animate-pulse-pink">
            <Camera className="w-8 h-8 text-kawaii-pink" />
          </div>
          <p className="text-sm font-medium text-kawaii-text/60">
            Initializing camera...
          </p>
          <p className="text-xs text-kawaii-text/40">
            Get ready to sparkle! ✨
          </p>
        </div>
      )}
      <video
        ref={videoRef as React.RefObject<HTMLVideoElement>}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover rounded-2xl"
        style={{
          transform: "scaleX(-1)",
          filter: filterCss !== "none" ? filterCss : undefined,
        }}
      />
    </div>
  );
}
