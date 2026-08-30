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

interface ProceduralPlanet {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'gas_giant' | 'ice_world' | 'terrestrial' | 'cyber_neon' | 'volcanic';
  rotation: number;
  rotationSpeed: number;
  lightAngle: number;
  lightPhaseSpeed: number;
  primaryColor: string;
  secondaryColor: string;
  shadowColor: string;
  hasRings: boolean;
  ringColor: string;
  ringAngle: number;
  opacity: number;
  bands: { offset: number; width: number; color: string }[];
}

interface DistantGalaxy {
  id: string;
  x: number;
  y: number;
  radius: number;
  rotation: number;
  rotationSpeed: number;
  arms: number;
  color1: string;
  color2: string;
  coreColor: string;
  opacity: number;
}

interface SpaceShip {
  id: string;
  x: number;
  y: number;
  speed: number;
  type: 'ufo' | 'cruiser';
  size: number;
  color: string;
  beamActive: boolean;
  lightPhase: number;
}

interface FloatingHeart {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface CelestialWatcher {
  active: boolean;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  phase: 'peeking' | 'happy' | 'kissing' | 'giggling' | 'warping';
  progress: number;
  eyeX: number;
  eyeY: number;
  hearts: FloatingHeart[];
  jumpOffset: number;
  spinAngle: number;
  isTickled: boolean;
  warpDest: { x: number; y: number };
}

export const ShootingStarsBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [qualityTier, setQualityTier] = useState<'ultra' | 'optimized'>('ultra');

  useEffect(() => {
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

    // Mouse Tracking for Interactive Watcher & Gravity
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isLight = theme === 'light';
    const isUltra = qualityTier === 'ultra';

    const darkColors = ['#FFFFFF', '#FDE68A', '#F59E0B', '#38BDF8', '#E0F2FE', '#C084FC', '#F43F5E'];
    const lightColors = ['#F59E0B', '#0284C7', '#D946EF', '#10B981', '#F43F5E', '#8B5CF6', '#E11D48'];
    const activeColors = isLight ? lightColors : darkColors;

    // 1. Constellations & Stars
    const starCount = isUltra ? 85 : 40;
    const twinkleStars: TwinkleStar[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (isUltra ? 2.2 : 1.6) + 0.6,
      color: activeColors[Math.floor(Math.random() * activeColors.length)],
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.03 + 0.015,
      phase: Math.random() * Math.PI * 2
    }));

    const constellationPairs: [number, number][] = [];
    for (let i = 0; i < twinkleStars.length; i++) {
      for (let j = i + 1; j < twinkleStars.length; j++) {
        const dx = twinkleStars[i].x - twinkleStars[j].x;
        const dy = twinkleStars[i].y - twinkleStars[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < (isUltra ? 110 : 75) && Math.random() < 0.22) {
          constellationPairs.push([i, j]);
        }
      }
    }

    // 2. Procedural Dynamic Rotating Planets
    const planets: ProceduralPlanet[] = [
      {
        id: 'planet-saturn',
        x: width * 0.88,
        y: height * 0.82,
        vx: -0.05,
        vy: 0.02,
        radius: 22,
        type: 'gas_giant',
        rotation: 0,
        rotationSpeed: 0.008,
        lightAngle: 0.8,
        lightPhaseSpeed: 0.003,
        primaryColor: '#F59E0B',
        secondaryColor: '#FDE68A',
        shadowColor: '#451A03',
        hasRings: true,
        ringColor: 'rgba(251, 191, 36, 0.85)',
        ringAngle: 0.35,
        opacity: 0.9,
        bands: [
          { offset: -0.6, width: 3, color: '#D97706' },
          { offset: -0.2, width: 4, color: '#B45309' },
          { offset: 0.3, width: 5, color: '#FBBF24' },
          { offset: 0.7, width: 2, color: '#92400E' }
        ]
      },
      {
        id: 'planet-cyber',
        x: width * 0.15,
        y: height * 0.25,
        vx: 0.04,
        vy: -0.02,
        radius: 16,
        type: 'cyber_neon',
        rotation: 0,
        rotationSpeed: 0.012,
        lightAngle: -0.6,
        lightPhaseSpeed: 0.004,
        primaryColor: '#06B6D4',
        secondaryColor: '#E0F2FE',
        shadowColor: '#082F49',
        hasRings: false,
        ringColor: 'transparent',
        ringAngle: 0,
        opacity: 0.85,
        bands: [
          { offset: -0.4, width: 2.5, color: '#0284C7' },
          { offset: 0.1, width: 3.5, color: '#38BDF8' },
          { offset: 0.5, width: 2, color: '#0369A1' }
        ]
      }
    ];

