export type AgeRange = '2–4' | '4–6' | '6–8' | '8–10';

export type StoryCategory = 
  | 'Adventure' 
  | 'Learning' 
  | 'Animals' 
  | 'Space' 
  | 'Fantasy' 
  | 'Birthday' 
  | 'India' 
  | 'Friendship' 
  | 'Confidence' 
  | 'Family' 
  | 'Imagination';

export type StoryLanguage = 
  | 'English' 
  | 'Hindi' 
  | 'Tamil' 
  | 'Telugu' 
  | 'Malayalam' 
  | 'Kannada' 
  | 'Marathi' 
  | 'Bengali';

export type BookFormat = 'digital' | 'paperback' | 'hardcover';

export type CharacterStyle = 
  | 'Classic Storybook' 
  | '3D Magical' 
  | 'Watercolor' 
  | 'Soft Cartoon' 
  | 'Adventure Illustration';

export interface StoryPageTemplate {
  pageNumber: number;
  sceneTitle: string;
  textTemplate: string; // contains {{childName}}, {{favoriteAnimal}}, etc.
  defaultImage: string;
  moralFocus?: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  ageRange: AgeRange;
  category: StoryCategory;
  pageCount: number;
  languages: StoryLanguage[];
  formats: BookFormat[];
  benefits: string[];
  moralObjective: string;
  featured?: boolean;
  pages: StoryPageTemplate[];
}

export interface ChildCharacter {
  id: string;
  name: string;
  nickname?: string;
  age: number;
  gender: 'boy' | 'girl' | 'neutral';
  referenceImageUrl: string;
  characterIllustrationUrl: string;
  favoriteColor: string;
  favoriteAnimal: string;
  favoriteActivity: string;
  preferredStyle: CharacterStyle;
  createdDate: string;
  lastUsedDate: string;
  storiesCount: number;
}

export interface PersonalizedPage {
  pageNumber: number;
  sceneTitle: string;
  text: string;
  imageUrl: string;
  isUnlockedInPreview: boolean;
}

export interface PersonalizedStoryPreview {
  id: string;
  storyId: string;
  storyTitle: string;
  childName: string;
  childAge: number;
  characterStyle: CharacterStyle;
  language: StoryLanguage;
  coverUrl: string;
  dedicationFrom: string;
  dedicationMessage: string;
  pages: PersonalizedPage[];
  totalPageCount: number;
  unlockedPageCount: number;
  createdAt: string;
}

export interface Order {
  id: string;
  previewId: string;
  storyTitle: string;
  childName: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  format: BookFormat;
  language: StoryLanguage;
  amount: number;
  status: 'Payment Received' | 'Queued for Print' | 'Printed' | 'Shipped' | 'Delivered' | 'Ready for Download';
  trackingNumber?: string;
  createdAt: string;
  pdfDownloadUrl?: string;
}

export interface PricingPlan {
  format: BookFormat;
  title: string;
  badge?: string;
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
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
