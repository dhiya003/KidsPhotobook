import React from 'react';
import { Heart, Sparkles, BookOpen, ShieldCheck, ArrowRight, MapPin } from 'lucide-react';

interface AboutViewProps {
  onExploreStories: () => void;
  onStartWizard: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onExploreStories, onStartWizard }) => {
  const pillars = [
    {
      icon: Heart,
      title: 'Child-First Storytelling',
      description: 'Stories crafted to inspire curiosity, kindness, bravery, and limitless imagination. Every adventure celebrates your child’s identity and values.'
    },
    {
      icon: BookOpen,
      title: 'Heirloom Quality Printing',
      description: 'Heavy 170gsm interior art paper, case-bound hardcover binding with velvety matte lamination, and vibrant archival inks built to last a lifetime.'
    },
    {
      icon: Sparkles,
      title: 'AI + Human Quality Craft',
      description: 'Advanced character consistency AI models craft seamless illustrations, while dedicated editors review every single page before sending it to press.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 text-[#161922]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 space-y-12">
        
        {/* Header (Matching Mockup 10. About) */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF2EE] text-[#C05638] text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Bengaluru, India</span>
          </div>
          <h1 className="font-serif-story font-bold text-3xl sm:text-4xl lg:text-5xl text-[#161922]">
            About Verve Studio
          </h1>
          <p className="text-base sm:text-lg text-[#56647A] leading-relaxed">
            We believe every child deserves to see themselves as the hero of a story.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE4DA] space-y-4 shadow-xs"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FBF2EE] text-[#C05638] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif-story font-bold text-lg text-[#161922]">
                  {p.title}
                </h3>
                <p className="text-sm text-[#56647A] leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mission Statement Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EBE4DA] text-center space-y-6 shadow-xs max-w-3xl mx-auto">
          <h2 className="font-serif-story font-bold text-2xl sm:text-3xl text-[#161922]">
            "When children see themselves as heroes in books, their belief in what they can achieve becomes infinite."
          </h2>
          <p className="text-sm text-[#56647A] max-w-xl mx-auto">
            From bedtime courage to lifelong reading habits, our books are crafted with warmth and love for families across India and the globe.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onExploreStories}
              className="px-7 py-3.5 rounded-full bg-white border border-[#D5CDC2] text-[#161922] hover:bg-[#F5EFEB] font-semibold text-sm transition cursor-pointer"
            >
              Explore Stories
            </button>
            <button
              onClick={onStartWizard}
              className="px-7 py-3.5 rounded-full bg-[#C05638] hover:bg-[#AC492E] text-white font-semibold text-sm transition shadow-sm cursor-pointer"
            >
              Create a Story
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
