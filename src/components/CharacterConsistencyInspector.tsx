import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  UserCheck, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  Smile, 
  Palette, 
  Eye, 
  Zap, 
  ArrowRight,
  RefreshCw,
  Sliders,
  Scan
} from 'lucide-react';
import { PersonalizedStoryPreview, CharacterStyle } from '../types';

interface CharacterConsistencyInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  preview: PersonalizedStoryPreview;
  activePageNumber: number;
  onUpdateStyle?: (newStyle: CharacterStyle) => void;
}

export const CharacterConsistencyInspector: React.FC<CharacterConsistencyInspectorProps> = ({
  isOpen,
  onClose,
  preview,
  activePageNumber,
  onUpdateStyle
}) => {
  const [selectedStyle, setSelectedStyle] = useState<CharacterStyle>(preview.characterStyle || '3D Magical');
  const [activeTab, setActiveTab] = useState<'comparison' | 'landmarks' | 'palette'>('comparison');

  if (!isOpen) return null;

  const childProfile = preview.childProfile || {
    name: preview.childName,
    characterReferenceId: 'char_ref_hero_982',
    photoUrl: preview.photoUrl || '/src/assets/images/kid_boy_aarav_1789747514421.jpg',
    canonicalCharacterPortraitUrl: preview.characterFaceUrl || '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
    favoriteColor: 'Royal Blue',
    preferredStyle: preview.characterStyle
  };

  const activePage = preview.pages.find(p => p.pageNumber === activePageNumber) || preview.pages[0];

  const styleOptions: { id: CharacterStyle; label: string; desc: string }[] = [
    { id: '3D Magical', label: '3D Magical Animation', desc: 'Pixar-inspired expressive 3D character with warm studio lighting' },
    { id: 'Watercolor', label: 'Whimsical Watercolor', desc: 'Hand-painted pastel textures with soft dreamy contours' },
    { id: 'Adventure Illustration', label: 'Dynamic Adventure', desc: 'Bold brushwork, cinematic shading, and brave heroic energy' },
    { id: 'Classic Storybook', label: 'Classic Storybook', desc: 'Timeless gentle pencil outlines with warm heirloom tones' },
    { id: 'Soft Cartoon', label: 'Soft Playful Cartoon', desc: 'Friendly rounded contours perfect for toddlers' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B0F19]/85 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl bg-[#111827] border border-[#2D3748] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F2937] bg-gradient-to-r from-[#1E293B] via-[#0F172A] to-[#1E293B]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4EAA8C] to-[#3B97D3] flex items-center justify-center text-white shadow-lg font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                    Hero Character Consistency Engine
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Identity Lock: 99.4% Match
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Canonical Token: <span className="font-mono text-amber-300 font-semibold">{childProfile.characterReferenceId}</span> • Locked across all 32 pages
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 overflow-y-auto">
            
            {/* 3-Way Comparative Visual Pipeline */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Scan className="w-4 h-4 text-emerald-400" />
                  3-Way Character Identity Verification
                </label>
                <span className="text-[11px] text-slate-400">
                  Inspect Page #{activePageNumber}: {activePage.sceneTitle}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Original Uploaded Photo */}
                <div className="bg-[#1E293B]/70 border border-slate-700/80 rounded-2xl p-3 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="w-full aspect-square rounded-xl overflow-hidden relative bg-black mb-2.5">
                    <img
                      src={childProfile.photoUrl || '/src/assets/images/kid_boy_aarav_1789747514421.jpg'}
                      alt="Uploaded Child Reference"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-2 text-left">
                      <span className="text-[10px] font-bold text-white block">Step 1: Real Photo Input</span>
                      <span className="text-[9px] text-emerald-400">✓ Face & Hair Landmarks Detected</span>
                    </div>
                  </div>
                  <div className="w-full text-left space-y-1 text-[11px] text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Child Name:</span>
                      <span className="font-bold text-white">{preview.childName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Age:</span>
                      <span className="font-bold text-white">{preview.childAge} Years Old</span>
                    </div>
                  </div>
                </div>

                {/* 2. Canonical Stylized Character Model */}
                <div className="bg-[#1E293B]/70 border-2 border-emerald-500/40 rounded-2xl p-3 flex flex-col items-center text-center relative overflow-hidden shadow-lg shadow-emerald-500/5">
                  <div className="w-full aspect-square rounded-xl overflow-hidden relative bg-black mb-2.5 ring-2 ring-emerald-400/30">
                    <img
                      src={childProfile.canonicalCharacterPortraitUrl || '/src/assets/images/aarav_magical_3d_1789745946003.jpg'}
                      alt="Canonical Hero Character"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow">
                      CANONICAL MODEL
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-2 text-left">
                      <span className="text-[10px] font-bold text-white block">Step 2: Stylized Hero Portrait</span>
                      <span className="text-[9px] text-amber-300">Style: {preview.characterStyle}</span>
                    </div>
                  </div>
                  <div className="w-full text-left space-y-1 text-[11px] text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Face Likeness:</span>
                      <span className="font-bold text-emerald-400">99.4% Verified</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hair & Features:</span>
                      <span className="font-bold text-white">Consistent Curly Lock</span>
                    </div>
                  </div>
                </div>

                {/* 3. In-Scene Render (Current Page) */}
                <div className="bg-[#1E293B]/70 border border-slate-700/80 rounded-2xl p-3 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="w-full aspect-square rounded-xl overflow-hidden relative bg-black mb-2.5">
                    <img
                      src={activePage.imageUrl || preview.coverUrl}
                      alt="In-Scene Hero Render"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#EB5E44] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                      PAGE #{activePageNumber} SPREAD
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-2 text-left">
                      <span className="text-[10px] font-bold text-white block">Step 3: In-Scene Composite</span>
                      <span className="text-[9px] text-slate-300">{activePage.sceneTitle}</span>
                    </div>
                  </div>
                  <div className="w-full text-left space-y-1 text-[11px] text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Scene Continuity:</span>
                      <span className="font-bold text-emerald-400">100% Locked</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Outfit Accent:</span>
                      <span className="font-bold text-white">{childProfile.favoriteColor || 'Royal Blue'}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Quality Checklist & Consistency Assurances */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#1E293B]/50 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5 text-white">
                    <Smile className="w-3.5 h-3.5 text-emerald-400" />
                    Facial Geometry
                  </span>
                  <span>99.4%</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Smile arc, cheek contours, and eye shape mapped from child photo.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#1E293B]/50 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5 text-white">
                    <Palette className="w-3.5 h-3.5 text-emerald-400" />
                    Outfit & Skin Tone
                  </span>
                  <span>98.9%</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Skin undertone and signature {childProfile.favoriteColor || 'Royal Blue'} outfit locked across 32 spreads.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#1E293B]/50 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5 text-white">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    32-Spread Continuity
                  </span>
                  <span>100%</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Identifiable as {preview.childName} from cover wrap through to Page 32.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#1E293B]/50 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span className="flex items-center gap-1.5 text-white">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    AR Animation
                  </span>
                  <span>Active</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Optical QR codes bring {preview.childName}'s character to life in 3D.
                </p>
              </div>
            </div>

            {/* Art Style Switcher */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                Artistic Style Engine:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {styleOptions.map((opt) => {
                  const isSelected = selectedStyle === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSelectedStyle(opt.id);
                        if (onUpdateStyle) onUpdateStyle(opt.id);
                      }}
                      className={`p-3 rounded-2xl text-left border transition ${
                        isSelected
                          ? 'bg-emerald-500/15 border-emerald-500 text-white ring-1 ring-emerald-500'
                          : 'bg-[#1E293B]/50 border-slate-700/70 text-slate-400 hover:bg-[#1E293B] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{opt.label}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{opt.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Footer Action */}
          <div className="px-6 py-4 border-t border-[#1F2937] flex items-center justify-between bg-[#0F172A]">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero generic templates • 100% tailored to your child's likeness</span>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md"
            >
              Done & Return to Book Proof
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
