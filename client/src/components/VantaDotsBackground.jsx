import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import DOTS from "vanta/dist/vanta.dots.min";

const VantaDotsBackground = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = DOTS({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xec4899,           // 🎯 Pink dots
        backgroundColor: 0x0f172a  // 🖤 Dark background
      });
    }

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 -z-10 w-full h-full"
    />
  );
};

export default VantaDotsBackground;
