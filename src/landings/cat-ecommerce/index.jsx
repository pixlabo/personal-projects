import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ShoppingBag, Menu, ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

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

// Section: Velocity Pet Performance Club (Matching user's reference design)
const CLUB_ITEMS = [
  {
    id: 'pink',
    tag: 'Outdoor area',
    secondaryTag: 'Indoor',
    title: 'Versatile space for a wide range of activities',
    previewTitle: 'Futsal court',
    editionName: 'Blush Sakura Edition',
    catName: 'Sakura Ski Cat',
    image: pinkCatImg,
    jacketColor: '#ff4071',
    // Background gradient precisely matching herosection cat.png's pink puffer jacket:
    cardBgGradient: 'linear-gradient(155deg, #ffaec6 0%, #ff4071 46%, #b91c47 100%)',
    description: 'Explore the ideal space to play, train, and reach new heights. Where passion meets feline winter endurance.',
  },
  {
    id: 'green',
    tag: 'Alpine Slope',
    secondaryTag: 'Indoor arena',
    title: 'Versatile space for high-altitude snow agility',
    previewTitle: 'Alpine track',
    editionName: 'Alpine Forest Edition',
    catName: 'Alpine Forest Cat',
    image: greenCatImg,
    jacketColor: '#059669',
    // Background gradient matching green cat jacket:
    cardBgGradient: 'linear-gradient(155deg, #86efac 0%, #059669 46%, #064e3b 100%)',
    description: 'Engineered with ripstop insulation and thermal flex lining. Built for sub-zero agility and high-fashion winter expeditions.',
  },
  {
    id: 'brown',
    tag: 'Lodge Terrace',
    secondaryTag: 'Chalet lounge',
    title: 'Versatile space for mountain trail & chalet living',
    previewTitle: 'Terrace court',
    editionName: 'Solar Amber Edition',
    catName: 'Solar Amber Cat',
    image: brownCatImg,
    jacketColor: '#92400e',
    // Background gradient matching brown cat jacket:
    cardBgGradient: 'linear-gradient(155deg, #fcd34d 0%, #b45309 46%, #78350f 100%)',
    description: 'Iconic retro chevron bomber with thermal down fill. Unmatched warmth crafted for cold mornings and alpine summits.',
  },
];

