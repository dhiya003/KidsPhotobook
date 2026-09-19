import React, { useState } from 'react';
import { ArrowRight, Sparkles, Wand2, BookOpen } from 'lucide-react';
import { Story } from '../types';
import { STORIES } from '../data/mockStories';

interface MagicalStorybookHomeProps {
  onSelectStory: (story: Story) => void;
  onStartWizard?: (storyId?: string) => void;
  onNavigate?: (view: string) => void;
  onCreateCustomStory?: () => void;
}

const CATEGORIES = [
  'All',
  'Adventure & Exploration',
  'Learning & Curiosity',
  'Indian Culture & Heritage',
  'Festival & Celebration',
  'Value & Kindness',
  'Bedtime & Calming',
  'Birthday & Milestone',
  'Spiritual & Mythology',
  'Animals & Nature'
];

export const MagicalStorybookHome: React.FC<MagicalStorybookHomeProps> = ({
  onSelectStory,
  onStartWizard = () => {},
  onNavigate = () => {},
  onCreateCustomStory = () => {}
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredStories = STORIES.filter(s => {
    if (selectedCategory === 'All') return true;
    return s.category === selectedCategory || s.purposeCategory === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 text-[#161922]">
      
      {/* =========================================================
          1. HERO SECTION (Matching Mockup Screen 1)
          ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-4 max-w-2xl">
              <h1 className="font-serif-story font-bold text-4xl sm:text-5xl lg:text-[58px] leading-[1.12] tracking-tight text-[#161922]">
                Make your child the hero of their own story.
              </h1>
              <p className="text-base sm:text-lg text-[#56647A] font-normal leading-relaxed max-w-xl">
                Personalized storybooks, beautifully illustrated with your child's face, dreams and imagination.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1">
              <button
                id="hero-create-story-btn"
                onClick={() => onStartWizard('journey-to-the-stars')}
                className="px-7 py-3.5 rounded-full bg-[#C05638] hover:bg-[#AC492E] active:scale-98 text-white font-semibold text-sm sm:text-base shadow-sm transition-all cursor-pointer"
              >
                Create a Story
              </button>
              <button
                id="hero-explore-stories-btn"
                onClick={() => onNavigate('stories')}
                className="px-7 py-3.5 rounded-full bg-white hover:bg-[#F5EFEB] active:scale-98 border border-[#D5CDC2] text-[#161922] font-semibold text-sm sm:text-base transition-all cursor-pointer"
              >
                Explore Stories
              </button>
            </div>

            {/* 3 Trust / Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 sm:pt-6">
              
              {/* Badge 1 */}
              <div className="bg-white rounded-2xl p-4 border border-[#EBE4DA] flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-[#FBF2EE] text-[#C05638] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#56647A] font-medium leading-snug">
                  Personalized with your child's photo and details
                </p>
              </div>

              {/* Badge 2 */}
              <div className="bg-white rounded-2xl p-4 border border-[#EBE4DA] flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-[#FBF2EE] text-[#C05638] flex items-center justify-center shrink-0 mt-0.5">
                  <Wand2 className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#56647A] font-medium leading-snug">
                  AI-powered + human quality check for perfect results
                </p>
              </div>

              {/* Badge 3 */}
              <div className="bg-white rounded-2xl p-4 border border-[#EBE4DA] flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-[#FBF2EE] text-[#C05638] flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#56647A] font-medium leading-snug">
                  Made in India with premium printing
                </p>
              </div>

            </div>
          </div>

          {/* Hero Right Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[460px] aspect-[4/4.5] rounded-3xl overflow-hidden border border-[#EBE4DA] shadow-xl bg-slate-900 group">
              <img
                src="/src/assets/images/space_boy_scene_1789746482524.jpg"
                alt="Child Hero in Astronaut Suit"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-white/40 shadow flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C05638]">Featured Keepsake</span>
                  <p className="text-xs font-bold text-[#161922]">Journey to the Stars • Starring Aarav</p>
                </div>
                <button
                  onClick={() => onStartWizard('journey-to-the-stars')}
                  className="px-3.5 py-1.5 rounded-full bg-[#C05638] text-white text-xs font-semibold hover:bg-[#AC492E] transition cursor-pointer"
                >
                  Personalise
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          2. POPULAR STORIES (Matching Mockup Screen 1)
          ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-[#EBE4DA]">
        
        {/* Header & Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-serif-story font-bold text-2xl sm:text-3xl text-[#161922]">
              Popular Stories
            </h2>
          </div>
          
          <button
            onClick={() => onNavigate('stories')}
            className="text-sm font-semibold text-[#161922] hover:text-[#C05638] flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View all stories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C05638] text-white shadow-xs'
                  : 'bg-white text-[#56647A] border border-[#EBE4DA] hover:border-[#C05638] hover:text-[#161922]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Story Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredStories.slice(0, 5).map(story => (
            <div
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="bg-white rounded-2xl border border-[#EBE4DA] p-3 flex flex-col justify-between hover:shadow-md hover:border-[#C05638]/40 transition-all cursor-pointer group"
            >
              {/* Cover Image */}
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 relative mb-3">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1 mb-3">
                <h3 className="font-serif-story font-bold text-sm sm:text-base text-[#161922] line-clamp-1 group-hover:text-[#C05638] transition-colors">
                  {story.title}
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-1">
                  {story.subtitle}
                </p>
              </div>

              {/* Age Pill & Arrow Button */}
              <div className="flex items-center justify-between pt-2 border-t border-[#F5EFEB] text-xs text-[#56647A]">
                <span className="text-[11px] font-medium bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#EBE4DA]">
                  {story.ageRange.replace('–', '-')}
                </span>
                
                <div className="w-6 h-6 rounded-full bg-[#FAF8F5] group-hover:bg-[#C05638] group-hover:text-white border border-[#EBE4DA] group-hover:border-[#C05638] flex items-center justify-center transition-colors text-[#56647A]">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};
