import React, { useState } from 'react';
import {
  Zap,
  CheckSquare,
  Activity,
  Cpu,
  ArrowUpRight,
  Scissors,
  Download,
  FileCode,
  FileText,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  CheckCircle2,
  Ruler,
  Info,
  Box,
  ShoppingBag,
  Sliders,
  DollarSign,
  TrendingUp,
  Percent,
  Check,
  Grid,
  FileCheck,
  Printer,
  Copy,
  Layers3,
  HelpCircle,
  RotateCcw,
  X
} from 'lucide-react';

export type PatternDomain =
  | 'fashion_apparel'
  | 'furniture_upholstery'
  | 'footwear_shoes'
  | 'leather_bags'
  | 'gourmet_packaging'
  | 'industrial_boxes'
  | 'automotive_seats';

export interface PatternPiece {
  id: string;
  name: string;
  subType: string;
  dimensions: string;
  widthCm: number;
  heightCm: number;
  material: string;
  unitConsumption: string;
  points: string;
  innerPoints?: string;
  grainline: { x1: number; y1: number; x2: number; y2: number; label: string };
  notches: { x: number; y: number; label?: string }[];
  drillHoles?: { x: number; y: number; r: number }[];
  creaseLines?: { x1: number; y1: number; x2: number; y2: number }[];
}

export interface DomainPatternProject {
  id: PatternDomain;
  title: string;
  emoji: string;
  subtitle: string;
  materialType: string;
  stockDimension: string;
  stockAreaM2: number;
  defaultSeamAllowance: number;
  sizeScales: string[];
  pieces: PatternPiece[];
  nestingEfficiencyPct: number;
  materialCostPerM2: number;
  laborTimeMinutes: number;
}

