import React from 'react';
import { Sparkles, ArrowRight, UserPlus, Eye, CheckCircle, Package } from 'lucide-react';

interface HowItWorksViewProps {
  onStartWizard: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onStartWizard }) => {
  const steps = [
    {
      num: '1',
      icon: UserPlus,
      title: "Share your child's details",
      description: "Tell us their name, age, interests, and upload a clear photo. Takes under 2 minutes to set up."
    },
    {
      num: '2',
      icon: Eye,
      title: "Preview the story for free",
      description: "See a free preview of the personalized book and verify your child's character likeness before paying anything."
    },
    {
      num: '3',
      icon: CheckCircle,
      title: "Choose your package & approve",
      description: "Pick your preferred format (Digital, Hardcover, or Sibling Bundle), review the full 32-page book, and request any changes."
    },
    {
      num: '4',
      icon: Package,
      title: "Printed & delivered to your door",
      description: "We print with premium heavy 170gsm art paper and hardcover binding, carefully packaged and delivered anywhere across India."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 text-[#161922]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 space-y-12">
        
        {/* Header (Matching Mockup 9. How It Works) */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="font-serif-story font-bold text-3xl sm:text-4xl lg:text-5xl text-[#161922]">
            How it Works
          </h1>
          <p className="text-base text-[#56647A]">
            Creating a personalized storybook is simple and magical. Here's how it works:
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE4DA] space-y-4 shadow-xs hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#FBF2EE] text-[#C05638] flex items-center justify-center font-serif-story font-bold text-xl">
                    {s.num}
                  </div>
                  <Icon className="w-6 h-6 text-[#C05638]/70" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif-story font-bold text-lg sm:text-xl text-[#161922]">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[#56647A] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Big CTA */}
        <div className="text-center pt-6">
          <button
            onClick={onStartWizard}
            className="px-9 py-4 rounded-full bg-[#C05638] hover:bg-[#AC492E] active:scale-98 text-white font-semibold text-base shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Create a Story</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
