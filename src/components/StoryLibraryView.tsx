import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Story } from '../types';
import { STORIES } from '../data/mockStories';

interface StoryLibraryViewProps {
  onSelectStory: (story: Story) => void;
  onStartWizard: (storyId?: string) => void;
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

export const StoryLibraryView: React.FC<StoryLibraryViewProps> = ({
  onSelectStory,
  onStartWizard
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredStories = STORIES.filter(s => {
    if (selectedCategory === 'All') return true;
    return s.category === selectedCategory || s.purposeCategory === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 text-[#161922]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-8">
        
        {/* Header (Matching Mockup 2. Story Library) */}
        <div className="space-y-3">
          <h1 className="font-serif-story font-bold text-3xl sm:text-4xl lg:text-[44px] text-[#161922]">
            Our Stories
          </h1>
          <p className="text-sm sm:text-base text-[#56647A] max-w-2xl">
            Choose from our curated collection of adventures, learning, values and more. Each story is uniquely yours.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#C05638] text-white shadow-xs'
                  : 'bg-white text-[#56647A] border border-[#EBE4DA] hover:border-[#C05638] hover:text-[#161922]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-Column Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
          {filteredStories.map(story => (
            <div
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="bg-white rounded-3xl border border-[#EBE4DA] p-4 flex flex-col justify-between hover:shadow-lg hover:border-[#C05638]/40 transition-all cursor-pointer group"
            >
              {/* Cover Image */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 relative mb-4">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1.5 mb-4">
                <h3 className="font-serif-story font-bold text-lg sm:text-xl text-[#161922] group-hover:text-[#C05638] transition-colors">
                  {story.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  {story.subtitle}
                </p>
              </div>

              {/* Age Pill & Arrow Button */}
              <div className="flex items-center justify-between pt-3 border-t border-[#F5EFEB] text-xs text-[#56647A]">
                <span className="text-xs font-medium text-[#56647A]">
                  Age {story.ageRange.replace('–', '-')}
                </span>
                
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] group-hover:bg-[#C05638] group-hover:text-white border border-[#EBE4DA] group-hover:border-[#C05638] flex items-center justify-center transition-colors text-[#56647A]">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
