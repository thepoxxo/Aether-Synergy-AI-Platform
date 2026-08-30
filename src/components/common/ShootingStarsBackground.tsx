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
  ringWobble: number;
  opacity: number;
  bands: { offset: number; width: number; color: string }[];
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
  state: 'sprinting' | 'placing_wall' | 'patrolling' | 'shooing' | 'stealth_exit' | 'peeking_corner';
  progress: number;
  legPhase: number;
  lookAngle: number;
  flashlightAngle: number;
  wallOpacity: number;
  peekTimer: number;
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

    const darkColors = ['#FFFFFF', '#FDE68A', '#F59E0B', '#38BDF8', '#E0F2FE', '#C084FC', '#F43F5E', '#10B981'];
    const lightColors = ['#F59E0B', '#0284C7', '#D946EF', '#10B981', '#F43F5E', '#8B5CF6', '#E11D48', '#059669'];
    const activeColors = isLight ? lightColors : darkColors;

    // 1. Constellations & Stars
    const starCount = isUltra ? 95 : 45;
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
        if (dist < (isUltra ? 110 : 75) && Math.random() < 0.2) {
          constellationPairs.push([i, j]);
        }
      }
    }

    // 2. Center Mega-Galaxy with Morphing Archetypes
    let centerGalaxyRotation = 0;
    let galaxyMorphPhase = 0;
    const centerGalaxyParticleCount = isUltra ? 240 : 110;
    const centerGalaxyParticles = Array.from({ length: centerGalaxyParticleCount }, (_, i) => ({
      radius: Math.random() * (isUltra ? 160 : 100) + 10,
      baseAngle: (i / centerGalaxyParticleCount) * Math.PI * 8,
      speed: Math.random() * 0.003 + 0.001,
      color: activeColors[i % activeColors.length],
      size: Math.random() * 2.2 + 0.8,
      sparklePhase: Math.random() * Math.PI * 2
    }));

    // 3. Relativistic Black Hole with Einstein Lensing
    let blackHoleX = width * 0.14;
    let blackHoleY = height * 0.72;
    let blackHolePulse = 0;

    // 4. Procedural Dynamic Planets with Ring Wobble & Moving Terminator
    const planets: ProceduralPlanet[] = [
      {
        id: 'planet-saturn',
        x: width * 0.86,
        y: height * 0.8,
        vx: -0.04,
        vy: 0.015,
        radius: 24,
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
        vx: 0.035,
        vy: -0.018,
        radius: 17,
        type: 'cyber_neon',
        rotation: 0,
        rotationSpeed: 0.012,
        lightAngle: -0.6,
        lightPhaseSpeed: 0.004,
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
      }
    ];

    // 5. Space Ships & UFOs (with Abduction Engine)
    const spaceShips: SpaceShip[] = [];
    const shootingStars: ShootingStar[] = [];

    // 6. Celestial Watcher Spirit (Kissing & Laughing)
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

    // 7. White Guardian Runner ("El Muñeco Blanco Guardián")
    const guardian: WhiteGuardian = {
      active: false,
      x: -60,
      y: height * 0.55,
      targetX: width * 0.5,
      targetY: height * 0.55,
      state: 'sprinting',
      progress: 0,
      legPhase: 0,
      lookAngle: 0,
      flashlightAngle: 0,
      wallOpacity: 0,
      peekTimer: 0
    };

    // Watcher activation loop
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

    // Spawn Ships periodically
    const scheduleShip = () => {
      setTimeout(() => {
        if (spaceShips.length < 2) {
          const fromLeft = Math.random() > 0.5;
          spaceShips.push({
            id: 'ship-' + Date.now(),
            x: fromLeft ? -70 : width + 70,
            y: Math.random() * (height * 0.4) + 60,
            speed: (Math.random() * 2.2 + 1.8) * (fromLeft ? 1 : -1),
            type: Math.random() > 0.35 ? 'ufo' : 'cruiser',
            size: isUltra ? (Math.random() * 6 + 14) : 12,
            color: isLight ? '#0284C7' : '#38BDF8',
            beamActive: true,
            lightPhase: 0,
            scared: false,
            scareVelocity: 0
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
      if (now - lastShootingStarSpawn > (isUltra ? 380 : 700)) {
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

      centerGalaxyRotation += 0.0014;
      galaxyMorphPhase += 0.004;
      blackHolePulse += 0.04;

      // ===========================================================
      // 1. DRAW CENTER MEGA-GALAXY (Dense Quantum Core & Morphing Topologies)
      // ===========================================================
      const centerX = width * 0.5;
      const centerY = height * 0.45;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(centerGalaxyRotation);

      // Deep Space Galactic Fog
      const centerFog = ctx.createRadialGradient(0, 0, 10, 0, 0, isUltra ? 220 : 130);
      centerFog.addColorStop(0, isLight ? 'rgba(217, 119, 6, 0.25)' : 'rgba(245, 158, 11, 0.35)');
      centerFog.addColorStop(0.35, isLight ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0.22)');
      centerFog.addColorStop(0.7, isLight ? 'rgba(6, 182, 212, 0.08)' : 'rgba(6, 182, 212, 0.15)');
      centerFog.addColorStop(1, 'transparent');

      ctx.fillStyle = centerFog;
      ctx.beginPath();
      ctx.arc(0, 0, isUltra ? 220 : 130, 0, Math.PI * 2);
      ctx.fill();

      // Dense Quantum Galaxy Particles (Morphing between Spiral, Cartwheel & Starburst)
      const morphTopology = Math.sin(galaxyMorphPhase); // -1 to 1

      centerGalaxyParticles.forEach((p) => {
        p.baseAngle += p.speed;
        p.sparklePhase += 0.05;

        // Shape formula morphing
        let px = 0;
        let py = 0;

        if (morphTopology > 0.3) {
          // 4-Arm Grand Spiral
          const spiralRadius = p.radius;
          const theta = p.baseAngle + (spiralRadius / 30);
          px = Math.cos(theta) * spiralRadius;
          py = Math.sin(theta) * spiralRadius * 0.65;
        } else if (morphTopology < -0.3) {
          // Cartwheel / Ring Galaxy
          const ringRadius = (p.radius > 60 ? p.radius : p.radius * 0.3);
          px = Math.cos(p.baseAngle) * ringRadius;
          py = Math.sin(p.baseAngle) * ringRadius * 0.55;
        } else {
          // Barred Starburst Cluster
          const barLength = Math.cos(p.baseAngle) * p.radius * 1.2;
          const barHeight = Math.sin(p.baseAngle) * (p.radius * 0.4);
          px = barLength;
          py = barHeight;
        }

        const sparkleAlpha = (Math.sin(p.sparklePhase) + 1) / 2 * 0.6 + 0.4;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = sparkleAlpha * (isLight ? 0.7 : 0.9);
        ctx.fill();
      });

      // Bright Central Singular Core
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#F59E0B';
      ctx.fill();
      ctx.restore();

      // ===========================================================
      // 2. DRAW RELATIVISTIC BLACK HOLE (Einstein Lensing Light Curvature)
      // ===========================================================
      ctx.save();
      ctx.translate(blackHoleX, blackHoleY);
      const holeRadius = isUltra ? 26 : 18;
      const lensSpread = holeRadius * 2.3 + Math.sin(blackHolePulse) * 2;

      // Upper Warped Einstein Arch (Light bent over the top of event horizon)
      ctx.beginPath();
      ctx.ellipse(0, -holeRadius * 0.7, lensSpread, holeRadius * 0.9, 0, Math.PI, 0);
      ctx.strokeStyle = isLight ? 'rgba(6, 182, 212, 0.75)' : 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#38BDF8';
      ctx.stroke();

      // Lower Warped Einstein Arch (Light bent under the bottom)
      ctx.beginPath();
      ctx.ellipse(0, holeRadius * 0.7, lensSpread * 0.85, holeRadius * 0.7, 0, 0, Math.PI);
      ctx.strokeStyle = isLight ? 'rgba(217, 119, 6, 0.65)' : 'rgba(245, 158, 11, 0.75)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Main Equator Accretion Disk (Doppler Blue-shifted on left, Redshifted on right)
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

      // Pitch-Black Event Horizon Void
      ctx.beginPath();
      ctx.arc(0, 0, holeRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#020205';
      ctx.fill();
      ctx.restore();

      // ===========================================================
      // 3. DRAW PROCEDURAL PLANETS WITH WOBBLING 3D RINGS & MOVING TERMINATOR
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

        // Planet Body Mask
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.clip();

        ctx.fillStyle = p.primaryColor;
        ctx.fill();

        // 3D Rotating Surface Bands
        p.bands.forEach((band) => {
          const bandY = band.offset * p.radius;
          const bandWidth = Math.sqrt(Math.max(0, p.radius * p.radius - bandY * bandY)) * 2;
          ctx.beginPath();
          ctx.ellipse(0, bandY, bandWidth * 0.5, band.width, p.rotation * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = band.color;
          ctx.globalAlpha = 0.85;
          ctx.fill();
        });

        // Moving Light Terminator Shadow
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

        // Atmospheric Rim
        ctx.beginPath();
        ctx.arc(0, 0, p.radius + 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? 'rgba(217, 119, 6, 0.45)' : 'rgba(56, 189, 248, 0.65)';
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // 3D Wobbling Rings
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
      // 6. DRAW SPACESIPS / UFOs WITH ABDUCTION & GUARDIAN INTERACTION
      // ===========================================================
      for (let i = spaceShips.length - 1; i >= 0; i--) {
        const ship = spaceShips[i];

        if (ship.scared) {
          // Shooed away by guardian at warp speed
          ship.x += ship.scareVelocity;
          ship.y -= 3;
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
          // Tractor Beam Cone
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

          // Underlights
          const lightGlow = Math.sin(ship.lightPhase) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(-ship.size * 0.5, 2, 2.2, 0, Math.PI * 2);
          ctx.arc(0, 3, 2.8, 0, Math.PI * 2);
          ctx.arc(ship.size * 0.5, 2, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${lightGlow})`;
          ctx.fill();

          // ABDUCTION MECHANICS:
          // 1. Letters in cards attempt abduction (float up slightly, but stay attached)
          const textElements = document.querySelectorAll('p, h3, h2, h1');
          textElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (Math.abs(ship.x - (rect.left + rect.width / 2)) < 90 && Math.abs(ship.y - rect.top) < 160) {
              (el as HTMLElement).style.transform = `translateY(-8px) rotate(${Math.sin(ship.x * 0.05)}deg)`;
              (el as HTMLElement).style.transition = 'transform 0.2s ease';
            } else {
              (el as HTMLElement).style.transform = 'translateY(0px) rotate(0deg)';
            }
          });

          // 2. Numbers (Prices & Metrics) are abducted!
          const numberElements = document.querySelectorAll('[class*="text-5xl"], [class*="text-6xl"], [class*="text-2xl"]');
          numberElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (Math.abs(ship.x - (rect.left + rect.width / 2)) < 110 && Math.abs(ship.y - rect.top) < 180) {
              (el as HTMLElement).style.transform = 'translateY(-24px) scale(1.1)';
              (el as HTMLElement).style.textShadow = '0 0 25px #06B6D4, 0 0 40px #F59E0B';
              (el as HTMLElement).style.transition = 'transform 0.15s ease, text-shadow 0.15s ease';

              // Trigger White Guardian Runner!
              if (!guardian.active && guardian.state !== 'peeking_corner') {
                guardian.active = true;
                guardian.state = 'sprinting';
                guardian.x = -50;
                guardian.targetX = rect.left + rect.width / 2;
                guardian.targetY = rect.top + 30;
                guardian.progress = 0;
              }
            } else if (!guardian.active) {
              (el as HTMLElement).style.transform = 'translateY(0px) scale(1)';
              (el as HTMLElement).style.textShadow = 'none';
            }
          });
        }
        ctx.restore();
      }

      // ===========================================================
      // 7. WHITE GUARDIAN RUNNER ("El Muñeco Blanco Guardián")
      // ===========================================================
      if (guardian.active) {
        guardian.progress += 0.015;
        guardian.legPhase += 0.25;

        if (guardian.state === 'sprinting') {
          // Sprint super fast towards the abduction zone
          guardian.x += (guardian.targetX - guardian.x) * 0.15;
          guardian.y += (guardian.targetY - guardian.y) * 0.15;

          if (Math.abs(guardian.x - guardian.targetX) < 15) {
            guardian.state = 'placing_wall';
            guardian.progress = 0;
          }
        } else if (guardian.state === 'placing_wall') {
          // Erect protective shield wall
          guardian.wallOpacity = Math.min(1, guardian.progress * 2);

          // Reset abducted numbers back to place!
          const numberElements = document.querySelectorAll('[class*="text-5xl"], [class*="text-6xl"]');
          numberElements.forEach((el) => {
            (el as HTMLElement).style.transform = 'translateY(0px) scale(1)';
            (el as HTMLElement).style.textShadow = '0 0 15px rgba(245, 158, 11, 0.5)';
          });

          if (guardian.progress > 1.2) {
            guardian.state = 'patrolling';
            guardian.progress = 0;
          }
        } else if (guardian.state === 'patrolling') {
          // Look around vigilantly in slow motion
          guardian.lookAngle = Math.sin(guardian.progress * 4) * 0.8;
          guardian.flashlightAngle = Math.sin(guardian.progress * 3) * 0.6;

          // Check if UFO is nearby to shoo it away!
          spaceShips.forEach((s) => {
            if (s.type === 'ufo' && Math.hypot(s.x - guardian.x, s.y - guardian.y) < 220) {
              guardian.state = 'shooing';
              s.scared = true;
              s.scareVelocity = s.speed > 0 ? 12 : -12;
            }
          });

          if (guardian.progress > 4.0) {
            guardian.state = 'stealth_exit';
            guardian.progress = 0;
          }
        } else if (guardian.state === 'shooing') {
          // Shoos UFO away with blaster flash
          if (guardian.progress > 1.5) {
            guardian.state = 'stealth_exit';
          }
        } else if (guardian.state === 'stealth_exit') {
          // Sneaks away slowly looking over shoulder
          guardian.x -= 1.8;
          guardian.lookAngle = 0.9; // Looking back
          guardian.wallOpacity = Math.max(0, guardian.wallOpacity - 0.02);

          if (guardian.x < -60) {
            guardian.state = 'peeking_corner';
            guardian.peekTimer = 0;
          }
        } else if (guardian.state === 'peeking_corner') {
          // Peeks curiously from bottom-left corner of the window
          guardian.x = 24;
          guardian.y = height - 24;
          guardian.peekTimer += 0.01;
          if (guardian.peekTimer > 8.0) {
            guardian.active = false;
          }
        }

        // Draw Protective Shield Wall
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

          // Shield Emblem
          ctx.fillStyle = `rgba(255, 255, 255, ${guardian.wallOpacity})`;
          ctx.font = '14px sans-serif';
          ctx.fillText('🛡️', guardian.targetX - 7, guardian.targetY - 20);
          ctx.restore();
        }

        // Draw White Guardian Character
        ctx.save();
        ctx.translate(guardian.x, guardian.y);

        if (guardian.state === 'peeking_corner') {
          // Peeking Head from corner ("Te observo" Look)
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#06B6D4';
          ctx.fill();

          // Suspicious Watchful Eyes
          ctx.beginPath();
          ctx.arc(-4, -2, 2.5, 0, Math.PI * 2);
          ctx.arc(4, -2, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#0F172A';
          ctx.fill();

          // Eyebrow furrow
          ctx.beginPath();
          ctx.moveTo(-7, -7);
          ctx.lineTo(-2, -5);
          ctx.moveTo(7, -7);
          ctx.lineTo(2, -5);
          ctx.strokeStyle = '#0F172A';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else {
          // Running / Patrolling Stickman Body
          // Head
          ctx.beginPath();
          ctx.arc(0, -18, 9, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#FFFFFF';
          ctx.fill();

          // Flashlight scanner beam during patrol
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

          // Torso
          ctx.beginPath();
          ctx.moveTo(0, -9);
          ctx.lineTo(0, 8);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 3;
          ctx.stroke();

          // Running / Stealth Legs
          const leg1 = Math.sin(guardian.legPhase) * 10;
          const leg2 = -leg1;
          ctx.beginPath();
          ctx.moveTo(0, 8);
          ctx.lineTo(leg1, 22);
          ctx.moveTo(0, 8);
          ctx.lineTo(leg2, 22);
          ctx.stroke();

          // Arms (Shooing / Waving)
          ctx.beginPath();
          if (guardian.state === 'shooing') {
            ctx.moveTo(0, -4);
            ctx.lineTo(18, -18);
            // Laser beam to scare UFO
            ctx.moveTo(18, -18);
            ctx.lineTo(120, -90);
            ctx.strokeStyle = '#F43F5E';
            ctx.lineWidth = 2;
          } else {
            ctx.moveTo(0, -4);
            ctx.lineTo(leg2 * 0.8, 4);
            ctx.moveTo(0, -4);
            ctx.lineTo(leg1 * 0.8, 4);
          }
          ctx.stroke();
        }
        ctx.restore();
      }

      // ===========================================================
      // 8. INTERACTIVE CELESTIAL WATCHER (Tickles, Kisses & Warps)
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
