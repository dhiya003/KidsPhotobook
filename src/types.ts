export type AgeRange = '2–4' | '4–6' | '6–8' | '8–10';

export type StoryPurposeCategory = 
  | 'Adventure & Exploration'
  | 'Learning & Curiosity'
  | 'Indian Culture & Heritage'
  | 'Festival & Celebration'
  | 'Value & Kindness'
  | 'Bedtime & Calming'
  | 'Birthday & Milestone'
  | 'Spiritual & Mythology'
  | 'Animals & Nature'
  | 'Adventure' 
  | 'Learning' 
  | 'Indian Culture' 
  | 'Festivals' 
  | 'Values & Life Skills' 
  | 'Bedtime' 
  | 'Birthday' 
  | 'Spiritual';

// Alias for backwards compatibility
export type StoryCategory = StoryPurposeCategory | 'Space' | 'Fantasy' | 'Animals' | 'Confidence' | 'Family' | 'Imagination' | 'India';

export type StoryOccasion = 
  | 'Birthday' 
  | 'Festivals' 
  | 'New Baby' 
  | 'Milestones' 
  | 'Sibling' 
  | 'Grandparents' 
  | 'Return Gifts' 
  | 'Just Because';

export type StoryLanguage = 
  | 'English' 
  | 'Hindi' 
  | 'Tamil' 
  | 'Telugu' 
  | 'Malayalam' 
  | 'Kannada' 
  | 'Marathi' 
  | 'Bengali';

export type BookFormat = 
  | 'digital' 
  | 'paperback' 
  | 'hardcover' 
  | 'premium-hardcover' 
  | 'interactive-ar' 
  | 'bundle-2' 
  | 'bundle-3'
  | 'bundle-complete'
  | 'digital-coloring'
  | 'hardcover-coloring'
  | 'storybook-plus-coloring'
  | 'storybook-plus-video';

export type BookSizeOption = '8x8' | '8.5x8.5' | 'A5';

export type CharacterStyle = 
  | 'Classic Storybook' 
  | '3D Magical' 
  | 'Watercolor' 
  | 'Soft Cartoon' 
  | 'Adventure Illustration';

/**
 * Character Rendering Mode (Mode A vs Mode B)
 * Mode A: Real photo face preserved on illustrated body
 * Mode B: Deterministic color simplification, line treatment & storybook shading
 */
export type CharacterIllustrationMode = 'mode_a_photo' | 'mode_b_storybook';

/**
 * Multi-photo upload classification
 */
export interface UploadedChildPhoto {
  id: string;
  url: string;
  type: 'front_facing' | 'slightly_turned' | 'full_body' | 'unclassified';
  label: string;
  isPrimary: boolean;
  score: number;
}

/**
 * Automated Image Quality Check Metrics
 */
export interface QualityValidationReport {
  hasFace: boolean;
  isSingleFace: boolean;
  faceSizeScore: number; // 0-100
  sharpnessScore: number; // 0-100
  eyesVisible: boolean;
  noSunglasses: boolean;
  lightingScore: number; // 0-100
  isFrontFacing: boolean;
  overallPassed: boolean;
  warningMessage?: string;
  detectedLandmarks?: FacialLandmarks;
}

/**
 * Facial Landmarks identified by CV pipeline
 */
export interface FacialLandmarks {
  forehead: { x: number; y: number };
  leftEye: { x: number; y: number };
  rightEye: { x: number; y: number };
  noseTip: { x: number; y: number };
  mouthCenter: { x: number; y: number };
  chin: { x: number; y: number };
  leftJaw: { x: number; y: number };
  rightJaw: { x: number; y: number };
  faceWidth: number;
  faceHeight: number;
  faceAngle: number;
  eyeDistance: number;
  skinToneHex: string;
  skinToneRgb: { r: number; g: number; b: number };
  hairType: 'Straight' | 'Wavy' | 'Curly' | 'Coily' | 'Short' | 'Medium' | 'Long';
}

/**
 * Persistent Character Identity Asset Layer
 */
