import { Story } from '../types';

export const STORIES: Story[] = [
  {
    id: 'magical-space-adventure',
    slug: 'the-magical-space-adventure',
    title: 'The Magical Space Adventure',
    subtitle: 'Your little astronaut is about to discover the universe.',
    description: 'When night falls, a constellation whispers your child’s name. Together with their favorite cosmic creature, they embark on a voyage across glittering asteroid belts, ringed planets, and swirling nebulas.',
    coverImage: '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
    boyCoverImage: '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
    girlCoverImage: '/src/assets/images/space_girl_scene_1789746496237.jpg',
    ageRange: '4–6',
    category: 'Space',
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali'],
    formats: ['digital', 'paperback', 'hardcover'],
    benefits: [
      'Encourages scientific curiosity and fascination with the night sky',
      'Teaches gentle courage when venturing into the unknown',
      'Reinforces problem-solving alongside friendly cosmic companions'
    ],
    moralObjective: 'Curiosity, Courage, and Kindness across the Stars',
    featured: true,
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'The Starlit Bedroom',
        textTemplate: 'Up in their bedroom, {{childName}} stared out of the window into the deep velvety sky. Tonight, the North Star sparkled with an unusual golden shimmer.',
        defaultImage: '/src/assets/images/space_boy_window_1789746542329.jpg',
        boyImage: '/src/assets/images/space_boy_window_1789746542329.jpg',
        girlImage: '/src/assets/images/space_girl_window_1789746562044.jpg',
        boyFaceSlot: { top: 38, left: 47, width: 22, height: 26, rotate: 0 },
        girlFaceSlot: { top: 38, left: 47, width: 22, height: 26, rotate: 0 },
        moralFocus: 'Imagination'
      },
      {
        pageNumber: 2,
        sceneTitle: 'The Golden Compass',
        textTemplate: 'Under their pillow, {{childName}} discovered a shining silver astronaut badge marked with their favorite color, {{favoriteColor}}. A soft chime sounded—the Starcruiser was waiting!',
        defaultImage: '/src/assets/images/space_boy_scene_1789746482524.jpg',
        boyImage: '/src/assets/images/space_boy_scene_1789746482524.jpg',
        girlImage: '/src/assets/images/space_girl_scene_1789746496237.jpg',
        boyFaceSlot: { top: 36, left: 46, width: 24, height: 28, rotate: 0 },
        girlFaceSlot: { top: 36, left: 46, width: 24, height: 28, rotate: 0 },
        moralFocus: 'Adventure Begins'
      },
      {
        pageNumber: 3,
        sceneTitle: 'Meeting the Cosmic Companion',
        textTemplate: 'Floating through the rings of Saturn, {{childName}} heard a cheerful chirp. It was a friendly celestial {{favoriteAnimal}} made of stardust who nodded warmly as if they had been lifelong friends.',
        defaultImage: '/src/assets/images/space_boy_planet_1789746509818.jpg',
        boyImage: '/src/assets/images/space_boy_planet_1789746509818.jpg',
        girlImage: '/src/assets/images/space_girl_planet_1789746528883.jpg',
        boyFaceSlot: { top: 32, left: 42, width: 22, height: 26, rotate: 0 },
        girlFaceSlot: { top: 32, left: 42, width: 22, height: 26, rotate: 0 },
        moralFocus: 'Friendship'
      },
      {
        pageNumber: 4,
        sceneTitle: 'The Whispering Moon Crater',
        textTemplate: 'Together, {{childName}} and their starlight friend hopped over craters of powdered moon-sugar, leaving glowing footprints that read: "Always Keep Wondering."',
        defaultImage: '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
        boyImage: '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
        girlImage: '/src/assets/images/space_girl_scene_1789746496237.jpg',
        boyFaceSlot: { top: 34, left: 46, width: 24, height: 28, rotate: 0 },
        girlFaceSlot: { top: 36, left: 46, width: 24, height: 28, rotate: 0 },
        moralFocus: 'Discovery'
      },
      {
        pageNumber: 5,
        sceneTitle: 'Home Before Morning Glow',
        textTemplate: 'Gently steering the ship back home, {{childName}} knew that no matter how big the universe is, the greatest wonders live right inside their own brave heart.',
        defaultImage: '/src/assets/images/space_boy_window_1789746542329.jpg',
        boyImage: '/src/assets/images/space_boy_window_1789746542329.jpg',
        girlImage: '/src/assets/images/space_girl_window_1789746562044.jpg',
        boyFaceSlot: { top: 38, left: 47, width: 22, height: 26, rotate: 0 },
        girlFaceSlot: { top: 38, left: 47, width: 22, height: 26, rotate: 0 },
        moralFocus: 'Security and Love'
      }
    ]
  },
  {
    id: 'secret-jungle-adventure',
    slug: 'the-secret-jungle-adventure',
    title: 'The Secret Jungle Adventure',
    subtitle: 'Into the emerald canopy where ancient rivers sing.',
    description: 'Deep inside the whispering Western Ghats, a hidden waterfall calls for a brave explorer. Guided by playful langurs and wise elephants, your child learns the rhythm of nature.',
    coverImage: '/src/assets/images/ananya_watercolor_1789745975618.jpg',
    boyCoverImage: '/src/assets/images/jungle_boy_trail_1789746581206.jpg',
    girlCoverImage: '/src/assets/images/ananya_watercolor_1789745975618.jpg',
    ageRange: '4–6',
    category: 'Adventure',
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Kannada', 'Malayalam'],
    formats: ['digital', 'paperback', 'hardcover'],
    benefits: [
      'Fosters deep love and respect for wildlife and Indian forests',
      'Teaches mindfulness through listening to river rhythms',
      'Celebrates teamwork with jungle animals'
    ],
    moralObjective: 'Respect for Nature and Peaceful Harmony',
    featured: true,
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'The Trail of Emerald Ferns',
        textTemplate: 'With their small explorer hat tilted just right, {{childName}} stepped onto a dewy trail shaded by giant teak trees and swaying bamboo.',
        defaultImage: '/src/assets/images/jungle_boy_trail_1789746581206.jpg',
        boyImage: '/src/assets/images/jungle_boy_trail_1789746581206.jpg',
        girlImage: '/src/assets/images/jungle_girl_trail_1789746597642.jpg',
        boyFaceSlot: { top: 34, left: 44, width: 22, height: 26, rotate: 0 },
        girlFaceSlot: { top: 34, left: 44, width: 22, height: 26, rotate: 0 },
      },
      {
        pageNumber: 2,
        sceneTitle: 'The Elephant’s Melody',
        textTemplate: 'By the riverbend, a gentle baby elephant trumpeted softly. {{childName}} offered a sweet mango and was rewarded with a joyful splash of cool crystal water.',
        defaultImage: '/src/assets/images/jungle_boy_trail_1789746581206.jpg',
        boyImage: '/src/assets/images/jungle_boy_trail_1789746581206.jpg',
        girlImage: '/src/assets/images/jungle_girl_trail_1789746597642.jpg',
        boyFaceSlot: { top: 34, left: 44, width: 22, height: 26, rotate: 0 },
        girlFaceSlot: { top: 34, left: 44, width: 22, height: 26, rotate: 0 },
      },
      {
        pageNumber: 3,
        sceneTitle: 'The Bridge of Vines',
        textTemplate: 'To reach the hidden temple orchid, {{childName}} balanced carefully along a singing root bridge, cheering: "Step by step, I can do anything!"',
        defaultImage: '/src/assets/images/jungle_boy_trail_1789746581206.jpg',
        boyImage: '/src/assets/images/jungle_boy_trail_1789746581206.jpg',
        girlImage: '/src/assets/images/jungle_girl_trail_1789746597642.jpg',
        boyFaceSlot: { top: 34, left: 44, width: 22, height: 26, rotate: 0 },
        girlFaceSlot: { top: 34, left: 44, width: 22, height: 26, rotate: 0 },
      },
      {
        pageNumber: 4,
        sceneTitle: 'Firefly Lanterns',
        textTemplate: 'As twilight painted the canopy in shades of {{favoriteColor}}, thousands of tiny fireflies danced in a circle around {{childName}}, illuminating the path with golden warmth.',
        defaultImage: '/src/assets/images/jungle_boy_trail_1789746581206.jpg',
        boyImage: '/src/assets/images/jungle_boy_trail_1789746581206.jpg',
        girlImage: '/src/assets/images/jungle_girl_trail_1789746597642.jpg',
        boyFaceSlot: { top: 34, left: 44, width: 22, height: 26, rotate: 0 },
        girlFaceSlot: { top: 34, left: 44, width: 22, height: 26, rotate: 0 },
      }
    ]
  },
  {
    id: 'journey-through-india',
    slug: 'my-journey-through-india',
    title: 'My Journey Through India',
    subtitle: 'From snowy Himalayan peaks to tranquil Kerala backwaters.',
    description: 'A magical heritage train named Pawan carries your child across colorful bazaars, desert dunes of Rajasthan, sunlit tea gardens of Assam, and festival celebrations full of lights.',
    coverImage: '/src/assets/images/india_train_animated_1789747625174.jpg',
    ageRange: '6–8',
    category: 'India',
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi', 'Bengali'],
    formats: ['digital', 'paperback', 'hardcover'],
    benefits: [
      'Celebrates India’s rich regional diversity, textiles, and traditions',
      'Builds cultural pride and joyful geographical appreciation',
      'Highlights unity in vibrant festivities like Diwali and Pongal'
    ],
    moralObjective: 'Cultural Pride, Heritage, and Warm Hospitality',
    featured: true,
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'The Golden Train Whistle',
        textTemplate: 'The whistle blew with a merry tune! {{childName}} tucked their tickets into their pocket and boarded the magical express adorned with brass lanterns and marigold garlands.',
        defaultImage: '/src/assets/images/india_train_animated_1789747625174.jpg'
      },
      {
        pageNumber: 2,
        sceneTitle: 'The Desert of Shining Stars',
        textTemplate: 'Across the golden dunes of Jaisalmer, musicians played the folk sarangi. {{childName}} smiled as a decorated camel bowed politely to share a roasted treat.',
        defaultImage: '/src/assets/images/india_train_animated_1789747625174.jpg'
      },
      {
        pageNumber: 3,
        sceneTitle: 'Gliding Through Palm Canals',
        textTemplate: 'In Kerala, coconut palms bowed over the water. {{childName}} cheered as brightly colored snake boats raced past, drums beating to the joyous song of the monsoon.',
        defaultImage: '/src/assets/images/jungle_boy_trail_1789746581206.jpg'
      }
    ]
  },
  {
    id: 'enchanted-dream-world',
    slug: 'the-enchanted-dream-world',
    title: 'The Enchanted Dream World',
    subtitle: 'Where cloud-castles drift and bedtime turns to pure magic.',
    description: 'When the moon tucks the sun into bed, a silver staircase appears outside your child’s window. Guided by the Dream Weaver bird, they visit valleys where wishes bloom like glowing flowers.',
    coverImage: '/src/assets/images/dream_world_animated_1789747644910.jpg',
    ageRange: '2–4',
    category: 'Fantasy',
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    formats: ['digital', 'paperback', 'hardcover'],
    benefits: [
      'Calming bedtime narrative that soothes night anxiety',
      'Sensory imagery crafted for restful relaxation',
      'Strengthens parental bond with sweet sleep affirmations'
    ],
    moralObjective: 'Peaceful Sleep, Security, and Emotional Comfort',
    featured: false,
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'The Silver Moon Staircase',
        textTemplate: 'Soft lullabies drifted on the breeze. {{childName}} took the first step onto the cloud carpet, surrounded by floating feather-lanterns.',
        defaultImage: '/src/assets/images/dream_world_animated_1789747644910.jpg'
      },
      {
        pageNumber: 2,
        sceneTitle: 'The Pillow-Fort Castle',
        textTemplate: 'Inside the great sleepy palace, giant lavender pillows smelled of chamomile. "Here," whispered the Dream Weaver, "every good thought becomes a pleasant tomorrow."',
        defaultImage: '/src/assets/images/space_girl_scene_1789746496237.jpg'
      }
    ]
  },
  {
    id: 'my-magical-birthday',
    slug: 'my-magical-birthday',
    title: 'My Magical Birthday',
    subtitle: 'A once-in-a-lifetime birthday celebration crafted just for them.',
    description: 'All the woodland creatures, balloon makers, and confectioners gather to throw the greatest surprise birthday party for your child, celebrating all the ways they have grown this year.',
    coverImage: '/src/assets/images/birthday_animated_1789747658427.jpg',
    ageRange: '2–4',
    category: 'Birthday',
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Bengali'],
    formats: ['digital', 'paperback', 'hardcover'],
    benefits: [
      'Ideal birthday gift that becomes an heirloom childhood keepsake',
      'Highlights how much love family and friends hold for the child',
      'Personalized with their exact new age and favorite treats'
    ],
    moralObjective: 'Gratitude, Self-Worth, and Family Joy',
    featured: true,
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'The Morning Surprise',
        textTemplate: 'Sunbeams danced across {{childName}}’s room. Today wasn’t just any day—it was the day {{childName}} turned {{childAge}} years old!',
        defaultImage: '/src/assets/images/birthday_animated_1789747658427.jpg'
      },
      {
        pageNumber: 2,
        sceneTitle: 'The Balloon Forest',
        textTemplate: 'Ribbons in cheerful {{favoriteColor}} floated above a towering cake layered with sweet strawberry frosting. "Hip, hip, hooray for {{childName}}!" echoed all around.',
        defaultImage: '/src/assets/images/birthday_animated_1789747658427.jpg'
      }
    ]
  },
  {
    id: 'first-abc-adventure',
    slug: 'my-first-abc-adventure',
    title: 'My First ABC Adventure',
    subtitle: 'From Astronaut to Zephyr—letters come alive with their name.',
    description: 'Learning letters is an exhilarating quest when each alphabet leads to a whimsical discovery starring your child and their favorite animal friends.',
    coverImage: '/src/assets/images/kabir_superhero_1789745987445.jpg',
    ageRange: '2–4',
    category: 'Learning',
    pageCount: 32,
    languages: ['English', 'Hindi'],
    formats: ['digital', 'paperback', 'hardcover'],
    benefits: [
      'Early phonics and letter recognition linked to familiar joy',
      'Rich alliterative poetry that delights young ears',
      'Builds foundational pre-reading confidence'
    ],
    moralObjective: 'Foundational Literacy and Joy of Learning',
    featured: false,
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'A is for Adventurer',
        textTemplate: 'A is for {{childName}}, the daring Adventurer who climbed the Apple tree to catch an Amber balloon!',
        defaultImage: '/src/assets/images/kabir_superhero_1789745987445.jpg'
      }
    ]
  },
  {
    id: 'dinosaur-discovery',
    slug: 'the-dinosaur-discovery',
    title: 'The Dinosaur Discovery',
    subtitle: 'Travel back in time to meet friendly prehistoric giants.',
    description: 'Equipped with a magnifying glass and a field notebook, your little paleontologist travels back to the Jurassic era to help a lost baby Triceratops find its family.',
    coverImage: '/src/assets/images/dino_animated_1789747671931.jpg',
    ageRange: '4–6',
    category: 'Adventure',
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil'],
    formats: ['digital', 'paperback', 'hardcover'],
    benefits: [
      'Introduces prehistoric geology and fossil science playfully',
      'Teaches empathy by caring for a lost creature',
      'Stimulates adventurous curiosity'
    ],
    moralObjective: 'Scientific Observation and Compassion',
    featured: false,
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'The Mysterious Footprint',
        textTemplate: 'While digging in the garden, {{childName}} uncovered a footprint three times the size of their shoe! "Quick," they exclaimed, "the prehistoric portal is open!"',
        defaultImage: '/src/assets/images/dino_animated_1789747671931.jpg'
      }
    ]
  },
  {
    id: 'little-explorer',
    slug: 'the-little-explorer',
    title: 'The Little Explorer',
    subtitle: 'Big wonders await right in your own backyard.',
    description: 'You don’t need a spaceship to explore a brand-new world. With curiosity and care, your child discovers the busy city of ants, singing sparrows, and secret clover glades.',
    coverImage: '/src/assets/images/jungle_girl_trail_1789746597642.jpg',
    ageRange: '2–4',
    category: 'Learning',
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    formats: ['digital', 'paperback', 'hardcover'],
    benefits: [
      'Encourages outdoor play and mindful observation of local fauna',
      'Builds patience and attention to tiny everyday wonders',
      'Strengthens nature connection away from digital screens'
    ],
    moralObjective: 'Patience, Wonder, and Environmental Mindfulness',
    featured: false,
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'Morning Dew Droplets',
        textTemplate: 'The morning grass was cool and wet. {{childName}} bent down low to inspect a diamond water-drop resting upon an emerald leaf.',
        defaultImage: '/src/assets/images/jungle_girl_trail_1789746597642.jpg'
      }
    ]
  },
  {
    id: 'when-i-grow-up',
    slug: 'when-i-grow-up',
    title: 'When I Grow Up',
    subtitle: 'Doctor, pilot, artist, chef—every dream is within their reach.',
    description: 'Your child tries on different hats in a whimsical workshop where each profession lets them use their unique talents to spread happiness to others.',
    coverImage: '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
    ageRange: '6–8',
    category: 'Confidence',
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi'],
    formats: ['digital', 'paperback', 'hardcover'],
    benefits: [
      'Broadens horizons and validates boundless childhood aspirations',
      'Highlights that any career is an opportunity to help community',
      'Builds unshakable confidence in their own unique potential'
    ],
    moralObjective: 'Self-Belief, Ambition, and Community Service',
    featured: false,
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'The Mirror of Possibilities',
        textTemplate: 'Standing tall in front of the mirror, {{childName}} smiled. "Tomorrow holds so many adventures. Which dream shall I explore first?"',
        defaultImage: '/src/assets/images/aarav_magical_3d_1789745946003.jpg'
      }
    ]
  },
  {
    id: 'my-superhero-adventure',
    slug: 'my-superhero-adventure',
    title: 'My Superhero Adventure',
    subtitle: 'The greatest superpower of all is a kind and helping heart.',
    description: 'When the city clock tower loses its sparkle, your child dons their personalized hero cape. Their superpower isn’t laser vision—it’s kindness, clever teamwork, and spreading smiles.',
    coverImage: '/src/assets/images/kabir_superhero_1789745987445.jpg',
    ageRange: '4–6',
    category: 'Confidence',
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali'],
    formats: ['digital', 'paperback', 'hardcover'],
    benefits: [
      'Redefines heroism around empathy, bravery, and helping friends',
      'Empowers shy children to speak up and lead with warmth',
      'Action-packed while entirely non-violent and uplifting'
    ],
    moralObjective: 'Kindness, Teamwork, and Everyday Courage',
    featured: true,
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'The Cape of Kindness',
        textTemplate: 'Fastened with a gold pin, {{childName}}’s cape fluttered in the breeze. "Whenever someone needs a helping hand," they declared, "I am ready!"',
        defaultImage: '/src/assets/images/kabir_superhero_1789745987445.jpg'
      }
    ]
  }
];

