import React, { useState } from 'react';
import { Calendar, Share2, Plus, Clock, Play, CheckCircle2, ChevronLeft, ChevronRight, Video } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AutomoCalendar: React.FC = () => {
  const { consumeCredit } = useAuth();
  const [currentWeek, setCurrentWeek] = useState('OCTUBRE 23 - 29, 2026');

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const scheduledPosts = [
    {
      id: 1,
      day: 'Lunes',
      time: '11:00 AM',
      title: 'LAUNCH HYPE TEASER',
      platform: 'TikTok',
      color: 'border-cyber-gold bg-cyber-gold/15 text-cyber-gold',
      type: 'Video 9:16'
    },
    {
      id: 2,
      day: 'Martes',
      time: '01:30 PM',
      title: 'NEW DROP: NEO-TECH JACKET',
      platform: 'TikTok',
      color: 'border-cyan-400 bg-cyan-400/15 text-cyan-300',
      type: 'Ad Campaign'
    },
    {
      id: 3,
      day: 'Miércoles',
      time: '04:00 PM',
      title: 'COMMUNITY GIVEAWAY #01',
      platform: 'YouTube',
      color: 'border-rose-400 bg-rose-400/15 text-rose-300',
      type: 'Shorts'
    },
    {
      id: 4,
      day: 'Jueves',
      time: '02:00 PM',
      title: 'BEHIND THE SCENES 3D CEL',
      platform: 'Instagram',
      color: 'border-purple-400 bg-purple-400/15 text-purple-300',
      type: 'Reel'
    },
    {
      id: 5,
      day: 'Viernes',
      time: '03:30 PM',
      title: 'WEEKEND DROP SNEAKER X1',
      platform: 'Instagram',
      color: 'border-emerald-400 bg-emerald-400/15 text-emerald-300',
      type: 'Shop Post'
    }
  ];

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-cyber-900/90 p-4 rounded-2xl border border-cyber-700/80 shadow-cyber-card">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500 text-purple-300">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-tech font-bold text-white tracking-wide">
              AUTOMO • SOCIAL MEDIA AUTOMATION ENGINE
            </h2>
            <p className="text-xs text-slate-400">
              Multi-channel auto-scheduler for TikTok, Instagram Reels & YouTube Shorts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-cyber-950 px-3 py-1.5 rounded-xl border border-cyber-800 text-xs">
            <button className="p-1 hover:text-cyber-gold text-slate-400">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-white font-semibold">{currentWeek}</span>
            <button className="p-1 hover:text-cyber-gold text-slate-400">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => alert('¡Nueva publicación programada en la cola de Automo!')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-gold to-amber-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Programar Post</span>
          </button>
        </div>
      </div>

      {/* Grid of Calendar Days (matching mockup 3/1.jpeg) */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {days.map((day, idx) => {
          const dayPosts = scheduledPosts.filter(p => p.day === day);

          return (
            <div
              key={day}
              className="flex flex-col min-h-[360px] p-3 rounded-2xl bg-cyber-900/80 border border-cyber-800/80 space-y-3"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between pb-2 border-b border-cyber-800 text-xs">
                <span className="font-tech font-bold text-white uppercase">{day}</span>
                <span className="font-mono text-slate-500 text-[10px]">Oct {23 + idx}</span>
              </div>

              {/* Day Posts */}
              <div className="flex-1 space-y-2">
                {dayPosts.map((post) => (
                  <div
                    key={post.id}
                    className={`p-2.5 rounded-xl border ${post.color} shadow-sm space-y-1.5 cursor-pointer hover:scale-[1.02] transition-transform`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span>{post.time}</span>
                      <span className="font-bold">{post.platform}</span>
                    </div>
                    <div className="font-tech font-bold text-xs leading-snug">{post.title}</div>
                    <div className="text-[9px] flex items-center justify-between pt-1 border-t border-white/10">
                      <span>{post.type}</span>
                      <span className="text-emerald-400 flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Auto-Ready
                      </span>
                    </div>
                  </div>
                ))}

                {dayPosts.length === 0 && (
                  <div className="h-full flex items-center justify-center text-[11px] text-slate-600 border border-dashed border-cyber-800 rounded-xl">
                    Libre
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
