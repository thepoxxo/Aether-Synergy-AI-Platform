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
  type: 'bolide' | 'comet' | 'fireball';
  tailGlow: string;
}

interface TwinkleStar {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  twinkleSpeed: number;
  phase: number;
  hasFlare: boolean;
  pulseType: 'breathe' | 'sparkle' | 'steady';
}

interface ProceduralPlanet {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'gas_giant' | 'ice_world' | 'terrestrial' | 'cyber_neon' | 'volcanic' | 'cryo_moon';
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
  ringWobble: number;
  opacity: number;
  bands: { offset: number; width: number; color: string }[];
}

interface RadiantSun {
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
  flarePhase: number;
  color1: string;
  color2: string;
  coronaColor: string;
  opacity: number;
}

interface WhiteHole {
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
  emissionParticles: { angle: number; dist: number; speed: number; color: string; size: number }[];
  opacity: number;
}

interface Asteroid {
  x: number;
  y: number;
  radius: number;
  angle: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotation: number;
  rotSpeed: number;
  vertices: { dx: number; dy: number }[];
  color: string;
  lane: 'inner' | 'mid' | 'outer';
}

interface DistantDwarfGalaxy {
  x: number;
  y: number;
  radius: number;
  rotation: number;
  rotSpeed: number;
  color: string;
  opacity: number;
}

type ExplosionPattern = 'omni_burst' | 'polar_jets' | 'pinwheel_spiral' | 'quad_cross';

interface GalaxyParticle {
  x: number;
  y: number;
  baseRadius: number;
  angle: number;
  speed: number;
  color: string;
  size: number;
  sparklePhase: number;
  distFromCenter: number;
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
  scared: boolean;
  scareVelocity: number;
  stolenDigit: string | null;
  state: 'flying' | 'hover_sucking' | 'departing';
  hoverTimer: number;
  targetCardX: number;
  targetCardY: number;
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

interface WhiteGuardian {
  active: boolean;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  state: 'sprinting' | 'restoring_numbers' | 'placing_wall' | 'patrolling' | 'shooing' | 'stealth_exit' | 'peeking_corner';
  progress: number;
  legPhase: number;
  spineAngle: number;
  lookAngle: number;
  flashlightAngle: number;
  wallOpacity: number;
  peekTimer: number;
  targetElement: HTMLElement | null;
  originalHTML: string;
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

    const darkColors = ['#FFFFFF', '#FDE68A', '#F59E0B', '#38BDF8', '#E0F2FE', '#C084FC', '#F43F5E', '#10B981', '#EC4899'];
    const lightColors = ['#F59E0B', '#0284C7', '#D946EF', '#10B981', '#F43F5E', '#8B5CF6', '#E11D48', '#059669', '#2563EB'];
    const activeColors = isLight ? lightColors : darkColors;

    // 1. Constellations & Multi-Speed Twinkle Stars
    const starCount = isUltra ? 130 : 65;
    const twinkleStars: TwinkleStar[] = Array.from({ length: starCount }, () => {
      const pRand = Math.random();
      const pulseType = pRand < 0.25 ? 'breathe' : pRand < 0.7 ? 'sparkle' : 'steady';
      const twinkleSpeed =
        pulseType === 'breathe'
          ? Math.random() * 0.012 + 0.006 // Slow relaxing breath
          : pulseType === 'sparkle'
          ? Math.random() * 0.04 + 0.02 // Fast staccato twinkle
          : Math.random() * 0.02 + 0.01;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (isUltra ? 2.5 : 1.8) + 0.6,
        color: activeColors[Math.floor(Math.random() * activeColors.length)],
        opacity: Math.random(),
        twinkleSpeed: twinkleSpeed,
        phase: Math.random() * Math.PI * 2,
        hasFlare: Math.random() < (isUltra ? 0.35 : 0.2),
        pulseType: pulseType
      };
    });

    const constellationPairs: [number, number][] = [];
    for (let i = 0; i < twinkleStars.length; i++) {
      for (let j = i + 1; j < twinkleStars.length; j++) {
        const dx = twinkleStars[i].x - twinkleStars[j].x;
        const dy = twinkleStars[i].y - twinkleStars[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < (isUltra ? 110 : 75) && Math.random() < 0.2) {
          constellationPairs.push([i, j]);
        }
      }
    }

    // 2. Radiant Sun (Solar Flare Generator)
    const radiantSun: RadiantSun = {
      x: width * 0.88,
      y: height * 0.16,
      radius: isUltra ? 32 : 22,
      pulsePhase: 0,
      flarePhase: 0,
      color1: '#FBBF24',
      color2: '#F59E0B',
      coronaColor: '#EA580C',
      opacity: 0.9
    };

    // 3. White Hole (Agujero Blanco - Emitter of pure relativistic light and matter)
    const whiteHole: WhiteHole = {
      x: width * 0.85,
      y: height * 0.55,
      radius: isUltra ? 20 : 14,
      pulsePhase: 0,
      opacity: 0.85,
      emissionParticles: Array.from({ length: 45 }, () => ({
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * 50 + 5,
        speed: Math.random() * 1.5 + 0.8,
        color: activeColors[Math.floor(Math.random() * activeColors.length)],
        size: Math.random() * 2 + 1
      }))
    };

    // 4. Slow, Majestic Multi-Pattern Supernova Galaxy Engine
    let galaxyState: 'expanding' | 'exploding' | 'reforming' = 'expanding';
    let galaxyScale = 1.0;
    let galaxyRotation = 0;
    let supernovaProgress = 0;
    let shockwaveRadius = 0;
    let shockwaveAlpha = 0;
    let currentExplosionPattern: ExplosionPattern = 'omni_burst';

