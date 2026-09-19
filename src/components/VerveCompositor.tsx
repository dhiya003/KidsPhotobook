import React from 'react';
import { CharacterIllustrationMode, ChildCharacterAsset, PoseId } from '../types';
import { StoryPageSpec } from '../services/imagePipelineService';

export interface SceneCompositionProps {
  pageNumber?: number;
  sceneTitle?: string;
  storyText?: string;
  backgroundUrl?: string;
  childFaceUrl?: string;
  childName?: string;
  gender?: 'boy' | 'girl' | 'neutral';
  characterMode?: CharacterIllustrationMode; // 'mode_a_photo' | 'mode_b_storybook'
  illustrationMode?: CharacterIllustrationMode;
  isColoringMode?: boolean;
  isColoringBook?: boolean;
  poseId?: PoseId;
  anchorOverride?: {
    xPercent: number;
    yPercent: number;
    scale: number;
    rotationDeg: number;
  };
  showHelmetOverlay?: boolean;
  className?: string;
  isThumbnail?: boolean;

  // Convenient single-object spec & asset support
  spec?: StoryPageSpec;
  characterAsset?: ChildCharacterAsset;
}

// Deterministic head anchors for each standard pose
export const POSE_ANCHORS: Record<string, { x: number; y: number; scale: number; rot: number; collarType: 'spacesuit' | 'explorer' | 'open' | 'cozy' }> = {
  'POSE-01-STANDING': { x: 50, y: 22, scale: 1.0, rot: 0, collarType: 'spacesuit' },
  'POSE-02-RUNNING': { x: 52, y: 21, scale: 0.96, rot: 4, collarType: 'spacesuit' },
  'POSE-03-JUMPING': { x: 50, y: 19, scale: 1.02, rot: -3, collarType: 'spacesuit' },
  'POSE-04-SITTING': { x: 50, y: 26, scale: 0.98, rot: 0, collarType: 'cozy' },
  'POSE-05-POINTING': { x: 48, y: 22, scale: 1.0, rot: 5, collarType: 'spacesuit' },
  'POSE-06-READING': { x: 50, y: 24, scale: 0.96, rot: -4, collarType: 'explorer' },
  'POSE-07-SLEEPING': { x: 54, y: 32, scale: 0.92, rot: 12, collarType: 'cozy' },
  'POSE-08-HOLDING-OBJECT': { x: 50, y: 23, scale: 1.0, rot: 0, collarType: 'spacesuit' },
  'POSE-09-LOOKING-UPWARD': { x: 51, y: 20, scale: 1.04, rot: -7, collarType: 'spacesuit' },
  'POSE-10-CELEBRATING': { x: 50, y: 20, scale: 1.02, rot: 0, collarType: 'spacesuit' }
};

// Precise anchor offsets based on page number to match each specific scene artwork layout
export const PAGE_SCENE_ANCHORS: Record<number, { x: number; y: number; scale: number; rot: number; helmet: boolean }> = {
  1: { x: 38, y: 44, scale: 0.88, rot: -4, helmet: false }, // Bedroom window
  2: { x: 42, y: 40, scale: 0.92, rot: -6, helmet: false }, // Telescope attic
  3: { x: 48, y: 38, scale: 1.05, rot: 2, helmet: true },  // Spaceship launchpad
  4: { x: 52, y: 36, scale: 0.98, rot: 3, helmet: true },  // Cockpit controls
  5: { x: 45, y: 42, scale: 1.02, rot: -4, helmet: true },  // Nebula cloud
  6: { x: 50, y: 40, scale: 0.95, rot: 0, helmet: true },  // Crystal valley
  7: { x: 44, y: 45, scale: 0.90, rot: 4, helmet: true },  // Stardust fox
  8: { x: 50, y: 38, scale: 0.96, rot: -3, helmet: false }, // Star map
  9: { x: 46, y: 42, scale: 0.94, rot: 5, helmet: true },  // Asteroid garden
  10: { x: 52, y: 36, scale: 1.00, rot: -2, helmet: true }, // Solar wind
  11: { x: 50, y: 40, scale: 0.95, rot: 0, helmet: true }, // Star gate
  12: { x: 48, y: 42, scale: 0.96, rot: 2, helmet: true }, // Star lantern
  13: { x: 54, y: 38, scale: 0.98, rot: -4, helmet: true }, // Milky trail
  14: { x: 46, y: 44, scale: 0.92, rot: 0, helmet: false }, // Cloud train
  15: { x: 50, y: 40, scale: 0.96, rot: 3, helmet: true }, // Saturn rings
  16: { x: 48, y: 38, scale: 0.94, rot: -5, helmet: false }, // Starlight library
  17: { x: 52, y: 36, scale: 1.02, rot: 4, helmet: true }, // Flare rainbow
  18: { x: 45, y: 42, scale: 0.95, rot: 0, helmet: true }, // Moon robots
  19: { x: 40, y: 46, scale: 0.90, rot: -3, helmet: false }, // Nebula lagoon
  20: { x: 50, y: 38, scale: 0.98, rot: 2, helmet: true }, // Beacon tower
  21: { x: 48, y: 36, scale: 1.04, rot: 0, helmet: true }, // Supernova celebration
  22: { x: 46, y: 44, scale: 0.92, rot: -2, helmet: true }, // Cosmic picnic
  23: { x: 50, y: 38, scale: 1.00, rot: 5, helmet: true }, // Gravity swing
  24: { x: 52, y: 40, scale: 0.96, rot: -3, helmet: true }, // Missing star
  25: { x: 48, y: 36, scale: 1.02, rot: 0, helmet: true }, // Standing ovation
  26: { x: 50, y: 40, scale: 0.95, rot: 0, helmet: false }, // Golden medal
  27: { x: 46, y: 42, scale: 0.94, rot: -4, helmet: true }, // Cruiser journey home
  28: { x: 42, y: 44, scale: 0.90, rot: -6, helmet: false }, // Earth atmosphere
  29: { x: 50, y: 40, scale: 0.96, rot: 2, helmet: false }, // Backyard touchdown
  30: { x: 44, y: 46, scale: 0.92, rot: 0, helmet: false }, // Cup of cocoa
  31: { x: 52, y: 48, scale: 0.88, rot: 10, helmet: false }, // Tucked into bed
  32: { x: 50, y: 38, scale: 1.00, rot: 0, helmet: false }  // Forever hero
};

