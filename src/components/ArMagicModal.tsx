import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  QrCode, 
  Smartphone, 
  Camera, 
  RotateCcw, 
  CheckCircle2, 
  Layers,
  Wand2,
  Share2,
  Tv,
  ArrowRight
} from 'lucide-react';
import { PersonalizedStoryPreview, PersonalizedPage } from '../types';

interface ArMagicModalProps {
  isOpen: boolean;
  onClose: () => void;
  preview: PersonalizedStoryPreview;
  initialPageNumber?: number;
}

export const ArMagicModal: React.FC<ArMagicModalProps> = ({
  isOpen,
  onClose,
  preview,
  initialPageNumber = 1
}) => {
  const [selectedPageNum, setSelectedPageNum] = useState<number>(initialPageNumber);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isScanningMode, setIsScanningMode] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [hasScanned, setHasScanned] = useState<boolean>(true);
  const [tapEffectActive, setTapEffectActive] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const activePage: PersonalizedPage = preview.pages.find(p => p.pageNumber === selectedPageNum) || preview.pages[0];

  useEffect(() => {
    setSelectedPageNum(initialPageNumber);
  }, [initialPageNumber]);

  // Handle simulated AR scan
  const handleStartScanSimulation = () => {
    setIsScanningMode(true);
    setHasScanned(false);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanningMode(false);
          setHasScanned(true);
          setIsPlaying(true);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleTriggerTapEffect = (effectText?: string) => {
    setTapEffectActive(effectText || '✨ Magical Sparkles Triggered!');
    setTimeout(() => {
      setTapEffectActive(null);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B0F19]/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl bg-[#111827] border border-[#2D3748] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F2937] bg-gradient-to-r from-[#1E293B] via-[#0F172A] to-[#1E293B]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EB5E44] to-[#F59E0B] flex items-center justify-center shadow-lg shadow-[#EB5E44]/20 text-white font-bold">
                <Sparkles className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white font-['Outfit'] tracking-wide">
                    Verve Magic AR™ — Bring the Book to Life
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#EB5E44]/20 text-[#EB5E44] border border-[#EB5E44]/30">
                    No App Required
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Every printed page has a unique QR. Scan with your phone camera to watch scenes animate with music & voice!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQrModal(!showQrModal)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition"
              >
                <QrCode className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Test on Mobile Phone</span>
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Content Area: 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
            
            {/* Left Column: Interactive AR Viewport (7 Cols) */}
            <div className="lg:col-span-7 bg-[#0B0F19] p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#1F2937]">
              
              {/* Camera Scanner Simulation Overlay */}
              {isScanningMode ? (
                <div className="w-full max-w-md aspect-square rounded-2xl border-2 border-dashed border-[#EB5E44] relative flex flex-col items-center justify-center p-6 bg-black/60 overflow-hidden">
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#EB5E44] to-transparent animate-pulse top-1/4 shadow-lg shadow-[#EB5E44]" />
                  <Camera className="w-12 h-12 text-[#EB5E44] mb-4 animate-bounce" />
                  <p className="text-sm font-semibold text-white">Scanning Physical Book Page #{activePage.pageNumber}...</p>
                  <p className="text-xs text-slate-400 mt-1">Detecting unique Verve Optical Page QR Marker</p>
                  
                  {/* Progress bar */}
                  <div className="w-48 h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#EB5E44] to-[#F59E0B] transition-all duration-200"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                /* AR Animated Live Scene */
                <div className="w-full max-w-lg relative">
                  
                  {/* AR Phone/Viewport Frame */}
                  <div className="relative rounded-3xl overflow-hidden border-4 border-slate-700/60 shadow-2xl bg-black aspect-square group">
                    
                    {/* Background Artwork Layer with parallax zoom animation */}
                    <div 
                      className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ${
                        isPlaying ? 'scale-105 animate-pulse' : 'scale-100'
                      }`}
                      style={{ backgroundImage: `url(${activePage.imageUrl || preview.coverUrl})` }}
                    />

                    {/* Gradient Depth Tint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    {/* Animated AR Stardust / Cosmic Particles Layer */}
                    {isPlaying && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#EB5E44]/20 rounded-full blur-2xl animate-spin-slow" />
                        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-[#F59E0B]/20 rounded-full blur-3xl animate-pulse" />
                        
                        {/* Floating stars */}
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              y: [-10, 10, -10],
                              opacity: [0.3, 1, 0.3],
                              scale: [0.8, 1.2, 0.8]
                            }}
                            transition={{
                              duration: 2 + i * 0.4,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                            className="absolute text-yellow-300 text-base"
                            style={{
                              top: `${15 + (i * 11) % 70}%`,
                              left: `${10 + (i * 13) % 80}%`
                            }}
                          >
                            ✨
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* 3D AR Badge Marker in Upper Left */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>AR Live • Page {activePage.pageNumber} of {preview.totalPageCount || 32}</span>
                    </div>

                    {/* Smart QR Code Marker Badge in Upper Right */}
                    <div className="absolute top-4 right-4 bg-white/90 p-1.5 rounded-xl shadow-lg flex items-center gap-1.5 text-[10px] font-bold text-slate-800">
                      <QrCode className="w-4 h-4 text-[#EB5E44]" />
                      <span className="hidden sm:inline">VRV-P{activePage.pageNumber}</span>
                    </div>

                    {/* Tap-to-Interact Floating Action Callout */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTriggerTapEffect(activePage.arInteractiveTapEffect)}
                        className="px-4 py-2.5 rounded-2xl bg-[#EB5E44]/90 hover:bg-[#EB5E44] backdrop-blur-md text-white font-medium text-xs sm:text-sm shadow-xl flex items-center gap-2 border border-white/30 transition"
                      >
                        <Wand2 className="w-4 h-4 text-yellow-300 animate-bounce" />
                        <span>{activePage.arInteractiveTapEffect || '✨ Tap to Interact in 3D'}</span>
                      </motion.button>
                    </div>

                    {/* Interactive Tap Effect Splash Toast */}
                    <AnimatePresence>
                      {tapEffectActive && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0, y: 20 }}
                          animate={{ scale: 1, opacity: 1, y: 0 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="absolute bottom-20 inset-x-6 mx-auto max-w-sm bg-gradient-to-r from-[#EB5E44] to-[#F59E0B] text-white p-3 rounded-2xl shadow-2xl text-center text-xs sm:text-sm font-bold border border-white/40"
                        >
                          🎉 {tapEffectActive}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Subtitle / Narration Caption Bar */}
                    <div className="absolute bottom-3 inset-x-3 bg-black/75 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-white">
                      <div className="flex items-center justify-between text-[11px] text-amber-300 font-semibold mb-1">
                        <span className="flex items-center gap-1">
                          <Volume2 className="w-3.5 h-3.5" />
                          Audio Voiceover Narration
                        </span>
                        <span className="text-slate-400">0:15 / 0:30</span>
                      </div>
                      <p className="text-xs text-slate-200 line-clamp-2 italic">
                        "{activePage.arAudioNarration || activePage.text}"
                      </p>
                    </div>

                  </div>

                  {/* AR Playback & Simulator Controls */}
                  <div className="flex items-center justify-between mt-3 px-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isPlaying ? 'Pause Animation' : 'Play Animation'}</span>
                      </button>

                      <button
                        onClick={() => setIsAudioMuted(!isAudioMuted)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        title={isAudioMuted ? 'Unmute voice narration' : 'Mute narration'}
                      >
                        {isAudioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                      </button>
                    </div>

                    <button
                      onClick={handleStartScanSimulation}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EB5E44]/20 hover:bg-[#EB5E44]/30 text-[#EB5E44] border border-[#EB5E44]/40 text-xs font-medium transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Re-Scan Page Marker</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Page Selector & Technology Architecture (5 Cols) */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between overflow-y-auto bg-[#111827]">
              
              <div>
                {/* How it works summary */}
                <div className="bg-[#1E293B]/70 border border-[#334155] rounded-2xl p-4 mb-5">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#F59E0B]" />
                    How Verve Magic AR™ Works
                  </h3>
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#EB5E44]/20 text-[#EB5E44] font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                      <p>Open physical book to any page and point your phone camera at the corner QR code.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#EB5E44]/20 text-[#EB5E44] font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                      <p>The web browser immediately opens the 3D scene (instant load, zero app download required).</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#EB5E44]/20 text-[#EB5E44] font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                      <p>Watch <strong className="text-white">{preview.childName}</strong> move, hear personalized voice narration, and tap elements to trigger magical effects!</p>
                    </div>
                  </div>
                </div>

                {/* Page Selector Strip */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Select Book Page to Experience:
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Page {selectedPageNum} of {preview.pages.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {preview.pages.map((p) => {
                      const isSelected = p.pageNumber === selectedPageNum;
                      return (
                        <button
                          key={p.pageNumber}
                          onClick={() => {
                            setSelectedPageNum(p.pageNumber);
                            setIsPlaying(true);
                          }}
                          className={`p-2 rounded-xl text-left border transition flex flex-col items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#EB5E44]/20 border-[#EB5E44] text-white shadow-md'
                              : 'bg-[#1E293B]/60 border-slate-700/60 text-slate-400 hover:bg-[#1E293B] hover:text-slate-200'
                          }`}
                        >
                          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden relative bg-black">
                            <img 
                              src={p.imageUrl || preview.coverUrl} 
                              alt={`Page ${p.pageNumber}`} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1 right-1 bg-black/70 px-1 py-0.5 rounded text-[9px] font-bold text-white">
                              P{p.pageNumber}
                            </div>
                          </div>
                          <span className="text-[11px] font-medium truncate w-full text-center">
                            {p.sceneTitle || `Page ${p.pageNumber}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Page AR Scene Details */}
                <div className="bg-[#1A2234] border border-[#2D3748] rounded-2xl p-4 mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Active Scene Animation Specs</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">
                    {activePage.arSceneDescription || 'Cinematic 3D animation with lighting effects and depth layers.'}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      ⚡ 30 FPS WebGL
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      🎧 Spatial Stereo Audio
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      📱 iOS & Android Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-4 border-t border-[#1F2937] flex items-center justify-between gap-3">
                <button
                  onClick={() => setShowQrModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition"
                >
                  <QrCode className="w-4 h-4 text-[#F59E0B]" />
                  <span>Scan with Real Mobile Phone</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EB5E44] to-[#F59E0B] text-white text-xs font-bold shadow-lg shadow-[#EB5E44]/20 hover:opacity-95 transition flex items-center gap-1.5"
                >
                  <span>Continue Book Proofing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* Test on Phone QR Modal Popup */}
          <AnimatePresence>
            {showQrModal && (
              <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-[#1E293B] border border-slate-700 p-6 rounded-3xl max-w-sm w-full text-center relative shadow-2xl"
                >
                  <button
                    onClick={() => setShowQrModal(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="w-12 h-12 rounded-2xl bg-[#EB5E44]/20 text-[#EB5E44] flex items-center justify-center mx-auto mb-3">
                    <QrCode className="w-6 h-6" />
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">
                    Scan to Test Verve Magic AR™
                  </h4>
                  <p className="text-xs text-slate-300 mb-4">
                    Open your iPhone or Android camera app and point at this code to load this animated scene on your phone.
                  </p>

                  {/* High visual stylized simulated QR Code */}
                  <div className="bg-white p-4 rounded-2xl inline-block mb-4 shadow-inner">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://vervestudio.app/ar-magic-viewer?preview=${preview.id}&page=${selectedPageNum}`} 
                      alt="AR Page QR Code"
                      className="w-40 h-40 object-contain"
                    />
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Works on any iOS / Android browser. No App Store download needed!
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
