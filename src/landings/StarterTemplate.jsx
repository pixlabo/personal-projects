import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';

export const metadata = {
  title: 'Starter Landing Template',
  category: 'Starter Boilerplate',
  description: 'Clean pre-configured starter canvas with Framer Motion & Tailwind',
  tag: 'Template'
};

export default function StarterTemplate() {
  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 flex flex-col justify-between selection:bg-brand-cyan/20 selection:text-brand-cyan relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-brand-cyan/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center shadow-glow-cyan/50">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            BrandCanvas
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Documentation
          </button>
          <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/15 border border-white/15 transition-all">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="w-full max-w-5xl mx-auto px-6 py-20 flex-1 flex flex-col items-center text-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-semibold mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Duplicate this file to start your next landing page</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
        >
          Build Your Next <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan via-blue-400 to-brand-purple">
            Stunning Experience
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-base sm:text-lg text-slate-400 mb-10 leading-relaxed"
        >
          This is your pre-wired template. Edit this file or duplicate it into a new name like <code className="text-brand-cyan bg-slate-900 px-2 py-0.5 rounded">CyberShoes.jsx</code> to build completely independent landing page concepts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-cyan to-blue-600 text-slate-950 font-bold hover:shadow-glow-cyan transition-all flex items-center justify-center gap-2 group">
            <span>Explore Features</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 font-semibold text-slate-200 transition-all">
            View Live Demo
          </button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 w-full text-left"
        >
          {[
            {
              icon: Zap,
              title: 'Lightning Fast',
              desc: 'Vite instant hot reload with zero lag during your design iterations.',
            },
            {
              icon: ShieldCheck,
              title: 'Modular Layout',
              desc: 'Framer Motion spring physics and tailored Tailwind utility styling.',
            },
            {
              icon: Globe,
              title: 'Shareable URLs',
              desc: 'Easily demo individual landing pages by URL query parameters.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-xl hover:border-brand-cyan/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cyan mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base mb-1">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-8 text-center text-xs text-slate-500 relative z-10 pb-24">
        Created for Multi-Landing Page Design Showcase • React + Tailwind + Framer Motion
      </footer>
    </div>
  );
}
