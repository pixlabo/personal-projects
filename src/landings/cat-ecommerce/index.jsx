import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ShoppingBag, Menu } from 'lucide-react';

// Import assets (verified existing PNGs)
import pinkCatImg from '../../assets/cat-ecommerce/herosection cat.png';
import greenCatImg from '../../assets/cat-ecommerce/orange_cat.png';
import brownCatImg from '../../assets/cat-ecommerce/brown-cat.png';

export const metadata = {
  title: 'Cat Clothes — Winter Collection',
  category: 'Fashion E-Commerce',
  description: 'Luxury winter collection for pets with high-performance insulation',
  tag: 'Featured'
};

// Paw Icon Component
function PawIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <ellipse cx="5.5" cy="8.5" rx="2" ry="2.8" transform="rotate(-20 5.5 8.5)" />
      <ellipse cx="10" cy="5" rx="2" ry="3" />
      <ellipse cx="14" cy="5" rx="2" ry="3" />
      <ellipse cx="18.5" cy="8.5" rx="2" ry="2.8" transform="rotate(20 18.5 8.5)" />
      <path d="M7.2 13.5C7.2 11.5 9 10.5 12 10.5C15 10.5 16.8 11.5 16.8 13.5C16.8 16 19 17.5 18 19.5C17 21.5 14.5 20.8 12 21C9.5 20.8 7 21.5 6 19.5C5 17.5 7.2 16 7.2 13.5Z" />
    </svg>
  );
}

const VARIANTS = [
  {
    id: 'pink',
    name: 'Blush Sakura',
    image: pinkCatImg,
    accentColor: '#ff4071',
    cardBg: '#fbcfe8',
    material: '100% POLYESTER',
    lining: '100% NYLON',
    insulation: '70% DOWN, 30% FEATHER',
    thumbBg: 'bg-[#fbcfe8]',
  },
  {
    id: 'green',
    name: 'Alpine Forest',
    image: greenCatImg,
    accentColor: '#059669',
    cardBg: '#d1fae5',
    material: '100% RIPSTOP NYLON',
    lining: '100% THERMAL FLEECE',
    insulation: '80% DOWN, 20% FEATHER',
    thumbBg: 'bg-[#d1fae5]',
  },
  {
    id: 'brown',
    name: 'Solar Amber',
    image: brownCatImg,
    accentColor: '#92400e',
    cardBg: '#ffedd5',
    material: '100% QUILTED MICROFIBER',
    lining: '100% FLEECE SATIN',
    insulation: '85% DOWN, 15% FEATHER',
    thumbBg: 'bg-[#ffedd5]',
  }
];

