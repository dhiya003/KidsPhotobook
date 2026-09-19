import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  X, 
  Sparkles, 
  Clock, 
  MessageSquare, 
  Smile, 
  Type, 
  Shirt, 
  Image as ImageIcon, 
  Heart, 
  ArrowRight, 
  Send, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { PersonalizedStoryPreview, ChangeRequest } from '../types';

interface ChangeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preview: PersonalizedStoryPreview;
  activePageNumber: number;
  onSubmitChangeRequest: (request: Omit<ChangeRequest, 'id' | 'status' | 'submittedAt'>) => void;
  onApproveForPrint: () => void;
}

export const ChangeRequestModal: React.FC<ChangeRequestModalProps> = ({
  isOpen,
  onClose,
  preview,
  activePageNumber,
  onSubmitChangeRequest,
  onApproveForPrint
}) => {
  const [selectedPage, setSelectedPage] = useState<number>(activePageNumber || 1);
  const [category, setCategory] = useState<ChangeRequest['category']>('face_likeness');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  const categories: { id: ChangeRequest['category']; label: string; icon: any; example: string }[] = [
    {
      id: 'face_likeness',
      label: 'Child Face & Likeness',
      icon: Smile,
      example: 'e.g. Adjust smile to be bigger, make eye color slightly darker, or refine curly hair texture.'
    },
    {
      id: 'text_wording',
      label: 'Text & Spelling',
      icon: Type,
      example: 'e.g. Change family nickname, fix a pronoun, or add a custom sentence.'
    },
    {
      id: 'character_outfit',
      label: 'Costume & Style',
      icon: Shirt,
      example: 'e.g. Switch jersey color to royal blue, make cape longer, add glasses.'
    },
    {
      id: 'scene_details',
      label: 'Scene & Companions',
      icon: ImageIcon,
      example: 'e.g. Add a tiger cub companion, make starlight background more glowing.'
    },
    {
      id: 'dedication',
      label: 'Dedication & Page 3 Note',
      icon: Heart,
      example: 'e.g. Update "With love from Dadi & Nani", tweak anniversary date.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitChangeRequest({
        pageNumber: selectedPage,
        category,
        description
      });
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setDescription('');
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-[#111827] border border-[#2D3748] rounded-3xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#1F2937] bg-gradient-to-r from-[#1E293B] to-[#0F172A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EB5E44] to-[#F59E0B] flex items-center justify-center text-white font-bold shadow-md shadow-[#EB5E44]/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-['Outfit']">
                  Private Book Proofing & Refinement
                </h3>
                <p className="text-xs text-slate-400">
                  Review every page before printing. Request tweaks with 1-click or approve for print.
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

          {/* Body */}
          <div className="p-6">
            {submittedSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Change Request Received!
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                  Our AI artist pipeline is updating Page #{selectedPage} for <strong className="text-white">{preview.childName}</strong>. Your updated proof will refresh automatically.
                </p>

                <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-4 max-w-md mx-auto mb-6 text-left">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Turnaround Guarantee</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Instant AI re-rendering active. For complex face adjustments, our human illustrator verifies quality before physical binding.
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                  >
                    Request Another Change
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-[#EB5E44] hover:bg-[#D94E34] text-white text-xs font-bold shadow-lg shadow-[#EB5E44]/20 transition"
                  >
                    Back to Book Proof
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* 1. Page Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    1. Which page needs refinement?
                  </label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {preview.pages.map((p) => (
                      <button
                        type="button"
                        key={p.pageNumber}
                        onClick={() => setSelectedPage(p.pageNumber)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-1.5 border ${
                          selectedPage === p.pageNumber
                            ? 'bg-[#EB5E44] text-white border-[#EB5E44] shadow-md shadow-[#EB5E44]/20'
                            : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <span>Page {p.pageNumber}</span>
                        <span className="opacity-60 text-[10px]">({p.sceneTitle.slice(0, 10)}...)</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    2. What would you like to adjust?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = category === cat.id;
                      return (
                        <button
                          type="button"
                          key={cat.id}
                          onClick={() => setCategory(cat.id)}
                          className={`p-3 rounded-2xl text-left border transition flex items-start gap-3 ${
                            isSelected
                              ? 'bg-[#EB5E44]/15 border-[#EB5E44] text-white ring-1 ring-[#EB5E44]'
                              : 'bg-slate-800/50 border-slate-700/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                        >
                          <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-[#EB5E44] text-white' : 'bg-slate-700 text-slate-300'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{cat.label}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{cat.example}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Description Note */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    3. Specific Instructions for our AI & Editorial Team:
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={categories.find(c => c.id === category)?.example || 'Describe the desired changes...'}
                    className="w-full bg-[#1E293B] border border-slate-700 rounded-2xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#EB5E44] focus:ring-1 focus:ring-[#EB5E44] transition"
                    required
                  />
                </div>

                {/* Quality Policy Assurance */}
                <div className="flex items-center gap-3 bg-[#1E293B]/60 border border-slate-700/70 p-3 rounded-2xl text-xs text-slate-300">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p>
                    <strong className="text-white">100% Satisfaction Guarantee:</strong> We won’t send your book to our Heidelberg POD print presses until you give final approval!
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      onApproveForPrint();
                      onClose();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Looks Perfect → Approve for Print</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || !description.trim()}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#EB5E44] to-[#F59E0B] text-white text-xs font-bold shadow-lg shadow-[#EB5E44]/20 hover:opacity-95 disabled:opacity-50 transition flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Refinement</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
