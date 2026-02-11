/**
 * Captures a composite image of the video + canvas overlays.
 */
export async function captureComposite(
    video: HTMLVideoElement,
    fabricCanvas: HTMLCanvasElement | null,
    filterCss: string
): Promise<Blob> {
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext("2d")!;

    // Apply filter and mirror to video frame (so export matches mirrored preview)
    if (filterCss && filterCss !== "none") {
        ctx.filter = filterCss;
    }
    ctx.save();
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, width, height);
    ctx.restore();
    ctx.filter = "none";

    // Draw Fabric.js canvas overlay on top
    if (fabricCanvas) {
        ctx.drawImage(fabricCanvas, 0, 0, width, height);
    }

    return new Promise((resolve, reject) => {
        offscreen.toBlob(
            (blob) => {
                if (blob) resolve(blob);
                else reject(new Error("Failed to create image blob"));
            },
            "image/png",
            1.0
        );
    });
}

/**
 * Triggers a browser download for a blob.
 */
export function downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Generates a timestamped filename.
 */
export function generateFilename(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
        now.getDate()
    )}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    return `kawaicam_${timestamp}.png`;
}
