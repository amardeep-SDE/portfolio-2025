import React, { useEffect, useRef } from "react";

const STAR_COLORS = [
  "#fcd34d", // Gold
  "#fbbf24", // Amber
  "#38bdf8", // Sky blue
  "#818cf8", // Indigo
  "#c084fc", // Purple
  "#f472b6", // Pink
  "#ffffff", // Diamond White
];

const StarlightCelebration = ({ trigger = 0 }) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animFrameRef = useRef(null);

  const spawnStars = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const w = canvas.width;
    const h = canvas.height;

    const newStars = [];
    // Spawn 65 floating twinkling stars from random heights and positions
    for (let i = 0; i < 70; i++) {
      const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      newStars.push({
        x: Math.random() * w,
        y: Math.random() * (h * 0.4),
        vx: (Math.random() - 0.5) * 2,
        vy: 1.2 + Math.random() * 2.8,
        size: 3 + Math.random() * 5,
        twinkleSpeed: 0.05 + Math.random() * 0.08,
        twinklePhase: Math.random() * Math.PI * 2,
        color,
        alpha: 1,
        decay: 0.006 + Math.random() * 0.005,
      });
    }

    starsRef.current = [...starsRef.current, ...newStars];

    if (!animFrameRef.current) {
      startLoop();
    }
  };

  const startLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const stars = starsRef.current;
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.twinklePhase += s.twinkleSpeed;
        s.alpha -= s.decay;

        if (s.alpha <= 0 || s.y > canvas.height + 20) {
          stars.splice(i, 1);
          continue;
        }

        const pulseScale = 0.7 + Math.sin(s.twinklePhase) * 0.35;
        const currentSize = s.size * pulseScale;

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.translate(s.x, s.y);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;

        // Draw 4-point star sparkle
        ctx.beginPath();
        const r = currentSize;
        const inner = r * 0.25;
        for (let pt = 0; pt < 8; pt++) {
          const radius = pt % 2 === 0 ? r : inner;
          const a = (pt * Math.PI) / 4;
          if (pt === 0) ctx.moveTo(Math.cos(a) * radius, Math.sin(a) * radius);
          else ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      if (stars.length > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        animFrameRef.current = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
  };

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  useEffect(() => {
    if (trigger > 0) {
      spawnStars();
    }
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default StarlightCelebration;
