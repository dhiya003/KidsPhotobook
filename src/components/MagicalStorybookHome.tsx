import React, { useState } from 'react';
import { Story } from '../types';
import { STORIES } from '../data/mockStories';
import { 
  Sparkles, 
  ArrowDown, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Heart, 
  Star, 
  BookOpen, 
  Camera, 
  Layers, 
  Wand2,
  ChevronRight,
  Smile
} from 'lucide-react';

interface MagicalStorybookHomeProps {
  onStartWizard: (story?: Story) => void;
  onExploreCatalog: () => void;
  onOpenStoryDetail: (story: Story) => void;
  onOpenPrivacyModal: () => void;
}

interface DemoTransformation {
  id: string;
  childName: string;
  childAge: number;
  gender: 'boy' | 'girl';
  city: string;
  photoUrl: string;
  avatarUrl: string;
  illustrationUrl: string;
  mockupUrl: string;
  storyTitle: string;
  storyCategory: string;
  storyId: string;
  quote: string;
  parentName: string;
  bookExcerpt: string;
}

const DEMO_TRANSFORMATIONS: DemoTransformation[] = [
  {
    id: 'aarav-space',
    childName: 'Aarav',
    childAge: 5,
    gender: 'boy',
    city: 'Bengaluru',
    photoUrl: '/src/assets/images/kid_boy_aarav_1789747514421.jpg',
    avatarUrl: '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
    illustrationUrl: '/src/assets/images/space_boy_scene_1789746467006.jpg',
    mockupUrl: '/src/assets/images/storybook_mockup_animated_1789747788784.jpg',
    storyTitle: 'The Magical Space Adventure',
    storyCategory: 'Space',
    storyId: 'magical-space-adventure',
    quote: 'When he opened page 3 and saw his face inside the gold helmet, his jaw literally dropped!',
    parentName: 'Priya & Rahul M.',
    bookExcerpt: 'Floating through the rings of Saturn, Aarav heard a cheerful chirp. It was a friendly starlight cub who nodded warmly...'
  },
  {
    id: 'ananya-jungle',
    childName: 'Ananya',
    childAge: 4,
    gender: 'girl',
    city: 'Chennai',
    photoUrl: '/src/assets/images/kid_girl_ananya_1789747526723.jpg',
    avatarUrl: '/src/assets/images/ananya_star_girl_1789745967005.jpg',
    illustrationUrl: '/src/assets/images/jungle_girl_trail_1789746597642.jpg',
    mockupUrl: '/src/assets/images/jungle_book_mockup_1789747803839.jpg',
    storyTitle: 'The Secret Jungle Adventure',
    storyCategory: 'Jungle',
    storyId: 'secret-jungle-adventure',
    quote: 'She hugs this book every single evening before sleeping. Pure magic for bedtime.',
    parentName: 'Deepa S.',
    bookExcerpt: 'By the riverbend, a gentle baby elephant trumpeted softly. Ananya offered a sweet mango and was rewarded with a joyful splash!'
  },
  {
    id: 'kabir-india',
    childName: 'Kabir',
    childAge: 6,
    gender: 'boy',
    city: 'Mumbai',
    photoUrl: '/src/assets/images/kid_boy_kabir_1789747544716.jpg',
    avatarUrl: '/src/assets/images/kabir_superhero_1789745987445.jpg',
    illustrationUrl: '/src/assets/images/india_train_animated_1789747625174.jpg',
    mockupUrl: '/src/assets/images/book_3d_mockup_1789747500669.jpg',
    storyTitle: 'My Journey Through India',
    storyCategory: 'India',
    storyId: 'journey-through-india',
    quote: 'The illustrations look like an artist spent months painting his exact curls and smile.',
    parentName: 'Arjun & Sneha K.',
    bookExcerpt: 'Across the golden dunes of Rajasthan, musicians played folk melodies as Kabir boarded the express adorned with marigold garlands.'
  },
  {
    id: 'meera-magic',
    childName: 'Meera',
    childAge: 4,
    gender: 'girl',
    city: 'Hyderabad',
    photoUrl: '/src/assets/images/kid_girl_meera_1789747560780.jpg',
    avatarUrl: '/src/assets/images/meera_fairytale_1789746005728.jpg',
    illustrationUrl: '/src/assets/images/dream_world_animated_1789747644910.jpg',
    mockupUrl: '/src/assets/images/book_3d_mockup_1789747500669.jpg',
    storyTitle: 'The Enchanted Dream World',
    storyCategory: 'Magic',
    storyId: 'enchanted-dream-world',
    quote: 'Her grandparents in Pune ordered a second hardcover copy because it made them tear up with joy.',
    parentName: 'Kavita R.',
    bookExcerpt: 'Guided by the Dream Weaver bird, Meera took her first step onto the cloud carpet where every good wish blooms into a sweet tomorrow.'
  }
];

