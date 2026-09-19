import React, { useState, useEffect } from 'react';
import { 
  Story, 
  PersonalizedStoryPreview, 
  BookPage,
  UploadedChildPhoto,
  QualityValidationReport,
  ChildCharacterAsset,
  CharacterIllustrationMode,
  PoseId
} from '../types';
import { STORIES, INITIAL_PRICING, COLORING_PRICING, AR_ADDON_PLAN, COLORING_BOOK_PRODUCT } from '../data/mockStories';
import { 
  validateChildPhotoQuality, 
  generateCharacterAsset,
  generate32StoryPages,
  StoryPageSpec,
  POSE_LIBRARY,
  STORY_OUTFITS,
  getStorybookColoringFilterStyle 
} from '../services/imagePipelineService';
import { CharacterPipelineInspector } from './CharacterPipelineInspector';
import { VerveCompositor } from './VerveCompositor';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Camera, 
  ChevronLeft, 
  ChevronRight, 
  Wand2, 
  Lock, 
  MapPin, 
  Shield, 
  QrCode, 
  Play, 
  RotateCcw, 
  MessageSquarePlus, 
  CheckCircle2,
  X,
  BookOpen,
  Cpu,
  Layers,
  Upload,
  Info,
  ShieldCheck,
  ZoomIn,
  Truck,
  CreditCard,
  Phone,
  Mail,
  User
} from 'lucide-react';

interface CreateStoryWizardProps {
  initialStory?: Story | null;
  onPreviewReady?: (preview: PersonalizedStoryPreview) => void;
  onCancel: () => void;
  onOrderComplete?: (orderData: any) => void;
}

const INTEREST_OPTIONS = ['Space', 'Dinosaurs', 'Art', 'Sports', 'Animals', 'Music'];
const PERSONALITY_OPTIONS = ['Brave', 'Kind', 'Curious', 'Funny', 'Creative'];
const COLOR_OPTIONS = [
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Green', hex: '#16A34A' },
  { name: 'Yellow', hex: '#EAB308' },
  { name: 'Orange', hex: '#EA580C' },
  { name: 'Purple', hex: '#9333EA' },
  { name: 'Red', hex: '#DC2626' },
];
const LANGUAGE_OPTIONS = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Marathi', 'Bengali'];

const SAMPLE_AVATARS = [
  { name: 'Aarav (Boy)', gender: 'boy' as const, photo: '/src/assets/images/kid_boy_aarav_1789747514421.jpg' },
  { name: 'Ananya (Girl)', gender: 'girl' as const, photo: '/src/assets/images/kid_girl_ananya_1789747526723.jpg' },
  { name: 'Kabir (Boy)', gender: 'boy' as const, photo: '/src/assets/images/kid_boy_kabir_1789747544716.jpg' },
  { name: 'Meera (Girl)', gender: 'girl' as const, photo: '/src/assets/images/kid_girl_meera_1789747560780.jpg' }
];

