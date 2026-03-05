import { useEffect, useRef, useCallback } from "react";

const TOTAL_FRAMES = 80;
const FRAME_PATH = "/hero-frames/frame-";

/**
 * Preloads all hero frames and draws the current one to a canvas
 * based on vertical scroll progress within a container element.
 */
export function useScrollFrameAnimation(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  containerRef: React.RefObject<HTMLElement>
) {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

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

      // Crop black bars baked into the video frames (~8% each side)
      const CROP_X = 0.08; // fraction to crop from left & right
      const CROP_Y = 0.00; // no vertical crop needed
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

  // Preload all images
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const idx = String(i).padStart(3, "0");
      img.src = `${FRAME_PATH}${idx}.jpg`;
      img.onload = () => {
        loadedCountRef.current++;
        // Draw the first frame as soon as it's ready
        if (i === 0) {
          drawFrame(0);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, [drawFrame]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollableHeight = rect.height - window.innerHeight;

        if (scrollableHeight <= 0) return;

        // How far we've scrolled into the container (0 → 1)
        const progress = Math.min(
          1,
          Math.max(0, -rect.top / scrollableHeight)
        );

        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * TOTAL_FRAMES)
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Draw initial frame on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [containerRef, drawFrame]);

  // Handle resize — redraw current frame on window resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);
}
