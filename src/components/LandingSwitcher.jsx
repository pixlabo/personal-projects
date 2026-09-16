import { useState, useEffect } from 'react';
import { Layers, ChevronUp, ChevronDown, Sparkles, Plus, ExternalLink, X, Eye, EyeOff, Search, Compass } from 'lucide-react';

export default function LandingSwitcher({ landings, activeId, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  const activeLanding = landings.find((l) => l.id === activeId) || landings[0];

  const filteredLandings = landings.filter(
    (l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Keyboard shortcut Ctrl+K to toggle switcher
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setShowGuide(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isHidden) {
    return (
      <button
        onClick={() => setIsHidden(false)}
        className="fixed bottom-4 right-4 z-50 p-2.5 rounded-full bg-slate-900/90 border border-brand-cyan/40 text-brand-cyan shadow-glow-cyan hover:scale-110 transition-all duration-300 backdrop-blur-md group"
        title="Show Page Switcher (Ctrl+K)"
      >
        <Layers className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  return (
    <>
      {/* Floating Bottom Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 px-3 rounded-full bg-slate-950/80 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/80 ring-1 ring-white/5 transition-all">
        {/* Pulsing indicator */}
        <div className="flex items-center gap-2 pl-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-cyan"></span>
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Page:</span>
        </div>

        {/* Current Active Page Pill / Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-white transition-all group"
        >
          <span className="text-brand-cyan truncate max-w-[140px] sm:max-w-[200px]">
            {activeLanding?.title || 'Select Landing'}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-purple/30 text-purple-300 font-normal">
            {activeLanding?.category || 'Demo'}
          </span>
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          ) : (
            <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          )}
        </button>

        {/* New Page Guide Trigger */}
        <button
          onClick={() => setShowGuide(true)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 hover:from-brand-cyan/30 hover:to-brand-purple/30 border border-brand-cyan/30 text-xs font-medium text-brand-cyan transition-all"
          title="How to create a new landing page"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Page</span>
        </button>

        {/* Hide Switcher Button */}
        <button
          onClick={() => setIsHidden(true)}
          className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Hide Dock (click button in bottom right to restore)"
        >
          <EyeOff className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Switcher Modal Dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-xl max-h-[85vh] flex flex-col rounded-2xl bg-slate-900/95 border border-white/15 backdrop-blur-2xl shadow-2xl shadow-brand-cyan/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base">Landing Pages Hub</h3>
                  <p className="text-xs text-slate-400">
                    Switch between your landing pages instantly ({landings.length} detected)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-white/10">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter landing pages by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/50 transition-all"
                />
              </div>
            </div>

            {/* Landing Pages List */}
            <div className="p-3 overflow-y-auto space-y-2 max-h-[50vh]">
              {filteredLandings.map((page) => {
                const isSelected = page.id === activeId;
                return (
                  <button
                    key={page.id}
                    onClick={() => {
                      onSelect(page.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-brand-cyan/10 border-brand-cyan/40 shadow-glow-cyan/20'
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white group-hover:text-brand-cyan transition-colors">
                          {page.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                          {page.category}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 font-semibold">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {page.description}
                      </p>
                      <p className="text-[11px] font-mono text-slate-500">
                        {page.path}
                      </p>
                    </div>
                    <div className="pl-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 group-hover:bg-brand-cyan group-hover:text-slate-950 transition-all">
                        {isSelected ? 'Viewing' : 'Launch'}
                      </span>
                    </div>
                  </button>
                );
              })}

              {filteredLandings.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">
                  No landing pages matched &quot;{searchQuery}&quot;
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 border-t border-white/10 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Press Esc to close • Ctrl+K to toggle</span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowGuide(true);
                }}
                className="text-brand-cyan hover:underline flex items-center gap-1 font-medium"
              >
                <Sparkles className="w-3.5 h-3.5" />
                How to add a new page?
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal: How to create a new landing page */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-brand-cyan/30 p-6 shadow-2xl shadow-brand-cyan/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand-cyan font-bold text-lg">
                <Sparkles className="w-5 h-5" />
                <h3>How to Add a New Landing Page</h3>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-300">
              Aapko baar-baar naya project ya `npm install` karne ki bilkul zaroorat nahi hai! Bas in 2 simple steps ko follow karein:
            </p>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                <span className="text-brand-cyan font-semibold">Step 1: Create a file in `src/landings/`</span>
                <p className="text-slate-400 font-sans">
                  Example: create <code className="text-purple-300">src/landings/LuxuryWatch.jsx</code> or duplicate <code className="text-purple-300">StarterTemplate.jsx</code>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-2">
                <span className="text-brand-cyan font-semibold">Step 2: Export your component & optional metadata</span>
                <pre className="text-slate-300 overflow-x-auto text-[11px] p-2 bg-black/40 rounded">
{`export const metadata = {
  title: "Luxury Timepieces",
  category: "E-Commerce",
  description: "3D Chronograph Showcase"
};

export default function LuxuryWatch() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1>My New Landing Page</h1>
    </div>
  );
}`}
                </pre>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-xs text-brand-cyan flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>
                <strong>Voila!</strong> Nayi file save hote hi wo automatically is switcher menu me show ho jayegi!
              </span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowGuide(false)}
                className="px-4 py-2 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all"
              >
                Samajh Gaya (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
