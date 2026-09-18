import { Story, CharacterStyle, StoryLanguage, PersonalizedStoryPreview, PersonalizedPage } from '../types';

export interface GenerationInput {
  story: Story;
  childName: string;
  childAge: number;
  gender: 'boy' | 'girl' | 'neutral';
  photoUrl: string;
  favoriteColor?: string;
  favoriteAnimal?: string;
  favoriteActivity?: string;
  characterStyle: CharacterStyle;
  language: StoryLanguage;
  dedicationFrom?: string;
  dedicationMessage?: string;
}

export const GENERATION_STAGES = [
  'Preparing their character from your reference photo...',
  'Entering the magical story world and styling scenes...',
  'Crafting personalized dialogue and adventures...',
  'Fine-tuning character consistency across pages...',
  'Generating high-resolution print & preview spreads...'
];

export class AIStoryService {
  /**
   * Generates a rich, personalized story preview.
   */
  static async generatePreview(
    input: GenerationInput,
    onProgress?: (progress: number, stage: string) => void
  ): Promise<PersonalizedStoryPreview> {
    const { story, childName, childAge, favoriteColor, favoriteAnimal, characterStyle, language, dedicationFrom, dedicationMessage } = input;

    // Simulate multi-stage generation progress
    for (let i = 0; i < GENERATION_STAGES.length; i++) {
      if (onProgress) {
        onProgress(Math.round(((i + 1) / GENERATION_STAGES.length) * 100), GENERATION_STAGES[i]);
      }
      await new Promise(resolve => setTimeout(resolve, 450));
    }

    // Dynamic replacement helper
    const personalizeText = (template: string): string => {
      let text = template
        .replace(/\{\{childName\}\}/g, childName || 'Little Explorer')
        .replace(/\{\{childAge\}\}/g, String(childAge || 5))
        .replace(/\{\{favoriteColor\}\}/g, favoriteColor || 'azure blue')
        .replace(/\{\{favoriteAnimal\}\}/g, favoriteAnimal || 'little deer');
      return text;
    };

    // Prepare pages
    const generatedPages: PersonalizedPage[] = story.pages.map((p, idx) => ({
      pageNumber: p.pageNumber,
      sceneTitle: p.sceneTitle,
      text: personalizeText(p.textTemplate),
      imageUrl: p.defaultImage,
      isUnlockedInPreview: idx < 4 // first 4 pages unlocked for free preview
    }));

    // Add extra placeholders to reflect full 24-page format
    for (let i = generatedPages.length + 1; i <= story.pageCount; i++) {
      generatedPages.push({
        pageNumber: i,
        sceneTitle: `Chapter Scene ${i}`,
        text: `${childName} continues their unforgettable adventure through wonder, courage, and friendship...`,
        imageUrl: story.coverImage,
        isUnlockedInPreview: false
      });
    }

    const preview: PersonalizedStoryPreview = {
      id: `prev-${Date.now()}`,
      storyId: story.id,
      storyTitle: story.title,
      childName,
      childAge,
      characterStyle,
      language,
      coverUrl: story.coverImage,
      dedicationFrom: dedicationFrom || 'With all our love, Mum & Dad',
      dedicationMessage: dedicationMessage || `May you always remain curious, brave, and the hero of every adventure life brings your way.`,
      pages: generatedPages,
      totalPageCount: story.pageCount,
      unlockedPageCount: 4,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    return preview;
  }
}
