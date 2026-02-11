"use client";

import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import type { PhotoItem } from "@/data/items";
import type { FaceData } from "@/hooks/useFaceDetection";
import { getPropImage } from "@/data/propImages";

export interface CanvasOverlayRef {
  getCanvasElement: () => HTMLCanvasElement | null;
  clearOverlay: () => void;
}

interface CanvasOverlayProps {
  width: number;
  height: number;
  activeItem: PhotoItem | null;
  faces: FaceData[];
  videoWidth: number;
  videoHeight: number;
}

const CanvasOverlay = forwardRef<CanvasOverlayRef, CanvasOverlayProps>(
  ({ width, height, activeItem, faces, videoWidth, videoHeight }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesCache = useRef<Map<string, HTMLImageElement>>(new Map());

    // Preload prop images
    useEffect(() => {
      if (!activeItem) return;
      const url = getPropImage(activeItem);
      if (url && !imagesCache.current.has(activeItem.id)) {
        const img = new Image();
        img.onload = () => imagesCache.current.set(activeItem.id, img);
        img.src = url;
      }
    }, [activeItem]);

    // Draw overlay - runs on every face/item change
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      if (!activeItem) return;

      // Scale factors from video coordinates to canvas
      const scaleX = width / (videoWidth || width);
      const scaleY = height / (videoHeight || height);

      const cachedImg = imagesCache.current.get(activeItem.id);

      if (faces.length > 0) {
        // Draw prop for each detected face
        for (const face of faces) {
          const box = face.boundingBox;

          // Mirror the x coordinate (video is mirrored via CSS)
          const mirroredX = (videoWidth - box.x - box.width) * scaleX;
          const faceY = box.y * scaleY;
          const faceW = box.width * scaleX;
          const faceH = box.height * scaleY;

          let propX: number, propY: number, propW: number, propH: number;

          if (activeItem.category === "hats") {
            // Position above the face
            propW = faceW * 1.3;
            propH = propW * 0.7;
            propX = mirroredX + (faceW - propW) / 2;
            propY = faceY - propH * 0.7;
          } else if (activeItem.category === "glasses") {
            // Position at eye level
            propW = faceW * 1.1;
            propH = propW * 0.45;
            propX = mirroredX + (faceW - propW) / 2;
            propY = faceY + faceH * 0.15;

            // Use eye landmarks if available
            if (face.eyes.left && face.eyes.right) {
              const leftEyeX = (videoWidth - face.eyes.left.x) * scaleX;
              const rightEyeX = (videoWidth - face.eyes.right.x) * scaleX;
              const eyesCenterX = (leftEyeX + rightEyeX) / 2;
              const eyesCenterY = ((face.eyes.left.y + face.eyes.right.y) / 2) * scaleY;
              propX = eyesCenterX - propW / 2;
              propY = eyesCenterY - propH / 2;
            }
          } else if (activeItem.category === "props") {
            // Position to the side of the face
            propW = faceW * 0.6;
            propH = propW;
            propX = mirroredX + faceW + propW * 0.1;
            propY = faceY;
          } else {
            // Stickers - position at a fun spot (cheek area)
            propW = faceW * 0.4;
            propH = propW;
            propX = mirroredX + faceW * 0.7;
            propY = faceY + faceH * 0.3;
          }

          if (cachedImg) {
            ctx.drawImage(cachedImg, propX, propY, propW, propH);
          } else {
            // Emoji fallback
            const fontSize = propW * 0.8;
            ctx.font = `${fontSize}px serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(activeItem.emoji, propX + propW / 2, propY + propH / 2);
          }
        }
      } else {
        // No face detected - show centered preview
        const size = Math.min(width, height) * activeItem.defaultScale * 0.7;
        const x = (width - size) / 2;
        let y: number;
        if (activeItem.category === "hats") {
          y = height * 0.1;
        } else if (activeItem.category === "glasses") {
          y = height * 0.3;
        } else {
          y = (height - size) / 2;
        }

        if (cachedImg) {
          const aspect = cachedImg.height / cachedImg.width;
          ctx.drawImage(cachedImg, x, y, size, size * aspect);
        } else {
          const fontSize = size * 0.6;
          ctx.font = `${fontSize}px serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(activeItem.emoji, width / 2, y + size / 2);
        }

        // Hint text
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.font = "bold 13px 'Plus Jakarta Sans', Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText("Show your face for auto-placement ✨", width / 2, height - 45);
      }
    }, [width, height, activeItem, faces, videoWidth, videoHeight]);

    useImperativeHandle(ref, () => ({
      getCanvasElement: () => canvasRef.current,
      clearOverlay: () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
        }
      },
    }));

    return (
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 z-10 pointer-events-none"
        style={{ width, height }}
      />
    );
  }
);

CanvasOverlay.displayName = "CanvasOverlay";
export default CanvasOverlay;
