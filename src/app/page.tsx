"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Camera, Sparkles, ScanFace, ChevronDown, Info, Copy, Check } from "lucide-react";
import { useCamera } from "@/hooks/useCamera";
import { useFaceDetection } from "@/hooks/useFaceDetection";
import CameraPreview from "@/components/CameraPreview";
import CanvasOverlay, { type CanvasOverlayRef } from "@/components/CanvasOverlay";
import PropBar from "@/components/PropBar";
import FilterSelect from "@/components/FilterSelect";
import PolaroidView, {
  renderPolaroidStrip,
  type PolaroidLayout,
} from "@/components/PolaroidView";
import Toast from "@/components/Toast";
import { downloadBlob, generateFilename } from "@/lib/exportUtils";
import {
  type PhotoItem,
  type FilterType,
  type ItemCategory,
  FILTERS,
} from "@/data/items";

const SHOT_OPTIONS = [1, 2, 4, 6, 8];

export default function PhotoboothPage() {
  const { videoRef, isLoading, error, startCamera } = useCamera();
  const canvasRef = useRef<CanvasOverlayRef>(null);
  const cameraContainerRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<FilterType>("none");
  const [activeCategory, setActiveCategory] = useState<ItemCategory>("all");
  const [activeItem, setActiveItem] = useState<PhotoItem | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 640, height: 480 });
  const [videoNativeSize, setVideoNativeSize] = useState({
    width: 1280,
    height: 720,
  });

  const [shotsCount, setShotsCount] = useState(4);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [shotProgress, setShotProgress] = useState("");
  const [showFlash, setShowFlash] = useState(false);

  const [capturedPhotos, setCapturedPhotos] = useState<
    { dataUrl: string; timestamp: Date }[]
  >([]);
  const [showPolaroid, setShowPolaroid] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const [showShotMenu, setShowShotMenu] = useState(false);
  const [showFaceHelp, setShowFaceHelp] = useState(false);
  const [copied, setCopied] = useState(false);

  // Face detection
  const { faces, isSupported: faceDetectionSupported } = useFaceDetection(
    videoRef,
    !!activeItem
  );

  const filterCss = FILTERS.find((f) => f.id === activeFilter)?.css || "none";

  // Track video native size
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMeta = () => {
      setVideoNativeSize({
        width: video.videoWidth,
        height: video.videoHeight,
      });
    };
    video.addEventListener("loadedmetadata", handleMeta);
    if (video.videoWidth > 0) handleMeta();

    return () => video.removeEventListener("loadedmetadata", handleMeta);
  }, [videoRef]);

  // Observe camera container size
  useEffect(() => {
    const container = cameraContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setCanvasSize({
            width: Math.round(width),
            height: Math.round(height),
          });
        }
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Capture a single frame
  const captureFrame = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      const video = videoRef.current;
      const overlayCanvas = canvasRef.current?.getCanvasElement();
      if (!video) return;

      const width = video.videoWidth || 1280;
      const height = video.videoHeight || 720;

      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const ctx = offscreen.getContext("2d")!;

      // Draw mirrored + filtered video
      if (filterCss && filterCss !== "none") ctx.filter = filterCss;
      ctx.save();
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, width, height);
      ctx.restore();
      ctx.filter = "none";

      // Draw prop overlay
      if (overlayCanvas) {
        ctx.drawImage(overlayCanvas, 0, 0, width, height);
      }

      resolve(offscreen.toDataURL("image/png", 1.0));
    });
  }, [videoRef, filterCss]);

  // Multi-shot capture flow
  const handleCapture = useCallback(async () => {
    if (!videoRef.current || isCapturing) return;
    setIsCapturing(true);
    const photos: { dataUrl: string; timestamp: Date }[] = [];

    for (let shot = 1; shot <= shotsCount; shot++) {
      setShotProgress(`${shot}/${shotsCount}`);

      // Countdown 3, 2, 1
      for (let i = 3; i >= 1; i--) {
        setCountdown(i);
        await new Promise((r) => setTimeout(r, 700));
      }
      setCountdown(null);

      // Flash
      setShowFlash(true);
      await new Promise((r) => setTimeout(r, 150));
      setShowFlash(false);

      // Capture
      const dataUrl = await captureFrame();
      photos.push({ dataUrl, timestamp: new Date() });

      // Brief pause between shots
      if (shot < shotsCount) {
        await new Promise((r) => setTimeout(r, 600));
      }
    }

    setCapturedPhotos(photos);
    setShowPolaroid(true);
    setIsCapturing(false);
    setShotProgress("");
  }, [videoRef, isCapturing, captureFrame, shotsCount]);

  // Download polaroid
  const handleDownloadPolaroid = useCallback(
    async (layout: PolaroidLayout) => {
      try {
        const stripDataUrl = await renderPolaroidStrip(
          capturedPhotos.map((p) => p.dataUrl),
          layout
        );
        const res = await fetch(stripDataUrl);
        const blob = await res.blob();
        downloadBlob(blob, generateFilename());
        setToast({ show: true, message: "Photo Saved! 📸", type: "success" });
      } catch {
        setToast({
          show: true,
          message: "Failed to save",
          type: "error",
        });
      }
    },
    [capturedPhotos]
  );

  const copyFlagLink = () => {
    navigator.clipboard.writeText("chrome://flags/#enable-experimental-web-platform-features");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-kawaii-cream">
      {/* Header */}
      <header className="glass-card-solid border-b border-kawaii-babypink/20 px-4 py-2 flex items-center justify-between flex-shrink-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-kawaii-pink to-kawaii-lavender flex items-center justify-center shadow-kawaii">
            <Camera className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-kawaii-text leading-tight">
              KawaiCam
            </h1>
            <p className="text-[9px] text-kawaii-text/40 leading-tight">
              cute photobooth ✨
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Face detection warning */}
          {!faceDetectionSupported && (
            <button 
              onClick={() => setShowFaceHelp(true)}
              className="hidden sm:flex px-2 py-1 bg-yellow-100/80 rounded-lg text-[10px] text-yellow-700 items-center gap-1 border border-yellow-200/50 backdrop-blur-sm hover:bg-yellow-100 transition-colors"
            >
              <Info className="w-3 h-3" />
              <span>Enable Auto-Face</span>
            </button>
          )}
          
          {/* Face detection active indicator */}
          {faceDetectionSupported && activeItem && (
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
              faces.length > 0 ? "bg-kawaii-pink/15 text-kawaii-pink" : "bg-gray-100 text-kawaii-text/30"
            }`}>
              <ScanFace className="w-3 h-3" />
              {faces.length > 0 ? `${faces.length}` : "0"}
            </div>
          )}

          {/* Shot Count Selector */}
          <div className="relative">
            <button
              onClick={() => setShowShotMenu(!showShotMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 hover:bg-white border border-kawaii-babypink/30 text-xs font-medium text-kawaii-text transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-kawaii-pink" />
              {shotsCount} shots
              <ChevronDown className="w-3 h-3 opacity-50" />
            </button>
            
            {showShotMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowShotMenu(false)} />
                <div className="absolute top-full right-0 mt-2 z-50 glass-card-solid p-1.5 min-w-[100px] flex flex-col gap-1 shadow-kawaii-lg animate-fade-in">
                  <span className="px-2 py-1 text-[9px] font-bold text-kawaii-text/40 uppercase">Select Shots</span>
                  {SHOT_OPTIONS.map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setShotsCount(num);
                        setShowShotMenu(false);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-left text-xs font-medium transition-all ${
                        shotsCount === num
                          ? "bg-kawaii-pink text-white shadow-kawaii"
                          : "hover:bg-kawaii-babypink/30 text-kawaii-text/70"
                      }`}
                    >
                      {num} Photos
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Camera */}
      <div className="flex-1 relative min-h-0">
        <div ref={cameraContainerRef} className="absolute inset-0 bg-gray-100">
          <CameraPreview
            videoRef={videoRef}
            isLoading={isLoading}
            error={error}
            filterCss={filterCss}
            onRetry={startCamera}
          />

          {canvasSize.width > 0 && canvasSize.height > 0 && (
            <CanvasOverlay
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              activeItem={activeItem}
              faces={faces}
              videoWidth={videoNativeSize.width}
              videoHeight={videoNativeSize.height}
            />
          )}

          {/* Countdown & Progress */}
          {countdown !== null && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/20 backdrop-blur-sm">
              <span className="text-8xl font-bold text-white animate-bounce-soft drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
                {countdown}
              </span>
              {shotProgress && (
                <div className="mt-4 px-4 py-1.5 rounded-full bg-kawaii-pink/90 text-white text-sm font-bold shadow-lg">
                  📸 Photo {shotProgress}
                </div>
              )}
            </div>
          )}

          {/* Flash */}
          {showFlash && (
            <div className="absolute inset-0 bg-white z-40 animate-fade-in duration-75" />
          )}

          {/* Capture Button */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
            <button
              onClick={handleCapture}
              disabled={isCapturing || !!error || isLoading}
              className={`group relative w-16 h-16 rounded-full
                bg-gradient-to-br from-kawaii-pink to-kawaii-pink-dark
                shadow-[0_0_0_4px_rgba(255,255,255,0.3),0_8px_20px_rgba(255,107,181,0.5)]
                hover:shadow-[0_0_0_6px_rgba(255,255,255,0.4),0_10px_25px_rgba(255,107,181,0.6)]
                flex items-center justify-center
                transition-all duration-300 transform
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                active:scale-95 hover:scale-105
                ${isCapturing ? "animate-pulse-pink cursor-wait" : ""}`}
            >
              <div className="w-[52px] h-[52px] rounded-full border-[3px] border-white/40 flex items-center justify-center">
                <Camera className={`w-7 h-7 text-white transition-transform duration-300 ${isCapturing ? "scale-90 opacity-80" : "group-hover:scale-110"}`} />
              </div>
            </button>
          </div>

          {/* Active prop badge */}
          {activeItem && !isCapturing && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 glass-card-solid px-3 py-1.5 text-xs font-semibold text-kawaii-pink shadow-kawaii rounded-full flex gap-1.5 items-center animate-fade-in">
              <span>{activeItem.emoji}</span>
              <span>{activeItem.name}</span>
              {faceDetectionSupported && (
                <span className={`text-[9px] px-1.5 rounded-md ${
                  faces.length > 0 ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                }`}>
                  {faces.length > 0 ? "Tracking" : "Scanning..."}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="flex-shrink-0 glass-card-solid border-t border-kawaii-babypink/20 z-30 pb-safe">
        <div className="pt-2 pb-1">
          <PropBar
            activeCategory={activeCategory}
            activeItem={activeItem}
            onCategoryChange={setActiveCategory}
            onItemSelect={setActiveItem}
          />
        </div>
        <FilterSelect
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Polaroid Modal */}
      {showPolaroid && (
        <PolaroidView
          photos={capturedPhotos}
          onClose={() => setShowPolaroid(false)}
          onRetake={() => {
            setShowPolaroid(false);
            setCapturedPhotos([]);
          }}
          onDownload={handleDownloadPolaroid}
        />
      )}

      {/* Face Help Modal */}
      {showFaceHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-kawaii-lg relative">
            <button 
              onClick={() => setShowFaceHelp(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <Check className="w-5 h-5" />
            </button>
            
            <h3 className="font-bold text-lg text-kawaii-text mb-1">Enable Face Detection ✨</h3>
            <p className="text-xs text-gray-500 mb-4">This feature requires experimental flags in Chrome/Brave.</p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-kawaii-cream rounded-xl border border-kawaii-pink/20">
                <span className="flex-shrink-0 w-5 h-5 bg-kawaii-pink text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-700 mb-1">Copy this specific URL:</p>
                  <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1.5 border border-kawaii-pink/10">
                    <code className="text-[10px] text-kawaii-pink break-all">chrome://flags/#enable-experimental-web-platform-features</code>
                    <button onClick={copyFlagLink} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                      {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>

               <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="flex-shrink-0 w-5 h-5 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Paste into a new tab&apos;s address bar</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="flex-shrink-0 w-5 h-5 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Set state to <b className="text-blue-600">Enabled</b> and click <b className="text-blue-600">Relaunch</b></p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowFaceHelp(false)}
              className="w-full mt-4 btn-kawaii py-2 text-sm"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
