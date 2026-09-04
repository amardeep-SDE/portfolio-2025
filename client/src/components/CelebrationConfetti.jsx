import React, { useEffect, useRef } from "react";

const COLORS = [
  "#f59e0b", // Amber Gold
  "#fbbf24", // Warm Yellow
  "#ec4899", // Neon Pink
  "#f43f5e", // Rose Red
  "#8b5cf6", // Vibrant Purple
  "#6366f1", // Indigo
  "#06b6d4", // Electric Cyan
  "#10b981", // Emerald Green
  "#38bdf8", // Sky Blue
  "#f97316", // Orange
  "#e11d48", // Crimson
];

const CelebrationConfetti = ({ trigger = 0 }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  const createParticles = (originX, originY, count, angleMin, angleMax, speedMin, speedMax) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      const angle = angleMin + Math.random() * (angleMax - angleMin);
      const speed = speedMin + Math.random() * (speedMax - speedMin);
      const shapes = ["rect", "rect", "circle", "star", "ribbon"];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      newParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.35 + Math.random() * 0.15,
        drag: 0.982,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        wobble: Math.random() * 360,
        wobbleSpeed: 4 + Math.random() * 6,
        color,
        shape,
        width: 8 + Math.random() * 7,
        height: 5 + Math.random() * 6,
        radius: 3 + Math.random() * 3.5,
        starSize: 6 + Math.random() * 6,
        ribbonLength: 12 + Math.random() * 10,
        opacity: 1,
        decay: 0.005 + Math.random() * 0.005,
      });
    }
    return newParticles;
  };

  const launchCelebration = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const w = canvas.width;
    const h = canvas.height;

    // Cannon 1: Bottom Left corner shooting up-right
    const leftCannon = createParticles(
      w * 0.12,
      h * 0.88,
      55,
      -Math.PI * 0.48,
      -Math.PI * 0.22,
      18,
      27
    );

    // Cannon 2: Bottom Right corner shooting up-left
    const rightCannon = createParticles(
      w * 0.88,
      h * 0.88,
      55,
      -Math.PI * 0.78,
      -Math.PI * 0.52,
      18,
      27
    );

    // Center burst: slightly higher up
    const centerBurst = createParticles(
      w * 0.5,
      h * 0.55,
      60,
      -Math.PI,
      0,
      12,
      22
    );

    particlesRef.current = [
      ...particlesRef.current,
      ...leftCannon,
      ...rightCannon,
      ...centerBurst,
    ];

    // Secondary burst after 300ms for sustained celebration cascade
    setTimeout(() => {
      if (!canvasRef.current) return;
      const nw = canvasRef.current.width;
      const nh = canvasRef.current.height;
      const delayedBurstLeft = createParticles(
        nw * 0.25,
        nh * 0.75,
        40,
        -Math.PI * 0.45,
        -Math.PI * 0.2,
        15,
        24
      );
      const delayedBurstRight = createParticles(
        nw * 0.75,
        nh * 0.75,
        40,
        -Math.PI * 0.8,
        -Math.PI * 0.55,
        15,
        24
      );
      particlesRef.current = [
        ...particlesRef.current,
        ...delayedBurstLeft,
        ...delayedBurstRight,
      ];
    }, 300);

    if (!animFrameRef.current) {
      startAnimationLoop();
    }
  };

  const startAnimationLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics updates
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;
        p.opacity -= p.decay;

        // Remove dead particles
        if (p.opacity <= 0 || p.y > canvas.height + 40) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle based on shape
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);

        if (p.shape === "rect") {
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          const wobbleScaleX = Math.cos((p.wobble * Math.PI) / 180);
          ctx.scale(wobbleScaleX, 1);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        } else if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.shape === "star") {
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          const r = p.starSize;
          const inner = r * 0.35;
          ctx.beginPath();
          for (let s = 0; s < 8; s++) {
            const radius = s % 2 === 0 ? r : inner;
            const a = (s * Math.PI) / 4;
            if (s === 0) ctx.moveTo(Math.cos(a) * radius, Math.sin(a) * radius);
            else ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
          }
          ctx.closePath();
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.shape === "ribbon") {
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(
            p.ribbonLength / 2,
            Math.sin((p.wobble * Math.PI) / 180) * 10,
            p.ribbonLength,
            0
          );
          ctx.stroke();
        }

        ctx.restore();
      }

      if (particles.length > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        animFrameRef.current = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
  };

  // Resize canvas to match viewport
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
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Trigger celebration whenever trigger counter increments
  useEffect(() => {
    if (trigger > 0) {
      launchCelebration();
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

export default CelebrationConfetti;
