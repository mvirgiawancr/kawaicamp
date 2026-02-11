"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseCameraReturn {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    stream: MediaStream | null;
    isLoading: boolean;
    error: string | null;
    hasPermission: boolean;
    startCamera: () => Promise<void>;
    stopCamera: () => void;
}

export function useCamera(): UseCameraReturn {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasPermission, setHasPermission] = useState(false);
    const mountedRef = useRef(true);

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
            setStream(null);
        }
    }, []);

    const startCamera = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user",
                },
                audio: false,
            });

            if (!mountedRef.current) {
                mediaStream.getTracks().forEach((track) => track.stop());
                return;
            }

            streamRef.current = mediaStream;
            setStream(mediaStream);
            setHasPermission(true);
            setIsLoading(false);

            // Attach stream to video element after state updates
            // Use requestAnimationFrame to ensure the video element is in the DOM
            requestAnimationFrame(() => {
                const video = videoRef.current;
                if (video && mountedRef.current) {
                    video.srcObject = mediaStream;
                    // Use onloadedmetadata to play only when video is ready
                    video.onloadedmetadata = () => {
                        video.play().catch((err) => {
                            // AbortError is expected when component unmounts during play
                            if (err.name !== "AbortError" && mountedRef.current) {
                                console.warn("Video play warning:", err.message);
                            }
                        });
                    };
                }
            });
        } catch (err) {
            if (!mountedRef.current) return;

            const errorMessage =
                err instanceof DOMException
                    ? err.name === "NotAllowedError"
                        ? "Camera access was denied. Please allow camera permissions in your browser settings."
                        : err.name === "NotFoundError"
                            ? "No camera found. Please connect a camera and try again."
                            : `Camera error: ${err.message}`
                    : "An unexpected error occurred while accessing the camera.";

            setError(errorMessage);
            setHasPermission(false);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        mountedRef.current = true;
        startCamera();

        return () => {
            mountedRef.current = false;
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
                streamRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        videoRef,
        stream,
        isLoading,
        error,
        hasPermission,
        startCamera,
        stopCamera,
    };
}
