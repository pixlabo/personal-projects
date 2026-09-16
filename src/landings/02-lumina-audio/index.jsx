import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Volume2, Sliders, ShieldCheck, BatteryCharging, Radio,
  Sparkles, Check, ChevronRight, Play, Award, Zap
} from 'lucide-react';

export const metadata = {
  title: 'Lumina Spatial Audio',
  category: 'Consumer Tech / 3D Audio',
  description: 'Lossless spatial acoustics with active neural noise cancellation',
  tag: 'Product'
};

const COLORS = [
  { name: 'Obsidian Noir', hex: '#0a0a0f', accent: '#00f2fe', imageText: 'Noir Edition' },
  { name: 'Starlight Platinum', hex: '#e2e8f0', accent: '#a855f7', imageText: 'Platinum Edition' },
  { name: 'Aurora Emerald', hex: '#064e3b', accent: '#10b981', imageText: 'Emerald Limited' },
];

export default function LuminaAudioLanding() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const triggerOrder = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#00f2fe', '#a855f7', '#f59e0b'],
    });
  };

  return (
    <div className="min-h-screen bg-[#06070a] text-slate-100 selection:bg-purple-500/20 selection:text-purple-400 overflow-hidden relative">
      {/* Dynamic Background Glow reacting to selected color */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: selectedColor.accent }}
      />

      {/* Nav */}
      <header className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between relative z-10 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg">
            <Radio className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold tracking-widest text-sm uppercase text-white">
            LUMINA <span className="font-light text-slate-400">ONE</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full hidden sm:inline-block">
            IN STOCK &bull; SHIPS TODAY
          </span>
          <button
            onClick={triggerOrder}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-200 transition-all"
          >
            Pre-Order $399
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-16 pb-24 relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-6">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Award Winner: Best Spatial Acoustics 2026</span>
        </div>

        <h1 className="text-4xl sm:text-7xl font-black tracking-tight leading-[1.05] mb-6">
          Sound Reimagined in <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
            True 3D Space
          </span>
        </h1>

        <p className="text-slate-400 max-w-2xl text-base sm:text-lg mb-12">
          Custom beryllium acoustic drivers combined with neural spatial head-tracking. Experience lossless audio that moves naturally around you.
        </p>

        {/* 3D Product Mockup Showcase */}
        <div className="w-full max-w-4xl relative mb-12">
          <div className="relative aspect-[16/9] max-h-[460px] rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-white/10 p-8 flex flex-col items-center justify-center overflow-hidden shadow-2xl">
            {/* Animated Sound Frequency Waves */}
            <div className="flex items-center gap-1.5 h-24 mb-6">
              {[20, 45, 75, 30, 90, 60, 100, 40, 85, 55, 70, 95, 35, 80, 50, 65, 30].map((height, i) => (
                <motion.div
                  key={i}
                  animate={{ height: isPlayingSound ? [`${height}%`, `${Math.max(15, 100 - height)}%`, `${height}%`] : '20%' }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.05 }}
                  className="w-1.5 rounded-full transition-colors duration-500"
                  style={{ backgroundColor: selectedColor.accent }}
                />
              ))}
            </div>

            {/* Central Product Badge */}
            <div className="text-center space-y-2 relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                Selected Finish
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Lumina Spatial X &bull; {selectedColor.name}
              </h3>
            </div>

            {/* Play Sound Preview Button */}
            <button
              onClick={() => setIsPlayingSound(!isPlayingSound)}
              className="mt-6 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white flex items-center gap-2 backdrop-blur-md transition-all"
            >
              <Play className={`w-3.5 h-3.5 ${isPlayingSound ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isPlayingSound ? 'Pause Spatial Audio' : 'Preview 3D Soundstage'}</span>
            </button>
          </div>
        </div>

        {/* Color Palette Selector */}
        <div className="flex flex-col items-center gap-3 mb-16">
          <span className="text-xs font-mono uppercase text-slate-400">Choose Your Finish</span>
          <div className="flex items-center gap-3 p-2 rounded-full bg-white/5 border border-white/10">
            {COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedColor.name === c.name
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/40 shadow"
                  style={{ backgroundColor: c.accent }}
                />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Spec Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full text-left">
          {[
            { icon: BatteryCharging, title: '60-Hour Battery', desc: 'Fast charge: 15 min for 8 hrs playback' },
            { icon: Sliders, title: 'Beryllium Drivers', desc: 'Ultra-rigid 45mm custom diamond tuned' },
            { icon: Volume2, title: 'Neural ANC 3.0', desc: 'Real-time noise cancellation up to -48dB' },
            { icon: ShieldCheck, title: 'Titanium Frame', desc: 'Aircraft-grade lightweight luxury comfort' },
          ].map((spec, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <spec.icon className="w-5 h-5 text-slate-300" />
              <h4 className="font-semibold text-white text-sm">{spec.title}</h4>
              <p className="text-xs text-slate-400">{spec.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-500 pb-24">
        Lumina Audio Inc. • Designed for pure high-fidelity 3D listening
      </footer>
    </div>
  );
}