export const INITIAL_PRICING = [
  {
    format: 'digital' as const,
    title: 'Digital Keepsake Edition',
    badge: 'Instant PDF Delivery',
    price: 399,
    originalPrice: 699,
    description: 'Full 32-page high-resolution square PDF edition formatted for tablets, iPads, smartphones, and archival home printing.',
    specifications: {
      dimension: '8.5 × 8.5 inch',
      pageCount: 32,
      interior: 'Full-color interior (300 DPI)',
      paperType: 'Digital print-ready CMYK PDF',
      coverFinish: 'Full-color front & back cover spreads',
      binding: 'Digital PDF eBook'
    },
    features: [
      'Complete 32-page personalized picture book',
      '8.5 × 8.5 inch square picture book format',
      'Custom character created from child’s photo',
      'Title, Dedication & "About our hero" pages included',
      'Print-ready 300 DPI high-resolution PDF download',
      'Instant access across tablets, iPads & phones'
    ],
    popular: false
  },
  {
    format: 'paperback' as const,
    title: 'Verve Studio Paperback',
    badge: 'Most Popular',
    price: 899,
    originalPrice: 1299,
    description: 'Premium 8.5 × 8.5 inch square children’s book printed on thick white coated paper with a smooth matte laminated cover.',
    specifications: {
      dimension: '8.5 × 8.5 inch (21.59 × 21.59 cm)',
      pageCount: 32,
      interior: 'Full-color interior (Premium color)',
      paperType: 'White coated paper (rich vibrant color reproduction)',
      coverFinish: 'Matte laminated softcover',
      binding: 'Perfect-bound paperback (Lulu standard)'
    },
    features: [
      'Complete 32-page personalized picture book',
      '8.5 × 8.5 inch standard square picture book format',
      'Full-color interior with premium color saturation',
      'White coated heavyweight paper (vibrant & tear-resistant)',
      'Smooth matte laminated protective cover finish',
      'Perfect-bound paperback binding built to lay flat',
      'Page 3 dedication & Page 31 "About our hero" profile',
      'Free 32-page digital PDF included immediately'
    ],
    popular: true
  },
  {
    format: 'hardcover' as const,
    title: 'Premium Edition Hardcover',
    badge: 'Heirloom Keepsake',
    price: 1499,
    originalPrice: 2199,
    description: 'Museum-grade 8.5 × 8.5 inch heirloom case-wrap hardcover book crafted on thick white coated paper with matte lamination.',
    specifications: {
      dimension: '8.5 × 8.5 inch (21.59 × 21.59 cm)',
      pageCount: 32,
      interior: 'Full-color interior (Premium color)',
      paperType: 'White coated heavy art paper',
      coverFinish: 'Matte laminated case-wrap cover',
      binding: 'Sturdy library casebound hardcover'
    },
    features: [
      'Everything in Paperback included',
      '8.5 × 8.5 inch heirloom case-wrap hardcover',
      '3mm rigid library binding built to last for generations',
      'Full-color interior on premium white coated paper',
      'Silky matte laminated luxury cover finish',
      'Milestone keepsake certificate & hero dedication',
      'Presentation gift-wrap ready for birthday or festive giving',
      'Priority print queue & insured door delivery across India'
    ],
    popular: false
  }
];