export const CreateStoryWizard: React.FC<CreateStoryWizardProps> = ({
  initialStory,
  onPreviewReady,
  onCancel,
  onOrderComplete
}) => {
  // Main Step: 1 = Child Profile & Image Pipeline, 2 = Format, 3 = Free Preview, 4 = Full Book Review, 5 = Choose Package & Checkout
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Selected Story
  const [story, setStory] = useState<Story>(initialStory || STORIES[0]);

  // Step 1: Child Profile State
  const [childName, setChildName] = useState('Aarav');
  const [childAge, setChildAge] = useState(5);
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');
  const [photoUrl, setPhotoUrl] = useState<string>('/src/assets/images/kid_boy_aarav_1789747514421.jpg');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Space', 'Animals']);
  const [selectedPersonality, setSelectedPersonality] = useState<string[]>(['Brave', 'Curious']);
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Multi-Photo Upload State (1-3 photos)
  const [photos, setPhotos] = useState<UploadedChildPhoto[]>([
    {
      id: 'photo-1',
      url: '/src/assets/images/kid_boy_aarav_1789747514421.jpg',
      type: 'front_facing',
      label: 'Photo 1 ⭐ (Front-facing)',
      isPrimary: true,
      score: 98
    },
    {
      id: 'photo-2',
      url: '/src/assets/images/kid_boy_kabir_1789747544716.jpg',
      type: 'slightly_turned',
      label: 'Photo 2 (Slightly turned)',
      isPrimary: false,
      score: 89
    }
  ]);

  // Image Pipeline & CV State
  const [illustrationMode, setIllustrationMode] = useState<CharacterIllustrationMode>('mode_a_photo');
  const [qualityReport, setQualityReport] = useState<QualityValidationReport | null>(null);
  const [characterAsset, setCharacterAsset] = useState<ChildCharacterAsset>(() => 
    generateCharacterAsset('Aarav', 5, 'boy', '/src/assets/images/kid_boy_aarav_1789747514421.jpg', 'mode_a_photo')
  );
  const [showPipelineInspector, setShowPipelineInspector] = useState<boolean>(false);
  const [isAnalyzingPhoto, setIsAnalyzingPhoto] = useState<boolean>(false);

  // Run CV validation whenever photo or child changes
  useEffect(() => {
    let isMounted = true;
    setIsAnalyzingPhoto(true);

    validateChildPhotoQuality(photoUrl).then((report) => {
      if (isMounted) {
        setQualityReport(report);
        const asset = generateCharacterAsset(
          childName || 'Child Hero',
          childAge,
          gender,
          photoUrl,
          illustrationMode,
          report.detectedLandmarks
        );
        setCharacterAsset(asset);
        setIsAnalyzingPhoto(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [photoUrl, childName, childAge, gender, illustrationMode]);

  // Step 2: Format selection
  const [productFormat, setProductFormat] = useState<'storybook' | 'coloring'>('storybook');

  // Step 3: Free Preview Carousel Index
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [isArModalOpen, setIsArModalOpen] = useState(false);
  const [isPlayingArVideo, setIsPlayingArVideo] = useState(false);

  // Step 4: Full Book Review & Change Request Modal
  const [isChangeRequestOpen, setIsChangeRequestOpen] = useState(false);
  const [changeRequestText, setChangeRequestText] = useState('');
  const [changeRequestSubmitted, setChangeRequestSubmitted] = useState(false);
  const [selectedPageForZoom, setSelectedPageForZoom] = useState<number | null>(null);

  // Step 5: Package & Addons
  const [selectedPackageFormat, setSelectedPackageFormat] = useState<string>('hardcover');
  const [arAddonSelected, setArAddonSelected] = useState<boolean>(true);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Parent dedication
  const [dedicationMessage, setDedicationMessage] = useState(
    `For our dearest ${childName || 'little explorer'}. May your heart always be brave, your curiosity limitless, and your smile radiant. With all our love.`
  );

  // Generate 32 pages for the storybook using deterministic layered rules
  const full32PagesSpecs: StoryPageSpec[] = generate32StoryPages(childName, gender, selectedColor);

  const full32Pages: BookPage[] = full32PagesSpecs.map((spec) => ({
    pageNumber: spec.pageNumber,
    sceneTitle: spec.sceneTitle,
    textTemplate: spec.narrativeText,
    defaultImage: spec.bgUrl,
    boyImage: spec.bgUrl,
    girlImage: spec.bgUrl,
    poseId: spec.poseId,
    outfitId: 'space-suit'
  }));

  // Free preview spreads (3 preview spreads)
  const previewSpreads = [
    {
      spreadNum: 1,
      leftTitle: `Meet ${childName}`,
      leftSub: `The brave explorer!`,
      text: full32PagesSpecs[0]?.narrativeText || `Every big adventure starts with a curious question. One evening, ${childName} spotted a brilliant sapphire star dancing across the sky.`,
      spec: full32PagesSpecs[0]
    },
    {
      spreadNum: 2,
      leftTitle: `The Starlight Vessel`,
      leftSub: `Preparing for launch`,
      text: full32PagesSpecs[1]?.narrativeText || `With a trusty compass and a loyal companion, ${childName} stepped aboard the Starlight Cruiser ready to chart the forgotten galaxy.`,
      spec: full32PagesSpecs[1]
    },
    {
      spreadNum: 3,
      leftTitle: `The Crystal Planet`,
      leftSub: `Singing violet crystals`,
      text: full32PagesSpecs[2]?.narrativeText || `On a glowing violet moon, singing crystals chimed a melody of friendship every time ${childName} smiled.`,
      spec: full32PagesSpecs[2]
    }
  ];

  // Helper toggle functions
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const togglePersonality = (p: string) => {
    if (selectedPersonality.includes(p)) {
      setSelectedPersonality(selectedPersonality.filter(i => i !== p));
    } else {
      setSelectedPersonality([...selectedPersonality, p]);
    }
  };

  // Build Personalized Story Preview Object
  const generatePreviewObject = (): PersonalizedStoryPreview => {
    return {
      id: `prev-${Date.now()}`,
      storyId: story.id,
      storyTitle: story.title,
      childProfile: {
        id: `char-${Date.now()}`,
        characterReferenceId: characterAsset.characterId,
        name: childName,
        age: childAge,
        gender,
        photoUrl,
        canonicalCharacterPortraitUrl: photoUrl,
        preferredStyle: 'Classic Storybook',
        illustrationMode,
        asset: characterAsset,
        interests: selectedInterests,
        favoriteColor: selectedColor,
        language: selectedLanguage as any,
        createdDate: new Date().toISOString(),
        lastUsedDate: new Date().toISOString(),
        storiesCount: 1
      },
      characterAsset,
      childName,
      childAge,
      gender,
      characterStyle: 'Classic Storybook',
      illustrationMode,
      language: selectedLanguage as any,
      coverUrl: story.coverImage,
      dedicationFrom: 'Parents',
      dedicationMessage,
      pages: full32Pages.map((p, i) => ({
        pageNumber: p.pageNumber,
        sceneTitle: p.sceneTitle,
        text: p.textTemplate,
        imageUrl: p.defaultImage,
        genderVersion: gender,
        isUnlockedInPreview: i < 3,
        coloringBookImageUrl: p.defaultImage
      })),
      totalPageCount: 32,
      unlockedPageCount: 3,
      createdAt: new Date().toLocaleDateString()
    };
  };

  const handleProceedToPreview = () => {
    const previewObj = generatePreviewObject();
    if (onPreviewReady) {
      onPreviewReady(previewObj);
    } else {
      setWizardStep(3);
    }
  };

  // Stepper Header
  const renderStepperHeader = () => {
    const steps = [
      { num: 1, label: 'Child & Pipeline' },
      { num: 2, label: 'Story Format' },
      { num: 3, label: 'Free Preview' },
      { num: 4, label: 'Full Review' },
      { num: 5, label: 'Package & Order' }
    ];

    let activeIndicator = wizardStep;

    return (
      <div className="w-full max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="flex items-center justify-between relative">
          {/* Connecting Line */}
          <div className="absolute left-6 right-6 top-4 -translate-y-1/2 h-[2px] bg-[#EBE4DA] -z-0" />
          
          {steps.map((s) => {
            const isCompleted = activeIndicator > s.num;
            const isCurrent = activeIndicator === s.num;
            
            return (
              <div key={s.num} className="flex flex-col items-center gap-2 relative z-10">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#C05638] text-white ring-4 ring-[#FBF2EE]'
                      : isCompleted
                      ? 'bg-[#161922] text-white'
                      : 'bg-white text-[#8896AB] border border-[#D5CDC2]'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span 
                  className={`text-xs font-medium text-center ${
                    isCurrent ? 'text-[#C05638] font-semibold' : 'text-[#56647A]'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 text-[#161922]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* Stepper Navigation Indicator */}
        {renderStepperHeader()}

        {/* =================================================================
            STEP 1: CHILD PROFILE & IMAGE PIPELINE
            ================================================================= */}
        {wizardStep === 1 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Heading */}
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBF2EE] border border-[#EBE4DA] text-[#C05638] text-xs font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>Verve Deterministic Character Pipeline</span>
              </div>
              <h1 className="font-serif-story font-bold text-2xl sm:text-3xl text-[#161922]">
                Tell us about your child & upload photos
              </h1>
              <p className="text-sm text-[#56647A]">
                The child's identity is extracted once and consistently reused across every single page.
              </p>
            </div>

            {/* Form Fields Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE4DA] shadow-xs space-y-6">
              
              {/* Name & Age Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#161922] block">
                    Name <span className="text-[#C05638]">*</span>
                  </label>
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="E.g. Aarav"
                    className="w-full px-4 py-3 rounded-xl border border-[#D5CDC2] text-sm text-[#161922] focus:border-[#C05638] outline-none font-medium"
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#161922] block">
                    Age <span className="text-[#C05638]">*</span>
                  </label>
                  <select
                    value={childAge}
                    onChange={(e) => setChildAge(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-[#D5CDC2] text-sm text-[#161922] focus:border-[#C05638] outline-none bg-white font-medium"
                  >
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(a => (
                      <option key={a} value={a}>{a} years</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Gender Radio Pills */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#161922] block">
                  Gender <span className="text-[#C05638]">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setGender('boy');
                      setPhotoUrl('/src/assets/images/kid_boy_aarav_1789747514421.jpg');
                    }}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                      gender === 'boy'
                        ? 'bg-[#C05638] text-white border-[#C05638] shadow-xs'
                        : 'bg-[#FAF8F5] text-[#56647A] border-[#D5CDC2] hover:border-[#161922]'
                    }`}
                  >
                    Boy
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGender('girl');
                      setPhotoUrl('/src/assets/images/kid_girl_ananya_1789747526723.jpg');
                    }}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                      gender === 'girl'
                        ? 'bg-[#C05638] text-white border-[#C05638] shadow-xs'
                        : 'bg-[#FAF8F5] text-[#56647A] border-[#D5CDC2] hover:border-[#161922]'
                    }`}
                  >
                    Girl
                  </button>
                </div>
              </div>

              {/* Multi-Photo Upload & Computer Vision Quality Gate */}
              <div className="space-y-3 pt-2 border-t border-[#F5EFEB]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#161922] block">
                    Upload Child Photos (1–3 Photos Accepted)
                  </label>
                  <span className="text-[11px] text-[#56647A]">
                    JPG, PNG, WebP • Front-facing works best
                  </span>
                </div>

                {/* Multi-Photo Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Photo 1 (Primary Front-facing ⭐) */}
                  <div className="border-2 border-[#C05638] rounded-2xl p-3 bg-[#FFFBF8] flex flex-col justify-between relative shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-[#EBE4DA] shrink-0">
                        <img src={photoUrl} alt="Primary child" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-[#C05638] font-bold text-xs">
                          <span>Photo 1 ⭐</span>
                        </div>
                        <span className="text-[11px] text-[#56647A]">Primary front-facing</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-[#F5EFEB] flex items-center justify-between text-[10px]">
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        ✓ Quality 98%
                      </span>
                      <span className="text-[#8896AB]">In use</span>
                    </div>
                  </div>

                  {/* Photo 2 (Slightly turned) */}
                  <div className="border border-[#D5CDC2] rounded-2xl p-3 bg-[#FAF8F5] flex flex-col justify-between relative opacity-85 hover:opacity-100 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-[#EBE4DA] shrink-0">
                        <img src="/src/assets/images/kid_boy_kabir_1789747544716.jpg" alt="Photo 2" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#161922]">Photo 2</div>
                        <span className="text-[11px] text-[#56647A]">Slightly turned</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-[#EBE4DA] flex items-center justify-between text-[10px]">
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        ✓ Validated
                      </span>
                      <span className="text-[#8896AB]">Backup angle</span>
                    </div>
                  </div>

                  {/* Photo 3 (Upload Slot) */}
                  <div className="border-2 border-dashed border-[#D5CDC2] rounded-2xl p-3 bg-white hover:bg-[#FAF8F5] flex flex-col items-center justify-center text-center gap-1 cursor-pointer transition min-h-[84px]">
                    <Camera className="w-5 h-5 text-[#8896AB]" />
                    <span className="text-xs font-bold text-[#161922]">+ Add Photo 3</span>
                    <span className="text-[10px] text-[#56647A]">Full body or action</span>
                  </div>

                </div>

                {/* Sample Avatars Picker */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-[#56647A]">Or try quick sample portraits:</span>
                  <div className="flex items-center gap-2">
                    {SAMPLE_AVATARS.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setPhotoUrl(s.photo);
                          setGender(s.gender);
                          setChildName(s.name.split(' ')[0]);
                        }}
                        className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-transform hover:scale-105 cursor-pointer ${
                          photoUrl === s.photo ? 'border-[#C05638] ring-2 ring-[#C05638]/20' : 'border-white'
                        }`}
                        title={`Sample: ${s.name}`}
                      >
                        <img src={s.photo} alt={s.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Real-Time CV Quality Check Results Bar */}
                <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex flex-wrap items-center justify-between gap-2 text-xs text-[#166534]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span className="font-semibold">
                      Automated Quality Check: Face detected (312×365px), eyes visible, balanced lighting.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowPipelineInspector(!showPipelineInspector)}
                    className="text-xs font-bold text-[#C05638] hover:underline flex items-center gap-1 cursor-pointer ml-auto"
                  >
                    <span>{showPipelineInspector ? 'Hide Pipeline Inspector' : 'Inspect Character Asset & Layers'}</span>
                    <Cpu className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Character Pipeline Inspector (Collapsible / Expandable) */}
              {showPipelineInspector && (
                <div className="pt-2">
                  <CharacterPipelineInspector 
                    asset={characterAsset}
                    qualityReport={qualityReport || undefined}
                    onUpdateMode={(m) => setIllustrationMode(m)}
                  />
                </div>
              )}

              {/* Things they love (optional) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#161922] block">
                  Things they love (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map((item) => {
                    const isSelected = selectedInterests.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item)}
                        className={`px-4 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C05638] text-white border-[#C05638]'
                            : 'bg-[#FAF8F5] text-[#56647A] border-[#D5CDC2] hover:border-[#161922]'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personality (optional) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#161922] block">
                  Personality (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {PERSONALITY_OPTIONS.map((item) => {
                    const isSelected = selectedPersonality.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => togglePersonality(item)}
                        className={`px-4 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C05638] text-white border-[#C05638]'
                            : 'bg-[#FAF8F5] text-[#56647A] border-[#D5CDC2] hover:border-[#161922]'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Favourite colour & Language Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Colour Swatches */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#161922] block">
                    Favourite colour (optional)
                  </label>
                  <div className="flex items-center gap-3 pt-1">
                    {COLOR_OPTIONS.map((col) => (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() => setSelectedColor(col.name)}
                        className={`w-7 h-7 rounded-full transition-transform cursor-pointer relative ${
                          selectedColor === col.name ? 'scale-115 ring-2 ring-offset-2 ring-[#C05638]' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#161922] block">
                    Language (optional)
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5CDC2] text-xs text-[#161922] outline-none bg-white font-medium"
                  >
                    {LANGUAGE_OPTIONS.map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

              </div>

            </div>

            {/* Next Button */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={onCancel}
                className="px-6 py-3 rounded-full border border-[#D5CDC2] text-xs font-semibold text-[#56647A] hover:bg-white cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                id="wizard-step1-next-btn"
                onClick={() => setWizardStep(2)}
                className="px-10 py-3.5 rounded-full bg-[#C05638] hover:bg-[#AC492E] text-white font-semibold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Next: Choose Format</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            STEP 2: CHOOSE PRODUCT / FORMAT
            ================================================================= */}
        {wizardStep === 2 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Heading */}
            <div className="space-y-2 text-left">
              <h1 className="font-serif-story font-bold text-2xl sm:text-3xl text-[#161922]">
                Choose your story format
              </h1>
              <p className="text-sm text-[#56647A]">
                The same child character ({characterAsset.characterId}) seamlessly adapts to both full-color storybook and coloring book formats.
              </p>
            </div>

            {/* 2 Format Option Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Option 1: Storybook */}
              <div
                onClick={() => setProductFormat('storybook')}
                className={`bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  productFormat === 'storybook'
                    ? 'border-[#C05638] ring-2 ring-[#C05638]/20 shadow-md'
                    : 'border-[#EBE4DA] hover:border-[#C05638]/50'
                }`}
              >
                <div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 mb-4 relative">
                    <img
                      src="/src/assets/images/space_boy_scene_1789746482524.jpg"
                      alt="Storybook Mockup"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-md text-[10px] font-bold text-[#161922] shadow-xs">
                      Personalized 32 Pages (Full Color)
                    </div>
                  </div>

                  <h3 className="font-serif-story font-bold text-xl text-[#161922] mb-1">
                    Storybook Keepsake
                  </h3>
                  <p className="text-xs text-[#56647A] leading-relaxed">
                    Custom hardcover printed with archival inks, heirloom binding + instant eBook download.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F5EFEB] flex items-center justify-between">
                  <span className="font-serif-story font-bold text-lg text-[#161922]">From ₹999</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    productFormat === 'storybook' ? 'bg-[#C05638] text-white' : 'border border-[#D5CDC2]'
                  }`}>
                    {productFormat === 'storybook' && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>

              {/* Option 2: Coloring Book */}
              <div
                onClick={() => setProductFormat('coloring')}
                className={`bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  productFormat === 'coloring'
                    ? 'border-[#C05638] ring-2 ring-[#C05638]/20 shadow-md'
                    : 'border-[#EBE4DA] hover:border-[#C05638]/50'
                }`}
              >
                <div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-4 relative">
                    <img
                      src="/src/assets/images/storybook_mockup_animated_1789747788784.jpg"
                      alt="Coloring Book Mockup"
                      className="w-full h-full object-cover"
                      style={getStorybookColoringFilterStyle(true)}
                    />
                    <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-md text-[10px] font-bold text-[#161922] shadow-xs">
                      24 Line-Art Pages (Programmatic)
                    </div>
                  </div>

                  <h3 className="font-serif-story font-bold text-xl text-[#161922] mb-1">
                    Adventure Coloring Book
                  </h3>
                  <p className="text-xs text-[#56647A] leading-relaxed">
                    Exact same story and child hero, rendered into crisp black & white line art for coloring.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F5EFEB] flex items-center justify-between">
                  <span className="font-serif-story font-bold text-lg text-[#161922]">From ₹499</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    productFormat === 'coloring' ? 'bg-[#C05638] text-white' : 'border border-[#D5CDC2]'
                  }`}>
                    {productFormat === 'coloring' && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setWizardStep(1)}
                className="px-6 py-3 rounded-full border border-[#D5CDC2] text-xs font-semibold text-[#56647A] hover:bg-white flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              
              <button
                id="wizard-step2-next-btn"
                onClick={handleProceedToPreview}
                className="px-10 py-3.5 rounded-full bg-[#C05638] hover:bg-[#AC492E] text-white font-semibold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Generate Free Preview</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            STEP 3: FREE 3-SPREAD PREVIEW
            ================================================================= */}
        {wizardStep === 3 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Header & Character ID banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif-story font-bold text-2xl sm:text-3xl text-[#161922]">
                  Free Story Preview: {story.title}
                </h1>
                <p className="text-xs text-[#56647A] mt-1">
                  Child Identity: <strong className="text-[#C05638] font-mono">{characterAsset.characterId}</strong> ({childName}) • Mode: {illustrationMode === 'mode_a_photo' ? 'Photo Likeness' : 'Storybook Art'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPipelineInspector(!showPipelineInspector)}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#D5CDC2] text-xs font-semibold text-[#161922] hover:bg-[#FAF8F5] transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5 text-[#C05638]" />
                  <span>Pipeline Info</span>
                </button>
              </div>
            </div>

            {/* Pipeline Inspector in Preview */}
            {showPipelineInspector && (
              <CharacterPipelineInspector 
                asset={characterAsset}
                qualityReport={qualityReport || undefined}
                onUpdateMode={(m) => setIllustrationMode(m)}
              />
            )}

            {/* Spread Display */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE4DA] shadow-sm space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                {/* Left Page (Typography Safe Area) */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#EBE4DA] space-y-4 flex flex-col justify-center min-h-[340px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C05638] bg-[#FBF2EE] px-2.5 py-1 rounded-full">
                      Spread {previewSpreads[activePreviewIndex].spreadNum} of 3 • Free Proof
                    </span>
                    <span className="text-[10px] text-[#56647A] font-mono">
                      Safe Margin: 12mm
                    </span>
                  </div>

                  <h3 className="font-serif-story font-bold text-2xl sm:text-3xl text-[#161922] leading-snug">
                    {previewSpreads[activePreviewIndex].leftTitle}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-[#56647A] leading-relaxed italic font-serif-story">
                    "{previewSpreads[activePreviewIndex].text}"
                  </p>

                  <div className="pt-4 border-t border-[#EBE4DA]/60 flex items-center gap-2 text-[11px] text-[#8896AB]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Personalized for <strong>{childName}</strong> ({gender}, {childAge} yrs)</span>
                  </div>
                </div>

                {/* Right Page (Composed Illustration with Child Face Layer) */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-[#EBE4DA] relative shadow-md">
                  <VerveCompositor 
                    spec={previewSpreads[activePreviewIndex].spec}
                    characterAsset={characterAsset}
                    isColoringBook={productFormat === 'coloring'}
                    illustrationMode={illustrationMode}
                    className="w-full h-full"
                  />
                </div>

              </div>

              {/* Carousel Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-[#F5EFEB]">
                <button
                  disabled={activePreviewIndex === 0}
                  onClick={() => setActivePreviewIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-full border border-[#D5CDC2] text-xs font-semibold disabled:opacity-30 flex items-center gap-1 cursor-pointer hover:bg-slate-50 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Spread</span>
                </button>

                <div className="flex items-center gap-2">
                  {previewSpreads.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePreviewIndex(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        activePreviewIndex === idx ? 'w-8 bg-[#C05638]' : 'w-2.5 bg-[#D5CDC2]'
                      }`}
                      title={`Spread ${s.spreadNum}`}
                    />
                  ))}
                </div>

                <button
                  disabled={activePreviewIndex === previewSpreads.length - 1}
                  onClick={() => setActivePreviewIndex(prev => prev + 1)}
                  className="px-4 py-2 rounded-full border border-[#D5CDC2] text-xs font-semibold disabled:opacity-30 flex items-center gap-1 cursor-pointer hover:bg-slate-50 transition"
                >
                  <span>Next Spread</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Navigation to Full Book Review */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setWizardStep(2)}
                className="px-6 py-3 rounded-full border border-[#D5CDC2] text-xs font-semibold text-[#56647A] hover:bg-white flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              
              <button
                id="wizard-step3-review-btn"
                onClick={() => setWizardStep(4)}
                className="px-10 py-3.5 rounded-full bg-[#C05638] hover:bg-[#AC492E] text-white font-semibold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Review All 32 Pages</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* =================================================================
            STEP 4: FULL 32-PAGE REVIEW & EDITORIAL CHECK
            ================================================================= */}
        {wizardStep === 4 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif-story font-bold text-2xl sm:text-3xl text-[#161922]">
                  Review All 32 Pages Before Press
                </h1>
                <p className="text-xs text-[#56647A] mt-1">
                  Click any page to inspect high-resolution face compositing and scene typography.
                </p>
              </div>

              <button
                onClick={() => setIsChangeRequestOpen(true)}
                className="px-4 py-2 rounded-full bg-[#FBF2EE] border border-[#EBE4DA] text-[#C05638] text-xs font-bold hover:bg-[#C05638] hover:text-white transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Request Changes</span>
              </button>
            </div>

            {/* 32-Page Grid Display with VerveCompositor Thumbnails */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE4DA] shadow-sm space-y-4">
              <div className="flex items-center justify-between text-xs text-[#56647A] pb-2 border-b border-[#F5EFEB]">
                <span>32 Personalized Story Scenes (Single Master Identity: <strong>{characterAsset.characterId}</strong>)</span>
                <span className="font-mono text-[11px] text-[#C05638]">Click thumbnail to zoom</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-[520px] overflow-y-auto p-1">
                {full32PagesSpecs.map((spec) => (
                  <div
                    key={spec.pageNumber}
                    onClick={() => setSelectedPageForZoom(spec.pageNumber)}
                    className="border border-[#EBE4DA] rounded-xl overflow-hidden bg-slate-900 relative group cursor-pointer hover:border-[#C05638] hover:ring-2 hover:ring-[#C05638]/20 transition shadow-xs"
                  >
                    <div className="aspect-[4/3] relative">
                      <VerveCompositor 
                        spec={spec}
                        characterAsset={characterAsset}
                        isColoringBook={productFormat === 'coloring'}
                        illustrationMode={illustrationMode}
                        isThumbnail={true}
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="p-1.5 bg-white text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#C05638] font-bold">
                          Pg {spec.pageNumber}
                        </span>
                        <span className="text-[8px] text-[#8896AB] uppercase">
                          {spec.poseId.split('-')[1]}
                        </span>
                      </div>
                      <p className="text-[9px] text-[#161922] truncate font-medium mt-0.5">
                        {spec.sceneTitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dedication Message Editor */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBE4DA] space-y-3 shadow-sm">
              <label className="text-xs font-bold uppercase tracking-wider text-[#161922] flex items-center justify-between">
                <span>Opening Dedication Page Message</span>
                <span className="text-[10px] font-normal text-[#8896AB]">Printed on Page 2</span>
              </label>
              <textarea
                value={dedicationMessage}
                onChange={(e) => setDedicationMessage(e.target.value)}
                rows={3}
                className="w-full p-4 rounded-2xl border border-[#D5CDC2] text-xs sm:text-sm text-[#161922] focus:border-[#C05638] outline-none"
              />
            </div>

            {/* Zoom Modal */}
            {selectedPageForZoom !== null && (() => {
              const currentSpec = full32PagesSpecs.find(p => p.pageNumber === selectedPageForZoom) || full32PagesSpecs[0];
              return (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                    <button
                      onClick={() => setSelectedPageForZoom(null)}
                      className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#56647A] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-between pr-10">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C05638]">
                          Page {currentSpec.pageNumber} of 32
                        </span>
                        <h3 className="font-serif-story font-bold text-2xl text-[#161922]">
                          {currentSpec.sceneTitle}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          disabled={selectedPageForZoom <= 1}
                          onClick={() => setSelectedPageForZoom(prev => prev ? Math.max(1, prev - 1) : 1)}
                          className="px-3 py-1.5 rounded-full border border-[#D5CDC2] text-xs font-semibold disabled:opacity-30 flex items-center gap-1 cursor-pointer"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" /> Prev
                        </button>
                        <button
                          disabled={selectedPageForZoom >= 32}
                          onClick={() => setSelectedPageForZoom(prev => prev ? Math.min(32, prev + 1) : 32)}
                          className="px-3 py-1.5 rounded-full border border-[#D5CDC2] text-xs font-semibold disabled:opacity-30 flex items-center gap-1 cursor-pointer"
                        >
                          Next <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-[#EBE4DA] relative shadow-inner">
                      <VerveCompositor 
                        spec={currentSpec}
                        characterAsset={characterAsset}
                        isColoringBook={productFormat === 'coloring'}
                        illustrationMode={illustrationMode}
                        className="w-full h-full"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE4DA] space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#8896AB] block">Narrative Text:</span>
                      <p className="font-serif-story text-sm sm:text-base text-[#161922] italic leading-relaxed">
                        "{currentSpec.narrativeText}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 text-xs text-[#56647A]">
                      <span>Pose: <strong>{currentSpec.poseId}</strong></span>
                      <span>Identity Anchored: <strong>{characterAsset.characterId}</strong></span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Request Changes Modal */}
            {isChangeRequestOpen && (
              <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
                  <button
                    onClick={() => {
                      setIsChangeRequestOpen(false);
                      setChangeRequestSubmitted(false);
                    }}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#56647A] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h3 className="font-serif-story font-bold text-2xl text-[#161922]">
                    Request Story Adjustments
                  </h3>
                  
                  {changeRequestSubmitted ? (
                    <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm space-y-2">
                      <div className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Request Sent to Verve Editorial Team!</span>
                      </div>
                      <p className="text-xs text-emerald-700">
                        Our studio designers will adjust the layout before the final print run. You will receive an updated proof link via email.
                      </p>
                      <button
                        onClick={() => {
                          setIsChangeRequestOpen(false);
                          setChangeRequestSubmitted(false);
                        }}
                        className="mt-3 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-xs text-[#56647A]">
                        Tell us what you'd like adjusted (e.g. spelling of a pet's name, custom dedication, or lighting refinement):
                      </p>
                      <textarea
                        value={changeRequestText}
                        onChange={(e) => setChangeRequestText(e.target.value)}
                        placeholder="e.g., On Page 7, please make sure the child's sister is mentioned, and brighten the starlight..."
                        rows={4}
                        className="w-full p-4 rounded-2xl border border-[#D5CDC2] text-xs text-[#161922] focus:border-[#C05638] outline-none"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setIsChangeRequestOpen(false)}
                          className="px-4 py-2 rounded-full border border-[#D5CDC2] text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setChangeRequestSubmitted(true)}
                          className="px-6 py-2 rounded-full bg-[#C05638] text-white text-xs font-bold cursor-pointer"
                        >
                          Submit Note
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation to Step 5: Package Selection */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setWizardStep(3)}
                className="px-6 py-3 rounded-full border border-[#D5CDC2] text-xs font-semibold text-[#56647A] hover:bg-white flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Preview</span>
              </button>
              
              <button
                id="wizard-step4-checkout-btn"
                onClick={() => setWizardStep(5)}
                className="px-10 py-3.5 rounded-full bg-[#C05638] hover:bg-[#AC492E] text-white font-semibold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Approve & Choose Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* =================================================================
            STEP 5: CHOOSE PACKAGE & CHECKOUT
            ================================================================= */}
        {wizardStep === 5 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {checkoutComplete ? (
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EBE4DA] shadow-sm text-center space-y-6 max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#C05638] bg-[#FBF2EE] px-3 py-1 rounded-full">
                    Order #VS-{Math.floor(100000 + Math.random() * 900000)} Confirmed
                  </span>
                  <h2 className="font-serif-story font-bold text-3xl text-[#161922]">
                    Thank You! {childName}'s Keepsake is in Production
                  </h2>
                  <p className="text-sm text-[#56647A] max-w-md mx-auto">
                    Character Reference ID <strong className="font-mono text-[#C05638]">{characterAsset.characterId}</strong> has been saved.
                  </p>
                </div>

                {/* Real-time lifecycle timeline */}
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EBE4DA] text-left space-y-4">
                  <span className="text-xs font-bold uppercase text-[#161922] block">
                    Real-Time Production & Delivery Status:
                  </span>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-3 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>✓ Preview Approved & Color-Graded</span>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>✓ 32 High-Resolution Pages Rendered</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#C05638] font-bold animate-pulse">
                      <div className="w-4 h-4 rounded-full bg-[#C05638] flex items-center justify-center text-[9px] text-white">●</div>
                      <span>Printing on 200 GSM Archival Silk Paper (In Progress)</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#8896AB]">
                      <div className="w-4 h-4 rounded-full border border-[#D5CDC2]" />
                      <span>Heirloom Hardcover Binding & Quality Inspection</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#8896AB]">
                      <div className="w-4 h-4 rounded-full border border-[#D5CDC2]" />
                      <span>Express Courier Dispatch (Estimated 3-4 Business Days)</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      alert(`Downloading instant high-res eBook PDF for ${childName}...`);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#161922] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Download Instant eBook (PDF)</span>
                  </button>
                  <button
                    onClick={() => setWizardStep(1)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#D5CDC2] text-xs font-semibold text-[#56647A] hover:bg-slate-50 cursor-pointer"
                  >
                    <span>Create Another Story</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2 text-left">
                  <h1 className="font-serif-story font-bold text-2xl sm:text-3xl text-[#161922]">
                    Select Package & Secure Delivery
                  </h1>
                  <p className="text-sm text-[#56647A]">
                    {productFormat === 'coloring' ? '24 Personalized Coloring Pages' : '32 Full-Color Illustrated Pages'} with archival heirloom printing and free delivery across India.
                  </p>
                </div>

                {/* Pricing Packages */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(productFormat === 'coloring' ? COLORING_PRICING : INITIAL_PRICING).map((plan) => {
                    const isSelected = selectedPackageFormat === plan.format;
                    return (
                      <div
                        key={plan.format}
                        onClick={() => setSelectedPackageFormat(plan.format)}
                        className={`bg-white rounded-3xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                          isSelected
                            ? 'border-[#C05638] ring-2 ring-[#C05638]/20 shadow-md'
                            : 'border-[#EBE4DA] hover:border-[#D5CDC2]'
                        }`}
                      >
                        {plan.badge && (
                          <span className="absolute -top-3 left-4 bg-[#C05638] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                            {plan.badge}
                          </span>
                        )}

                        <div className="space-y-3">
                          <div>
                            <h4 className="font-serif-story font-bold text-base text-[#161922]">
                              {plan.title}
                            </h4>
                            <span className="text-[11px] text-[#56647A]">{plan.subtitle}</span>
                          </div>

                          <div className="flex items-baseline gap-2">
                            <span className="font-serif-story font-bold text-2xl text-[#161922]">
                              ₹{plan.price}
                            </span>
                            <span className="text-xs text-[#8896AB] line-through">
                              ₹{plan.originalPrice}
                            </span>
                          </div>

                          <ul className="space-y-1.5 text-[11px] text-[#56647A]">
                            {plan.features.map((feat, idx) => (
                              <li key={idx} className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-[#C05638]" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#F5EFEB] flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#C05638]">
                            {isSelected ? 'Selected' : 'Select'}
                          </span>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-[#C05638] text-white' : 'border border-[#D5CDC2]'
                          }`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* AR Magic Addon */}
                <div className="p-5 rounded-3xl bg-white border border-[#EBE4DA] flex items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#FBF2EE] text-[#C05638] flex items-center justify-center shrink-0">
                      <Play className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif-story font-bold text-sm text-[#161922]">
                        Bring it to Life with WonderMagic AR (+₹399)
                      </h4>
                      <p className="text-xs text-[#56647A]">
                        Scan QR codes on book pages to watch animated 3D scenes on any smartphone. No app needed.
                      </p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={arAddonSelected}
                    onChange={(e) => setArAddonSelected(e.target.checked)}
                    className="w-5 h-5 accent-[#C05638] cursor-pointer"
                  />
                </div>

                {/* Shipping Details */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE4DA] shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#C05638]" />
                    <h3 className="font-serif-story font-bold text-lg text-[#161922]">
                      Shipping & Delivery Address
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-[11px] font-bold text-[#161922] block mb-1">Parent / Guardian Name</label>
                      <input 
                        defaultValue="Priya Sharma"
                        className="w-full p-3 rounded-xl border border-[#D5CDC2] text-xs focus:border-[#C05638] outline-none"
                        placeholder="Full Name"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-[#161922] block mb-1">Mobile Phone (for delivery updates)</label>
                      <input 
                        defaultValue="+91 98765 43210"
                        className="w-full p-3 rounded-xl border border-[#D5CDC2] text-xs focus:border-[#C05638] outline-none"
                        placeholder="+91 Phone"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-[#161922] block mb-1">Street Address / Apartment</label>
                      <input 
                        defaultValue="Flat 402, Starlight Heights, Indiranagar"
                        className="w-full p-3 rounded-xl border border-[#D5CDC2] text-xs focus:border-[#C05638] outline-none"
                        placeholder="House / Apartment / Street"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-[#161922] block mb-1">City & State</label>
                      <input 
                        defaultValue="Bengaluru, Karnataka"
                        className="w-full p-3 rounded-xl border border-[#D5CDC2] text-xs focus:border-[#C05638] outline-none"
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-[#161922] block mb-1">PIN Code</label>
                      <input 
                        defaultValue="560038"
                        className="w-full p-3 rounded-xl border border-[#D5CDC2] text-xs focus:border-[#C05638] outline-none"
                        placeholder="PIN Code"
                      />
                    </div>
                  </div>
                </div>

                {/* Final Order Action */}
                <div className="flex items-center justify-between pt-4 border-t border-[#EBE4DA]">
                  <button
                    onClick={() => setWizardStep(4)}
                    className="px-6 py-3 rounded-full border border-[#D5CDC2] text-xs font-semibold text-[#56647A] hover:bg-white flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Review</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      const basePlanList = productFormat === 'coloring' ? COLORING_PRICING : INITIAL_PRICING;
                      const basePlan = basePlanList.find(p => p.format === selectedPackageFormat) || basePlanList[1];
                      const total = basePlan.price + (arAddonSelected ? 399 : 0);
                      
                      setCheckoutComplete(true);
                      if (onOrderComplete) {
                        onOrderComplete({
                          storyTitle: story.title,
                          childName,
                          characterId: characterAsset.characterId,
                          format: selectedPackageFormat,
                          amount: total,
                          status: 'Payment Received'
                        });
                      }
                    }}
                    className="px-10 py-4 rounded-full bg-[#C05638] hover:bg-[#AC492E] text-white font-semibold text-base shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Place Order & Print Keepsake</span>
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
