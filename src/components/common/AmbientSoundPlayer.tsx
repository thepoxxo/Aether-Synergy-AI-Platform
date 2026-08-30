import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Disc } from 'lucide-react';
import { ambientAudio } from '../../services/ambientAudio444Hz';

export const AmbientSoundPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const togglePlayback = () => {
    if (isPlaying) {
      ambientAudio.stop();
      setIsPlaying(false);
    } else {
      ambientAudio.start(volume);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    ambientAudio.setVolume(val);
  };

  return (
    <div className="relative flex items-center">
      <button
        onClick={togglePlayback}
        onMouseEnter={() => setShowVolumeSlider(true)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
          isPlaying
            ? 'bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border-amber-500 text-amber-400 shadow-gold-glow animate-pulse'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 dark:bg-cyber-900 dark:text-slate-300 dark:border-cyber-700'
        }`}
        title={isPlaying ? 'Pausar Música Ambiental Interestelar' : 'Activar Música Ambiental Interestelar (Hans Zimmer Style)'}
      >
        <span className={`text-xs ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
          🌌
        </span>
        <span className="hidden sm:inline">Interestelar {isPlaying ? 'ON' : 'OFF'}</span>
        {isPlaying && (
          <span className="flex gap-0.5 items-end h-3">
            <span className="w-0.5 h-2 bg-amber-400 animate-ping" />
            <span className="w-0.5 h-3 bg-amber-300 animate-pulse" />
            <span className="w-0.5 h-1.5 bg-amber-500 animate-ping" />
          </span>
        )}
      </button>

      {/* Volume Popover on Hover */}
      {showVolumeSlider && isPlaying && (
        <div
          onMouseLeave={() => setShowVolumeSlider(false)}
          className="absolute top-10 right-0 z-50 p-2.5 rounded-2xl bg-white dark:bg-cyber-900 border border-amber-500/40 shadow-xl flex items-center gap-2 animate-fadeIn"
        >
          <Volume2 className="w-3.5 h-3.5 text-amber-500" />
          <input
            type="range"
            min="0.01"
            max="0.8"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 accent-amber-500 cursor-pointer"
          />
          <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-200">
            {Math.round(volume * 100)}%
          </span>
        </div>
      )}
    </div>
  );
};