export const MagicalStorybookHome: React.FC<MagicalStorybookHomeProps> = ({
  onStartWizard,
  onExploreCatalog,
  onOpenStoryDetail,
  onOpenPrivacyModal
}) => {
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [mockupViewMode, setMockupViewMode] = useState<'mockup' | 'scene'>('mockup');
  const [photoViewMode, setPhotoViewMode] = useState<'photo' | 'avatar'>('photo');
  const currentDemo = DEMO_TRANSFORMATIONS[selectedDemoIndex];

  // Category pills mapping
  const categoryPills = [
    { emoji: '🚀', label: 'Space', storyId: 'magical-space-adventure' },
    { emoji: '🦁', label: 'Jungle', storyId: 'secret-jungle-adventure' },
    { emoji: '🦕', label: 'Dinosaurs', storyId: 'dinosaur-discovery' },
    { emoji: '🪄', label: 'Magic', storyId: 'enchanted-dream-world' },
    { emoji: '🎂', label: 'Birthday', storyId: 'my-magical-birthday' },
    { emoji: '🇮🇳', label: 'India', storyId: 'journey-through-india' }
  ];

  const handleCategoryClick = (storyId: string) => {
    const found = STORIES.find((s) => s.id === storyId);
    onStartWizard(found || STORIES[0]);
  };

  const howItWorksSteps = [
    {
      num: '①',
      title: 'Choose an adventure',
      desc: 'Pick from magical space odysseys, Western Ghats jungle quests, or heritage journeys across India.',
      detail: 'Tailored for ages 2–10 with wholesome values, gentle courage, and joyful learning.'
    },
    {
      num: '②',
      title: 'Add your child',
      desc: 'Enter their name, age, and upload a clear front-facing photo of their beautiful smile.',
      detail: 'Protected under India’s DPDP Act 2023 with strict encryption and zero AI training.'
    },
    {
      num: '③',
      title: 'Meet their character',
      desc: 'Our personalization engine transforms their real likeness into a timeless storybook illustration.',
      detail: 'Maintains facial consistency, eye sparkle, and hair texture across every illustrated page.'
    },
    {
      num: '④',
      title: 'Open their story',
      desc: 'Flip through a free interactive preview with their face and name on the cover and pages.',
      detail: 'Order a 300 DPI instant digital edition or heirloom hardcover delivered to your door.'
    }
  ];

  return (
    <div className="relative overflow-hidden pb-20">
      {/* BACKGROUND STORYBOOK AMBIENCE */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#F5B027]/15 to-[#EB5E44]/10 blur-3xl rounded-full" />
      </div>

      {/* ========================================================
          STAGE 1: THE OPEN MAGICAL STORYBOOK HERO
          ======================================================== */}
      <section className="relative pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Storybook Top Emblem */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#E8DFD1] shadow-xs mb-6">
          <Sparkles className="w-4 h-4 text-[#F5B027] fill-[#F5B027]" />
          <span className="text-xs font-extrabold tracking-wider uppercase text-[#162032]">
            VERVE STUDIO
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#EB5E44]" />
          <span className="text-xs font-semibold text-[#56647A]">
            Personalized Children’s Books
          </span>
        </div>

        {/* Poetic Main Display Headline */}
        <h1 className="font-serif-story text-4xl sm:text-6xl md:text-7xl font-bold text-[#162032] tracking-tight leading-[1.12] mb-4">
          Make them the hero<br />
          <span className="italic text-[#EB5E44]">of their own story.</span>
        </h1>

        <p className="text-base sm:text-lg text-[#56647A] max-w-xl mx-auto leading-relaxed mb-10 font-normal">
          Upload your child’s photo and watch them magically become the illustrated protagonist of an unforgettable bedtime book.
        </p>

        {/* ========================================================
            STAGE 2: [ child photo ]  ✨  [ storybook ]
            Interactive Transformation Centerpiece
            ======================================================== */}
        <div className="relative max-w-4xl mx-auto mb-10">
          {/* Main Storybook Container Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#E8DFD1] shadow-xl relative overflow-hidden">
            {/* Top Demo Selector tabs */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-[#56647A] mr-1 hidden sm:inline">
                Real Examples:
              </span>
              {DEMO_TRANSFORMATIONS.map((demo, idx) => (
                <button
                  key={demo.id}
                  onClick={() => setSelectedDemoIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    selectedDemoIndex === idx
                      ? 'bg-[#162032] text-white shadow-sm'
                      : 'bg-[#FAF7F2] text-[#56647A] border border-[#E8DFD1] hover:border-[#162032]'
                  }`}
                >
                  <span>{demo.childName}</span>
                  <span className="text-[10px] opacity-75">({demo.childAge} yrs)</span>
                </button>
              ))}
            </div>

            {/* The Visual Transformation Spread */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 sm:gap-6 items-center">
              {/* LEFT: [ child photo or 3D animated avatar ] */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[290px] bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8DFD1] shadow-sm transform -rotate-1 hover:rotate-0 transition-transform">
                  {/* Photo toggle mode pills */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="inline-flex rounded-lg bg-white p-0.5 border border-[#E8DFD1] shadow-2xs">
                      <button
                        onClick={() => setPhotoViewMode('photo')}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                          photoViewMode === 'photo'
                            ? 'bg-[#162032] text-white'
                            : 'text-[#56647A] hover:text-[#162032]'
                        }`}
                      >
                        Child Photo
                      </button>
                      <button
                        onClick={() => setPhotoViewMode('avatar')}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                          photoViewMode === 'avatar'
                            ? 'bg-[#162032] text-white'
                            : 'text-[#56647A] hover:text-[#162032]'
                        }`}
                      >
                        3D Face
                      </button>
                    </div>
                    <span className="text-[10px] text-[#8896AB] font-semibold">{currentDemo.city}</span>
                  </div>

                  <div className="aspect-square rounded-xl overflow-hidden mb-2.5 bg-[#162032] relative group">
                    <img
                      src={photoViewMode === 'photo' ? currentDemo.photoUrl : currentDemo.avatarUrl}
                      alt={`${currentDemo.childName} photo`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-sm text-[11px] font-bold text-[#162032] shadow-xs">
                      {photoViewMode === 'photo' ? 'Child Photo' : '✨ 3D Character'}
                    </div>
                  </div>
                  <div className="text-center pt-1">
                    <p className="font-display font-bold text-sm text-[#162032]">
                      {currentDemo.childName}, {currentDemo.childAge} yrs
                    </p>
                    <p className="text-[11px] text-[#56647A]">
                      Parent Upload • {currentDemo.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* CENTER: ✨ Magic Sparkle Bridge */}
              <div className="md:col-span-1 flex flex-col items-center justify-center my-2 md:my-0">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F5B027] to-[#EB5E44] flex items-center justify-center text-white shadow-lg shadow-[#EB5E44]/25 animate-pulse">
                    <Sparkles className="w-6 h-6 fill-white" />
                  </div>
                  {/* Decorative glowing dots */}
                  <div className="hidden md:block absolute -top-4 left-1/2 -translate-x-1/2 text-[#F5B027] text-xs">✦</div>
                  <div className="hidden md:block absolute -bottom-4 left-1/2 -translate-x-1/2 text-[#EB5E44] text-xs">✦</div>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EB5E44] mt-2 text-center whitespace-nowrap">
                  Animated Magic
                </span>
              </div>

              {/* RIGHT: [ 3D Animated Storybook Mockup or Scene ] */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[290px] bg-[#FAF7F2] p-3.5 rounded-2xl border-2 border-[#EB5E44]/30 shadow-md transform rotate-1 hover:rotate-0 transition-transform">
                  {/* Animated Mockup view toggle pills */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="inline-flex rounded-lg bg-white p-0.5 border border-[#E8DFD1] shadow-2xs">
                      <button
                        onClick={() => setMockupViewMode('mockup')}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                          mockupViewMode === 'mockup'
                            ? 'bg-[#EB5E44] text-white'
                            : 'text-[#56647A] hover:text-[#162032]'
                        }`}
                      >
                        3D Book Mockup
                      </button>
                      <button
                        onClick={() => setMockupViewMode('scene')}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                          mockupViewMode === 'scene'
                            ? 'bg-[#EB5E44] text-white'
                            : 'text-[#56647A] hover:text-[#162032]'
                        }`}
                      >
                        Story Scene
                      </button>
                    </div>
                    <span className="text-[10px] text-[#EB5E44] font-bold">8.5" × 8.5"</span>
                  </div>

                  <div className="aspect-square rounded-xl overflow-hidden mb-2.5 bg-[#162032] relative">
                    <img
                      src={mockupViewMode === 'mockup' ? currentDemo.mockupUrl : currentDemo.illustrationUrl}
                      alt={`${currentDemo.childName} animated storybook`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-[#EB5E44] text-white text-[11px] font-bold shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 fill-white" />
                      {mockupViewMode === 'mockup' ? '3D Animated Mockup' : 'Storybook Hero'}
                    </div>
                  </div>
                  <div className="text-center pt-1">
                    <p className="font-display font-bold text-sm text-[#162032]">
                      {currentDemo.storyTitle}
                    </p>
                    <p className="text-[11px] text-[#EB5E44] font-semibold">
                      Full Color 32-Page Personalized Hardcover
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Parent Quote Callout */}
            <div className="mt-6 pt-5 border-t border-[#F0E9DF] flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-start gap-2.5">
                <div className="flex text-[#F5B027] shrink-0 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F5B027]" />
                  ))}
                </div>
                <p className="text-xs text-[#56647A] italic">
                  "{currentDemo.quote}" — <span className="font-semibold text-[#162032] not-italic">{currentDemo.parentName}</span>
                </p>
              </div>

              <button
                onClick={() => handleCategoryClick(currentDemo.storyId)}
                className="text-xs font-bold text-[#EB5E44] hover:text-[#D94F36] flex items-center gap-1 shrink-0"
              >
                <span>Preview {currentDemo.childName}’s Book</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            STAGE 3: ↓ DOWNWARD STORY ARROW & CREATE THEIR STORY CTA
            ======================================================== */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-16">
          {/* Gentle Downward Arrow */}
          <div className="flex flex-col items-center text-[#56647A] animate-bounce">
            <span className="text-xs font-bold tracking-wider uppercase text-[#8896AB] mb-1">
              Ready to begin?
            </span>
            <ArrowDown className="w-5 h-5 text-[#EB5E44]" />
          </div>

          {/* CREATE THEIR STORY Primary Button */}
          <div className="space-y-2">
            <button
              id="magical-home-create-btn"
              onClick={() => onStartWizard()}
              className="px-10 sm:px-14 py-5 rounded-2xl bg-gradient-to-r from-[#F5B027] via-[#EB5E44] to-[#D94F36] hover:opacity-95 text-white font-extrabold text-lg sm:text-xl shadow-xl shadow-[#EB5E44]/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto tracking-wide group"
            >
              <Sparkles className="w-6 h-6 fill-white/80 group-hover:rotate-12 transition-transform" />
              <span>CREATE THEIR STORY</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-[#56647A] font-medium">
              Free 4-Page Flipbook Preview • 100% Privacy Protected • No Payment Required Upfront
            </p>
          </div>
        </div>

        {/* ========================================================
            STAGE 4: "HOW IT WORKS"
            ① Choose an adventure
            ② Add your child
            ③ Meet their character
            ④ Open their story
            ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD1] shadow-sm mb-16 text-left">
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44]">
              Simple 4-Step Magic
            </span>
            <h2 className="font-serif-story text-2xl sm:text-3xl font-bold text-[#162032] mt-1">
              "How it works"
            </h2>
            <p className="text-xs text-[#56647A] mt-1">
              From one smartphone snapshot to an heirloom storybook in under two minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] hover:border-[#F5B027] transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E8DFD1] text-[#EB5E44] font-display font-extrabold text-xl flex items-center justify-center shadow-xs mb-3 group-hover:bg-[#EB5E44] group-hover:text-white group-hover:border-[#EB5E44] transition-colors">
                    {s.num}
                  </div>
                  <h4 className="font-display font-bold text-base text-[#162032] mb-1">
                    {s.title}
                  </h4>
                  <p className="text-xs text-[#56647A] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E8DFD1]/60 text-[11px] text-[#8896AB]">
                  {s.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            STAGE 5: EXPLORE STORIES
            🚀 Space       🦁 Jungle
            🦕 Dinosaurs   🪄 Magic
            🎂 Birthday    🇮🇳 India
            ======================================================== */}
        <div className="mb-16">
          <div className="text-center max-w-lg mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44]">
              Curated Story Worlds
            </span>
            <h2 className="font-serif-story text-2xl sm:text-3xl font-bold text-[#162032] mt-1">
              EXPLORE STORIES
            </h2>
            <p className="text-xs text-[#56647A] mt-1">
              Select any adventure below to jump straight into tailoring it for your child.
            </p>
          </div>

          {/* Category Pills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto mb-8">
            {categoryPills.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleCategoryClick(cat.storyId)}
                className="p-4 rounded-2xl bg-white hover:bg-[#FFF8F5] border border-[#E8DFD1] hover:border-[#EB5E44] shadow-xs hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
              >
                <span className="text-2xl group-hover:scale-125 transition-transform">
                  {cat.emoji}
                </span>
                <span className="font-display font-bold text-sm text-[#162032] group-hover:text-[#EB5E44]">
                  {cat.label}
                </span>
                <span className="text-[10px] text-[#56647A] group-hover:text-[#EB5E44]">
                  Personalize →
                </span>
              </button>
            ))}
          </div>

          {/* Story Showcase Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {STORIES.slice(0, 3).map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-3xl p-4 border border-[#E8DFD1] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-3.5 bg-[#162032] relative group">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-[11px] font-bold text-[#162032] shadow-xs">
                      Ages {story.ageRange}
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-[#EB5E44] uppercase tracking-wider">
                    {story.category}
                  </span>
                  <h3 className="font-display font-bold text-lg text-[#162032] mt-0.5 line-clamp-1">
                    {story.title}
                  </h3>
                  <p className="text-xs text-[#56647A] mt-1 line-clamp-2 leading-relaxed">
                    {story.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-[#F0E9DF] flex items-center justify-between">
                  <button
                    onClick={() => onOpenStoryDetail(story)}
                    className="text-xs font-semibold text-[#56647A] hover:text-[#162032]"
                  >
                    Story Details
                  </button>

                  <button
                    onClick={() => onStartWizard(story)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#162032] hover:bg-[#EB5E44] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>Make Them The Hero</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onExploreCatalog}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-[#E8DFD1] hover:border-[#162032] text-xs font-bold text-[#162032] transition-colors shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-[#F5B027]" />
              <span>View All 8 Stories in Catalog</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            STAGE 6: CHILD SAFETY & GUARANTEE BADGE
            ======================================================== */}
        <div className="p-6 rounded-3xl bg-[#FFF8F5] border border-[#FCD9D0] text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#FCD9D0] flex items-center justify-center text-[#4EAA8C] shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-[#162032]">
                100% Child Photo Privacy • India DPDP Act 2023 Compliant
              </h4>
              <p className="text-xs text-[#56647A] mt-0.5">
                Your photos are strictly encrypted, never shared, and never used to train public AI models.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenPrivacyModal}
            className="text-xs font-bold text-[#EB5E44] hover:underline shrink-0 whitespace-nowrap"
          >
            Read Safety Pledge →
          </button>
        </div>
      </section>
    </div>
  );
};