    const galaxyParticleCount = isUltra ? 350 : 160;
    const galaxyParticles: GalaxyParticle[] = Array.from({ length: galaxyParticleCount }, (_, i) => {
      const radius = Math.random() * (isUltra ? 170 : 110) + 12;
      const angle = (i / galaxyParticleCount) * Math.PI * 6 + Math.random() * 0.4;
      return {
        x: 0,
        y: 0,
        baseRadius: radius,
        angle: angle,
        speed: Math.random() * 0.0008 + 0.0004, // Very slow, graceful, relaxing swirl
        color: activeColors[i % activeColors.length],
        size: Math.random() * 2.4 + 0.8,
        sparklePhase: Math.random() * Math.PI * 2,
        distFromCenter: radius
      };
    });

    // 5. Multi-Lane Asteroid Belt (Keplerian physics: inner lanes orbit faster, outer lanes slower)
    const asteroidCount = isUltra ? 36 : 18;
    const asteroids: Asteroid[] = Array.from({ length: asteroidCount }, (_, idx) => {
      const lane: 'inner' | 'mid' | 'outer' = idx % 3 === 0 ? 'inner' : idx % 3 === 1 ? 'mid' : 'outer';
      const orbitRadius =
        lane === 'inner'
          ? Math.random() * (width * 0.08) + width * 0.12
          : lane === 'mid'
          ? Math.random() * (width * 0.1) + width * 0.22
          : Math.random() * (width * 0.12) + width * 0.35;

      const orbitSpeed =
        lane === 'inner'
          ? (Math.random() * 0.0012 + 0.0009) * (Math.random() > 0.5 ? 1 : -1) // Fast inner lane
          : lane === 'mid'
          ? (Math.random() * 0.0006 + 0.0004) * (Math.random() > 0.5 ? 1 : -1) // Medium mid lane
          : (Math.random() * 0.00025 + 0.00015) * (Math.random() > 0.5 ? 1 : -1); // Slow outer lane

      const numVerts = Math.floor(Math.random() * 3) + 5;
      const baseR = Math.random() * 5 + 3;
      const vertices = Array.from({ length: numVerts }, (_, vIdx) => {
        const vAngle = (vIdx / numVerts) * Math.PI * 2;
        const vDist = baseR * (Math.random() * 0.5 + 0.75);
        return { dx: Math.cos(vAngle) * vDist, dy: Math.sin(vAngle) * vDist };
      });

      return {
        x: 0,
        y: 0,
        radius: baseR,
        angle: Math.random() * Math.PI * 2,
        orbitRadius: orbitRadius,
        orbitSpeed: orbitSpeed,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: Math.random() * 0.02 - 0.01,
        vertices: vertices,
        color: isLight ? '#94A3B8' : '#64748B',
        lane: lane
      };
    });

    // 6. Distant Miniature Dwarf Galaxies
    const dwarfGalaxies: DistantDwarfGalaxy[] = [
      { x: width * 0.08, y: height * 0.14, radius: 28, rotation: 0, rotSpeed: 0.0008, color: '#06B6D4', opacity: 0.55 },
      { x: width * 0.92, y: height * 0.38, radius: 35, rotation: 0, rotSpeed: -0.0009, color: '#EC4899', opacity: 0.5 },
      { x: width * 0.45, y: height * 0.92, radius: 24, rotation: 0, rotSpeed: 0.001, color: '#F59E0B', opacity: 0.45 }
    ];

    // 7. Deep Space Procedural Planets with Real 3D Rotation & Ring Wobble
    const planets: ProceduralPlanet[] = [
      {
        id: 'planet-saturn',
        x: width * 0.86,
        y: height * 0.8,
        vx: -0.02,
        vy: 0.008,
        radius: 24,
        type: 'gas_giant',
        rotation: 0,
        rotationSpeed: 0.004,
        lightAngle: 0.8,
        lightPhaseSpeed: 0.0015,
        primaryColor: '#F59E0B',
        secondaryColor: '#FDE68A',
        shadowColor: '#451A03',
        hasRings: true,
        ringColor: 'rgba(251, 191, 36, 0.85)',
        ringAngle: 0.35,
        ringWobble: 0,
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
        x: width * 0.16,
        y: height * 0.24,
        vx: 0.02,
        vy: -0.01,
        radius: 17,
        type: 'cyber_neon',
        rotation: 0,
        rotationSpeed: 0.006,
        lightAngle: -0.6,
        lightPhaseSpeed: 0.002,
        primaryColor: '#06B6D4',
        secondaryColor: '#E0F2FE',
        shadowColor: '#082F49',
        hasRings: true,
        ringColor: 'rgba(6, 182, 212, 0.75)',
        ringAngle: -0.4,
        ringWobble: 0,
        opacity: 0.85,
        bands: [
          { offset: -0.4, width: 2.5, color: '#0284C7' },
          { offset: 0.1, width: 3.5, color: '#38BDF8' },
          { offset: 0.5, width: 2, color: '#0369A1' }
        ]
      },
      {
        id: 'planet-volcanic',
        x: width * 0.78,
        y: height * 0.22,
        vx: -0.015,
        vy: 0.006,
        radius: 14,
        type: 'volcanic',
        rotation: 0,
        rotationSpeed: 0.007,
        lightAngle: 1.2,
        lightPhaseSpeed: 0.0025,
        primaryColor: '#DC2626',
        secondaryColor: '#F97316',
        shadowColor: '#450A0A',
        hasRings: false,
        ringColor: 'transparent',
        ringAngle: 0,
        ringWobble: 0,
        opacity: 0.8,
        bands: [
          { offset: -0.3, width: 2, color: '#EA580C' },
          { offset: 0.2, width: 2.5, color: '#7F1D1D' }
        ]
      },
      {
        id: 'planet-cryo',
        x: width * 0.3,
        y: height * 0.88,
        vx: 0.012,
        vy: -0.006,
        radius: 12,
        type: 'cryo_moon',
        rotation: 0,
        rotationSpeed: 0.005,
        lightAngle: -1.0,
        lightPhaseSpeed: 0.0018,
        primaryColor: '#38BDF8',
        secondaryColor: '#E0F2FE',
        shadowColor: '#0C4A6E',
        hasRings: false,
        ringColor: 'transparent',
        ringAngle: 0,
        ringWobble: 0,
        opacity: 0.75,
        bands: [
          { offset: -0.2, width: 2, color: '#7DD3FC' },
          { offset: 0.3, width: 2, color: '#0284C7' }
        ]
      }
    ];

