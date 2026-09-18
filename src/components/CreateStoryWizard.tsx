import React, { useState } from 'react';
import { Story, CharacterStyle, StoryLanguage, PersonalizedStoryPreview } from '../types';
import { STORIES } from '../data/mockStories';
import { AIStoryService, GENERATION_STAGES } from '../services/aiStoryService';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  AlertCircle, 
  Camera, 
  Heart,
  Palette,
  Languages,
  BookOpen,
  Smile,
  Compass,
  Star,
  X
} from 'lucide-react';

interface CreateStoryWizardProps {
  initialStory?: Story | null;
  onPreviewReady: (preview: PersonalizedStoryPreview) => void;
  onCancel: () => void;
}

const CHARACTER_STYLES: { id: CharacterStyle; label: string; desc: string; previewEmoji: string; sampleImage: string }[] = [
  { 
    id: '3D Magical', 
    label: '3D Magical Animation', 
    desc: 'Pixar-inspired 3D animated character with expressive eyes, glowing stardust, and warm cinematic studio lighting', 
    previewEmoji: '✨',
    sampleImage: '/src/assets/images/style_3d_magical_1789745962568.jpg'
  },
  { 
    id: 'Watercolor', 
    label: 'Whimsical Watercolor', 
    desc: 'Soft pastel washes and dreamy textures perfect for gentle bedtime tales and cozy family memories', 
    previewEmoji: '🌸',
    sampleImage: '/src/assets/images/ananya_watercolor_1789745975618.jpg'
  },
  { 
    id: 'Classic Storybook', 
    label: 'Classic Storybook', 
    desc: 'Timeless hand-drawn feel reminiscent of classic children’s literature with gentle pencil outlines and warm tones', 
    previewEmoji: '🎨',
    sampleImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: 'Adventure Illustration', 
    label: 'Dynamic Adventure', 
    desc: 'Bold brushwork, rich shadows, and courageous heroic energy that leaps off the printed page', 
    previewEmoji: '🚀',
    sampleImage: '/src/assets/images/kabir_superhero_1789745987445.jpg'
  },
  { 
    id: 'Soft Cartoon', 
    label: 'Soft Playful Cartoon', 
    desc: 'Friendly rounded contours with sweet, cheerful expressions ideal for toddlers and early readers', 
    previewEmoji: '🧸',
    sampleImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80'
  },
];

const SUPPORTED_LANGUAGES: { name: StoryLanguage; native: string; popular?: boolean }[] = [
  { name: 'English', native: 'English', popular: true },
  { name: 'Hindi', native: 'हिंदी', popular: true },
  { name: 'Tamil', native: 'தமிழ்', popular: true },
  { name: 'Telugu', native: 'తెలుగు', popular: true },
  { name: 'Kannada', native: 'ಕನ್ನಡ' },
  { name: 'Malayalam', native: 'മലയാളം' },
  { name: 'Marathi', native: 'मराठी' },
  { name: 'Bengali', native: 'বাংলা' }
];

const POPULAR_COLORS = ['Royal Blue', 'Golden Yellow', 'Emerald Green', 'Marigold Orange', 'Coral Pink', 'Deep Purple'];
const POPULAR_ANIMALS = ['Tiger cub', 'Baby Elephant', 'Gentle Lion', 'Cosmic Bunny', 'Playful Peacock', 'Little Puppy'];