export interface ChildCharacterAsset {
  characterId: string; // e.g. "CHR_8F29A7"
  childName: string;
  childAge: number;
  gender: 'boy' | 'girl' | 'neutral';
  originalPhotoUrl: string;
  extractedFaceUrl: string;
  extractedFaceMaskUrl?: string;
  extractedHairUrl?: string;
  illustrationMode: CharacterIllustrationMode;
  landmarks: FacialLandmarks;
  skinToneHex: string;
  createdDate: string;
}

/**
 * Pose Definition in the Character Pose Library
 */
export type PoseId = 
  | 'POSE-01-STANDING'
  | 'POSE-02-RUNNING'
  | 'POSE-03-JUMPING'
  | 'POSE-04-SITTING'
  | 'POSE-05-POINTING'
  | 'POSE-06-READING'
  | 'POSE-07-SLEEPING'
  | 'POSE-08-HOLDING-OBJECT'
  | 'POSE-09-LOOKING-UPWARD'
  | 'POSE-10-CELEBRATING';

export interface PoseDefinition {
  id: PoseId;
  name: string;
  description: string;
  faceAnchor: {
    xPercent: number; // 0-100
    yPercent: number; // 0-100
    scale: number;
    rotationDeg: number;
  };
  genderVariant: 'boy' | 'girl' | 'neutral';
  bodySvgOrImgUrl: string;
}

/**
 * Story Outfit by Theme
 */
export interface StoryOutfit {
  id: string;
  name: string;
  themeCategory: StoryPurposeCategory;
  svgOrImgUrl: string;
  props: string[];
}

/**
 * Layered Page Composition Architecture
 */
export interface LayeredStoryPageComposition {
  pageNumber: number;
  layer1_backgroundUrl: string;
  layer2_ambientLighting: string;
  layer3_poseId: PoseId;
  layer4_characterId: string;
  layer4_illustrationMode: CharacterIllustrationMode;
  layer5_outfitId: string;
  layer6_props: string[];
  layer7_vignetteShadow: boolean;
  layer8_text: string;
  isColoringBookMode?: boolean;
}

export interface FaceSlot {
  top: number;
  left: number;
  width: number;
  height: number;
  rotate?: number;
  borderRadius?: string;
  scale?: number;
}

export interface StoryPageTemplate {
  pageNumber: number;
  sceneTitle: string;
  textTemplate: string;
  defaultImage: string;
  boyImage?: string;
  girlImage?: string;
  boyFaceSlot?: FaceSlot;
  girlFaceSlot?: FaceSlot;
  moralFocus?: string;
  arSceneDescription?: string;
  arAudioNarration?: string;
  arInteractiveTapEffect?: string;
  poseId?: PoseId;
  outfitId?: string;
}

export type BookPage = StoryPageTemplate;

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  boyCoverImage?: string;
  girlCoverImage?: string;
  ageRange: AgeRange;
  category: StoryCategory;
  purposeCategory: StoryPurposeCategory;
  occasions: StoryOccasion[];
  pageCount: number;
  languages: StoryLanguage[];
  formats: BookFormat[];
  benefits: string[];
  moralObjective: string;
  featured?: boolean;
  isCustomStory?: boolean;
  customPrompt?: string;
  pages: StoryPageTemplate[];
}

/**
 * Persistent Child Character Profile with canonical identity & expanded optional attributes
 */
export interface ChildCharacterProfile {
  id: string;
  characterReferenceId: string; // e.g. 'CHR_8F29A7'
  name: string;
  nickname?: string;
  age: number;
  gender: 'boy' | 'girl' | 'neutral';
  photoUrl: string;
  canonicalCharacterPortraitUrl: string;
  preferredStyle: CharacterStyle;
  illustrationMode?: CharacterIllustrationMode;
  asset?: ChildCharacterAsset;
  
  // Expanded optional profile fields
  interests?: string[];
  favoriteActivity?: string;
  favoriteColor?: string;
  personality?: string;
  favoriteAnimal?: string;
  dreamCareer?: string;
  specialPerson?: string;
  language?: StoryLanguage;

