import React, { useEffect, useRef } from "react";

const GOLD_PALETTE = [
  "#f59e0b", // Amber Gold
  "#fbbf24", // Warm Yellow
  "#fcd34d", // Soft Gold
  "#fef08a", // Light Shimmer Gold
  "#d97706", // Deep Bronze Gold
  "#6366f1", // Royal Indigo
  "#8b5cf6", // Vibrant Purple
  "#10b981", // Career Emerald
  "#06b6d4", // Electric Cyan
  "#ffffff", // Diamond Sparkle
];

const ExperienceCelebration = ({ trigger = 0 }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  const createParticles = (x, y, count, angleMin, angleMax, speedMin, speedMax) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      const angle = angleMin + Math.random() * (angleMax - angleMin);
      const speed = speedMin + Math.random() * (speedMax - speedMin);
      const shapes = ["ribbon", "ribbon", "coin", "star", "diamond"];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];

      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.32 + Math.random() * 0.14,
        drag: 0.984,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 9,
        wobble: Math.random() * 360,
        wobbleSpeed: 4 + Math.random() * 6,
        color,
        shape,
        width: 9 + Math.random() * 8,
        height: 5 + Math.random() * 6,
        radius: 4 + Math.random() * 4,
        starSize: 7 + Math.random() * 7,
        ribbonLength: 14 + Math.random() * 12,
        opacity: 1,
        decay: 0.005 + Math.random() * 0.004,
      });
    }
    return newParticles;
  };

  const launchCelebration = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const w = canvas.width;
    const h = canvas.height;

    // Cannon 1: Bottom Left corner shooting up-right towards the timeline
    const leftCannon = createParticles(
      w * 0.1,
      h * 0.85,
      60,
      -Math.PI * 0.48,
      -Math.PI * 0.22,
      19,
      28
    );

    // Cannon 2: Bottom Right corner shooting up-left towards the timeline
    const rightCannon = createParticles(
      w * 0.9,
      h * 0.85,
      60,
      -Math.PI * 0.78,
      -Math.PI * 0.52,
      19,
      28
    );

    // Center Milestone Trophy Burst: Right at the top of the timeline
    const centerTrophyBurst = createParticles(
      w * 0.5,
      h * 0.45,
      75,
      -Math.PI,
      0,
      12,
      24
    );

    particlesRef.current = [
      ...particlesRef.current,
      ...leftCannon,
      ...rightCannon,
      ...centerTrophyBurst,
    ];

    // Secondary cascading burst after 320ms for full festive celebration
    setTimeout(() => {
      if (!canvasRef.current) return;
      const nw = canvasRef.current.width;
      const nh = canvasRef.current.height;
      const cascadeLeft = createParticles(
        nw * 0.22,
        nh * 0.7,
        45,
        -Math.PI * 0.45,
        -Math.PI * 0.2,
        15,
        24
      );
      const cascadeRight = createParticles(
        nw * 0.78,
        nh * 0.7,
        45,
        -Math.PI * 0.8,
        -Math.PI * 0.55,
        15,
        24
      );
      particlesRef.current = [
        ...particlesRef.current,
        ...cascadeLeft,
        ...cascadeRight,
      ];
    }, 320);

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

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;
        p.opacity -= p.decay;

        if (p.opacity <= 0 || p.y > canvas.height + 40) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);

        if (p.shape === "ribbon") {
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 3;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(
            p.ribbonLength / 2,
            Math.sin((p.wobble * Math.PI) / 180) * 12,
            p.ribbonLength,
            0
          );
          ctx.stroke();
        } else if (p.shape === "coin") {
          // Golden achievement coin with 3D wobble
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          const wobbleScale = Math.cos((p.wobble * Math.PI) / 180);
          ctx.scale(wobbleScale, 1);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();

          // Inner gold ring
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 0.65, 0, Math.PI * 2);
          ctx.stroke();
        } else if (p.shape === "star") {
          // 4-point glowing star
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          const r = p.starSize;
          const inner = r * 0.3;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          for (let s = 0; s < 8; s++) {
            const radius = s % 2 === 0 ? r : inner;
            const a = (s * Math.PI) / 4;
            if (s === 0) ctx.moveTo(Math.cos(a) * radius, Math.sin(a) * radius);
            else ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          // Diamond / confetti flake
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          const wobbleX = Math.cos((p.wobble * Math.PI) / 180);
          ctx.scale(wobbleX, 1);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
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

export default ExperienceCelebration;
