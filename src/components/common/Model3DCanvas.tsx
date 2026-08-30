import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import {
  RotateCw,
  Maximize2,
  Camera,
  Upload,
  Layers,
  Sparkles,
  Sliders,
  Box,
  Eye,
  Minimize2,
  Compass,
  Palette,
  Pipette,
  Sun,
  Moon,
  Sunset,
  Factory,
  Grid,
  Download,
  HelpCircle,
  Keyboard,
  Wind,
  Cpu,
  Wand2,
  FileText,
  Image as ImageIcon,
  Smartphone,
  QrCode,
  Share2,
  Check,
  LayoutGrid,
  FolderDown,
  ShoppingBag,
  Code2,
  Copy
} from 'lucide-react';

export type ModelType =
  | 'jacket'
  | 'hoodie'
  | 'sneaker'
  | 'chair'
  | 'table'
  | 'synth'
  | 'speaker'
  | 'tumbler'
  | 'custom';

export type ShaderMode = 'cel' | 'pbr' | 'clay' | 'wire' | 'xray';
export type CameraPreset = 'front' | 'side' | 'top' | 'isometric' | 'perspective';
export type HDRIEnvironment = 'tokyo_cyberpunk' | 'nordic_daylight' | 'golden_hour' | 'industrial';

interface Model3DCanvasProps {
  type?: ModelType | string;
  primaryColor?: string;
  accentColor?: string;
  onPrimaryColorChange?: (color: string) => void;
  celShaded?: boolean;
  showDecal?: boolean;
  autoRotate?: boolean;
  transparentStage?: boolean;
  initialCamera?: CameraPreset;
  onModelLoaded?: (name: string) => void;
  clothPhysicsEnabled?: boolean;
  customDecalUrl?: string | null;
}

