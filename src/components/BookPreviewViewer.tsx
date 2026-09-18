import React, { useState } from 'react';
import { PersonalizedStoryPreview, BookFormat } from '../types';
import { INITIAL_PRICING } from '../data/mockStories';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Lock, 
  Check, 
  Download, 
  BookOpen, 
  ShieldCheck,
  Share2,
  Heart
} from 'lucide-react';

interface BookPreviewViewerProps {
  preview: PersonalizedStoryPreview;
  onUnlockStory: (format: BookFormat, preview: PersonalizedStoryPreview) => void;
  onEditDetails: () => void;
}

export const BookPreviewViewer: React.FC<BookPreviewViewerProps> = ({
  preview,
  onUnlockStory,
  onEditDetails
}) => {
  // Current page index: 0 = Cover, 1 = Dedication, 2... = story pages
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<BookFormat>('paperback');

  const totalPagesInReader = preview.pages.length + 2; // cover + dedication + pages

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-[#FFF8F5] border border-[#FCD9D0]">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-[#EB5E44] text-white flex items-center justify-center font-bold text-sm">
            ✨
          </span>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#EB5E44] bg-[#EB5E44]/10 px-2 py-0.5 rounded-md">
              Free Personalized Preview
            </span>
            <h2 className="font-display text-lg font-bold text-[#162032] mt-0.5">
              {preview.childName}’s Story is Ready!
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onEditDetails}
            className="px-4 py-2 rounded-xl border border-[#E8DFD1] hover:border-[#162032] text-xs font-bold text-[#162032] transition-colors"
          >
            Edit Child Details
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${preview.childName}'s Personalized Story`,
                  text: `Check out ${preview.childName}'s personalized story on Verve Studio!`,
                  url: window.location.href
                }).catch(() => {});
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Preview link copied to clipboard!');
              }
            }}
            className="p-2 rounded-xl border border-[#E8DFD1] hover:border-[#162032] text-[#162032] transition-colors"
            title="Share with family"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Book Spread */}
      <div className="relative max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-[#E8DFD1] shadow-2xl book-shadow">
          {/* SPREAD: COVER (Page 0) */}
          {currentPageIndex === 0 && (
            <div className="aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden relative bg-[#162032] flex flex-col justify-between p-6 sm:p-10 text-white shadow-inner">
              <img
                src={preview.coverUrl}
                alt="Personalized Book Cover"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

              {/* Cover Top */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5B027] border border-[#F5B027]/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  VERVE STUDIO ORIGINAL
                </span>
                <span className="text-xs font-medium text-white/80">
                  Style: {preview.characterStyle}
                </span>
              </div>

              {/* Cover Center Title */}
              <div className="relative z-10 my-auto text-center py-4">
                <p className="text-sm font-semibold tracking-wider text-[#F5B027] uppercase">
                  A personalized adventure for
                </p>
                <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-1 drop-shadow-md">
                  {preview.childName}
                </h1>
                <p className="font-display text-xl sm:text-2xl font-bold text-white/90 mt-2">
                  & {preview.storyTitle}
                </p>
              </div>

              {/* Cover Bottom */}
              <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-4 text-xs font-medium text-white/80">
                <span>{preview.totalPageCount} Full-Color Pages</span>
                <span className="text-[#F5B027] font-semibold">Special First Edition</span>
              </div>
            </div>
          )}

          {/* SPREAD: DEDICATION (Page 1) */}
          {currentPageIndex === 1 && (
            <div className="aspect-[4/3] sm:aspect-[16/11] rounded-2xl p-6 sm:p-12 bg-[#FAF7F2] border border-[#E8DFD1] flex flex-col justify-center items-center text-center relative book-spine-left">
              <div className="w-12 h-12 rounded-full bg-[#FFF8F5] border border-[#FCD9D0] flex items-center justify-center text-[#EB5E44] mb-4">
                <Heart className="w-6 h-6 fill-[#EB5E44]/20" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#56647A] mb-2">
                Dedication Page
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#162032] mb-3">
                Made especially for {preview.childName}
              </h3>
              <p className="text-sm sm:text-base text-[#162032] italic max-w-lg leading-relaxed mb-6 font-serif">
                "{preview.dedicationMessage}"
              </p>
              <p className="text-xs font-bold text-[#EB5E44]">
                With love from: {preview.dedicationFrom}
              </p>
              <div className="absolute bottom-4 right-6 text-[11px] text-[#56647A]">
                Page 1
              </div>
            </div>
          )}

          {/* SPREAD: STORY PAGES (Page 2+) */}
          {currentPageIndex >= 2 && (
            <div>
              {(() => {
                const pageIndex = currentPageIndex - 2;
                const page = preview.pages[pageIndex];

                if (!page) return null;

                if (!page.isUnlockedInPreview) {
                  return (
                    <div className="aspect-[4/3] sm:aspect-[16/11] rounded-2xl p-8 bg-[#FAF7F2] border border-[#E8DFD1] flex flex-col justify-center items-center text-center relative overflow-hidden">
                      {/* Blurred background preview */}
                      <img
                        src={page.imageUrl}
                        alt="Locked spread"
                        className="absolute inset-0 w-full h-full object-cover filter blur-md opacity-25"
                      />
                      <div className="relative z-10 max-w-md p-6 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E8DFD1] shadow-lg">
                        <div className="w-12 h-12 rounded-2xl bg-[#162032] text-[#F5B027] flex items-center justify-center mx-auto mb-3 shadow-md">
                          <Lock className="w-6 h-6" />
                        </div>
                        <h4 className="font-display text-xl font-bold text-[#162032]">
                          Pages 5 to {preview.totalPageCount} are Reserved
                        </h4>
                        <p className="text-xs text-[#56647A] mt-2 mb-4 leading-relaxed">
                          Unlock the complete 24-page personalized keepsake to see how {preview.childName} discovers the secret and returns home triumphantly!
                        </p>
                        <button
                          onClick={() => onUnlockStory(selectedFormat, preview)}
                          className="w-full py-2.5 rounded-xl bg-[#EB5E44] hover:bg-[#D94F36] text-white text-xs font-bold transition-colors shadow-sm"
                        >
                          Unlock Full Story (From ₹399)
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl overflow-hidden border border-[#E8DFD1] bg-[#FAF7F2]">
                    {/* Page Left: Illustrated Scene */}
                    <div className="relative aspect-square sm:aspect-auto bg-[#162032]">
                      <img
                        src={page.imageUrl}
                        alt={page.sceneTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                        {preview.childName}’s Character
                      </div>
                    </div>

                    {/* Page Right: Personalized Narrative Text */}
                    <div className="p-6 sm:p-8 flex flex-col justify-between bg-white book-spine-left">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#EB5E44]">
                          {page.sceneTitle}
                        </span>
                        <p className="font-sans text-sm sm:text-base leading-relaxed text-[#162032] mt-4 font-medium">
                          {page.text}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-[#F0E9DF] flex items-center justify-between text-xs text-[#56647A]">
                        <span>Language: {preview.language}</span>
                        <span>Page {page.pageNumber}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Reader Pagination Controls */}
          <div className="mt-6 flex items-center justify-between border-t border-[#F0E9DF] pt-4">
            <button
              onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
              disabled={currentPageIndex === 0}
              className="px-4 py-2 rounded-xl border border-[#E8DFD1] text-xs font-bold text-[#162032] disabled:opacity-30 hover:border-[#162032] flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>

            <span className="text-xs font-bold text-[#56647A]">
              {currentPageIndex === 0
                ? 'Cover Spread'
                : currentPageIndex === 1
                ? 'Dedication Spread'
                : `Spread ${currentPageIndex - 1} of ${preview.totalPageCount}`}
            </span>

            <button
              onClick={() => setCurrentPageIndex(Math.min(totalPagesInReader - 1, currentPageIndex + 1))}
              disabled={currentPageIndex >= totalPagesInReader - 1}
              className="px-4 py-2 rounded-xl border border-[#E8DFD1] text-xs font-bold text-[#162032] disabled:opacity-30 hover:border-[#162032] flex items-center gap-1 transition-colors"
            >
              <span>Next Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION: Ready to see the whole adventure? (Conversion Engine) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD1] shadow-lg">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44] bg-[#FFF8F5] px-3 py-1 rounded-full border border-[#FCD9D0]">
            Complete Their Adventure
          </span>
          <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-[#162032] mt-2">
            Ready to give {preview.childName} their full book?
          </h3>
          <p className="text-sm text-[#56647A] mt-2">
            Choose instant high-resolution digital download or receive a beautifully printed keepsake delivered to your doorstep anywhere in India.
          </p>
        </div>

        {/* Format Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_PRICING.map((plan) => (
            <div
              key={plan.format}
              onClick={() => setSelectedFormat(plan.format)}
              className={`rounded-3xl p-6 border cursor-pointer transition-all flex flex-col justify-between relative ${
                selectedFormat === plan.format
                  ? 'border-[#EB5E44] bg-[#FFF8F5] ring-2 ring-[#EB5E44]/30 shadow-xl'
                  : 'border-[#E8DFD1] bg-white hover:border-[#162032]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#EB5E44] text-white text-[10px] font-extrabold tracking-wider uppercase shadow-xs">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display text-lg font-bold text-[#162032]">{plan.title}</h4>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedFormat === plan.format
                      ? 'border-[#EB5E44] bg-[#EB5E44] text-white'
                      : 'border-[#E8DFD1]'
                  }`}>
                    {selectedFormat === plan.format && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display text-3xl font-extrabold text-[#162032]">
                    ₹{plan.price}
                  </span>
                  <span className="text-xs text-[#56647A] line-through">
                    ₹{plan.originalPrice}
                  </span>
                  <span className="text-[11px] font-bold text-[#4EAA8C]">
                    Save {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}%
                  </span>
                </div>

                <p className="text-xs text-[#56647A] mb-4 leading-relaxed">
                  {plan.description}
                </p>

                <ul className="space-y-2 border-t border-[#F0E9DF] pt-4">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#162032]">
                      <Check className="w-3.5 h-3.5 text-[#4EAA8C] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0E9DF]">
                <button
                  id={`select-format-${plan.format}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFormat(plan.format);
                    onUnlockStory(plan.format, preview);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selectedFormat === plan.format
                      ? 'bg-[#EB5E44] text-white shadow-md'
                      : 'bg-[#162032] text-white hover:bg-[#EB5E44]'
                  }`}
                >
                  Order {plan.title}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-6 border-t border-[#F0E9DF] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-2">
            <span className="text-xs font-bold text-[#162032] block">🚀 Fast Turnaround</span>
            <span className="text-[11px] text-[#56647A]">Printed in 48 hrs</span>
          </div>
          <div className="p-2">
            <span className="text-xs font-bold text-[#162032] block">🇮🇳 India-Wide</span>
            <span className="text-[11px] text-[#56647A]">19,000+ Pincodes</span>
          </div>
          <div className="p-2">
            <span className="text-xs font-bold text-[#162032] block">🛡️ Safe Materials</span>
            <span className="text-[11px] text-[#56647A]">Child-safe soy inks</span>
          </div>
          <div className="p-2">
            <span className="text-xs font-bold text-[#162032] block">⭐ 100% Delight</span>
            <span className="text-[11px] text-[#56647A]">Loved by 12,000+ parents</span>
          </div>
        </div>
      </div>
    </div>
  );
};
