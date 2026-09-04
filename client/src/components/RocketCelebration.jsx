import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiX, FiSend } from "react-icons/fi";

const FIREWORK_COLORS = [
  "#f43f5e",
  "#ec4899",
  "#8b5cf6",
  "#3b82f6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ffffff",
];

const RocketCelebration = ({ isActive, senderName, onClose }) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    particlesRef.current = [];

    // Helper to spawn a firework burst
    const spawnBurst = (x, y, count = 70) => {
      const burstColor =
        FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 8;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: Math.random() > 0.3 ? burstColor : "#fbbf24",
          alpha: 1,
          decay: 0.012 + Math.random() * 0.015,
          radius: 1.5 + Math.random() * 2.5,
          trail: [],
        });
      }
    };

    // Trigger fireworks sequence after rocket reaches top
    const timer1 = setTimeout(() => {
      spawnBurst(canvas.width * 0.5, canvas.height * 0.3, 90);
    }, 650);

    const timer2 = setTimeout(() => {
      spawnBurst(canvas.width * 0.3, canvas.height * 0.25, 75);
    }, 850);

    const timer3 = setTimeout(() => {
      spawnBurst(canvas.width * 0.7, canvas.height * 0.28, 75);
    }, 1050);

    // Animation loop
    const render = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07; // subtle gravity
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (particles.length > 0 || isActive) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
          {/* Canvas for Fireworks */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none w-full h-full"
          />

          {/* Flying Rocket Animation */}
          <motion.div
            initial={{ y: 350, x: 0, scale: 0.8, opacity: 1 }}
            animate={{
              y: [-100, -250],
              scale: [1, 1.2, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="absolute pointer-events-none text-5xl z-20"
          >
            🚀
          </motion.div>

          {/* Celebration Success Dialog Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ delay: 0.65, type: "spring", stiffness: 260, damping: 20 }}
            className="relative z-30 max-w-md w-full bg-white dark:bg-gray-900/95 border border-indigo-200 dark:border-indigo-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-500/20 text-center overflow-hidden"
          >
            {/* Ambient Rainbow Glow Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FiX className="text-lg" />
            </button>

            {/* Celebration Icon */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/30 animate-bounce">
              ✨
            </div>

            {/* Title */}
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Message Blast Off! 🚀
            </h3>

            {/* Subtext */}
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Thank you, <span className="font-bold text-indigo-600 dark:text-indigo-400">{senderName || "there"}</span>! Your message has launched straight into Amardeep's inbox.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/50 flex items-center justify-center gap-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              <FiCheckCircle className="text-emerald-500 text-sm" />
              <span>Typical reply time: Within 24 hours</span>
            </div>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 active:scale-98 transition-transform cursor-pointer"
            >
              Awesome! 🎉
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RocketCelebration;