export const VerveCompositor: React.FC<SceneCompositionProps> = ({
  pageNumber: propPageNumber,
  sceneTitle: propSceneTitle,
  storyText: propStoryText,
  backgroundUrl: propBgUrl,
  childFaceUrl: propFaceUrl,
  childName: propChildName,
  gender: propGender,
  characterMode: propCharMode,
  illustrationMode,
  isColoringMode: propColoringMode,
  isColoringBook,
  poseId: propPoseId,
  anchorOverride,
  showHelmetOverlay,
  className = '',
  isThumbnail = false,
  spec,
  characterAsset
}) => {
  // Resolve unified properties from spec & characterAsset or direct props
  const pageNumber = spec?.pageNumber ?? propPageNumber ?? 1;
  const sceneTitle = spec?.sceneTitle ?? propSceneTitle ?? `Scene ${pageNumber}`;
  const storyText = spec?.narrativeText ?? propStoryText;
  const backgroundUrl = spec?.backgroundUrl ?? propBgUrl ?? 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop';
  const childFaceUrl = characterAsset?.extractedFaceUrl || characterAsset?.originalPhotoUrl || propFaceUrl || 'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=400&auto=format&fit=crop';
  const childName = characterAsset?.childName ?? propChildName ?? 'Hero';
  const gender = characterAsset?.gender ?? propGender ?? 'boy';
  const characterMode = illustrationMode || characterAsset?.illustrationMode || propCharMode || 'mode_b_storybook';
  const isColoring = isColoringBook ?? propColoringMode ?? false;
  const poseId = spec?.poseId ?? propPoseId ?? 'POSE-01-STANDING';

  // Determine anchor placement
  const pageAnchor = PAGE_SCENE_ANCHORS[pageNumber] || { x: 50, y: 40, scale: 1.0, rot: 0, helmet: true };
  const poseAnchor = POSE_ANCHORS[poseId] || POSE_ANCHORS['POSE-01-STANDING'];

  const finalX = anchorOverride?.xPercent ?? spec?.anchor?.x ?? pageAnchor.x ?? poseAnchor.x;
  const finalY = anchorOverride?.yPercent ?? spec?.anchor?.y ?? pageAnchor.y ?? poseAnchor.y;
  const finalScale = anchorOverride?.scale ?? spec?.anchor?.scale ?? pageAnchor.scale ?? poseAnchor.scale;
  const finalRot = anchorOverride?.rotationDeg ?? spec?.anchor?.rot ?? pageAnchor.rot ?? poseAnchor.rot;
  const needsHelmet = showHelmetOverlay !== undefined ? showHelmetOverlay : (spec?.helmet ?? pageAnchor.helmet);

  // Mode filters
  // Mode A: High photo likeness with warm lighting
  // Mode B: Storybook artist treatment with soft posterization, ink edge, and palette harmonization
  const getFaceFilter = () => {
    if (isColoring) {
      return 'grayscale(100%) contrast(260%) brightness(125%)';
    }
    if (characterMode === 'mode_a_photo') {
      return 'contrast(106%) saturate(110%) brightness(102%)';
    }
    // Mode B: Storybook Character (Default)
    return 'contrast(125%) saturate(120%) brightness(104%) sepia(8%)';
  };

  const getSceneFilter = () => {
    if (isColoring) {
      return 'grayscale(100%) contrast(230%) brightness(115%)';
    }
    return 'none';
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-[#0D1322] ${className}`}
      style={{ aspectRatio: '4/3' }}
    >
      {/* 1. LAYER 1: Master Background Scene Artwork */}
      <img
        src={backgroundUrl}
        alt={sceneTitle}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-300"
        style={{ filter: getSceneFilter() }}
      />

      {/* 2. LAYER 2: Subtle Ambient Lighting / Star Glow Overlay */}
      {!isColoringMode && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(255,230,180,0.3) 0%, rgba(100,50,200,0.1) 60%, transparent 100%)'
          }}
        />
      )}

      {/* 3. LAYER 3: The Consistent Child Face Asset (Composited on Head Anchor) */}
      <div
        className="absolute pointer-events-none transition-transform duration-200 ease-out"
        style={{
          left: `${finalX}%`,
          top: `${finalY}%`,
          width: isThumbnail ? '28%' : '26%',
          transform: `translate(-50%, -50%) scale(${finalScale}) rotate(${finalRot}deg)`,
          transformOrigin: 'center center',
          zIndex: 10
        }}
      >
        {/* Face Container with Organic Feathered Mask & Blending */}
        <div className="relative w-full aspect-square flex items-center justify-center">
          
          {/* Real Extracted Child Face */}
          <div
            className="w-full h-full rounded-full overflow-hidden shadow-lg border-2 border-amber-300/40"
            style={{
              clipPath: 'ellipse(46% 52% at 50% 48%)',
              boxShadow: isColoringMode ? 'none' : '0 4px 14px rgba(0,0,0,0.3)'
            }}
          >
            <img
              src={childFaceUrl}
              alt={`${childName}'s character face`}
              className="w-full h-full object-cover scale-110 object-top pointer-events-none"
              style={{
                filter: getFaceFilter(),
              }}
            />
          </div>

          {/* Mode B Storybook Fine-line Outline & Cheek Highlight */}
          {characterMode === 'mode_b_storybook' && !isColoringMode && (
            <div 
              className="absolute inset-0 rounded-full pointer-events-none border border-amber-500/30 opacity-70"
              style={{ clipPath: 'ellipse(46% 52% at 50% 48%)' }}
            />
          )}

          {/* Space Helmet Visor Glass & Collar Ring (Over Face) */}
          {needsHelmet && !isColoringMode && (
            <div className="absolute -inset-2 rounded-full border-2 border-cyan-300/50 pointer-events-none ring-1 ring-white/40 shadow-inner">
              <div className="absolute top-1 left-3 w-4 h-2 rounded-full bg-white/60 blur-[1px] rotate-[-20deg]" />
            </div>
          )}

          {/* Space Helmet Visor in Coloring Mode */}
          {needsHelmet && isColoringMode && (
            <div className="absolute -inset-2 rounded-full border-2 border-black pointer-events-none" />
          )}

        </div>
      </div>

      {/* 4. LAYER 4: Space Suit / Explorer Collar Overlay (Under Chin to blend seamlessly) */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${finalX}%`,
          top: `${finalY + 11 * finalScale}%`,
          width: isThumbnail ? '24%' : '22%',
          transform: `translate(-50%, -50%) scale(${finalScale})`,
          zIndex: 12
        }}
      >
        {needsHelmet && (
          <div className="w-full h-3 rounded-full bg-gradient-to-r from-slate-200 via-white to-slate-300 border border-slate-400/80 shadow-md flex items-center justify-center">
            <div className="w-2 h-1 rounded-full bg-cyan-500/80" />
          </div>
        )}
      </div>

      {/* 5. Top Left Page / Scene Indicator Tag */}
      {!isThumbnail && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2 pointer-events-none">
          <div className="bg-black/70 backdrop-blur-md text-white text-[11px] font-mono font-bold px-3 py-1 rounded-lg border border-white/15 shadow-md flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C05638] animate-pulse" />
            <span>Page {pageNumber}</span>
            <span className="opacity-50">•</span>
            <span className="text-amber-300 truncate max-w-[160px]">{sceneTitle}</span>
          </div>
        </div>
      )}

      {/* Child Identity Anchor Badge */}
      {!isThumbnail && (
        <div className="absolute top-3 right-3 z-20 pointer-events-none">
          <div className="bg-[#161922]/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-lg border border-white/10 shadow-xs flex items-center gap-1">
            <span className="text-amber-400 font-bold">{childName}</span>
            <span className="text-white/60">({characterMode === 'mode_a_photo' ? 'Photo' : 'Storybook'})</span>
          </div>
        </div>
      )}

      {/* Story Text Overlay on Bottom for Full Screen Viewer */}
      {storyText && !isThumbnail && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white z-20">
          <p className="text-xs sm:text-sm md:text-base font-serif-story leading-relaxed drop-shadow-md max-w-2xl mx-auto text-center italic">
            "{storyText}"
          </p>
        </div>
      )}

      {/* Coloring Book Line-Art Canvas Overlay indicator */}
      {isColoringMode && !isThumbnail && (
        <div className="absolute bottom-3 right-3 z-20 bg-white/90 border border-black/20 text-black text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs pointer-events-none">
          🎨 Coloring Book Line Art
        </div>
      )}
    </div>
  );
};
