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
    characterUrl: '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
    quote: '"He carried his space book to bed every single night for three weeks!"',
    style: '3D Magical Animation'
  },
  {
    id: 'ananya-jungle',
    childName: 'Ananya',
    age: 4,
    storyTheme: 'The Secret Jungle Adventure',
    photoUrl: 'https://images.unsplash.com/photo-1595454223600-91fb57cb4841?auto=format&fit=crop&w=700&q=80',
    characterUrl: '/src/assets/images/ananya_watercolor_1789745975618.jpg',
    quote: '"She couldn’t believe her little curly curls and elephant friend were in an actual book!"',
    style: 'Watercolor'
  },
  {
    id: 'kabir-superhero',
    childName: 'Kabir',
    age: 6,
    storyTheme: 'My Superhero Adventure',
    photoUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=80',
    characterUrl: '/src/assets/images/kabir_superhero_1789745987445.jpg',
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
    characterIllustrationUrl: '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
    favoriteColor: 'Royal Blue',
    favoriteAnimal: 'Tiger cub',
    favoriteActivity: 'Building rocket blocks',
    preferredStyle: '3D Magical',
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
    characterIllustrationUrl: '/src/assets/images/ananya_watercolor_1789745975618.jpg',
    favoriteColor: 'Marigold Yellow',
    favoriteAnimal: 'Gentle Elephant',
    favoriteActivity: 'Water painting',
    preferredStyle: 'Watercolor',
    createdDate: '24 Jul 2026',
    lastUsedDate: '02 Sep 2026',
    storiesCount: 1
  }
];
