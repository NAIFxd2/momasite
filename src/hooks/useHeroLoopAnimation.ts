import { useEffect, useRef, useCallback } from "react";

const TOTAL_FRAMES = 80;
const FRAME_PATH = "/hero-frames/frame-";
/** Target ~18 fps for a cinematic feel */
const FRAME_INTERVAL_MS = 55;

/**
 * Preloads all hero frames and auto-plays them on a canvas
 * in a smooth, infinite cinematic loop.
 */
export function useHeroLoopAnimation(
    canvasRef: React.RefObject<HTMLCanvasElement>
) {
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(0);
    const lastTimeRef = useRef(0);
    const rafIdRef = useRef<number | null>(null);
    const allLoadedRef = useRef(false);

    // Draw a specific frame onto the canvas
    const drawFrame = useCallback(
        (frameIndex: number) => {
            const canvas = canvasRef.current;
            const img = imagesRef.current[frameIndex];
            if (!canvas || !img || !img.complete) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Match canvas internal size to its displayed size
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            const w = rect.width * dpr;
            const h = rect.height * dpr;

            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }

            ctx.clearRect(0, 0, w, h);

            // Crop black bars baked into the video frames (~8 % each side)
            const CROP_X = 0.08;
            const CROP_Y = 0.0;
            const cropLeft = Math.round(img.naturalWidth * CROP_X);
            const cropTop = Math.round(img.naturalHeight * CROP_Y);
            const croppedW = img.naturalWidth - cropLeft * 2;
            const croppedH = img.naturalHeight - cropTop * 2;

            // Cover-fit the cropped region to the canvas
            const imgRatio = croppedW / croppedH;
            const canvasRatio = w / h;
            let sx = cropLeft,
                sy = cropTop,
                sw = croppedW,
                sh = croppedH;

            if (imgRatio > canvasRatio) {
                sw = croppedH * canvasRatio;
                sx = cropLeft + (croppedW - sw) / 2;
            } else {
                sh = croppedW / canvasRatio;
                sy = cropTop + (croppedH - sh) / 2;
            }

            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
        },
        [canvasRef]
    );

    // Preload all images, then start animation loop
    useEffect(() => {
        const images: HTMLImageElement[] = [];
        let loadedCount = 0;

        const startLoop = () => {
            const animate = (time: number) => {
                if (!lastTimeRef.current) lastTimeRef.current = time;

                const delta = time - lastTimeRef.current;

                if (delta >= FRAME_INTERVAL_MS) {
                    lastTimeRef.current = time - (delta % FRAME_INTERVAL_MS);
                    currentFrameRef.current =
                        (currentFrameRef.current + 1) % TOTAL_FRAMES;
                    drawFrame(currentFrameRef.current);
                }

                rafIdRef.current = requestAnimationFrame(animate);
            };

            rafIdRef.current = requestAnimationFrame(animate);
        };

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            const idx = String(i).padStart(3, "0");
            img.src = `${FRAME_PATH}${idx}.jpg`;
            img.onload = () => {
                loadedCount++;
                // Draw first frame immediately so the hero isn't blank
                if (i === 0) drawFrame(0);
                // Start the loop once all frames are loaded
                if (loadedCount === TOTAL_FRAMES) {
                    allLoadedRef.current = true;
                    startLoop();
                }
            };
            images.push(img);
        }

        imagesRef.current = images;

        return () => {
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [drawFrame]);

    // Handle resize — redraw current frame
    useEffect(() => {
        const handleResize = () => {
            drawFrame(currentFrameRef.current);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [drawFrame]);
}
