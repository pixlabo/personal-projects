import { useState, useEffect, useMemo } from 'react';
import { getAllLandings } from './landings/registry';
import LandingSwitcher from './components/LandingSwitcher';
import Canvas3DBackground from './components/Canvas3DBackground';

export default function App() {
  const landings = useMemo(() => getAllLandings(), []);

  // Initialize active page from URL query param ?page=... or default to cat-ecommerce
  const [activeId, setActiveId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = params.get('page');
    if (pageFromUrl && landings.some((l) => l.id.toLowerCase() === pageFromUrl.toLowerCase())) {
      return pageFromUrl;
    }
    // Prioritize cat-ecommerce as default landing page
    const catPage = landings.find((l) => l.id === 'cat-ecommerce');
    if (catPage) return catPage.id;
    return landings[0]?.id || '';
  });

  // Keep URL search params in sync with active page
  const handleSelectPage = (id) => {
    setActiveId(id);
    const url = new URL(window.location);
    url.searchParams.set('page', id);
    window.history.pushState({}, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page');
      if (page && landings.some((l) => l.id.toLowerCase() === page.toLowerCase())) {
        setActiveId(page);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [landings]);

  const currentLanding = landings.find((l) => l.id === activeId) || landings[0];
  const ActiveComponent = currentLanding?.component;
  const isLightPage = currentLanding?.id === 'cat-ecommerce';

  return (
    <div className={`min-h-screen relative transition-colors duration-500 ${isLightPage ? 'bg-white text-slate-900' : 'bg-[#040711] text-slate-100'}`}>
      {/* 3D Particle Canvas only on dark futuristic landing pages */}
      {!isLightPage && <Canvas3DBackground />}

      {/* Render Active Landing Page */}
      <div className="relative z-10">
        {ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <div className="min-h-screen flex items-center justify-center p-6 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">No Landing Page Found</h2>
              <p className="text-slate-400">
                Please add a landing page file inside <code className="text-brand-cyan">src/landings/</code>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Page Switcher Dock */}
      <LandingSwitcher
        landings={landings}
        activeId={activeId}
        onSelect={handleSelectPage}
      />
    </div>
  );
}
