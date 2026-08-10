import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 205;

export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Preload images
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;

    const preloadImages = () => {
      return new Promise<void>((resolve) => {
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          const img = new Image();
          const num = String(i + 1).padStart(3, '0');
          // Important: path must point to the public folder where ezgif frames are now
          img.src = `/frames/ezgif-frame-${num}.jpg`;
          img.onload = img.onerror = () => {
            loadedCount++;
            if (loadedCount === TOTAL_FRAMES) resolve();
          };
          images[i] = img;
        }
      });
    };

    // Resize canvas
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Draw frame
    const drawFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = window.innerWidth;
      const ch = window.innerHeight;

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;

      let drawW, drawH, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawW = cw;
        drawH = cw / imgRatio;
        offsetX = 0;
        offsetY = (ch - drawH) / 2;
      } else {
        drawH = ch;
        drawW = ch * imgRatio;
        offsetX = (cw - drawW) / 2;
        offsetY = 0;
      }

      ctx.clearRect(0, 0, cw, ch);
      // Optional: Dim the canvas slightly so ui stands out better
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    };

    let currentFrame = 0;
    let targetFrame = 0;
    let rafId: number;

    const getScrollFrame = () => {
      // Calculate scroll progress against the total scrollable height of the React application
      const maxScroll = Math.max(0, document.body.scrollHeight - window.innerHeight);
      if (maxScroll === 0) return 0; // If page isn't scrolling
      const scrollProgress = window.scrollY / maxScroll;
      return Math.min(Math.floor(scrollProgress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
    };

    const animate = () => {
      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) > 0.05) {
        currentFrame += diff * 0.08;
      } else {
        currentFrame = targetFrame;
      }

      drawFrame(Math.round(currentFrame));
      rafId = requestAnimationFrame(animate);
    };

    const onScroll = () => {
      targetFrame = getScrollFrame();
    };

    const handleResize = () => {
      resizeCanvas();
      drawFrame(Math.round(currentFrame));
      // Re-evaluate target frame in case document height changed
      targetFrame = getScrollFrame();
    };

    let isMounted = true;
    const init = async () => {
      resizeCanvas();
      window.addEventListener('resize', handleResize);
      
      await preloadImages();
      
      if (!isMounted) return;
      drawFrame(0);
      window.addEventListener('scroll', onScroll, { passive: true });
      animate();
    };

    init();

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen z-[-1] pointer-events-none"
    />
  );
}
