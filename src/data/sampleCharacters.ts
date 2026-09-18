import { ChildCharacter } from '../types';

export interface TransformationDemo {
  id: string;
  childName: string;
  age: number;
  storyTheme: string;
  photoUrl: string;
  characterUrl: string;
  quote: string;
  style: string;
}

export const TRANSFORMATION_DEMOS: TransformationDemo[] = [
  {
    id: 'aarav-space',
    childName: 'Aarav',
    age: 5,
    storyTheme: 'The Magical Space Adventure',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80',
    characterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
    quote: '"He carried his space book to bed every single night for three weeks!"',
    style: 'Classic Storybook'
  },
  {
    id: 'ananya-jungle',
    childName: 'Ananya',
    age: 4,
    storyTheme: 'The Secret Jungle Adventure',
    photoUrl: 'https://images.unsplash.com/photo-1595454223600-91fb57cb4841?auto=format&fit=crop&w=700&q=80',
    characterUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=700&q=80',
    quote: '"She couldn’t believe her little curly curls and elephant friend were in an actual book!"',
    style: 'Watercolor'
  },
  {
    id: 'kabir-superhero',
    childName: 'Kabir',
    age: 6,
    storyTheme: 'My Superhero Adventure',
    photoUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=80',
    characterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80',
    quote: '"Seeing his name on the cover gave him the biggest, proudest smile."',
    style: 'Adventure Illustration'
  }
];

export const INITIAL_CHARACTERS: ChildCharacter[] = [
  {
    id: 'char-aarav',
    name: 'Aarav',
    nickname: 'Aaru',
    age: 5,
    gender: 'boy',
    referenceImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80',
    characterIllustrationUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80',
    favoriteColor: 'Royal Blue',
    favoriteAnimal: 'Tiger cub',
    favoriteActivity: 'Building rocket blocks',
    preferredStyle: 'Classic Storybook',
    createdDate: '12 Aug 2026',
    lastUsedDate: '18 Sep 2026',
    storiesCount: 2
  },
  {
    id: 'char-ananya',
    name: 'Ananya',
    nickname: 'Anu',
    age: 4,
    gender: 'girl',
    referenceImageUrl: 'https://images.unsplash.com/photo-1595454223600-91fb57cb4841?auto=format&fit=crop&w=500&q=80',
    characterIllustrationUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=500&q=80',
    favoriteColor: 'Marigold Yellow',
    favoriteAnimal: 'Gentle Elephant',
    favoriteActivity: 'Water painting',
    preferredStyle: 'Watercolor',
    createdDate: '24 Jul 2026',
    lastUsedDate: '02 Sep 2026',
    storiesCount: 1
  }
];