export const CreateStoryWizard: React.FC<CreateStoryWizardProps> = ({
  initialStory,
  onPreviewReady,
  onCancel
}) => {
  // 6 Step flow: 1. Adventure -> 2. Child Name & Age -> 3. Special Details -> 4. Photo & Consent -> 5. Art Style -> 6. Language & Dedication
  const [step, setStep] = useState<number>(initialStory ? 2 : 1);
  const [selectedStory, setSelectedStory] = useState<Story>(initialStory || STORIES[0]);
  const [storyCategoryFilter, setStoryCategoryFilter] = useState<string>('All');

  // Step 2: Child details
  const [childName, setChildName] = useState('Aarav');
  const [childAge, setChildAge] = useState(5);
  const [gender, setGender] = useState<'boy' | 'girl' | 'neutral'>('boy');
  const [nickname, setNickname] = useState('Aaru');

  // Step 3: Special details
  const [favoriteColor, setFavoriteColor] = useState('Royal Blue');
  const [favoriteAnimal, setFavoriteAnimal] = useState('Tiger cub');
  const [favoriteActivity, setFavoriteActivity] = useState('Building rocket blocks');

  // Step 4: Photo & Consent
  const [photoUrl, setPhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'
  );
  const [hasParentalConsent, setHasParentalConsent] = useState(true);

  // Step 5: Character Style
  const [characterStyle, setCharacterStyle] = useState<CharacterStyle>('Classic Storybook');

  // Step 6: Language & Dedication
  const [language, setLanguage] = useState<StoryLanguage>('English');
  const [dedicationFrom, setDedicationFrom] = useState('Amma & Appa');
  const [dedicationMessage, setDedicationMessage] = useState(
    'For our little explorer, Aarav. May your heart always be brave, your curiosity limitless, and your smile radiant.'
  );
  const [isSuggestingDedication, setIsSuggestingDedication] = useState(false);

  const handleSuggestDedication = async () => {
    setIsSuggestingDedication(true);
    try {
      const res = await fetch('/api/ai/suggest-dedication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childName: childName || 'darling',
          childAge,
          dedicationFrom: dedicationFrom || 'Mum & Dad',
          tone: 'inspiring, deeply loving, and adventurous'
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.dedication) {
          setDedicationMessage(data.dedication);
        }
      }
    } catch {
      setDedicationMessage(`For our dearest ${childName || 'child'}, may your courage always lead you to magical discoveries and endless smiles.`);
    } finally {
      setIsSuggestingDedication(false);
    }
  };

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentStageText, setCurrentStageText] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [readyPreview, setReadyPreview] = useState<PersonalizedStoryPreview | null>(null);

  // Handle Photo upload simulation
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setPhotoUrl(tempUrl);
    }
  };

  // Start Generation
  const handleGeneratePreview = async () => {
    if (!hasParentalConsent) {
      alert('Please confirm parental or guardian consent before submitting photo.');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(10);
    setCurrentStageText('Analyzing character features & adventure themes...');
    setGenerationError(null);
    setReadyPreview(null);

    // Watchdog safety timeout: under NO circumstance can user be stuck for more than 3.5 seconds
    const watchdogTimer = setTimeout(() => {
      setIsGenerating((currentIsGen) => {
        if (currentIsGen) {
          const styleImage = (characterStyle === '3D Magical' || (characterStyle as string) === '3D Magical Animation')
            ? '/src/assets/images/aarav_magical_3d_1789745946003.jpg'
            : characterStyle === 'Watercolor'
            ? '/src/assets/images/ananya_watercolor_1789745975618.jpg'
            : characterStyle === 'Adventure Illustration'
            ? '/src/assets/images/kabir_superhero_1789745987445.jpg'
            : selectedStory.coverImage;

          // Force construct immediate preview so parent is never trapped
          const fallbackPreview: PersonalizedStoryPreview = {
            id: `prev-${Date.now()}`,
            storyId: selectedStory.id,
            storyTitle: selectedStory.title,
            childName,
            childAge,
            gender,
            characterStyle,
            language,
            coverUrl: styleImage,
            dedicationFrom: dedicationFrom || 'With all our love, Mum & Dad',
            dedicationMessage: dedicationMessage || `For our wonderful ${childName}, may your heart always be brave and your adventures endless.`,
            pages: selectedStory.pages.map((p, idx) => ({
              pageNumber: p.pageNumber,
              sceneTitle: p.sceneTitle,
              text: p.textTemplate
                .replace(/\{\{childName\}\}/g, childName || 'Little Explorer')
                .replace(/\{\{childAge\}\}/g, String(childAge || 5))
                .replace(/\{\{favoriteColor\}\}/g, favoriteColor || 'azure blue')
                .replace(/\{\{favoriteAnimal\}\}/g, favoriteAnimal || 'friendly cub'),
              imageUrl: idx === 0 ? styleImage : p.defaultImage,
              isUnlockedInPreview: idx < 4
            })),
            totalPageCount: selectedStory.pageCount,
            unlockedPageCount: 4,
            createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
          };
          onPreviewReady(fallbackPreview);
          return false;
        }
        return false;
      });
    }, 3500);

    try {
      const preview = await AIStoryService.generatePreview(
        {
          story: selectedStory,
          childName,
          childAge,
          gender,
          photoUrl,
          favoriteColor,
          favoriteAnimal,
          favoriteActivity,
          characterStyle,
          language,
          dedicationFrom,
          dedicationMessage
        },
        (progress, stage) => {
          setGenerationProgress(progress);
          setCurrentStageText(stage);
        }
      );

      clearTimeout(watchdogTimer);
      setReadyPreview(preview);
      setGenerationProgress(100);
      setCurrentStageText('Your storybook is ready! Opening now...');

      // Transition smoothly into book viewer
      setTimeout(() => {
        setIsGenerating(false);
        onPreviewReady(preview);
      }, 300);
    } catch (err) {
      clearTimeout(watchdogTimer);
      setIsGenerating(false);
      setGenerationError('Something went wrong while creating the preview. Please try again.');
    }
  };

  const stepTitles = [
    'Choose Adventure',
    'Add Your Child',
    'Personal Touches',
    'Child’s Photo',
    'Art Style',
    'Dedication & Language'
  ];

  const filteredStories = storyCategoryFilter === 'All' 
    ? STORIES 
    : STORIES.filter(s => s.category === storyCategoryFilter);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Wizard Header / Step Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={step === 1 ? onCancel : () => setStep(step - 1)}
            disabled={isGenerating}
            className="flex items-center gap-1.5 text-xs font-bold text-[#56647A] hover:text-[#162032] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{step === 1 ? 'Back to Storybook' : 'Previous Step'}</span>
          </button>

          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44]">
              Step {step} of 6
            </span>
            <p className="text-[11px] font-semibold text-[#162032]">
              {stepTitles[step - 1]}
            </p>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-[#E8DFD1] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#F5B027] to-[#EB5E44] h-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {/* Step breadcrumbs */}
        <div className="hidden sm:flex items-center justify-between mt-2.5 px-1">
          {stepTitles.map((t, idx) => (
            <span
              key={idx}
              className={`text-[10px] font-bold ${
                step === idx + 1
                  ? 'text-[#EB5E44]'
                  : step > idx + 1
                  ? 'text-[#162032]'
                  : 'text-[#8896AB]'
              }`}
            >
              {idx + 1}. {t}
            </span>
          ))}
        </div>
      </div>

      {/* Loading Modal Overlay during generation */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 bg-[#162032]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full text-center border border-[#E8DFD1] shadow-2xl relative">
            <button
              onClick={() => setIsGenerating(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#8896AB] hover:text-[#162032] hover:bg-[#FAF7F2] transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#F5B027] to-[#EB5E44] flex items-center justify-center text-white shadow-lg animate-pulse mb-6">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="font-serif-story text-2xl font-bold text-[#162032] mb-2">
              Illustrating {childName}’s Adventure...
            </h3>
            <p className="text-sm text-[#56647A] mb-6 min-h-[40px] flex items-center justify-center">
              {currentStageText || GENERATION_STAGES[0]}
            </p>

            {/* Progress bar */}
            <div className="w-full bg-[#FAF7F2] border border-[#E8DFD1] h-3 rounded-full overflow-hidden mb-3">
              <div
                className="bg-gradient-to-r from-[#F5B027] to-[#EB5E44] h-full transition-all duration-300"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
            <p className="text-xs font-bold text-[#162032] mb-4">{generationProgress}% Completed</p>

            {generationProgress >= 90 && (
              <button
                onClick={() => {
                  setIsGenerating(false);
                  if (readyPreview) {
                    onPreviewReady(readyPreview);
                  } else {
                    const fallbackPreview: PersonalizedStoryPreview = {
                      id: `prev-${Date.now()}`,
                      storyId: selectedStory.id,
                      storyTitle: selectedStory.title,
                      childName,
                      childAge,
                      gender,
                      characterStyle,
                      language,
                      coverUrl: selectedStory.coverImage,
                      dedicationFrom: dedicationFrom || 'With all our love, Mum & Dad',
                      dedicationMessage: dedicationMessage || `For our wonderful ${childName}, may your heart always be brave and your adventures endless.`,
                      pages: selectedStory.pages.map((p, idx) => ({
                        pageNumber: p.pageNumber,
                        sceneTitle: p.sceneTitle,
                        text: p.textTemplate
                          .replace(/\{\{childName\}\}/g, childName || 'Little Explorer')
                          .replace(/\{\{childAge\}\}/g, String(childAge || 5))
                          .replace(/\{\{favoriteColor\}\}/g, favoriteColor || 'azure blue')
                          .replace(/\{\{favoriteAnimal\}\}/g, favoriteAnimal || 'friendly cub'),
                        imageUrl: p.defaultImage,
                        isUnlockedInPreview: idx < 4
                      })),
                      totalPageCount: selectedStory.pageCount,
                      unlockedPageCount: 4,
                      createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                    };
                    onPreviewReady(fallbackPreview);
                  }
                }}
                className="mb-4 w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#F5B027] via-[#EB5E44] to-[#D94F36] text-white font-bold text-sm shadow-lg shadow-[#EB5E44]/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
              >
                <span>Open {childName}’s Storybook Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="p-3.5 bg-[#FAF7F2] rounded-xl text-[11px] text-[#56647A] flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4EAA8C]" />
              <span>Reference photo encrypted & protected under Child Safety protocol.</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 1: CHOOSE AN ADVENTURE
          ======================================================== */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44]">
              Step 1 of 6
            </span>
            <h2 className="font-serif-story text-3xl font-bold text-[#162032] mt-1">
              Choose an adventure
            </h2>
            <p className="text-xs sm:text-sm text-[#56647A] mt-1">
              Select the story world your child will enter as the illustrated hero.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {['All', 'Space', 'Adventure', 'India', 'Fantasy', 'Birthday', 'Learning', 'Confidence'].map((cat) => (
              <button
                key={cat}
                onClick={() => setStoryCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  storyCategoryFilter === cat
                    ? 'bg-[#162032] text-white shadow-xs'
                    : 'bg-white text-[#56647A] border border-[#E8DFD1] hover:border-[#162032]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filteredStories.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedStory(s)}
                className={`cursor-pointer rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                  selectedStory.id === s.id
                    ? 'border-[#EB5E44] bg-[#FFF8F5] ring-2 ring-[#EB5E44]/20 shadow-md'
                    : 'border-[#E8DFD1] bg-white hover:border-[#162032]'
                }`}
              >
                <div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-[#162032]">
                    <img src={s.coverImage} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[10px] font-bold text-[#162032] border border-[#E8DFD1]">
                      Age {s.ageRange}
                    </span>
                    <span className="text-[10px] font-bold text-[#EB5E44]">{s.category}</span>
                  </div>
                  <h4 className="font-display font-bold text-[#162032] text-sm line-clamp-1">{s.title}</h4>
                  <p className="text-xs text-[#56647A] mt-1 line-clamp-2">{s.subtitle}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0E9DF] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#56647A]">{s.pageCount} Pages</span>
                  {selectedStory.id === s.id ? (
                    <span className="text-xs font-bold text-[#EB5E44] flex items-center gap-1">
                      <Check className="w-4 h-4" /> Selected
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-[#162032]">Select</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={() => setStep(2)}
              className="px-8 py-3 rounded-xl bg-[#EB5E44] hover:bg-[#D94F36] text-white text-sm font-bold flex items-center gap-2 shadow-md transition-all"
            >
              <span>Next: Add Your Child</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 2: ADD YOUR CHILD (NAME, AGE & GENDER)
          ======================================================== */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD1] shadow-sm space-y-6">
          <div className="border-b border-[#F0E9DF] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44]">
              Step 2 of 6
            </span>
            <h2 className="font-serif-story text-2xl sm:text-3xl font-bold text-[#162032] mt-1">
              Who is our little hero?
            </h2>
            <p className="text-xs sm:text-sm text-[#56647A] mt-1">
              Your child’s name and age will appear on the book cover, spine, and every story spread.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Child Name */}
            <div>
              <label className="block text-xs font-bold text-[#162032] mb-1.5">
                Child’s First Name <span className="text-[#EB5E44]">*</span>
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="e.g. Aarav, Ananya, Kabir, Meera"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD1] focus:border-[#EB5E44] focus:ring-1 focus:ring-[#EB5E44] text-sm text-[#162032] outline-none"
              />
            </div>

            {/* Nickname */}
            <div>
              <label className="block text-xs font-bold text-[#162032] mb-1.5">
                Affectionate Pet Name / Nickname <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g. Aaru, Chintu, Laddu, Gundu"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD1] focus:border-[#EB5E44] focus:ring-1 focus:ring-[#EB5E44] text-sm text-[#162032] outline-none"
              />
            </div>

            {/* Child Age */}
            <div>
              <label className="block text-xs font-bold text-[#162032] mb-1.5 flex items-center justify-between">
                <span>Child’s Age</span>
                <span className="text-[#EB5E44] font-extrabold">{childAge} years old</span>
              </label>
              <input
                type="range"
                min="2"
                max="10"
                value={childAge}
                onChange={(e) => setChildAge(Number(e.target.value))}
                className="w-full accent-[#EB5E44] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#56647A] mt-1">
                <span>2 yrs</span>
                <span>4 yrs</span>
                <span>6 yrs</span>
                <span>8 yrs</span>
                <span>10 yrs</span>
              </div>
            </div>

            {/* Gender / Character Preference */}
            <div>
              <label className="block text-xs font-bold text-[#162032] mb-1.5">
                Character Representation
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'boy', label: 'Boy' },
                  { id: 'girl', label: 'Girl' },
                  { id: 'neutral', label: 'Neutral' }
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGender(g.id as any)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      gender === g.id
                        ? 'bg-[#162032] text-white border-[#162032]'
                        : 'bg-[#FAF7F2] text-[#56647A] border-[#E8DFD1] hover:border-[#162032]'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center gap-3">
            <Smile className="w-5 h-5 text-[#F5B027] shrink-0" />
            <p className="text-xs text-[#56647A]">
              Selected Adventure: <span className="font-bold text-[#162032]">{selectedStory.title}</span> (Target age: {selectedStory.ageRange} yrs).
            </p>
          </div>

          <div className="flex justify-between pt-4 border-t border-[#F0E9DF]">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-xl border border-[#E8DFD1] text-xs font-bold text-[#162032]"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (!childName.trim()) {
                  alert('Please enter your child’s name.');
                  return;
                }
                setStep(3);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#EB5E44] hover:bg-[#D94F36] text-white text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <span>Next: Personal Touches</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 3: PERSONAL TOUCHES & FAVORITES
          ======================================================== */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD1] shadow-sm space-y-6">
          <div className="border-b border-[#F0E9DF] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44]">
              Step 3 of 6
            </span>
            <h2 className="font-serif-story text-2xl sm:text-3xl font-bold text-[#162032] mt-1">
              What makes {childName} special?
            </h2>
            <p className="text-xs sm:text-sm text-[#56647A] mt-1">
              We weave their favorite things directly into the illustrations and storyline dialogues.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Favorite Color */}
            <div>
              <label className="block text-xs font-bold text-[#162032] mb-1.5">
                Favorite Color
              </label>
              <input
                type="text"
                value={favoriteColor}
                onChange={(e) => setFavoriteColor(e.target.value)}
                placeholder="e.g. Royal Blue, Golden Yellow, Emerald"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD1] focus:border-[#EB5E44] text-sm text-[#162032] outline-none mb-2"
              />
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFavoriteColor(c)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                      favoriteColor === c
                        ? 'bg-[#162032] text-white border-[#162032]'
                        : 'bg-[#FAF7F2] text-[#56647A] border-[#E8DFD1]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Favorite Animal */}
            <div>
              <label className="block text-xs font-bold text-[#162032] mb-1.5">
                Favorite Animal / Companion
              </label>
              <input
                type="text"
                value={favoriteAnimal}
                onChange={(e) => setFavoriteAnimal(e.target.value)}
                placeholder="e.g. Tiger cub, Baby Elephant, Peacock, Puppy"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD1] focus:border-[#EB5E44] text-sm text-[#162032] outline-none mb-2"
              />
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_ANIMALS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setFavoriteAnimal(a)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                      favoriteAnimal === a
                        ? 'bg-[#162032] text-white border-[#162032]'
                        : 'bg-[#FAF7F2] text-[#56647A] border-[#E8DFD1]'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Favorite Activity */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#162032] mb-1.5">
                Favorite Hobby or Activity
              </label>
              <input
                type="text"
                value={favoriteActivity}
                onChange={(e) => setFavoriteActivity(e.target.value)}
                placeholder="e.g. Building LEGO rockets, drawing dinosaurs, swimming, dancing"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD1] focus:border-[#EB5E44] text-sm text-[#162032] outline-none"
              />
            </div>
          </div>

          {/* Live Story Excerpt Preview */}
          <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#FCD9D0] text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#EB5E44] block mb-1">
              Live Storybook Excerpt Preview
            </span>
            <p className="text-xs text-[#162032] font-serif italic leading-relaxed">
              "Under their pillow, <span className="font-bold text-[#EB5E44] not-italic">{childName}</span> discovered a shining badge painted in their favorite <span className="font-bold text-[#EB5E44] not-italic">{favoriteColor}</span>. Accompanied by a gentle <span className="font-bold text-[#EB5E44] not-italic">{favoriteAnimal}</span>, they set off to conquer the cosmos!"
            </p>
          </div>

          <div className="flex justify-between pt-4 border-t border-[#F0E9DF]">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 rounded-xl border border-[#E8DFD1] text-xs font-bold text-[#162032]"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-6 py-2.5 rounded-xl bg-[#EB5E44] hover:bg-[#D94F36] text-white text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <span>Next: Child’s Photo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 4: UPLOAD CHILD’S PHOTO & GUARDIAN CONSENT
          ======================================================== */}
      {step === 4 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD1] shadow-sm space-y-6">
          <div className="border-b border-[#F0E9DF] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44]">
              Step 4 of 6
            </span>
            <h2 className="font-serif-story text-2xl sm:text-3xl font-bold text-[#162032] mt-1">
              Upload {childName}’s reference photo
            </h2>
            <p className="text-xs sm:text-sm text-[#56647A] mt-1">
              Our personalization engine references their facial contours, eye shape, and smile to illustrate their hero.
            </p>
          </div>

          {/* Guidelines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F0F9F5] border border-[#BDE5D3]">
              <span className="text-xs font-bold text-[#2A7E5B] flex items-center gap-1.5 mb-2">
                <Check className="w-4 h-4" /> RECOMMENDED PHOTO
              </span>
              <ul className="text-xs text-[#2A7E5B] space-y-1 list-disc list-inside">
                <li>Clear, front-facing close-up of face</li>
                <li>Good natural daylight without dark shadows</li>
                <li>Natural happy expression or cheerful smile</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF5F5] border border-[#FAD2D2]">
              <span className="text-xs font-bold text-[#D94F36] flex items-center gap-1.5 mb-2">
                <AlertCircle className="w-4 h-4" /> AVOID THESE
              </span>
              <ul className="text-xs text-[#D94F36] space-y-1 list-disc list-inside">
                <li>Sunglasses, hats, or masks covering the face</li>
                <li>Grainy, dark, or blurred low-res photos</li>
                <li>Group photos with multiple children</li>
              </ul>
            </div>
          </div>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-[#E8DFD1] hover:border-[#EB5E44] rounded-3xl p-6 sm:p-8 text-center bg-[#FAF7F2] transition-colors relative">
            {photoUrl ? (
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#EB5E44] shadow-md mb-3 bg-[#162032]">
                  <img src={photoUrl} alt="Uploaded reference" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-bold text-[#162032]">Photo loaded successfully!</p>
                <label className="mt-2 text-xs font-bold text-[#EB5E44] hover:underline cursor-pointer">
                  Change photo
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div>
                <Camera className="w-12 h-12 text-[#EB5E44] mx-auto mb-3" />
                <h4 className="font-display font-bold text-sm text-[#162032]">
                  Drag and drop a clear photo of {childName}
                </h4>
                <p className="text-xs text-[#56647A] mt-1 mb-4">
                  Supports JPG, PNG, WEBP (Up to 10 MB)
                </p>
                <label className="px-5 py-2.5 rounded-xl bg-[#162032] hover:bg-[#EB5E44] text-white text-xs font-bold cursor-pointer transition-colors inline-block">
                  Browse From Gallery
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Guardian Consent Box (Mandatory per DPDP Act 2023) */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-start gap-3">
            <input
              type="checkbox"
              id="guardian-consent-check"
              checked={hasParentalConsent}
              onChange={(e) => setHasParentalConsent(e.target.checked)}
              className="mt-1 w-4 h-4 rounded-sm accent-[#EB5E44] cursor-pointer"
            />
            <label htmlFor="guardian-consent-check" className="text-xs text-[#162032] cursor-pointer">
              <span className="font-bold">Parental & Guardian Consent (DPDP Act 2023):</span> I confirm that I am the parent or legal guardian of {childName}, giving consent to use this photograph solely to generate their personalized Verve Studio book.
            </label>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#56647A]">
            <ShieldCheck className="w-4 h-4 text-[#4EAA8C] shrink-0" />
            <span>
              Your child’s photo is strictly encrypted, never shared, and never used to train public AI models.
            </span>
          </div>

          <div className="flex justify-between pt-4 border-t border-[#F0E9DF]">
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2.5 rounded-xl border border-[#E8DFD1] text-xs font-bold text-[#162032]"
            >
              Back
            </button>
            <button
              disabled={!hasParentalConsent || !photoUrl}
              onClick={() => setStep(5)}
              className="px-6 py-2.5 rounded-xl bg-[#EB5E44] hover:bg-[#D94F36] disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <span>Next: Choose Art Style</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 5: CHOOSE CHARACTER ART STYLE
          ======================================================== */}
      {step === 5 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD1] shadow-sm space-y-6">
          <div className="border-b border-[#F0E9DF] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44]">
              Step 5 of 6
            </span>
            <h2 className="font-serif-story text-2xl sm:text-3xl font-bold text-[#162032] mt-1">
              Choose their character art style
            </h2>
            <p className="text-xs sm:text-sm text-[#56647A] mt-1">
              Select the visual style for {childName}’s illustrations across all 24 pages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CHARACTER_STYLES.map((st) => (
              <div
                key={st.id}
                onClick={() => setCharacterStyle(st.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                  characterStyle === st.id
                    ? 'border-[#EB5E44] bg-[#FFF8F5] ring-2 ring-[#EB5E44]/20 shadow-xs'
                    : 'border-[#E8DFD1] bg-[#FAF7F2] hover:border-[#162032]'
                }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#162032] shrink-0 border border-[#E8DFD1]">
                  <img src={st.sampleImage} alt={st.label} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-sm text-[#162032] flex items-center gap-1.5">
                      <span>{st.previewEmoji}</span>
                      <span>{st.label}</span>
                    </h4>
                    {characterStyle === st.id && (
                      <Check className="w-4 h-4 text-[#EB5E44]" />
                    )}
                  </div>
                  <p className="text-xs text-[#56647A] mt-1 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-[#F0E9DF]">
            <button
              onClick={() => setStep(4)}
              className="px-5 py-2.5 rounded-xl border border-[#E8DFD1] text-xs font-bold text-[#162032]"
            >
              Back
            </button>
            <button
              onClick={() => setStep(6)}
              className="px-6 py-2.5 rounded-xl bg-[#EB5E44] hover:bg-[#D94F36] text-white text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <span>Next: Language & Dedication</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 6: STORY LANGUAGE & PARENT DEDICATION
          ======================================================== */}
      {step === 6 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD1] shadow-sm space-y-6">
          <div className="border-b border-[#F0E9DF] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44]">
              Step 6 of 6
            </span>
            <h2 className="font-serif-story text-2xl sm:text-3xl font-bold text-[#162032] mt-1">
              Language & parent dedication
            </h2>
            <p className="text-xs sm:text-sm text-[#56647A] mt-1">
              Select your story language and write a sweet dedication note printed on Page 2.
            </p>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-xs font-bold text-[#162032] mb-2">
              Story Language
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.name}
                  type="button"
                  onClick={() => setLanguage(lang.name)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-0.5 transition-all ${
                    language === lang.name
                      ? 'bg-[#162032] text-white border-[#162032] shadow-sm'
                      : 'bg-[#FAF7F2] text-[#162032] border-[#E8DFD1] hover:border-[#162032]'
                  }`}
                >
                  <span className="font-bold">{lang.name}</span>
                  <span className="text-[10px] font-normal opacity-80">{lang.native}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dedication message */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#162032] mb-1.5">
                From: <span className="text-gray-400 font-normal">(e.g. Amma & Appa, Mum & Dad, Nana & Nani)</span>
              </label>
              <input
                type="text"
                value={dedicationFrom}
                onChange={(e) => setDedicationFrom(e.target.value)}
                placeholder="Amma & Appa"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD1] focus:border-[#EB5E44] text-sm text-[#162032] outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#162032]">
                  Dedication Note printed inside the book:
                </label>
                <button
                  type="button"
                  onClick={handleSuggestDedication}
                  disabled={isSuggestingDedication}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFF8F5] hover:bg-[#FCEEEA] border border-[#FCD9D0] text-[#EB5E44] text-[11px] font-bold transition-all shadow-xs"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isSuggestingDedication ? 'animate-spin' : ''}`} />
                  <span>{isSuggestingDedication ? 'Writing with Gemini...' : '✨ Suggest with Gemini'}</span>
                </button>
              </div>
              <textarea
                rows={3}
                value={dedicationMessage}
                onChange={(e) => setDedicationMessage(e.target.value)}
                placeholder="Write a sweet message to your child..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD1] focus:border-[#EB5E44] text-sm text-[#162032] outline-none"
              />
            </div>
          </div>

          {/* Complete Summary Card */}
          <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#FCD9D0] flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#162032] shrink-0 border border-[#EB5E44]/20">
                <img src={photoUrl} alt="Hero reference" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-[#162032]">
                  {selectedStory.title}
                </h4>
                <p className="text-xs text-[#EB5E44] font-medium">
                  Hero: <span className="font-bold">{childName}</span> ({childAge} yrs) • {characterStyle} • {language}
                </p>
                <p className="text-[11px] text-[#56647A]">
                  Dedication: "{dedicationFrom}"
                </p>
              </div>
            </div>

            <span className="px-3.5 py-1.5 rounded-full bg-[#EB5E44] text-white text-xs font-bold shadow-xs">
              100% Free Preview
            </span>
          </div>

          {generationError && (
            <div className="p-4 rounded-2xl bg-[#FFF5F5] border border-[#FAD2D2] text-xs text-[#D94F36] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{generationError}</span>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-[#F0E9DF]">
            <button
              onClick={() => setStep(5)}
              className="px-5 py-2.5 rounded-xl border border-[#E8DFD1] text-xs font-bold text-[#162032]"
            >
              Back
            </button>
            <button
              id="wizard-generate-preview-btn"
              onClick={handleGeneratePreview}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#F5B027] via-[#EB5E44] to-[#D94F36] hover:opacity-95 text-white text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#EB5E44]/25 hover:scale-[1.02] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create My Free Preview</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
