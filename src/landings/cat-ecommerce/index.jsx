import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ShoppingBag, Menu, ArrowUpRight, ArrowDown } from 'lucide-react';

// Import hero cat assets
import pinkCatImg from '../../assets/cat-ecommerce/herosection cat.png';
import greenCatImg from '../../assets/cat-ecommerce/orange_cat.png';
import brownCatImg from '../../assets/cat-ecommerce/brown-cat.png';

// Import 3D Category Assets for Section 2
import puffer3D from '../../assets/cat-ecommerce/cat_puffer_3d.jpg';
import snowsuit3D from '../../assets/cat-ecommerce/cat_snowsuit_3d.jpg';
import sweater3D from '../../assets/cat-ecommerce/cat_sweater_3d.jpg';
import accessories3D from '../../assets/cat-ecommerce/cat_accessories_3d.jpg';

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

// Realistic Metallic Paperclip (Allpin) for Section 2 Cards
function Paperclip({ className = "w-8 h-12" }) {
  return (
    <svg viewBox="0 0 28 54" fill="none" className={className}>
      <defs>
        <linearGradient id="clipShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="75%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <filter id="clipShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2.5" stdDeviation="1.8" floodColor="#091e42" floodOpacity="0.32" />
        </filter>
      </defs>
      <path
        d="M14 6 C8 6, 4.5 10, 4.5 17 L4.5 38 C4.5 45, 9.5 49, 16 49 C22.5 49, 25.5 44, 25.5 37 L25.5 15 C25.5 10, 22 6, 17 6 C12 6, 9.5 10, 9.5 15 L9.5 35 C9.5 38.5, 12 41, 15 41 C18 41, 19.5 38.5, 19.5 35 L19.5 17"
        stroke="url(#clipShine)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#clipShadow)"
      />
    </svg>
  );
}

// 3 Cat Editions for Hero Section
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

