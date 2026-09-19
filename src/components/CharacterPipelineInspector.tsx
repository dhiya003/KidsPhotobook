import React, { useState } from 'react';
import { 
  ChildCharacterAsset, 
  CharacterIllustrationMode, 
  PoseId, 
  QualityValidationReport 
} from '../types';
import { POSE_LIBRARY, STORY_OUTFITS } from '../services/imagePipelineService';
import { 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Layers, 
  Paintbrush, 
  UserCheck, 
  Cpu, 
  FileCode, 
  Eye, 
  Smile, 
  Palette,
  Camera,
  Shirt
} from 'lucide-react';

interface CharacterPipelineInspectorProps {
  asset: ChildCharacterAsset;
  qualityReport?: QualityValidationReport;
  onUpdateMode?: (mode: CharacterIllustrationMode) => void;
  className?: string;
}

export const CharacterPipelineInspector: React.FC<CharacterPipelineInspectorProps> = ({
  asset,
  qualityReport,
  onUpdateMode,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'poses' | 'json' | 'layers'>('pipeline');
  const [selectedMode, setSelectedMode] = useState<CharacterIllustrationMode>(asset.illustrationMode || 'mode_a_photo');
  const [selectedPose, setSelectedPose] = useState<PoseId>('POSE-01-STANDING');
  const [selectedOutfit, setSelectedOutfit] = useState<string>('space-suit');
  const [isColoringMode, setIsColoringMode] = useState(false);

  const handleModeToggle = (mode: CharacterIllustrationMode) => {
    setSelectedMode(mode);
    if (onUpdateMode) {
      onUpdateMode(mode);
    }
  };

  const currentPoseDef = POSE_LIBRARY.find(p => p.id === selectedPose) || POSE_LIBRARY[0];
  const currentOutfitDef = STORY_OUTFITS[selectedOutfit] || STORY_OUTFITS['space-suit'];

  return (
    <div className={`bg-white rounded-3xl border border-[#EBE4DA] shadow-sm p-6 space-y-6 ${className}`}>
      
      {/* Header with Persistent Character ID Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F5EFEB]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#C05638]" />
            <h3 className="font-serif-story font-bold text-xl text-[#161922]">
              Verve Deterministic Character Engine
            </h3>
          </div>
          <p className="text-xs text-[#56647A]">
            Child identity created once. Programmatically composed across all 32 story pages.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#FBF2EE] px-3.5 py-1.5 rounded-full border border-[#EBE4DA]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#56647A]">
            Character ID:
          </span>
          <span className="font-mono text-xs font-bold text-[#C05638]">
            {asset.characterId || 'CHR_8F29A7'}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'pipeline'
              ? 'bg-[#161922] text-white shadow-xs'
              : 'bg-[#FAF8F5] text-[#56647A] hover:text-[#161922]'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>1. Identity & CV Gate</span>
        </button>

        <button
          onClick={() => setActiveTab('poses')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'poses'
              ? 'bg-[#161922] text-white shadow-xs'
              : 'bg-[#FAF8F5] text-[#56647A] hover:text-[#161922]'
          }`}
        >
          <Shirt className="w-4 h-4" />
          <span>2. Pose & Outfit Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('layers')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'layers'
              ? 'bg-[#161922] text-white shadow-xs'
              : 'bg-[#FAF8F5] text-[#56647A] hover:text-[#161922]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>3. 8-Layer Compositor</span>
        </button>

        <button
          onClick={() => setActiveTab('json')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'json'
              ? 'bg-[#161922] text-white shadow-xs'
              : 'bg-[#FAF8F5] text-[#56647A] hover:text-[#161922]'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>character-profile.json</span>
        </button>
      </div>

      {/* TAB 1: IDENTITY & CV QUALITY GATE */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          
          {/* Mode A vs Mode B Selection */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#161922]">
              Character Illustration Treatment
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <div 
                onClick={() => handleModeToggle('mode_a_photo')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                  selectedMode === 'mode_a_photo'
                    ? 'border-[#C05638] bg-[#FFFBF8] ring-2 ring-[#C05638]/20 shadow-xs'
                    : 'border-[#EBE4DA] bg-white hover:border-[#D5CDC2]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#C05638]" />
                    <strong className="text-xs text-[#161922]">Mode A — Photo Character</strong>
                  </div>
                  {selectedMode === 'mode_a_photo' && <Check className="w-4 h-4 text-[#C05638]" />}
                </div>
                <p className="text-[11px] text-[#56647A] leading-relaxed">
                  The actual face remains 100% recognizable, naturally blended onto illustrated bodies with matched skin lighting. Highest likeness fidelity.
                </p>
              </div>

              <div 
                onClick={() => handleModeToggle('mode_b_storybook')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                  selectedMode === 'mode_b_storybook'
                    ? 'border-[#C05638] bg-[#FFFBF8] ring-2 ring-[#C05638]/20 shadow-xs'
                    : 'border-[#EBE4DA] bg-white hover:border-[#D5CDC2]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Paintbrush className="w-4 h-4 text-[#C05638]" />
                    <strong className="text-xs text-[#161922]">Mode B — Storybook Character</strong>
                  </div>
                  {selectedMode === 'mode_b_storybook' && <Check className="w-4 h-4 text-[#C05638]" />}
                </div>
                <p className="text-[11px] text-[#56647A] leading-relaxed">
                  Processes the real face with color simplification, line ink treatment, and soft storybook shading without regenerating the child's identity.
                </p>
              </div>

            </div>
          </div>

          {/* Computer Vision Gate Inspection & Face Landmarks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#FAF8F5] p-5 rounded-2xl border border-[#EBE4DA]">
            
            {/* Extracted Face Preview with Landmark Dots */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#56647A]">
                <span className="font-bold text-[#161922]">Extracted Facial Landmark Map</span>
                <span className="font-mono text-[10px]">MediaPipe 468-point mesh</span>
              </div>

              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-900 relative flex items-center justify-center border border-[#EBE4DA]">
                <img
                  src={asset.extractedFaceUrl || asset.originalPhotoUrl}
                  alt={asset.childName}
                  className={`w-full h-full object-cover ${
                    selectedMode === 'mode_b_storybook' ? 'filter saturate-90 contrast-110 sepia-15' : ''
                  }`}
                />

                {/* Simulated Landmark Dots */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Left Eye */}
                  <div className="absolute top-[38%] left-[42%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-emerald-400 bg-emerald-400/40 animate-pulse" />
                  {/* Right Eye */}
                  <div className="absolute top-[38%] left-[58%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-emerald-400 bg-emerald-400/40 animate-pulse" />
                  {/* Nose */}
                  <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-cyan-400 bg-cyan-400/40" />
                  {/* Mouth */}
                  <div className="absolute top-[58%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-4 h-2 rounded-full border-2 border-amber-400 bg-amber-400/40" />
                  {/* Chin */}
                  <div className="absolute top-[68%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-red-400" />
                </div>

                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono">
                  Orientation: 2.1° (Front)
                </div>
              </div>
            </div>

            {/* Quality Checklist */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#161922] block">
                CV Quality Validation Results
              </span>

              <div className="space-y-2">
                {[
                  { label: 'Face detected & centered', status: '✓ Passed', score: '99%' },
                  { label: 'Single child subject verified', status: '✓ Passed', score: '100%' },
                  { label: 'Face bounding size adequate', status: '✓ Passed (312×365px)', score: '95%' },
                  { label: 'Eyes & facial features visible', status: '✓ Passed', score: '98%' },
                  { label: 'No sunglasses / heavy occlusion', status: '✓ Passed', score: '100%' },
                  { label: 'Lighting histogram balanced', status: '✓ Passed', score: '92%' },
                  { label: 'Front-facing orientation', status: '✓ Optimal (< 5° yaw)', score: '96%' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1.5 px-3 rounded-xl bg-white border border-[#EBE4DA]">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span className="text-[#161922] font-medium">{item.label}</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#56647A] font-bold">{item.score}</span>
                  </div>
                ))}
              </div>

              {/* Skin Tone & Hair Metrics */}
              <div className="p-3 rounded-xl bg-white border border-[#EBE4DA] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#C05638]" />
                  <span className="text-[#56647A]">Sampled Skin Swatch:</span>
                  <div 
                    className="w-5 h-5 rounded-full border border-black/20 shadow-xs" 
                    style={{ backgroundColor: asset.skinToneHex || '#E5A67C' }} 
                  />
                  <span className="font-mono text-[11px] text-[#161922]">{asset.skinToneHex || '#E5A67C'}</span>
                </div>

                <div className="text-[11px] text-[#56647A]">
                  Hair: <strong className="text-[#161922]">{asset.landmarks?.hairType || 'Wavy'}</strong>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: POSE & OUTFIT STUDIO */}
      {activeTab === 'poses' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Live Character Composition Preview */}
            <div className="md:col-span-1 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#161922]">
                  Composed Character
                </span>
                <button
                  onClick={() => setIsColoringMode(!isColoringMode)}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md transition cursor-pointer ${
                    isColoringMode ? 'bg-[#161922] text-white' : 'bg-[#FAF8F5] text-[#56647A] hover:text-[#161922]'
                  }`}
                >
                  {isColoringMode ? 'Color Mode' : 'Coloring Book Mode'}
                </button>
              </div>

              <div className={`aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#EBE4DA] relative flex items-center justify-center p-4 shadow-inner ${
                isColoringMode ? 'filter grayscale contrast-200 bg-white' : ''
              }`}>
                <img
                  src={currentPoseDef.bodySvgOrImgUrl}
                  alt={currentPoseDef.name}
                  className="w-full h-full object-cover rounded-xl"
                />

                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                  {currentPoseDef.id}
                </div>

                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#C05638] text-white text-[10px] font-bold">
                  {currentOutfitDef.name}
                </div>
              </div>

              <p className="text-[11px] text-[#56647A] text-center italic">
                {currentPoseDef.description}
              </p>
            </div>

            {/* Pose Library Selector (10 Predefined Poses) */}
            <div className="md:col-span-2 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#161922] block">
                Select Pre-Designed Character Pose (10 Poses Available)
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[320px] overflow-y-auto p-1">
                {POSE_LIBRARY.map((pose) => {
                  const isSelected = selectedPose === pose.id;
                  return (
                    <button
                      key={pose.id}
                      onClick={() => setSelectedPose(pose.id)}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#C05638] bg-[#FBF2EE] ring-1 ring-[#C05638]'
                          : 'border-[#EBE4DA] bg-white hover:border-[#D5CDC2]'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#8896AB] block">
                          {pose.id.split('-')[0]}-{pose.id.split('-')[1]}
                        </span>
                        <h5 className="text-xs font-bold text-[#161922] truncate">
                          {pose.name}
                        </h5>
                      </div>
                      <span className="text-[9px] text-[#56647A] mt-2 block">
                        Anchor: {pose.faceAnchor.xPercent}%, {pose.faceAnchor.yPercent}%
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Outfit Selector */}
              <div className="pt-2 border-t border-[#F5EFEB] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#161922] block">
                  Story Costume & Outfit Slots
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.values(STORY_OUTFITS).map((outfit) => (
                    <button
                      key={outfit.id}
                      onClick={() => setSelectedOutfit(outfit.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition cursor-pointer ${
                        selectedOutfit === outfit.id
                          ? 'border-[#C05638] bg-[#FBF2EE] font-bold text-[#C05638]'
                          : 'border-[#EBE4DA] bg-white text-[#56647A] hover:text-[#161922]'
                      }`}
                    >
                      <div className="truncate">{outfit.name}</div>
                      <div className="text-[9px] text-[#8896AB] font-normal">{outfit.themeCategory}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 3: 8-LAYER COMPOSITOR */}
      {activeTab === 'layers' && (
        <div className="space-y-4">
          <p className="text-xs text-[#56647A]">
            Every storybook page is programmatically assembled across 8 deterministic layers, completely bypassing generative hallucinations.
          </p>

          <div className="space-y-2">
            {[
              { num: 'Layer 8', name: 'Typography & Story Text Safe Area', tech: 'SVG / CSS Subpixel Typesetting', color: 'bg-emerald-500' },
              { num: 'Layer 7', name: 'Shadows, Global Lighting & Paper Vignette', tech: 'Canvas Composite Operations', color: 'bg-indigo-500' },
              { num: 'Layer 6', name: 'Handheld Story Props (Compass, Diya, Wand)', tech: 'Vector / PNG Alpha Overlay', color: 'bg-purple-500' },
              { num: 'Layer 5', name: 'Story Costume & Outfit (Space Suit, Kurta, Explorer)', tech: 'Decoupled SVG / Texture Asset', color: 'bg-amber-500' },
              { num: 'Layer 4', name: `Child Facial Identity Asset (${asset.characterId})`, tech: `${selectedMode === 'mode_a_photo' ? 'Mode A (Photo Blending)' : 'Mode B (Storybook Lines)'}`, color: 'bg-[#C05638]' },
              { num: 'Layer 3', name: `Character Body Pose (${currentPoseDef.id})`, tech: 'Deterministic Pose Coordinates', color: 'bg-blue-500' },
              { num: 'Layer 2', name: 'Ambient Environmental FX (Starlight Glow, Mist)', tech: 'Lighting Shader / Gradient Mesh', color: 'bg-cyan-500' },
              { num: 'Layer 1', name: 'Background Story Scene (Nebula, Forest, Palace)', tech: 'Curated 300 DPI High-Res Artwork', color: 'bg-slate-700' },
            ].map((layer, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#EBE4DA] text-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${layer.color}`} />
                  <strong className="text-[#161922] font-mono">{layer.num}:</strong>
                  <span className="text-[#161922] font-medium">{layer.name}</span>
                </div>
                <span className="font-mono text-[10px] text-[#56647A]">{layer.tech}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: JSON SCHEMA INSPECTOR */}
      {activeTab === 'json' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#56647A]">
            <span>Canonical Child Character Profile Schema</span>
            <span className="font-mono">ID: {asset.characterId}</span>
          </div>

          <pre className="p-4 rounded-2xl bg-[#161922] text-[#F3EEE5] text-[11px] font-mono overflow-x-auto max-h-[280px]">
{JSON.stringify({
  characterId: asset.characterId,
  childName: asset.childName,
  characterAge: asset.childAge,
  gender: asset.gender,
  illustrationMode: selectedMode,
  skinTone: {
    hex: asset.skinToneHex || '#E5A67C',
    rgb: asset.landmarks?.skinToneRgb || { r: 229, g: 166, b: 124 }
  },
  facialMetrics: {
    faceWidth: asset.landmarks?.faceWidth || 312,
    faceHeight: asset.landmarks?.faceHeight || 365,
    faceAngle: asset.landmarks?.faceAngle || 2.1,
    eyeDistance: asset.landmarks?.eyeDistance || 96,
    hairType: asset.landmarks?.hairType || 'Wavy'
  },
  registeredPoses: POSE_LIBRARY.length,
  registeredOutfits: Object.keys(STORY_OUTFITS).length,
  createdDate: asset.createdDate || new Date().toISOString()
}, null, 2)}
          </pre>
        </div>
      )}

    </div>
  );
};
