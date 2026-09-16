import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ShoppingBag, Menu, ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Plus, Search, DollarSign, ChevronsRight, ChevronDown, Play, Pause } from 'lucide-react';

// Import hero cat assets
import pinkCatImg from '../../assets/cat-ecommerce/herosection cat.png';
import greenCatImg from '../../assets/cat-ecommerce/orange_cat.png';
import brownCatImg from '../../assets/cat-ecommerce/brown-cat.png';

// Import 360 Video Asset
import catAnglesVideo from '../../assets/cat-ecommerce/ye_cat_ha_okay_sare_angle_se_h.mp4';

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

// Section 2: Velocity Pet Winter Collection Showcase Data
const CLUB_ITEMS = [
  {
    id: 'pink',
    tag: 'Sub-Zero Alpine',
    secondaryTag: 'Thermal Fleece',
    title: 'Multi-zone down insulation engineered for extreme frost protection',
    previewTitle: 'Blush Sakura Parka',
    editionName: 'Blush Sakura Edition',
    catName: 'Sakura Ski Cat',
    image: pinkCatImg,
    jacketColor: '#ff4071',
    // Background gradient precisely matching herosection cat.png's pink puffer jacket:
    cardBgGradient: 'linear-gradient(155deg, #ffaec6 0%, #ff4071 46%, #b91c47 100%)',
    description: 'Each piece features ultra-lightweight aerospace down chambers, flexible fleece stretch, and ski goggle compatibility for sub-zero mountain trails.',
  },
  {
    id: 'green',
    tag: 'Ripstop Weatherproof',
    secondaryTag: 'Thermal Flex Lining',
    title: 'Reinforced ripstop exterior built for mountain snow agility and play',
    previewTitle: 'Alpine Forest Parka',
    editionName: 'Alpine Forest Edition',
    catName: 'Alpine Forest Cat',
    image: greenCatImg,
    jacketColor: '#059669',
    // Background gradient matching green cat jacket:
    cardBgGradient: 'linear-gradient(155deg, #86efac 0%, #059669 46%, #064e3b 100%)',
    description: 'Engineered with DWR-coated technical nylon and breathable thermal fleece lining. Unmatched warmth crafted for cold winter strolls and alpine frost.',
  },
  {
    id: 'brown',
    tag: 'Heritage Quilted',
    secondaryTag: 'Fleece Satin Warmth',
    title: 'Iconic retro chevron baffles with plush thermal goose down fill',
    previewTitle: 'Solar Amber Bomber',
    editionName: 'Solar Amber Edition',
    catName: 'Solar Amber Cat',
    image: brownCatImg,
    jacketColor: '#92400e',
    // Background gradient matching brown cat jacket:
    cardBgGradient: 'linear-gradient(155deg, #fcd34d 0%, #b45309 46%, #78350f 100%)',
    description: 'A tribute to alpine vintage outerwear. Hand-stitched quilted baffles retain core body heat while ensuring unrestricted feline sprint flexibility.',
  },
];

// Section 3: "Discover Excellence in Warmth, Agility, and Beyond" Data
const EXCELLENCE_ITEMS = [
  {
    id: 'alpine',
    category: 'Alpine Summit',
    heading: 'Engineered for high-altitude frost protection and extreme winter agility',
    subtext: 'Our alpine-rated fabrics and aerodynamic down chambers guarantee peak flexibility and core insulation at sub-zero temperatures.',
    ctaText: 'Shop Summit Fit',
    image: pinkCatImg,
    catName: 'Sakura Alpine Edition',
    bgCard: '#a03b57',
    badgeText: 'Sub-Zero Peak Spec',
    rightImage: greenCatImg,
    rightCatName: 'Alpine Speedsuit',
    rightDesc: 'Features multi-zone down chambers, ripstop outer shells, and flexible fleece stretch, perfect for both casual winter strolls and high-altitude alpine expeditions.',
  },
  {
    id: 'daily',
    category: 'Daily Stroll',
    heading: 'We craft comfortable silhouettes for relaxed play and chilly winter walks',
    subtext: 'Plush satin linings and flexible fleece collars keep cold winds out while ensuring all-day warmth and unrestricted movement.',
    ctaText: 'Explore Collection',
    image: greenCatImg,
    catName: 'Alpine Forest Parka',
    bgCard: '#5d826c', // Elegant sage/forest green
    badgeText: 'Thermal Flex Spec',
    rightImage: brownCatImg,
    rightCatName: 'Solar Retro Runner',
    rightDesc: 'Engineered with DWR-coated ripstop fabric, micro-fleece belly guards, and reflective safety trims. Keeps fur dry and core body temperature optimal in sleet or snow.',
  },
  {
    id: 'expedition',
    category: 'Snow Expedition',
    heading: 'Heavy-duty quilted puffers built for deep snowdrifts and sub-zero trails',
    subtext: 'Double-sealed storm zippers and water-resistant down clusters withstand blizzard conditions without restricting natural feline stalking agility.',
    ctaText: 'Shop Expedition Fits',
    image: brownCatImg,
    catName: 'Solar Amber Heritage',
    bgCard: '#876953',
    badgeText: 'Blizzard-Proof Spec',
    rightImage: pinkCatImg,
    rightCatName: 'Blush Sakura Casual',
    rightDesc: 'Crafted for extreme winter resilience. Ultra-breathable membrane ventilation prevents overheating while retaining essential body warmth during playful outdoor sprints.',
  },
];

