/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Subtle particles configuration
    const particleCount = 35;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseOpacity: number;
      color: string;
      pulseSpeed: number;
      pulsePhase: number;
    }> = [];

    // Subtle palette corresponding to our system theme colors in very low opacity
    const colors = [
      "rgba(214, 90, 42, 0.15)", // accent-blue (terracotta)
      "rgba(88, 166, 255, 0.12)", // accent-cyan
      "rgba(63, 185, 80, 0.1)",   // accent-green
      "rgba(240, 127, 67, 0.12)"  // accent-amber
    ];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18, // Extra slow drift
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 2 + 1, // small elegant dots
        baseOpacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: 0.01 + Math.random() * 0.015,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Keep track of cursor position for gentle interaction
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 120
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = event.clientX;
      mouse.targetY = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinates interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Update and draw particles
      particles.forEach((p) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Pulse the phase for a breathing/twinkling effect
        p.pulsePhase += p.pulseSpeed;
        const opacityMultiplier = Math.sin(p.pulsePhase) * 0.35 + 0.65;
        const currentOpacity = p.baseOpacity * opacityMultiplier;

        // Boundaries check with wrapping
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interaction with mouse: push away gently
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.hypot(dx, dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            // Drifts away from cursor
            p.x += Math.cos(angle) * force * 1.5;
            p.y += Math.sin(angle) * force * 1.5;
          }
        }

        // Color replacement opacity with current breathing state
        const baseColorWithoutOpacity = p.color.substring(0, p.color.lastIndexOf(","));
        const fillStyle = `${baseColorWithoutOpacity}, ${currentOpacity})`;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.fill();

        // Optional ultra-subtle connections to close neighbors
        particles.forEach((other) => {
          if (p === other) return;
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 110) {
            const lineOpacity = (1 - distance / 110) * 0.05 * currentOpacity;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(139, 148, 158, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] select-none opacity-60"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
