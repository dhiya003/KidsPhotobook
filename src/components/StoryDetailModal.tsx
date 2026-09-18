import React from 'react';
import { Story } from '../types';
import { X, Sparkles, BookOpen, Globe2, Heart, ArrowRight, ShieldCheck } from 'lucide-react';

interface StoryDetailModalProps {
  story: Story | null;
  onClose: () => void;
  onStartPersonalization: (story: Story) => void;
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  story,
  onClose,
  onStartPersonalization
}) => {
  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#162032]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-[#E8DFD1] shadow-2xl overflow-hidden my-6">
        {/* Top bar */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-b border-[#E8DFD1] flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44]">
            Story Detail & Sample Spreads
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#56647A] hover:bg-white hover:text-[#162032] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Hero Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#162032] shadow-lg">
              <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
            </div>

            <div className="sm:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-xs font-bold text-[#162032] border border-[#E8DFD1]">
                  Age {story.ageRange}
                </span>
                <span className="text-xs font-bold text-[#EB5E44]">{story.category}</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#162032]">
                {story.title}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#EB5E44]">
                {story.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-[#56647A] leading-relaxed">
                {story.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-[#162032]">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#F5B027]" />
                  {story.pageCount} Pages Full-Color
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-[#F5B027]" />
                  {story.languages.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* What makes this story special */}
          <div className="p-6 rounded-3xl bg-[#FFF8F5] border border-[#FCD9D0] space-y-3">
            <h4 className="font-display font-bold text-base text-[#162032]">
              What makes this storybook special?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#162032]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#EB5E44] shrink-0" />
                <span>Your child becomes the sole hero & protagonist</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#EB5E44] shrink-0" />
                <span>Child’s name woven naturally into every scene</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#EB5E44] shrink-0" />
                <span>Consistent character identity on all pages</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#EB5E44] shrink-0" />
                <span>Custom parent dedication page printed inside</span>
              </div>
            </div>
          </div>

          {/* Sample pages (generic fictional child demonstration) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-base text-[#162032]">
                Sample Illustrated Spreads
              </h4>
              <span className="text-[11px] text-[#56647A] italic">
                *Fictional sample character shown for demonstration
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {story.pages.slice(0, 4).map((p) => (
                <div key={p.pageNumber} className="border border-[#E8DFD1] rounded-2xl overflow-hidden bg-[#FAF7F2]">
                  <div className="aspect-[16/10] bg-[#162032]">
                    <img src={p.defaultImage} alt={p.sceneTitle} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-bold text-[#EB5E44] uppercase">{p.sceneTitle}</span>
                    <p className="text-xs text-[#56647A] mt-1 line-clamp-2">
                      {p.textTemplate.replace(/\{\{childName\}\}/g, 'Aria').replace(/\{\{favoriteColor\}\}/g, 'golden').replace(/\{\{favoriteAnimal\}\}/g, 'starlight fox')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal footer CTA */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#E8DFD1] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#E8DFD1] text-xs font-bold text-[#162032] hover:bg-white"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onStartPersonalization(story);
            }}
            className="px-6 py-2.5 rounded-xl bg-[#EB5E44] hover:bg-[#D94F36] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <span>Personalize This Story For My Child</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
