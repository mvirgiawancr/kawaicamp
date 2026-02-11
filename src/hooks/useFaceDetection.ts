"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface FaceData {
    boundingBox: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    eyes: { left: { x: number; y: number } | null; right: { x: number; y: number } | null };
    nose: { x: number; y: number } | null;
    mouth: { x: number; y: number } | null;
}

interface FaceLandmark {
    type: 'eye' | 'nose' | 'mouth';
    locations: { x: number; y: number }[];
}

interface DetectedFace {
    boundingBox: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    landmarks: FaceLandmark[];
}

interface FaceDetector {
    detect(image: ImageBitmapSource): Promise<DetectedFace[]>;
}

declare global {
    interface Window {
        FaceDetector: {
            prototype: FaceDetector;
            new(options?: { maxDetectedFaces?: number; fastMode?: boolean }): FaceDetector;
        };
    }
}

interface UseFaceDetectionReturn {
    faces: FaceData[];
    isSupported: boolean;
    isRunning: boolean;
}

export function useFaceDetection(
    videoRef: React.RefObject<HTMLVideoElement | null>,
    enabled: boolean = true
): UseFaceDetectionReturn {
    const [faces, setFaces] = useState<FaceData[]>([]);
    const [isSupported, setIsSupported] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const detectorRef = useRef<FaceDetector | null>(null);
    const rafRef = useRef<number>(0);
    const mountedRef = useRef(true);

    // Initialize FaceDetector
    useEffect(() => {
        if (typeof window !== "undefined" && "FaceDetector" in window) {
            setIsSupported(true);
            try {
                // @ts-expect-error FaceDetector is not in TS types yet
                detectorRef.current = new FaceDetector({
                    maxDetectedFaces: 3,
                    fastMode: true,
                });
            } catch {
                setIsSupported(false);
            }
        }
    }, []);

    // Detection loop
    const detect = useCallback(async () => {
        if (!mountedRef.current || !detectorRef.current || !enabled) return;

        const video = videoRef.current;
        if (!video || video.readyState < 2) {
            rafRef.current = requestAnimationFrame(() => {
                setTimeout(detect, 200);
            });
            return;
        }

        try {
            const detected = await detectorRef.current.detect(video);
            if (!mountedRef.current) return;

            const faceData: FaceData[] = detected.map((face: DetectedFace) => {
                const box = face.boundingBox;
                let leftEye: { x: number; y: number } | null = null;
                let rightEye: { x: number; y: number } | null = null;
                let nose: { x: number; y: number } | null = null;
                let mouth: { x: number; y: number } | null = null;

                if (face.landmarks) {
                    for (const landmark of face.landmarks) {
                        const loc = landmark.locations?.[0];
                        if (!loc) continue;
                        switch (landmark.type) {
                            case "eye":
                                if (!leftEye) leftEye = { x: loc.x, y: loc.y };
                                else rightEye = { x: loc.x, y: loc.y };
                                break;
                            case "nose":
                                nose = { x: loc.x, y: loc.y };
                                break;
                            case "mouth":
                                mouth = { x: loc.x, y: loc.y };
                                break;
                        }
                    }
                }

                return {
                    boundingBox: {
                        x: box.x,
                        y: box.y,
                        width: box.width,
                        height: box.height,
                    },
                    eyes: { left: leftEye, right: rightEye },
                    nose,
                    mouth,
                };
            });

            setFaces(faceData);
        } catch {
            // Detection can fail if video is not ready
        }

        // Run detection ~5 times per second
        rafRef.current = requestAnimationFrame(() => {
            setTimeout(detect, 200);
        });
    }, [videoRef, enabled]);

    useEffect(() => {
        mountedRef.current = true;
        if (isSupported && enabled) {
            setIsRunning(true);
            detect();
        } else {
            setIsRunning(false);
            setFaces([]);
        }

        return () => {
            mountedRef.current = false;
            setIsRunning(false);
            cancelAnimationFrame(rafRef.current);
        };
    }, [isSupported, enabled, detect]);

    return { faces, isSupported, isRunning };
}
