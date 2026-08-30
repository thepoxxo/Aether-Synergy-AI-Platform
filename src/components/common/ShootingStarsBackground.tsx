import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number; // in radians
  color: string;
  size: number;
  opacity: number;
  twinklePhase: number;
}

interface TwinkleStar {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  twinkleSpeed: number;
  phase: number;
}

export const ShootingStarsBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isLight = theme === 'light';

    // Color palettes
    const darkColors = ['#FFFFFF', '#FDE68A', '#F59E0B', '#38BDF8', '#E0F2FE', '#C084FC'];
    const lightColors = ['#F59E0B', '#0284C7', '#D946EF', '#10B981', '#F43F5E', '#8B5CF6'];
    const activeColors = isLight ? lightColors : darkColors;

    // Initialize 60 twinkling background stars
    const twinkleStars: TwinkleStar[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      color: activeColors[Math.floor(Math.random() * activeColors.length)],
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.04 + 0.015,
      phase: Math.random() * Math.PI * 2
    }));

    // Dynamic shooting stars array
    const shootingStars: ShootingStar[] = [];

    const createShootingStar = () => {
      // Random directions (from any side of screen)
      const angle = (Math.random() * 60 + 20) * (Math.PI / 180); // between 20deg and 80deg
      const startX = Math.random() * (width * 1.2) - width * 0.1;
      const startY = Math.random() * (height * 0.4) - 50;

      shootingStars.push({
        x: startX,
        y: startY,
        length: Math.random() * 90 + 50,
        speed: Math.random() * 7 + 6,
        angle: angle,
        color: activeColors[Math.floor(Math.random() * activeColors.length)],
        size: Math.random() * 2.2 + 1.2,
        opacity: 1,
        twinklePhase: Math.random() * Math.PI
      });
    };

    // Spawn shooting star periodically
    let lastSpawn = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Spawn new shooting stars randomly every 400ms - 900ms
      const now = Date.now();
      if (now - lastSpawn > Math.random() * 500 + 400) {
        createShootingStar();
        lastSpawn = now;
      }

      // 1. Draw Twinkling Background Stars
      twinkleStars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const currentOpacity = (Math.sin(star.phase) + 1) / 2 * (isLight ? 0.6 : 0.85) + 0.15;

        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentOpacity;
        ctx.shadowBlur = isLight ? 4 : 8;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.restore();
      });

      // 2. Draw & Move Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.012;

        if (star.opacity <= 0 || star.x > width + 100 || star.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        // Gradient for the shooting star tail
        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, 'transparent');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.size;
        ctx.lineCap = 'round';
        ctx.globalAlpha = star.opacity * (isLight ? 0.75 : 0.95);
        ctx.shadowBlur = isLight ? 8 : 14;
        ctx.shadowColor = star.color;
        ctx.stroke();

        // Bright sparkling star head (Diamond spark)
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? star.color : '#FFFFFF';
        ctx.globalAlpha = star.opacity;
        ctx.shadowBlur = 12;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