    // 3. Distant Rotating Galaxies & Black Holes
    const galaxies: DistantGalaxy[] = [
      {
        id: 'galaxy-andromeda',
        x: width * 0.82,
        y: height * 0.18,
        radius: isUltra ? 110 : 70,
        rotation: 0,
        rotationSpeed: 0.0018,
        arms: 3,
        color1: '#F59E0B',
        color2: '#A855F7',
        coreColor: '#FFFFFF',
        opacity: 0.85
      },
      {
        id: 'galaxy-sombrero',
        x: width * 0.22,
        y: height * 0.88,
        radius: isUltra ? 85 : 55,
        rotation: 0,
        rotationSpeed: -0.0022,
        arms: 2,
        color1: '#06B6D4',
        color2: '#EC4899',
        coreColor: '#E0F2FE',
        opacity: 0.75
      }
    ];

    // Black Hole with accretion swirling
    let blackHoleX = width * 0.08;
    let blackHoleY = height * 0.65;
    let blackHolePulse = 0;

    // 4. Space Ships & UFOs (with Tractor Beam letter abduction)
    const spaceShips: SpaceShip[] = [];
    const shootingStars: ShootingStar[] = [];

    // 5. Celestial Watcher Spirit
    const watcher: CelestialWatcher = {
      active: false,
      x: -50,
      y: height * 0.5,
      targetX: 65,
      targetY: height * 0.5,
      phase: 'peeking',
      progress: 0,
      eyeX: 0,
      eyeY: 0,
      hearts: [],
      jumpOffset: 0,
      spinAngle: 0,
      isTickled: false,
      warpDest: { x: galaxies[0].x, y: galaxies[0].y }
    };

    // Watcher periodic spawner
    const triggerWatcher = () => {
      setTimeout(() => {
        watcher.active = true;
        watcher.phase = 'peeking';
        watcher.progress = 0;
        watcher.hearts = [];
        watcher.spinAngle = 0;
        watcher.isTickled = false;
        watcher.x = Math.random() > 0.5 ? -45 : width + 45;
        watcher.targetX = watcher.x < 0 ? 65 : width - 65;
        watcher.y = Math.random() * (height * 0.5) + height * 0.2;
        watcher.targetY = watcher.y;
        watcher.warpDest = {
          x: Math.random() > 0.5 ? galaxies[0].x : blackHoleX,
          y: Math.random() > 0.5 ? galaxies[0].y : blackHoleY
        };
        triggerWatcher();
      }, Math.random() * 14000 + 16000);
    };
    triggerWatcher();

    // Spawn Ships periodically
    const spawnShip = () => {
      setTimeout(() => {
        if (spaceShips.length < 2) {
          const fromLeft = Math.random() > 0.5;
          spaceShips.push({
            id: 'ship-' + Date.now(),
            x: fromLeft ? -70 : width + 70,
            y: Math.random() * (height * 0.4) + 60,
            speed: (Math.random() * 2.2 + 1.8) * (fromLeft ? 1 : -1),
            type: Math.random() > 0.4 ? 'ufo' : 'cruiser',
            size: isUltra ? (Math.random() * 6 + 14) : 12,
            color: isLight ? '#0284C7' : '#38BDF8',
            beamActive: true,
            lightPhase: 0
          });
        }
        spawnShip();
      }, Math.random() * 7000 + 6000);
    };
    spawnShip();

