import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  color: string;
  size: number;
  opacity: number;
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

interface SpaceShip {
  x: number;
  y: number;
  speed: number;
  angle: number;
  type: 'ufo' | 'cruiser';
  size: number;
  color: string;
  thrusterHue: string;
  lightPhase: number;
}

interface CelestialWatcher {
  active: boolean;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  phase: 'peeking' | 'waving' | 'smiling' | 'warping';
  progress: number;
  blink: boolean;
  eyeAngle: number;
  warpDestination: { x: number; y: number };
}

export const ShootingStarsBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Hardware Quality Auto-Detection
  const [qualityTier, setQualityTier] = useState<'ultra' | 'optimized'>('ultra');

  useEffect(() => {
    // Check hardware capabilities
    const memory = (navigator as any).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    if (memory < 4 || cores < 4) {
      setQualityTier('optimized');
    } else {
      setQualityTier('ultra');
    }
  }, []);

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
    const isUltra = qualityTier === 'ultra';

    // Color Palettes
    const darkColors = ['#FFFFFF', '#FDE68A', '#F59E0B', '#38BDF8', '#E0F2FE', '#C084FC', '#F43F5E'];
    const lightColors = ['#F59E0B', '#0284C7', '#D946EF', '#10B981', '#F43F5E', '#8B5CF6', '#E11D48'];
    const activeColors = isLight ? lightColors : darkColors;

    // 1. Stars and Constellations
    const starCount = isUltra ? 90 : 45;
    const twinkleStars: TwinkleStar[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (isUltra ? 2.4 : 1.8) + 0.6,
      color: activeColors[Math.floor(Math.random() * activeColors.length)],
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.035 + 0.015,
      phase: Math.random() * Math.PI * 2
    }));

    // Constellation lines linking nearby stars
    const constellationPairs: [number, number][] = [];
    for (let i = 0; i < twinkleStars.length; i++) {
      for (let j = i + 1; j < twinkleStars.length; j++) {
        const dx = twinkleStars[i].x - twinkleStars[j].x;
        const dy = twinkleStars[i].y - twinkleStars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < (isUltra ? 110 : 80) && Math.random() < 0.25) {
          constellationPairs.push([i, j]);
        }
      }
    }

    // 2. Galaxies & Black Hole Coordinates
    let galaxyRotation = 0;
    const galaxyX = width * 0.85;
    const galaxyY = height * 0.2;

    const blackHoleX = width * 0.12;
    const blackHoleY = height * 0.75;
    let blackHolePulse = 0;

    // Planet Saturn-like coordinates
    const planetX = width * 0.88;
    const planetY = height * 0.82;
    let planetRingAngle = 0.35;

    // 3. Dynamic Arrays: Shooting Stars, Ships, Watcher
    const shootingStars: ShootingStar[] = [];
    const spaceShips: SpaceShip[] = [];

    // Cosmic Watcher Character State
    const watcher: CelestialWatcher = {
      active: false,
      x: -50,
      y: height * 0.6,
      targetX: 60,
      targetY: height * 0.6,
      phase: 'peeking',
      progress: 0,
      blink: false,
      eyeAngle: 0,
      warpDestination: { x: galaxyX, y: galaxyY }
    };

    // Watcher activation loop (Every 20 - 35 seconds)
    const scheduleWatcher = () => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          watcher.active = true;
          watcher.phase = 'peeking';
          watcher.progress = 0;
          watcher.x = Math.random() > 0.5 ? -40 : width + 40;
          watcher.targetX = watcher.x < 0 ? 55 : width - 55;
          watcher.y = Math.random() * (height * 0.6) + height * 0.2;
          watcher.targetY = watcher.y;
          watcher.warpDestination = {
            x: Math.random() > 0.5 ? galaxyX : blackHoleX,
            y: Math.random() > 0.5 ? galaxyY : blackHoleY
          };
        }
        scheduleWatcher();
      }, Math.random() * 15000 + 20000);
    };
    scheduleWatcher();

    // Spawn Ships periodically (UFO / Cruiser)
    const scheduleShip = () => {
      setTimeout(() => {
        if (spaceShips.length < 2) {
          const fromLeft = Math.random() > 0.5;
          spaceShips.push({
            x: fromLeft ? -60 : width + 60,
            y: Math.random() * (height * 0.7) + 50,
            speed: (Math.random() * 2.5 + 2.0) * (fromLeft ? 1 : -1),
            angle: (Math.random() * 0.2 - 0.1),
            type: Math.random() > 0.5 ? 'ufo' : 'cruiser',
            size: isUltra ? (Math.random() * 8 + 14) : 12,
            color: isLight ? '#0284C7' : '#38BDF8',
            thrusterHue: isLight ? '#F59E0B' : '#F59E0B',
            lightPhase: 0
          });
        }
        scheduleShip();
      }, Math.random() * 8000 + 7000);
    };
    scheduleShip();

    // Spawn Shooting Star
    const createShootingStar = () => {
      const angle = (Math.random() * 60 + 20) * (Math.PI / 180);
      const startX = Math.random() * (width * 1.3) - width * 0.15;
      const startY = Math.random() * (height * 0.35) - 50;

      shootingStars.push({
        x: startX,
        y: startY,
        length: Math.random() * (isUltra ? 110 : 70) + 50,
        speed: Math.random() * 6 + 7,
        angle: angle,
        color: activeColors[Math.floor(Math.random() * activeColors.length)],
        size: Math.random() * 2.2 + 1.2,
        opacity: 1
      });
    };

    let lastSpawn = Date.now();

    // -------------------------------------------------------------
    // MAIN 60 FPS RENDER LOOP
    // -------------------------------------------------------------
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Spawn shooting stars periodically
      const now = Date.now();
      if (now - lastSpawn > (isUltra ? 450 : 750)) {
        createShootingStar();
        lastSpawn = now;
      }

      galaxyRotation += 0.0015;
      blackHolePulse += 0.03;

      // ===========================================================
      // A. DRAW ROTATING SPIRAL GALAXY & NEBULA (Deep Space)
      // ===========================================================
      ctx.save();
      ctx.translate(galaxyX, galaxyY);
      ctx.rotate(galaxyRotation);

      // Outer Nebula Glow
      const nebGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, isUltra ? 140 : 80);
      nebGrad.addColorStop(0, isLight ? 'rgba(217, 119, 6, 0.25)' : 'rgba(245, 158, 11, 0.35)');
      nebGrad.addColorStop(0.4, isLight ? 'rgba(147, 51, 234, 0.15)' : 'rgba(168, 85, 247, 0.25)');
      nebGrad.addColorStop(0.8, isLight ? 'rgba(6, 182, 212, 0.08)' : 'rgba(6, 182, 212, 0.15)');
      nebGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = nebGrad;
      ctx.beginPath();
      ctx.arc(0, 0, isUltra ? 140 : 80, 0, Math.PI * 2);
      ctx.fill();

      // Spiral arms particles
      if (isUltra) {
        for (let arm = 0; arm < 3; arm++) {
          const armOffset = (arm * Math.PI * 2) / 3;
          for (let p = 0; p < 25; p++) {
            const r = p * 4.5 + 8;
            const theta = armOffset + p * 0.22;
            const px = Math.cos(theta) * r;
            const py = Math.sin(theta) * r;
            ctx.beginPath();
            ctx.arc(px, py, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
            ctx.fillStyle = isLight ? '#D97706' : '#FDE68A';
            ctx.globalAlpha = 0.65;
            ctx.fill();
          }
        }
      }

      // Bright Galactic Nucleus
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#F59E0B';
      ctx.fill();
      ctx.restore();

      // ===========================================================
      // B. DRAW BLACK HOLE & GRAVITATIONAL LENSING RING
      // ===========================================================
      ctx.save();
      ctx.translate(blackHoleX, blackHoleY);

      // Accretion Disk / Photon Ring
      const ringRadius = (isUltra ? 38 : 26) + Math.sin(blackHolePulse) * 2;
      const holeGrad = ctx.createRadialGradient(0, 0, ringRadius * 0.7, 0, 0, ringRadius * 1.5);
      holeGrad.addColorStop(0, '#FFFFFF');
      holeGrad.addColorStop(0.3, isLight ? '#0284C7' : '#38BDF8');
      holeGrad.addColorStop(0.7, isLight ? '#D946EF' : '#C084FC');
      holeGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = holeGrad;
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Black Hole Void Event Horizon
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = '#05050D';
      ctx.fill();
      ctx.restore();

      // ===========================================================
      // C. DRAW RINGED SATURN-LIKE PLANET
      // ===========================================================
      ctx.save();
      ctx.translate(planetX, planetY);

      // Planet Body Gradient
      const planetGrad = ctx.createRadialGradient(-8, -8, 2, 0, 0, 22);
      planetGrad.addColorStop(0, isLight ? '#FDE68A' : '#F59E0B');
      planetGrad.addColorStop(0.6, isLight ? '#F59E0B' : '#B45309');
      planetGrad.addColorStop(1, isLight ? '#B45309' : '#451A03');

      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fillStyle = planetGrad;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#F59E0B';
      ctx.fill();

      // Planet Luminous Rings
      ctx.beginPath();
      ctx.ellipse(0, 0, 36, 9, planetRingAngle, 0, Math.PI * 2);
      ctx.strokeStyle = isLight ? 'rgba(217, 119, 6, 0.75)' : 'rgba(254, 240, 138, 0.85)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, 42, 11, planetRingAngle, 0, Math.PI * 2);
      ctx.strokeStyle = isLight ? 'rgba(6, 182, 212, 0.5)' : 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // ===========================================================
      // D. DRAW CONSTELLATIONS & TWINKLING STARS
      // ===========================================================
      // Constellation Lines
      ctx.save();
      constellationPairs.forEach(([i, j]) => {
        const starA = twinkleStars[i];
        const starB = twinkleStars[j];
        ctx.beginPath();
        ctx.moveTo(starA.x, starA.y);
        ctx.lineTo(starB.x, starB.y);
        ctx.strokeStyle = isLight ? 'rgba(217, 119, 6, 0.18)' : 'rgba(56, 189, 248, 0.22)';
        ctx.lineWidth = 0.75;
        ctx.stroke();
      });
      ctx.restore();

      // Twinkle Stars
      twinkleStars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const currentOpacity = (Math.sin(star.phase) + 1) / 2 * (isLight ? 0.65 : 0.9) + 0.1;

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

      // ===========================================================
      // E. DRAW SHOOTING STARS
      // ===========================================================
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.014;

        if (star.opacity <= 0 || star.x > width + 100 || star.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

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
        ctx.globalAlpha = star.opacity * (isLight ? 0.8 : 1);
        ctx.shadowBlur = isLight ? 8 : 15;
        ctx.shadowColor = star.color;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 1.7, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? star.color : '#FFFFFF';
        ctx.globalAlpha = star.opacity;
        ctx.fill();
        ctx.restore();
      }

      // ===========================================================
      // F. DRAW SPACESIPS & FLYING SAUCERS (UFOs)
      // ===========================================================
      for (let i = spaceShips.length - 1; i >= 0; i--) {
        const ship = spaceShips[i];
        ship.x += ship.speed;
        ship.y += Math.sin(ship.x * 0.015) * 0.8;
        ship.lightPhase += 0.08;

        if (ship.x > width + 120 || ship.x < -120) {
          spaceShips.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(ship.x, ship.y);

        if (ship.type === 'ufo') {
          // Saucer Dome
          ctx.beginPath();
          ctx.arc(0, -4, ship.size * 0.45, Math.PI, 0);
          ctx.fillStyle = isLight ? '#38BDF8' : '#67E8F9';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#06B6D4';
          ctx.fill();

          // Saucer Metallic Body
          ctx.beginPath();
          ctx.ellipse(0, 0, ship.size, ship.size * 0.35, 0, 0, Math.PI * 2);
          ctx.fillStyle = isLight ? '#0F172A' : '#1E293B';
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();

          // Pulsing Under-Lights
          const lightGlow = Math.sin(ship.lightPhase) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(-ship.size * 0.5, 2, 2, 0, Math.PI * 2);
          ctx.arc(0, 3, 2.5, 0, Math.PI * 2);
          ctx.arc(ship.size * 0.5, 2, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${lightGlow})`;
          ctx.fill();

          // Subtle Tractor Beam
          ctx.beginPath();
          ctx.moveTo(-ship.size * 0.4, 4);
          ctx.lineTo(-ship.size * 0.8, 30);
          ctx.lineTo(ship.size * 0.8, 30);
          ctx.lineTo(ship.size * 0.4, 4);
          ctx.fillStyle = isLight ? 'rgba(6, 182, 212, 0.08)' : 'rgba(56, 189, 248, 0.15)';
          ctx.fill();
        } else {
          // Sleek Cyber Cruiser Ship
          const dir = ship.speed > 0 ? 1 : -1;
          ctx.beginPath();
          ctx.moveTo(dir * ship.size, 0);
          ctx.lineTo(-dir * ship.size * 0.6, -ship.size * 0.4);
          ctx.lineTo(-dir * ship.size * 0.4, 0);
          ctx.lineTo(-dir * ship.size * 0.6, ship.size * 0.4);
          ctx.closePath();
          ctx.fillStyle = isLight ? '#1E293B' : '#E2E8F0';
          ctx.fill();

          // Neon Warp Thruster Trail
          ctx.beginPath();
          ctx.moveTo(-dir * ship.size * 0.4, 0);
          ctx.lineTo(-dir * (ship.size * 1.8), 0);
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 3;
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#F59E0B';
          ctx.stroke();
        }
        ctx.restore();
      }

      // ===========================================================
      // G. RARE COSMIC WATCHER SPIRIT (Peeks, Waves, Smiles & Warps!)
      // ===========================================================
      if (watcher.active) {
        watcher.progress += 0.01;

        if (watcher.phase === 'peeking') {
          // Move towards target peek position
          watcher.x += (watcher.targetX - watcher.x) * 0.06;
          if (Math.abs(watcher.x - watcher.targetX) < 3) {
            watcher.phase = 'waving';
            watcher.progress = 0;
          }
        } else if (watcher.phase === 'waving') {
          // Wave and smile for 3.5 seconds
          if (watcher.progress > 3.0) {
            watcher.phase = 'smiling';
            watcher.progress = 0;
          }
        } else if (watcher.phase === 'smiling') {
          // Happy smile with sparkles before jump
          if (watcher.progress > 1.8) {
            watcher.phase = 'warping';
          }
        } else if (watcher.phase === 'warping') {
          // Smoothly fly and warp towards the destination Galaxy / Black hole!
          const dx = watcher.warpDestination.x - watcher.x;
          const dy = watcher.warpDestination.y - watcher.y;
          watcher.x += dx * 0.08;
          watcher.y += dy * 0.08;

          // Sparkle trail during warp
          ctx.beginPath();
          ctx.arc(watcher.x + (Math.random() * 12 - 6), watcher.y + (Math.random() * 12 - 6), Math.random() * 3 + 1, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();

          if (Math.hypot(dx, dy) < 20) {
            watcher.active = false;
          }
        }

        // Draw Celestial Watcher Fox / Spirit
        ctx.save();
        ctx.translate(watcher.x, watcher.y);

        // Radiant Astral Aura
        const aura = ctx.createRadialGradient(0, 0, 5, 0, 0, 32);
        aura.addColorStop(0, 'rgba(245, 158, 11, 0.4)');
        aura.addColorStop(0.7, 'rgba(56, 189, 248, 0.2)');
        aura.addColorStop(1, 'transparent');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(0, 0, 32, 0, Math.PI * 2);
        ctx.fill();

        // Glowing Face Sphere
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#F59E0B';
        ctx.fill();

        // Cute Spirit Ears
        ctx.beginPath();
        ctx.moveTo(-12, -10);
        ctx.lineTo(-18, -26);
        ctx.lineTo(-4, -16);
        ctx.fillStyle = '#F59E0B';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(12, -10);
        ctx.lineTo(18, -26);
        ctx.lineTo(4, -16);
        ctx.fillStyle = '#F59E0B';
        ctx.fill();

        // Glowing Friendly Eyes (Watching User)
        const eyeColor = isLight ? '#F59E0B' : '#0F172A';
        ctx.beginPath();
        ctx.arc(-6, -3, 3, 0, Math.PI * 2);
        ctx.arc(6, -3, 3, 0, Math.PI * 2);
        ctx.fillStyle = eyeColor;
        ctx.fill();

        // Joyful Smile
        ctx.beginPath();
        ctx.arc(0, 3, 6, 0.2, Math.PI - 0.2);
        ctx.strokeStyle = eyeColor;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Waving Little Paw with Sparkle
        if (watcher.phase === 'waving' || watcher.phase === 'smiling') {
          const waveAngle = Math.sin(watcher.progress * 8) * 0.4;
          ctx.save();
          ctx.translate(14, 4);
          ctx.rotate(waveAngle);
          ctx.beginPath();
          ctx.arc(0, 0, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();

          // Sparkle emoji effect
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '10px sans-serif';
          ctx.fillText('✨', 6, -6);
          ctx.restore();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, qualityTier]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
};