export default function CatEcommerceLanding() {
  const [activeVariant, setActiveVariant] = useState(VARIANTS[0]);
  const [direction, setDirection] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const isScrollingRef = useRef(false);

  // Switch cat helper with directional tracking
  const handleSelectVariant = (variant) => {
    const currentIdx = VARIANTS.findIndex((v) => v.id === activeVariant.id);
    const newIdx = VARIANTS.findIndex((v) => v.id === variant.id);
    setDirection(newIdx > currentIdx ? 1 : -1);
    setActiveVariant(variant);
  };

  // Scroll wheel interceptor to cycle through cats smoothly
  useEffect(() => {
    let timeoutId = null;

    const handleWheel = (e) => {
      // Prevent page scrolling so the hero stays locked on screen
      e.preventDefault();

      if (isScrollingRef.current) return;
      if (Math.abs(e.deltaY) < 15) return; // ignore micro jitters

      isScrollingRef.current = true;

      if (e.deltaY > 0) {
        // Scroll DOWN -> next cat
        setDirection(1);
        setActiveVariant((curr) => {
          const idx = VARIANTS.findIndex((v) => v.id === curr.id);
          return VARIANTS[(idx + 1) % VARIANTS.length];
        });
      } else {
        // Scroll UP -> previous cat
        setDirection(-1);
        setActiveVariant((curr) => {
          const idx = VARIANTS.findIndex((v) => v.id === curr.id);
          return VARIANTS[(idx - 1 + VARIANTS.length) % VARIANTS.length];
        });
      }

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isScrollingRef.current = false;
      }, 420); // 420ms cooldown for smooth, controlled cycling
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);

    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6, x: 0.8 },
      colors: [activeVariant.accentColor, '#f472b6', '#ffffff', '#fb7185'],
    });
  };

  return (
    <div className="w-full h-screen min-h-[640px] max-h-screen bg-white text-slate-900 flex flex-col justify-between overflow-hidden font-sans select-none">

      {/* Top Navigation Bar - Matching Design */}
      <header className="w-full px-6 sm:px-12 lg:px-16 pt-4 pb-2 flex items-center justify-between relative z-30 flex-shrink-0">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setActiveVariant(VARIANTS[0])}
        >
          <div className="text-[#ff4071] group-hover:scale-110 transition-transform">
            <PawIcon className="w-7 h-7" color="#ff4071" />
          </div>
          <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-slate-950 uppercase">
            CATCLOTHES
          </span>
        </div>

        {/* Exact Desktop Navigation Links from design */}
        <nav className="hidden xl:flex items-center gap-7 2xl:gap-10 text-[11px] font-extrabold tracking-wider uppercase text-slate-800">
          <button className="hover:text-[#ff4071] transition-colors cursor-pointer uppercase">
            JACKETS AND COATS
          </button>
          <button className="hover:text-[#ff4071] transition-colors cursor-pointer uppercase">
            OVERALLS AND SUITS
          </button>
          <button className="hover:text-[#ff4071] transition-colors cursor-pointer uppercase">
            T-SHIRTS AND SWEATERS
          </button>
          <button className="hover:text-[#ff4071] transition-colors cursor-pointer uppercase">
            ACCESSORIES
          </button>
          <button className="hover:text-[#ff4071] transition-colors cursor-pointer uppercase">
            SPECIAL OCCASION OUTFITS
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Cart Button */}
          <button
            onClick={handleAddToCart}
            className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#ff4071] hover:bg-[#e11d48] text-white shadow-md shadow-pink-400/30 transition-all transform active:scale-95 cursor-pointer"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm">
              {cartCount}
            </span>
          </button>

          {/* Menu Button */}
          <button
            className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#ff4071] hover:bg-[#e11d48] text-white shadow-md shadow-pink-400/30 transition-all transform active:scale-95 cursor-pointer"
            title="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Hero Showcase Stage */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-end px-4 sm:px-8 lg:px-12 pb-4 pt-1 min-h-0">

        {/* Giant Headline (Behind the cat) */}
        <div className="w-full text-center relative z-10 pointer-events-none mb-[-3vw] sm:mb-[-4vw] lg:mb-[-5vw] flex-shrink-0">
          <h1 className="font-display font-black tracking-tighter text-[11vw] sm:text-[9.5vw] lg:text-[7.6vw] 2xl:text-[7.2rem] leading-[0.88] uppercase flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            <span className="text-[#ff4071]">NEW</span>
            <span className="text-[#0a1128]">WINTER COLLECTION</span>
          </h1>
        </div>

        {/* Center Arena (Cat + Bottom Pink Container Card) */}
        <div className="relative w-full max-w-[1600px] flex-1 flex items-end justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">

          {/* Card Container Wrapper */}
          <div className="relative w-full h-[280px] sm:h-[350px] lg:h-[400px]">
            {/* Bottom Rounded Color Card Container */}
            <div
              className="w-full h-full rounded-[2.5rem] sm:rounded-[3.2rem] transition-colors duration-500 shadow-sm relative overflow-hidden"
              style={{ backgroundColor: activeVariant.cardBg }}
            >
              {/* Subtle decorative paw prints watermark in background */}
              <div className="absolute inset-0 opacity-15 flex items-center justify-between p-8 pointer-events-none">
                <PawIcon className="w-24 h-24 rotate-[-15deg]" color={activeVariant.accentColor} />
                <PawIcon className="w-32 h-32 rotate-[25deg]" color={activeVariant.accentColor} />
              </div>
            </div>

            {/* Circular Hot Pink "ADD TO CART" Button: Exactly 50% outside, 50% inside the card's top edge */}
            <div className="absolute top-0 -translate-y-1/2 right-8 sm:right-14 lg:right-24 z-30">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleAddToCart}
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-[#ff4071] hover:bg-[#e11d48] text-white shadow-2xl shadow-pink-500/40 flex flex-col items-center justify-center p-2 group transition-colors border-[6px] sm:border-8 border-white cursor-pointer"
              >
                <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 mb-1 group-hover:-translate-y-1 transition-transform" color="#ffffff" />
                <span className="font-display font-black text-xs sm:text-sm tracking-wider uppercase leading-tight">
                  {isAdded ? 'ADDED!' : 'ADD TO CART'}
                </span>
              </motion.button>
            </div>
          </div>

          {/* Bottom Right Vertical Thumbnail Variant Cards (Switches in-place with ZERO page scroll) */}
          <div className="absolute right-6 sm:right-10 lg:right-12 bottom-4 sm:bottom-6 z-30 flex flex-col gap-3">
            {VARIANTS.filter((v) => v.id !== activeVariant.id).map((variant) => (
              <motion.button
                key={variant.id}
                whileHover={{ scale: 1.08, x: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectVariant(variant)}
                className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl sm:rounded-3xl p-1.5 shadow-lg border-2 border-white overflow-hidden relative group transition-all cursor-pointer ${variant.thumbBg}`}
                title={`Switch to ${variant.name}`}
              >
                <img
                  src={variant.image}
                  alt={variant.name}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors rounded-xl" />
              </motion.button>
            ))}
          </div>

          {/* Central Cat Hero Cutout Image */}
          <div className="absolute bottom-0 z-20 flex flex-col items-center justify-end w-full max-w-[640px] sm:max-w-[700px] lg:max-w-[760px] pointer-events-none">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={activeVariant.id}
                custom={direction}
                src={activeVariant.image}
                alt="Cat in Ski Goggles and Winter Jacket"
                variants={{
                  enter: (dir) => ({
                    opacity: 0,
                    x: dir > 0 ? 70 : -70,
                    scale: 0.95,
                  }),
                  center: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                  },
                  exit: (dir) => ({
                    opacity: 0,
                    x: dir > 0 ? -70 : 70,
                    scale: 0.95,
                    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full max-h-[480px] sm:max-h-[580px] lg:max-h-[660px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
              />
            </AnimatePresence>

            {/* Floating Material Spec Badges (Overlaid on Jacket) */}
            {/* Badge 1: MAIN MATERIAL (Left) */}
            <motion.div
              key={`mat-${activeVariant.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute left-[3%] sm:left-[8%] bottom-[16%] sm:bottom-[18%] z-30 pointer-events-auto backdrop-blur-md bg-white/85 border border-white/70 shadow-lg shadow-pink-900/5 rounded-2xl p-2.5 sm:p-3.5 min-w-[130px] sm:min-w-[160px] text-left hover:scale-105 transition-transform"
            >
              <div className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#ff4071]">
                MAIN MATERIAL
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900 font-sans tracking-tight">
                {activeVariant.material}
              </div>
            </motion.div>

            {/* Badge 2: LINING (Center-Right near zipper) */}
            <motion.div
              key={`lin-${activeVariant.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="absolute right-[22%] sm:right-[26%] bottom-[28%] sm:bottom-[30%] z-30 pointer-events-auto backdrop-blur-md bg-white/85 border border-white/70 shadow-lg shadow-pink-900/5 rounded-2xl p-2.5 sm:p-3 min-w-[110px] sm:min-w-[130px] text-left hover:scale-105 transition-transform"
            >
              <div className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#ff4071]">
                LINING
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900 font-sans tracking-tight">
                {activeVariant.lining}
              </div>
            </motion.div>

            {/* Badge 3: INSULATION (Right) */}
            <motion.div
              key={`ins-${activeVariant.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute right-[3%] sm:right-[8%] bottom-[12%] sm:bottom-[14%] z-30 pointer-events-auto backdrop-blur-md bg-white/85 border border-white/70 shadow-lg shadow-pink-900/5 rounded-2xl p-2.5 sm:p-3.5 min-w-[140px] sm:min-w-[170px] text-left hover:scale-105 transition-transform"
            >
              <div className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#ff4071]">
                INSULATION
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-900 font-sans tracking-tight">
                {activeVariant.insulation}
              </div>
            </motion.div>
          </div>

        </div>
      </div>

    </div>
  );
}
