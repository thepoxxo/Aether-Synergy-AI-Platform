import React from 'react';
import { Linkedin, Twitter, Instagram, Youtube, MessageSquare } from 'lucide-react';

interface Screen4AboutProps {
  onGetStarted: () => void;
}

export const Screen4About: React.FC<Screen4AboutProps> = ({ onGetStarted }) => {
  return (
    <section id="about-section" className="relative min-h-[90vh] py-20 px-4 lg:px-8 cyber-grid flex flex-col justify-between border-t border-cyber-800/80">
      <div className="max-w-5xl mx-auto w-full relative z-10 space-y-6">
        {/* 1. Main About Us Glass Panel (Exact Image 4) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-cyber-900/90 border border-cyber-gold/40 shadow-gold-glow-lg text-center relative overflow-hidden backdrop-blur-2xl">
          <h2 className="text-2xl sm:text-3xl font-tech font-extrabold text-cyber-gold tracking-widest uppercase mb-4">
            ABOUT US
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl mx-auto font-sans">
            <strong className="text-white">WHO WE ARE:</strong> Aura Dynamics is a cutting-edge digital marketing platform leveraging predictive AI, advanced analytics, and automated workflows to revolutionize brand growth in the digital landscape. We empower forward-thinking businesses to optimize outreach, capture audiences, and dominate markets through innovative, data-driven strategies.
          </p>
        </div>

        {/* 2. Dual Connect & Get Started Grid (Exact Image 4) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Left: CONNECT Card */}
          <div className="md:col-span-2 p-6 rounded-3xl bg-cyber-900/90 border border-cyber-700/80 shadow-md flex flex-col justify-center">
            <span className="font-tech font-bold text-xs uppercase tracking-widest text-white mb-3">
              CONNECT
            </span>

            <div className="flex items-center gap-4">
              <a href="#" className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-700 text-cyber-gold hover:text-white hover:border-cyber-gold transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-700 text-cyber-gold hover:text-white hover:border-cyber-gold transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-700 text-cyber-gold hover:text-white hover:border-cyber-gold transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-700 text-cyber-gold hover:text-white hover:border-cyber-gold transition-all">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-cyber-950 border border-cyber-700 text-cyber-gold hover:text-white hover:border-cyber-gold transition-all">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right: GET STARTED Card */}
          <div className="p-6 rounded-3xl bg-cyber-900/90 border border-cyber-gold/40 shadow-gold-glow flex flex-col justify-center text-center">
            <span className="font-tech font-bold text-xs uppercase tracking-widest text-white mb-3">
              GET STARTED
            </span>

            <button
              onClick={onGetStarted}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyber-gold to-amber-500 text-black font-tech font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all"
            >
              Get Started Free
            </button>
          </div>
        </div>

        {/* 3. Footer Links with Anime Mascot representation (Exact Image 4) */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-cyber-800/80 text-xs text-slate-400">
          {/* Mascot icon */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-cyber-950 border border-cyber-gold flex items-center justify-center text-2xl shadow-gold-glow">
              👦⚡
            </div>
          </div>

          {/* Links 3 columns */}
          <div className="grid grid-cols-3 gap-8 text-center sm:text-left">
            <div>
              <span className="font-tech font-bold text-white uppercase text-[11px] block mb-2">PLATFORM</span>
              <ul className="space-y-1 text-[11px] text-slate-400">
                <li>Features</li>
                <li>AI Tools</li>
                <li>Workflow</li>
                <li>API</li>
              </ul>
            </div>

            <div>
              <span className="font-tech font-bold text-white uppercase text-[11px] block mb-2">COMPANY</span>
              <ul className="space-y-1 text-[11px] text-slate-400">
                <li>About</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>

            <div>
              <span className="font-tech font-bold text-white uppercase text-[11px] block mb-2">RESOURCES</span>
              <ul className="space-y-1 text-[11px] text-slate-400">
                <li>Blog</li>
                <li>Guides</li>
                <li>Support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-[10px] text-slate-500 pt-4">
          © 2026 Aura Dynamics. All Rights Reserved. Privacy Policy | Terms of Service.
        </div>
      </div>
    </section>
  );
};