    let blackHoleX = width * 0.12;
    let blackHoleY = height * 0.72;
    let blackHolePulse = 0;

    const spaceShips: SpaceShip[] = [];
    const shootingStars: ShootingStar[] = [];

    // 8. Celestial Watcher Spirit
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
      warpDest: { x: width * 0.5, y: height * 0.45 }
    };

    // 9. Fluid Humanoid White Guardian Runner
    const guardian: WhiteGuardian = {
      active: false,
      x: -60,
      y: height * 0.55,
      targetX: width * 0.5,
      targetY: height * 0.55,
      state: 'sprinting',
      progress: 0,
      legPhase: 0,
      spineAngle: 0,
      lookAngle: 0,
      flashlightAngle: 0,
      wallOpacity: 0,
      peekTimer: 0,
      targetElement: null,
      originalHTML: ''
    };

    const scheduleWatcher = () => {
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
        watcher.warpDest = { x: width * 0.5, y: height * 0.45 };
        scheduleWatcher();
      }, Math.random() * 15000 + 16000);
    };
    scheduleWatcher();

    const scheduleShip = () => {
      setTimeout(() => {
        if (spaceShips.length < 2) {
          const fromLeft = Math.random() > 0.5;
          spaceShips.push({
            id: 'ship-' + Date.now(),
            x: fromLeft ? -70 : width + 70,
            y: Math.random() * (height * 0.4) + 60,
            speed: (Math.random() * 1.8 + 1.2) * (fromLeft ? 1 : -1),
            type: Math.random() > 0.3 ? 'ufo' : 'cruiser',
            size: isUltra ? (Math.random() * 6 + 14) : 12,
            color: isLight ? '#0284C7' : '#38BDF8',
            beamActive: true,
            lightPhase: 0,
            scared: false,
            scareVelocity: 0,
            stolenDigit: null,
            state: 'flying',
            hoverTimer: 0,
            targetCardX: 0,
            targetCardY: 0
          });
        }
        scheduleShip();
      }, Math.random() * 7000 + 6000);
    };
    scheduleShip();

    let lastShootingStarSpawn = Date.now();

    // -------------------------------------------------------------
    // MAIN 60 FPS RENDER LOOP
    // -------------------------------------------------------------
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();

      // Multi-Speed Shooting Stars Spawner (Bolides, Comets, Fireballs)
      if (now - lastShootingStarSpawn > (isUltra ? 450 : 800)) {
        const starTypeRand = Math.random();
        const starType: 'bolide' | 'comet' | 'fireball' =
          starTypeRand < 0.4 ? 'bolide' : starTypeRand < 0.75 ? 'comet' : 'fireball';

        const speed =
          starType === 'bolide'
            ? Math.random() * 8 + 12 // Super fast bolide
            : starType === 'comet'
            ? Math.random() * 4 + 6 // Medium graceful comet
            : Math.random() * 2 + 2.5; // Slow majestic fireball

        const length =
          starType === 'bolide'
            ? Math.random() * 80 + 100
            : starType === 'comet'
            ? Math.random() * 60 + 60
            : Math.random() * 30 + 35;

        const angle = (Math.random() * 50 + 25) * (Math.PI / 180);
        const color = activeColors[Math.floor(Math.random() * activeColors.length)];

        shootingStars.push({
          x: Math.random() * (width * 1.3) - width * 0.15,
          y: Math.random() * (height * 0.35) - 50,
          length: length,
          speed: speed,
          angle: angle,
          color: color,
          size: starType === 'bolide' ? 2.5 : starType === 'fireball' ? 3.2 : 1.8,
          opacity: 1,
          type: starType,
          tailGlow: starType === 'comet' ? '#38BDF8' : '#F59E0B'
        });
        lastShootingStarSpawn = now;
      }

      galaxyRotation += 0.00045; // Very slow, majestic, calming rotation
      blackHolePulse += 0.025;
      radiantSun.pulsePhase += 0.02;
      radiantSun.flarePhase += 0.035;
      whiteHole.pulsePhase += 0.035;

      // ===========================================================
      // 1. DRAW RADIANT SUN (Solar Flares & Coronal Loops)
      // ===========================================================
      ctx.save();
      ctx.translate(radiantSun.x, radiantSun.y);
      const sunPulse = radiantSun.radius + Math.sin(radiantSun.pulsePhase) * 2;

      const coronaGrad = ctx.createRadialGradient(0, 0, sunPulse * 0.7, 0, 0, sunPulse * 2.2);
      coronaGrad.addColorStop(0, 'rgba(251, 191, 36, 0.65)');
      coronaGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.35)');
      coronaGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coronaGrad;
      ctx.beginPath();
      ctx.arc(0, 0, sunPulse * 2.2, 0, Math.PI * 2);
      ctx.fill();

      for (let f = 0; f < 6; f++) {
        const fAngle = (f * Math.PI) / 3 + radiantSun.flarePhase * 0.2;
        const fx = Math.cos(fAngle) * (sunPulse * 1.5);
        const fy = Math.sin(fAngle) * (sunPulse * 1.5);
        ctx.beginPath();
        ctx.arc(fx, fy, Math.random() * 3 + 2, 0, Math.PI * 2);
        ctx.fillStyle = '#EA580C';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#F59E0B';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(0, 0, sunPulse, 0, Math.PI * 2);
      ctx.fillStyle = radiantSun.color1;
      ctx.shadowBlur = 24;
      ctx.shadowColor = '#F59E0B';
      ctx.fill();
      ctx.restore();

      // ===========================================================
      // 2. DRAW WHITE HOLE (Agujero Blanco)
      // ===========================================================
      ctx.save();
      ctx.translate(whiteHole.x, whiteHole.y);

      whiteHole.emissionParticles.forEach((ep) => {
        ep.dist += ep.speed;
        if (ep.dist > (isUltra ? 90 : 55)) {
          ep.dist = 4;
          ep.angle = Math.random() * Math.PI * 2;
        }

        const px = Math.cos(ep.angle) * ep.dist;
        const py = Math.sin(ep.angle) * ep.dist;
        ctx.beginPath();
        ctx.arc(px, py, ep.size, 0, Math.PI * 2);
        ctx.fillStyle = ep.color;
        ctx.globalAlpha = Math.max(0, 1 - ep.dist / 85);
        ctx.fill();
      });

      const whGlow = ctx.createRadialGradient(0, 0, 2, 0, 0, whiteHole.radius * 1.8);
      whGlow.addColorStop(0, '#FFFFFF');
      whGlow.addColorStop(0.4, '#38BDF8');
      whGlow.addColorStop(0.8, '#D946EF');
      whGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = whGlow;
      ctx.beginPath();
      ctx.arc(0, 0, whiteHole.radius * 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ===========================================================
      // 3. DRAW DISTANT DWARF GALAXIES
      // ===========================================================
      dwarfGalaxies.forEach((dg) => {
        dg.rotation += dg.rotSpeed;
        ctx.save();
        ctx.translate(dg.x, dg.y);
        ctx.rotate(dg.rotation);

        const dGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, dg.radius);
        dGrad.addColorStop(0, dg.color);
        dGrad.addColorStop(0.6, 'rgba(168, 85, 247, 0.2)');
        dGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = dGrad;
        ctx.globalAlpha = dg.opacity;
        ctx.beginPath();
        ctx.ellipse(0, 0, dg.radius, dg.radius * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ===========================================================
      // 4. DRAW MULTI-LANE ASTEROID BELTS (Keplerian Orbital Physics)
      // ===========================================================
      asteroids.forEach((ast) => {
        ast.angle += ast.orbitSpeed;
        ast.rotation += ast.rotSpeed;
        ast.x = width * 0.5 + Math.cos(ast.angle) * ast.orbitRadius;
        ast.y = height * 0.45 + Math.sin(ast.angle) * (ast.orbitRadius * 0.4);

        ctx.save();
        ctx.translate(ast.x, ast.y);
        ctx.rotate(ast.rotation);

        ctx.beginPath();
        ast.vertices.forEach((v, vIdx) => {
          if (vIdx === 0) ctx.moveTo(v.dx, v.dy);
          else ctx.lineTo(v.dx, v.dy);
        });
        ctx.closePath();
        ctx.fillStyle = ast.color;
        ctx.globalAlpha = ast.lane === 'inner' ? 0.6 : ast.lane === 'mid' ? 0.5 : 0.35;
        ctx.fill();
        ctx.strokeStyle = isLight ? '#CBD5E1' : '#334155';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      });

      // ===========================================================
      // 5. SLOW, MAJESTIC GALAXY EXPANSION & MULTI-PATTERN SUPERNOVA
      // ===========================================================
      const centerX = width * 0.5;
      const centerY = height * 0.45;

      if (galaxyState === 'expanding') {
        galaxyScale += 0.00035; // Slow, hypnotic, majestic pacing
        if (galaxyScale > 2.4) {
          galaxyState = 'exploding';
          supernovaProgress = 0;
          shockwaveRadius = 15;
          shockwaveAlpha = 1.0;
          const patterns: ExplosionPattern[] = ['omni_burst', 'polar_jets', 'pinwheel_spiral', 'quad_cross'];
          currentExplosionPattern = patterns[Math.floor(Math.random() * patterns.length)];
        }
      } else if (galaxyState === 'exploding') {
        supernovaProgress += 0.015;
        shockwaveRadius += 10;
        shockwaveAlpha = Math.max(0, 1.0 - supernovaProgress * 0.5);

        if (supernovaProgress > 2.8) {
          galaxyState = 'reforming';
        }
      } else if (galaxyState === 'reforming') {
        galaxyScale -= 0.015;
        if (galaxyScale <= 1.0) {
          galaxyScale = 1.0;
          galaxyState = 'expanding';
          galaxyParticles.forEach((p) => {
            p.angle = Math.random() * Math.PI * 6;
            p.distFromCenter = p.baseRadius;
          });
        }
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(galaxyRotation);

      if (galaxyState === 'exploding' && shockwaveAlpha > 0.01) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, shockwaveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 158, 11, ${shockwaveAlpha})`;
        ctx.lineWidth = 5;
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#F59E0B';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, shockwaveRadius * 0.85, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${shockwaveAlpha * 0.85})`;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
      }

      const centerFog = ctx.createRadialGradient(0, 0, 10, 0, 0, (isUltra ? 230 : 140) * galaxyScale);
      centerFog.addColorStop(0, isLight ? 'rgba(217, 119, 6, 0.35)' : 'rgba(245, 158, 11, 0.45)');
      centerFog.addColorStop(0.35, isLight ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.28)');
      centerFog.addColorStop(0.7, isLight ? 'rgba(6, 182, 212, 0.12)' : 'rgba(6, 182, 212, 0.2)');
      centerFog.addColorStop(1, 'transparent');

      ctx.fillStyle = centerFog;
      ctx.beginPath();
      ctx.arc(0, 0, (isUltra ? 230 : 140) * galaxyScale, 0, Math.PI * 2);
      ctx.fill();

      galaxyParticles.forEach((p, idx) => {
        p.angle += p.speed;
        p.sparklePhase += 0.035;

        let px = 0;
        let py = 0;

        if (galaxyState === 'exploding') {
          p.distFromCenter += 5.5;

          if (currentExplosionPattern === 'polar_jets') {
            const jetDir = idx % 2 === 0 ? 1 : -1;
            px = (Math.random() - 0.5) * 40;
            py = jetDir * p.distFromCenter * 1.8;
          } else if (currentExplosionPattern === 'pinwheel_spiral') {
            const theta = p.angle + p.distFromCenter * 0.05;
            px = Math.cos(theta) * p.distFromCenter;
            py = Math.sin(theta) * p.distFromCenter;
          } else if (currentExplosionPattern === 'quad_cross') {
            const armAngle = (Math.floor(idx % 4) * Math.PI) / 2 + (Math.random() * 0.2 - 0.1);
            px = Math.cos(armAngle) * p.distFromCenter * 1.4;
            py = Math.sin(armAngle) * p.distFromCenter * 1.4;
          } else {
            px = Math.cos(p.angle) * p.distFromCenter;
            py = Math.sin(p.angle) * p.distFromCenter;
          }
        } else {
          const currentR = p.baseRadius * galaxyScale;
          const theta = p.angle + (currentR / 32);
          px = Math.cos(theta) * currentR;
          py = Math.sin(theta) * currentR * 0.65;
        }

        const sparkleAlpha = (Math.sin(p.sparklePhase) + 1) / 2 * 0.6 + 0.4;
        ctx.beginPath();
        ctx.arc(px, py, p.size * (galaxyState === 'exploding' ? 1.6 : 1), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = sparkleAlpha * (isLight ? 0.75 : 0.95);
        ctx.fill();
      });

      const singularityGlow = galaxyScale > 2.0 ? (galaxyScale - 2.0) * 35 : 12;
      ctx.beginPath();
      ctx.arc(0, 0, singularityGlow, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowBlur = singularityGlow * 2;
      ctx.shadowColor = '#F59E0B';
      ctx.fill();
      ctx.restore();

      // ===========================================================
      // 6. DRAW RELATIVISTIC BLACK HOLE
      // ===========================================================
      ctx.save();
      ctx.translate(blackHoleX, blackHoleY);
      const holeRadius = isUltra ? 26 : 18;
      const lensSpread = holeRadius * 2.3 + Math.sin(blackHolePulse) * 2;

      ctx.beginPath();
      ctx.ellipse(0, -holeRadius * 0.7, lensSpread, holeRadius * 0.9, 0, Math.PI, 0);
      ctx.strokeStyle = isLight ? 'rgba(6, 182, 212, 0.75)' : 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#38BDF8';
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, holeRadius * 0.7, lensSpread * 0.85, holeRadius * 0.7, 0, 0, Math.PI);
      ctx.strokeStyle = isLight ? 'rgba(217, 119, 6, 0.65)' : 'rgba(245, 158, 11, 0.75)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      const diskGrad = ctx.createLinearGradient(-lensSpread * 1.2, 0, lensSpread * 1.2, 0);
      diskGrad.addColorStop(0, '#38BDF8');
      diskGrad.addColorStop(0.4, '#FFFFFF');
      diskGrad.addColorStop(0.7, '#F59E0B');
      diskGrad.addColorStop(1, '#DC2626');

      ctx.beginPath();
      ctx.ellipse(0, 0, lensSpread * 1.25, holeRadius * 0.35, 0.1, 0, Math.PI * 2);
      ctx.strokeStyle = diskGrad;
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, holeRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#020205';
      ctx.fill();
      ctx.restore();

      // ===========================================================
      // 7. DRAW DIVERSE PROCEDURAL PLANETS WITH WOBBLING 3D RINGS
      // ===========================================================
      planets.forEach((p) => {
        p.rotation += p.rotationSpeed;
        p.lightAngle += p.lightPhaseSpeed;
        p.ringWobble += 0.02;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -60) p.x = width + 60;
        if (p.x > width + 60) p.x = -60;

        ctx.save();
        ctx.translate(p.x, p.y);

        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.clip();

        ctx.fillStyle = p.primaryColor;
        ctx.fill();

        p.bands.forEach((band) => {
          const bandY = band.offset * p.radius;
          const bandWidth = Math.sqrt(Math.max(0, p.radius * p.radius - bandY * bandY)) * 2;
          ctx.beginPath();
          ctx.ellipse(0, bandY, bandWidth * 0.5, band.width, p.rotation * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = band.color;
          ctx.globalAlpha = 0.85;
          ctx.fill();
        });

        const lightX = Math.cos(p.lightAngle) * (p.radius * 0.9);
        const lightY = Math.sin(p.lightAngle) * (p.radius * 0.9);
        const shadeGrad = ctx.createRadialGradient(lightX, lightY, 2, 0, 0, p.radius * 1.15);
        shadeGrad.addColorStop(0, 'transparent');
        shadeGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
        shadeGrad.addColorStop(1, 'rgba(0, 0, 0, 0.88)');

        ctx.fillStyle = shadeGrad;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius + 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(0, 0, p.radius + 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? 'rgba(217, 119, 6, 0.45)' : 'rgba(56, 189, 248, 0.65)';
        ctx.lineWidth = 1.3;
        ctx.stroke();

        if (p.hasRings) {
          const dynamicAngle = p.ringAngle + Math.sin(p.ringWobble) * 0.05;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.1, p.radius * 0.55, dynamicAngle, 0, Math.PI * 2);
          ctx.strokeStyle = p.ringColor;
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.45, p.radius * 0.65, dynamicAngle, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.restore();
      });

      // ===========================================================
      // 8. DRAW CONSTELLATIONS & VIVID NEON TWINKLE STARS
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
        const currentOpacity =
          star.pulseType === 'breathe'
            ? (Math.sin(star.phase) + 1) / 2 * (isLight ? 0.75 : 0.95) + 0.1
            : (Math.sin(star.phase * 2) + 1) / 2 * (isLight ? 0.65 : 0.9) + 0.15;

        // Gravitational Stardust Resonance with Mouse Cursor
        const distToCursor = Math.hypot(mouseX - star.x, mouseY - star.y);
        const cursorBoost = distToCursor < 120 ? (1 - distToCursor / 120) * 0.5 : 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size + cursorBoost * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.min(1, currentOpacity + cursorBoost);
        ctx.shadowBlur = (isLight ? 6 : 10) + cursorBoost * 12;
        ctx.shadowColor = star.color;
        ctx.fill();

        if (star.hasFlare && currentOpacity > 0.6) {
          const flareLen = star.size * 3.2 + cursorBoost * 4;
          ctx.beginPath();
          ctx.moveTo(star.x - flareLen, star.y);
          ctx.lineTo(star.x + flareLen, star.y);
          ctx.moveTo(star.x, star.y - flareLen);
          ctx.lineTo(star.x, star.y + flareLen);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.restore();
      });

      // ===========================================================
      // 9. DRAW MULTI-SPEED SHOOTING STARS (BOLIDES, COMETS & FIREBALLS)
      // ===========================================================
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= star.type === 'bolide' ? 0.018 : star.type === 'fireball' ? 0.008 : 0.012;

        if (star.opacity <= 0 || star.x > width + 100 || star.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(0.5, star.tailGlow);
        gradient.addColorStop(1, 'transparent');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.size;
        ctx.lineCap = 'round';
        ctx.globalAlpha = star.opacity * (isLight ? 0.8 : 1);
        ctx.shadowBlur = isLight ? 8 : 18;
        ctx.shadowColor = star.color;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? star.color : '#FFFFFF';
        ctx.globalAlpha = star.opacity;
        ctx.fill();
        ctx.restore();
      }

      // ===========================================================
      // 10. UFO NUMBER ABDUCTION WITH PRECISION HOVER-LOCK SUCKING
      // ===========================================================
      for (let i = spaceShips.length - 1; i >= 0; i--) {
        const ship = spaceShips[i];

        if (ship.scared) {
          ship.x += ship.scareVelocity;
          ship.y -= 3.5;
        } else if (ship.state === 'hover_sucking') {
          ship.hoverTimer += 0.02;
          ship.y = ship.targetCardY - 140 + Math.sin(ship.hoverTimer * 4) * 2.5;

          if (ship.hoverTimer > 3.5) {
            ship.state = 'departing';
          }
        } else if (ship.state === 'departing') {
          ship.x += ship.speed * 1.8;
          ship.y -= 1.5;
        } else {
          ship.x += ship.speed;
          ship.y += Math.sin(ship.x * 0.015) * 0.7;
        }

        ship.lightPhase += 0.08;

        if (ship.x > width + 140 || ship.x < -140) {
          spaceShips.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(ship.x, ship.y);

        if (ship.type === 'ufo') {
          const beamGrad = ctx.createLinearGradient(0, 4, 0, 180);
          beamGrad.addColorStop(0, isLight ? 'rgba(6, 182, 212, 0.45)' : 'rgba(56, 189, 248, 0.55)');
          beamGrad.addColorStop(0.5, isLight ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.35)');
          beamGrad.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.moveTo(-ship.size * 0.4, 4);
          ctx.lineTo(-ship.size * 1.9, 180);
          ctx.lineTo(ship.size * 1.9, 180);
          ctx.lineTo(ship.size * 0.4, 4);
          ctx.fillStyle = beamGrad;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(0, -4, ship.size * 0.45, Math.PI, 0);
          ctx.fillStyle = isLight ? '#38BDF8' : '#67E8F9';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#06B6D4';
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(0, 0, ship.size, ship.size * 0.35, 0, 0, Math.PI * 2);
          ctx.fillStyle = isLight ? '#0F172A' : '#1E293B';
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();

          if (ship.stolenDigit) {
            ctx.fillStyle = '#F59E0B';
            ctx.font = 'bold 10px monospace';
            ctx.fillText(ship.stolenDigit, -8, -1);
          }

          const numberElements = document.querySelectorAll('[class*="text-5xl"], [class*="text-6xl"]');
          numberElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const rawText = el.getAttribute('data-original-val') || el.textContent || '$49';
            if (!el.getAttribute('data-original-val')) {
              el.setAttribute('data-original-val', rawText);
            }

            if (Math.abs(ship.x - (rect.left + rect.width / 2)) < 110 && Math.abs(ship.y - rect.top) < 180) {
              if (ship.state === 'flying' && Math.random() < 0.8) {
                ship.state = 'hover_sucking';
                ship.hoverTimer = 0;
                ship.targetCardX = rect.left + rect.width / 2;
                ship.targetCardY = rect.top;
              }

              ship.stolenDigit = rawText.substring(0, 3);

              const numDigits = Math.max(1, rawText.replace(/[^0-9]/g, '').length);
              const qMarks = Array.from({ length: numDigits }, () => '❓').join('');
              (el as HTMLElement).innerHTML = `<span class="inline-flex items-center gap-1 text-amber-400 font-mono text-4xl animate-bounce" title="¡Número abducido! Esperando al guardián...">${qMarks}</span>`;

              if (!guardian.active && guardian.state !== 'peeking_corner') {
                guardian.active = true;
                guardian.state = 'sprinting';
                guardian.x = -50;
                guardian.targetX = rect.left + rect.width / 2;
                guardian.targetY = rect.top + 30;
                guardian.progress = 0;
                guardian.targetElement = el as HTMLElement;
                guardian.originalHTML = rawText;
              }
            }
          });
        }
        ctx.restore();
      }

      // ===========================================================
      // 11. FLUID HUMANOID WHITE GUARDIAN RUNNER & RESTORER
      // ===========================================================
      if (guardian.active) {
        guardian.progress += 0.015;
        guardian.legPhase += 0.25;

        if (guardian.state === 'sprinting') {
          guardian.x += (guardian.targetX - guardian.x) * 0.14;
          guardian.y += (guardian.targetY - guardian.y) * 0.14;
          guardian.spineAngle = 0.22;

          if (Math.abs(guardian.x - guardian.targetX) < 18) {
            guardian.state = 'restoring_numbers';
            guardian.progress = 0;
          }
        } else if (guardian.state === 'restoring_numbers') {
          guardian.spineAngle = -0.1;

          if (guardian.targetElement && guardian.originalHTML) {
            guardian.targetElement.innerHTML = guardian.originalHTML;
            guardian.targetElement.style.transform = 'translateY(0px) scale(1)';
            guardian.targetElement.style.textShadow = '0 0 25px #F59E0B, 0 0 40px #FFFFFF';
          }

          if (guardian.progress > 0.9) {
            guardian.state = 'placing_wall';
            guardian.progress = 0;
          }
        } else if (guardian.state === 'placing_wall') {
          guardian.wallOpacity = Math.min(1, guardian.progress * 2);

          if (guardian.progress > 1.2) {
            guardian.state = 'patrolling';
            guardian.progress = 0;
          }
        } else if (guardian.state === 'patrolling') {
          guardian.spineAngle = 0;
          guardian.lookAngle = Math.sin(guardian.progress * 4) * 0.8;
          guardian.flashlightAngle = Math.sin(guardian.progress * 3) * 0.6;

          spaceShips.forEach((s) => {
            if (s.type === 'ufo' && Math.hypot(s.x - guardian.x, s.y - guardian.y) < 230) {
              guardian.state = 'shooing';
              s.scared = true;
              s.scareVelocity = s.speed > 0 ? 14 : -14;
            }
          });

          if (guardian.progress > 3.8) {
            guardian.state = 'stealth_exit';
            guardian.progress = 0;
          }
        } else if (guardian.state === 'shooing') {
          if (guardian.progress > 1.5) {
            guardian.state = 'stealth_exit';
          }
        } else if (guardian.state === 'stealth_exit') {
          guardian.x -= 1.8;
          guardian.lookAngle = 0.9;
          guardian.wallOpacity = Math.max(0, guardian.wallOpacity - 0.02);

          if (guardian.x < -60) {
            guardian.state = 'peeking_corner';
            guardian.peekTimer = 0;
          }
        } else if (guardian.state === 'peeking_corner') {
          guardian.x = 24;
          guardian.y = height - 24;
          guardian.peekTimer += 0.01;
          if (guardian.peekTimer > 8.0) {
            guardian.active = false;
          }
        }

        if (guardian.wallOpacity > 0.01) {
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(guardian.targetX - 70, guardian.targetY - 50, 140, 70, 16);
          ctx.strokeStyle = `rgba(6, 182, 212, ${guardian.wallOpacity})`;
          ctx.lineWidth = 2.5;
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#06B6D4';
          ctx.fillStyle = `rgba(6, 182, 212, ${guardian.wallOpacity * 0.15})`;
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = `rgba(255, 255, 255, ${guardian.wallOpacity})`;
          ctx.font = '14px sans-serif';
          ctx.fillText('🛡️', guardian.targetX - 7, guardian.targetY - 20);
          ctx.restore();
        }

        ctx.save();
        ctx.translate(guardian.x, guardian.y);
        ctx.rotate(guardian.spineAngle);

        if (guardian.state === 'peeking_corner') {
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#06B6D4';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(-4, -2, 2.5, 0, Math.PI * 2);
          ctx.arc(4, -2, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#0F172A';
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(-7, -7);
          ctx.lineTo(-2, -5);
          ctx.moveTo(7, -7);
          ctx.lineTo(2, -5);
          ctx.strokeStyle = '#0F172A';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(0, -18, 9, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#FFFFFF';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(3, -18, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#06B6D4';
          ctx.fill();

          if (guardian.state === 'patrolling') {
            ctx.save();
            ctx.rotate(guardian.flashlightAngle);
            const flashGrad = ctx.createRadialGradient(10, 0, 2, 80, 0, 70);
            flashGrad.addColorStop(0, 'rgba(245, 158, 11, 0.6)');
            flashGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = flashGrad;
            ctx.beginPath();
            ctx.moveTo(10, -5);
            ctx.lineTo(90, -35);
            ctx.lineTo(90, 35);
            ctx.lineTo(10, 5);
            ctx.fill();
            ctx.restore();
          }

          ctx.beginPath();
          ctx.moveTo(0, -9);
          ctx.quadraticCurveTo(2, 0, 0, 8);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 3.5;
          ctx.lineCap = 'round';
          ctx.stroke();

          const leg1Hip = Math.sin(guardian.legPhase) * 11;
          const leg1Knee = Math.max(0, Math.sin(guardian.legPhase + 0.5) * 8);
          const leg2Hip = -leg1Hip;
          const leg2Knee = Math.max(0, Math.sin(guardian.legPhase + Math.PI + 0.5) * 8);

          ctx.beginPath();
          ctx.moveTo(0, 8);
          ctx.lineTo(leg1Hip * 0.6, 15 + leg1Knee * 0.3);
          ctx.lineTo(leg1Hip, 24);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, 8);
          ctx.lineTo(leg2Hip * 0.6, 15 + leg2Knee * 0.3);
          ctx.lineTo(leg2Hip, 24);
          ctx.stroke();

          ctx.beginPath();
          if (guardian.state === 'restoring_numbers') {
            ctx.moveTo(0, -4);
            ctx.quadraticCurveTo(10, -10, 18, -14);
            ctx.strokeStyle = '#F59E0B';
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.fillStyle = '#FFFFFF';
            ctx.font = '10px sans-serif';
            ctx.fillText('✨', 18, -18);
          } else if (guardian.state === 'shooing') {
            ctx.moveTo(0, -4);
            ctx.lineTo(18, -18);
            ctx.moveTo(18, -18);
            ctx.lineTo(120, -90);
            ctx.strokeStyle = '#F43F5E';
            ctx.lineWidth = 2.5;
            ctx.stroke();
          } else {
            ctx.moveTo(0, -4);
            ctx.quadraticCurveTo(leg2Hip * 0.4, 0, leg2Hip * 0.8, 6);
            ctx.moveTo(0, -4);
            ctx.quadraticCurveTo(leg1Hip * 0.4, 0, leg1Hip * 0.8, 6);
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2.5;
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // ===========================================================
      // 12. INTERACTIVE CELESTIAL WATCHER
      // ===========================================================
      if (watcher.active) {
        watcher.progress += 0.012;

        const dMouseX = mouseX - watcher.x;
        const dMouseY = mouseY - watcher.y;
        const distToMouse = Math.hypot(dMouseX, dMouseY);

        const eyeAngle = Math.atan2(dMouseY, dMouseX);
        watcher.eyeX = Math.cos(eyeAngle) * 2.2;
        watcher.eyeY = Math.sin(eyeAngle) * 2.2;

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

          ctx.beginPath();
          ctx.arc(watcher.x + (Math.random() * 16 - 8), watcher.y + (Math.random() * 16 - 8), Math.random() * 3 + 1, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();

          if (Math.hypot(dx, dy) < 25) {
            watcher.active = false;
          }
        }

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

        ctx.save();
        ctx.translate(watcher.x, watcher.y + watcher.jumpOffset);
        ctx.rotate(watcher.spinAngle);

        const aura = ctx.createRadialGradient(0, 0, 5, 0, 0, 36);
        aura.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
        aura.addColorStop(0.7, 'rgba(56, 189, 248, 0.25)');
        aura.addColorStop(1, 'transparent');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(0, 0, 36, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, 19, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#F59E0B';
        ctx.fill();

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

        const eyeColor = isLight ? '#F59E0B' : '#0F172A';
        ctx.beginPath();
        ctx.arc(-6 + watcher.eyeX, -3 + watcher.eyeY, 3, 0, Math.PI * 2);
        ctx.arc(6 + watcher.eyeX, -3 + watcher.eyeY, 3, 0, Math.PI * 2);
        ctx.fillStyle = eyeColor;
        ctx.fill();

        if (watcher.phase === 'kissing') {
          ctx.beginPath();
          ctx.arc(0, 4, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#F43F5E';
          ctx.fill();
        } else if (watcher.phase === 'giggling') {
          ctx.beginPath();
          ctx.arc(0, 3, 6, 0, Math.PI);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 3, 6, 0.2, Math.PI - 0.2);
          ctx.strokeStyle = eyeColor;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

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