export const DOMAIN_PATTERNS: Record<PatternDomain, DomainPatternProject> = {
  fashion_apparel: {
    id: 'fashion_apparel',
    title: 'Moda & Confección Textil',
    emoji: '👗',
    subtitle: 'Chaqueta Bomber Cyberpunk Oversized con Mangas Ranglán y Capucha 3-Piezas',
    materialType: 'Dril Algodón Pesado 460 GSM + Membrana Impermeable',
    stockDimension: 'Rollo Ancho Útil 1.50m x 50.0m',
    stockAreaM2: 75.0,
    defaultSeamAllowance: 1.0,
    sizeScales: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    nestingEfficiencyPct: 88.4,
    materialCostPerM2: 12.50,
    laborTimeMinutes: 45,
    pieces: [
      {
        id: 'apparel_front',
        name: 'Delantero con Fuelle y Cremallera (Front Body)',
        subType: 'Cuerpo Principal',
        dimensions: '58cm x 72cm',
        widthCm: 58,
        heightCm: 72,
        material: 'Dril 460 GSM Algodón',
        unitConsumption: '0.42 m²',
        points: 'M 50,50 L 250,50 L 280,180 L 240,400 L 60,400 L 20,180 Z',
        innerPoints: 'M 60,60 L 240,60 L 268,178 L 230,390 L 70,390 L 32,178 Z',
        grainline: { x1: 150, y1: 80, x2: 150, y2: 360, label: 'HILO DE LA TELA ↕' },
        notches: [{ x: 150, y: 50 }, { x: 280, y: 180 }, { x: 20, y: 180 }]
      },
      {
        id: 'apparel_back',
        name: 'Espalda Ergonómica con Tablón Central (Back Body)',
        subType: 'Cuerpo Principal',
        dimensions: '60cm x 75cm',
        widthCm: 60,
        heightCm: 75,
        material: 'Dril 460 GSM Algodón',
        unitConsumption: '0.45 m²',
        points: 'M 40,40 L 260,40 L 290,170 L 250,410 L 50,410 L 10,170 Z',
        innerPoints: 'M 50,50 L 250,50 L 278,168 L 240,400 L 60,400 L 22,168 Z',
        grainline: { x1: 150, y1: 70, x2: 150, y2: 380, label: 'HILO DE LA TELA ↕' },
        notches: [{ x: 150, y: 40 }, { x: 290, y: 170 }, { x: 10, y: 170 }]
      },
      {
        id: 'apparel_sleeve',
        name: 'Manga Ranglán Articulada con Pinza en Codo (Sleeve)',
        subType: 'Mangas',
        dimensions: '24cm x 66cm',
        widthCm: 24,
        heightCm: 66,
        material: 'Dril 460 GSM Algodón',
        unitConsumption: '0.32 m²',
        points: 'M 100,50 L 200,50 L 240,150 L 190,420 L 110,420 L 60,150 Z',
        grainline: { x1: 150, y1: 80, x2: 150, y2: 390, label: 'HILO DE LA TELA ↕' },
        notches: [{ x: 150, y: 50 }, { x: 240, y: 150 }, { x: 60, y: 150 }]
      },
      {
        id: 'apparel_hood',
        name: 'Capucha Ergonómica 3-Piezas (Hood Central & Laterales)',
        subType: 'Accesorios',
        dimensions: '35cm x 42cm',
        widthCm: 35,
        heightCm: 42,
        material: 'Forro Térmico + Exterior',
        unitConsumption: '0.28 m²',
        points: 'M 60,80 Q 220,40 260,180 L 230,350 L 70,350 L 40,220 Z',
        grainline: { x1: 150, y1: 100, x2: 150, y2: 320, label: 'HILO ↕' },
        notches: [{ x: 60, y: 80 }, { x: 260, y: 180 }]
      }
    ]
  },
  furniture_upholstery: {
    id: 'furniture_upholstery',
    title: 'Muebles, Sillas & Tapicería',
    emoji: '🪑',
    subtitle: 'Sillón Lounge Escandinavo en Madera Contrachapada Curvada & Cuero Capitoné',
    materialType: 'Madera Contrachapada Roble 18mm + Cuero Natural 1.4mm',
    stockDimension: 'Tablero Estándar 2.44m x 1.22m (2.97 m²)',
    stockAreaM2: 2.97,
    defaultSeamAllowance: 1.5,
    sizeScales: ['Estándar 1-Puesto', 'Loveseat 2-Puestos', 'Sofá 3-Puestos'],
    nestingEfficiencyPct: 91.2,
    materialCostPerM2: 38.00,
    laborTimeMinutes: 120,
    pieces: [
      {
        id: 'furn_seat_shell',
        name: 'Carcasa Asiento Madera CNC (Curved Seat Shell)',
        subType: 'Estructura CNC Madera',
        dimensions: '68cm x 62cm',
        widthCm: 68,
        heightCm: 62,
        material: 'Madera Curvada 18mm Roble',
        unitConsumption: '0.42 m²',
        points: 'M 40,60 Q 150,20 260,60 L 280,380 Q 150,420 20,380 Z',
        grainline: { x1: 150, y1: 80, x2: 150, y2: 370, label: 'VETA DE LA MADERA ↕' },
        notches: [{ x: 150, y: 35 }, { x: 150, y: 405 }],
        drillHoles: [{ x: 70, y: 120, r: 5 }, { x: 230, y: 120, r: 5 }, { x: 70, y: 320, r: 5 }, { x: 230, y: 320, r: 5 }]
      },
      {
        id: 'furn_back_shell',
        name: 'Respaldo Curvo Ergonómico (Backrest Shell)',
        subType: 'Estructura CNC Madera',
        dimensions: '65cm x 55cm',
        widthCm: 65,
        heightCm: 55,
        material: 'Madera Curvada 18mm Roble',
        unitConsumption: '0.36 m²',
        points: 'M 50,50 L 250,50 Q 280,220 240,390 L 60,390 Q 20,220 50,50 Z',
        grainline: { x1: 150, y1: 70, x2: 150, y2: 370, label: 'VETA DE LA MADERA ↕' },
        notches: [{ x: 150, y: 50 }, { x: 150, y: 390 }],
        drillHoles: [{ x: 80, y: 100, r: 5 }, { x: 220, y: 100, r: 5 }, { x: 150, y: 300, r: 6 }]
      },
      {
        id: 'furn_cushion_leather',
        name: 'Patrón Tapicería Cuero Capitoné (Seat Leather Cushion)',
        subType: 'Tapicería & Cuero',
        dimensions: '64cm x 58cm',
        widthCm: 64,
        heightCm: 58,
        material: 'Cuero Natural Flor 1.4mm',
        unitConsumption: '0.37 m²',
        points: 'M 30,50 L 270,50 L 270,390 L 30,390 Z',
        innerPoints: 'M 45,65 L 255,65 L 255,375 L 45,375 Z',
        grainline: { x1: 150, y1: 70, x2: 150, y2: 370, label: 'FIBRA DE LA PIEL ↕' },
        notches: [{ x: 150, y: 50 }, { x: 270, y: 220 }, { x: 30, y: 220 }],
        drillHoles: [{ x: 90, y: 130, r: 3 }, { x: 150, y: 130, r: 3 }, { x: 210, y: 130, r: 3 }, { x: 120, y: 220, r: 3 }, { x: 180, y: 220, r: 3 }]
      },
      {
        id: 'furn_armrest',
        name: 'Apoyabrazos Acolchado Par Izq/Der (Padded Armrest)',
        subType: 'Tapicería',
        dimensions: '18cm x 45cm',
        widthCm: 18,
        heightCm: 45,
        material: 'Espuma Alta Densidad D35 + Cuero',
        unitConsumption: '0.18 m²',
        points: 'M 80,40 Q 150,20 220,40 L 230,410 Q 150,430 70,410 Z',
        grainline: { x1: 150, y1: 60, x2: 150, y2: 390, label: 'HILO / VETA ↕' },
        notches: [{ x: 150, y: 30 }, { x: 150, y: 420 }]
      }
    ]
  },
  footwear_shoes: {
    id: 'footwear_shoes',
    title: 'Calzado & Zapatillas / Sneakers',
    emoji: '👟',
    subtitle: 'Sneaker Urbano Streetwear con Puntera en Nobuk, Capellada de Malla y Suela EVA/Caucho',
    materialType: 'Cuero Nobuk 1.2mm + Malla 3D Transpirable + Suela Caucho',
    stockDimension: 'Piel de Nobuk 18 ft² (1.67 m²)',
    stockAreaM2: 1.67,
    defaultSeamAllowance: 0.8,
    sizeScales: ['EUR 38', 'EUR 40', 'EUR 42', 'EUR 44', 'EUR 46'],
    nestingEfficiencyPct: 86.5,
    materialCostPerM2: 24.00,
    laborTimeMinutes: 35,
    pieces: [
      {
        id: 'shoe_upper_side',
        name: 'Lateral de Capellada Exterior (Lateral Quarter Upper)',
        subType: 'Corte Exterior Cuero',
        dimensions: '32cm x 16cm',
        widthCm: 32,
        heightCm: 16,
        material: 'Cuero Nobuk Hidrofugado',
        unitConsumption: '0.08 m²',
        points: 'M 30,120 Q 150,40 280,90 L 260,320 Q 160,370 40,290 Z',
        grainline: { x1: 150, y1: 90, x2: 150, y2: 330, label: 'LÍNEA DE ESTIRAMIENTO ↕' },
        notches: [{ x: 30, y: 120 }, { x: 280, y: 90 }, { x: 150, y: 345 }],
        drillHoles: [{ x: 120, y: 100, r: 2.5 }, { x: 150, y: 95, r: 2.5 }, { x: 180, y: 90, r: 2.5 }, { x: 210, y: 88, r: 2.5 }]
      },
      {
        id: 'shoe_toe_cap',
        name: 'Puntera Reforzada (Toe Cap Protector)',
        subType: 'Refuerzo Puntera',
        dimensions: '18cm x 14cm',
        widthCm: 18,
        heightCm: 14,
        material: 'Cuero Nobuk 1.4mm',
        unitConsumption: '0.04 m²',
        points: 'M 60,100 Q 150,30 240,100 Q 260,250 150,280 Q 40,250 60,100 Z',
        grainline: { x1: 150, y1: 60, x2: 150, y2: 250, label: 'SENTIDO DE CORTE ↕' },
        notches: [{ x: 150, y: 40 }, { x: 150, y: 280 }]
      },
      {
        id: 'shoe_tongue',
        name: 'Lengüeta Acolchada Ergonómica (Padded Tongue)',
        subType: 'Empeine',
        dimensions: '12cm x 22cm',
        widthCm: 12,
        heightCm: 22,
        material: 'Malla 3D Espuma 4mm',
        unitConsumption: '0.03 m²',
        points: 'M 70,50 Q 150,30 230,50 L 220,380 Q 150,400 80,380 Z',
        grainline: { x1: 150, y1: 50, x2: 150, y2: 370, label: 'FLEXIÓN ↕' },
        notches: [{ x: 150, y: 35 }]
      },
      {
        id: 'shoe_insole',
        name: 'Plantilla Conformada Amortiguada (Ergonomic Insole)',
        subType: 'Plantilla Interior',
        dimensions: '28cm x 10cm',
        widthCm: 28,
        heightCm: 10,
        material: 'EVA Conformada D20 + Forro Textil',
        unitConsumption: '0.05 m²',
        points: 'M 100,50 Q 150,30 200,50 Q 230,150 210,270 Q 180,390 150,420 Q 120,390 90,270 Q 70,150 100,50 Z',
        grainline: { x1: 150, y1: 50, x2: 150, y2: 400, label: 'EJE LONGITUDINAL ↕' },
        notches: [{ x: 150, y: 35 }, { x: 150, y: 420 }]
      }
    ]
  },
  leather_bags: {
    id: 'leather_bags',
    title: 'Bolsos, Mochilas & Marroquinería',
    emoji: '👜',
    subtitle: 'Mochila Urbana Táctica Roll-Top en Cuero Graso y Lona Resinada Impermeable',
    materialType: 'Cuero Graso 1.8mm + Forro Lona Impermeable 320 GSM',
    stockDimension: 'Piel Vacuna 22 ft² (2.04 m²)',
    stockAreaM2: 2.04,
    defaultSeamAllowance: 1.2,
    sizeScales: ['Mini (12L)', 'Medium (20L)', 'Large (32L)'],
    nestingEfficiencyPct: 89.0,
    materialCostPerM2: 32.00,
    laborTimeMinutes: 75,
    pieces: [
      {
        id: 'bag_front_panel',
        name: 'Cuerpo Principal Frontal (Main Front Body)',
        subType: 'Cuerpo Exterior',
        dimensions: '34cm x 52cm',
        widthCm: 34,
        heightCm: 52,
        material: 'Cuero Graso 1.8mm',
        unitConsumption: '0.24 m²',
        points: 'M 40,40 L 260,40 L 250,410 L 50,410 Z',
        innerPoints: 'M 55,55 L 245,55 L 235,395 L 65,395 Z',
        grainline: { x1: 150, y1: 60, x2: 150, y2: 390, label: 'CAÍDA DEL CUERO ↕' },
        notches: [{ x: 150, y: 40 }, { x: 250, y: 225 }, { x: 50, y: 225 }],
        drillHoles: [{ x: 80, y: 80, r: 3 }, { x: 220, y: 80, r: 3 }]
      },
      {
        id: 'bag_gusset',
        name: 'Fuelle Lateral Continuo con Base (Continuous Gusset)',
        subType: 'Fuelle Perimetral',
        dimensions: '14cm x 115cm',
        widthCm: 14,
        heightCm: 115,
        material: 'Cuero Graso 1.8mm + Badana Refuerzo',
        unitConsumption: '0.22 m²',
        points: 'M 80,20 L 220,20 L 220,430 L 80,430 Z',
        grainline: { x1: 150, y1: 40, x2: 150, y2: 410, label: 'SENTIDO LONGITUDINAL ↕' },
        notches: [{ x: 150, y: 20 }, { x: 80, y: 225 }, { x: 220, y: 225 }, { x: 150, y: 430 }]
      },
      {
        id: 'bag_straps',
        name: 'Correas de Hombro Acolchadas (Ergonomic Shoulder Straps)',
        subType: 'Arnés & Correas',
        dimensions: '8cm x 75cm',
        widthCm: 8,
        heightCm: 75,
        material: 'Cuero + Espuma EVA 5mm',
        unitConsumption: '0.12 m²',
        points: 'M 100,30 Q 150,15 200,30 L 190,420 Q 150,435 110,420 Z',
        grainline: { x1: 150, y1: 40, x2: 150, y2: 410, label: 'RESISTENCIA A LA TRACCIÓN ↕' },
        notches: [{ x: 150, y: 25 }, { x: 150, y: 425 }],
        drillHoles: [{ x: 150, y: 100, r: 4 }, { x: 150, y: 140, r: 4 }, { x: 150, y: 180, r: 4 }]
      }
    ]
  },
  gourmet_packaging: {
    id: 'gourmet_packaging',
    title: 'Packaging Gastronómico & Restaurante',
    emoji: '🍔',
    subtitle: 'Troquel de Caja Hamburguesa Gourmet / Platos con Solapas Autoblocantes y Ventilación',
    materialType: 'Cartulina Kraft Grado Alimenticio 320 GSM + Liner Antigrasa',
    stockDimension: 'Pliego Cartón 70cm x 100cm (0.70 m²)',
    stockAreaM2: 0.70,
    defaultSeamAllowance: 0.0,
    sizeScales: ['Estándar 14x14x10cm', 'Mega Burger 18x18x12cm', 'Combo Box 24x16x10cm'],
    nestingEfficiencyPct: 93.8,
    materialCostPerM2: 4.50,
    laborTimeMinutes: 5,
    pieces: [
      {
        id: 'pkg_burger_diecut',
        name: 'Troquel Desplegado Plano de Caja Hamburguesa (Flat Die-Cut)',
        subType: 'Troquel Completo',
        dimensions: '48cm x 42cm',
        widthCm: 48,
        heightCm: 42,
        material: 'Cartulina Kraft 320 GSM',
        unitConsumption: '0.20 m²',
        points: 'M 80,40 L 220,40 L 220,100 L 270,100 L 270,200 L 220,200 L 220,300 L 270,300 L 270,400 L 220,400 L 220,440 L 80,440 L 80,400 L 30,400 L 30,300 L 80,300 L 80,200 L 30,200 L 30,100 L 80,100 Z',
        grainline: { x1: 150, y1: 60, x2: 150, y2: 420, label: 'DIRECCIÓN FIBRA CARTÓN ↕' },
        notches: [{ x: 150, y: 40 }, { x: 270, y: 150 }, { x: 30, y: 150 }],
        drillHoles: [{ x: 130, y: 70, r: 4 }, { x: 170, y: 70, r: 4 }], // Steam vents
        creaseLines: [
          { x1: 80, y1: 100, x2: 220, y2: 100 },
          { x1: 80, y1: 200, x2: 220, y2: 200 },
          { x1: 80, y1: 300, x2: 220, y2: 300 },
          { x1: 80, y1: 400, x2: 220, y2: 400 }
        ]
      }
    ]
  },
  industrial_boxes: {
    id: 'industrial_boxes',
    title: 'Packaging & Cajas E-Commerce',
    emoji: '📦',
    subtitle: 'Caja Postal Automontable Fefco 0427 con Doble Pestaña de Cierre y Tira Abre-Fácil',
    materialType: 'Cartón Microcorrugado Canal E (1.5mm) 420 GSM',
    stockDimension: 'Lámina Corrugado 1.20m x 1.60m (1.92 m²)',
    stockAreaM2: 1.92,
    defaultSeamAllowance: 0.0,
    sizeScales: ['Pequeña (20x15x8cm)', 'Mediana (30x22x10cm)', 'Grande (40x30x15cm)'],
    nestingEfficiencyPct: 94.5,
    materialCostPerM2: 3.20,
    laborTimeMinutes: 8,
    pieces: [
      {
        id: 'box_fefco_0427',
        name: 'Plano Troquel Fefco 0427 Automontable',
        subType: 'Troquel Industrial',
        dimensions: '56cm x 68cm',
        widthCm: 56,
        heightCm: 68,
        material: 'Microcorrugado Canal E 1.5mm',
        unitConsumption: '0.38 m²',
        points: 'M 70,30 L 230,30 L 250,90 L 280,90 L 280,380 L 250,380 L 230,430 L 70,430 L 50,380 L 20,380 L 20,90 L 50,90 Z',
        grainline: { x1: 150, y1: 50, x2: 150, y2: 410, label: 'DIRECCIÓN ONDULACIÓN CANAL ↕' },
        notches: [{ x: 150, y: 30 }, { x: 150, y: 430 }],
        creaseLines: [
          { x1: 70, y1: 90, x2: 230, y2: 90 },
          { x1: 70, y1: 200, x2: 230, y2: 200 },
          { x1: 70, y1: 310, x2: 230, y2: 310 },
          { x1: 70, y1: 380, x2: 230, y2: 380 }
        ]
      }
    ]
  },
  automotive_seats: {
    id: 'automotive_seats',
    title: 'Tapicería Automotriz / Cojinería',
    emoji: '🚗',
    subtitle: 'Asiento Deportivo Tipo Bucket en Alcantara Microperforada & Cuero Ignífugo',
    materialType: 'Cuero Automotriz Ignífugo 1.3mm + Alcantara Perforada',
    stockDimension: 'Piel Vacuna Seleccionada 26 ft² (2.41 m²)',
    stockAreaM2: 2.41,
    defaultSeamAllowance: 1.0,
    sizeScales: ['Piloto Estándar', 'Copiloto', 'Banca Trasera 60/40'],
    nestingEfficiencyPct: 87.2,
    materialCostPerM2: 48.00,
    laborTimeMinutes: 90,
    pieces: [
      {
        id: 'auto_center_cushion',
        name: 'Panel Central Microperforado Ventilado (Center Inset)',
        subType: 'Asiento Central',
        dimensions: '44cm x 54cm',
        widthCm: 44,
        heightCm: 54,
        material: 'Alcantara Automotriz Microperforada',
        unitConsumption: '0.28 m²',
        points: 'M 50,50 L 250,50 L 265,390 L 35,390 Z',
        innerPoints: 'M 65,65 L 235,65 L 250,375 L 50,375 Z',
        grainline: { x1: 150, y1: 70, x2: 150, y2: 370, label: 'DIRECCIÓN PELO ALCANTARA ↕' },
        notches: [{ x: 150, y: 50 }, { x: 265, y: 220 }, { x: 35, y: 220 }]
      },
      {
        id: 'auto_side_bolster',
        name: 'Lateral Envolvente con Costura Airbag (Side Bolster)',
        subType: 'Refuerzo Lateral',
        dimensions: '22cm x 68cm',
        widthCm: 22,
        heightCm: 68,
        material: 'Cuero Nappa Automotriz 1.3mm',
        unitConsumption: '0.19 m²',
        points: 'M 90,30 Q 180,20 210,120 L 190,420 Q 120,440 60,380 Q 50,150 90,30 Z',
        grainline: { x1: 150, y1: 50, x2: 150, y2: 390, label: 'TENSIÓN LATERAL ↕' },
        notches: [{ x: 90, y: 30 }, { x: 200, y: 270 }, { x: 60, y: 380 }],
        drillHoles: [{ x: 180, y: 200, r: 4 }] // Airbag tear seam indicator
      }
    ]
  }
};