// Section 4: "Explore Our Winter Lineup" Data
const FACILITIES_ITEMS = [
  {
    id: 'alpine-parkas',
    tag: 'Alpine Parkas',
    title: 'Weatherproof Down Parkas Built for Deep Snow',
    category: 'Winter Parkas',
    image: pinkCatImg,
    catName: 'Sakura Ski Cat',
    bgGradient: 'linear-gradient(155deg, #ea580c 0%, #c2410c 50%, #7c2d12 100%)',
    overlayType: 'slats',
    cardStyle: 'standard',
  },
  {
    id: 'snowsuit-edition',
    tag: 'Snowsuits',
    subTag: 'All-In-One Suit',
    title: 'Thermal Windproof Full-Body Snowsuits for Deep Snow Play',
    category: 'Snowsuits',
    image: greenCatImg,
    catName: 'Alpine Forest Cat',
    bgGradient: 'linear-gradient(180deg, #38bdf8 0%, #7dd3fc 35%, #15803d 40%, #166534 100%)',
    overlayType: 'turf',
    cardStyle: 'interactive-pill',
  },
  {
    id: 'thermal-knitwear',
    tag: 'Thermal Knits',
    title: 'Merino Wool Knits & Fleeces for Chilly Morning Walks',
    category: 'Knit Sweaters',
    image: brownCatImg,
    catName: 'Solar Amber Cat',
    bgGradient: 'linear-gradient(155deg, #c2410c 0%, #9a3412 50%, #431407 100%)',
    overlayType: 'track-lines',
    cardStyle: 'standard',
  },
  {
    id: 'storm-shells',
    tag: 'Storm Shells',
    title: 'Ultralight Hydrophobic Ski Jackets & Protective Vests',
    category: 'Storm Jackets',
    image: greenCatImg,
    catName: 'Alpine Trail Cat',
    bgGradient: 'linear-gradient(180deg, #0284c7 0%, #0369a1 70%, #075985 100%)',
    overlayType: 'court-line',
    cardStyle: 'standard',
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

  // Section 3: Excellence Showcase State (Default to index 1 'Training' as in reference image)
  const [activeExcellenceIndex, setActiveExcellenceIndex] = useState(1);
  const [showSpecBadge, setShowSpecBadge] = useState(false);

  const handleNextExcellence = () => {
    setActiveExcellenceIndex((prev) => (prev + 1) % EXCELLENCE_ITEMS.length);
  };

  const handlePrevExcellence = () => {
    setActiveExcellenceIndex((prev) => (prev - 1 + EXCELLENCE_ITEMS.length) % EXCELLENCE_ITEMS.length);
  };

  // Section 4: Facilities State
  const [facilitySearch, setFacilitySearch] = useState('');
  const [facilityIndex, setFacilityIndex] = useState(0);

  const handleNextFacility = () => {
    setFacilityIndex((prev) => (prev + 1) % FACILITIES_ITEMS.length);
  };

  const handlePrevFacility = () => {
    setFacilityIndex((prev) => (prev - 1 + FACILITIES_ITEMS.length) % FACILITIES_ITEMS.length);
  };

  // Footer Join Form State
  const [footerEmail, setFooterEmail] = useState('');
  const [footerName, setFooterName] = useState('');
  const [footerType, setFooterType] = useState('');
  const [footerSubmitted, setFooterSubmitted] = useState(false);

  const handleFooterJoin = (e) => {
    e?.preventDefault();
    if (!footerEmail && !footerName) return;
    setFooterSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.88 },
      colors: ['#ff4071', '#fb7185', '#f43f5e', '#ffffff', '#ec4899'],
    });
    setTimeout(() => {
      setFooterSubmitted(false);
      setFooterEmail('');
      setFooterName('');
      setFooterType('');
    }, 3500);
  };

  // 360 Full-Width Video Showcase Play/Pause State
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef(null);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
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
          SECTION 1: HERO SHOWCASE (Full Framer Motion Animations & Text Slide-Up)
      ========================================================================= */}
      <section className="w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-3 sm:py-4 relative">
        
        {/* Top Navigation Bar with Framer Motion Entrance */}
        <motion.header
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full px-2 sm:px-4 pt-2 pb-2 flex items-center justify-between relative z-30 flex-shrink-0"
        >
          {/* Brand Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleSelectVariant(VARIANTS[0])}
          >
            <div className="text-[#ff4071] group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <PawIcon className="w-7 h-7" color="#ff4071" />
            </div>
            <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-slate-950 uppercase">
              CATCLOTHES
            </span>
          </motion.div>

          {/* Desktop Navigation Links with Staggered Entrance */}
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.15 },
              },
            }}
            className="hidden xl:flex items-center gap-7 2xl:gap-10 text-[11px] font-extrabold tracking-wider uppercase text-slate-800"
          >
            {['JACKETS AND COATS', 'OVERALLS AND SUITS', 'T-SHIRTS AND SWEATERS', 'ACCESSORIES', 'SPECIAL OCCASION OUTFITS'].map((item) => (
              <motion.button
                key={item}
                variants={{
                  hidden: { opacity: 0, y: -12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ y: -2, color: '#ff4071' }}
                whileTap={{ scale: 0.96 }}
                className="hover:text-[#ff4071] transition-colors cursor-pointer uppercase"
              >
                {item}
              </motion.button>
            ))}
          </motion.nav>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5"
          >
            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleAddToCart}
              className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#ff4071] hover:bg-[#e11d48] text-white shadow-md shadow-pink-400/30 transition-all cursor-pointer"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm"
              >
                {cartCount}
              </motion.span>
            </motion.button>

            {/* Menu Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#ff4071] hover:bg-[#e11d48] text-white shadow-md shadow-pink-400/30 transition-all cursor-pointer"
              title="Menu"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.header>

        {/* Main Hero Showcase Stage */}
        <div className="relative w-full flex-1 flex flex-col items-center justify-end pb-2 pt-1 min-h-0">

          {/* Giant Headline (Behind the cat) - Bottom-to-Top Staggered Slide-Up Reveal */}
          <div className="w-full text-center relative z-10 pointer-events-none mb-[-3vw] sm:mb-[-4vw] lg:mb-[-5vw] flex-shrink-0 overflow-hidden py-2">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.14,
                    delayChildren: 0.18,
                  },
                },
              }}
              className="font-display font-black tracking-tighter text-[11vw] sm:text-[9.5vw] lg:text-[7.6vw] 2xl:text-[7.2rem] leading-[0.88] uppercase flex items-center justify-center gap-3 sm:gap-6 flex-wrap"
            >
              {/* Word 1: NEW (Pink) - Slides up from below */}
              <span className="overflow-hidden inline-block pb-1">
                <motion.span
                  variants={{
                    hidden: { y: '120%', opacity: 0, rotate: 2 },
                    visible: {
                      y: '0%',
                      opacity: 1,
                      rotate: 0,
                      transition: {
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="inline-block text-[#ff4071]"
                >
                  NEW
                </motion.span>
              </span>

              {/* Word 2: WINTER (Dark Navy) - Slides up from below */}
              <span className="overflow-hidden inline-block pb-1">
                <motion.span
                  variants={{
                    hidden: { y: '120%', opacity: 0, rotate: 2 },
                    visible: {
                      y: '0%',
                      opacity: 1,
                      rotate: 0,
                      transition: {
                        duration: 1.0,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="inline-block text-[#0a1128]"
                >
                  WINTER
                </motion.span>
              </span>

              {/* Word 3: COLLECTION (Dark Navy) - Slides up from below */}
              <span className="overflow-hidden inline-block pb-1">
                <motion.span
                  variants={{
                    hidden: { y: '120%', opacity: 0, rotate: 2 },
                    visible: {
                      y: '0%',
                      opacity: 1,
                      rotate: 0,
                      transition: {
                        duration: 1.1,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="inline-block text-[#0a1128]"
                >
                  COLLECTION
                </motion.span>
              </span>
            </motion.h1>
          </div>

          {/* Center Arena (Cat + Bottom Pink Container Card) */}
          <div className="relative w-full max-w-[1600px] flex-1 flex items-end justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">

            {/* Card Container Wrapper with Entrance Motion */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-[280px] sm:h-[350px] lg:h-[400px]"
            >
              {/* Bottom Rounded Color Card Container */}
              <div
                className="w-full h-full rounded-[2.5rem] sm:rounded-[3.2rem] transition-colors duration-500 shadow-sm relative overflow-hidden"
                style={{ backgroundColor: activeVariant.cardBg }}
              >
                {/* Subtle decorative paw prints watermark in background */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.15, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  className="absolute inset-0 flex items-center justify-between p-8 pointer-events-none"
                >
                  <PawIcon className="w-24 h-24 rotate-[-15deg]" color={activeVariant.accentColor} />
                  <PawIcon className="w-32 h-32 rotate-[25deg]" color={activeVariant.accentColor} />
                </motion.div>
              </div>

              {/* Circular Hot Pink "ADD TO CART" Button: Exactly 50% outside, 50% inside the card's top edge */}
              <div className="absolute top-0 -translate-y-1/2 right-8 sm:right-14 lg:right-24 z-30">
                <motion.button
                  initial={{ scale: 0, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{
                    delay: 0.65,
                    type: 'spring',
                    stiffness: 240,
                    damping: 18,
                  }}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={handleAddToCart}
                  className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-[#ff4071] hover:bg-[#e11d48] text-white shadow-2xl shadow-pink-500/40 flex flex-col items-center justify-center p-2 group transition-colors border-[6px] sm:border-8 border-white cursor-pointer"
                >
                  <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 mb-1 group-hover:-translate-y-1.5 transition-transform" color="#ffffff" />
                  <span className="font-display font-black text-xs sm:text-sm tracking-wider uppercase leading-tight">
                    {isAdded ? 'ADDED!' : 'ADD TO CART'}
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Bottom Right Vertical Thumbnail Variant Cards (Switches in-place with ZERO page scroll) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-6 sm:right-10 lg:right-12 bottom-4 sm:bottom-6 z-30 flex flex-col gap-3"
            >
              {VARIANTS.filter((v) => v.id !== activeVariant.id).map((variant, idx) => (
                <motion.button
                  key={variant.id}
                  initial={{ opacity: 0, scale: 0.7, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, x: -4 }}
                  whileTap={{ scale: 0.93 }}
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
            </motion.div>

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
                initial={{ opacity: 0, x: -35, y: 15 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.07, y: -4 }}
                className="absolute left-[3%] sm:left-[8%] bottom-[16%] sm:bottom-[18%] z-30 pointer-events-auto backdrop-blur-md bg-white/85 border border-white/70 shadow-lg shadow-pink-900/5 rounded-2xl p-2.5 sm:p-3.5 min-w-[130px] sm:min-w-[160px] text-left cursor-default transition-shadow hover:shadow-xl"
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
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.07, y: -4 }}
                className="absolute right-[22%] sm:right-[26%] bottom-[28%] sm:bottom-[30%] z-30 pointer-events-auto backdrop-blur-md bg-white/85 border border-white/70 shadow-lg shadow-pink-900/5 rounded-2xl p-2.5 sm:p-3 min-w-[110px] sm:min-w-[130px] text-left cursor-default transition-shadow hover:shadow-xl"
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
                initial={{ opacity: 0, x: 35, y: 15 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.07, y: -4 }}
                className="absolute right-[3%] sm:right-[8%] bottom-[12%] sm:bottom-[14%] z-30 pointer-events-auto backdrop-blur-md bg-white/85 border border-white/70 shadow-lg shadow-pink-900/5 rounded-2xl p-2.5 sm:p-3.5 min-w-[140px] sm:min-w-[170px] text-left cursor-default transition-shadow hover:shadow-xl"
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="w-full flex justify-center pt-2 pb-1 z-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const el = document.getElementById('velocity-club-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-slate-500 hover:text-[#ff4071] transition-colors cursor-pointer group bg-slate-50 hover:bg-pink-50 px-4 py-1.5 rounded-full border border-slate-200 hover:border-pink-200"
          >
            <span>Explore Velocity Club</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#ff4071]" />
          </motion.button>
        </motion.div>

      </section>

      {/* =========================================================================
          SECTION 2: VELOCITY PET CLUB SHOWCASE (Framer Motion Enhanced)
          - Left Column: Animated "Alpine Winter Edition" badge, masked bottom-to-top headline reveal, interactive CTA
          - Middle Column: 3D-feel card with rotating court arcs, floating breathing cat cutout, AnimatePresence transitions
          - Right Column: Secondary preview card with hover float, description fade, slide counter & spring arrow controls
      ========================================================================= */}
      <section
        id="velocity-club-section"
        className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-24 relative overflow-hidden"
      >
        {/* Ambient subtle glow matching active cat's jacket with breathing pulse */}
        <motion.div
          animate={{
            scale: [0.95, 1.08, 0.95],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: CLUB_ITEMS[activeClubIndex].jacketColor }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch relative z-10">
          
          {/* ==================== LEFT COLUMN ==================== */}
          <div className="lg:col-span-4 flex flex-col justify-between py-2 sm:py-4">
            <div>
              {/* Badge: Alpine Winter Edition with live glowing pulse ping */}
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04, x: 2 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200/90 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold tracking-wide shadow-xs cursor-default"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <motion.span
                    animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: CLUB_ITEMS[activeClubIndex].jacketColor }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2.5 w-2.5 transition-colors duration-500"
                    style={{ backgroundColor: CLUB_ITEMS[activeClubIndex].jacketColor }}
                  />
                </span>
                <span className="font-bold tracking-tight">Alpine Winter Edition</span>
              </motion.div>

              {/* Main Headline - Masked Bottom-to-Top Slide-Up Reveal */}
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.15,
                    },
                  },
                }}
                className="font-display font-black text-3xl sm:text-4xl xl:text-[2.65rem] text-slate-950 tracking-tight leading-[1.14] mt-8 mb-6 flex flex-wrap gap-x-2 gap-y-1"
              >
                {[
                  'Welcome', 'to', 'Velocity', 'Club,', 'where', 'luxury', 'petwear', 'meets', 'extreme', 'sub-zero', 'winter', 'performance.'
                ].map((word, idx) => (
                  <span key={idx} className="overflow-hidden inline-block py-0.5">
                    <motion.span
                      variants={{
                        hidden: { y: '115%', opacity: 0, rotate: 1.5 },
                        visible: {
                          y: '0%',
                          opacity: 1,
                          rotate: 0,
                          transition: {
                            duration: 0.85,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                      }}
                      className={`inline-block ${
                        word.includes('Velocity') || word.includes('Club')
                          ? 'text-[#ff4071]'
                          : word.includes('extreme') || word.includes('performance')
                          ? 'text-slate-950 font-black'
                          : 'text-slate-900'
                      }`}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.h2>
            </div>

            {/* Bottom CTA Button: Explore Collection ↗ */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="pt-6 lg:pt-0"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  const el = document.getElementById('categories-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full bg-slate-950 hover:bg-[#ff4071] text-white text-sm font-bold tracking-tight shadow-lg shadow-slate-950/15 cursor-pointer group transition-all duration-300"
              >
                <span>Explore Collection</span>
                <span className="w-6 h-6 rounded-full bg-white text-slate-950 flex items-center justify-center group-hover:rotate-45 group-hover:scale-110 transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* ==================== MIDDLE COLUMN: MAIN CAT CARD ==================== */}
          <motion.div
            initial={{ opacity: 0, y: 45, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <motion.div
              layout
              className="w-full h-[460px] sm:h-[500px] lg:h-[530px] rounded-[2.8rem] sm:rounded-[3.2rem] relative overflow-hidden shadow-2xl shadow-pink-900/15 flex flex-col justify-between p-7 group cursor-pointer transition-all duration-700"
              style={{ background: CLUB_ITEMS[activeClubIndex].cardBgGradient }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {/* Subtle Sports Court Lines & Ambient Animated Radial Glow */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Rotating Court Line Circular Arc */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-14 -right-14 w-84 h-84 rounded-full border-[3px] border-white/20 pointer-events-none"
                />
                <motion.div
                  animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.28, 0.15] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-12 -left-24 w-96 h-96 rounded-full border-[2px] border-white/20 pointer-events-none"
                />
                {/* Diagonal Court Accent Line */}
                <div className="absolute top-0 right-1/3 w-[2px] h-full bg-white/15 rotate-12 pointer-events-none" />
                {/* Radial Spotlight Glow Behind Cat */}
                <div className="absolute inset-0 bg-radial from-white/25 via-transparent to-black/35 pointer-events-none" />
              </div>

              {/* Top Tag: Active Tag with Glass Pill */}
              <div className="relative z-20 flex items-center justify-between">
                <motion.span
                  key={`tag-${CLUB_ITEMS[activeClubIndex].id}`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-4 py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white text-xs font-semibold tracking-wide shadow-sm"
                >
                  {CLUB_ITEMS[activeClubIndex].tag}
                </motion.span>
                
                {/* Subtle Style Pill */}
                <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider backdrop-blur-sm px-3 py-1 rounded-full bg-black/15">
                  {CLUB_ITEMS[activeClubIndex].editionName}
                </span>
              </div>

              {/* Central Cat Cutout with Floating Breathing Micro-Animation & AnimatePresence */}
              <div className="absolute inset-x-0 bottom-0 top-10 flex items-end justify-center pointer-events-none z-10 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={CLUB_ITEMS[activeClubIndex].id}
                    initial={{ opacity: 0, y: 40, scale: 0.92, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -25, scale: 0.94, filter: 'blur(4px)' }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full flex items-end justify-center"
                  >
                    {/* Natural Floating Breathing Motion */}
                    <motion.img
                      animate={{ y: [0, -7, 0] }}
                      transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                      src={CLUB_ITEMS[activeClubIndex].image}
                      alt={CLUB_ITEMS[activeClubIndex].catName}
                      className="w-auto h-[86%] sm:h-[90%] object-contain object-bottom drop-shadow-[0_25px_35px_rgba(0,0,0,0.38)] group-hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Overlay & Animated Title */}
              <div className="relative z-20 flex items-end justify-between gap-4 mt-auto pt-8">
                <div className="max-w-[76%]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={CLUB_ITEMS[activeClubIndex].id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="text-white font-medium text-base sm:text-lg leading-snug tracking-tight drop-shadow-md"
                    >
                      {CLUB_ITEMS[activeClubIndex].title}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Bottom-right Circle Action Button: ↗ */}
                <motion.button
                  whileHover={{ scale: 1.15, rotate: 45 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextClub();
                  }}
                  className="w-12 h-12 rounded-full bg-slate-950 hover:bg-white hover:text-slate-950 text-white flex items-center justify-center shadow-xl transition-colors duration-300 cursor-pointer flex-shrink-0 border-2 border-white/20"
                  title="Next style"
                >
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* ==================== RIGHT COLUMN: SECONDARY CARD + CONTROLS ==================== */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 flex flex-col justify-between gap-6 py-2 sm:py-4"
          >
            {/* Top Card: Secondary Cat Preview with Interactive Switch */}
            <motion.div
              layout
              onClick={handleNextClub}
              className="w-full h-[230px] sm:h-[250px] rounded-[2.2rem] sm:rounded-[2.6rem] relative overflow-hidden shadow-xl shadow-slate-900/5 p-6 flex flex-col justify-between group cursor-pointer transition-all duration-700"
              style={{
                background: CLUB_ITEMS[(activeClubIndex + 1) % CLUB_ITEMS.length].cardBgGradient,
              }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              {/* Court Lines in Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-6 -right-10 w-44 h-44 rounded-full border-[3px] border-white/25 pointer-events-none"
                />
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* Top Tag: Preview Tag */}
              <div className="relative z-20 flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/35 text-white text-[11px] font-medium tracking-wide shadow-xs">
                  {CLUB_ITEMS[(activeClubIndex + 1) % CLUB_ITEMS.length].secondaryTag}
                </span>
                <span className="text-[10px] font-bold text-white/90 bg-white/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm group-hover:bg-white group-hover:text-slate-950 transition-colors">
                  Tap to preview
                </span>
              </div>

              {/* Cat preview cutout on right side with floating motion */}
              <div className="absolute right-2 bottom-0 top-6 w-1/2 flex items-end justify-center pointer-events-none z-10 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                <motion.img
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  src={CLUB_ITEMS[(activeClubIndex + 1) % CLUB_ITEMS.length].image}
                  alt={CLUB_ITEMS[(activeClubIndex + 1) % CLUB_ITEMS.length].editionName}
                  className="h-[88%] w-auto object-contain object-bottom drop-shadow-md"
                />
              </div>

              {/* Bottom Title: Futsal court */}
              <div className="relative z-20">
                <h3 className="text-white font-bold text-lg tracking-tight drop-shadow-md group-hover:translate-x-1 transition-transform">
                  {CLUB_ITEMS[(activeClubIndex + 1) % CLUB_ITEMS.length].previewTitle}
                </h3>
                <span className="text-white/80 text-xs font-medium">
                  {CLUB_ITEMS[(activeClubIndex + 1) % CLUB_ITEMS.length].editionName}
                </span>
              </div>
            </motion.div>

            {/* Bottom Description & Navigation Arrow Buttons */}
            <div className="flex flex-col gap-5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeClubIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal"
                >
                  {CLUB_ITEMS[activeClubIndex].description}
                </motion.p>
              </AnimatePresence>

              {/* Slide Counter & Arrow Controls */}
              <div className="flex items-center justify-between pt-1">
                {/* Chic Moncler-style Slide Counter (01 / 03) */}
                <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
                  <span className="text-slate-950 font-black text-sm">
                    0{activeClubIndex + 1}
                  </span>
                  <span className="text-slate-300 font-normal">/</span>
                  <span className="text-slate-400 font-semibold">
                    0{CLUB_ITEMS.length}
                  </span>
                </div>

                {/* Navigation Arrow Controls: Left (white) & Right (black) with Spring Hover */}
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.12, x: -3 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handlePrevClub}
                    className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center shadow-xs hover:border-slate-300 cursor-pointer group transition-colors"
                    title="Previous"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2.2] group-hover:-translate-x-0.5 transition-transform" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.12, x: 3 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleNextClub}
                    className="w-12 h-12 rounded-full bg-slate-950 hover:bg-[#ff4071] text-white flex items-center justify-center shadow-md cursor-pointer group transition-colors"
                    title="Next"
                  >
                    <ArrowRight className="w-4 h-4 stroke-[2.2] group-hover:translate-x-0.5 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: DISCOVER EXCELLENCE SHOWCASE (Framer Motion Enhanced)
          - Top row: Animated monogram logo + gliding layoutId pill filter tabs
                     + Masked bottom-to-top headline reveal ("Discover Excellence in Warmth, Agility, and Beyond")
          - Bottom row:
            - Left: Sage container card with inner image card, floating breathing cat cutout,
                    AnimatePresence text transitions, slide counter, and spring arrow controls
            - Right: Action card with pulsating overlapping (+) button, spring popover, and asterisk
      ========================================================================= */}
      <section
        id="excellence-section"
        className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-24 relative overflow-hidden"
      >
        {/* Top Header Row: Logo & Tabs on Left, Headline on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10 sm:mb-16">
          
          {/* Top Left: Circular Logo + Pill Filter Tabs with Smooth Layout Gliding */}
          <div className="lg:col-span-5 flex items-center gap-4 flex-wrap">
            {/* Circular Black Monogram Logo with spring entrance & rotation */}
            <motion.div
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              whileHover={{ scale: 1.1, rotate: 12 }}
              whileTap={{ scale: 0.94 }}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-lg shadow-slate-900/15 flex-shrink-0 cursor-pointer group"
            >
              <PawIcon className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-12 transition-transform duration-300" color="#ffffff" />
            </motion.div>

            {/* Pill Tabs with Framer Motion layoutId Gliding Pill Background */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 sm:gap-2.5 flex-wrap p-1 rounded-full bg-slate-100/80 border border-slate-200/80"
            >
              {EXCELLENCE_ITEMS.map((item, idx) => {
                const isActive = activeExcellenceIndex === idx;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveExcellenceIndex(idx)}
                    className="relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-colors cursor-pointer"
                  >
                    {/* Gliding animated background pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeExcellenceTab"
                        className="absolute inset-0 rounded-full bg-slate-950 shadow-md shadow-slate-950/20"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      {item.category}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Top Right: Huge Display Headline with Masked Bottom-to-Top Slide-Up Reveal */}
          <div className="lg:col-span-7">
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight leading-[1.06]">
              <span className="overflow-hidden block py-0.5">
                <motion.span
                  initial={{ y: '120%', opacity: 0, rotate: 1.5 }}
                  whileInView={{ y: '0%', opacity: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Discover Excellence
                </motion.span>
              </span>
              <span className="overflow-hidden block py-0.5">
                <motion.span
                  initial={{ y: '120%', opacity: 0, rotate: 1.5 }}
                  whileInView={{ y: '0%', opacity: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#ff4071]"
                >
                  in Warmth, Agility,
                </motion.span>
              </span>
              <span className="overflow-hidden block py-0.5">
                <motion.span
                  initial={{ y: '120%', opacity: 0, rotate: 1.5 }}
                  whileInView={{ y: '0%', opacity: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.05, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  and Beyond
                </motion.span>
              </span>
            </h2>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* ==================== LEFT SAGE/BURGUNDY CONTAINER CARD (lg:col-span-7) ==================== */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <motion.div
              layout
              className="w-full h-full min-h-[440px] sm:min-h-[480px] rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between transition-colors duration-700"
              style={{ backgroundColor: EXCELLENCE_ITEMS[activeExcellenceIndex].bgCard }}
            >
              {/* Inner 2-column layout: Inner Image Card + Right Text Content */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-center flex-1">
                
                {/* Inner Left: Vertical Image Card with Cat & Tennis Net Foreground */}
                <motion.div
                  initial={{ opacity: 0, x: -25, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="sm:col-span-5 h-[270px] sm:h-[330px] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-lg group bg-black/15 flex items-end justify-center"
                >
                  {/* Dark gradient base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent z-20 pointer-events-none" />
                  
                  {/* Stylized Tennis Court Net Mesh Foreground from reference */}
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:10px_10px] border-t-2 border-white/40 z-20 pointer-events-none" />

                  {/* Cat Cutout Image with Floating Breathing Micro-Motion & AnimatePresence */}
                  <div className="w-full h-full flex items-end justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={EXCELLENCE_ITEMS[activeExcellenceIndex].id}
                        initial={{ opacity: 0, scale: 0.92, y: 25, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.92, y: -20, filter: 'blur(4px)' }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full h-full flex items-end justify-center"
                      >
                        {/* Continuous buoyant float motion */}
                        <motion.img
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                          src={EXCELLENCE_ITEMS[activeExcellenceIndex].image}
                          alt={EXCELLENCE_ITEMS[activeExcellenceIndex].catName}
                          className="w-auto h-[90%] object-contain object-bottom drop-shadow-xl z-10 group-hover:scale-105 transition-transform duration-500"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Badge in top left of inner card with subtle spring entrance */}
                  <motion.div
                    key={`badge-${EXCELLENCE_ITEMS[activeExcellenceIndex].id}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-wider"
                  >
                    {EXCELLENCE_ITEMS[activeExcellenceIndex].badgeText}
                  </motion.div>
                </motion.div>

                {/* Inner Right: Headline + Subtext with AnimatePresence */}
                <div className="sm:col-span-7 flex flex-col justify-center text-white py-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={EXCELLENCE_ITEMS[activeExcellenceIndex].id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h3 className="font-display font-black text-xl sm:text-2xl lg:text-[1.72rem] leading-tight tracking-tight mb-4 text-white">
                        {EXCELLENCE_ITEMS[activeExcellenceIndex].heading}
                      </h3>
                      <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-normal">
                        {EXCELLENCE_ITEMS[activeExcellenceIndex].subtext}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>

              {/* Bottom Controls Row: CTA + Slide Counter + Prev/Next Arrows */}
              <div className="flex items-center justify-between pt-6 sm:pt-8 mt-4 border-t border-white/15 flex-wrap gap-4">
                
                {/* Pill CTA Button: Shop Summit Fit ↗ */}
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    const el = document.getElementById('categories-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-3 px-5 sm:px-6 py-3 rounded-full bg-slate-950 hover:bg-white hover:text-slate-950 text-white text-xs sm:text-sm font-bold tracking-tight shadow-lg shadow-black/20 cursor-pointer group transition-colors duration-300"
                >
                  <span>{EXCELLENCE_ITEMS[activeExcellenceIndex].ctaText}</span>
                  <span className="w-6 h-6 rounded-full bg-white text-slate-950 flex items-center justify-center group-hover:rotate-45 group-hover:bg-slate-950 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </motion.button>

                {/* Counter & Arrows with Spring Interactions */}
                <div className="flex items-center gap-4">
                  {/* Slide Counter: e.g. 02 / 03 */}
                  <span className="text-white font-mono font-bold text-sm tracking-wider opacity-90">
                    0{activeExcellenceIndex + 1} / 0{EXCELLENCE_ITEMS.length}
                  </span>

                  {/* Arrow Buttons [←] [→] */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.2)' }}
                      whileTap={{ scale: 0.92 }}
                      onClick={handlePrevExcellence}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/40 hover:border-white text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm group"
                      title="Previous"
                    >
                      <ArrowLeft className="w-4 h-4 stroke-[2] group-hover:-translate-x-0.5 transition-transform" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.2)' }}
                      whileTap={{ scale: 0.92 }}
                      onClick={handleNextExcellence}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/40 hover:border-white text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm group"
                      title="Next"
                    >
                      <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                    </motion.button>
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>

          {/* ==================== RIGHT COLUMN: ACTION CARD WITH (+) & DESCRIPTION ==================== */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-row items-center sm:items-start gap-6 lg:gap-8 justify-center"
          >
            
            {/* Vertical Rounded Card with Overlapping (+) Button */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="w-full sm:w-[260px] lg:w-[280px] h-[360px] sm:h-[420px] rounded-[2.5rem] overflow-hidden relative shadow-xl bg-slate-100 flex-shrink-0 group"
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 pointer-events-none" />
              
              {/* Overlapping (+) Circle Button with Continuous Pulsing Ping Aura */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSpecBadge(!showSpecBadge)}
                className="absolute -left-5 sm:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-950 hover:bg-slate-800 text-white flex items-center justify-center shadow-2xl z-30 cursor-pointer transition-colors"
                title="Toggle Tech Specs"
              >
                {/* Subtle pulse aura */}
                <motion.span
                  animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full bg-slate-950 pointer-events-none"
                />
                <Plus className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 relative z-10 ${showSpecBadge ? 'rotate-45 text-[#ff4071]' : ''}`} />
              </motion.button>

              {/* Cat Image with AnimatePresence on active category change */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={EXCELLENCE_ITEMS[activeExcellenceIndex].rightCatName}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.06 }}
                  transition={{ duration: 0.4 }}
                  src={EXCELLENCE_ITEMS[activeExcellenceIndex].rightImage}
                  alt={EXCELLENCE_ITEMS[activeExcellenceIndex].rightCatName}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
              </AnimatePresence>

              {/* Bottom Title on Card */}
              <div className="absolute bottom-5 left-6 right-6 z-20 text-white">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-400 block mb-1">
                  Active Edition
                </span>
                <AnimatePresence mode="wait">
                  <motion.h4
                    key={EXCELLENCE_ITEMS[activeExcellenceIndex].rightCatName}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="font-display font-black text-lg text-white leading-tight"
                  >
                    {EXCELLENCE_ITEMS[activeExcellenceIndex].rightCatName}
                  </motion.h4>
                </AnimatePresence>
              </div>

              {/* Floating Tech Spec Popover with Spring Entrance */}
              <AnimatePresence>
                {showSpecBadge && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.88, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: 10 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                    className="absolute inset-x-4 top-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-200 text-left"
                  >
                    <div className="text-[10px] font-black uppercase text-[#ff4071] tracking-wider mb-1">
                      Material Specification
                    </div>
                    <div className="text-xs font-bold text-slate-900 mb-2">
                      Thermal Ripstop &amp; Multi-Zone Down
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-1 font-mono">
                      <div>• Insulation: 800-Fill Power</div>
                      <div>• Shell: DWR Waterproof Nylon</div>
                      <div>• Temp Rating: Sub-Zero -25°C</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Asterisk (*) with Interactive Micro-Rotation and Explanatory Paragraph */}
            <div className="flex-1 flex flex-col justify-center pt-2 sm:pt-8 text-left">
              <motion.div
                whileHover={{ rotate: 90, scale: 1.2 }}
                transition={{ duration: 0.3 }}
                className="text-4xl font-serif font-black text-slate-900 mb-3 leading-none select-none cursor-pointer w-fit"
              >
                *
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeExcellenceIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal"
                >
                  {EXCELLENCE_ITEMS[activeExcellenceIndex].rightDesc}
                </motion.p>
              </AnimatePresence>
            </div>

          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: EXPLORE OUR FACILITIES (Framer Motion Enhanced)
          - Enclosed within a rounded light slate container with smooth viewport entrance
          - Header: "Winter Lineup" pill, masked bottom-to-top headline reveal, interactive search, "View All ↗" button
          - 4 Cards with staggered entrances, floating breathing cats, and spring hover lifts
          - Footer: Spring-animated [←] [→] navigation buttons and animated subtitle
      ========================================================================= */}
      <section
        id="facilities-section"
        className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-[#f8fafc] rounded-[2.5rem] sm:rounded-[3.2rem] p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xs relative overflow-hidden"
        >
          
          {/* Top Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 sm:pb-8 border-b border-slate-200/70">
            {/* Left: Winter Lineup Pill + Masked Headline */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <motion.span
                initial={{ opacity: 0, scale: 0.8, x: -15 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.05, x: 2 }}
                className="px-3.5 py-1 rounded-full border border-slate-300/80 bg-white text-slate-800 text-xs font-semibold tracking-wide shadow-2xs cursor-default"
              >
                Winter Lineup
              </motion.span>

              {/* Masked Headline - Bottom-to-Top Reveal */}
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-[2.2rem] text-slate-950 tracking-tight flex flex-wrap gap-x-2">
                {['Explore', 'Our', 'Winter', 'Lineup'].map((word, wIdx) => (
                  <span key={wIdx} className="overflow-hidden inline-block py-0.5">
                    <motion.span
                      initial={{ y: '115%', opacity: 0, rotate: 1.5 }}
                      whileInView={{ y: '0%', opacity: 1, rotate: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.1 + wIdx * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`inline-block ${
                        word === 'Winter' || word === 'Lineup' ? 'text-[#ff4071]' : 'text-slate-950'
                      }`}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h2>
            </div>

            {/* Right: Search Input + View All Button */}
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              {/* Search Box with Interactive Focus Animation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative flex items-center w-full sm:w-auto"
              >
                <input
                  type="text"
                  value={facilitySearch}
                  onChange={(e) => setFacilitySearch(e.target.value)}
                  placeholder="Search coats, puffers, knits..."
                  className="w-full sm:w-60 lg:w-64 pl-4 pr-10 py-2.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 shadow-2xs transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
              </motion.div>

              {/* View All Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const el = document.getElementById('categories-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-[#ff4071] text-white text-xs sm:text-sm font-bold tracking-tight shadow-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap group transition-colors duration-300"
              >
                <span>View All</span>
                <span className="text-xs group-hover:rotate-45 group-hover:translate-x-0.5 transition-transform">↗</span>
              </motion.button>
            </div>
          </div>

          {/* 4 Facilities Cards Grid with Staggered Viewport Entrance & Layout Transition */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.15,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 my-8 sm:my-10"
          >
            {FACILITIES_ITEMS.filter((item) => {
              if (!facilitySearch.trim()) return true;
              const query = facilitySearch.toLowerCase();
              return (
                item.title.toLowerCase().includes(query) ||
                item.tag.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                item.catName.toLowerCase().includes(query)
              );
            }).map((facility, idx) => (
              <motion.div
                key={facility.id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 45, scale: 0.94 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.28 } }}
                className="h-[390px] sm:h-[430px] rounded-[2.2rem] sm:rounded-[2.6rem] relative overflow-hidden p-6 flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-slate-900/15 transition-shadow duration-500"
                style={{ background: facility.bgGradient }}
              >
                {/* Background Overlays according to reference */}
                {facility.overlayType === 'slats' && (
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(0,0,0,0.18)_2px,transparent_2px)] bg-[size:16px_100%] opacity-40 group-hover:opacity-60 transition-opacity" />
                )}

                {facility.overlayType === 'turf' && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Horizon sky / field gradient with sun haze */}
                    <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-sky-300/40 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 h-2/3 bg-emerald-900/15" />
                  </div>
                )}

                {facility.overlayType === 'track-lines' && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25 group-hover:opacity-40 transition-opacity" viewBox="0 0 300 500" fill="none">
                    <path d="M-50 450 C80 380, 180 280, 260 0" stroke="#ffffff" strokeWidth="3" />
                    <path d="M-20 480 C110 410, 210 310, 290 30" stroke="#ffffff" strokeWidth="3" />
                    <path d="M10 510 C140 440, 240 340, 320 60" stroke="#ffffff" strokeWidth="3" />
                  </svg>
                )}

                {facility.overlayType === 'court-line' && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-0 w-full h-[3px] bg-white/45" />
                    <div className="absolute top-0 right-1/4 h-full w-[2px] bg-white/30" />
                  </div>
                )}

                {/* Dark gradient for crisp bottom typography */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none z-10" />

                {/* Card Top Row: Tags & Icons */}
                <div className="relative z-20 flex items-center justify-between">
                  {/* Card 2 specific: flag icon badge */}
                  {facility.id === 'snowsuit-edition' ? (
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 12 }}
                      className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md border border-white/35 flex items-center justify-center text-white shadow-xs"
                    >
                      <PawIcon className="w-4 h-4" color="#ffffff" />
                    </motion.div>
                  ) : (
                    <div />
                  )}

                  {/* Top-right Tag Badge with Glassmorphism */}
                  <span className="px-3.5 py-1 rounded-full bg-white/25 backdrop-blur-md border border-white/35 text-white text-[11px] font-semibold tracking-wide shadow-xs group-hover:bg-white group-hover:text-slate-950 transition-colors duration-300">
                    {facility.tag}
                  </span>
                </div>

                {/* Center Cat Cutout Image with Floating Breathing Micro-Motion */}
                <div className="absolute inset-x-0 bottom-12 top-10 flex items-end justify-center pointer-events-none z-15 overflow-hidden">
                  <motion.img
                    animate={{ y: [0, idx % 2 === 0 ? -6 : -8, 0] }}
                    transition={{
                      duration: 3.2 + idx * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: idx * 0.25,
                    }}
                    src={facility.image}
                    alt={facility.catName}
                    className="w-auto h-[80%] sm:h-[85%] object-contain object-bottom drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)] group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                {/* Card Bottom Area */}
                {facility.cardStyle === 'interactive-pill' ? (
                  /* Card 2 Style: Frosted glass bottom box with "Play ground" + Arrow */
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative z-20 p-3.5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/20 text-white flex items-center justify-between shadow-xl mt-auto"
                  >
                    <div className="max-w-[78%]">
                      <span className="text-[10px] font-semibold tracking-wide text-white/90 border border-white/30 px-2 py-0.5 rounded-full inline-block mb-1">
                        {facility.subTag}
                      </span>
                      <h3 className="font-display font-bold text-xs sm:text-[13px] leading-snug text-white">
                        {facility.title}
                      </h3>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.15, rotate: 45 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-md cursor-pointer flex-shrink-0 border border-white/20"
                    >
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </motion.button>
                  </motion.div>
                ) : (
                  /* Standard Cards (1, 3, 4): Bold white title with subtle drop shadow */
                  <div className="relative z-20 mt-auto pt-4 group-hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-white font-display font-bold text-base sm:text-[1.05rem] leading-snug tracking-tight drop-shadow-md">
                      {facility.title}
                    </h3>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Controls & Description Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-200/70">
            {/* Navigation Arrow Buttons: [←] [→] with Spring Feedback */}
            <div className="flex items-center gap-2.5">
              <motion.button
                whileHover={{ scale: 1.12, backgroundColor: '#0f172a', color: '#ffffff', borderColor: '#0f172a' }}
                whileTap={{ scale: 0.92 }}
                onClick={handlePrevFacility}
                className="w-11 h-11 rounded-full border border-slate-300 bg-white text-slate-800 flex items-center justify-center transition-colors cursor-pointer shadow-2xs group"
                title="Previous facility"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2] group-hover:-translate-x-0.5 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.12, backgroundColor: '#0f172a', color: '#ffffff', borderColor: '#0f172a' }}
                whileTap={{ scale: 0.92 }}
                onClick={handleNextFacility}
                className="w-11 h-11 rounded-full border border-slate-300 bg-white text-slate-800 flex items-center justify-center transition-colors cursor-pointer shadow-2xs group"
                title="Next facility"
              >
                <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>

            {/* Right Subtitle Paragraph with Animated Entrance */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-500 text-xs sm:text-[13px] text-center sm:text-right max-w-md font-normal leading-relaxed"
            >
              Equip your feline companion with luxury alpine apparel, thermal insulation, and custom weatherproof fits to conquer this winter season.
            </motion.p>
          </div>

        </motion.div>
      </section>

      {/* =========================================================================
          SECTION 5: FIND THE PERFECT PLAN (Framer Motion Enhanced)
          - Header:
            - Left: Spring-popped ($) badge + "Winter Bundles" pill
            - Center: Masked bottom-to-top headline reveal with interactive 360° spinning Paw badge
            - Sub-link: Interactive "Explore All Winter Sets >>" with spring bounce
          - Cards:
            - Left Card: Sage green with undulating wavy ribbon path, hover lift, interactive price pill & inversion circle button
            - Right Card: Dark forest green with floating breathing cat model, ambient radial glow, price pill & spring circle button
      ========================================================================= */}
      <section
        id="pricing-section"
        className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24 relative overflow-hidden"
      >
        {/* Top Header Row */}
        <div className="relative mb-12 sm:mb-16">
          
          {/* Top Left: Circular Dollar Icon + Pricing Pill Badge */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="sm:absolute sm:left-0 sm:top-0 flex flex-col items-start gap-2 mb-6 sm:mb-0"
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-md cursor-pointer"
            >
              <DollarSign className="w-5 h-5 stroke-[2.5]" />
            </motion.div>
            <span className="px-3.5 py-1 rounded-full border border-slate-200/90 bg-white text-slate-800 text-xs font-semibold tracking-wide shadow-2xs">
              Winter Bundles
            </span>
          </motion.div>

          {/* Center: Bold Headline + Paw Badge + Sub-link */}
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black text-3xl sm:text-5xl lg:text-[3.6rem] text-slate-950 tracking-tight leading-[1.06]"
            >
              Find the Perfect Fit for Your <br />
              Winter{' '}
              <motion.span
                whileHover={{ rotate: 180, scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-slate-950 mx-1.5 align-middle bg-white shadow-2xs cursor-pointer"
                title="Feline Paw"
              >
                <PawIcon className="w-5 h-5 sm:w-6 sm:h-6" color="#0f172a" />
              </motion.span>{' '}
              Journey
            </motion.h2>

            {/* Explore All Winter Sets >> Link with Spring Hover */}
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const el = document.getElementById('categories-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 mt-6 text-xs sm:text-sm font-semibold text-slate-800 hover:text-[#ff4071] transition-colors group cursor-pointer"
            >
              <span>Explore All Winter Sets</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950 group-hover:bg-[#ff4071] text-white flex items-center justify-center transition-colors duration-300 shadow-xs">
                <ChevronsRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
              </span>
            </motion.button>
          </div>

        </div>

        {/* 2 Big Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* ==================== CARD 1: 6 SEASON PACKAGE (Blush Sakura Pink + Undulating Wavy Ribbon) ==================== */}
          <motion.div
            initial={{ opacity: 0, x: -80, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.3 } }}
            className="w-full min-h-[460px] sm:min-h-[500px] rounded-[2.8rem] sm:rounded-[3.2rem] p-8 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-pink-900/30 transition-shadow duration-500 group"
            style={{
              background: 'linear-gradient(155deg, #ff7e9e 0%, #ff4071 45%, #b91c47 100%)',
            }}
          >
            {/* Undulating Wavy Ribbon Path with Animated Breathing Stroke */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 700 500"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                animate={{
                  opacity: [0.22, 0.38, 0.22],
                  strokeWidth: [52, 60, 52],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                d="M-20 300 C150 300, 170 200, 320 230 C470 260, 520 330, 720 270"
                stroke="rgba(255, 255, 255, 0.35)"
                strokeLinecap="round"
              />
            </svg>

            {/* Top Row: Best Seller Pill + Cat Avatars with Recommendation Text */}
            <div className="relative z-20 flex items-start justify-between gap-4">
              <span className="px-4 py-1.5 rounded-full bg-slate-950 text-white text-[11px] font-bold shadow-xs">
                Best Seller
              </span>

              {/* Cat Stylist Avatars with hover bounce */}
              <div className="flex flex-col items-end text-right">
                <div className="flex items-center -space-x-2 mb-1.5">
                  <motion.img
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                    src={pinkCatImg}
                    alt="Cat Stylist 1"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover shadow-sm bg-pink-100 cursor-pointer"
                  />
                  <motion.img
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                    src={greenCatImg}
                    alt="Cat Stylist 2"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover shadow-sm bg-emerald-100 cursor-pointer"
                  />
                </div>
                <span className="text-white/95 text-[10.5px] leading-tight font-medium drop-shadow-2xs">
                  Recommended by <br />
                  <span className="font-bold">Alpine Vets</span>
                </span>
              </div>
            </div>

            {/* Center: Package Title + Subheading + Animated Price Pill */}
            <div className="relative z-20 my-auto py-6 flex flex-col items-center text-center">
              <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-[2.85rem] text-white tracking-tight leading-[1.05] mb-2 drop-shadow-md group-hover:-translate-y-1 transition-transform duration-300">
                Winter Trio <br />
                Package
              </h3>
              <p className="text-white/95 text-sm sm:text-base font-medium mb-7 drop-shadow-2xs">
                Parka, Thermal Fleece &amp; Booties
              </p>

              {/* Interactive Price Pill: $50 /Piece with Spring Lift */}
              <motion.div
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-baseline gap-2 px-9 py-3.5 rounded-full bg-slate-950 text-white shadow-2xl shadow-black/25 cursor-pointer border border-white/20"
              >
                <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">$50</span>
                <span className="text-white/70 text-xs sm:text-sm font-medium">/Piece</span>
              </motion.div>
            </div>

            {/* Bottom Row: Expiry Pill + Total Cost + Circle Action Button */}
            <div className="relative z-20 flex items-center justify-between pt-4 border-t border-white/25">
              <span className="px-4 py-1.5 rounded-full border border-white/60 text-white text-xs font-medium tracking-wide backdrop-blur-xs">
                Lifetime Fit Guarantee
              </span>

              <div className="flex-1 mx-4 sm:mx-8 flex flex-col items-center">
                <div className="w-full max-w-[220px] h-[1px] bg-white/30 mb-1.5" />
                <span className="text-white text-xs sm:text-[13px] font-bold tracking-tight drop-shadow-xs">
                  $150 / Complete Kit
                </span>
              </div>

              {/* White Action Circle ↗ with Spring Pop & Color Inversion */}
              <motion.button
                whileHover={{ scale: 1.15, rotate: 45, backgroundColor: '#0f172a', color: '#ffffff' }}
                whileTap={{ scale: 0.9 }}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-xl transition-colors duration-300 cursor-pointer flex-shrink-0"
              >
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </motion.button>
            </div>

          </motion.div>

          {/* ==================== CARD 2: 12 SEASON PACKAGE (Deep Velvet Royal Pink + Cutout Cat Model) ==================== */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.3 } }}
            className="w-full min-h-[460px] sm:min-h-[500px] rounded-[2.8rem] sm:rounded-[3.2rem] p-8 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-pink-950/40 transition-shadow duration-500 group"
            style={{
              background: 'linear-gradient(155deg, #be185d 0%, #9d174d 45%, #500724 100%)',
            }}
          >
            {/* Top Row: Best Seller Pill + Cat Avatars with Recommendation Text */}
            <div className="relative z-20 flex items-start justify-between gap-4">
              <span className="px-4 py-1.5 rounded-full bg-slate-950 text-white text-[11px] font-bold shadow-md">
                Best Seller
              </span>

              {/* Cat Stylist Avatars with hover bounce */}
              <div className="flex flex-col items-end text-right">
                <div className="flex items-center -space-x-2 mb-1.5">
                  <motion.img
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                    src={greenCatImg}
                    alt="Cat Stylist 2"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover shadow-sm bg-pink-100 cursor-pointer"
                  />
                  <motion.img
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                    src={brownCatImg}
                    alt="Cat Stylist 3"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover shadow-sm bg-rose-100 cursor-pointer"
                  />
                </div>
                <span className="text-white/95 text-[10.5px] leading-tight font-medium drop-shadow-2xs">
                  Approved by <br />
                  <span className="font-bold text-pink-200">Feline Stylists</span>
                </span>
              </div>
            </div>

            {/* Ambient Vibrant Pink Aura behind Cat */}
            <div className="absolute right-0 bottom-0 w-72 sm:w-88 h-64 bg-radial from-[#ff4071]/35 via-rose-500/20 to-transparent pointer-events-none z-5 blur-2xl" />

            {/* Prominent Feline Model Cutout Grounded with Natural Floating Breathing Micro-Motion */}
            <div className="absolute right-2 sm:right-6 lg:right-8 bottom-0 z-10 w-48 sm:w-60 lg:w-68 flex items-end justify-center pointer-events-none">
              <motion.img
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                src={brownCatImg}
                alt="Cat Model in Ski Goggles and Jacket"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
                }}
                className="w-full h-auto max-h-[320px] sm:max-h-[360px] lg:max-h-[390px] object-contain object-bottom drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] group-hover:scale-106 transition-transform duration-500"
              />
            </div>

            {/* Center: Package Title + Subheading + Animated Price Pill */}
            <div className="relative z-20 my-auto py-6 flex flex-col items-center text-center">
              <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-[2.85rem] text-white tracking-tight leading-[1.05] mb-2 drop-shadow-md group-hover:-translate-y-1 transition-transform duration-300">
                Summit Pro <br />
                Package
              </h3>
              <p className="text-white/95 text-sm sm:text-base font-medium mb-7 drop-shadow-2xs">
                Bespoke Weatherproof Snow Wardrobe
              </p>

              {/* Price Pill: $98 /Edition with Spring Lift */}
              <motion.div
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-baseline gap-2 px-9 py-3.5 rounded-full bg-slate-950 text-white shadow-2xl shadow-black/35 cursor-pointer border border-pink-400/40"
              >
                <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">$98</span>
                <span className="text-pink-200 text-xs sm:text-sm font-medium">/Edition</span>
              </motion.div>
            </div>

            {/* Bottom Row: Expiry Pill + Total Cost + Circle Action Button */}
            <div className="relative z-20 flex items-center justify-between pt-4 border-t border-white/20">
              <span className="px-4 py-1.5 rounded-full border border-pink-300/50 text-white text-xs font-medium tracking-wide backdrop-blur-xs">
                Sub-Zero Rated
              </span>

              <div className="flex-1 mx-4 sm:mx-8 flex flex-col items-center">
                <div className="w-full max-w-[220px] h-[1px] bg-white/30 mb-1.5" />
                <span className="text-white text-xs sm:text-[13px] font-bold tracking-tight drop-shadow-sm">
                  $294 / Full Snow Kit
                </span>
              </div>

              {/* Action Circle ↗ with Spring Pop & Invert Switch */}
              <motion.button
                whileHover={{ scale: 1.15, rotate: 45, backgroundColor: '#0f172a', color: '#ffffff' }}
                whileTap={{ scale: 0.9 }}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-xl transition-colors duration-300 cursor-pointer flex-shrink-0"
              >
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </motion.button>
            </div>

          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5.5: 360° ALL-ANGLE VIDEO SHOWCASE (Full-Width Clean Video + White Box)
          - No black overlay on video: crystal-clear original video playback
          - Compact White Box placed on the BOTTOM-RIGHT side
          - Minimal, punchy content with brand styling and Framer Motion
      ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="w-full min-h-[560px] sm:min-h-[620px] lg:min-h-[700px] rounded-[2.5rem] sm:rounded-[3.2rem] lg:rounded-[3.6rem] relative overflow-hidden bg-slate-950 shadow-2xl flex items-end justify-end group"
        >
          {/* Background Full-Width Video (100% Clean - No Black Overlay) */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            src={catAnglesVideo}
            className="w-full h-full object-cover absolute inset-0"
          />

          {/* Top-Right Play/Pause Floating Glass Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleVideoPlay}
            className="absolute top-6 sm:top-8 right-6 sm:right-8 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-[#ff4071] hover:text-white text-slate-950 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer shadow-lg border border-white/60"
            title={isVideoPlaying ? 'Pause Video' : 'Play Video'}
          >
            {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </motion.button>

          {/* Bottom-Right White Box with Minimal Content */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 m-6 sm:m-8 lg:m-10 p-6 sm:p-7 rounded-[2rem] sm:rounded-[2.4rem] bg-white/95 backdrop-blur-md shadow-2xl border border-white/80 max-w-[340px] sm:max-w-[380px] text-slate-950 flex flex-col gap-3.5"
          >
            {/* Heading */}
            <h3 className="font-display font-black text-xl sm:text-2xl text-slate-950 tracking-tight leading-tight">
              Crafted for Every <br />
              <span className="text-[#ff4071]">Angle of Movement</span>
            </h3>

            {/* Concise 1-Line Description */}
            <p className="text-slate-600 text-xs sm:text-[13px] font-medium leading-relaxed">
              Zero-friction articulated seams engineered for natural flexibility and sub-zero warmth.
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const el = document.getElementById('categories-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full mt-1 py-3 px-5 rounded-full bg-slate-950 hover:bg-[#ff4071] text-white text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-between shadow-md transition-colors cursor-pointer group"
            >
              <span>Shop 360° Collection</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ChevronsRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </motion.button>
          </motion.div>

        </motion.div>
      </section>

      {/* =========================================================================
          SECTION 6: VELOCITY CLUB FOOTER (Full Framer Motion Animations)
          - Large soft gray rounded card: bg-[#f4f4f4] with smooth viewport entrance
          - Column 1: Brand logo hover spin + animated slogan with interactive pill badges
          - Column 2 & 3: Staggered collection & studio links with hover horizontal nudge & pink color
          - Column 4: Spring-animated social pill buttons with dark invert transition
          - Column 5: VIP Club newsletter form with focus micro-interactions & animated submit button
          - Bottom Bar: Smooth fade-in privacy & copyright footer
      ========================================================================= */}
      <footer
        id="footer-section"
        className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-[#f4f4f4] rounded-[2.5rem] sm:rounded-[3.2rem] lg:rounded-[3.6rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden text-slate-900 shadow-sm border border-slate-200/50"
        >
          
          {/* Main 5-Column Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            
            {/* Column 1: Brand & Slogan (Spans 4 columns on lg) */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full">
              {/* Logo & Brand with Spring Hover */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 cursor-pointer group w-fit"
              >
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-slate-950 flex items-center justify-center bg-white shadow-2xs group-hover:border-[#ff4071] transition-colors"
                >
                  <PawIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 group-hover:text-[#ff4071] transition-colors" color="#0f172a" />
                </motion.div>
                <span className="font-sans font-bold text-xl sm:text-2xl text-slate-950 tracking-tight group-hover:text-[#ff4071] transition-colors">
                  Velocity Club
                </span>
              </motion.div>

              {/* Slogan with Interactive Pill Badges */}
              <div className="mt-12 sm:mt-16 lg:mt-24 max-w-sm">
                <h3 className="font-sans font-bold text-2xl sm:text-3xl lg:text-[2.1rem] text-slate-950 tracking-tight leading-[1.2]">
                  <motion.span
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="inline-block bg-[#ff4071] hover:bg-[#e11d48] text-white px-3.5 py-0.5 rounded-full text-[0.85em] font-semibold mr-1.5 align-middle shadow-sm shadow-pink-500/25 cursor-default transition-colors duration-300"
                  >
                    Warm Play,
                  </motion.span>
                  Their Way-
                  <br />
                  Luxury{' '}
                  <motion.span
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="inline-block bg-[#ff4071] hover:bg-[#e11d48] text-white px-3.5 py-0.5 rounded-full text-[0.85em] font-semibold mr-1.5 align-middle shadow-sm shadow-pink-500/25 cursor-default transition-colors duration-300"
                  >
                    Winter Petwear
                  </motion.span>
                  <br />
                  for Every Season
                </h3>
              </div>
            </div>

            {/* Column 2: Collection Categories with Hover Micro-Nudges (Spans 2 columns on lg) */}
            <div className="lg:col-span-2">
              <h4 className="font-sans font-bold text-slate-950 text-base sm:text-lg mb-5">
                Collection
              </h4>
              <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-[13px] text-slate-700 font-medium">
                {[
                  'Alpine Down Parkas',
                  'Quilted Puffer Jackets',
                  'Weatherproof Snowsuits',
                  'Thermal Knit Sweaters',
                  'Windproof Ski Vests',
                  'Micro-Fleece Collars',
                  'Feline Ski Goggles',
                  'Insulated Paw Booties',
                ].map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a href="#facilities-section" className="hover:text-[#ff4071] transition-colors flex items-center gap-1.5 group">
                      <span className="opacity-0 group-hover:opacity-100 text-[#ff4071] transition-opacity font-bold">›</span>
                      <span>{item}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Column 3: About Studio (Spans 2 columns on lg) */}
            <div className="lg:col-span-2">
              <h4 className="font-sans font-bold text-slate-950 text-base sm:text-lg mb-5">
                About Studio
              </h4>
              <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-[13px] text-slate-700 font-medium">
                {[
                  { name: 'Our Alpine Craft', link: '#velocity-club-section' },
                  { name: 'Thermal Tech Spec', link: '#excellence-section' },
                  { name: 'Safety & Fit Guide', link: '#pricing-section' },
                ].map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a href={item.link} className="hover:text-[#ff4071] transition-colors flex items-center gap-1.5 group">
                      <span className="opacity-0 group-hover:opacity-100 text-[#ff4071] transition-opacity font-bold">›</span>
                      <span>{item.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Column 4: Social Outlined Pill Buttons with Spring Hover (Spans 1 column on lg) */}
            <div className="lg:col-span-1 xl:col-span-1">
              <h4 className="font-sans font-bold text-slate-950 text-base sm:text-lg mb-5">
                Social
              </h4>
              <div className="flex flex-col gap-2.5 items-start">
                {['Instagram', 'Facebook', 'Linkedin', 'Youtube'].map((social) => (
                  <motion.a
                    key={social}
                    href={`#${social.toLowerCase()}`}
                    whileHover={{ scale: 1.08, y: -2, backgroundColor: '#ff4071', color: '#ffffff', borderColor: '#ff4071' }}
                    whileTap={{ scale: 0.94 }}
                    className="px-4 py-1.5 rounded-full border border-slate-950 text-slate-950 text-xs font-medium tracking-wide transition-colors shadow-2xs cursor-pointer"
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Column 5: VIP Winter Club Form (Spans 3 columns on lg) */}
            <div className="lg:col-span-3">
              <h4 className="font-sans font-bold text-slate-950 text-base sm:text-lg mb-5">
                VIP Winter Club
              </h4>
              <form onSubmit={handleFooterJoin} className="flex flex-col gap-3">
                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Type your email..."
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  className="w-full bg-white rounded-full px-5 py-3 text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 border border-slate-200/90 shadow-2xs focus:outline-none focus:border-[#ff4071] focus:ring-2 focus:ring-pink-100 transition-all"
                />

                {/* Cat Name Input */}
                <input
                  type="text"
                  placeholder="Your cat's name..."
                  value={footerName}
                  onChange={(e) => setFooterName(e.target.value)}
                  className="w-full bg-white rounded-full px-5 py-3 text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 border border-slate-200/90 shadow-2xs focus:outline-none focus:border-[#ff4071] focus:ring-2 focus:ring-pink-100 transition-all"
                />

                {/* Style / Size Select */}
                <div className="relative">
                  <select
                    value={footerType}
                    onChange={(e) => setFooterType(e.target.value)}
                    className="w-full bg-white rounded-full px-5 py-3 text-xs sm:text-[13px] text-slate-600 appearance-none border border-slate-200/90 shadow-2xs focus:outline-none focus:border-[#ff4071] focus:ring-2 focus:ring-pink-100 transition-all cursor-pointer pr-10"
                  >
                    <option value="">Select Fit / Category</option>
                    <option value="parka">Alpine Down Parkas (XS - L)</option>
                    <option value="snowsuit">Full Snowsuits (XS - L)</option>
                    <option value="knitwear">Thermal Knitwear (XS - L)</option>
                    <option value="accessories">Ski Accessories &amp; Goggles</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Submit Button with Spring Interaction */}
                <motion.button
                  whileHover={{ scale: 1.02, borderColor: '#ff4071' }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="w-full bg-white hover:bg-pink-50/50 border border-slate-950 rounded-full py-1 pl-5 pr-1 flex items-center justify-between text-xs sm:text-[12.5px] font-bold tracking-wider uppercase text-slate-950 cursor-pointer transition-all shadow-xs group mt-1"
                >
                  <span className="group-hover:text-[#ff4071] transition-colors">
                    {footerSubmitted ? 'WELCOME ABOARD!' : 'JOIN VIP CLUB'}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-slate-950 group-hover:bg-[#ff4071] text-white flex items-center justify-center transition-colors flex-shrink-0">
                    <ChevronsRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </motion.button>
              </form>
            </div>

          </div>

          {/* Bottom Bar: Privacy Policy Terms & Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 sm:mt-20 lg:mt-24 pt-6 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-slate-600 font-medium"
          >
            <div className="flex items-center gap-3">
              <a href="#privacy" className="hover:text-[#ff4071] transition-colors">
                Privacy Policy
              </a>
              <span className="text-slate-300">•</span>
              <a href="#terms" className="hover:text-[#ff4071] transition-colors">
                Terms &amp; Conditions
              </a>
            </div>
            <div>
              All rights reserved©2026 &bull; Velocity Petwear Studio
            </div>
          </motion.div>

        </motion.div>
      </footer>

    </div>
  );
}
