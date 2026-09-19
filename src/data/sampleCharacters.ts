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
    photoUrl: '/src/assets/images/kid_boy_aarav_1789747514421.jpg',
    characterUrl: '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
    quote: '"He carried his space book to bed every single night for three weeks!"',
    style: '3D Magical Animation'
  },
  {
    id: 'ananya-jungle',
    childName: 'Ananya',
    age: 4,
    storyTheme: 'The Secret Jungle Adventure',
    photoUrl: '/src/assets/images/kid_girl_ananya_1789747526723.jpg',
    characterUrl: '/src/assets/images/jungle_girl_trail_1789746597642.jpg',
    quote: '"She couldn’t believe her little curly curls and elephant friend were in an actual book!"',
    style: 'Watercolor'
  },
  {
    id: 'kabir-superhero',
    childName: 'Kabir',
    age: 6,
    storyTheme: 'My Superhero Adventure',
    photoUrl: '/src/assets/images/kid_boy_kabir_1789747544716.jpg',
    characterUrl: '/src/assets/images/kabir_superhero_1789745987445.jpg',
    quote: '"Seeing his name on the cover gave him the biggest, proudest smile."',
    style: 'Adventure Illustration'
  }
];

export const INITIAL_CHARACTERS: ChildCharacter[] = [
  {
    id: 'char-aarav',
    characterReferenceId: 'char_ref_aarav_982',
    name: 'Aarav',
    nickname: 'Aaru',
    age: 5,
    gender: 'boy',
    photoUrl: '/src/assets/images/kid_boy_aarav_1789747514421.jpg',
    canonicalCharacterPortraitUrl: '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
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
    characterReferenceId: 'char_ref_ananya_417',
    name: 'Ananya',
    nickname: 'Anu',
    age: 4,
    gender: 'girl',
    photoUrl: '/src/assets/images/kid_girl_ananya_1789747526723.jpg',
    canonicalCharacterPortraitUrl: '/src/assets/images/jungle_girl_trail_1789746597642.jpg',
    favoriteColor: 'Marigold Yellow',
    favoriteAnimal: 'Gentle Elephant',
    favoriteActivity: 'Water painting',
    preferredStyle: 'Watercolor',
    createdDate: '24 Jul 2026',
    lastUsedDate: '02 Sep 2026',
    storiesCount: 1
  }
];