// Section 2 Collection Categories (Matching reference design)
const CATEGORIES = [
  {
    id: 'jackets',
    title: 'Jackets & Coats',
    count: '12 EDITIONS',
    image: puffer3D,
    staggerClass: 'lg:translate-y-0',
    clipAngle: 'rotate-[-10deg]',
  },
  {
    id: 'overalls',
    title: 'Overalls & Suits',
    count: '8 STYLES',
    image: snowsuit3D,
    staggerClass: 'lg:translate-y-12',
    clipAngle: 'rotate-[14deg]',
  },
  {
    id: 'sweaters',
    title: 'Sweaters & Knits',
    count: '14 ITEMS',
    image: sweater3D,
    staggerClass: 'lg:translate-y-2',
    clipAngle: 'rotate-[-8deg]',
  },
  {
    id: 'accessories',
    title: 'Winter Accessories',
    count: '9 GEAR',
    image: accessories3D,
    staggerClass: 'lg:translate-y-14',
    clipAngle: 'rotate-[12deg]',
  },
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

  // Scroll wheel interceptor:
  // When at the top (scrollY < 20), cycling cats 1 -> 2 -> 3.
  // When at Cat 3, scrolling down allows smooth natural page scrolling to Section 2!
  useEffect(() => {
    let timeoutId = null;

    const handleWheel = (e) => {
      // If user has scrolled down into Section 2, let regular page scroll work naturally
      if (window.scrollY > 20) return;

      if (e.deltaY > 15) {
        // Scrolling DOWN
        const currentIdx = VARIANTS.findIndex((v) => v.id === activeVariant.id);
        if (currentIdx < VARIANTS.length - 1) {
          // Keep hero locked on screen and advance to next cat
          e.preventDefault();
          if (isScrollingRef.current) return;
          isScrollingRef.current = true;
          setDirection(1);
          setActiveVariant(VARIANTS[currentIdx + 1]);

          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            isScrollingRef.current = false;
          }, 400);
        }
        // If already on last cat (Brown cat), do NOT preventDefault! Let page scroll down to Section 2!
      } else if (e.deltaY < -15) {
        // Scrolling UP
        const currentIdx = VARIANTS.findIndex((v) => v.id === activeVariant.id);
        if (window.scrollY <= 10 && currentIdx > 0) {
          e.preventDefault();
          if (isScrollingRef.current) return;
          isScrollingRef.current = true;
          setDirection(-1);
          setActiveVariant(VARIANTS[currentIdx - 1]);

          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            isScrollingRef.current = false;
          }, 400);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(timeoutId);
    };
  }, [activeVariant]);

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

  const scrollToCategories = () => {
    const el = document.getElementById('categories-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans select-none overflow-x-hidden">

      {/* =========================================================================
          SECTION 1: HERO SHOWCASE (Matches design, 50/50 button, in-place switch)
      ========================================================================= */}
      <section className="w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-3 sm:py-4 relative">
        
        {/* Top Navigation Bar */}
        <header className="w-full px-2 sm:px-4 pt-2 pb-2 flex items-center justify-between relative z-30 flex-shrink-0">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleSelectVariant(VARIANTS[0])}
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
        <div className="relative w-full flex-1 flex flex-col items-center justify-end pb-2 pt-1 min-h-0">

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

        {/* Floating Quick Scroll Prompt to Section 2 */}
        <div className="w-full flex justify-center pt-2 pb-1 z-20">
          <button
            onClick={scrollToCategories}
            className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-slate-500 hover:text-[#ff4071] transition-colors cursor-pointer group bg-slate-50 hover:bg-pink-50 px-4 py-1.5 rounded-full border border-slate-200 hover:border-pink-200"
          >
            <span>Explore Collection Categories</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#ff4071]" />
          </button>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: COLLECTION CATEGORIES (Inspired by User's Reference Image)
          - Large rounded vibrant container
          - Top-left bold white title
          - 4 Staggered white cards pinned with realistic metallic paperclips
          - Cute 3D clay pet wear items & counter badges
      ========================================================================= */}
      <section
        id="categories-section"
        className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-20"
      >
        {/* Main Blue Rounded Banner Container (Exact style as reference image) */}
        <div className="w-full rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#1d6bf3] p-6 sm:p-10 lg:p-14 shadow-2xl shadow-blue-500/25 relative overflow-hidden">
          
          {/* Subtle Background Paw Print Watermarks */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-between p-12 pointer-events-none">
            <PawIcon className="w-64 h-64 rotate-[-20deg]" color="#ffffff" />
            <PawIcon className="w-72 h-72 rotate-[25deg]" color="#ffffff" />
          </div>

          {/* Section Header: Title in Top-Left */}
          <div className="relative z-10 mb-8 sm:mb-12">
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
              COLLECTION <br />
              CATEGORIES
            </h2>
          </div>

          {/* The 4 Staggered White Cards with Metallic Paperclips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7 items-start relative z-10 pt-4 pb-4">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.id}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className={`w-full bg-white rounded-[2rem] sm:rounded-[2.4rem] p-5 sm:p-6 shadow-xl relative flex flex-col justify-between min-h-[310px] sm:min-h-[330px] lg:min-h-[350px] cursor-pointer group border border-white/80 ${cat.staggerClass}`}
              >
                {/* Metallic Paperclip (Allpin) Pinned to Card Top Edge */}
                <div className={`absolute -top-5 right-6 z-20 pointer-events-none transform ${cat.clipAngle}`}>
                  <Paperclip className="w-7 h-11 sm:w-8 sm:h-12" />
                </div>

                {/* Card Top: Category Title */}
                <div className="pr-8">
                  <h3 className="font-display font-black text-base sm:text-lg text-slate-900 leading-tight uppercase group-hover:text-[#1d6bf3] transition-colors">
                    {cat.title}
                  </h3>
                </div>

                {/* Card Center: 3D Cute Petwear Clay Figurine Asset */}
                <div className="w-full flex-1 flex items-center justify-center my-3 relative overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-36 sm:h-40 object-contain drop-shadow-sm rounded-2xl"
                  />
                </div>

                {/* Card Bottom: Count Badge & Explore Icon */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                  <span className="bg-slate-950 text-white text-[11px] font-mono font-extrabold px-3 py-1 rounded-full shadow-sm tracking-wide">
                    {cat.count}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#1d6bf3] group-hover:text-white transition-all shadow-sm">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          MINIMAL CLEAN FOOTER
      ========================================================================= */}
      <footer className="w-full border-t border-slate-100 py-6 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500">
        <div className="flex items-center gap-2">
          <PawIcon className="w-5 h-5" color="#ff4071" />
          <span className="font-display font-black text-slate-900 tracking-tight text-sm uppercase">CATCLOTHES</span>
          <span className="text-slate-400">&bull;</span>
          <span>New Winter Collection 2026</span>
        </div>
        <div className="text-slate-400 text-[11px]">
          Luxury Weatherproof Petwear Studio &bull; All Rights Reserved
        </div>
      </footer>

    </div>
  );
}
