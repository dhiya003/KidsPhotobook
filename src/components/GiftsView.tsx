import React from 'react';
import { Gift, Cake, Sparkles, Users, ArrowRight, Heart } from 'lucide-react';

interface GiftsViewProps {
  onStartWizard: (storyId?: string) => void;
}

export const GiftsView: React.FC<GiftsViewProps> = ({ onStartWizard }) => {
  const occasions = [
    {
      icon: Cake,
      title: 'Birthday Celebrations',
      desc: 'The ultimate birthday gift where the child is the protagonist of their own celebration.',
      badge: 'Bestseller'
    },
    {
      icon: Users,
      title: 'Return Gifts & Parties',
      desc: 'Delight guests with individual personalized storybooks or coloring keepsakes.',
      badge: 'Bundle & Save'
    },
    {
      icon: Sparkles,
      title: 'Festivals & Milestones',
      desc: 'Diwali, first day of school, new sibling, or starting a new grade — celebrate big moments.',
      badge: 'Keepsake'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 text-[#161922]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 space-y-12">
        
        {/* Header (Matching Mockup 11. Gifts) */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF2EE] text-[#C05638] text-xs font-semibold">
            <Gift className="w-3.5 h-3.5" />
            <span>Cherished Keepsakes</span>
          </div>
          <h1 className="font-serif-story font-bold text-3xl sm:text-4xl lg:text-5xl text-[#161922]">
            The Perfect Gift for Little Dreamers
          </h1>
          <p className="text-base text-[#56647A] leading-relaxed">
            Birthdays, milestones, festivals, or just because — a personalized book is a keepsake they'll treasure forever.
          </p>
        </div>

        {/* Occasion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          {occasions.map((occ, idx) => {
            const Icon = occ.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE4DA] space-y-4 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FBF2EE] text-[#C05638] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#EBE4DA] text-[11px] font-semibold text-[#56647A]">
                      {occ.badge}
                    </span>
                  </div>
                  <h3 className="font-serif-story font-bold text-lg text-[#161922]">
                    {occ.title}
                  </h3>
                  <p className="text-sm text-[#56647A] leading-relaxed">
                    {occ.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F5EFEB]">
                  <button
                    onClick={() => onStartWizard('birthday-adventure')}
                    className="w-full py-2.5 rounded-xl border border-[#D5CDC2] hover:border-[#C05638] hover:text-[#C05638] text-xs font-semibold transition cursor-pointer"
                  >
                    Personalize for this occasion
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gift Box Spotlight */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EBE4DA] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C05638]">Parent Dedication Included</span>
            <h3 className="font-serif-story font-bold text-2xl text-[#161922]">
              Add your custom dedication note for free
            </h3>
            <p className="text-sm text-[#56647A]">
              Every printed book includes a full-page custom message from parents, grandparents, or godparents with your loving signature.
            </p>
          </div>
          <button
            onClick={() => onStartWizard()}
            className="px-8 py-3.5 rounded-full bg-[#C05638] hover:bg-[#AC492E] text-white font-semibold text-sm transition shrink-0 cursor-pointer shadow-sm"
          >
            Create a Gift Story
          </button>
        </div>

      </div>
    </div>
  );
};
