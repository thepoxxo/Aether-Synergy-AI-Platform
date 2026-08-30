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

interface MajesticComet {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  comaRadius: number;
  tailLength: number;
  angle: number;
  nucleusColor: string;
  auraColor: string;
  tailColor: string;
  opacity: number;
  pulsePhase: number;
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

interface ConstellationStar {
  dx: number;
  dy: number;
  name: string;
  size: number;
  color: string;
  hasFlare?: boolean;
}

interface FamousConstellation {
  name: string;
  latinName: string;
  originX: number;
  originY: number;
  scale: number;
  stars: ConstellationStar[];
  lines: [number, number][];
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

type ShipDesign = 'classic_saucer' | 'cyber_cruiser' | 'bio_scout' | 'plasma_orb' | 'golden_mothership';

interface SpaceShip {
  id: string;
  x: number;
  y: number;
  speed: number;
  design: ShipDesign;
  size: number;
  primaryColor: string;
  secondaryColor: string;
  beamActive: boolean;
  lightPhase: number;
  scared: boolean;
  scareVelocity: number;
  stolenDigit: string | null;
  state: 'flying' | 'targeting' | 'hover_sucking' | 'departing';
  hoverTimer: number;
  targetCardX: number;
  targetCardY: number;
  beamParticles: { y: number; xOffset: number; size: number; alpha: number }[];
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
  pomPomWobble: number;
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
  magicSparkles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number; color: string }[];
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

