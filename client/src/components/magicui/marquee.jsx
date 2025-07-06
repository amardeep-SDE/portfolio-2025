import React from "react";

export const Marquee = ({
  children,
  reverse = false,
  pauseOnHover = false,
  className = "",
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden ${pauseOnHover ? "group" : ""}`}
    >
      <div
        className={`flex gap-4 w-max animate-marquee ${
          reverse ? "animate-marquee-reverse" : ""
        } group-hover:[animation-play-state:paused] ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
