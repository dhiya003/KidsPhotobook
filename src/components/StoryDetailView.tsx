import React from 'react';
import { User, Compass, Clock, Sparkles, BookOpen, Repeat, ArrowLeft } from 'lucide-react';
import { Story } from '../types';

interface StoryDetailViewProps {
  story: Story;
  onBack: () => void;
  onPersonalize: (story: Story) => void;
}

export const StoryDetailView: React.FC<StoryDetailViewProps> = ({
  story,
  onBack,
  onPersonalize
}) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 text-[#161922]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* Back Link */}
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#56647A] hover:text-[#C05638] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to stories</span>
        </button>

        {/* Main 2-Column Layout (Matching Mockup 3. Story Detail) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Big Hero Illustration */}
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] sm:aspect-[1.15/1] rounded-3xl overflow-hidden border border-[#EBE4DA] shadow-xl bg-slate-900 group">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right: Story Info & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title & Description */}
            <div className="space-y-3">
              <h1 className="font-serif-story font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#161922] leading-tight">
                {story.title}
              </h1>
              <p className="text-sm sm:text-base text-[#56647A] leading-relaxed">
                {story.description.replace(/\{\{childName\}\}/g, 'your child')}
              </p>
            </div>

            {/* Metadata Badges */}
            <div className="flex items-center gap-5 sm:gap-6 text-xs sm:text-sm font-medium text-[#56647A] pt-1">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#C05638]" />
                <span>Age {story.ageRange.replace('–', '-')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#C05638]" />
                <span>{story.category}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C05638]" />
                <span>12 min read</span>
              </div>
            </div>

            {/* Price & Primary CTA */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-serif-story font-bold text-3xl text-[#161922]">
                  ₹999
                </span>
                <span className="text-xs text-[#8896AB] line-through">
                  ₹1,499
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E8DFD1] text-[11px] font-semibold text-[#56647A]">
                  Hardcover + Free eBook
                </span>
              </div>

              <button
                id="story-detail-personalise-btn"
                onClick={() => onPersonalize(story)}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-[#C05638] hover:bg-[#AC492E] active:scale-98 text-white font-semibold text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Personalise this story</span>
              </button>
            </div>

            {/* 3 Value Props (Matching Mockup 3) */}
            <div className="pt-6 border-t border-[#EBE4DA] grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Value 1 */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#EBE4DA] flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#FBF2EE] text-[#C05638] flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#161922]">Your child's photo</h4>
                  <p className="text-[11px] text-[#64748B]">& details</p>
                </div>
              </div>

              {/* Value 2 */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#EBE4DA] flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#FBF2EE] text-[#C05638] flex items-center justify-center shrink-0 mt-0.5">
                  <Repeat className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#161922]">Consistent character</h4>
                  <p className="text-[11px] text-[#64748B]">throughout the story</p>
                </div>
              </div>

              {/* Value 3 */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#EBE4DA] flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#FBF2EE] text-[#C05638] flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#161922]">Beautiful illustrations</h4>
                  <p className="text-[11px] text-[#64748B]">& engaging story</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