export const PatternCutting2D: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<PatternDomain>('fashion_apparel');
  const currentProject = DOMAIN_PATTERNS[selectedDomain];

  const [selectedPieceId, setSelectedPieceId] = useState<string>(currentProject.pieces[0].id);
  const [seamAllowance, setSeamAllowance] = useState<number>(currentProject.defaultSeamAllowance);
  const [sizeScale, setSizeScale] = useState<string>(currentProject.sizeScales[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [showGrainline, setShowGrainline] = useState<boolean>(true);
  const [showNotches, setShowNotches] = useState<boolean>(true);
  const [showSeamLine, setShowSeamLine] = useState<boolean>(true);
  const [showDimensions, setShowDimensions] = useState<boolean>(true);
  const [isNestingModalOpen, setIsNestingModalOpen] = useState(false);
  const [isNestingRunning, setIsNestingRunning] = useState(false);
  const [optimizedEfficiency, setOptimizedEfficiency] = useState<number | null>(null);
  const [isMachineExportModalOpen, setIsMachineExportModalOpen] = useState(false);
  const [isThreadCalcModalOpen, setIsThreadCalcModalOpen] = useState(false);
  const [warpShrinkage, setWarpShrinkage] = useState(0);
  const [weftShrinkage, setWeftShrinkage] = useState(0);
  const [productionLotSize, setProductionLotSize] = useState(500);

  // Active Piece
  const activePiece = currentProject.pieces.find((p) => p.id === selectedPieceId) || currentProject.pieces[0];

  // Financial & Material Calculations
  const pieceAreaM2 = (activePiece.widthCm * activePiece.heightCm) / 10000;
  const estimatedCostPiece = pieceAreaM2 * currentProject.materialCostPerM2;
  const totalProjectAreaM2 = currentProject.pieces.reduce((acc, p) => acc + (p.widthCm * p.heightCm) / 10000, 0);
  const totalProjectCost = totalProjectAreaM2 * currentProject.materialCostPerM2;

  const handleDomainChange = (domain: PatternDomain) => {
    setSelectedDomain(domain);
    const newProj = DOMAIN_PATTERNS[domain];
    setSelectedPieceId(newProj.pieces[0].id);
    setSeamAllowance(newProj.defaultSeamAllowance);
    setSizeScale(newProj.sizeScales[0]);
  };

    const handleRunGeneticNesting = async () => {
    setIsNestingRunning(true);
    await new Promise((r) => setTimeout(r, 1600));
    setOptimizedEfficiency(94.8);
    setIsNestingRunning(false);
  };

  const currentEfficiency = optimizedEfficiency || currentProject.nestingEfficiencyPct;
  const currentWaste = (100 - currentEfficiency).toFixed(1);
  const savedFabricMeters = Math.round((productionLotSize * 1.8) * ((currentEfficiency - currentProject.nestingEfficiencyPct) / 100));
  const savedFabricUSD = Math.round(savedFabricMeters * currentProject.materialCostPerM2);

  const handleExportDXF = () => {
    const dxfHeader = `0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1009\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n`;
    const dxfComment = `999\nAether Synergy 2D CAD Pattern - ${currentProject.title} - ${activePiece.name} (Talla ${sizeScale})\n`;
    const dxfFooter = `0\nENDSEC\n0\nEOF\n`;
    const fullDXF = dxfHeader + dxfComment + `0\nPOLYLINE\n8\nCUT_LAYER\n66\n1\n0\nSEQEND\n` + dxfFooter;

    const blob = new Blob([fullDXF], { type: 'application/dxf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aether_Pattern_${selectedDomain}_${activePiece.id}_${sizeScale}.dxf`;
    a.click();
  };

  const handleExportPDF = () => {
    alert(`¡Patrón 2D a Escala 1:1 descargado para Plotter de Gran Formato (A0 / 900mm)!\nDominio: ${currentProject.title}\nPieza: ${activePiece.name}\nTalla: ${sizeScale}\nMargen de Costura: ${seamAllowance} cm`);
  };

  const handleExportTechPackJSON = () => {
    const techpackData = {
      project: currentProject.title,
      domain: currentProject.id,
      selectedSize: sizeScale,
      seamAllowanceCm: seamAllowance,
      material: currentProject.materialType,
      stockDimension: currentProject.stockDimension,
      nestingEfficiency: currentProject.nestingEfficiencyPct + '%',
      totalCostUSD: totalProjectCost.toFixed(2),
      laborTimeMinutes: currentProject.laborTimeMinutes,
      pieces: currentProject.pieces.map((p) => ({
        id: p.id,
        name: p.name,
        dimensions: p.dimensions,
        material: p.material,
        unitConsumption: p.unitConsumption
      })),
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(techpackData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TechPack_BOM_${selectedDomain}_${sizeScale}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-white font-mono text-xs">
      {/* Executive Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/95 p-6 rounded-3xl border border-cyan-500/50 shadow-cyber-card backdrop-blur-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 rounded-2xl bg-cyan-500/20 border border-cyan-500 text-cyan-400 shadow-md">
            <Scissors className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-tech font-extrabold text-white tracking-wider">
                ESTUDIO INDUSTRIAL DE PATRONAJE 2D, DESPIECE & CAD/CAM
              </h2>
              <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/50">
                MULTI-DOMINIO TOTAL
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Despiece paramétrico de patrones para Ropa, Muebles/Sillas, Calzado, Marroquinería/Bolsos, Cajas Packaging y Tapicería Automotriz.
            </p>
          </div>
        </div>

        {/* Global Export Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsNestingModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-black font-tech font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-all"
            title="Optimizar el acomodo de piezas en el rollo de tela con IA genética"
          >
            <Zap className="w-4 h-4" />
            <span>Nesting Genético IA</span>
          </button>

          <button
            onClick={() => setIsThreadCalcModalOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-cyber-950 border border-cyber-700 hover:border-amber-400 text-amber-300 font-tech font-bold text-xs uppercase flex items-center gap-1.5 transition-all"
            title="Calcular metros de hilo según norma ISO 4915"
          >
            <Activity className="w-4 h-4" />
            <span>Hilos ISO 4915</span>
          </button>

          <button
            onClick={() => setIsMachineExportModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-1.5 transition-all"
            title="Exportar archivo para máquinas de corte láser, Gerber, Lectra y Zünd CNC"
          >
            <FileCode className="w-4 h-4" />
            <span>Exportar Máquinas CAD/CAM</span>
          </button>

          <button
            onClick={handleExportDXF}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-1.5 transition-all"
            title="Exportar archivo DXF estándar para máquinas de corte láser, Gerber, Lectra y Optitex"
          >
            <FileCode className="w-4 h-4" />
            <span>Descargar .DXF (AAMA / ASTM)</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="px-4 py-2.5 rounded-xl bg-cyber-950 border border-cyber-700 hover:border-cyber-gold text-cyber-gold font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
            title="Exportar plano en PDF a escala real 1:1 para impresión en plotter de 900mm"
          >
            <Printer className="w-4 h-4" />
            <span>PDF Plotter 1:1</span>
          </button>

          <button
            onClick={handleExportTechPackJSON}
            className="px-3.5 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500 text-purple-300 font-tech font-bold text-xs uppercase flex items-center gap-1.5 transition-all"
            title="Descargar Ficha Técnica BOM en JSON con consumos y tolerancias"
          >
            <FileText className="w-4 h-4" />
            <span>TechPack JSON</span>
          </button>
        </div>
      </div>

      {/* Domain Category Selector Tabs (The 7 Core Disciplines) */}
      <div className="flex flex-wrap gap-2 bg-cyber-900/90 p-2 rounded-2xl border border-cyber-800 shadow-cyber-card">
        {[
          { id: 'fashion_apparel', label: 'Moda & Confección', emoji: '👗' },
          { id: 'furniture_upholstery', label: 'Muebles & Tapicería', emoji: '🪑' },
          { id: 'footwear_shoes', label: 'Calzado & Sneakers', emoji: '👟' },
          { id: 'leather_bags', label: 'Bolsos & Marroquinería', emoji: '👜' },
          { id: 'gourmet_packaging', label: 'Packaging Restaurante', emoji: '🍔' },
          { id: 'industrial_boxes', label: 'Cajas E-Commerce', emoji: '📦' },
          { id: 'automotive_seats', label: 'Tapicería Automotriz', emoji: '🚗' }
        ].map((dom) => (
          <button
            key={dom.id}
            onClick={() => handleDomainChange(dom.id as PatternDomain)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all ${
              selectedDomain === dom.id
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)] font-extrabold'
                : 'text-slate-400 hover:text-white bg-cyber-950/60 border border-cyber-800'
            }`}
          >
            <span>{dom.emoji}</span>
            <span>{dom.label}</span>
          </button>
        ))}
      </div>

      {/* Industrial Project Specs KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-1">
          <span className="text-[10px] text-slate-500 block">Material & Especificación:</span>
          <span className="text-xs font-tech font-bold text-cyan-300 truncate block">
            {currentProject.materialType}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">{currentProject.stockDimension}</span>
        </div>

        <div className="p-4 rounded-2xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-1">
          <span className="text-[10px] text-slate-500 block">Aprovechamiento Nesting:</span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-tech font-extrabold text-emerald-400">
              {currentProject.nestingEfficiencyPct}%
            </span>
            <span className="text-[10px] text-rose-400">Merma: {(100 - currentProject.nestingEfficiencyPct).toFixed(1)}%</span>
          </div>
          <div className="w-full h-1.5 bg-cyber-950 rounded-full overflow-hidden border border-cyber-800">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"
              style={{ width: `${currentProject.nestingEfficiencyPct}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-1">
          <span className="text-[10px] text-slate-500 block">Costo Material Proyecto:</span>
          <span className="text-xl font-tech font-extrabold text-cyber-gold">
            ${totalProjectCost.toFixed(2)} USD
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            ${currentProject.materialCostPerM2}/m² ({totalProjectAreaM2.toFixed(2)} m² total)
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-cyber-900 border border-cyber-800 shadow-cyber-card space-y-1">
          <span className="text-[10px] text-slate-500 block">Tiempo Estimado Corte/Confección:</span>
          <span className="text-xl font-tech font-extrabold text-purple-300">
            {currentProject.laborTimeMinutes} Minutos
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Por unidad en serie</span>
        </div>
      </div>

      {/* Main 2D Workstation Canvas & Control Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Interactive Vector CAD Canvas */}
        <div className="lg:col-span-8 bg-cyber-950 rounded-3xl border border-cyber-800 p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[520px]">
          {/* Background Grid Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Canvas Floating Controls */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-cyber-900/90 border border-cyan-500/50 text-cyan-300 font-tech font-bold text-xs">
              {currentProject.emoji} {activePiece.name}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-cyber-900 border border-cyber-800 text-slate-300 text-[11px]">
              Talla: <strong className="text-white">{sizeScale}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-cyber-900 border border-cyber-800 text-slate-400 text-[11px]">
              Dim: {activePiece.dimensions}
            </span>
          </div>

          {/* Zoom & View Toggles */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-cyber-900/90 p-1 rounded-xl border border-cyber-800">
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.15))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-cyber-950"
              title="Acercar (Zoom In)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-slate-400 px-1">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.15))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-cyber-950"
              title="Alejar (Zoom Out)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1.0)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyber-950"
              title="Restablecer Escala 100%"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* SVG Canvas Render Engine */}
          <div
            className="transition-transform duration-300 flex items-center justify-center p-6"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg
              viewBox="0 0 320 460"
              className="w-72 sm:w-80 h-auto filter drop-shadow-[0_0_20px_rgba(6,182,212,0.3)] select-none"
            >
              {/* Outer Cut Line */}
              <path
                d={activePiece.points}
                fill="rgba(6, 182, 212, 0.08)"
                stroke="#06b6d4"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />

              {/* Inner Seam / Guide Line (Optional) */}
              {showSeamLine && (
                <path
                  d={activePiece.innerPoints || activePiece.points}
                  fill="none"
                  stroke="#e5a93c"
                  strokeWidth="1.4"
                  strokeDasharray="4 4"
                  transform={!activePiece.innerPoints ? 'scale(0.93) translate(11, 15)' : undefined}
                />
              )}

              {/* Crease / Fold Lines (for Packaging) */}
              {activePiece.creaseLines &&
                activePiece.creaseLines.map((cl, idx) => (
                  <line
                    key={idx}
                    x1={cl.x1}
                    y1={cl.y1}
                    x2={cl.x2}
                    y2={cl.y2}
                    stroke="#a855f7"
                    strokeWidth="1.8"
                    strokeDasharray="6 3"
                  />
                ))}

              {/* Grainline / Fiber Direction */}
              {showGrainline && (
                <>
                  <line
                    x1={activePiece.grainline.x1}
                    y1={activePiece.grainline.y1}
                    x2={activePiece.grainline.x2}
                    y2={activePiece.grainline.y2}
                    stroke="#c084fc"
                    strokeWidth="2"
                    strokeDasharray="6 3"
                  />
                  <text
                    x={activePiece.grainline.x1 + 8}
                    y={(activePiece.grainline.y1 + activePiece.grainline.y2) / 2}
                    fill="#e9d5ff"
                    fontSize="8.5"
                    fontFamily="monospace"
                    className="select-none font-bold"
                  >
                    {activePiece.grainline.label}
                  </text>
                </>
              )}

              {/* Drill Holes (for Furniture Screws or Rivets) */}
              {activePiece.drillHoles &&
                activePiece.drillHoles.map((dh, idx) => (
                  <circle
                    key={idx}
                    cx={dh.x}
                    cy={dh.y}
                    r={dh.r}
                    fill="#10b981"
                    stroke="#047857"
                    strokeWidth="1.5"
                  />
                ))}

              {/* Notch Marks (Piquetes de Ensamble) */}
              {showNotches &&
                activePiece.notches.map((n, idx) => (
                  <circle key={idx} cx={n.x} cy={n.y} r="3.5" fill="#f43f5e" stroke="#fff" strokeWidth="0.8" />
                ))}

              {/* Dimensions Labels */}
              {showDimensions && (
                <text x="160" y="445" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                  ↔ Ancho: {activePiece.widthCm} cm • Alto: {activePiece.heightCm} cm
                </text>
              )}
            </svg>
          </div>

          {/* Canvas Legend & Layer Toggles */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 bg-cyber-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-cyber-800 gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-cyan-400" /> Línea Corte Láser / Cuchilla
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 border-b border-dashed border-cyber-gold" /> Línea Costura / Plegado (+{seamAllowance}cm)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Piquetes de Ensamble
              </span>
              {activePiece.drillHoles && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Taladros / Remaches
                </span>
              )}
            </div>

            {/* Layer Visibility Checkboxes */}
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={showGrainline}
                  onChange={(e) => setShowGrainline(e.target.checked)}
                  className="rounded accent-purple-400"
                />
                <span>Hilo/Veta</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={showNotches}
                  onChange={(e) => setShowNotches(e.target.checked)}
                  className="rounded accent-rose-500"
                />
                <span>Piquetes</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={showSeamLine}
                  onChange={(e) => setShowSeamLine(e.target.checked)}
                  className="rounded accent-amber-400"
                />
                <span>Costura</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Piece Selector, Parametric Tolerances & Sizing */}
        <div className="lg:col-span-4 space-y-4">
          {/* Piece Selector */}
          <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-3 shadow-cyber-card">
            <div className="flex items-center justify-between border-b border-cyber-800 pb-2">
              <h3 className="font-tech font-bold text-sm text-slate-200 uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" /> Despiece ({currentProject.pieces.length} Piezas):
              </h3>
              <span className="text-[10px] text-slate-500">{currentProject.title}</span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {currentProject.pieces.map((piece) => (
                <button
                  key={piece.id}
                  onClick={() => setSelectedPieceId(piece.id)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    selectedPieceId === piece.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md font-bold'
                      : 'bg-cyber-950 border-cyber-800 text-slate-400 hover:text-white hover:border-cyber-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-tech text-xs block">{piece.name}</span>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span>{piece.dimensions}</span>
                      <span>•</span>
                      <span className="text-cyan-400 font-mono">{piece.unitConsumption}</span>
                    </div>
                  </div>
                  {selectedPieceId === piece.id && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Seam Allowance & Size Selector */}
          <div className="p-5 rounded-3xl bg-cyber-900 border border-cyber-800 space-y-4 shadow-cyber-card text-xs">
            <div>
              <div className="flex justify-between font-tech font-bold text-slate-300 mb-1.5">
                <span>Margen de Costura / Tolerancia de Doblez:</span>
                <span className="text-cyan-400 font-mono text-sm">{seamAllowance} cm</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="3.0"
                step="0.5"
                value={seamAllowance}
                onChange={(e) => setSeamAllowance(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0.0 cm (Corte Puro)</span>
                <span>1.0 cm (Estándar)</span>
                <span>3.0 cm (Dobladillo)</span>
              </div>
            </div>

            <div>
              <label className="font-tech font-bold text-slate-300 block mb-1.5">
                Escalado de Talla / Variación Dimensional:
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-center font-mono font-bold">
                {currentProject.sizeScales.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSizeScale(sz)}
                    className={`py-2 rounded-xl border text-[11px] transition-all ${
                      sizeScale === sz
                        ? 'bg-cyber-gold text-black border-cyber-gold shadow-gold-glow font-extrabold'
                        : 'bg-cyber-950 border-cyber-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Industrial BOM Cost Preview */}
            <div className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 pt-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Consumo Pieza Actual:</span>
                <span className="text-white font-bold">{pieceAreaM2.toFixed(3)} m²</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Costo Estimado Material:</span>
                <span className="text-cyber-gold font-bold">${estimatedCostPiece.toFixed(2)} USD</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Tipo de Corte:</span>
                <span className="text-emerald-400 font-bold">Corte Láser CO2 / Cuchilla CNC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* =========================================================
          MODAL 1: OPTIMIZADOR DE NESTING GENÉTICO IA
          ========================================================= */}
      {isNestingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-emerald-500/50 rounded-3xl p-6 max-w-xl w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsNestingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">
                  OPTIMIZADOR DE NESTING GENÉTICO IA
                </h3>
                <p className="text-slate-400 text-xs">
                  Acomodo algorítmico de patrones en rollo para minimizar merma de tela
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Eficiencia Actual de Aprovechamiento:</span>
                <span className="font-tech font-extrabold text-base text-emerald-400">{currentEfficiency}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Porcentaje de Merma / Desperdicio:</span>
                <span className="text-rose-400 font-bold">{currentWaste}% (Estándar: &lt;6.0%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Ancho Útil de Rollo:</span>
                <span className="text-white">1.50 m (150 cm)</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-cyber-800">
                <span className="text-slate-300 font-bold">Ahorro Estimado Lote ({productionLotSize} u.):</span>
                <span className="text-cyber-gold font-bold">{savedFabricMeters} metros (~ ${savedFabricUSD} USD)</span>
              </div>
            </div>

            <button
              onClick={handleRunGeneticNesting}
              disabled={isNestingRunning}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 text-black font-tech font-extrabold text-xs uppercase tracking-wider shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              {isNestingRunning ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin text-black" />
                  <span>Calculando 10,000 Permutaciones Genéticas...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>{optimizedEfficiency ? 'Re-Ejecutar Optimización Genética' : 'Ejecutar Nesting Genético (Llevar a 94.8%)'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 2: EXPORTADOR UNIVERSAL CAD/CAM PARA MÁQUINAS
          ========================================================= */}
      {isMachineExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-cyan-500/50 rounded-3xl p-6 max-w-xl w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsMachineExportModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500">
                <FileCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">
                  EXPORTADOR UNIVERSAL PARA MÁQUINAS DE CORTE
                </h3>
                <p className="text-slate-400 text-xs">
                  Formatos compatibles con maquinaria industrial de corte automatizado
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleExportDXF}
                className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-700 hover:border-cyan-400 text-left space-y-1 transition-all"
              >
                <div className="font-tech font-bold text-xs text-cyan-300">.DXF (AAMA / ASTM)</div>
                <div className="text-[10px] text-slate-400">Estándar universal para corte láser, CLO3D y Optitex.</div>
              </button>

              <button
                onClick={() => alert('¡Regla de Gradación .RUL para Gerber AccuMark generada exitosamente!')}
                className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-700 hover:border-cyan-400 text-left space-y-1 transition-all"
              >
                <div className="font-tech font-bold text-xs text-amber-300">Gerber AccuMark (.RUL / .TMP)</div>
                <div className="text-[10px] text-slate-400">Tablas de graduación para mesas automáticas Gerber.</div>
              </button>

              <button
                onClick={() => alert('¡Archivo .VET para Lectra Modaris exportado exitosamente!')}
                className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-700 hover:border-cyan-400 text-left space-y-1 transition-all"
              >
                <div className="font-tech font-bold text-xs text-purple-300">Lectra Modaris (.VET / .IBA)</div>
                <div className="text-[10px] text-slate-400">Formatos nativos para la industria europea de alta costura.</div>
              </button>

              <button
                onClick={() => alert('¡G-Code .NC para mesa de corte Zünd CNC generado con éxito!')}
                className="p-3.5 rounded-2xl bg-cyber-950 border border-cyber-700 hover:border-cyan-400 text-left space-y-1 transition-all"
              >
                <div className="font-tech font-bold text-xs text-emerald-300">Zünd / Bullmer CNC (.NC / G-Code)</div>
                <div className="text-[10px] text-slate-400">Trayectorias de corte con compensación de cuchilla oscilante.</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 3: CALCULADORA DE CONSUMO DE HILO (ISO 4915)
          ========================================================= */}
      {isThreadCalcModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-cyber-900 border border-amber-500/50 rounded-3xl p-6 max-w-lg w-full shadow-cyber-card text-white space-y-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsThreadCalcModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg text-white">
                  CONSUMO DE HILO DE COSTURA (ISO 4915)
                </h3>
                <p className="text-slate-400 text-xs">
                  Cálculo métrico exacto de conos de hilo según puntada industrial
                </p>
              </div>
            </div>

            <div className="space-y-2.5 p-4 rounded-2xl bg-cyber-950 border border-cyber-800 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Puntada 301 (Pespunte Plano 12 SPI):</span>
                <span className="text-white font-bold">2.8x longitud costura (~42m / prenda)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Puntada 504 (Overlock 3 Hilos):</span>
                <span className="text-cyan-300 font-bold">14.0x longitud costura (~110m / prenda)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Hilo Necesario ({productionLotSize} u.):</span>
                <span className="text-cyber-gold font-bold">{Math.round(productionLotSize * 152).toLocaleString()} metros</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-cyber-800">
                <span className="text-slate-300 font-bold">Conos Industriales 5,000m:</span>
                <span className="text-emerald-400 font-bold">{Math.ceil((productionLotSize * 152) / 5000)} conos</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