export default function CatEcommerceLanding() {
  const [activeVariant, setActiveVariant] = useState(VARIANTS[0]);
  const [direction, setDirection] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const isScrollingRef = useRef(false);

  // Velocity Club Carousel state
  const [activeClubIndex, setActiveClubIndex] = useState(0);

  const handleNextClub = () => {
    setActiveClubIndex((prev) => (prev + 1) % CLUB_ITEMS.length);
  };

  const handlePrevClub = () => {
    setActiveClubIndex((prev) => (prev - 1 + CLUB_ITEMS.length) % CLUB_ITEMS.length);
  };

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
            onClick={() => {
              const el = document.getElementById('velocity-club-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-slate-500 hover:text-[#ff4071] transition-colors cursor-pointer group bg-slate-50 hover:bg-pink-50 px-4 py-1.5 rounded-full border border-slate-200 hover:border-pink-200"
          >
            <span>Explore Velocity Club</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#ff4071]" />
          </button>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: VELOCITY PET CLUB SHOWCASE (Matches User's Reference Layout)
          - Left Column: "Sports center" badge, bold typography, "Get in touch ↗" CTA
          - Middle Column: Large card with cat (herosection cat.png), jacket-matching bg, court lines, "Outdoor area", arrow button
          - Right Column: Secondary card ("Indoor", "Futsal court"), paragraph, prev/next circular arrows
      ========================================================================= */}
      <section
        id="velocity-club-section"
        className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-24 relative"
      >
        {/* Ambient subtle glow matching active cat's jacket */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: CLUB_ITEMS[activeClubIndex].jacketColor }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch relative z-10">
          
          {/* ==================== LEFT COLUMN ==================== */}
          <div className="lg:col-span-4 flex flex-col justify-between py-2 sm:py-4">
            <div>
              {/* Badge: Sports center */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/90 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold tracking-wide shadow-xs">
                <span
                  className="w-2 h-2 rounded-full transition-colors duration-500"
                  style={{ backgroundColor: CLUB_ITEMS[activeClubIndex].jacketColor }}
                />
                <span>Sports center</span>
              </div>

              {/* Main Headline (Exact typography and spirit of reference) */}
              <h2 className="font-display font-black text-3xl sm:text-4xl xl:text-[2.65rem] text-slate-950 tracking-tight leading-[1.12] mt-8 mb-6">
                Welcome to Velocity Club, where we inspire athletes and fitness enthusiasts to reach new heights.
              </h2>
            </div>

            {/* Bottom CTA Button: Get in touch ↗ */}
            <div className="pt-6 lg:pt-0">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-sm font-bold tracking-tight shadow-md shadow-slate-950/15 cursor-pointer group transition-all"
              >
                <span>Get in touch</span>
                <span className="w-6 h-6 rounded-full bg-white text-slate-950 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </motion.button>
            </div>
          </div>

          {/* ==================== MIDDLE COLUMN: MAIN CAT CARD ==================== */}
          <div className="lg:col-span-5">
            <motion.div
              layout
              className="w-full h-[460px] sm:h-[500px] lg:h-[530px] rounded-[2.8rem] sm:rounded-[3.2rem] relative overflow-hidden shadow-2xl shadow-pink-900/10 flex flex-col justify-between p-7 group cursor-pointer transition-all duration-700"
              style={{ background: CLUB_ITEMS[activeClubIndex].cardBgGradient }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* Subtle Sports Court Lines & Ambient Radial Glow in background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Court line circular arc */}
                <div className="absolute -top-14 -right-14 w-80 h-80 rounded-full border-[3px] border-white/20 pointer-events-none" />
                <div className="absolute bottom-12 -left-24 w-96 h-96 rounded-full border-[2px] border-white/15 pointer-events-none" />
                {/* Diagonal court line */}
                <div className="absolute top-0 right-1/3 w-[2px] h-full bg-white/15 rotate-12 pointer-events-none" />
                {/* Radial spotlight glow behind cat */}
                <div className="absolute inset-0 bg-radial from-white/25 via-transparent to-black/35 pointer-events-none" />
              </div>

              {/* Top Tag: Outdoor area */}
              <div className="relative z-20 flex items-center justify-between">
                <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/35 text-white text-xs font-medium tracking-wide shadow-xs">
                  {CLUB_ITEMS[activeClubIndex].tag}
                </span>
              </div>

              {/* Central Cat Cutout (herosection cat.png in ski goggles & puffer jacket) */}
              <div className="absolute inset-x-0 bottom-0 top-10 flex items-end justify-center pointer-events-none z-10 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={CLUB_ITEMS[activeClubIndex].id}
                    src={CLUB_ITEMS[activeClubIndex].image}
                    alt={CLUB_ITEMS[activeClubIndex].catName}
                    initial={{ opacity: 0, y: 35, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -25, scale: 0.94 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className="w-auto h-[86%] sm:h-[90%] object-contain object-bottom drop-shadow-[0_25px_35px_rgba(0,0,0,0.38)] group-hover:scale-105 transition-transform duration-500"
                  />
                </AnimatePresence>
              </div>

              {/* Bottom Overlay & Text: Versatile space for a wide range of activities */}
              <div className="relative z-20 flex items-end justify-between gap-4 mt-auto pt-8">
                <div className="max-w-[76%]">
                  <p className="text-white font-medium text-base sm:text-lg leading-snug tracking-tight drop-shadow-md">
                    {CLUB_ITEMS[activeClubIndex].title}
                  </p>
                </div>

                {/* Bottom-right Circle Button: ↗ */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextClub();
                  }}
                  className="w-12 h-12 rounded-full bg-slate-950 hover:bg-slate-800 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer flex-shrink-0"
                  title="Next style"
                >
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* ==================== RIGHT COLUMN: SECONDARY CARD + CONTROLS ==================== */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-6 py-2 sm:py-4">
            {/* Top Card: Indoor / Futsal Court */}
            <motion.div
              layout
              onClick={handleNextClub}
              className="w-full h-[230px] sm:h-[250px] rounded-[2.2rem] sm:rounded-[2.6rem] relative overflow-hidden shadow-xl shadow-slate-900/5 p-6 flex flex-col justify-between group cursor-pointer transition-all duration-700"
              style={{
                background: CLUB_ITEMS[(activeClubIndex + 1) % CLUB_ITEMS.length].cardBgGradient,
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Court Lines in Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-6 -right-10 w-44 h-44 rounded-full border-[3px] border-white/25 pointer-events-none" />
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* Top Tag: Indoor */}
              <div className="relative z-20">
                <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/35 text-white text-[11px] font-medium tracking-wide shadow-xs">
                  {CLUB_ITEMS[(activeClubIndex + 1) % CLUB_ITEMS.length].secondaryTag}
                </span>
              </div>

              {/* Cat preview cutout on right side */}
              <div className="absolute right-2 bottom-0 top-6 w-1/2 flex items-end justify-center pointer-events-none z-10 opacity-90 group-hover:scale-110 transition-transform duration-500">
                <img
                  src={CLUB_ITEMS[(activeClubIndex + 1) % CLUB_ITEMS.length].image}
                  alt={CLUB_ITEMS[(activeClubIndex + 1) % CLUB_ITEMS.length].editionName}
                  className="h-[88%] w-auto object-contain object-bottom drop-shadow-md"
                />
              </div>

              {/* Bottom Title: Futsal court */}
              <div className="relative z-20">
                <h3 className="text-white font-bold text-lg tracking-tight drop-shadow-md">
                  {CLUB_ITEMS[(activeClubIndex + 1) % CLUB_ITEMS.length].previewTitle}
                </h3>
                <span className="text-white/80 text-xs font-medium">
                  {CLUB_ITEMS[(activeClubIndex + 1) % CLUB_ITEMS.length].editionName}
                </span>
              </div>
            </motion.div>

            {/* Bottom Description & Navigation Arrow Buttons */}
            <div className="flex flex-col gap-5">
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                {CLUB_ITEMS[activeClubIndex].description}
              </p>

              {/* Navigation Arrow Controls: Left (white) & Right (black) */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevClub}
                  className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-slate-800 flex items-center justify-center transition-all shadow-xs hover:border-slate-300 cursor-pointer"
                  title="Previous"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
                </button>
                <button
                  onClick={handleNextClub}
                  className="w-12 h-12 rounded-full bg-slate-950 hover:bg-slate-800 active:scale-95 text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                  title="Next"
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>
            </div>
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