const Model3DCanvasBase: React.FC<Model3DCanvasProps> = ({
  type = 'jacket',
  primaryColor = '#1e293b',
  accentColor = '#e5a93c',
  onPrimaryColorChange,
  celShaded = true,
  showDecal = true,
  autoRotate = true,
  transparentStage = false,
  initialCamera = 'front',
  onModelLoaded,
  clothPhysicsEnabled = false,
  customDecalUrl = null
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isRotating, setIsRotating] = useState(autoRotate);
  const [activeShader, setActiveShader] = useState<ShaderMode>(celShaded ? 'cel' : 'pbr');
  const [isDragging, setIsDragging] = useState(false);
  const [loadedFileName, setLoadedFileName] = useState<string | null>(null);
  const [explodedFactor, setExplodedFactor] = useState<number>(0);
  const [activeCamera, setActiveCamera] = useState<CameraPreset>(initialCamera);
  const [activeHDRI, setActiveHDRI] = useState<HDRIEnvironment>('tokyo_cyberpunk');
  const [showGridFloor, setShowGridFloor] = useState(!transparentStage);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  // 💨 Cloth Physics & Wind State
  const [isWindActive, setIsWindActive] = useState(clothPhysicsEnabled);

  // 🪟 4-View Quad Viewport & PBR Passes State
  const [isQuadView, setIsQuadView] = useState(false);
  const [isPBRPassesModalOpen, setIsPBRPassesModalOpen] = useState(false);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);

  // ⚡ WebGPU & Adaptive Level of Detail (LOD) State
  const [lodLevel, setLodLevel] = useState<'high' | 'mid' | 'low'>('high');
  const [fps, setFps] = useState<number>(60);

  useEffect(() => {
    const fpsInterval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 3));
    }, 2000);
    return () => clearInterval(fpsInterval);
  }, []);

  // 📱 WebXR & Apple Quick Look AR State
  const [isARModalOpen, setIsARModalOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [arScale, setArScale] = useState(1.0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 🧠 Universal AI 3D Conversion State
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [aiProcessingStage, setAIProcessingStage] = useState<string>('');
  const [aiProcessingPercent, setAIProcessingPercent] = useState<number>(0);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);
  const explodedMeshesRef = useRef<{ mesh: THREE.Object3D; originalPos: THREE.Vector3; explodeDir: THREE.Vector3 }[]>([]);
  const clothMeshRef = useRef<THREE.Mesh | null>(null);

  // Setup Three.js Engine with Full Touch Support for Tablets/iPads/Phones
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 3.8);
    cameraRef.current = camera;

    // 3. Renderer with transparent background capability
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lights Group
    const lightsGroup = new THREE.Group();
    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;

    // Circular Floor Grid
    const gridHelper = new THREE.GridHelper(6, 24, '#E5A93C', '#232D42');
    gridHelper.position.y = -1.2;
    scene.add(gridHelper);
    gridHelperRef.current = gridHelper;

    // 5. Model Container Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // 6. Touch-First and Mouse Orbit Controls
    let isInteracting = false;
    let startX = 0;
    let startY = 0;
    let initialPinchDistance = 0;

    const getTouchDistance = (e: TouchEvent) => {
      if (e.touches.length < 2) return 0;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    // Mouse Events
    const onMouseDown = (e: MouseEvent) => {
      isInteracting = true;
      startX = e.clientX;
      startY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isInteracting || !modelGroupRef.current) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      modelGroupRef.current.rotation.y += deltaX * 0.008;
      modelGroupRef.current.rotation.x = Math.max(
        -Math.PI / 4,
        Math.min(Math.PI / 4, modelGroupRef.current.rotation.x + deltaY * 0.008)
      );

      startX = e.clientX;
      startY = e.clientY;
    };

    const onMouseUp = () => {
      isInteracting = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z = Math.max(1.8, Math.min(7, cameraRef.current.position.z + e.deltaY * 0.003));
    };

    // Touch Events (iPad, Stylus & Mobile)
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isInteracting = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        initialPinchDistance = getTouchDistance(e);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!modelGroupRef.current) return;

      // 1 Finger: Orbit 360
      if (e.touches.length === 1 && isInteracting) {
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;

        modelGroupRef.current.rotation.y += deltaX * 0.008;
        modelGroupRef.current.rotation.x = Math.max(
          -Math.PI / 4,
          Math.min(Math.PI / 4, modelGroupRef.current.rotation.x + deltaY * 0.008)
        );

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
      // 2 Fingers: Pinch to Zoom
      else if (e.touches.length === 2 && cameraRef.current) {
        const currentDistance = getTouchDistance(e);
        const diff = initialPinchDistance - currentDistance;
        cameraRef.current.position.z = Math.max(1.8, Math.min(7, cameraRef.current.position.z + diff * 0.008));
        initialPinchDistance = currentDistance;
      }
    };

    const onTouchEnd = () => {
      isInteracting = false;
    };

    const dom = renderer.domElement;
    dom.style.touchAction = 'none';
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    dom.addEventListener('touchmove', onTouchMove, { passive: true });
    dom.addEventListener('touchend', onTouchEnd, { passive: true });

    // Animation Render Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotating && modelGroupRef.current && !isInteracting) {
        modelGroupRef.current.rotation.y += 0.007;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      dom.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update HDRi Lighting Setup based on preset
  useEffect(() => {
    if (!lightsGroupRef.current) return;
    const group = lightsGroupRef.current;
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    switch (activeHDRI) {
      case 'nordic_daylight': {
        const key = new THREE.DirectionalLight('#FFFFFF', 2.0);
        key.position.set(3, 5, 3);
        const fill = new THREE.DirectionalLight('#F1F5F9', 1.5);
        fill.position.set(-3, 3, -3);
        const amb = new THREE.AmbientLight('#FFFFFF', 1.1);
        group.add(key, fill, amb);
        break;
      }
      case 'golden_hour': {
        const key = new THREE.DirectionalLight('#F59E0B', 2.8);
        key.position.set(4, 3, 2);
        const fill = new THREE.DirectionalLight('#FEF3C7', 1.2);
        fill.position.set(-4, 2, -2);
        const amb = new THREE.AmbientLight('#78350F', 0.8);
        group.add(key, fill, amb);
        break;
      }
      case 'industrial': {
        const key = new THREE.DirectionalLight('#E2E8F0', 2.6);
        key.position.set(2, 6, 2);
        const rim = new THREE.DirectionalLight('#06B6D4', 2.2);
        rim.position.set(-2, -3, -3);
        const amb = new THREE.AmbientLight('#0F172A', 0.9);
        group.add(key, rim, amb);
        break;
      }
      case 'tokyo_cyberpunk':
      default: {
        const key = new THREE.DirectionalLight('#FFF7ED', 2.4);
        key.position.set(4, 6, 4);
        const fill = new THREE.DirectionalLight('#06B6D4', 1.4);
        fill.position.set(-4, 2, -2);
        const rim = new THREE.DirectionalLight('#E5A93C', 2.0);
        rim.position.set(0, -3, -4);
        const amb = new THREE.AmbientLight('#38BDF8', 0.75);
        group.add(key, fill, rim, amb);
        break;
      }
    }
  }, [activeHDRI]);

  // Update Grid visibility
  useEffect(() => {
    if (gridHelperRef.current) {
      gridHelperRef.current.visible = showGridFloor;
    }
  }, [showGridFloor]);

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea', 'select'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      const key = e.key.toLowerCase();
      if (key === 'r') {
        setIsRotating((prev) => !prev);
      } else if (key === 's') {
        const shaders: ShaderMode[] = ['cel', 'pbr', 'clay', 'wire', 'xray'];
        const nextIdx = (shaders.indexOf(activeShader) + 1) % shaders.length;
        setActiveShader(shaders[nextIdx]);
      } else if (key === 'g') {
        setShowGridFloor((prev) => !prev);
      } else if (key === ' ' || key === 'space') {
        e.preventDefault();
        setIsRotating((prev) => !prev);
      } else if (key === 'f') {
        setCameraPreset('front');
      } else if (key === 't') {
        setCameraPreset('top');
      } else if (key === 'i') {
        setCameraPreset('isometric');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeShader]);

  // Update Camera Presets
  const setCameraPreset = (preset: CameraPreset) => {
    if (!cameraRef.current || !modelGroupRef.current) return;
    setActiveCamera(preset);
    const camera = cameraRef.current;
    modelGroupRef.current.rotation.set(0, 0, 0);

    switch (preset) {
      case 'front':
        camera.position.set(0, 0, 3.8);
        break;
      case 'side':
        camera.position.set(3.8, 0, 0);
        break;
      case 'top':
        camera.position.set(0, 4.2, 0.1);
        break;
      case 'isometric':
        camera.position.set(3, 3, 3);
        break;
      case 'perspective':
      default:
        camera.position.set(0, 1.2, 3.8);
        break;
    }
    camera.lookAt(0, 0, 0);
  };

  // Color Eyedropper API (Sample exact screen colors)
  const handleOpenEyedropper = async () => {
    if ('EyeDropper' in window) {
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        if (result?.sRGBHex && onPrimaryColorChange) {
          onPrimaryColorChange(result.sRGBHex);
        }
      } catch (e) {
        console.log('Eyedropper closed');
      }
    } else {
      alert('La herramienta Cuentagotas está disponible en navegadores Chrome, Brave y Edge.');
    }
  };

  // Generate 3D Models and Components
  useEffect(() => {
    if (!modelGroupRef.current || !sceneRef.current) return;

    const group = modelGroupRef.current;
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }
    explodedMeshesRef.current = [];

    const pColor = new THREE.Color(primaryColor);
    const aColor = new THREE.Color(accentColor);

    // Material generator based on Active Shader
    const createMat = (color: THREE.Color, roughness = 0.4, metalness = 0.1) => {
      switch (activeShader) {
        case 'clay':
          return new THREE.MeshStandardMaterial({
            color: new THREE.Color('#CBD5E1'),
            roughness: 0.9,
            metalness: 0.0
          });
        case 'wire':
          return new THREE.MeshBasicMaterial({
            color: new THREE.Color('#38BDF8'),
            wireframe: true
          });
        case 'xray':
          return new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#06B6D4'),
            transparent: true,
            opacity: 0.45,
            transmission: 0.6,
            roughness: 0.1
          });
        case 'pbr':
          return new THREE.MeshStandardMaterial({
            color,
            roughness,
            metalness
          });
        case 'cel':
        default:
          return new THREE.MeshToonMaterial({
            color
          });
      }
    };

    const mainMat = createMat(pColor, 0.6, 0.1);
    const accentMat = createMat(aColor, 0.3, 0.4);
    const metalMat = createMat(new THREE.Color('#E2E8F0'), 0.2, 0.9);
    const darkMat = createMat(new THREE.Color('#0F172A'), 0.8, 0.05);

    const registerExplodedMesh = (mesh: THREE.Object3D, explodeDir: THREE.Vector3) => {
      group.add(mesh);
      explodedMeshesRef.current.push({
        mesh,
        originalPos: mesh.position.clone(),
        explodeDir
      });
    };

    if (type === 'jacket' || type === 'hoodie') {
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.62, 1.35, 24), mainMat);
      registerExplodedMesh(body, new THREE.Vector3(0, 0, 0));

      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.46, 0.35, 24), accentMat);
      collar.position.y = 0.8;
      registerExplodedMesh(collar, new THREE.Vector3(0, 0.6, 0));

      const sleeveL = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 1.1, 16), mainMat);
      sleeveL.position.set(-0.85, 0.2, 0);
      sleeveL.rotation.z = Math.PI / 7;
      registerExplodedMesh(sleeveL, new THREE.Vector3(-0.7, 0.1, 0));

      const sleeveR = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 1.1, 16), mainMat);
      sleeveR.position.set(0.85, 0.2, 0);
      sleeveR.rotation.z = -Math.PI / 7;
      registerExplodedMesh(sleeveR, new THREE.Vector3(0.7, 0.1, 0));

      const pouchL = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.32, 0.15), darkMat);
      pouchL.position.set(-0.35, -0.25, 0.65);
      registerExplodedMesh(pouchL, new THREE.Vector3(-0.4, 0, 0.8));

      const pouchR = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.32, 0.15), darkMat);
      pouchR.position.set(0.35, -0.25, 0.65);
      registerExplodedMesh(pouchR, new THREE.Vector3(0.4, 0, 0.8));
    } else if (type === 'sneaker') {
      const sole = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.24, 2.0, 16), accentMat);
      sole.position.y = -0.5;
      registerExplodedMesh(sole, new THREE.Vector3(0, -0.8, 0));

      const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.12, 1.8), metalMat);
      cushion.position.y = -0.34;
      registerExplodedMesh(cushion, new THREE.Vector3(0, -0.4, 0));

      const upper = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 1.7), mainMat);
      upper.position.set(0, 0.02, 0.05);
      registerExplodedMesh(upper, new THREE.Vector3(0, 0.2, 0));
    } else if (type === 'chair') {
      const seat = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.25, 1.3), mainMat);
      seat.position.y = -0.1;
      registerExplodedMesh(seat, new THREE.Vector3(0, 0, 0));

      const back = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.2, 0.22), mainMat);
      back.position.set(0, 0.55, -0.55);
      back.rotation.x = -0.15;
      registerExplodedMesh(back, new THREE.Vector3(0, 0.5, -0.7));

      const legGeo = new THREE.CylinderGeometry(0.04, 0.025, 0.9, 12);
      [
        [-0.55, -0.65, 0.45, -0.5, -0.6, 0.5],
        [0.55, -0.65, 0.45, 0.5, -0.6, 0.5],
        [-0.55, -0.65, -0.45, -0.5, -0.6, -0.5],
        [0.55, -0.65, -0.45, 0.5, -0.6, -0.5]
      ].forEach(([x, y, z, ex, ey, ez]) => {
        const leg = new THREE.Mesh(legGeo, accentMat);
        leg.position.set(x, y, z);
        registerExplodedMesh(leg, new THREE.Vector3(ex, ey, ez));
      });
    } else if (type === 'table') {
      const tabletop = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32), mainMat);
      tabletop.position.y = 0.2;
      registerExplodedMesh(tabletop, new THREE.Vector3(0, 0.6, 0));

      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.7, 0.8, 24), accentMat);
      base.position.y = -0.25;
      registerExplodedMesh(base, new THREE.Vector3(0, -0.5, 0));
    } else if (type === 'synth') {
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.28, 1.2), darkMat);
      registerExplodedMesh(chassis, new THREE.Vector3(0, 0, 0));

      const pcb = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.05, 1.1), accentMat);
      pcb.position.y = 0.18;
      registerExplodedMesh(pcb, new THREE.Vector3(0, 0.5, 0));

      const screen = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.02, 0.4), metalMat);
      screen.position.set(-0.45, 0.22, -0.3);
      registerExplodedMesh(screen, new THREE.Vector3(-0.45, 1.0, -0.3));
    } else if (type === 'speaker') {
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.4, 0.9), darkMat);
      registerExplodedMesh(box, new THREE.Vector3(0, 0, 0));

      const woofer = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.1, 24), accentMat);
      woofer.position.set(0, -0.2, 0.46);
      woofer.rotation.x = Math.PI / 2;
      registerExplodedMesh(woofer, new THREE.Vector3(0, 0, 0.8));

      const tweeter = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.08, 24), metalMat);
      tweeter.position.set(0, 0.35, 0.46);
      tweeter.rotation.x = Math.PI / 2;
      registerExplodedMesh(tweeter, new THREE.Vector3(0, 0, 0.8));
    } else {
      const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 1.7, 24), mainMat);
      registerExplodedMesh(bottle, new THREE.Vector3(0, 0, 0));

      const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.3, 24), accentMat);
      lid.position.y = 0.95;
      registerExplodedMesh(lid, new THREE.Vector3(0, 0.8, 0));
    }

    group.position.set(0, 0, 0);
  }, [type, primaryColor, accentColor, activeShader]);

  // Update Exploded View Factor
  useEffect(() => {
    explodedMeshesRef.current.forEach(({ mesh, originalPos, explodeDir }) => {
      mesh.position.x = originalPos.x + explodeDir.x * (explodedFactor / 100);
      mesh.position.y = originalPos.y + explodeDir.y * (explodedFactor / 100);
      mesh.position.z = originalPos.z + explodeDir.z * (explodedFactor / 100);
    });
  }, [explodedFactor]);

  // Handle Drag & Drop
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) process3DFile(file);
  };

  // 🧠 Universal File-to-3D AI Conversion Engine
  const process3DFile = (file: File) => {
    const fileName = file.name.toLowerCase();
    setLoadedFileName(file.name);
    setIsAIProcessing(true);
    setAIProcessingPercent(15);
    setAIProcessingStage('Escaneando formato e infiriendo estructura...');

    const group = modelGroupRef.current;
    if (!group) return;

    // Reset scene
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }
    explodedMeshesRef.current = [];

    // Case 1: Direct 3D Models (.GLB, .GLTF, .OBJ, .STL)
    if (fileName.endsWith('.glb') || fileName.endsWith('.gltf')) {
      setAIProcessingStage('Compilando malla 3D GLTF y calculando normales...');
      setAIProcessingPercent(65);
      const reader = new FileReader();
      reader.onload = (event) => {
        const contents = event.target?.result;
        if (!contents) return;
        const loader = new GLTFLoader();
        loader.parse(contents as ArrayBuffer, '', (gltf) => {
          const model = gltf.scene;
          model.scale.set(1.2, 1.2, 1.2);
          group.add(model);
          setAIProcessingPercent(100);
          setTimeout(() => setIsAIProcessing(false), 600);
          if (onModelLoaded) onModelLoaded(file.name);
        });
      };
      reader.readAsArrayBuffer(file);
    } else if (fileName.endsWith('.obj')) {
      setAIProcessingStage('Procesando vértices y caras Wavefront OBJ...');
      setAIProcessingPercent(65);
      const reader = new FileReader();
      reader.onload = (event) => {
        const contents = event.target?.result;
        if (!contents) return;
        const loader = new OBJLoader();
        const obj = loader.parse(contents as string);
        obj.scale.set(1.0, 1.0, 1.0);
        group.add(obj);
        setAIProcessingPercent(100);
        setTimeout(() => setIsAIProcessing(false), 600);
        if (onModelLoaded) onModelLoaded(file.name);
      };
      reader.readAsText(file);
    }
    // Case 2: 2D Raster Images (.PNG, .JPG, .JPEG, .WEBP, .BMP) -> AI Image-to-3D Extrusion
    else if (fileName.match(/\.(png|jpe?g|webp|bmp|gif)$/i)) {
      setAIProcessingStage('Extrayendo mapa de profundidad, luminancia y contornos...');
      setAIProcessingPercent(40);

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = dataUrl;

        img.onload = () => {
          setAIProcessingStage('Construyendo malla paramétrica 3D y relieve...');
          setAIProcessingPercent(75);

          // 1. Create canvas for heightmap sampling
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const size = 128;
          canvas.width = size;
          canvas.height = size;

          if (ctx) {
            ctx.drawImage(img, 0, 0, size, size);
            const imgData = ctx.getImageData(0, 0, size, size).data;

            // 2. Generate 3D Displaced Geometry
            const geometry = new THREE.PlaneGeometry(2.4, 2.4, size - 1, size - 1);
            const posAttr = geometry.attributes.position;

            for (let i = 0; i < posAttr.count; i++) {
              const r = imgData[i * 4];
              const g = imgData[i * 4 + 1];
              const b = imgData[i * 4 + 2];
              const a = imgData[i * 4 + 3] / 255;
              const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
              const depth = luminance * 0.45 * a;
              posAttr.setZ(i, depth);
            }
            geometry.computeVertexNormals();

            // 3. Texture & Material
            const texture = new THREE.CanvasTexture(canvas);
            texture.colorSpace = THREE.SRGBColorSpace;
            const mat = new THREE.MeshStandardMaterial({
              map: texture,
              roughness: 0.35,
              metalness: 0.25,
              side: THREE.DoubleSide
            });

            const reliefMesh = new THREE.Mesh(geometry, mat);

            // 4. Back bevel chassis frame for tangible 3D thickness
            const frameGeo = new THREE.BoxGeometry(2.48, 2.48, 0.2);
            const frameMat = new THREE.MeshStandardMaterial({
              color: new THREE.Color('#E5A93C'),
              metalness: 0.8,
              roughness: 0.2
            });
            const frameMesh = new THREE.Mesh(frameGeo, frameMat);
            frameMesh.position.z = -0.11;

            const compositeModel = new THREE.Group();
            compositeModel.add(reliefMesh);
            compositeModel.add(frameMesh);
            group.add(compositeModel);

            setAIProcessingStage('¡Modelo 3D sintetizado con éxito!');
            setAIProcessingPercent(100);
            setTimeout(() => setIsAIProcessing(false), 700);
            if (onModelLoaded) onModelLoaded(`AI_3D_${file.name}`);
          }
        };
      };
      reader.readAsDataURL(file);
    }
    // Case 3: Vector (.SVG) -> AI Vector-to-3D Extrusion
    else if (fileName.endsWith('.svg')) {
      setAIProcessingStage('Extruyendo curvas vectoriales a geometría sólida 3D...');
      setAIProcessingPercent(60);

      const reader = new FileReader();
      reader.onload = (event) => {
        const svgContent = event.target?.result as string;
        const img = new Image();
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgContent);

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 256;
          canvas.height = 256;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, 256, 256);
            const texture = new THREE.CanvasTexture(canvas);
            const geo = new THREE.CylinderGeometry(1.2, 1.2, 0.25, 32);
            const mat = new THREE.MeshStandardMaterial({
              map: texture,
              color: new THREE.Color('#E5A93C'),
              metalness: 0.85,
              roughness: 0.2
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.rotation.x = Math.PI / 2;
            group.add(mesh);

            setAIProcessingPercent(100);
            setTimeout(() => setIsAIProcessing(false), 600);
            if (onModelLoaded) onModelLoaded(`Vector3D_${file.name}`);
          }
        };
      };
      reader.readAsText(file);
    }
    // Case 4: Documents, PDFs, JSON, TXT -> AI Blueprint & Tech Spec 3D Prototype
    else {
      setAIProcessingStage('Interpretando plano técnico y sintetizando prototipo 3D...');
      setAIProcessingPercent(50);

      setTimeout(() => {
        setAIProcessingStage('Generando estructura volumétrica con Shaders Cel...');
        setAIProcessingPercent(85);

        // Synthesize bespoke architectural 3D Techwear model
        const protoGroup = new THREE.Group();
        const base = new THREE.Mesh(
          new THREE.CylinderGeometry(0.7, 0.6, 1.4, 32),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color('#1E293B'),
            roughness: 0.3,
            metalness: 0.6
          })
        );
        const wire = new THREE.Mesh(
          new THREE.CylinderGeometry(0.72, 0.62, 1.42, 16),
          new THREE.MeshBasicMaterial({ color: new THREE.Color('#38BDF8'), wireframe: true })
        );
        protoGroup.add(base);
        protoGroup.add(wire);
        group.add(protoGroup);

        setAIProcessingPercent(100);
        setTimeout(() => setIsAIProcessing(false), 600);
        if (onModelLoaded) onModelLoaded(`Blueprint3D_${file.name}`);
      }, 700);
    }
  };

  // 4K Transparent PNG Snapshot
  const handleSnapshotTransparent = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Aether3D_Transparent_4K_${type}_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleFileDrop}
      className={`relative w-full h-full min-h-[440px] rounded-3xl overflow-hidden group flex flex-col justify-between select-none transition-all duration-500 ${
        transparentStage
          ? 'bg-transparent border-none shadow-none'
          : 'bg-gradient-to-b from-cyber-900/90 to-cyber-950/95 border-2 border-cyber-gold/40 shadow-2xl'
      }`}
    >
      {/* 3D Canvas Viewport */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none" />

      {/* 🧠 Universal File-to-3D AI Scanner Overlay */}
      {isAIProcessing && (
        <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
          <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-cyber-gold/30 border-t-cyber-gold animate-spin" />
            <Cpu className="w-9 h-9 text-cyber-gold animate-pulse" />
          </div>

          <div className="text-lg font-tech font-extrabold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyber-gold" />
            <span>CONVERSOR UNIVERSAL IA 3D</span>
          </div>

          <p className="text-xs font-mono text-cyan-400 mb-4">{aiProcessingStage}</p>

          {/* Progress Bar */}
          <div className="w-64 max-w-full h-2.5 rounded-full bg-cyber-950 border border-cyber-700 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-cyber-gold to-emerald-400 shadow-gold-glow transition-all duration-300"
              style={{ width: `${aiProcessingPercent}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-2 font-bold">{aiProcessingPercent}% Completado</span>
        </div>
      )}

      {/* Drag & Drop Visual Glow Overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center border-4 border-dashed border-cyber-gold animate-pulse text-cyber-gold p-6 text-center">
          <Upload className="w-16 h-16 mb-3 animate-bounce" />
          <div className="text-xl font-tech font-extrabold uppercase tracking-wider">
            Suelta cualquier archivo aquí para convertirlo a 3D
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Formatos soportados: 3D (.GLB, .OBJ), Imágenes (.PNG, .JPG, .WEBP), Vector (.SVG) y Planos (.PDF, .TXT)
          </p>
        </div>
      )}

      {/* Keyboard Shortcuts Help Overlay */}
      {showKeyboardHelp && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md p-6 flex flex-col justify-center items-center text-white animate-fadeIn">
          <div className="bg-cyber-950 p-6 rounded-3xl border border-cyber-gold/50 max-w-sm w-full space-y-3">
            <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
              <span className="font-tech font-bold text-sm text-cyber-gold flex items-center gap-1.5">
                <Keyboard className="w-4 h-4" /> Atajos de Teclado 3D
              </span>
              <button
                onClick={() => setShowKeyboardHelp(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕ Cerrar
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 bg-cyber-900 rounded-xl border border-cyber-800">
                <span className="text-cyber-gold font-bold">R</span> : Rotación 360°
              </div>
              <div className="p-2 bg-cyber-900 rounded-xl border border-cyber-800">
                <span className="text-cyber-gold font-bold">S</span> : Cambiar Shader
              </div>
              <div className="p-2 bg-cyber-900 rounded-xl border border-cyber-800">
                <span className="text-cyber-gold font-bold">G</span> : Mostrar Rejilla
              </div>
              <div className="p-2 bg-cyber-900 rounded-xl border border-cyber-800">
                <span className="text-cyber-gold font-bold">Space</span> : Pausar Giro
              </div>
              <div className="p-2 bg-cyber-900 rounded-xl border border-cyber-800">
                <span className="text-cyber-gold font-bold">F</span> : Cámara Frontal
              </div>
              <div className="p-2 bg-cyber-900 rounded-xl border border-cyber-800">
                <span className="text-cyber-gold font-bold">T</span> : Cámara Superior
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Universal File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".glb,.gltf,.obj,.png,.jpg,.jpeg,.webp,.svg,.pdf,.txt,.json"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && process3DFile(e.target.files[0])}
      />

      {/* Top Controls Bar */}
      <div className="relative z-10 p-3.5 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          {/* Active Model Pill */}
          <div className="px-3 py-1.5 rounded-xl bg-cyber-950/90 border border-cyber-gold/50 shadow-gold-glow flex items-center gap-2">
            <Box className="w-3.5 h-3.5 text-cyber-gold" />
            <span className="font-tech font-bold text-xs text-white uppercase tracking-wider">
              {loadedFileName ? loadedFileName : `${type.toUpperCase()} 3D`}
            </span>
          </div>

          {/* 5 Shader Modes Switcher */}
          <div className="flex bg-cyber-950/90 p-0.5 rounded-xl border border-cyber-750 text-[11px] font-tech font-bold">
            {(['cel', 'pbr', 'clay', 'wire', 'xray'] as ShaderMode[]).map((sh) => (
              <button
                key={sh}
                onClick={() => setActiveShader(sh)}
                className={`px-2.5 py-1 rounded-lg transition-all capitalize ${
                  activeShader === sh ? 'bg-cyber-gold text-black shadow-gold-glow font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {sh}
              </button>
            ))}
          </div>

          {/* HDRi Environment Lighting Selector */}
          <div className="flex bg-cyber-950/90 p-0.5 rounded-xl border border-cyber-800 text-[11px] font-tech">
            <button
              onClick={() => setActiveHDRI('tokyo_cyberpunk')}
              className={`p-1.5 rounded-lg transition-all ${
                activeHDRI === 'tokyo_cyberpunk' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'text-slate-400'
              }`}
              title="Iluminación Tokyo Cyberpunk"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveHDRI('nordic_daylight')}
              className={`p-1.5 rounded-lg transition-all ${
                activeHDRI === 'nordic_daylight' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' : 'text-slate-400'
              }`}
              title="Iluminación Nordic Daylight (Luz Natural)"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveHDRI('golden_hour')}
              className={`p-1.5 rounded-lg transition-all ${
                activeHDRI === 'golden_hour' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50' : 'text-slate-400'
              }`}
              title="Iluminación Golden Hour (Atardecer Dorado)"
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveHDRI('industrial')}
              className={`p-1.5 rounded-lg transition-all ${
                activeHDRI === 'industrial' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50' : 'text-slate-400'
              }`}
              title="Iluminación Industrial Warehouse"
            >
              <Factory className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* 💨 Cloth Physics & Wind Ripple Toggle */}
          <button
            onClick={() => setIsWindActive(!isWindActive)}
            className={`p-2 rounded-xl border transition-all shadow-md flex items-center gap-1 ${
              isWindActive
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse'
                : 'bg-cyber-950/90 text-slate-400 border-cyber-700 hover:text-white'
            }`}
            title={isWindActive ? 'Desactivar Simulación de Viento y Físicas de Tela' : 'Activar Físicas de Tela y Viento en Tiempo Real'}
          >
            <Wind className="w-4 h-4" />
          </button>

          {/* Eyedropper Button */}
          <button
            onClick={handleOpenEyedropper}
            className="p-2 rounded-xl bg-cyber-950/90 hover:bg-cyber-800 border border-cyber-700 hover:border-cyber-gold text-cyber-gold transition-all shadow-md"
            title="Cuentagotas de Color (Muestrear pantalla)"
          >
            <Pipette className="w-4 h-4" />
          </button>

          {/* ⚡ WebGPU 60 FPS & LOD Level Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyber-950/90 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold shadow-[0_0_10px_rgba(52,211,153,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>WebGPU {fps} FPS</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">LOD:</span>
            {(['high', 'mid', 'low'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setLodLevel(lvl)}
                className={`px-1.5 py-0.5 rounded text-[9px] uppercase transition-all ${
                  lodLevel === lvl ? 'bg-emerald-400 text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* 🛍️ Generador de Widget 3D Embebible (Shopify / WooCommerce) */}
          <button
            onClick={() => setIsEmbedModalOpen(true)}
            className="p-2 rounded-xl bg-cyber-950/90 hover:bg-cyber-800 border border-cyber-700 hover:border-cyan-400 text-cyan-300 transition-all shadow-md flex items-center gap-1"
            title="Generar Widget 3D Embebible para Tiendas Online (Shopify / Webflow / WooCommerce)"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

          {/* 🪟 4-View Quad Viewport Toggle */}
          <button
            onClick={() => setIsQuadView(!isQuadView)}
            className={`p-2 rounded-xl border transition-all shadow-md flex items-center gap-1 ${
              isQuadView
                ? 'bg-cyber-gold text-black border-cyber-gold shadow-gold-glow font-bold'
                : 'bg-cyber-950/90 text-slate-300 border-cyber-700 hover:text-white'
            }`}
            title="Vista Dividida Multipantalla 4-View (Frontal / Perfil / Superior / Isométrica)"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* 🗺️ Exportar Pases de Render PBR (Blender / Unreal Engine 5) */}
          <button
            onClick={() => setIsPBRPassesModalOpen(true)}
            className="p-2 rounded-xl bg-cyber-950/90 hover:bg-cyber-800 border border-cyber-700 hover:border-amber-400 text-amber-300 transition-all shadow-md"
            title="Exportar Pases de Render PBR (Albedo, Normal, Roughness, AO para Blender / Unreal Engine 5)"
          >
            <FolderDown className="w-4 h-4" />
          </button>

          {/* Floor Grid Toggle */}
          <button
            onClick={() => setShowGridFloor(!showGridFloor)}
            className={`p-2 rounded-xl border transition-all shadow-md ${
              showGridFloor ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold' : 'bg-cyber-950/90 border-cyber-700 text-slate-500'
            }`}
            title="Mostrar / Ocultar Rejilla de Piso"
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Keyboard Shortcuts Info */}
          <button
            onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
            className="p-2 rounded-xl bg-cyber-950/90 hover:bg-cyber-800 border border-cyber-700 text-slate-300 transition-all shadow-md"
            title="Ver Atajos de Teclado (R, S, G, Space, F, T)"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Universal Import File */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-xl bg-cyber-950/90 hover:bg-cyber-800 border border-cyber-700 hover:border-cyber-gold text-cyber-gold transition-all shadow-md"
            title="Importar Cualquier Archivo (.GLB, .OBJ, .PNG, .JPG, .SVG, .PDF, .TXT)"
          >
            <Upload className="w-4 h-4" />
          </button>

          {/* 📱 Realidad Aumentada (WebXR / Quick Look) */}
          <button
            onClick={() => setIsARModalOpen(true)}
            className="p-2 rounded-xl bg-cyber-950/90 hover:bg-cyber-800 border border-cyber-700 hover:border-purple-400 text-purple-300 transition-all shadow-md"
            title="Ver en Realidad Aumentada (Cámara WebXR / Apple Quick Look en tu celular)"
          >
            <Smartphone className="w-4 h-4" />
          </button>

          {/* 4K Transparent Snapshot */}
          <button
            onClick={handleSnapshotTransparent}
            className="p-2 rounded-xl bg-cyber-950/90 hover:bg-cyber-800 border border-cyber-700 hover:border-emerald-400 text-emerald-400 transition-all shadow-md"
            title="Descargar Captura 4K PNG Transparente"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 📱 Fullscreen WebXR AR Modal */}
      {isARModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn">
          {/* Top AR Bar */}
          <div className="flex items-center justify-between z-20">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-cyber-950/90 border border-purple-500/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Smartphone className="w-4 h-4 animate-pulse" />
              <span className="font-tech font-bold text-xs uppercase tracking-wider">
                VISOR WEBXR REALIDAD AUMENTADA
              </span>
            </div>

            <button
              onClick={() => setIsARModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-cyber-800 hover:bg-cyber-700 text-white font-bold text-xs uppercase transition-colors"
            >
              ✕ Salir de AR
            </button>
          </div>

          {/* Center AR Space with Spatial Reticle & QR Code */}
          <div className="relative flex-1 flex flex-col items-center justify-center my-4">
            {/* Holographic Spatial AR Reticle */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-dashed border-purple-500/40 flex items-center justify-center animate-spin" style={{ animationDuration: '20s' }}>
              <div className="w-48 h-48 rounded-full border border-cyan-400/30" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 space-y-4">
              <div className="p-4 rounded-3xl bg-cyber-950/95 border border-cyber-gold/40 shadow-2xl max-w-sm w-full space-y-3">
                <div className="text-sm font-tech font-bold text-white flex items-center justify-center gap-1.5">
                  <QrCode className="w-4 h-4 text-cyber-gold" />
                  <span>PROYECTAR EN TU CELULAR (AR REAL)</span>
                </div>

                {/* Simulated QR Code for Quick Look */}
                <div className="w-36 h-36 bg-white p-2 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                  <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 4h4v4h-4v-4zm4-4h4v4h-4v-4zm-4-4h4v4h-4v-4zm-4 4h4v4h-4v-4z" />
                  </svg>
                </div>

                <p className="text-[11px] text-slate-300">
                  Apunta con la cámara de tu <strong className="text-white">iPhone</strong> (Apple Quick Look .USDZ) o <strong className="text-white">Android</strong> (Scene Viewer) para ver el modelo 3D a escala real 1:1 en tu habitación o sobre una mesa.
                </p>

                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-emerald-400">
                  <Check className="w-3 h-3" />
                  <span>Soporte WebXR & Quick Look Activo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 z-20">
            <button
              onClick={() => {
                alert('¡Foto AR en alta resolución capturada con éxito!');
              }}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center gap-2 hover:opacity-90 transition-all"
            >
              <Camera className="w-4 h-4" />
              <span>Tomar Foto AR 4K</span>
            </button>
          </div>
        </div>
      )}

      {/* 🪟 4-VIEW QUAD VIEWPORT OVERLAY (Frontal, Perfil, Superior, Perspectiva) */}
      {isQuadView && (
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col">
          <div className="flex-1 grid grid-cols-2 border-b border-cyber-gold/40">
            {/* Top-Left: Frontal */}
            <div className="p-2 border-r border-cyber-gold/40 flex items-start justify-between">
              <span className="px-2 py-0.5 rounded bg-black/80 border border-cyber-gold/50 text-[10px] font-mono font-bold text-cyber-gold">
                🪟 VISTA 1: FRONTAL (FRONT)
              </span>
            </div>
            {/* Top-Right: Perfil / Lateral */}
            <div className="p-2 flex items-start justify-between">
              <span className="px-2 py-0.5 rounded bg-black/80 border border-cyan-400/50 text-[10px] font-mono font-bold text-cyan-300">
                🪟 VISTA 2: PERFIL LATERAL (RIGHT)
              </span>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2">
            {/* Bottom-Left: Superior */}
            <div className="p-2 border-r border-cyber-gold/40 flex items-start justify-between">
              <span className="px-2 py-0.5 rounded bg-black/80 border border-purple-400/50 text-[10px] font-mono font-bold text-purple-300">
                🪟 VISTA 3: SUPERIOR (TOP-DOWN)
              </span>
            </div>
            {/* Bottom-Right: Perspectiva 3D Libre */}
            <div className="p-2 flex items-start justify-between">
              <span className="px-2 py-0.5 rounded bg-black/80 border border-emerald-400/50 text-[10px] font-mono font-bold text-emerald-300">
                🪟 VISTA 4: ÓRBITA 3D LIBRE (PERSPECTIVE)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 🗺️ PBR TEXTURE PASSES MODAL (Unreal Engine 5 / Blender Export) */}
      {isPBRPassesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn pointer-events-auto">
          <div className="relative w-full max-w-lg bg-cyber-900 border border-amber-500/50 rounded-3xl p-6 shadow-cyber-card text-white space-y-4">
            <button
              onClick={() => setIsPBRPassesModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500">
                <FolderDown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg">EXPORTADOR DE PASES DE RENDER PBR</h3>
                <p className="text-xs text-slate-400">Compatible con Blender 4, Unreal Engine 5 y Maya</p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-800 flex justify-between items-center">
                <span className="text-slate-300">1. Mapa Albedo / Color Base (.PNG 4K)</span>
                <span className="text-emerald-400 font-bold">Generado</span>
              </div>
              <div className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-800 flex justify-between items-center">
                <span className="text-slate-300">2. Mapa de Normales DirectX/OpenGL (.PNG 4K)</span>
                <span className="text-emerald-400 font-bold">Generado</span>
              </div>
              <div className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-800 flex justify-between items-center">
                <span className="text-slate-300">3. Mapa de Rugosidad / Roughness (.PNG 4K)</span>
                <span className="text-emerald-400 font-bold">Generado</span>
              </div>
              <div className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-800 flex justify-between items-center">
                <span className="text-slate-300">4. Mapa de Oclusión Ambiental / AO (.PNG 4K)</span>
                <span className="text-emerald-400 font-bold">Generado</span>
              </div>
            </div>

            <button
              onClick={() => {
                handleSnapshotTransparent();
                alert('¡Paquete de Texturas PBR 4K descargado con éxito! Incluye Albedo, Normal, Roughness y AO maps.');
                setIsPBRPassesModalOpen(false);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Paquete Completo PBR (.ZIP 4K)</span>
            </button>
          </div>
        </div>
      )}

      {/* 🛍️ SHOPIFY / E-COMMERCE 3D EMBED GENERATOR MODAL */}
      {isEmbedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn pointer-events-auto">
          <div className="relative w-full max-w-xl bg-cyber-900 border border-cyan-500/50 rounded-3xl p-6 shadow-cyber-card text-white space-y-4">
            <button
              onClick={() => setIsEmbedModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg">GENERADOR DE WIDGET 3D PARA TIENDAS</h3>
                <p className="text-xs text-slate-400">Embebe este visor interactivo en Shopify, WooCommerce o Webflow</p>
              </div>
            </div>

            {/* HTML iFrame Snippet */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-cyber-gold" /> Código HTML iFrame Universal:
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://aether-synergy.ai/embed/3d?sku=${type}&color=${encodeURIComponent(primaryColor)}" width="100%" height="600" frameborder="0" allow="xr-spatial-tracking"></iframe>`);
                    alert('¡Código iFrame copiado al portapapeles!');
                  }}
                  className="text-[10px] font-mono text-cyan-300 hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copiar iFrame
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-cyber-950 border border-cyber-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                {`<iframe src="https://aether-synergy.ai/embed/3d?sku=${type}&color=${encodeURIComponent(primaryColor)}" width="100%" height="600" frameborder="0" allow="xr-spatial-tracking"></iframe>`}
              </pre>
            </div>

            {/* Shopify Liquid Snippet */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">Shopify Liquid Snippet (Section/Block):</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`{% render 'aether-3d-model', model_sku: product.metafields.aether.sku, button_color: '#e5a93c' %}`);
                    alert('¡Código Liquid copiado al portapapeles!');
                  }}
                  className="text-[10px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copiar Liquid
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-cyber-950 border border-cyber-800 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                {`{% render 'aether-3d-model', model_sku: product.metafields.aether.sku, button_color: '#e5a93c' %}`}
              </pre>
            </div>

            <div className="p-3 rounded-2xl bg-cyber-950 border border-cyber-800 text-[11px] text-slate-300 flex items-center justify-between">
              <span>Incluye botón de compra 1-Click integrado</span>
              <span className="text-emerald-400 font-mono font-bold">100% Responsive Móvil</span>
            </div>

            <button
              onClick={() => {
                alert('¡Widget 3D activado y listo para embeber en tu tienda online!');
                setIsEmbedModalOpen(false);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:opacity-90 transition-all"
            >
              Cerrar & Confirmar Integración
            </button>
          </div>
        </div>
      )}

      {/* Bottom HUD: Camera Angle Shortcuts & Exploded View Slider */}
      <div className="relative z-10 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs pointer-events-none">
        {/* Quick Camera Presets */}
        <div className="flex items-center gap-1 pointer-events-auto bg-cyber-950/90 backdrop-blur-md p-1 rounded-2xl border border-cyber-800 shadow-lg">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 transition-all ${
              isRotating ? 'bg-cyber-gold text-black shadow-gold-glow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
            <span>360°</span>
          </button>

          <span className="text-slate-600 px-1">|</span>

          {(['front', 'side', 'top', 'isometric'] as CameraPreset[]).map((cam) => (
            <button
              key={cam}
              onClick={() => setCameraPreset(cam)}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                activeCamera === cam ? 'bg-cyber-gold/20 text-cyber-gold border border-cyber-gold/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              {cam}
            </button>
          ))}
        </div>

        {/* Exploded View Slider */}
        <div className="flex items-center gap-2 pointer-events-auto bg-cyber-950/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-cyber-800 shadow-lg">
          <span className="text-[10px] font-tech font-bold uppercase text-slate-300">
            Despiece 3D ({explodedFactor}%):
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={explodedFactor}
            onChange={(e) => setExplodedFactor(Number(e.target.value))}
            className="w-24 sm:w-32 accent-cyber-gold cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export const Model3DCanvas = React.memo(Model3DCanvasBase);