    // USER CLICK INSTANT RECOVERY LISTENER:
    // If the user clicks on any card or element with abducted numbers, restore immediately!
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const abductedEls = document.querySelectorAll('[data-original-val]');
      abductedEls.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const card = htmlEl.closest('[class*="rounded-3xl"], section, div');
        if (htmlEl.contains(target) || (card && card.contains(target))) {
          const orig = htmlEl.getAttribute('data-original-val');
          if (orig && htmlEl.innerHTML.includes('❓')) {
            htmlEl.innerHTML = orig;
            htmlEl.style.opacity = '1';
            htmlEl.style.transform = 'scale(1) translateY(0px)';
            htmlEl.style.textShadow = '0 0 35px #F59E0B, 0 0 50px #FFFFFF';
          }
        }
      });
    };
    window.addEventListener('click', handleDocumentClick);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isLight = theme === 'light';
    const isUltra = qualityTier === 'ultra';

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const scaleFactor = isMobile ? 0.7 : isTablet ? 0.85 : 1.0;

    const darkColors = ['#FFFFFF', '#FDE68A', '#F59E0B', '#38BDF8', '#E0F2FE', '#C084FC', '#F43F5E', '#10B981', '#EC4899'];
    const lightColors = ['#F59E0B', '#0284C7', '#D946EF', '#10B981', '#F43F5E', '#8B5CF6', '#E11D48', '#059669', '#2563EB'];
    const activeColors = isLight ? lightColors : darkColors;

    // 1. FAMOUS BEAUTIFUL REAL CONSTELLATIONS
    const famousConstellations: FamousConstellation[] = [
      {
        name: 'Orión',
        latinName: 'Orion',
        originX: width * 0.18,
        originY: height * 0.22,
        scale: scaleFactor * (isUltra ? 1.0 : 0.75),
        stars: [
          { dx: -45, dy: -55, name: 'Betelgeuse', size: 3.8, color: '#F97316', hasFlare: true },
          { dx: 45, dy: -50, name: 'Bellatrix', size: 2.8, color: '#38BDF8', hasFlare: true },
          { dx: -18, dy: 0, name: 'Alnitak', size: 2.4, color: '#FDE68A' },
          { dx: 0, dy: 2, name: 'Alnilam', size: 2.6, color: '#FDE68A' },
          { dx: 18, dy: 4, name: 'Mintaka', size: 2.4, color: '#FDE68A' },
          { dx: -40, dy: 58, name: 'Saiph', size: 2.6, color: '#FFFFFF' },
          { dx: 42, dy: 52, name: 'Rigel', size: 3.6, color: '#67E8F9', hasFlare: true }
        ],
        lines: [
          [0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [5, 6]
        ]
      },
      {
        name: 'Osa Mayor',
        latinName: 'Ursa Major',
        originX: width * 0.76,
        originY: height * 0.18,
        scale: scaleFactor * (isUltra ? 0.95 : 0.7),
        stars: [
          { dx: -70, dy: -30, name: 'Alkaid', size: 2.8, color: '#38BDF8', hasFlare: true },
          { dx: -45, dy: -22, name: 'Mizar', size: 2.6, color: '#FFFFFF' },
          { dx: -20, dy: -12, name: 'Alioth', size: 2.7, color: '#E0F2FE' },
          { dx: 10, dy: -10, name: 'Megrez', size: 2.2, color: '#FDE68A' },
          { dx: 15, dy: 25, name: 'Phecda', size: 2.5, color: '#FFFFFF' },
          { dx: 55, dy: 28, name: 'Merak', size: 2.8, color: '#67E8F9' },
          { dx: 50, dy: -12, name: 'Dubhe', size: 3.2, color: '#F59E0B', hasFlare: true }
        ],
        lines: [
          [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]
        ]
      },
      {
        name: 'Casiopea',
        latinName: 'Cassiopeia',
        originX: width * 0.84,
        originY: height * 0.68,
        scale: scaleFactor * (isUltra ? 0.9 : 0.65),
        stars: [
          { dx: -55, dy: 15, name: 'Caph', size: 2.8, color: '#E0F2FE', hasFlare: true },
          { dx: -28, dy: -20, name: 'Schedar', size: 3.2, color: '#F59E0B', hasFlare: true },
          { dx: 0, dy: 5, name: 'Gamma Cas', size: 3.0, color: '#38BDF8' },
          { dx: 28, dy: -18, name: 'Ruchbah', size: 2.6, color: '#FFFFFF' },
          { dx: 52, dy: 12, name: 'Segin', size: 2.4, color: '#C084FC' }
        ],
        lines: [
          [0, 1], [1, 2], [2, 3], [3, 4]
        ]
      },
      {
        name: 'Cisne (Cruz del Norte)',
        latinName: 'Cygnus',
        originX: width * 0.12,
        originY: height * 0.72,
        scale: scaleFactor * (isUltra ? 0.9 : 0.65),
        stars: [
          { dx: 0, dy: -45, name: 'Deneb', size: 3.6, color: '#FFFFFF', hasFlare: true },
          { dx: 0, dy: 0, name: 'Sadr', size: 3.0, color: '#FDE68A' },
          { dx: 0, dy: 50, name: 'Albireo', size: 2.8, color: '#38BDF8', hasFlare: true },
          { dx: -45, dy: -5, name: 'Gienah', size: 2.5, color: '#C084FC' },
          { dx: 45, dy: -5, name: 'Delta Cyg', size: 2.5, color: '#67E8F9' }
        ],
        lines: [
          [0, 1], [1, 2], [3, 1], [1, 4]
        ]
      }
    ];

    // 2. DENSE FIELD OF MULTI-SPEED TWINKLE STARS
    const starCount = isMobile ? 65 : isTablet ? 120 : isUltra ? 220 : 110;
    const twinkleStars: TwinkleStar[] = Array.from({ length: starCount }, () => {
      const pRand = Math.random();
      const pulseType = pRand < 0.35 ? 'breathe' : pRand < 0.75 ? 'sparkle' : 'steady';
      const twinkleSpeed =
        pulseType === 'breathe'
          ? Math.random() * 0.005 + 0.002
          : pulseType === 'sparkle'
          ? Math.random() * 0.022 + 0.01
          : Math.random() * 0.01 + 0.004;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: (Math.random() * (isUltra ? 2.4 : 1.7) + 0.5) * scaleFactor,
        color: activeColors[Math.floor(Math.random() * activeColors.length)],
        opacity: Math.random(),
        twinkleSpeed: twinkleSpeed,
        phase: Math.random() * Math.PI * 2,
        hasFlare: Math.random() < (isUltra ? 0.3 : 0.15),
        pulseType: pulseType
      };
    });

    // 3. EXTRA-SLOW MAJESTIC COMETS
    const comets: MajesticComet[] = [
      {
        id: 'comet-halley',
        x: width * 0.05,
        y: height * 0.15,
        vx: 0.14,
        vy: 0.06,
        radius: 4.5 * scaleFactor,
        comaRadius: 28 * scaleFactor,
        tailLength: (isUltra ? 230 : 150) * scaleFactor,
        angle: Math.atan2(0.06, 0.14),
        nucleusColor: '#FFFFFF',
        auraColor: 'rgba(56, 189, 248, 0.65)',
        tailColor: 'rgba(6, 182, 212, 0.75)',
        opacity: 0.9,
        pulsePhase: 0
      },
      {
        id: 'comet-neowise',
        x: width * 0.85,
        y: height * 0.75,
        vx: -0.12,
        vy: -0.05,
        radius: 3.5 * scaleFactor,
        comaRadius: 22 * scaleFactor,
        tailLength: (isUltra ? 190 : 120) * scaleFactor,
        angle: Math.atan2(-0.05, -0.12),
        nucleusColor: '#FDE68A',
        auraColor: 'rgba(245, 158, 11, 0.6)',
        tailColor: 'rgba(234, 88, 12, 0.7)',
        opacity: 0.85,
        pulsePhase: 1.5
      }
    ];

    // 4. Radiant Sun
    const radiantSun: RadiantSun = {
      x: width * 0.88,
      y: height * 0.16,
      radius: (isUltra ? 32 : 22) * scaleFactor,
      pulsePhase: 0,
      flarePhase: 0,
      color1: '#FBBF24',
      color2: '#F59E0B',
      coronaColor: '#EA580C',
      opacity: 0.9
    };

    // 5. White Hole
    const whiteHole: WhiteHole = {
      x: width * 0.85,
      y: height * 0.55,
      radius: (isUltra ? 20 : 14) * scaleFactor,
      pulsePhase: 0,
      opacity: 0.85,
      emissionParticles: Array.from({ length: isMobile ? 20 : 45 }, () => ({
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * 50 + 5,
        speed: Math.random() * 0.5 + 0.2,
        color: activeColors[Math.floor(Math.random() * activeColors.length)],
        size: Math.random() * 2 + 1
      }))
    };

    // 6. GALAXY ENGINE (FASTER SMOOTH ORBITAL MOTION) & 10X SUPERNOVA SHOCKWAVE
    let galaxyState: 'expanding' | 'exploding' | 'reforming' = 'expanding';
    let galaxyScale = 1.0;
    let galaxyRotation = 0;
    let supernovaProgress = 0;
    let shockwaveRadius = 0;
    let shockwaveAlpha = 0;
    let currentExplosionPattern: ExplosionPattern = 'omni_burst';

    const galaxyParticleCount = isMobile ? 110 : isTablet ? 200 : isUltra ? 360 : 170;
    const galaxyParticles: GalaxyParticle[] = Array.from({ length: galaxyParticleCount }, (_, i) => {
      const radius = (Math.random() * (isUltra ? 170 : 110) + 12) * scaleFactor;
      const angle = (i / galaxyParticleCount) * Math.PI * 6 + Math.random() * 0.4;
      return {
        x: 0,
        y: 0,
        baseRadius: radius,
        angle: angle,
        speed: Math.random() * 0.00009 + 0.00004,
        color: activeColors[i % activeColors.length],
        size: (Math.random() * 2.4 + 0.8) * scaleFactor,
        sparklePhase: Math.random() * Math.PI * 2,
        distFromCenter: radius
      };
    });

    // 7. MULTI-LANE ASTEROID BELT
    const asteroidCount = isMobile ? 12 : isTablet ? 20 : isUltra ? 36 : 18;
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
          ? (Math.random() * 0.00015 + 0.00008) * (Math.random() > 0.5 ? 1 : -1)
          : lane === 'mid'
          ? (Math.random() * 0.00008 + 0.00004) * (Math.random() > 0.5 ? 1 : -1)
          : (Math.random() * 0.00004 + 0.00002) * (Math.random() > 0.5 ? 1 : -1);

      const numVerts = Math.floor(Math.random() * 3) + 5;
      const baseR = (Math.random() * 5 + 3) * scaleFactor;
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
        rotSpeed: Math.random() * 0.005 - 0.0025,
        vertices: vertices,
        color: isLight ? '#94A3B8' : '#64748B',
        lane: lane
      };
    });

    // 8. Dwarf Galaxies
    const dwarfGalaxies: DistantDwarfGalaxy[] = [
      { x: width * 0.08, y: height * 0.14, radius: 28 * scaleFactor, rotation: 0, rotSpeed: 0.0001, color: '#06B6D4', opacity: 0.55 },
      { x: width * 0.92, y: height * 0.38, radius: 35 * scaleFactor, rotation: 0, rotSpeed: -0.00012, color: '#EC4899', opacity: 0.5 },
      { x: width * 0.45, y: height * 0.92, radius: 24 * scaleFactor, rotation: 0, rotSpeed: 0.00015, color: '#F59E0B', opacity: 0.45 }
    ];

    // 9. Deep Space Planets
    const planets: ProceduralPlanet[] = [
      {
        id: 'planet-saturn',
        x: width * 0.86,
        y: height * 0.8,
        vx: -0.006,
        vy: 0.002,
        radius: 24 * scaleFactor,
        type: 'gas_giant',
        rotation: 0,
        rotationSpeed: 0.0012,
        lightAngle: 0.8,
        lightPhaseSpeed: 0.0005,
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
        vx: 0.006,
        vy: -0.003,
        radius: 17 * scaleFactor,
        type: 'cyber_neon',
        rotation: 0,
        rotationSpeed: 0.0018,
        lightAngle: -0.6,
        lightPhaseSpeed: 0.0008,
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
        vx: -0.005,
        vy: 0.002,
        radius: 14 * scaleFactor,
        type: 'volcanic',
        rotation: 0,
        rotationSpeed: 0.0025,
        lightAngle: 1.2,
        lightPhaseSpeed: 0.001,
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
        vx: 0.004,
        vy: -0.002,
        radius: 12 * scaleFactor,
        type: 'cryo_moon',
        rotation: 0,
        rotationSpeed: 0.0012,
        lightAngle: -1.0,
        lightPhaseSpeed: 0.0005,
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

    // 10. COMPACT FLEET OF 5 ALIEN SHIPS (REDUCED PROPORTIONS)
    const shipDesigns: ShipDesign[] = ['classic_saucer', 'cyber_cruiser', 'bio_scout', 'plasma_orb', 'golden_mothership'];
    const shipColors = [
      { p: '#06B6D4', s: '#38BDF8' },
      { p: '#8B5CF6', s: '#EC4899' },
      { p: '#10B981', s: '#34D399' },
      { p: '#F59E0B', s: '#FDE68A' },
      { p: '#F43F5E', s: '#FB7185' }
    ];

    let lastAbductionTimestamp = Date.now() + 25000; // Rare occasional event (not constant)
    const ABDUCTION_COOLDOWN_MS = 65000; // 65 seconds minimum cooldown between abductions

    const createShip = (customX?: number, customY?: number, forceDesign?: ShipDesign): SpaceShip => {
      const fromLeft = customX !== undefined ? customX < width / 2 : Math.random() > 0.5;
      const design = forceDesign || shipDesigns[Math.floor(Math.random() * shipDesigns.length)];
      const color = shipColors[Math.floor(Math.random() * shipColors.length)];

      return {
        id: 'ship-' + Math.random(),
        x: customX !== undefined ? customX : fromLeft ? -80 : width + 80,
        y: customY !== undefined ? customY : Math.random() * (height * 0.6) + 50,
        speed: (Math.random() * 1.5 + 1.2) * (fromLeft ? 1 : -1),
        design: design,
        size: (Math.random() * 4 + 14) * scaleFactor,
        primaryColor: color.p,
        secondaryColor: color.s,
        beamActive: true,
        lightPhase: Math.random() * Math.PI * 2,
        scared: false,
        scareVelocity: 0,
        stolenDigit: null,
        state: 'flying',
        hoverTimer: 0,
        targetCardX: 0,
        targetCardY: 0,
        beamParticles: Array.from({ length: 14 }, () => ({
          y: Math.random() * 140,
          xOffset: (Math.random() - 0.5) * 28,
          size: Math.random() * 1.8 + 0.8,
          alpha: Math.random()
        }))
      };
    };

    const spaceShips: SpaceShip[] = [
      createShip(width * 0.25, height * 0.18, 'classic_saucer'),
      createShip(width * 0.7, height * 0.35, 'cyber_cruiser'),
      createShip(width * 0.45, height * 0.6, 'bio_scout')
    ];

    const shootingStars: ShootingStar[] = [];

    // 11. CELESTIAL WATCHER WITH KAWAII HOODIE/BEANIE HAT & EXPRESSIVE FACE
    const watcher: CelestialWatcher = {
      active: true,
      x: 75,
      y: height * 0.48,
      targetX: 75,
      targetY: height * 0.48,
      phase: 'happy',
      progress: 0,
      eyeX: 0,
      eyeY: 0,
      hearts: [],
      jumpOffset: 0,
      spinAngle: 0,
      isTickled: false,
      warpDest: { x: width * 0.5, y: height * 0.45 },
      pomPomWobble: 0
    };

    // 12. WHITE GUARDIAN RUNNER (ACTIVE PATROL & ABDUCTION RESTORATION)
    const guardian: WhiteGuardian = {
      active: true,
      x: width * 0.2,
      y: height * 0.58,
      targetX: width * 0.8,
      targetY: height * 0.58,
      state: 'patrolling',
      progress: 0,
      legPhase: 0,
      spineAngle: 0,
      lookAngle: 0,
      flashlightAngle: 0,
      wallOpacity: 0,
      peekTimer: 0,
      targetElement: null,
      originalHTML: '',
      magicSparkles: []
    };

    const scheduleGuardianPatrol = () => {
      setTimeout(() => {
        if (!guardian.active || guardian.state === 'peeking_corner') {
          guardian.active = true;
          guardian.state = 'sprinting';
          guardian.x = -80;
          guardian.targetX = width + 80;
          guardian.targetY = Math.random() * (height * 0.4) + height * 0.4;
          guardian.progress = 0;
          guardian.legPhase = 0;
        }
        scheduleGuardianPatrol();
      }, Math.random() * 12000 + 14000);
    };
    scheduleGuardianPatrol();

    const scheduleShip = () => {
      setTimeout(() => {
        const maxShips = isMobile ? 2 : 4;
        if (spaceShips.length < maxShips) {
          spaceShips.push(createShip());
        }
        scheduleShip();
      }, Math.random() * 4000 + 3000);
    };
    scheduleShip();

    let lastShootingStarSpawn = Date.now();

    // -------------------------------------------------------------
    // MAIN 60 FPS RENDER LOOP
    // -------------------------------------------------------------
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();

      if (now - lastShootingStarSpawn > (isUltra ? 450 : 800)) {
        const starTypeRand = Math.random();
        const starType: 'bolide' | 'comet' | 'fireball' =
          starTypeRand < 0.4 ? 'bolide' : starTypeRand < 0.75 ? 'comet' : 'fireball';

        const speed =
          starType === 'bolide'
            ? Math.random() * 8 + 12
            : starType === 'comet'
            ? Math.random() * 4 + 6
            : Math.random() * 2 + 2.5;

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
          length: length * scaleFactor,
          speed: speed,
          angle: angle,
          color: color,
          size: (starType === 'bolide' ? 2.5 : starType === 'fireball' ? 3.2 : 1.8) * scaleFactor,
          opacity: 1,
          type: starType,
          tailGlow: starType === 'comet' ? '#38BDF8' : '#F59E0B'
        });
        lastShootingStarSpawn = now;
      }

      galaxyRotation += 0.00008;
      blackHolePulse += 0.008;
      radiantSun.pulsePhase += 0.008;
      radiantSun.flarePhase += 0.012;
      whiteHole.pulsePhase += 0.012;
      watcher.pomPomWobble += 0.04;

      // ===========================================================
      // 1. DRAW FAMOUS REAL CONSTELLATIONS
      // ===========================================================
      famousConstellations.forEach((c) => {
        ctx.save();
        ctx.translate(c.originX, c.originY);

        ctx.beginPath();
        c.lines.forEach(([i, j]) => {
          const s1 = c.stars[i];
          const s2 = c.stars[j];
          ctx.moveTo(s1.dx * c.scale, s1.dy * c.scale);
          ctx.lineTo(s2.dx * c.scale, s2.dy * c.scale);
        });
        ctx.strokeStyle = isLight ? 'rgba(217, 119, 6, 0.28)' : 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1.0;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        c.stars.forEach((star) => {
          const sx = star.dx * c.scale;
          const sy = star.dy * c.scale;

          ctx.beginPath();
          ctx.arc(sx, sy, star.size * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = star.color;
          ctx.fill();

          if (star.hasFlare) {
            const fLen = star.size * scaleFactor * 3.5;
            ctx.beginPath();
            ctx.moveTo(sx - fLen, sy);
            ctx.lineTo(sx + fLen, sy);
            ctx.moveTo(sx, sy - fLen);
            ctx.lineTo(sx, sy + fLen);
            ctx.strokeStyle = star.color;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        });

        if (!isMobile) {
          ctx.fillStyle = isLight ? 'rgba(180, 83, 9, 0.65)' : 'rgba(56, 189, 248, 0.65)';
          ctx.font = 'bold 9px Rajdhani, monospace';
          ctx.fillText(`✨ ${c.name.toUpperCase()}`, -20 * c.scale, (c.stars[0].dy - 12) * c.scale);
        }

        ctx.restore();
      });

      // ===========================================================
      // 2. DRAW EXTRA-SLOW MAJESTIC COMETS
      // ===========================================================
      comets.forEach((cmt) => {
        cmt.x += cmt.vx;
        cmt.y += cmt.vy;
        cmt.pulsePhase += 0.015;

        if (cmt.x > width + 220) cmt.x = -220;
        if (cmt.x < -220) cmt.x = width + 220;
        if (cmt.y > height + 220) cmt.y = -220;
        if (cmt.y < -220) cmt.y = height + 220;

        ctx.save();
        ctx.translate(cmt.x, cmt.y);

        const tailAngle = Math.atan2(cmt.vy, cmt.vx) + Math.PI;
        const tailX = Math.cos(tailAngle) * cmt.tailLength;
        const tailY = Math.sin(tailAngle) * cmt.tailLength;

        const tailGrad = ctx.createLinearGradient(0, 0, tailX, tailY);
        tailGrad.addColorStop(0, cmt.auraColor);
        tailGrad.addColorStop(0.4, cmt.tailColor);
        tailGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(Math.cos(tailAngle + Math.PI / 2) * cmt.radius * 2, Math.sin(tailAngle + Math.PI / 2) * cmt.radius * 2);
        ctx.lineTo(tailX, tailY);
        ctx.lineTo(Math.cos(tailAngle - Math.PI / 2) * cmt.radius * 2, Math.sin(tailAngle - Math.PI / 2) * cmt.radius * 2);
        ctx.closePath();
        ctx.fillStyle = tailGrad;
        ctx.globalAlpha = cmt.opacity * (isLight ? 0.75 : 0.9);
        ctx.fill();

        const comaGrad = ctx.createRadialGradient(0, 0, cmt.radius * 0.5, 0, 0, cmt.comaRadius);
        comaGrad.addColorStop(0, cmt.nucleusColor);
        comaGrad.addColorStop(0.35, cmt.auraColor);
        comaGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(0, 0, cmt.comaRadius, 0, Math.PI * 2);
        ctx.fillStyle = comaGrad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, cmt.radius + Math.sin(cmt.pulsePhase) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = cmt.nucleusColor;
        ctx.shadowBlur = 16;
        ctx.shadowColor = cmt.nucleusColor;
        ctx.fill();

        ctx.restore();
      });

      // ===========================================================
      // 3. DRAW RADIANT SUN
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

      for (let f = 0; f < (isMobile ? 3 : 6); f++) {
        const fAngle = (f * Math.PI) / 3 + radiantSun.flarePhase * 0.2;
        const fx = Math.cos(fAngle) * (sunPulse * 1.5);
        const fy = Math.sin(fAngle) * (sunPulse * 1.5);
        ctx.beginPath();
        ctx.arc(fx, fy, (Math.random() * 3 + 2) * scaleFactor, 0, Math.PI * 2);
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
      // 4. DRAW WHITE HOLE
      // ===========================================================
      ctx.save();
      ctx.translate(whiteHole.x, whiteHole.y);

      whiteHole.emissionParticles.forEach((ep) => {
        ep.dist += ep.speed;
        if (ep.dist > (isUltra ? 90 : 55) * scaleFactor) {
          ep.dist = 4;
          ep.angle = Math.random() * Math.PI * 2;
        }

        const px = Math.cos(ep.angle) * ep.dist;
        const py = Math.sin(ep.angle) * ep.dist;
        ctx.beginPath();
        ctx.arc(px, py, ep.size * scaleFactor, 0, Math.PI * 2);
        ctx.fillStyle = ep.color;
        ctx.globalAlpha = Math.max(0, 1 - ep.dist / (85 * scaleFactor));
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
      // 5. DRAW DISTANT DWARF GALAXIES
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
      // 6. DRAW MULTI-LANE ASTEROID BELTS
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
      // 7. GALAXY SMOOTH ROTATION & 10X PANORAMIC SUPERNOVA WAVE
      // ===========================================================
      const centerX = width * 0.5;
      const centerY = height * 0.45;

      if (galaxyState === 'expanding') {
        galaxyScale += 0.00006;
        if (galaxyScale > 4.5) {
          galaxyState = 'exploding';
          supernovaProgress = 0;
          shockwaveRadius = 30;
          shockwaveAlpha = 1.0;
          const patterns: ExplosionPattern[] = ['omni_burst', 'polar_jets', 'pinwheel_spiral', 'quad_cross'];
          currentExplosionPattern = patterns[Math.floor(Math.random() * patterns.length)];
        }
      } else if (galaxyState === 'exploding') {
        supernovaProgress += 0.008;
        shockwaveRadius += 32;
        shockwaveAlpha = Math.max(0, 1.0 - supernovaProgress * 0.25);

        if (supernovaProgress > 3.8) {
          galaxyState = 'reforming';
        }
      } else if (galaxyState === 'reforming') {
        galaxyScale -= 0.006;
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

      // 10X Massive Panoramic Concentric Shockwave Fronts
      if (galaxyState === 'exploding' && shockwaveAlpha > 0.01) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, shockwaveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 158, 11, ${shockwaveAlpha})`;
        ctx.lineWidth = 14 * scaleFactor;
        ctx.shadowBlur = 60;
        ctx.shadowColor = '#F59E0B';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, shockwaveRadius * 0.85, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${shockwaveAlpha * 0.9})`;
        ctx.lineWidth = 8 * scaleFactor;
        ctx.shadowBlur = 35;
        ctx.shadowColor = '#38BDF8';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, shockwaveRadius * 1.15, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(217, 70, 239, ${shockwaveAlpha * 0.75})`;
        ctx.lineWidth = 5 * scaleFactor;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#D946EF';
        ctx.stroke();
        ctx.restore();
      }

      const centerFog = ctx.createRadialGradient(0, 0, 10, 0, 0, (isUltra ? 260 : 160) * scaleFactor * galaxyScale);
      centerFog.addColorStop(0, isLight ? 'rgba(217, 119, 6, 0.35)' : 'rgba(245, 158, 11, 0.45)');
      centerFog.addColorStop(0.35, isLight ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.28)');
      centerFog.addColorStop(0.7, isLight ? 'rgba(6, 182, 212, 0.12)' : 'rgba(6, 182, 212, 0.2)');
      centerFog.addColorStop(1, 'transparent');

      ctx.fillStyle = centerFog;
      ctx.beginPath();
      ctx.arc(0, 0, (isUltra ? 260 : 160) * scaleFactor * galaxyScale, 0, Math.PI * 2);
      ctx.fill();

      galaxyParticles.forEach((p, idx) => {
        p.angle += p.speed;
        p.sparklePhase += 0.015;

        let px = 0;
        let py = 0;

        if (galaxyState === 'exploding') {
          p.distFromCenter += 4.2;

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
          const theta = p.angle + (currentR / (36 * scaleFactor));
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

      const singularityGlow = galaxyScale > 3.0 ? (galaxyScale - 3.0) * 45 * scaleFactor : 12 * scaleFactor;
      ctx.beginPath();
      ctx.arc(0, 0, singularityGlow, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowBlur = singularityGlow * 2.2;
      ctx.shadowColor = '#F59E0B';
      ctx.fill();
      ctx.restore();

      // ===========================================================
      // 8. DRAW RELATIVISTIC BLACK HOLE
      // ===========================================================
      ctx.save();
      ctx.translate(blackHoleX, blackHoleY);
      const holeRadius = (isUltra ? 26 : 18) * scaleFactor;
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
      // 9. DRAW DIVERSE PROCEDURAL PLANETS WITH WOBBLING 3D RINGS
      // ===========================================================
      planets.forEach((p) => {
        p.rotation += p.rotationSpeed;
        p.lightAngle += p.lightPhaseSpeed;
        p.ringWobble += 0.008;
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
          ctx.lineWidth = 3 * scaleFactor;
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.45, p.radius * 0.65, dynamicAngle, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
          ctx.lineWidth = 1.5 * scaleFactor;
          ctx.stroke();
        }
        ctx.restore();
      });

      // ===========================================================
      // 10. DRAW TWINKLE STARS & GRAVITATIONAL MOUSE RESONANCE
      // ===========================================================
      twinkleStars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const currentOpacity =
          star.pulseType === 'breathe'
            ? (Math.sin(star.phase) + 1) / 2 * (isLight ? 0.75 : 0.95) + 0.1
            : (Math.sin(star.phase * 2) + 1) / 2 * (isLight ? 0.65 : 0.9) + 0.15;

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
      // 11. DRAW MULTI-SPEED SHOOTING STARS
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
      // 12. DRAW 5 SLEEK ALIEN CRAFTS (ETHEREAL LIGHT & RARE ABDUCTION)
      // ===========================================================
      const numberElements = Array.from(
        document.querySelectorAll('[class*="text-5xl"], [class*="text-6xl"], [class*="font-mono"]')
      ).filter((el) => {
        const text = el.textContent || '';
        const rect = el.getBoundingClientRect();
        return (
          (/[0-9]/.test(text) || text.includes('❓')) &&
          rect.width > 0 &&
          rect.height > 0 &&
          rect.top >= -50 &&
          rect.bottom <= window.innerHeight + 100
        );
      });

      for (let i = spaceShips.length - 1; i >= 0; i--) {
        const ship = spaceShips[i];

        if (ship.scared) {
          ship.x += ship.scareVelocity;
          ship.y -= 5.0;
        } else if (ship.state === 'targeting') {
          const dx = ship.targetCardX - ship.x;
          const dy = (ship.targetCardY - 130) - ship.y;
          ship.x += dx * 0.08;
          ship.y += dy * 0.08;

          if (Math.hypot(dx, dy) < 18) {
            ship.state = 'hover_sucking';
            ship.hoverTimer = 0;
          }
        } else if (ship.state === 'hover_sucking') {
          ship.hoverTimer += 0.025;
          ship.y = ship.targetCardY - 130 + Math.sin(ship.hoverTimer * 4) * 3;

          if (ship.hoverTimer > 3.2) {
            ship.state = 'departing';
          }
        } else if (ship.state === 'departing') {
          ship.x += ship.speed * 2.2;
          ship.y -= 2.0;
        } else {
          ship.x += ship.speed;
          ship.y += Math.sin(ship.x * 0.015) * 0.8;

          // RARE OCCASIONAL ABDUCTION CHECK (Cooldown of 65 seconds)
          if (
            numberElements.length > 0 &&
            !ship.stolenDigit &&
            now - lastAbductionTimestamp > ABDUCTION_COOLDOWN_MS &&
            !spaceShips.some(s => s.state === 'targeting' || s.state === 'hover_sucking') &&
            Math.random() < 0.005
          ) {
            lastAbductionTimestamp = now;
            const targetEl = numberElements[Math.floor(Math.random() * numberElements.length)] as HTMLElement;
            const rect = targetEl.getBoundingClientRect();
            ship.state = 'targeting';
            ship.targetCardX = rect.left + rect.width / 2;
            ship.targetCardY = rect.top;
          }
        }

        ship.lightPhase += 0.08;

        if (ship.x > width + 200 || ship.x < -200 || ship.y < -200) {
          spaceShips.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(ship.x, ship.y);

        // -------------------------------------------------------------
        // SOFT, ETHEREAL, DEEP-SPACE BLENDED LIGHT CONE
        // -------------------------------------------------------------
        const isHoverSucking = ship.state === 'hover_sucking';
        const beamLen = isHoverSucking ? 170 * scaleFactor : 85 * scaleFactor;
        const beamSpread = isHoverSucking ? ship.size * 2.2 : ship.size * 1.2;
        const beamOpacity = isHoverSucking ? 0.28 : 0.09;

        ctx.save();
        const beamGrad = ctx.createLinearGradient(0, 0, 0, beamLen);
        beamGrad.addColorStop(0, ship.primaryColor);
        beamGrad.addColorStop(0.3, ship.secondaryColor);
        beamGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.12)');
        beamGrad.addColorStop(1, 'transparent');

        // Smooth parabolic/curved soft cone that merges naturally into the background
        ctx.beginPath();
        ctx.moveTo(-ship.size * 0.35, 2);
        ctx.quadraticCurveTo(-beamSpread * 0.55, beamLen * 0.5, -beamSpread, beamLen);
        ctx.quadraticCurveTo(0, beamLen * 1.06, beamSpread, beamLen);
        ctx.quadraticCurveTo(beamSpread * 0.55, beamLen * 0.5, ship.size * 0.35, 2);
        ctx.closePath();

        ctx.fillStyle = beamGrad;
        ctx.globalAlpha = beamOpacity;
        ctx.fill();

        // Subtle scanning ring wave only during active abduction
        if (isHoverSucking) {
          const scanRingY = (now * 0.04) % beamLen;
          const scanWidth = (scanRingY / beamLen) * beamSpread;
          ctx.beginPath();
          ctx.ellipse(0, scanRingY, scanWidth, 3 * scaleFactor, 0, 0, Math.PI * 2);
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 1.2 * scaleFactor;
          ctx.globalAlpha = 0.4 * (1 - scanRingY / beamLen);
          ctx.stroke();
        }

        // Soft stardust particle shimmer
        ship.beamParticles.forEach((bp) => {
          bp.y -= isHoverSucking ? 2.0 : 0.7;
          if (bp.y < 4) bp.y = beamLen;
          const bWidth = (bp.y / beamLen) * beamSpread;
          ctx.beginPath();
          ctx.arc((bp.xOffset / 28) * bWidth, bp.y, bp.size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = isHoverSucking ? '#F59E0B' : '#E0F2FE';
          ctx.globalAlpha = bp.alpha * (1 - bp.y / beamLen) * (isHoverSucking ? 0.45 : 0.18);
          ctx.fill();
        });
        ctx.restore();

        // -------------------------------------------------------------
        // RENDER 5 SLEEK COMPACT SPACESHIP DESIGNS
        // -------------------------------------------------------------
        if (ship.design === 'classic_saucer') {
          ctx.beginPath();
          ctx.arc(0, -5, ship.size * 0.48, Math.PI, 0);
          ctx.fillStyle = ship.secondaryColor;
          ctx.shadowBlur = 14;
          ctx.shadowColor = ship.primaryColor;
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(0, 0, ship.size, ship.size * 0.38, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#0F172A';
          ctx.strokeStyle = ship.primaryColor;
          ctx.lineWidth = 2.0;
          ctx.fill();
          ctx.stroke();

          for (let l = 0; l < 6; l++) {
            const lX = ((l - 2.5) / 2.8) * (ship.size * 0.75);
            const lPhase = (Math.sin(ship.lightPhase + l) + 1) / 2;
            ctx.beginPath();
            ctx.arc(lX, 2, 2, 0, Math.PI * 2);
            ctx.fillStyle = lPhase > 0.5 ? ship.primaryColor : '#FFFFFF';
            ctx.fill();
          }
        } else if (ship.design === 'cyber_cruiser') {
          ctx.beginPath();
          ctx.moveTo(ship.size * 1.3, 0);
          ctx.lineTo(-ship.size * 0.9, -ship.size * 0.65);
          ctx.lineTo(-ship.size * 0.5, 0);
          ctx.lineTo(-ship.size * 0.9, ship.size * 0.65);
          ctx.closePath();
          ctx.fillStyle = '#1E293B';
          ctx.strokeStyle = ship.primaryColor;
          ctx.lineWidth = 2.2;
          ctx.shadowBlur = 12;
          ctx.shadowColor = ship.primaryColor;
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(-ship.size * 0.8, -ship.size * 0.35, 3, 0, Math.PI * 2);
          ctx.arc(-ship.size * 0.8, ship.size * 0.35, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#38BDF8';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#38BDF8';
          ctx.fill();
        } else if (ship.design === 'bio_scout') {
          ctx.beginPath();
          ctx.moveTo(0, -ship.size * 0.65);
          ctx.quadraticCurveTo(ship.size * 1.25, 0, 0, ship.size * 0.65);
          ctx.quadraticCurveTo(-ship.size * 1.25, 0, 0, -ship.size * 0.65);
          ctx.fillStyle = '#4A044E';
          ctx.strokeStyle = '#D946EF';
          ctx.lineWidth = 2.0;
          ctx.shadowBlur = 14;
          ctx.shadowColor = '#D946EF';
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, ship.size * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = '#F43F5E';
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#F43F5E';
          ctx.fill();
        } else if (ship.design === 'plasma_orb') {
          ctx.beginPath();
          ctx.arc(0, 0, ship.size * 0.55, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 20;
          ctx.shadowColor = ship.primaryColor;
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(0, 0, ship.size * 1.1, ship.size * 0.38, ship.lightPhase, 0, Math.PI * 2);
          ctx.strokeStyle = ship.primaryColor;
          ctx.lineWidth = 2.0;
          ctx.stroke();
        } else {
          ctx.beginPath();
          for (let h = 0; h < 6; h++) {
            const hAngle = (h * Math.PI) / 3;
            const hx = Math.cos(hAngle) * ship.size * 0.9;
            const hy = Math.sin(hAngle) * ship.size * 0.55;
            if (h === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.fillStyle = '#78350F';
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 2.2;
          ctx.shadowBlur = 16;
          ctx.shadowColor = '#F59E0B';
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, ship.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = '#FBBF24';
          ctx.fill();
        }

        if (ship.stolenDigit) {
          ctx.fillStyle = '#F59E0B';
          ctx.font = 'bold 11px monospace';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#F59E0B';
          ctx.fillText(ship.stolenDigit, -10, 2);
        }

        // PHYSICAL ABDUCTION
        if (ship.state === 'hover_sucking') {
          numberElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const rect = htmlEl.getBoundingClientRect();
            const elCenterX = rect.left + rect.width / 2;

            if (Math.abs(ship.x - elCenterX) < 70 && Math.abs(ship.y - (rect.top - 130)) < 55) {
              const currentContent = htmlEl.textContent || '';
              if (!currentContent.includes('❓')) {
                const rawText = htmlEl.getAttribute('data-original-val') || currentContent || '$49';
                if (!htmlEl.getAttribute('data-original-val')) {
                  htmlEl.setAttribute('data-original-val', rawText);
                }

                ship.stolenDigit = rawText.substring(0, 4);

                htmlEl.style.opacity = '1';
                htmlEl.style.transform = 'scale(1)';
                htmlEl.innerHTML = `<span class="inline-flex items-center gap-1 text-amber-400 font-mono text-3xl sm:text-4xl animate-bounce drop-shadow-[0_0_15px_rgba(245,158,11,0.9)] cursor-pointer select-none" title="¡Número abducido! Haz clic para restaurarlo o espera al guardián...">❓❓</span>`;

                if (!guardian.active || guardian.state === 'peeking_corner') {
                  guardian.active = true;
                  guardian.state = 'sprinting';
                  guardian.x = ship.x > width / 2 ? -70 : width + 70;
                  guardian.y = rect.top + 20;
                  guardian.targetX = elCenterX;
                  guardian.targetY = rect.top + 20;
                  guardian.progress = 0;
                  guardian.legPhase = 0;
                  guardian.targetElement = htmlEl;
                  guardian.originalHTML = rawText;
                  guardian.magicSparkles = [];
                }
              }
            }
          });
        }
        ctx.restore();
      }

      // ===========================================================
      // 13. RELIABLE FLUID HUMANOID WHITE GUARDIAN
      // ===========================================================
      if (guardian.active) {
        guardian.progress += 0.02;
        guardian.legPhase += 0.28;

        if (guardian.state === 'sprinting') {
          const gDistX = guardian.targetX - guardian.x;
          guardian.x += gDistX * 0.16;
          guardian.spineAngle = gDistX > 0 ? 0.25 : -0.25;

          if (Math.abs(gDistX) < 25) {
            if (guardian.targetElement) {
              guardian.state = 'restoring_numbers';
            } else {
              guardian.state = 'patrolling';
            }
            guardian.progress = 0;
          }
        } else if (guardian.state === 'restoring_numbers') {
          guardian.spineAngle = -0.1;

          if (guardian.targetElement && guardian.originalHTML) {
            guardian.targetElement.style.opacity = '1';
            guardian.targetElement.style.transform = 'scale(1) translateY(0px)';
            guardian.targetElement.style.textShadow = '0 0 30px #F59E0B, 0 0 50px #FFFFFF';
            guardian.targetElement.innerHTML = guardian.originalHTML;
          }

          if (guardian.magicSparkles.length < 24) {
            guardian.magicSparkles.push({
              x: guardian.x + 18 * scaleFactor,
              y: guardian.y - 15 * scaleFactor,
              vx: (Math.random() - 0.5) * 4,
              vy: -Math.random() * 3 - 1,
              alpha: 1.0,
              size: (Math.random() * 3 + 2) * scaleFactor,
              color: '#F59E0B'
            });
          }

          if (guardian.progress > 0.8) {
            guardian.state = 'placing_wall';
            guardian.progress = 0;
          }
        } else if (guardian.state === 'placing_wall') {
          guardian.wallOpacity = Math.min(1, guardian.progress * 2.5);

          if (guardian.progress > 1.0) {
            guardian.state = 'patrolling';
            guardian.progress = 0;
          }
        } else if (guardian.state === 'patrolling') {
          guardian.x += 1.2;
          guardian.spineAngle = 0.05;
          guardian.lookAngle = Math.sin(guardian.progress * 4) * 0.8;
          guardian.flashlightAngle = Math.sin(guardian.progress * 3) * 0.6;

          spaceShips.forEach((s) => {
            if (Math.hypot(s.x - guardian.x, s.y - guardian.y) < 280) {
              guardian.state = 'shooing';
              s.scared = true;
              s.scareVelocity = s.x > guardian.x ? 18 : -18;
            }
          });

          if (guardian.progress > 4.0 || guardian.x > width + 50) {
            guardian.state = 'stealth_exit';
            guardian.progress = 0;
          }
        } else if (guardian.state === 'shooing') {
          if (guardian.progress > 1.2) {
            guardian.state = 'stealth_exit';
          }
        } else if (guardian.state === 'stealth_exit') {
          guardian.x -= 2.5;
          guardian.lookAngle = 0.9;
          guardian.wallOpacity = Math.max(0, guardian.wallOpacity - 0.03);

          if (guardian.x < -70) {
            guardian.state = 'peeking_corner';
            guardian.peekTimer = 0;
          }
        } else if (guardian.state === 'peeking_corner') {
          guardian.x = 28;
          guardian.y = height - 28;
          guardian.peekTimer += 0.01;
          if (guardian.peekTimer > 8.0) {
            guardian.active = false;
          }
        }

        guardian.magicSparkles.forEach((ms, msIdx) => {
          ms.x += ms.vx;
          ms.y += ms.vy;
          ms.alpha -= 0.03;
          if (ms.alpha > 0) {
            ctx.beginPath();
            ctx.arc(ms.x, ms.y, ms.size, 0, Math.PI * 2);
            ctx.fillStyle = ms.color;
            ctx.globalAlpha = ms.alpha;
            ctx.shadowBlur = 10;
            ctx.shadowColor = ms.color;
            ctx.fill();
          } else {
            guardian.magicSparkles.splice(msIdx, 1);
          }
        });
        ctx.globalAlpha = 1.0;

        if (guardian.wallOpacity > 0.01) {
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(guardian.targetX - 75 * scaleFactor, guardian.targetY - 55 * scaleFactor, 150 * scaleFactor, 75 * scaleFactor, 18);
          ctx.strokeStyle = `rgba(6, 182, 212, ${guardian.wallOpacity})`;
          ctx.lineWidth = 3.0 * scaleFactor;
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#06B6D4';
          ctx.fillStyle = `rgba(6, 182, 212, ${guardian.wallOpacity * 0.18})`;
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = `rgba(255, 255, 255, ${guardian.wallOpacity})`;
          ctx.font = `${16 * scaleFactor}px sans-serif`;
          ctx.fillText('🛡️', guardian.targetX - 8 * scaleFactor, guardian.targetY - 24 * scaleFactor);
          ctx.restore();
        }

        ctx.save();
        ctx.translate(guardian.x, guardian.y);
        ctx.rotate(guardian.spineAngle);

        if (guardian.state === 'peeking_corner') {
          ctx.beginPath();
          ctx.arc(0, 0, 16 * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 14;
          ctx.shadowColor = '#06B6D4';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(-4 * scaleFactor, -2 * scaleFactor, 2.5 * scaleFactor, 0, Math.PI * 2);
          ctx.arc(4 * scaleFactor, -2 * scaleFactor, 2.5 * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = '#0F172A';
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, -22 * scaleFactor, 11 * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 14;
          ctx.shadowColor = '#FFFFFF';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(3 * scaleFactor, -22 * scaleFactor, 5 * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = '#06B6D4';
          ctx.fill();

          if (guardian.state === 'patrolling') {
            ctx.save();
            ctx.rotate(guardian.flashlightAngle);
            const flashGrad = ctx.createRadialGradient(10 * scaleFactor, 0, 2, 90 * scaleFactor, 0, 80 * scaleFactor);
            flashGrad.addColorStop(0, 'rgba(245, 158, 11, 0.75)');
            flashGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = flashGrad;
            ctx.beginPath();
            ctx.moveTo(10 * scaleFactor, -5 * scaleFactor);
            ctx.lineTo(110 * scaleFactor, -45 * scaleFactor);
            ctx.lineTo(110 * scaleFactor, 45 * scaleFactor);
            ctx.lineTo(10 * scaleFactor, 5 * scaleFactor);
            ctx.fill();
            ctx.restore();
          }

          ctx.beginPath();
          ctx.moveTo(0, -11 * scaleFactor);
          ctx.quadraticCurveTo(2 * scaleFactor, 0, 0, 11 * scaleFactor);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 4.5 * scaleFactor;
          ctx.lineCap = 'round';
          ctx.stroke();

          const leg1Hip = Math.sin(guardian.legPhase) * 13 * scaleFactor;
          const leg1Knee = Math.max(0, Math.sin(guardian.legPhase + 0.5) * 10 * scaleFactor);
          const leg2Hip = -leg1Hip;
          const leg2Knee = Math.max(0, Math.sin(guardian.legPhase + Math.PI + 0.5) * 10 * scaleFactor);

          ctx.beginPath();
          ctx.moveTo(0, 11 * scaleFactor);
          ctx.lineTo(leg1Hip * 0.6, 18 * scaleFactor + leg1Knee * 0.3);
          ctx.lineTo(leg1Hip, 28 * scaleFactor);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 3.5 * scaleFactor;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, 11 * scaleFactor);
          ctx.lineTo(leg2Hip * 0.6, 18 * scaleFactor + leg2Knee * 0.3);
          ctx.lineTo(leg2Hip, 28 * scaleFactor);
          ctx.stroke();

          ctx.beginPath();
          if (guardian.state === 'restoring_numbers') {
            ctx.moveTo(0, -5 * scaleFactor);
            ctx.quadraticCurveTo(12 * scaleFactor, -12 * scaleFactor, 24 * scaleFactor, -18 * scaleFactor);
            ctx.strokeStyle = '#F59E0B';
            ctx.lineWidth = 3.8 * scaleFactor;
            ctx.stroke();

            ctx.fillStyle = '#FFFFFF';
            ctx.font = `${13 * scaleFactor}px sans-serif`;
            ctx.fillText('✨', 24 * scaleFactor, -22 * scaleFactor);
          } else if (guardian.state === 'shooing') {
            ctx.moveTo(0, -5 * scaleFactor);
            ctx.lineTo(22 * scaleFactor, -22 * scaleFactor);
            ctx.moveTo(22 * scaleFactor, -22 * scaleFactor);
            ctx.lineTo(150 * scaleFactor, -110 * scaleFactor);
            ctx.strokeStyle = '#F43F5E';
            ctx.lineWidth = 3.5 * scaleFactor;
            ctx.stroke();
          } else {
            ctx.moveTo(0, -5 * scaleFactor);
            ctx.quadraticCurveTo(leg2Hip * 0.4, 0, leg2Hip * 0.8, 9 * scaleFactor);
            ctx.moveTo(0, -5 * scaleFactor);
            ctx.quadraticCurveTo(leg1Hip * 0.4, 0, leg1Hip * 0.8, 9 * scaleFactor);
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 3.0 * scaleFactor;
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // ===========================================================
      // 14. CELESTIAL WATCHER: KAWAII HOODIE/BEANIE + ULTRA-EXPRESSIVE FACE
      // ===========================================================
      if (watcher.active) {
        watcher.progress += 0.012;

        const dMouseX = mouseX - watcher.x;
        const dMouseY = mouseY - watcher.y;
        const distToMouse = Math.hypot(dMouseX, dMouseY);

        const eyeAngle = Math.atan2(dMouseY, dMouseX);
        watcher.eyeX = Math.cos(eyeAngle) * 2.5;
        watcher.eyeY = Math.sin(eyeAngle) * 2.5;

        if (distToMouse < 80 && watcher.phase !== 'warping') {
          watcher.phase = 'giggling';
          watcher.isTickled = true;
          watcher.jumpOffset = Math.sin(now * 0.03) * 7;
          watcher.spinAngle = Math.sin(now * 0.02) * 0.15;
        }

        if (watcher.phase === 'peeking') {
          watcher.x += (watcher.targetX - watcher.x) * 0.06;
          if (Math.abs(watcher.x - watcher.targetX) < 4) {
            watcher.phase = 'happy';
            watcher.progress = 0;
          }
        } else if (watcher.phase === 'happy') {
          watcher.jumpOffset = Math.sin(watcher.progress * 5) * 5;
          if (watcher.progress > 3.0) {
            watcher.phase = 'kissing';
            watcher.progress = 0;
            watcher.hearts = [
              { x: 0, y: 0, vx: (Math.random() - 0.5) * 1.5, vy: -1.6, size: 12 * scaleFactor, opacity: 1 },
              { x: 0, y: 0, vx: (Math.random() - 0.5) * 1.5, vy: -2.2, size: 14 * scaleFactor, opacity: 1 },
              { x: 0, y: 0, vx: (Math.random() - 0.5) * 1.5, vy: -1.4, size: 10 * scaleFactor, opacity: 1 }
            ];
          }
        } else if (watcher.phase === 'kissing') {
          if (watcher.progress > 3.2) {
            watcher.phase = 'warping';
          }
        } else if (watcher.phase === 'giggling') {
          if (distToMouse >= 90) {
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
            setTimeout(() => {
              watcher.active = true;
              watcher.phase = 'peeking';
              watcher.progress = 0;
              watcher.x = Math.random() > 0.5 ? -45 : width + 45;
              watcher.targetX = watcher.x < 0 ? 75 : width - 75;
              watcher.y = Math.random() * (height * 0.5) + height * 0.2;
              watcher.targetY = watcher.y;
            }, 10000);
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

        const aura = ctx.createRadialGradient(0, 0, 5, 0, 0, 42 * scaleFactor);
        aura.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
        aura.addColorStop(0.7, 'rgba(56, 189, 248, 0.25)');
        aura.addColorStop(1, 'transparent');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(0, 0, 42 * scaleFactor, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 2 * scaleFactor, 22 * scaleFactor, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#F59E0B';
        ctx.fill();

        // -------------------------------------------------------------
        // CUTE ASTRONAUT / BEANIE HOODIE CAP (GORRITO TIERNO)
        // -------------------------------------------------------------
        const pomPomX = Math.sin(watcher.pomPomWobble) * 4 * scaleFactor;
        const pomPomY = -34 * scaleFactor + Math.cos(watcher.pomPomWobble) * 2 * scaleFactor;

        ctx.beginPath();
        ctx.arc(0, -6 * scaleFactor, 22 * scaleFactor, Math.PI * 0.9, Math.PI * 2.1);
        ctx.fillStyle = '#F59E0B';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#F59E0B';
        ctx.fill();

        ctx.beginPath();
        ctx.roundRect(-20 * scaleFactor, -10 * scaleFactor, 40 * scaleFactor, 8 * scaleFactor, 4 * scaleFactor);
        ctx.fillStyle = '#FDE68A';
        ctx.fill();

        for (let b = -12; b <= 12; b += 6) {
          ctx.beginPath();
          ctx.moveTo(b * scaleFactor, -10 * scaleFactor);
          ctx.lineTo(b * scaleFactor, -2 * scaleFactor);
          ctx.strokeStyle = '#D97706';
          ctx.lineWidth = 1.2 * scaleFactor;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(pomPomX, pomPomY, 7 * scaleFactor, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FDE68A';
        ctx.fill();

        // -------------------------------------------------------------
        // ULTRA-EXPRESSIVE KAWAII FACE & ROSY BLUSH CHEEKS
        // -------------------------------------------------------------
        ctx.beginPath();
        ctx.ellipse(-12 * scaleFactor, 6 * scaleFactor, 4.5 * scaleFactor, 2.8 * scaleFactor, 0, 0, Math.PI * 2);
        ctx.ellipse(12 * scaleFactor, 6 * scaleFactor, 4.5 * scaleFactor, 2.8 * scaleFactor, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(244, 63, 94, 0.5)';
        ctx.fill();

        const eyeColor = isLight ? '#F59E0B' : '#0F172A';

        if (watcher.phase === 'giggling') {
          ctx.beginPath();
          ctx.arc(-7 * scaleFactor, 1 * scaleFactor, 4 * scaleFactor, Math.PI * 0.2, Math.PI * 0.8, true);
          ctx.arc(7 * scaleFactor, 1 * scaleFactor, 4 * scaleFactor, Math.PI * 0.2, Math.PI * 0.8, true);
          ctx.strokeStyle = eyeColor;
          ctx.lineWidth = 2.5 * scaleFactor;
          ctx.lineCap = 'round';
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 7 * scaleFactor, 6 * scaleFactor, 0, Math.PI);
          ctx.fillStyle = '#F43F5E';
          ctx.fill();
        } else if (watcher.phase === 'kissing') {
          ctx.beginPath();
          ctx.moveTo(-11 * scaleFactor, -1 * scaleFactor);
          ctx.lineTo(-7 * scaleFactor, 2 * scaleFactor);
          ctx.lineTo(-11 * scaleFactor, 5 * scaleFactor);
          ctx.strokeStyle = eyeColor;
          ctx.lineWidth = 2.2 * scaleFactor;
          ctx.lineCap = 'round';
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(7 * scaleFactor + watcher.eyeX, 2 * scaleFactor + watcher.eyeY, 3.8 * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = eyeColor;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(6 * scaleFactor + watcher.eyeX, 0.5 * scaleFactor + watcher.eyeY, 1.5 * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(0, 8 * scaleFactor, 2.5 * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = '#F43F5E';
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(-7 * scaleFactor + watcher.eyeX, 1 * scaleFactor + watcher.eyeY, 4 * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = eyeColor;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(-8.5 * scaleFactor + watcher.eyeX, -0.5 * scaleFactor + watcher.eyeY, 1.6 * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
          ctx.beginPath();
          ctx.arc(-5.8 * scaleFactor + watcher.eyeX, 2.2 * scaleFactor + watcher.eyeY, 0.9 * scaleFactor, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(7 * scaleFactor + watcher.eyeX, 1 * scaleFactor + watcher.eyeY, 4 * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = eyeColor;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(5.5 * scaleFactor + watcher.eyeX, -0.5 * scaleFactor + watcher.eyeY, 1.6 * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
          ctx.beginPath();
          ctx.arc(8.2 * scaleFactor + watcher.eyeX, 2.2 * scaleFactor + watcher.eyeY, 0.9 * scaleFactor, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(0, 6 * scaleFactor, 5 * scaleFactor, 0.1, Math.PI - 0.1);
          ctx.strokeStyle = eyeColor;
          ctx.lineWidth = 2.2 * scaleFactor;
          ctx.lineCap = 'round';
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 8.5 * scaleFactor, 2.5 * scaleFactor, 0, Math.PI);
          ctx.fillStyle = '#F43F5E';
          ctx.fill();
        }

        if (watcher.phase === 'happy' || watcher.phase === 'kissing') {
          const waveAngle = Math.sin(now * 0.012) * 0.5;
          ctx.save();
          ctx.translate(18 * scaleFactor, 6 * scaleFactor);
          ctx.rotate(waveAngle);
          ctx.beginPath();
          ctx.arc(0, 0, 6 * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#F59E0B';
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
      window.removeEventListener('click', handleDocumentClick);
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
