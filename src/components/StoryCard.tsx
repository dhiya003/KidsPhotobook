import React from 'react';
import { Story } from '../types';
import { Sparkles, BookOpen, Globe2, Heart, ArrowRight } from 'lucide-react';

interface StoryCardProps {
  story: Story;
  onSelect: (story: Story) => void;
  onViewDetails?: (story: Story) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onSelect, onViewDetails }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-[#E8DFD1] hover:border-[#F5B027] hover:shadow-xl hover:shadow-[#162032]/8 transition-all duration-300 flex flex-col h-full">
      {/* Cover Image with Book styling */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#162032]">
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#162032] text-xs font-bold shadow-xs">
            Age {story.ageRange}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#EB5E44] text-white text-xs font-bold shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {story.category}
          </span>
        </div>

        {/* Bottom details on cover */}
        <div className="absolute bottom-3 inset-x-3 text-white">
          <div className="flex items-center gap-3 text-[11px] font-medium text-white/90">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#F5B027]" />
              {story.pageCount} Pages
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5 text-[#F5B027]" />
              {story.languages.length} Languages
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-xl font-bold text-[#162032] group-hover:text-[#EB5E44] transition-colors line-clamp-1">
            {story.title}
          </h3>
          <p className="text-xs font-semibold text-[#EB5E44] mt-0.5 line-clamp-1">
            {story.subtitle}
          </p>

          <p className="text-xs text-[#56647A] mt-3 line-clamp-2 leading-relaxed">
            {story.description}
          </p>

          {/* Moral or Emotional Focus */}
          <div className="mt-4 pt-3 border-t border-[#F0E9DF] flex items-center gap-1.5 text-xs font-medium text-[#162032]">
            <Heart className="w-3.5 h-3.5 text-[#EB5E44] fill-[#EB5E44]/20 shrink-0" />
            <span className="truncate">Teaches: {story.moralObjective}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-[#F0E9DF] flex items-center gap-2">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(story)}
              className="px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] hover:border-[#162032] text-xs font-bold text-[#162032] transition-colors"
            >
              Details
            </button>
          )}

          <button
            id={`personalize-btn-${story.id}`}
            onClick={() => onSelect(story)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#162032] hover:bg-[#EB5E44] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md"
          >
            <span>Personalize This Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
