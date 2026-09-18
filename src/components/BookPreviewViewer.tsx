import React, { useState } from 'react';
import { PersonalizedStoryPreview, BookFormat, PersonalizedPage } from '../types';
import { INITIAL_PRICING } from '../data/mockStories';
import { PersonalizedFaceComposite } from './PersonalizedFaceComposite';
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
  Heart,
  UserCheck,
  Eye,
  Sliders
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
  // Current page index: 0 = Page 1 (Cover), 1 = Page 2 (Title), 2 = Page 3 (Dedication), 3..28 = Story, 29 = Ending, 30 = About Hero, 31 = End Page
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<BookFormat>('paperback');
  
  // Dynamic Gender Version & Face Replacement States
  const [activeGender, setActiveGender] = useState<'boy' | 'girl'>(
    preview.gender === 'girl' ? 'girl' : 'boy'
  );
  const [showFaceReplacement, setShowFaceReplacement] = useState<boolean>(true);

  const totalPages = preview.pages.length > 0 ? preview.pages.length : 32;
  const currentPage = preview.pages[currentPageIndex] || {
    pageNumber: currentPageIndex + 1,
    sceneTitle: `Page ${currentPageIndex + 1}`,
    text: '',
    imageUrl: preview.coverUrl,
    isUnlockedInPreview: currentPageIndex < 5
  };

  // Helper to dynamically resolve Boy or Girl illustration for any page
  const getPageImageForGender = (page: PersonalizedPage, targetGender: 'boy' | 'girl'): string => {
    let url = page.imageUrl || preview.coverUrl;
    if (targetGender === 'girl') {
      url = url.replace('space_boy_window', 'space_girl_window')
               .replace('space_boy_scene', 'space_girl_scene')
               .replace('space_boy_planet', 'space_girl_planet')
               .replace('jungle_boy_trail', 'jungle_girl_trail')
               .replace('aarav_magical_3d', 'space_girl_scene')
               .replace('kabir_superhero', 'space_girl_scene');
    } else {
      url = url.replace('space_girl_window', 'space_boy_window')
               .replace('space_girl_scene', 'space_boy_scene')
               .replace('space_girl_planet', 'space_boy_planet')
               .replace('jungle_girl_trail', 'jungle_boy_trail')
               .replace('ananya_watercolor', 'aarav_magical_3d');
    }
    return url;
  };

  const getPageCategoryLabel = (idx: number): string => {
    if (idx === 0) return 'Cover (Page 1)';
    if (idx === 1) return 'Title Page (Page 2)';
    if (idx === 2) return 'Dedication (Page 3)';
    if (idx >= 3 && idx <= 4) return `Story (Page ${idx + 1})`;
    if (idx >= 5 && idx <= 28) return `Story (Page ${idx + 1} 🔒)`;
    if (idx === 29) return 'Ending (Page 30 🔒)';
    if (idx === 30) return 'About Our Hero (Page 31 🔒)';
    return 'End Page & Imprint (Page 32 🔒)';
  };

  // Character Face to use for composite replacement
  const characterFaceUrl = preview.characterFaceUrl || preview.photoUrl;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-[#FFF8F5] border border-[#FCD9D0]">
        <div className="flex items-center gap-3">
          {preview.photoUrl ? (
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#EB5E44] shrink-0 bg-[#162032] shadow-sm">
              <img src={preview.photoUrl} alt={preview.childName} className="w-full h-full object-cover" />
            </div>
          ) : (
            <span className="w-12 h-12 rounded-2xl bg-[#EB5E44] text-white flex items-center justify-center font-bold text-base shadow-sm">
              ✨
            </span>
          )}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#EB5E44] bg-[#EB5E44]/10 px-2 py-0.5 rounded-md">
                32-Page Keepsake Edition
              </span>
              <span className="text-[11px] font-semibold text-[#56647A]">
                8.5 × 8.5 inch • Lulu Standard
              </span>
              <span className="text-[11px] font-bold text-[#4EAA8C] bg-[#E8F6F0] px-2 py-0.5 rounded-md flex items-center gap-1">
                <UserCheck className="w-3 h-3" /> Face Replaced
              </span>
            </div>
            <h2 className="font-display text-lg font-bold text-[#162032] mt-0.5">
              {preview.childName}’s Personalized Storybook
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
                  text: `Check out ${preview.childName}'s 32-page personalized story on Verve Studio!`,
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

      {/* Interactive Controls Bar: Gender Version Switcher & Face Replacement Toggle */}
      <div className="bg-[#162032] text-white rounded-2xl p-3.5 shadow-md flex flex-wrap items-center justify-between gap-3">
        {/* Gender Template Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#F5B027] flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" /> Character Template:
          </span>
          <div className="inline-flex bg-white/10 p-1 rounded-xl">
            <button
              onClick={() => setActiveGender('boy')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeGender === 'boy'
                  ? 'bg-[#EB5E44] text-white shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span>👦 Boy Version</span>
            </button>
            <button
              onClick={() => setActiveGender('girl')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeGender === 'girl'
                  ? 'bg-[#EB5E44] text-white shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span>👧 Girl Version</span>
            </button>
          </div>
        </div>

        {/* Face Replacement Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/80 font-medium hidden sm:inline">
            Face Integration:
          </span>
          <button
            onClick={() => setShowFaceReplacement(!showFaceReplacement)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              showFaceReplacement
                ? 'bg-[#4EAA8C] text-white shadow-xs'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {showFaceReplacement ? (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                <span>Face Replaced (Active)</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Show Base Template</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 32-Page Structure Quick Navigation Bar */}
      <div className="bg-white rounded-2xl p-3 border border-[#E8DFD1] shadow-xs">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#56647A] flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#EB5E44]" />
            32-Page Architecture (8.5 × 8.5 in Lulu Specification)
          </span>
          <span className="text-[11px] font-bold text-[#EB5E44]">
            Page {currentPageIndex + 1} of 32
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {[
            { label: '1 Cover', idx: 0, unlocked: true },
            { label: '2 Title', idx: 1, unlocked: true },
            { label: '3 Dedication', idx: 2, unlocked: true },
            { label: '4 Story', idx: 3, unlocked: true },
            { label: '5 Story', idx: 4, unlocked: true },
            { label: '6–29 Story', idx: 5, unlocked: false },
            { label: '30 Ending', idx: 29, unlocked: false },
            { label: '31 Hero Profile', idx: 30, unlocked: false },
            { label: '32 End Page', idx: 31, unlocked: false },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setCurrentPageIndex(item.idx)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
                (item.idx === currentPageIndex || (item.idx === 5 && currentPageIndex >= 5 && currentPageIndex <= 28))
                  ? 'bg-[#162032] text-white shadow-xs'
                  : item.unlocked
                  ? 'bg-[#FAF7F2] text-[#162032] hover:bg-[#F0E9DF] border border-[#E8DFD1]'
                  : 'bg-white text-[#7A889B] hover:bg-[#FAF7F2] border border-dashed border-[#D5CDBC]'
              }`}
            >
              {!item.unlocked && <Lock className="w-2.5 h-2.5 opacity-60" />}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Main Interactive Book Spread */}
      <div className="relative max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-[#E8DFD1] shadow-2xl book-shadow">
          {/* SPREAD: COVER (Page 1) */}
          {currentPageIndex === 0 && (
            <div className="aspect-[4/3] sm:aspect-square max-w-xl mx-auto rounded-2xl overflow-hidden relative bg-[#162032] flex flex-col justify-between p-6 sm:p-10 text-white shadow-inner border border-white/10">
              <PersonalizedFaceComposite
                sceneImage={getPageImageForGender(currentPage, activeGender)}
                characterFaceUrl={characterFaceUrl}
                referencePhotoUrl={preview.photoUrl}
                faceSlot={currentPage.faceSlot || { top: 32, left: 44, width: 24, height: 28, rotate: 0 }}
                gender={activeGender}
                childName={preview.childName}
                showFaceReplacement={showFaceReplacement}
                className="absolute inset-0 w-full h-full"
                altText={`Personalized Cover for ${preview.childName}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25 pointer-events-none" />

              {/* Cover Top */}
              <div className="relative z-10 flex items-center justify-between pointer-events-none">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#F5B027] border border-[#F5B027]/40 px-3 py-1 rounded-full backdrop-blur-xs">
                  VERVE STUDIO • 8.5 × 8.5 INCH
                </span>
                <span className="text-xs font-medium text-white/90 bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                  {activeGender === 'girl' ? 'Girl Edition' : 'Boy Edition'}
                </span>
              </div>

              {/* Cover Center Title */}
              <div className="relative z-10 my-auto text-center py-4 pointer-events-none">
                <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#F5B027] uppercase drop-shadow-sm">
                  A personalized adventure for
                </p>
                <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-1.5 drop-shadow-md">
                  {preview.childName}
                </h1>
                <p className="font-display text-xl sm:text-2xl font-bold text-white/95 mt-2 drop-shadow-sm">
                  & {preview.storyTitle}
                </p>
              </div>

              {/* Cover Bottom */}
              <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-4 text-xs font-medium text-white/85 pointer-events-none">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#4EAA8C]"></span>
                  32 Full-Color Pages
                </span>
                <span className="text-[#F5B027] font-semibold">Matte Laminated Cover</span>
              </div>
            </div>
          )}

          {/* SPREAD: TITLE PAGE (Page 2) */}
          {currentPageIndex === 1 && (
            <div className="aspect-[4/3] sm:aspect-square max-w-xl mx-auto rounded-2xl p-6 sm:p-10 bg-[#FAF7F2] border border-[#E8DFD1] flex flex-col justify-between items-center text-center relative book-spine-left">
              <div className="w-full flex justify-between items-center text-[11px] text-[#56647A] font-semibold">
                <span>VERVE STUDIO ORIGINAL</span>
                <span>8.5 × 8.5 INCH PICTURE BOOK</span>
              </div>

              <div className="my-auto space-y-3 max-w-md w-full">
                {/* Hero Portrait in circular/medallion frame */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-[#EB5E44] mx-auto shadow-md relative bg-[#162032]">
                  <PersonalizedFaceComposite
                    sceneImage={getPageImageForGender(currentPage, activeGender)}
                    characterFaceUrl={characterFaceUrl}
                    referencePhotoUrl={preview.photoUrl}
                    faceSlot={currentPage.faceSlot || { top: 38, left: 47, width: 24, height: 28 }}
                    gender={activeGender}
                    childName={preview.childName}
                    showFaceReplacement={showFaceReplacement}
                    altText="Title Page Portrait"
                  />
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#162032] leading-tight">
                  {preview.storyTitle}
                </h3>
                <div className="w-16 h-0.5 bg-[#EB5E44] mx-auto rounded-full my-1"></div>
                <p className="text-xs sm:text-sm font-medium text-[#56647A]">
                  A personalized storybook written especially for
                </p>
                <p className="font-display text-xl sm:text-2xl font-bold text-[#EB5E44]">
                  {preview.childName} (Age {preview.childAge})
                </p>
                <p className="text-[11px] text-[#56647A]">
                  Illustrated in bespoke <span className="font-bold text-[#162032]">{preview.characterStyle}</span> ({activeGender === 'girl' ? 'Girl' : 'Boy'} Edition)
                </p>
              </div>

              <div className="w-full pt-4 border-t border-[#E8DFD1] flex items-center justify-between text-[11px] text-[#56647A]">
                <span>First Edition • 32 Pages</span>
                <span className="font-bold">Page 2</span>
              </div>
            </div>
          )}

          {/* SPREAD: DEDICATION (Page 3) */}
          {currentPageIndex === 2 && (
            <div className="aspect-[4/3] sm:aspect-square max-w-xl mx-auto rounded-2xl p-6 sm:p-10 bg-[#FAF7F2] border border-[#E8DFD1] flex flex-col justify-between items-center text-center relative book-spine-left">
              <div className="w-full text-right text-[11px] text-[#56647A]">
                <span>Keepsake Dedication</span>
              </div>

              <div className="my-auto max-w-md space-y-3 w-full">
                {/* Hero Bedside / Vignette Portrait */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#EB5E44] mx-auto shadow-md relative bg-[#162032]">
                  <PersonalizedFaceComposite
                    sceneImage={getPageImageForGender(currentPage, activeGender)}
                    characterFaceUrl={characterFaceUrl}
                    referencePhotoUrl={preview.photoUrl}
                    faceSlot={currentPage.faceSlot || { top: 38, left: 47, width: 22, height: 26 }}
                    gender={activeGender}
                    childName={preview.childName}
                    showFaceReplacement={showFaceReplacement}
                    altText="Dedication Portrait"
                  />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-[#56647A] block">
                  Dedication Page
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#162032]">
                  For Our Hero, {preview.childName}
                </h3>
                <p className="text-xs sm:text-sm text-[#162032] italic leading-relaxed font-serif bg-white/70 p-4 rounded-xl border border-[#E8DFD1]/80">
                  "{preview.dedicationMessage}"
                </p>
                <p className="text-xs font-bold text-[#EB5E44]">
                  With endless love, {preview.dedicationFrom}
                </p>
              </div>

              <div className="w-full pt-4 border-t border-[#E8DFD1] flex items-center justify-between text-[11px] text-[#56647A]">
                <span>Printed on White Coated Paper</span>
                <span className="font-bold">Page 3</span>
              </div>
            </div>
          )}

          {/* SPREAD: STORY PAGES & SPECIAL PAGES (Page 4+) */}
          {currentPageIndex >= 3 && (
            <div>
              {(() => {
                const page = currentPage;

                if (!page.isUnlockedInPreview) {
                  return (
                    <div className="aspect-[4/3] sm:aspect-[16/11] rounded-2xl p-8 bg-[#FAF7F2] border border-[#E8DFD1] flex flex-col justify-center items-center text-center relative overflow-hidden">
                      {/* Blurred background preview with gender illustration */}
                      <img
                        src={getPageImageForGender(page, activeGender)}
                        alt="Locked spread"
                        className="absolute inset-0 w-full h-full object-cover filter blur-md opacity-30"
                      />
                      <div className="relative z-10 max-w-md p-6 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E8DFD1] shadow-lg">
                        <div className="w-12 h-12 rounded-2xl bg-[#162032] text-[#F5B027] flex items-center justify-center mx-auto mb-3 shadow-md">
                          <Lock className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#EB5E44] bg-[#FFF8F5] px-2.5 py-0.5 rounded-full border border-[#FCD9D0]">
                          {getPageCategoryLabel(currentPageIndex)}
                        </span>
                        <h4 className="font-display text-xl font-bold text-[#162032] mt-2">
                          Pages 6 to 32 are Reserved
                        </h4>
                        <p className="text-xs text-[#56647A] mt-2 mb-4 leading-relaxed">
                          Unlock the complete 32-page personalized keepsake (8.5 × 8.5 inch square format, printed on premium white coated paper with matte laminated cover) to see how {preview.childName} completes their journey!
                        </p>
                        <button
                          onClick={() => onUnlockStory(selectedFormat, preview)}
                          className="w-full py-2.5 rounded-xl bg-[#EB5E44] hover:bg-[#D94F36] text-white text-xs font-bold transition-colors shadow-sm"
                        >
                          Unlock Complete 32-Page Story (From ₹399)
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl overflow-hidden border border-[#E8DFD1] bg-[#FAF7F2]">
                    {/* Page Left: Illustrated Scene with Face Replacement */}
                    <div className="relative aspect-square sm:aspect-auto bg-[#162032] overflow-hidden min-h-[300px]">
                      <PersonalizedFaceComposite
                        sceneImage={getPageImageForGender(page, activeGender)}
                        characterFaceUrl={characterFaceUrl}
                        referencePhotoUrl={preview.photoUrl}
                        faceSlot={page.faceSlot || { top: 36, left: 46, width: 24, height: 28, rotate: 0 }}
                        gender={activeGender}
                        childName={preview.childName}
                        showFaceReplacement={showFaceReplacement}
                        altText={page.sceneTitle}
                      />
                    </div>

                    {/* Page Right: Personalized Narrative Text */}
                    <div className="p-6 sm:p-8 flex flex-col justify-between bg-white book-spine-left">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#EB5E44]">
                            {page.sceneTitle}
                          </span>
                          <span className="text-[10px] text-[#56647A] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8DFD1]">
                            {activeGender === 'girl' ? 'Girl Edition' : 'Boy Edition'}
                          </span>
                        </div>
                        <p className="font-sans text-sm sm:text-base leading-relaxed text-[#162032] mt-4 font-medium whitespace-pre-line">
                          {page.text}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-[#F0E9DF] flex items-center justify-between text-xs text-[#56647A]">
                        <span>Language: {preview.language}</span>
                        <span className="font-bold">Page {page.pageNumber} of 32</span>
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

            <div className="text-center">
              <span className="text-xs font-bold text-[#162032] block">
                {getPageCategoryLabel(currentPageIndex)}
              </span>
              <span className="text-[10px] text-[#56647A]">
                8.5 × 8.5 inch Lulu Standard
              </span>
            </div>

            <button
              onClick={() => setCurrentPageIndex(Math.min(totalPages - 1, currentPageIndex + 1))}
              disabled={currentPageIndex >= totalPages - 1}
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
            Complete Their 32-Page Adventure
          </span>
          <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-[#162032] mt-2">
            Ready to give {preview.childName} their full book?
          </h3>
          <p className="text-sm text-[#56647A] mt-2">
            Choose instant high-resolution digital download or receive a beautifully printed 8.5 × 8.5 inch keepsake delivered to your doorstep anywhere in India.
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

                {/* Print Spec Card Pill */}
                <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E8DFD1] text-[11px] text-[#162032] mb-3 space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-[#56647A]">Size & Pages:</span>
                    <span>8.5 × 8.5 in • 32 Pages</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-[#56647A]">Paper & Finish:</span>
                    <span>White Coated • Matte</span>
                  </div>
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

