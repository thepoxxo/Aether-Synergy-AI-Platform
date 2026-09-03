import React, { useState } from 'react';
import {
  Award,
  Video,
  Star,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign
} from 'lucide-react';
import { useDeviceMode } from '../../context/DeviceModeContext';

export const MobileExpertConsultations: React.FC = () => {
  const { hapticFeedback } = useDeviceMode();

  const experts = [
    {
      id: 1,
      name: 'Dra. Valérie Dupont',
      title: 'Directora de Patronaje & Escalado CAD',
      institution: 'Institut Français de la Mode (París)',
      rating: 5.0,
      reviews: 48,
      rateUSD: '$85 / hora',
      specialty: 'Auditoría de moldería para producción en masa y reducción de mermas.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Ing. Marco Bellini',
      title: 'Perito Textil & Ensayos Físico-Químicos',
      institution: 'Politecnico di Milano (Italia)',
      rating: 4.9,
      reviews: 62,
      rateUSD: '$95 / hora',
      specialty: 'Ensayos de solidez de color, urdimbre y compensación de encogimiento.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] bg-cyber-950 text-white font-mono text-xs select-none p-3 space-y-3 overflow-y-auto">
      {/* Top Banner */}
      <div className="p-3 bg-cyber-900 border border-cyber-gold/40 rounded-2xl">
        <span className="text-[10px] text-cyber-gold font-bold uppercase block">CONSULTORÍA & MENTORÍA 1-ON-1</span>
        <h3 className="font-tech font-bold text-sm text-white">Expertos Certificados & Peritaje</h3>
      </div>

      {/* Single-Column Expert Cards */}
      <div className="space-y-3">
        {experts.map((exp) => (
          <div key={exp.id} className="bg-cyber-900 border border-cyber-800 rounded-2xl p-3.5 space-y-2.5 shadow-md">
            <div className="flex items-center gap-3">
              <img src={exp.avatar} alt={exp.name} className="w-12 h-12 rounded-2xl object-cover border-2 border-cyber-gold" />
              <div>
                <h4 className="font-tech font-bold text-sm text-white">{exp.name}</h4>
                <span className="text-[10px] text-cyber-gold block">{exp.title}</span>
                <span className="text-[9px] text-slate-400">{exp.institution}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 font-sans">{exp.specialty}</p>

            <div className="flex items-center justify-between text-[10px] bg-cyber-950 p-2 rounded-xl border border-cyber-800">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{exp.rating} ({exp.reviews} reseñas)</span>
              </div>
              <strong className="text-cyber-gold font-tech font-bold text-xs">{exp.rateUSD}</strong>
            </div>

            <button
              onClick={() => {
                hapticFeedback();
                alert('¡Sala virtual 3D generada: meet.aethersynergy.ai/room-' + exp.id + '!');
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-tech font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg"
            >
              <Video className="w-4 h-4" />
              <span>Agendar Videollamada 3D</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
