import React, { useState } from 'react';
import { TRANSFORMATION_DEMOS, TransformationDemo } from '../data/sampleCharacters';
import { Sparkles, ArrowRight, Wand2 } from 'lucide-react';

interface TransformationSliderProps {
  onStartStory?: () => void;
}

export const TransformationSlider: React.FC<TransformationSliderProps> = ({ onStartStory }) => {
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100

  const activeDemo = TRANSFORMATION_DEMOS[selectedDemoIndex];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD1] shadow-xl shadow-[#162032]/5">
      {/* Demo Selector Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-[#F0E9DF]">
        <div>
          <span className="text-xs font-bold tracking-wider text-[#EB5E44] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Transformation
          </span>
          <h3 className="text-lg sm:text-xl font-display font-bold text-[#162032]">
            From one photo → to their story
          </h3>
        </div>

        {/* Character switcher pills */}
        <div className="flex items-center gap-2 bg-[#FAF7F2] p-1.5 rounded-2xl border border-[#E8DFD1]">
          {TRANSFORMATION_DEMOS.map((demo, idx) => (
            <button
              key={demo.id}
              id={`transform-tab-${demo.id}`}
              onClick={() => setSelectedDemoIndex(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDemoIndex === idx
                  ? 'bg-white text-[#162032] shadow-xs border border-[#E8DFD1]'
                  : 'text-[#56647A] hover:text-[#162032]'
              }`}
            >
              {demo.childName} ({demo.age}y)
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Comparison Stage */}
      <div className="relative mt-6 rounded-2xl overflow-hidden select-none bg-[#162032] aspect-[4/3] sm:aspect-[16/10] max-h-[440px] shadow-inner">
        {/* RIGHT: Transformed Storybook Character (Full width background) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={activeDemo.characterUrl}
            alt={`${activeDemo.childName} as storybook character`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-[#162032]/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#F5B027]" />
            Story Character ({activeDemo.style})
          </div>
        </div>

        {/* LEFT: Real Child Reference Photo (Clipped by slider position) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full" style={{ width: '100%', minWidth: '100%' }}>
            <img
              src={activeDemo.photoUrl}
              alt={`Original photo of ${activeDemo.childName}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: '100%', maxWidth: 'none' }}
            />
            <div className="absolute top-4 left-4 bg-[#162032]/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20">
              Original Photo
            </div>
          </div>
        </div>

        {/* The Drag Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#162032] shadow-xl flex items-center justify-center border-2 border-[#EB5E44] font-bold text-xs">
            <Wand2 className="w-4 h-4 text-[#EB5E44]" />
          </div>
        </div>

        {/* Transparent range slider input over entire stage */}
        <input
          type="range"
          min="5"
          max="95"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          aria-label="Drag to compare original photo and storybook character"
        />

        {/* Bottom subtle prompt */}
        <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none z-20">
          <span className="bg-black/50 backdrop-blur-sm text-white/90 text-xs px-2.5 py-1 rounded-md">
            ◀ Drag slider to see magic ▶
          </span>
          <span className="bg-black/50 backdrop-blur-sm text-[#F5B027] text-xs font-semibold px-2.5 py-1 rounded-md">
            Story: {activeDemo.storyTheme}
          </span>
        </div>
      </div>

      {/* Quote & CTA beneath */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#F0E9DF]">
        <div className="text-center sm:text-left">
          <p className="text-sm italic font-medium text-[#162032]">
            {activeDemo.quote}
          </p>
          <p className="text-xs text-[#56647A] mt-0.5">
            Verified parent feedback for {activeDemo.childName}’s custom book
          </p>
        </div>

        {onStartStory && (
          <button
            onClick={onStartStory}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#162032] hover:bg-[#EB5E44] text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <span>Personalize for My Child</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