  createdDate: string;
  lastUsedDate: string;
  storiesCount: number;
}

// Backward compatibility alias
export type ChildCharacter = ChildCharacterProfile;

export interface QualityCheckItem {
  id: string;
  label: string;
  status: 'passed' | 'review_required' | 'checking';
  score: number; // 0-100
  details: string;
}

export interface QualityCheckReport {
  overallScore: number;
  automatedPassed: boolean;
  checks: QualityCheckItem[];
  humanReviewStatus: 'Queued for Editorial Check' | 'Passed Editorial Review' | 'Not Required (Digital)';
  timestamp: string;
}

export interface ChangeRequest {
  id: string;
  pageNumber: number;
  category: 'face_likeness' | 'text_wording' | 'character_outfit' | 'scene_details' | 'dedication';
  description: string;
  status: 'submitted' | 'in_review' | 'applied';
  submittedAt: string;
  resolutionNote?: string;
}

export interface PersonalizedPage {
  pageNumber: number;
  sceneTitle: string;
  text: string;
  imageUrl: string;
  genderVersion?: 'boy' | 'girl';
  faceSlot?: FaceSlot;
  isUnlockedInPreview: boolean;
  pageQrCode?: string;
  arSceneDescription?: string;
  arAudioNarration?: string;
  arInteractiveTapEffect?: string;
  composition?: LayeredStoryPageComposition;
  coloringBookImageUrl?: string;
}

export interface PersonalizedStoryPreview {
  id: string;
  storyId: string;
  storyTitle: string;
  childProfile: ChildCharacterProfile;
  characterAsset?: ChildCharacterAsset;
  childName: string;
  childAge: number;
  gender: 'boy' | 'girl' | 'neutral';
  characterStyle: CharacterStyle;
  illustrationMode: CharacterIllustrationMode;
  language: StoryLanguage;
  occasion?: StoryOccasion;
  photoUrl?: string;
  characterFaceUrl?: string;
  coverUrl: string;
  dedicationFrom: string;
  dedicationMessage: string;
  pages: PersonalizedPage[];
  totalPageCount: number;
  unlockedPageCount: number;
  isCustomStory?: boolean;
  customStoryIdea?: string;
  selectedSize?: BookSizeOption;
  qualityReport?: QualityCheckReport;
  approvalStatus?: 'pending_review' | 'changes_requested' | 'approved_for_print';
  changeRequests?: ChangeRequest[];
  createdAt: string;
}

export interface Order {
  id: string;
  previewId?: string;
  storyTitle: string;
  childName: string;
  characterId?: string;
  customerName?: string;
  email?: string;
  phone?: string;
  coverUrl?: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  format: BookFormat;
  packageTitle?: string;
  selectedSize?: BookSizeOption;
  language: StoryLanguage;
  amount: number;
  quantity?: number;
  includesEbook?: boolean;
  status: 'Payment Received' | 'Quality Review' | 'Queued for Print' | 'Printed' | 'Shipped' | 'Delivered' | 'Ready for Download' | 'In Production';
  trackingNumber?: string;
  createdAt: string;
  pdfDownloadUrl?: string;
}

export interface BookSpecification {
  dimension: string;
  sizeOption: BookSizeOption;
  pageCount: number;
  interior: string;
  paperType: string;
  coverFinish: string;
  binding: string;
  podEstimatedCostInr?: number;
}

export interface PricingPlan {
  format: BookFormat;
  title: string;
  subtitle?: string;
  badge?: string;
  price: number;
  originalPrice: number;
  bundleQuantity: number;
  includesEbook: boolean;
  description: string;
  features: string[];
  specifications?: BookSpecification;
  popular?: boolean;
}

export interface GenerationJob {
  id: string;
  childName: string;
  storyTitle: string;
  style: CharacterStyle;
  progress: number;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  currentStage: string;
  createdAt: string;
}
