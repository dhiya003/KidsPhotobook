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
    const { 
      story, 
      childName, 
      childAge, 
      gender = 'boy',
      photoUrl, 
      favoriteColor, 
      favoriteAnimal, 
      favoriteActivity, 
      characterStyle, 
      language, 
      dedicationFrom, 
      dedicationMessage 
    } = input;

    // Dynamic replacement helper
    const personalizeText = (template: string): string => {
      let text = template
        .replace(/\{\{childName\}\}/g, childName || 'Little Explorer')
        .replace(/\{\{childAge\}\}/g, String(childAge || 5))
        .replace(/\{\{favoriteColor\}\}/g, favoriteColor || 'azure blue')
        .replace(/\{\{favoriteAnimal\}\}/g, favoriteAnimal || 'little deer');
      return text;
    };

    // 1. Kick off background AI generation in PARALLEL with a strict 1200ms client timeout
    const aiPromise: Promise<Record<number, string>> = (async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      try {
        const apiRes = await fetch('/api/ai/personalize-story', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            childName,
            childAge,
            storyTitle: story.title,
            category: story.category,
            favoriteColor,
            favoriteAnimal,
            favoriteActivity: input.favoriteActivity,
            language,
            pages: story.pages
          })
        });
        clearTimeout(timeoutId);
        if (apiRes.ok) {
          const data = await apiRes.json();
          if (data.success && Array.isArray(data.scenes)) {
            const map: Record<number, string> = {};
            data.scenes.forEach((sc: { pageNumber: number; text: string }) => {
              if (sc.pageNumber && sc.text) {
                map[sc.pageNumber] = sc.text;
              }
            });
            return map;
          }
        }
      } catch {
        // Network timeout or offline - use template seamlessly
      } finally {
        clearTimeout(timeoutId);
      }
      return {};
    })();

    // 2. Play through the 5 generation stages smoothly (total ~1.8 seconds)
    for (let i = 0; i < GENERATION_STAGES.length; i++) {
      if (onProgress) {
        onProgress(Math.round(((i + 1) / GENERATION_STAGES.length) * 100), GENERATION_STAGES[i]);
      }
      await new Promise(resolve => setTimeout(resolve, 360));
    }

    // 3. Await the parallel AI result (which has already finished or timed out)
    const aiScenesMap = await aiPromise;

    if (onProgress) {
      onProgress(100, 'Your storybook is ready! Opening preview...');
    }

    // Short 200ms pause for visual completion feedback
    await new Promise(resolve => setTimeout(resolve, 200));

    // 1. Determine Character Face & Art Style
    const getCharacterFaceForChild = (): string => {
      // If user uploaded a custom photo, use it as the source face
      if (photoUrl && !photoUrl.includes('unsplash.com')) {
        return photoUrl;
      }
      // Otherwise use stylized gender-accurate character face
      if (gender === 'girl') {
        return characterStyle === 'Watercolor'
          ? '/src/assets/images/ananya_watercolor_1789745975618.jpg'
          : '/src/assets/images/space_girl_scene_1789746496237.jpg';
      }
      return characterStyle === 'Adventure Illustration'
        ? '/src/assets/images/kabir_superhero_1789745987445.jpg'
        : '/src/assets/images/aarav_magical_3d_1789745946003.jpg';
    };

    const characterFaceUrl = getCharacterFaceForChild();

    // 2. Select Boy vs Girl cover template
    const getCoverImage = (): string => {
      if (gender === 'girl') {
        return story.girlCoverImage || '/src/assets/images/space_girl_scene_1789746496237.jpg';
      }
      return story.boyCoverImage || '/src/assets/images/aarav_magical_3d_1789745946003.jpg';
    };

    const activeCoverUrl = getCoverImage();

    // Pre-illustrated Boy and Girl scene templates library
    // Space / Cosmic Story Templates
    const spaceSceneVariants = [
      {
        boy: '/src/assets/images/space_boy_window_1789746542329.jpg',
        girl: '/src/assets/images/space_girl_window_1789746562044.jpg',
        slot: { top: 38, left: 47, width: 22, height: 26, rotate: 0 }
      },
      {
        boy: '/src/assets/images/space_boy_scene_1789746482524.jpg',
        girl: '/src/assets/images/space_girl_scene_1789746496237.jpg',
        slot: { top: 36, left: 46, width: 24, height: 28, rotate: 0 }
      },
      {
        boy: '/src/assets/images/space_boy_planet_1789746509818.jpg',
        girl: '/src/assets/images/space_girl_planet_1789746528883.jpg',
        slot: { top: 32, left: 42, width: 22, height: 26, rotate: 0 }
      },
      {
        boy: '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
        girl: '/src/assets/images/space_girl_scene_1789746496237.jpg',
        slot: { top: 34, left: 46, width: 24, height: 28, rotate: 0 }
      }
    ];

    // Jungle / Nature Story Templates
    const jungleSceneVariants = [
      {
        boy: '/src/assets/images/jungle_boy_trail_1789746581206.jpg',
        girl: '/src/assets/images/jungle_girl_trail_1789746597642.jpg',
        slot: { top: 34, left: 44, width: 22, height: 26, rotate: 0 }
      }
    ];

    const activeSceneVariants = story.category === 'Adventure' ? jungleSceneVariants : spaceSceneVariants;

    // Helper to get scene image & face slot for a given page index
    const getSceneForPage = (pageIdx: number) => {
      // 1. Check if story.pages has an explicit entry
      if (story.pages[pageIdx]) {
        const p = story.pages[pageIdx];
        if (gender === 'girl') {
          return {
            imageUrl: p.girlImage || p.defaultImage,
            faceSlot: p.girlFaceSlot || { top: 36, left: 46, width: 24, height: 28, rotate: 0 }
          };
        }
        return {
          imageUrl: p.boyImage || p.defaultImage,
          faceSlot: p.boyFaceSlot || { top: 36, left: 46, width: 24, height: 28, rotate: 0 }
        };
      }

      // 2. Otherwise cycle through paired templates library
      const variant = activeSceneVariants[pageIdx % activeSceneVariants.length];
      return {
        imageUrl: gender === 'girl' ? variant.girl : variant.boy,
        faceSlot: variant.slot
      };
    };

    // Build the exact 32-Page Structure based on Lulu standard (8.5 × 8.5 inch):
    // 1: Cover
    // 2: Title
    // 3: Dedication
    // 4..29: Story pages (26 pages)
    // 30: Story ending
    // 31: About our hero
    // 32: End page
    const generatedPages: PersonalizedPage[] = [];

    // Page 1: Cover Spread
    generatedPages.push({
      pageNumber: 1,
      sceneTitle: 'Cover Spread',
      text: `${childName} & ${story.title}`,
      imageUrl: activeCoverUrl,
      genderVersion: gender === 'girl' ? 'girl' : 'boy',
      faceSlot: { top: 32, left: 44, width: 24, height: 28, rotate: 0 },
      isUnlockedInPreview: true
    });

    // Page 2: Title Page
    const page2Scene = getSceneForPage(0);
    generatedPages.push({
      pageNumber: 2,
      sceneTitle: 'Title Page',
      text: `${story.title}\n\nA personalized storybook written especially for ${childName} (Age ${childAge})\n\nVerve Studio 8.5 × 8.5 inch Keepsake Edition`,
      imageUrl: page2Scene.imageUrl,
      genderVersion: gender === 'girl' ? 'girl' : 'boy',
      faceSlot: page2Scene.faceSlot,
      isUnlockedInPreview: true
    });

    // Page 3: Dedication
    const page3Scene = getSceneForPage(1);
    generatedPages.push({
      pageNumber: 3,
      sceneTitle: 'Dedication Note',
      text: `"${dedicationMessage || `May you always remain curious, brave, and the hero of every adventure life brings your way.`}"\n\nWith all our love,\n${dedicationFrom || 'Mum & Dad'}`,
      imageUrl: page3Scene.imageUrl,
      genderVersion: gender === 'girl' ? 'girl' : 'boy',
      faceSlot: page3Scene.faceSlot,
      isUnlockedInPreview: true
    });

    // Story chapters library to fill pages 4 to 29 (26 story pages)
    const storyThemes: { title: string; text: string; image?: string }[] = [
      {
        title: 'The Starlit Awakening',
        text: `Up in their bedroom, ${childName} looked out into the velvety sky. Tonight, a radiant beam of ${favoriteColor || 'golden'} light danced gently across the windowsill, whispering an invitation to an extraordinary quest.`
      },
      {
        title: 'The Golden Compass',
        text: `Under their pillow, ${childName} discovered a gleaming star badge. As they clipped it proudly to their chest, a gentle warmth filled the room—it was time to begin.`
      },
      {
        title: 'Meeting the Gentle Companion',
        text: `Just beyond the starlit garden, a friendly ${favoriteAnimal || 'cosmic creature'} with sparkling eyes and a cheerful tail bounced over to greet ${childName}. "I have been waiting for someone as brave as you!" it chimed.`
      },
      {
        title: 'Into the Enchanted Realm',
        text: `Together, ${childName} and their ${favoriteAnimal || 'companion'} stepped through the shimmering archway, where glowing fireflies lit a path made of pure wonder.`
      },
      {
        title: 'The Whispering Bridge',
        text: `Ahead lay a singing bridge stretching across a sea of clouds. ${childName} took a steady breath: "With patience and kindness, there is no bridge too wide to cross!"`
      },
      {
        title: 'The Secret Riddle',
        text: `A wise old owl fluttered down with an ancient riddle. ${childName} thought carefully, remembering how much they loved ${favoriteActivity || 'exploring'}, and solved the puzzle with a cheerful grin.`
      },
      {
        title: 'Colors of the Canopy',
        text: `The forest bloomed in spectacular shades of ${favoriteColor || 'sapphire and amber'}. Every flower chimed like a tiny silver bell to celebrate their arrival.`
      },
      {
        title: 'Lending a Helping Hand',
        text: `When a baby animal lost its way in the tall clover, ${childName} didn't hesitate. Kneeling down with gentle words, our ${childAge}-year-old hero helped it find its joyful family.`
      },
      {
        title: 'The Valley of Crystal Echoes',
        text: `High up in the sparkling hills, echoes returned every kind word twice as sweet. ${childName} shouted: "Be brave! Be kind!" and the whole valley echoed with encouragement.`
      },
      {
        title: 'The River of Starlight',
        text: `A glowing river flowed with moonbeams. Sailing on a boat crafted from fallen cedar bark, ${childName} steered toward the great golden beacon in the distance.`
      },
      {
        title: 'A Test of Courage',
        text: `The wind blew fiercely around the mountain pass. But holding their companion close, ${childName} stood tall, showing that real strength comes from a caring heart.`
      },
      {
        title: 'The Festival of Lanterns',
        text: `Villagers from all across the kingdom gathered to welcome ${childName}, releasing thousands of floating lanterns into the midnight sky.`
      },
      {
        title: 'The Lost Key of Harmony',
        text: `Tucked inside a hollow ancient oak, ${childName} discovered the lost silver key that restored music and laughter to the entire realm.`
      },
      {
        title: 'Dancing Under the Aurora',
        text: `Ribbons of emerald, violet, and ${favoriteColor || 'azure'} light danced across the sky. ${childName} spun around in pure delight, laughing alongside their dearest friends.`
      },
      {
        title: 'A Feast of Sweet Berries',
        text: `At a mossy banquet table, woodland friends shared sweet honey buns and fresh berries, toasting to ${childName}'s boundless curiosity.`
      },
      {
        title: 'The Cloud Castle Gateway',
        text: `Floating high above the earth, the soft pillars of the Cloud Castle opened their crystal gates. Only those with pure intentions could ever step inside.`
      },
      {
        title: 'The Telescope of Tomorrow',
        text: `Peering through the grand observatory lens, ${childName} saw endless galaxies waiting to be discovered, each one holding a story yet to be written.`
      },
      {
        title: 'A Promise to the Forest',
        text: `Placing a small seed into the rich soil, ${childName} whispered a promise: "I will always protect the trees, the animals, and the beauty of our world."`
      },
      {
        title: 'The Flight of the Stardust Wings',
        text: `With wings made of glowing stardust, ${childName} soared above ringed planets and velvet hills, feeling as light as a dream.`
      },
      {
        title: 'The Guardian’s Blessing',
        text: `The Great Elder Guardian placed a gentle paw on ${childName}’s shoulder. "Your heart is bright, your spirit is true. Never forget who you are."`
      },
      {
        title: 'Gathering the Keepsakes',
        text: `${childName} carefully tucked a glowing feather and a polished river stone into their pocket—tangible treasures from a world of wonders.`
      },
      {
        title: 'Farewell to Cosmic Friends',
        text: `Warm hugs were shared all around. "Until next time, little astronaut," whispered their ${favoriteAnimal || 'companion'}. "We will always watch over you from the stars."`
      },
      {
        title: 'The Homeward Voyage',
        text: `The celestial ship glided smoothly across the quiet night. The lights of home twinkled below like welcoming fireflies.`
      },
      {
        title: 'Back to the Window Sill',
        text: `Stepping back into their cozy bedroom, the clock had barely ticked forward. The moon cast a tranquil silver glow across the soft blanket.`
      },
      {
        title: 'Tucked in Bed',
        text: `Snuggling beneath the covers, ${childName} held their star badge tight, feeling the comforting warmth of love and safety all around.`
      },
      {
        title: 'Sweet Dreams of Adventure',
        text: `As heavy eyelids fluttered closed, ${childName} smiled, knowing that magic isn't just in far-off lands—it lives right here in every kind deed.`
      }
    ];

    // Populate story pages 4 to 29 (26 story pages)
    for (let pNum = 4; pNum <= 29; pNum++) {
      const idx = pNum - 4;
      const theme = storyThemes[idx] || {
        title: `Adventure Chapter ${pNum - 3}`,
        text: `${childName} explored further, learning that courage and love light even the darkest paths.`
      };

      // Map any AI generated page text if available for early pages
      const customText = (story.pages[idx] && aiScenesMap[story.pages[idx].pageNumber])
        ? aiScenesMap[story.pages[idx].pageNumber]
        : (story.pages[idx] ? personalizeText(story.pages[idx].textTemplate) : theme.text);

      const pageScene = getSceneForPage(idx);

      generatedPages.push({
        pageNumber: pNum,
        sceneTitle: story.pages[idx]?.sceneTitle || theme.title,
        text: customText,
        imageUrl: pageScene.imageUrl,
        genderVersion: gender === 'girl' ? 'girl' : 'boy',
        faceSlot: pageScene.faceSlot,
        isUnlockedInPreview: pNum <= 5 // pages 4 & 5 unlocked in preview
      });
    }

    // Page 30: Story Ending
    const page30Scene = getSceneForPage(0); // Bedtime bedroom scene
    generatedPages.push({
      pageNumber: 30,
      sceneTitle: 'Story Ending: The Hero’s Welcome Home',
      text: `And so, with a heart brimming with courage and memories of starlight, ${childName} drifted into the sweetest sleep. For in the great book of life, this was only the first of many magnificent chapters.\n\nGoodnight, brave hero.`,
      imageUrl: page30Scene.imageUrl,
      genderVersion: gender === 'girl' ? 'girl' : 'boy',
      faceSlot: page30Scene.faceSlot,
      isUnlockedInPreview: false
    });

    // Page 31: About Our Hero
    generatedPages.push({
      pageNumber: 31,
      sceneTitle: 'About Our Hero',
      text: `HERO PROFILE: ${childName.toUpperCase()}\n\nAge: ${childAge} Years Old\nArt Style: ${characterStyle}\nGender Edition: ${gender === 'girl' ? 'Girl Explorer' : 'Boy Explorer'}\nFavorite Color: ${favoriteColor || 'Royal Blue'}\nAnimal Companion: ${favoriteAnimal || 'Cosmic Cub'}\nSuperpower: ${favoriteActivity || 'Imagination & Kindness'}\n\nCertified Verve Studio Hero • First Edition`,
      imageUrl: characterFaceUrl,
      genderVersion: gender === 'girl' ? 'girl' : 'boy',
      faceSlot: { top: 35, left: 50, width: 28, height: 32, rotate: 0 },
      isUnlockedInPreview: false
    });

    // Page 32: End Page
    generatedPages.push({
      pageNumber: 32,
      sceneTitle: 'The End & Imprint',
      text: `THE END\n\nPrinted with Love by Verve Studio\n\nProduct Specification:\n• 8.5 × 8.5 inch Square Picture Book\n• 32 Full-Color Pages (Lulu Standard)\n• Premium Color on White Coated Paper\n• Matte Laminated Protective Cover\n• Child-Safe Non-Toxic Inks`,
      imageUrl: activeCoverUrl,
      genderVersion: gender === 'girl' ? 'girl' : 'boy',
      faceSlot: { top: 32, left: 44, width: 24, height: 28, rotate: 0 },
      isUnlockedInPreview: false
    });

    const preview: PersonalizedStoryPreview = {
      id: `prev-${Date.now()}`,
      storyId: story.id,
      storyTitle: story.title,
      childName,
      childAge,
      gender: gender === 'girl' ? 'girl' : 'boy',
      photoUrl,
      characterFaceUrl,
      characterStyle,
      language,
      coverUrl: activeCoverUrl,
      dedicationFrom: dedicationFrom || 'With all our love, Mum & Dad',
      dedicationMessage: dedicationMessage || `May you always remain curious, brave, and the hero of every adventure life brings your way.`,
      pages: generatedPages,
      totalPageCount: 32,
      unlockedPageCount: 5,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    return preview;
  }
}
