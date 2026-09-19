import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PersonalizedStoryPreview, Order } from '../types';
import { INITIAL_PRICING } from '../data/mockStories';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  QrCode, 
  Play, 
  Check, 
  X, 
  CheckCircle2, 
  MessageSquarePlus, 
  Shield, 
  MapPin, 
  Grid,
  BookOpen,
  Volume2
} from 'lucide-react';

interface BookPreviewViewerProps {
  preview: PersonalizedStoryPreview;
  onBack: () => void;
  onOrderSuccess: (order: Order) => void;
  onUpdatePreview?: (updated: PersonalizedStoryPreview) => void;
}

export const BookPreviewViewer: React.FC<BookPreviewViewerProps> = ({
  preview,
  onBack,
  onOrderSuccess,
}) => {
  // Mode: 'preview' (Free 3-spread preview), 'full-book' (32-page review), 'checkout' (package selection)
  const [viewState, setViewState] = useState<'preview' | 'full-book' | 'checkout'>('preview');

  // Full-book view mode: 'flip-reader' (2-page physical spread) vs 'grid' (all 32 pages)
  const [fullBookMode, setFullBookMode] = useState<'flip-reader' | 'grid'>('flip-reader');

  // Preview spread index & flip direction
  const [activeSpreadIndex, setActiveSpreadIndex] = useState(0);
  const [fullBookSpreadIndex, setFullBookSpreadIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState<1 | -1>(1);

  // Modals
  const [isArModalOpen, setIsArModalOpen] = useState(false);
  const [isPlayingAr, setIsPlayingAr] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [changeText, setChangeText] = useState('');
  const [changeSubmitted, setChangeSubmitted] = useState(false);
  const [zoomPage, setZoomPage] = useState<number | null>(null);

  // Checkout state
  const [selectedFormat, setSelectedFormat] = useState<string>('hardcover');
  const [arAddon, setArAddon] = useState<boolean>(true);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Build 32 spreads
  const titles = [
    'The Starlight Bedroom', 'The Ancient Galactic Map', 'The Starlight Cruiser',
    'Entering the Nebula Ring', 'The Singing Crystals', 'Meeting the Cosmic Fox',
    'The Glowing Lantern', 'Charting the Comet', 'The Asteroid Garden',
    'The Lost Star Whispers', 'A Gentle Heart of Courage', 'The Celestial Aurora',
    'Safe Journey Home to Bed', 'The Hero of the Stars'
  ];

  const isBoy = preview.gender === 'boy';
  const defaultSpreadImage = isBoy 
    ? '/src/assets/images/space_boy_scene_1789746482524.jpg' 
    : '/src/assets/images/space_girl_scene_1789746496237.jpg';

  const windowSpreadImage = isBoy 
    ? '/src/assets/images/space_boy_window_1789746542329.jpg' 
    : '/src/assets/images/space_girl_window_1789746562044.jpg';

  const planetSpreadImage = isBoy 
    ? '/src/assets/images/space_boy_planet_1789746509818.jpg' 
    : '/src/assets/images/space_girl_planet_1789746528883.jpg';

  const spreads = Array.from({ length: 32 }, (_, idx) => {
    const pageNum = idx + 1;
    const existing = preview.pages.find(p => p.pageNumber === pageNum);
    if (existing) {
      return {
        pageNumber: existing.pageNumber,
        sceneTitle: existing.sceneTitle,
        text: existing.text,
        imageUrl: existing.imageUrl,
      };
    }

    let img = defaultSpreadImage;
    if (pageNum === 1 || pageNum === 2) {
      img = windowSpreadImage;
    } else if (pageNum % 3 === 0) {
      img = planetSpreadImage;
    }

    return {
      pageNumber: pageNum,
      sceneTitle: titles[(pageNum - 1) % titles.length] || `Chapter ${pageNum}`,
      text: `One quiet evening, ${preview.childName} discovered that true bravery comes from listening with kindness and dreaming big.`,
      imageUrl: img,
    };
  });

  // Top 3 preview spreads
  const sampleSpreads = [
    {
      title: `Meet ${preview.childName}`,
      sub: 'The brave explorer!',
      text: `Every big adventure starts with a curious question. One evening in Bengaluru, ${preview.childName} spotted a brilliant sapphire star dancing across the sky.`,
      image: windowSpreadImage
    },
    {
      title: 'The Starlight Vessel',
      sub: 'Preparing for launch',
      text: `With a trusty compass and a warm heart, ${preview.childName} stepped aboard the Starlight Cruiser ready to chart the forgotten galaxy.`,
      image: defaultSpreadImage
    },
    {
      title: 'The Crystal Planet',
      sub: 'Singing violet crystals',
      text: `On a glowing violet moon, singing crystals chimed a melody of friendship every time ${preview.childName} smiled.`,
      image: planetSpreadImage
    }
  ];

  // Full-book paired spreads: 16 spreads (pages 1-2, 3-4, 5-6, ... 31-32)
  const pairedSpreads = Array.from({ length: 16 }, (_, idx) => {
    const leftPage = spreads[idx * 2];
    const rightPage = spreads[idx * 2 + 1];
    return {
      spreadIndex: idx,
      left: leftPage,
      right: rightPage
    };
  });

  // Page Flip Animation Variants for realistic 3D physical book feel
  const pageFlipVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 35 : -35,
      opacity: 0,
      scale: 0.97,
      boxShadow: direction > 0 ? '-25px 0 35px rgba(0,0,0,0.15)' : '25px 0 35px rgba(0,0,0,0.15)'
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      boxShadow: '0 20px 40px -15px rgba(0,0,0,0.12)',
      transition: {
        duration: 0.45,
        ease: 'easeInOut' as const
      }
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -35 : 35,
      opacity: 0,
      scale: 0.97,
      boxShadow: direction > 0 ? '25px 0 35px rgba(0,0,0,0.15)' : '-25px 0 35px rgba(0,0,0,0.15)',
      transition: {
        duration: 0.35,
        ease: 'easeInOut' as const
      }
    })
  };

  const handleNextSpread = () => {
    if (activeSpreadIndex < sampleSpreads.length - 1) {
      setFlipDirection(1);
      setActiveSpreadIndex(prev => prev + 1);
    }
  };

  const handlePrevSpread = () => {
    if (activeSpreadIndex > 0) {
      setFlipDirection(-1);
      setActiveSpreadIndex(prev => prev - 1);
    }
  };

  const handleNextFullSpread = () => {
    if (fullBookSpreadIndex < pairedSpreads.length - 1) {
      setFlipDirection(1);
      setFullBookSpreadIndex(prev => prev + 1);
    }
  };

  const handlePrevFullSpread = () => {
    if (fullBookSpreadIndex > 0) {
      setFlipDirection(-1);
      setFullBookSpreadIndex(prev => prev - 1);
    }
  };

  const handlePlaceOrder = () => {
    const selectedPlan = INITIAL_PRICING.find(p => p.format === selectedFormat) || INITIAL_PRICING[1];
    const totalAmount = selectedPlan.price + (arAddon ? 399 : 0);
    const newOrder: Order = {
      id: `WV-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'In Production',
      childName: preview.childName,
      storyTitle: preview.storyTitle,
      format: selectedFormat as any,
      amount: totalAmount,
      language: preview.language,
      coverUrl: preview.coverUrl,
      trackingNumber: `BD${Math.floor(100000000 + Math.random() * 900000000)}IN`
    };
    setOrderComplete(true);
    onOrderSuccess(newOrder);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 text-[#161922]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* Top Header / Back */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#EBE4DA]">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#56647A] hover:text-[#C05638] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Creator</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#56647A]">
              Starring: <strong className="text-[#161922]">{preview.childName}</strong>
            </span>
          </div>
        </div>

        {/* =================================================================
            VIEW 1: FREE PREVIEW WITH REALISTIC 3D PAGE-FLIP (Mockup Screen 6)
            ================================================================= */}
        {viewState === 'preview' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h1 className="font-serif-story font-bold text-2xl sm:text-3xl text-[#161922]">
                  Your free preview is ready!
                </h1>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF2EE] text-[#C05638] text-xs font-bold border border-[#EBE4DA]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>3D Page Turn Enabled</span>
                </div>
              </div>
              <p className="text-sm text-[#56647A]">
                Turn the pages below to preview your child's personalized story. The full physical keepsake includes all 32 pages.
              </p>
            </div>

            {/* Physical Book Realistic Exterior Container with Center Spine & 3D Perspective */}
            <div className="relative [perspective:1400px] py-2">
              {/* Outer Book Cover Shadow & Hardcover Rim */}
              <div className="p-2.5 sm:p-4 rounded-4xl bg-gradient-to-br from-[#2D3139] via-[#1E222A] to-[#14161C] shadow-2xl border-4 border-[#3D424E]/40 relative overflow-hidden">
                
                {/* Book Edge Pages Stack (Thickness Simulation) */}
                <div className="absolute right-1 top-4 bottom-4 w-2 bg-gradient-to-r from-[#D5CDC2] via-[#FAF8F5] to-[#EBE4DA] rounded-r-xs opacity-80" />
                <div className="absolute left-1 top-4 bottom-4 w-2 bg-gradient-to-l from-[#D5CDC2] via-[#FAF8F5] to-[#EBE4DA] rounded-l-xs opacity-80" />

                {/* Animated Page Flip Container */}
                <AnimatePresence mode="wait" custom={flipDirection}>
                  <motion.div
                    key={activeSpreadIndex}
                    custom={flipDirection}
                    variants={pageFlipVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="bg-[#FAF8F5] rounded-2xl sm:rounded-3xl border border-[#EBE4DA] overflow-hidden relative"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Realistic Center Spine Shadow Overlay */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 bg-gradient-to-r from-black/10 via-black/25 to-black/10 pointer-events-none z-20 hidden md:block" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#C5BBAF] pointer-events-none z-20 hidden md:block shadow-sm" />

                    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[380px] sm:min-h-[440px]">
                      
                      {/* Left Page (Text + AR Magic trigger) */}
                      <div className="p-6 sm:p-10 flex flex-col justify-between relative bg-gradient-to-r from-[#F7F4EE] via-[#FAF8F5] to-[#F3EEE5] border-b md:border-b-0 md:border-r border-[#EBE4DA]">
                        {/* Subtle paper texture highlight */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C05638] bg-[#FBF2EE] px-2.5 py-0.5 rounded-full border border-[#EBE4DA]">
                              Spread {activeSpreadIndex + 1} of 3
                            </span>
                            <span className="text-[10px] text-[#8896AB] font-mono">
                              Pages {activeSpreadIndex * 2 + 1} - {activeSpreadIndex * 2 + 2}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <h3 className="font-serif-story font-bold text-2xl sm:text-3xl text-[#161922] leading-tight">
                              {sampleSpreads[activeSpreadIndex].title}
                            </h3>
                            <p className="text-xs font-semibold text-[#8896AB]">
                              {sampleSpreads[activeSpreadIndex].sub}
                            </p>
                          </div>

                          <p className="text-sm sm:text-base text-[#161922] leading-relaxed font-serif-story pt-2">
                            "{sampleSpreads[activeSpreadIndex].text}"
                          </p>
                        </div>
                        
                        <div className="pt-6 border-t border-[#EBE4DA]/70 flex items-center justify-between">
                          <button
                            onClick={() => setIsArModalOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FBF2EE] text-[#C05638] text-xs font-bold hover:bg-[#F5E2DA] transition-all cursor-pointer shadow-xs active:scale-98"
                          >
                            <QrCode className="w-4 h-4" />
                            <span>✨ WonderMagic AR</span>
                          </button>

                          <span className="text-[11px] text-[#8896AB] italic font-serif-story">
                            170gsm Silk Paper
                          </span>
                        </div>
                      </div>

                      {/* Right Page (Full-bleed Illustration with page curl lighting) */}
                      <div className="relative bg-slate-900 overflow-hidden group flex items-center justify-center">
                        <img
                          src={sampleSpreads[activeSpreadIndex].image}
                          alt="Spread illustration"
                          className="w-full h-full object-cover min-h-[300px]"
                        />
                        {/* Page curvature lighting gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 pointer-events-none" />
                        
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-bold text-[#161922] shadow-sm flex items-center gap-1.5 border border-white/40">
                          <Sparkles className="w-3 h-3 text-[#C05638]" />
                          <span>Consistent Likeness</span>
                        </div>

                        {/* Page Number */}
                        <div className="absolute bottom-3 right-4 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-sm">
                          p. {activeSpreadIndex * 2 + 2}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Physical Book Bottom Shadow */}
              <div className="h-4 bg-black/10 blur-md rounded-full mx-10 -mt-2 pointer-events-none" />
            </div>

            {/* Interactive Page Navigation & Thumbnails */}
            <div className="bg-white rounded-2xl p-4 border border-[#EBE4DA] shadow-xs flex items-center justify-between gap-4">
              <button
                onClick={handlePrevSpread}
                disabled={activeSpreadIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#D5CDC2] text-xs font-semibold text-[#161922] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous Page</span>
              </button>

              {/* Spread Quick Buttons */}
              <div className="flex items-center gap-3">
                {sampleSpreads.map((sp, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setFlipDirection(idx > activeSpreadIndex ? 1 : -1);
                      setActiveSpreadIndex(idx);
                    }}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative ${
                      activeSpreadIndex === idx
                        ? 'border-[#C05638] ring-2 ring-[#C05638]/20 scale-105 shadow-sm'
                        : 'border-[#D5CDC2] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={sp.image} alt={`Spread ${idx + 1}`} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold text-center">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextSpread}
                disabled={activeSpreadIndex === sampleSpreads.length - 1}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#D5CDC2] text-xs font-semibold text-[#161922] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition cursor-pointer"
              >
                <span className="hidden sm:inline">Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Bar: Free Preview & Continue to Full Book */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#56647A]">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>Private full-book preview • Request edits anytime</span>
              </div>

              <button
                onClick={() => setViewState('full-book')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C05638] hover:bg-[#AC492E] text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>View full 32-page book</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            VIEW 2: FULL BOOK 32-PAGE REVIEW & PROOF (Mockup Screen 7)
            ================================================================= */}
        {viewState === 'full-book' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h1 className="font-serif-story font-bold text-2xl sm:text-3xl text-[#161922]">
                  Your complete book is ready!
                </h1>
                
                {/* Switch between 3D Flip Reader vs Grid Overview */}
                <div className="flex items-center bg-[#FAF8F5] p-1 rounded-xl border border-[#EBE4DA]">
                  <button
                    onClick={() => setFullBookMode('flip-reader')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      fullBookMode === 'flip-reader'
                        ? 'bg-[#C05638] text-white shadow-xs'
                        : 'text-[#56647A] hover:text-[#161922]'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Flip Reader</span>
                  </button>
                  <button
                    onClick={() => setFullBookMode('grid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      fullBookMode === 'grid'
                        ? 'bg-[#C05638] text-white shadow-xs'
                        : 'text-[#56647A] hover:text-[#161922]'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>32-Page Grid</span>
                  </button>
                </div>
              </div>
              <p className="text-sm text-[#56647A]">
                Take a final look before printing. You can flip through the pages or inspect the full gallery grid.
              </p>
            </div>

            {/* MODE A: 3D Flip Reader (Physical Spread Flipping) */}
            {fullBookMode === 'flip-reader' && (
              <div className="space-y-4">
                <div className="relative [perspective:1400px]">
                  <div className="p-3 sm:p-4 rounded-3xl bg-gradient-to-br from-[#2D3139] via-[#1E222A] to-[#14161C] shadow-2xl border-4 border-[#3D424E]/40 overflow-hidden relative">
                    
                    <AnimatePresence mode="wait" custom={flipDirection}>
                      <motion.div
                        key={fullBookSpreadIndex}
                        custom={flipDirection}
                        variants={pageFlipVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="bg-[#FAF8F5] rounded-2xl overflow-hidden relative border border-[#EBE4DA]"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Spine Shadow */}
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-black/10 via-black/25 to-black/10 pointer-events-none z-20 hidden md:block" />
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#C5BBAF] pointer-events-none z-20 hidden md:block" />

                        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[380px]">
                          {/* Left Page */}
                          <div className="p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-r from-[#F7F4EE] to-[#FAF8F5] border-b md:border-b-0 md:border-r border-[#EBE4DA]">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-xs text-[#56647A]">
                                <span className="font-bold text-[#C05638]">Page {pairedSpreads[fullBookSpreadIndex].left.pageNumber}</span>
                                <span>{pairedSpreads[fullBookSpreadIndex].left.sceneTitle}</span>
                              </div>
                              
                              {pairedSpreads[fullBookSpreadIndex].left.pageNumber === 3 ? (
                                <div className="p-4 rounded-2xl bg-white border border-[#EBE4DA] space-y-2 mt-4">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C05638]">
                                    Parent Dedication
                                  </span>
                                  <p className="text-sm italic font-serif-story text-[#161922] leading-relaxed">
                                    "{preview.dedicationMessage || `For our dearest ${preview.childName}. May your heart always be brave and your smile radiant.`}"
                                  </p>
                                  <p className="text-xs font-bold text-right text-[#56647A]">
                                    — {preview.dedicationFrom || 'With all our love'}
                                  </p>
                                </div>
                              ) : (
                                <p className="text-sm sm:text-base font-serif-story text-[#161922] leading-relaxed pt-2">
                                  "{pairedSpreads[fullBookSpreadIndex].left.text}"
                                </p>
                              )}
                            </div>

                            <div className="text-[10px] font-mono text-[#8896AB] pt-4">
                              Page {pairedSpreads[fullBookSpreadIndex].left.pageNumber} of 32
                            </div>
                          </div>

                          {/* Right Page */}
                          <div className="relative bg-slate-900 overflow-hidden flex items-center justify-center">
                            <img
                              src={pairedSpreads[fullBookSpreadIndex].right.imageUrl}
                              alt={pairedSpreads[fullBookSpreadIndex].right.sceneTitle}
                              className="w-full h-full object-cover min-h-[280px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/5 pointer-events-none" />
                            
                            <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                              p. {pairedSpreads[fullBookSpreadIndex].right.pageNumber}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Flip Reader Controls */}
                <div className="bg-white rounded-2xl p-4 border border-[#EBE4DA] flex items-center justify-between gap-4 shadow-xs">
                  <button
                    onClick={handlePrevFullSpread}
                    disabled={fullBookSpreadIndex === 0}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D5CDC2] text-xs font-semibold text-[#161922] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Spread</span>
                  </button>

                  <div className="text-xs font-bold text-[#161922]">
                    Spread {fullBookSpreadIndex + 1} of {pairedSpreads.length} <span className="text-[#8896AB] font-normal">(Pages {fullBookSpreadIndex * 2 + 1}–{fullBookSpreadIndex * 2 + 2})</span>
                  </div>

                  <button
                    onClick={handleNextFullSpread}
                    disabled={fullBookSpreadIndex === pairedSpreads.length - 1}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D5CDC2] text-xs font-semibold text-[#161922] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F5] transition cursor-pointer"
                  >
                    <span>Next Spread</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* MODE B: 32-Page Grid Proof Gallery */}
            {fullBookMode === 'grid' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE4DA] shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#F5EFEB]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#161922]">
                    All 32 Storybook Pages
                  </span>
                  <span className="text-xs font-semibold text-[#C05638]">
                    Click any page to inspect
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[460px] overflow-y-auto p-1">
                  {spreads.map((p) => (
                    <div
                      key={p.pageNumber}
                      onClick={() => setZoomPage(p.pageNumber)}
                      className="border border-[#EBE4DA] rounded-xl overflow-hidden bg-[#FAF8F5] hover:border-[#C05638] transition cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="aspect-[4/3] bg-slate-900 overflow-hidden relative">
                        <img src={p.imageUrl} alt={p.sceneTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/60 rounded text-[9px] font-bold text-white">
                          p.{p.pageNumber}
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-[11px] font-bold text-[#161922] truncate">{p.sceneTitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions: Request a Change vs Approve */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                onClick={() => setViewState('preview')}
                className="px-6 py-3 rounded-full border border-[#D5CDC2] text-xs font-semibold text-[#56647A] hover:bg-white cursor-pointer"
              >
                Back to Preview
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsChangeModalOpen(true)}
                  className="flex-1 sm:flex-initial px-6 py-3.5 rounded-full border border-[#D5CDC2] hover:border-[#161922] bg-white text-[#161922] font-semibold text-sm transition cursor-pointer"
                >
                  Request a change
                </button>

                <button
                  onClick={() => setViewState('checkout')}
                  className="flex-1 sm:flex-initial px-10 py-3.5 rounded-full bg-[#C05638] hover:bg-[#AC492E] text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Approve & Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            VIEW 3: CHOOSE PACKAGE & CHECKOUT (Mockup Screen 8)
            ================================================================= */}
        {viewState === 'checkout' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="space-y-2">
              <h1 className="font-serif-story font-bold text-2xl sm:text-3xl text-[#161922]">
                Choose your package
              </h1>
              <p className="text-sm text-[#56647A]">
                Select the format you'd like to receive for {preview.childName}'s storybook.
              </p>
            </div>

            {/* 4 Package Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {INITIAL_PRICING.map((pkg) => {
                const isSelected = selectedFormat === pkg.format;
                return (
                  <div
                    key={pkg.format}
                    onClick={() => setSelectedFormat(pkg.format)}
                    className={`bg-white rounded-3xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                      isSelected
                        ? 'border-[#C05638] ring-2 ring-[#C05638]/20 shadow-md'
                        : 'border-[#EBE4DA] hover:border-[#C05638]/50'
                    }`}
                  >
                    {pkg.badge && (
                      <span className={`absolute -top-3 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        pkg.badge === 'Most Popular'
                          ? 'bg-[#C05638] text-white shadow-xs'
                          : 'bg-[#161922] text-[#F5B027]'
                      }`}>
                        {pkg.badge}
                      </span>
                    )}

                    <div className="space-y-3 pt-1">
                      <h3 className="font-serif-story font-bold text-base text-[#161922]">
                        {pkg.title}
                      </h3>
                      
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif-story font-bold text-2xl text-[#161922]">
                          ₹{pkg.price}
                        </span>
                        {pkg.originalPrice && (
                          <span className="text-xs text-[#8896AB] line-through">
                            ₹{pkg.originalPrice}
                          </span>
                        )}
                      </div>

                      <ul className="space-y-2 pt-2 border-t border-[#F5EFEB]">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-[#56647A]">
                            <Check className="w-3.5 h-3.5 text-[#C05638] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#F5EFEB]">
                      <div className={`w-full py-2 rounded-xl text-xs font-bold text-center transition ${
                        isSelected ? 'bg-[#C05638] text-white' : 'bg-[#FAF8F5] text-[#56647A]'
                      }`}>
                        {isSelected ? 'Selected' : 'Select'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AR Add-on */}
            <div 
              onClick={() => setArAddon(!arAddon)}
              className={`bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 ${
                arAddon ? 'border-[#C05638] bg-[#FFFBF8]' : 'border-[#EBE4DA]'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FBF2EE] text-[#C05638] flex items-center justify-center shrink-0">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif-story font-bold text-base text-[#161922]">
                      Bring the book to life (AR)
                    </h4>
                    <span className="px-2 py-0.5 rounded-md bg-[#C05638]/10 text-[#C05638] text-[10px] font-bold">
                      WonderMagic
                    </span>
                  </div>
                  <p className="text-xs text-[#56647A] max-w-md">
                    Every page gets an interactive QR code. Scan with your phone camera to watch the illustration come to life as a short animated scene.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="font-serif-story font-bold text-xl text-[#161922]">
                  +₹399
                </span>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                  arAddon ? 'bg-[#C05638] border-[#C05638] text-white' : 'border-[#D5CDC2]'
                }`}>
                  {arAddon && <Check className="w-4 h-4" />}
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white rounded-2xl p-4 border border-[#EBE4DA] flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#C05638] shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-[#161922]">Made in India</h5>
                  <p className="text-[11px] text-[#8896AB]">Quality printing & binding</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#EBE4DA] flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#C05638] shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-[#161922]">Privacy protected</h5>
                  <p className="text-[11px] text-[#8896AB]">Your child's photo is safe</p>
                </div>
              </div>
            </div>

            {/* Bottom Checkout Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#EBE4DA]">
              <button
                onClick={() => setViewState('full-book')}
                className="px-6 py-3 rounded-full border border-[#D5CDC2] text-xs font-semibold text-[#56647A] hover:bg-white cursor-pointer"
              >
                Back to Proof
              </button>

              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="px-10 py-4 rounded-full bg-[#C05638] hover:bg-[#AC492E] text-white font-semibold text-base shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Change Request Modal */}
      {isChangeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#EBE4DA] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5EFEB]">
              <div className="flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-[#C05638]" />
                <h3 className="font-serif-story font-bold text-xl text-[#161922]">
                  Request Story Changes
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsChangeModalOpen(false);
                  setChangeSubmitted(false);
                }}
                className="p-1 rounded-full text-[#8896AB] hover:text-[#161922]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {changeSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif-story font-bold text-lg text-[#161922]">
                  Change Request Received!
                </h4>
                <p className="text-xs text-[#56647A]">
                  Our editorial and illustration team will update your proof within 2 hours.
                </p>
                <button
                  onClick={() => {
                    setIsChangeModalOpen(false);
                    setChangeSubmitted(false);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#161922] text-white text-xs font-semibold"
                >
                  Back to Review
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-[#56647A]">
                  Tell our artists what you'd like adjusted (e.g. hair length, skin tone, glasses, clothing colors, or phrasing on specific pages).
                </p>

                <textarea
                  rows={4}
                  value={changeText}
                  onChange={(e) => setChangeText(e.target.value)}
                  placeholder="e.g. Please add round glasses to Aarav on page 4, and make his space suit darker blue."
                  className="w-full p-4 rounded-2xl border border-[#D5CDC2] text-xs text-[#161922] focus:border-[#C05638] outline-none"
                />

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setIsChangeModalOpen(false)}
                    className="px-5 py-2 rounded-full border border-[#D5CDC2] text-xs font-semibold text-[#56647A]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setChangeSubmitted(true)}
                    disabled={!changeText.trim()}
                    className="px-6 py-2.5 rounded-full bg-[#C05638] text-white text-xs font-semibold disabled:opacity-50 hover:bg-[#AC492E]"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AR Modal */}
      {isArModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#EBE4DA] shadow-2xl space-y-5 text-center">
            <div className="flex items-center justify-between pb-2 border-b border-[#F5EFEB]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C05638]">
                📱 WonderMagic AR Scene
              </span>
              <button
                onClick={() => {
                  setIsArModalOpen(false);
                  setIsPlayingAr(false);
                }}
                className="p-1 rounded-full text-[#8896AB] hover:text-[#161922]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 relative flex items-center justify-center">
              <img
                src="/src/assets/images/storybook_mockup_animated_1789747788784.jpg"
                alt="AR Animation"
                className={`w-full h-full object-cover ${isPlayingAr ? 'scale-108 transition-transform duration-3000' : ''}`}
              />
              
              {!isPlayingAr ? (
                <button
                  onClick={() => setIsPlayingAr(true)}
                  className="absolute w-14 h-14 rounded-full bg-[#C05638] text-white flex items-center justify-center shadow-lg hover:scale-105 transition cursor-pointer"
                >
                  <Play className="w-6 h-6 ml-0.5" />
                </button>
              ) : (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 text-white text-[10px] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>AR Scene Playing</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h4 className="font-serif-story font-bold text-base text-[#161922]">
                Scan & Watch Animation
              </h4>
              <p className="text-xs text-[#56647A]">
                Every physical book includes a unique QR code. Parents scan the printed page with their camera phone — no separate app required!
              </p>
            </div>

            <button
              onClick={() => setIsArModalOpen(false)}
              className="w-full py-3 rounded-full bg-[#161922] text-white text-xs font-semibold"
            >
              Close Demo
            </button>
          </div>
        </div>
      )}

      {/* Page Zoom Inspection Modal */}
      {zoomPage !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full border border-[#EBE4DA] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F5EFEB]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#161922]">
                  Page {zoomPage} of 32: {spreads[zoomPage - 1]?.sceneTitle}
                </span>
              </div>
              <button
                onClick={() => setZoomPage(null)}
                className="p-1 rounded-full text-[#8896AB] hover:text-[#161922]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 relative">
              <img
                src={spreads[zoomPage - 1]?.imageUrl}
                alt={spreads[zoomPage - 1]?.sceneTitle}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE4DA]">
              <p className="text-xs text-[#161922] font-serif-story leading-relaxed">
                "{spreads[zoomPage - 1]?.text}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setZoomPage(Math.max(1, zoomPage - 1))}
                disabled={zoomPage === 1}
                className="px-4 py-2 rounded-full border border-[#D5CDC2] text-xs font-semibold disabled:opacity-40"
              >
                Previous Page
              </button>
              <button
                onClick={() => setZoomPage(Math.min(32, zoomPage + 1))}
                disabled={zoomPage === 32}
                className="px-4 py-2 rounded-full border border-[#D5CDC2] text-xs font-semibold disabled:opacity-40"
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#EBE4DA] shadow-2xl space-y-6">
            {orderComplete ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif-story font-bold text-2xl text-[#161922]">
                  Storybook Order Placed!
                </h3>
                <p className="text-xs text-[#56647A] max-w-sm mx-auto">
                  Thank you! Your personalized keepsake for <strong>{preview.childName}</strong> is now moving to our Bengaluru printing house.
                </p>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE4DA] text-xs text-[#56647A] text-left space-y-1">
                  <div className="flex justify-between">
                    <span>Order Number:</span>
                    <strong className="text-[#161922]">#WV-84920</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Delivery:</span>
                    <strong className="text-[#161922]">3-5 Business Days</strong>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    onBack();
                  }}
                  className="w-full py-3.5 rounded-full bg-[#C05638] text-white font-semibold text-sm hover:bg-[#AC492E]"
                >
                  Return to Home
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F5EFEB]">
                  <h3 className="font-serif-story font-bold text-xl text-[#161922]">
                    Order Summary
                  </h3>
                  <button
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="p-1 rounded-full text-[#8896AB] hover:text-[#161922]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2.5 text-xs text-[#56647A]">
                  <div className="flex justify-between">
                    <span>{preview.storyTitle} ({preview.childName}'s Edition)</span>
                    <strong className="text-[#161922]">
                      ₹{selectedFormat === 'digital' ? 299 : selectedFormat === 'bundle-2' ? 1499 : selectedFormat === 'bundle-3' ? 1999 : 999}
                    </strong>
                  </div>
                  {arAddon && (
                    <div className="flex justify-between">
                      <span>Bring it to life (AR View)</span>
                      <strong className="text-[#161922]">+₹399</strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping across India</span>
                    <span className="text-[#16A34A] font-bold">FREE</span>
                  </div>
                  <div className="pt-3 border-t border-[#F5EFEB] flex justify-between text-sm font-bold text-[#161922]">
                    <span>Total Amount</span>
                    <span className="text-[#C05638] font-serif-story text-lg">
                      ₹{(selectedFormat === 'digital' ? 299 : selectedFormat === 'bundle-2' ? 1499 : selectedFormat === 'bundle-3' ? 1999 : 999) + (arAddon ? 399 : 0)}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EBE4DA] space-y-2 text-xs">
                  <span className="font-bold text-[#161922] block">Delivery Details</span>
                  <input
                    type="text"
                    placeholder="Delivery Address / City / Pincode"
                    defaultValue="12th Main, Indiranagar, Bengaluru, 560038"
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CDC2] text-xs text-[#161922] bg-white outline-none"
                  />
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3.5 rounded-full bg-[#C05638] hover:bg-[#AC492E] text-white font-semibold text-sm shadow-sm transition"
                >
                  Complete Order • ₹{(selectedFormat === 'digital' ? 299 : selectedFormat === 'bundle-2' ? 1499 : selectedFormat === 'bundle-3' ? 1999 : 999) + (arAddon ? 399 : 0)}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
