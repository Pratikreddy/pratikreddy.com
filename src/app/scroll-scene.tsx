"use client";

import { useEffect } from "react";

export function ScrollScene() {
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const maxScroll = Math.max(root.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      root.style.setProperty("--scene-progress", progress.toFixed(4));
      root.style.setProperty("--scene-angle", `${132 + progress * 42}deg`);
      root.style.setProperty("--scene-y", `${Math.round(progress * -90)}px`);
      root.style.setProperty("--scene-green", (0.16 + progress * 0.18).toFixed(3));
      root.style.setProperty("--scene-gold", (0.08 + progress * 0.08).toFixed(3));
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return <div className="scroll-scene" aria-hidden="true" />;
}