    let lastShootingStarSpawn = Date.now();

    // -------------------------------------------------------------
    // MAIN 60 FPS RENDER LOOP
    // -------------------------------------------------------------
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      if (now - lastShootingStarSpawn > (isUltra ? 400 : 700)) {
        const angle = (Math.random() * 60 + 20) * (Math.PI / 180);
        shootingStars.push({
          x: Math.random() * (width * 1.3) - width * 0.15,
          y: Math.random() * (height * 0.35) - 50,
          length: Math.random() * (isUltra ? 110 : 70) + 50,
          speed: Math.random() * 6 + 7,
          angle: angle,
          color: activeColors[Math.floor(Math.random() * activeColors.length)],
          size: Math.random() * 2.2 + 1.2,
          opacity: 1
        });
        lastShootingStarSpawn = now;
      }

      blackHolePulse += 0.04;

      // ===========================================================
      // 1. DRAW DISTANT ROTATING GALAXIES
      // ===========================================================
      galaxies.forEach((g) => {
        g.rotation += g.rotationSpeed;
        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(g.rotation);

        const nebGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, g.radius);
        nebGrad.addColorStop(0, isLight ? 'rgba(217, 119, 6, 0.22)' : 'rgba(245, 158, 11, 0.35)');
        nebGrad.addColorStop(0.5, isLight ? 'rgba(147, 51, 234, 0.12)' : 'rgba(168, 85, 247, 0.22)');
        nebGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = nebGrad;
        ctx.beginPath();
        ctx.arc(0, 0, g.radius, 0, Math.PI * 2);
        ctx.fill();

        // Spiral Arms
        if (isUltra) {
          for (let arm = 0; arm < g.arms; arm++) {
            const armOffset = (arm * Math.PI * 2) / g.arms;
            for (let p = 0; p < 20; p++) {
              const r = p * (g.radius / 22) + 6;
              const theta = armOffset + p * 0.24;
              const px = Math.cos(theta) * r;
              const py = Math.sin(theta) * r;
              ctx.beginPath();
              ctx.arc(px, py, Math.random() * 1.2 + 0.5, 0, Math.PI * 2);
              ctx.fillStyle = p % 2 === 0 ? g.color1 : g.color2;
              ctx.globalAlpha = 0.6;
              ctx.fill();
            }
          }
        }

        // Galactic Bright Core
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fillStyle = g.coreColor;
        ctx.shadowBlur = 12;
        ctx.shadowColor = g.color1;
        ctx.fill();
        ctx.restore();
      });

      // ===========================================================
      // 2. DRAW BLACK HOLE WITH PHOTON RING & ACCRETION
      // ===========================================================
      ctx.save();
      ctx.translate(blackHoleX, blackHoleY);
      const ringRadius = (isUltra ? 34 : 24) + Math.sin(blackHolePulse) * 2.5;

      const holeGrad = ctx.createRadialGradient(0, 0, ringRadius * 0.65, 0, 0, ringRadius * 1.4);
      holeGrad.addColorStop(0, '#FFFFFF');
      holeGrad.addColorStop(0.35, isLight ? '#0284C7' : '#38BDF8');
      holeGrad.addColorStop(0.7, isLight ? '#D946EF' : '#C084FC');
      holeGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = holeGrad;
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Black Hole Void
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius * 0.72, 0, Math.PI * 2);
      ctx.fillStyle = '#030308';
      ctx.fill();
      ctx.restore();

      // ===========================================================
      // 3. DRAW PROCEDURAL ROTATING PLANETS WITH MOVING LIGHT PHASES
      // ===========================================================
      planets.forEach((p) => {
        p.rotation += p.rotationSpeed;
        p.lightAngle += p.lightPhaseSpeed;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds softly
        if (p.x < -60) p.x = width + 60;
        if (p.x > width + 60) p.x = -60;

        ctx.save();
        ctx.translate(p.x, p.y);

        // Circular Planet Mask
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.clip();

        // Planet Base Color
        ctx.fillStyle = p.primaryColor;
        ctx.fill();

        // Rotating Surface Bands with 3D Spherical Projection
        p.bands.forEach((band) => {
          const bandY = band.offset * p.radius;
          const bandWidth = Math.sqrt(Math.max(0, p.radius * p.radius - bandY * bandY)) * 2;
          ctx.beginPath();
          ctx.ellipse(0, bandY, bandWidth * 0.5, band.width, p.rotation * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = band.color;
          ctx.globalAlpha = 0.85;
          ctx.fill();
        });

        // Dynamic Moving Light Phase Shadow (Terminator Line)
        const lightX = Math.cos(p.lightAngle) * (p.radius * 0.9);
        const lightY = Math.sin(p.lightAngle) * (p.radius * 0.9);
        const shadeGrad = ctx.createRadialGradient(lightX, lightY, 2, 0, 0, p.radius * 1.1);
        shadeGrad.addColorStop(0, 'transparent');
        shadeGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
        shadeGrad.addColorStop(1, 'rgba(0, 0, 0, 0.85)');

        ctx.fillStyle = shadeGrad;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius + 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore(); // end planet sphere clip

        // Luminous Atmosphere Rim Scattering
        ctx.beginPath();
        ctx.arc(0, 0, p.radius + 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? 'rgba(217, 119, 6, 0.4)' : 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Planetary Rings
        if (p.hasRings) {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.1, p.radius * 0.55, p.ringAngle, 0, Math.PI * 2);
          ctx.strokeStyle = p.ringColor;
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.4, p.radius * 0.65, p.ringAngle, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.restore();
      });

      // ===========================================================
      // 4. DRAW CONSTELLATIONS & TWINKLING STARS
      // ===========================================================
      ctx.save();
      constellationPairs.forEach(([i, j]) => {
        const starA = twinkleStars[i];
        const starB = twinkleStars[j];
        ctx.beginPath();
        ctx.moveTo(starA.x, starA.y);
        ctx.lineTo(starB.x, starB.y);
        ctx.strokeStyle = isLight ? 'rgba(217, 119, 6, 0.16)' : 'rgba(56, 189, 248, 0.2)';
        ctx.lineWidth = 0.75;
        ctx.stroke();
      });
      ctx.restore();

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
      // 5. DRAW SHOOTING STARS
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
      // 6. DRAW SPACESIPS / UFOs WITH TRACTOR BEAMS & LETTER ABDUCTION
      // ===========================================================
      for (let i = spaceShips.length - 1; i >= 0; i--) {
        const ship = spaceShips[i];
        ship.x += ship.speed;
        ship.y += Math.sin(ship.x * 0.015) * 0.7;
        ship.lightPhase += 0.08;

        if (ship.x > width + 120 || ship.x < -120) {
          spaceShips.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(ship.x, ship.y);

        if (ship.type === 'ufo') {
          // Luminous Tractor Beam Cone projecting down
          const beamGrad = ctx.createLinearGradient(0, 4, 0, 160);
          beamGrad.addColorStop(0, isLight ? 'rgba(6, 182, 212, 0.45)' : 'rgba(56, 189, 248, 0.55)');
          beamGrad.addColorStop(0.5, isLight ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.35)');
          beamGrad.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.moveTo(-ship.size * 0.4, 4);
          ctx.lineTo(-ship.size * 1.8, 160);
          ctx.lineTo(ship.size * 1.8, 160);
          ctx.lineTo(ship.size * 0.4, 4);
          ctx.fillStyle = beamGrad;
          ctx.fill();

          // Saucer Dome
          ctx.beginPath();
          ctx.arc(0, -4, ship.size * 0.45, Math.PI, 0);
          ctx.fillStyle = isLight ? '#38BDF8' : '#67E8F9';
          ctx.shadowBlur = 12;
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

          // Pulsing Anti-Gravity Lights
          const lightGlow = Math.sin(ship.lightPhase) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(-ship.size * 0.5, 2, 2.2, 0, Math.PI * 2);
          ctx.arc(0, 3, 2.8, 0, Math.PI * 2);
          ctx.arc(ship.size * 0.5, 2, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${lightGlow})`;
          ctx.fill();

          // Trigger DOM Letter Abduction Zero-G effect when UFO passes over headings
          const elements = document.querySelectorAll('h1, h2');
          elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (Math.abs(ship.x - (rect.left + rect.width / 2)) < 120 && Math.abs(ship.y - rect.top) < 180) {
              (el as HTMLElement).style.transform = `translateY(-14px) rotate(${Math.sin(ship.x * 0.05) * 2}deg)`;
              (el as HTMLElement).style.textShadow = '0 0 25px rgba(6, 182, 212, 0.8), 0 0 45px rgba(245, 158, 11, 0.6)';
              (el as HTMLElement).style.transition = 'transform 0.2s ease, text-shadow 0.2s ease';
            } else {
              (el as HTMLElement).style.transform = 'translateY(0px) rotate(0deg)';
              (el as HTMLElement).style.textShadow = 'none';
            }
          });
        } else {
          // Cyber Cruiser Ship
          const dir = ship.speed > 0 ? 1 : -1;
          ctx.beginPath();
          ctx.moveTo(dir * ship.size, 0);
          ctx.lineTo(-dir * ship.size * 0.6, -ship.size * 0.4);
          ctx.lineTo(-dir * ship.size * 0.4, 0);
          ctx.lineTo(-dir * ship.size * 0.6, ship.size * 0.4);
          ctx.closePath();
          ctx.fillStyle = isLight ? '#1E293B' : '#E2E8F0';
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(-dir * ship.size * 0.4, 0);
          ctx.lineTo(-dir * (ship.size * 1.9), 0);
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 3.5;
          ctx.shadowBlur = 14;
          ctx.shadowColor = '#F59E0B';
          ctx.stroke();
        }
        ctx.restore();
      }

      // ===========================================================
      // 7. INTERACTIVE CELESTIAL WATCHER (Tickles, Kisses & Warps!)
      // ===========================================================
      if (watcher.active) {
        watcher.progress += 0.012;

        // Eye tracking towards mouse pointer
        const dMouseX = mouseX - watcher.x;
        const dMouseY = mouseY - watcher.y;
        const distToMouse = Math.hypot(dMouseX, dMouseY);

        const eyeAngle = Math.atan2(dMouseY, dMouseX);
        watcher.eyeX = Math.cos(eyeAngle) * 2.2;
        watcher.eyeY = Math.sin(eyeAngle) * 2.2;

        // Tickle reaction when mouse cursor hovers close (< 70px)
        if (distToMouse < 70 && watcher.phase !== 'warping') {
          watcher.phase = 'giggling';
          watcher.isTickled = true;
          watcher.jumpOffset = Math.sin(now * 0.03) * 6;
          watcher.spinAngle += 0.08;
        }

        if (watcher.phase === 'peeking') {
          watcher.x += (watcher.targetX - watcher.x) * 0.06;
          if (Math.abs(watcher.x - watcher.targetX) < 4) {
            watcher.phase = 'happy';
            watcher.progress = 0;
          }
        } else if (watcher.phase === 'happy') {
          watcher.jumpOffset = Math.sin(watcher.progress * 6) * 4;
          if (watcher.progress > 2.5) {
            watcher.phase = 'kissing';
            watcher.progress = 0;
            // Spawn 3 floating hearts
            watcher.hearts = [
              { x: 0, y: 0, vx: (Math.random() - 0.5) * 1.5, vy: -1.5, size: 10, opacity: 1 },
              { x: 0, y: 0, vx: (Math.random() - 0.5) * 1.5, vy: -2.0, size: 12, opacity: 1 },
              { x: 0, y: 0, vx: (Math.random() - 0.5) * 1.5, vy: -1.2, size: 8, opacity: 1 }
            ];
          }
        } else if (watcher.phase === 'kissing') {
          if (watcher.progress > 3.0) {
            watcher.phase = 'warping';
          }
        } else if (watcher.phase === 'giggling') {
          if (distToMouse >= 80) {
            watcher.phase = 'warping';
          }
        } else if (watcher.phase === 'warping') {
          const dx = watcher.warpDest.x - watcher.x;
          const dy = watcher.warpDest.y - watcher.y;
          watcher.x += dx * 0.07;
          watcher.y += dy * 0.07;
          watcher.spinAngle += 0.15;

          // Warp Dust particles
          ctx.beginPath();
          ctx.arc(watcher.x + (Math.random() * 16 - 8), watcher.y + (Math.random() * 16 - 8), Math.random() * 3 + 1, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();

          if (Math.hypot(dx, dy) < 25) {
            watcher.active = false;
          }
        }

        // Draw Floating Kiss Hearts
        watcher.hearts.forEach((h) => {
          h.x += h.vx;
          h.y += h.vy;
          h.opacity -= 0.01;

          ctx.save();
          ctx.translate(watcher.x + h.x, watcher.y + h.y);
          ctx.font = `${h.size}px sans-serif`;
          ctx.globalAlpha = Math.max(0, h.opacity);
          ctx.fillText('💖', -h.size / 2, -h.size / 2);
          ctx.restore();
        });

        // Draw Celestial Watcher Character
        ctx.save();
        ctx.translate(watcher.x, watcher.y + watcher.jumpOffset);
        ctx.rotate(watcher.spinAngle);

        // Radiant Aura Glow
        const aura = ctx.createRadialGradient(0, 0, 5, 0, 0, 36);
        aura.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
        aura.addColorStop(0.7, 'rgba(56, 189, 248, 0.25)');
        aura.addColorStop(1, 'transparent');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(0, 0, 36, 0, Math.PI * 2);
        ctx.fill();

        // Glowing Face
        ctx.beginPath();
        ctx.arc(0, 0, 19, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#F59E0B';
        ctx.fill();

        // Cute Astral Ears
        ctx.beginPath();
        ctx.moveTo(-12, -10);
        ctx.lineTo(-19, -28);
        ctx.lineTo(-4, -17);
        ctx.fillStyle = '#F59E0B';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(12, -10);
        ctx.lineTo(19, -28);
        ctx.lineTo(4, -17);
        ctx.fillStyle = '#F59E0B';
        ctx.fill();

        // Expressive Eyes following Mouse Pointer
        const eyeColor = isLight ? '#F59E0B' : '#0F172A';
        ctx.beginPath();
        ctx.arc(-6 + watcher.eyeX, -3 + watcher.eyeY, 3, 0, Math.PI * 2);
        ctx.arc(6 + watcher.eyeX, -3 + watcher.eyeY, 3, 0, Math.PI * 2);
        ctx.fillStyle = eyeColor;
        ctx.fill();

        // Mouth (Smile / Kiss / Giggle)
        if (watcher.phase === 'kissing') {
          // Kiss Pout
          ctx.beginPath();
          ctx.arc(0, 4, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#F43F5E';
          ctx.fill();
        } else if (watcher.phase === 'giggling') {
          // Laughing Mouth
          ctx.beginPath();
          ctx.arc(0, 3, 6, 0, Math.PI);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();
        } else {
          // Sweet Smile
          ctx.beginPath();
          ctx.arc(0, 3, 6, 0.2, Math.PI - 0.2);
          ctx.strokeStyle = eyeColor;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Little Waving Hand
        if (watcher.phase === 'happy' || watcher.phase === 'kissing') {
          const waveAngle = Math.sin(now * 0.01) * 0.4;
          ctx.save();
          ctx.translate(14, 4);
          ctx.rotate(waveAngle);
          ctx.beginPath();
          ctx.arc(0, 0, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();
          ctx.restore();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
