import { Story, PricingPlan } from '../types';

export const INITIAL_PRICING: PricingPlan[] = [
  {
    format: 'digital',
    title: 'eBook',
    subtitle: 'Instant Digital Storybook',
    price: 299,
    originalPrice: 499,
    bundleQuantity: 1,
    includesEbook: true,
    description: 'Instant high-resolution PDF download for tablets, phones, and digital reading.',
    features: [
      'Instant download',
      'High-quality PDF',
      'Read on any device'
    ]
  },
  {
    format: 'hardcover',
    title: 'Hardcover Storybook + eBook',
    subtitle: 'Heirloom Keepsake Edition',
    badge: 'Most Popular',
    popular: true,
    price: 999,
    originalPrice: 1499,
    bundleQuantity: 1,
    includesEbook: true,
    description: 'Custom hardcover keepsake printed on 200 GSM silk paper with gloss-coated cover.',
    features: [
      'Printed hardcover book',
      'Instant eBook included',
      'Archival heirloom print'
    ]
  },
  {
    format: 'bundle-2',
    title: '2 Storybooks + eBooks',
    subtitle: 'For siblings / cousins',
    badge: 'Best value',
    popular: false,
    price: 1599,
    originalPrice: 2499,
    bundleQuantity: 2,
    includesEbook: true,
    description: 'Two personalized hardcover books for siblings, cousins, or best friends.',
    features: [
      '2 hardcover books',
      '2 eBooks',
      'Free express shipping'
    ]
  },
  {
    format: 'bundle-3',
    title: '3 Storybooks + eBooks',
    subtitle: 'Family gift bundle',
    price: 2099,
    originalPrice: 3499,
    bundleQuantity: 3,
    includesEbook: true,
    description: 'Three custom books for grandparents, home library, and birthday gifts.',
    features: [
      '3 hardcover books',
      '3 eBooks',
      'Free express shipping'
    ]
  },
  {
    format: 'bundle-complete',
    title: 'Complete Gift Bundle',
    subtitle: 'Storybook + Coloring + Video',
    badge: 'All-In-One',
    popular: false,
    price: 2499,
    originalPrice: 3999,
    bundleQuantity: 1,
    includesEbook: true,
    description: 'Hardcover Storybook + Hardcover Coloring Book + Animated Video Keepsake.',
    features: [
      'Hardcover Storybook',
      'Hardcover Coloring Book',
      'Animated Video Story'
    ]
  }
];

export const COLORING_PRICING: PricingPlan[] = [
  {
    format: 'digital-coloring',
    title: 'Digital Coloring Book',
    subtitle: 'eBook PDF Edition',
    price: 399,
    originalPrice: 599,
    bundleQuantity: 1,
    includesEbook: true,
    description: '24 printable high-resolution coloring pages featuring your child hero.',
    features: [
      '24 coloring pages',
      'Personalized child hero',
      'Printable infinite times'
    ]
  },
  {
    format: 'hardcover-coloring',
    title: 'Hardcover Coloring Book',
    subtitle: 'Thick bleed-resistant paper',
    badge: 'Popular',
    popular: true,
    price: 899,
    originalPrice: 1299,
    bundleQuantity: 1,
    includesEbook: true,
    description: 'Hardcover spiral/lay-flat coloring book with 180 GSM artist coloring paper.',
    features: [
      '24 personalized pages',
      'Lay-flat binding',
      'Thick non-bleed paper'
    ]
  },
  {
    format: 'storybook-plus-coloring',
    title: 'Storybook + Coloring Book',
    subtitle: 'The Perfect Creative Pair',
    badge: 'Combo Savings',
    popular: false,
    price: 1499,
    originalPrice: 2199,
    bundleQuantity: 2,
    includesEbook: true,
    description: 'Get both the full-color Hardcover Storybook and matching Coloring Book.',
    features: [
      '1 Hardcover Storybook',
      '1 Hardcover Coloring Book',
      'Both digital editions'
    ]
  },
  {
    format: 'storybook-plus-video',
    title: 'Storybook + Video',
    subtitle: 'Read & Watch Adventure',
    price: 1699,
    originalPrice: 2499,
    bundleQuantity: 1,
    includesEbook: true,
    description: 'Hardcover Storybook + Personalized Animated Video with voice narration.',
    features: [
      'Hardcover Storybook',
      'Animated narration video',
      'Instant digital access'
    ]
  }
];

export const AR_ADDON_PLAN = {
  title: 'Bring it to life (AR View)',
  price: 399,
  features: [
    'Scan & watch animation',
    'No app required',
    'Works on any phone'
  ]
};

export const COLORING_BOOK_PRODUCT = {
  title: 'My Adventure Coloring Book',
  subtitle: 'Same exciting story, now in an interactive coloring format! Perfect for little dreamers and creative minds.',
  price: 499,
  originalPrice: 799,
  pageCount: 24,
  format: 'Print + Digital',
  coverImage: '/src/assets/images/storybook_mockup_animated_1789747788784.jpg',
  previewPages: [
    '/src/assets/images/space_boy_window_1789746542329.jpg',
    '/src/assets/images/space_boy_scene_1789746482524.jpg',
    '/src/assets/images/space_boy_planet_1789746509818.jpg'
  ]
};

export const STORIES: Story[] = [
  // =========================================================================
  // 1. ADVENTURE & EXPLORATION
  // =========================================================================
  {
    id: 'journey-to-the-stars',
    slug: 'journey-to-the-stars',
    title: 'Journey to the Stars',
    subtitle: 'A cosmic adventure across constellations',
    description: 'When {{childName}} finds a glowing star map, an ordinary bedroom turns into a launchpad across the galaxy. Will they chart the sapphire nebula and find the lost star?',
    coverImage: '/src/assets/images/space_boy_scene_1789746482524.jpg',
    boyCoverImage: '/src/assets/images/space_boy_scene_1789746482524.jpg',
    girlCoverImage: '/src/assets/images/space_girl_scene_1789746496237.jpg',
    ageRange: '4–6',
    category: 'Adventure & Exploration',
    purposeCategory: 'Adventure & Exploration',
    occasions: ['Birthday', 'Just Because', 'Milestones'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Inspires scientific curiosity', 'Builds bedtime calm', 'Celebrates bravery'],
    moralObjective: 'Courage, exploration, and the wonder of cosmic discovery.',
    featured: true,
    pages: [
      {
        pageNumber: 1,
        sceneTitle: 'The Starlight Window',
        textTemplate: 'One quiet evening, {{childName}} gazed out the bedroom window, spotting a brilliant sapphire star dancing across the sky.',
        defaultImage: '/src/assets/images/space_boy_window_1789746542329.jpg',
        boyImage: '/src/assets/images/space_boy_window_1789746542329.jpg',
        girlImage: '/src/assets/images/space_girl_window_1789746562044.jpg'
      },
      {
        pageNumber: 2,
        sceneTitle: 'Boarding the Starlight Vessel',
        textTemplate: 'Dressed in an explorer suit, {{childName}} and a loyal companion stepped aboard the Starlight Cruiser ready to chart the forgotten galaxy.',
        defaultImage: '/src/assets/images/space_boy_scene_1789746482524.jpg',
        boyImage: '/src/assets/images/space_boy_scene_1789746482524.jpg',
        girlImage: '/src/assets/images/space_girl_scene_1789746496237.jpg'
      },
      {
        pageNumber: 3,
        sceneTitle: 'The Crystal Planet of Melodies',
        textTemplate: 'The ship landed on a glowing violet moon where singing crystal formations chimed a cheerful welcome song whenever {{childName}} smiled.',
        defaultImage: '/src/assets/images/space_boy_planet_1789746509818.jpg',
        boyImage: '/src/assets/images/space_boy_planet_1789746509818.jpg',
        girlImage: '/src/assets/images/space_girl_planet_1789746528883.jpg'
      }
    ]
  },
  {
    id: 'the-brave-mountain-guide',
    slug: 'the-brave-mountain-guide',
    title: 'The Brave Mountain Guide',
    subtitle: 'Himalayan courage & resilience',
    description: 'High in the snow-kissed peaks, {{childName}} leads a team of lost mountain goats back to their warm valley through patience, grit, and careful pathfinding.',
    coverImage: '/src/assets/images/mountain_adventure_cover_1789777025214.jpg',
    ageRange: '6–8',
    category: 'Adventure & Exploration',
    purposeCategory: 'Adventure & Exploration',
    occasions: ['Milestones', 'Just Because'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Resilience and grit', 'Leadership under pressure', 'Animal compassion'],
    moralObjective: 'Perseverance, steady calm, and guiding others with care.',
    featured: false,
    pages: []
  },
  {
    id: 'the-enchanted-dragon-whisperer',
    slug: 'the-enchanted-dragon-whisperer',
    title: 'The Dragon Whisperer',
    subtitle: 'A mystical mountain quest',
    description: 'When a timid baby dragon loses its sparkle in the whispering canyon, {{childName}} offers gentle friendship and helps it find its inner light again.',
    coverImage: '/src/assets/images/dragon_adventure_cover_1789777001745.jpg',
    ageRange: '4–6',
    category: 'Adventure & Exploration',
    purposeCategory: 'Adventure & Exploration',
    occasions: ['Birthday', 'Just Because'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Overcoming fears', 'Gentle listening', 'Creative imagination'],
    moralObjective: 'Understanding feelings, patience, and non-judgmental love.',
    featured: false,
    pages: []
  },

  // =========================================================================
  // 2. LEARNING & CURIOSITY
  // =========================================================================
  {
    id: 'little-scientist',
    slug: 'little-scientist',
    title: 'Little Scientist & the Ocean Robot',
    subtitle: 'STEM invention & marine discovery',
    description: 'In a whimsical workshop filled with bubbling beakers and spinning gears, {{childName}} builds an eco-robot to protect colorful coral reefs and solve underwater mysteries.',
    coverImage: '/src/assets/images/dream_world_animated_1789747644910.jpg',
    ageRange: '6–8',
    category: 'Learning & Curiosity',
    purposeCategory: 'Learning & Curiosity',
    occasions: ['Just Because', 'Milestones'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Kannada'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['STEM curiosity', 'Environmental consciousness', 'Creative problem-solving'],
    moralObjective: 'Experimentation, persistence after mistakes, and caring for our planet.',
    featured: true,
    pages: []
  },
  {
    id: 'dinosaur-discovery',
    slug: 'dinosaur-discovery',
    title: 'Dinosaur Discovery Expedition',
    subtitle: 'Prehistoric amber valley detective',
    description: 'Equipped with a magnifying glass and field notebook, {{childName}} unearths friendly gentle giants in the prehistoric valley and unlocks the secret of glowing fossils.',
    coverImage: '/src/assets/images/dino_animated_1789747671931.jpg',
    ageRange: '4–6',
    category: 'Learning & Curiosity',
    purposeCategory: 'Learning & Curiosity',
    occasions: ['Birthday', 'Just Because'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Paleontology wonder', 'Teamwork and kindness', 'Observation skills'],
    moralObjective: 'Respecting ancient history, curiosity, and peaceful problem-solving.',
    featured: true,
    pages: []
  },

  // =========================================================================
  // 3. INDIAN CULTURE & HERITAGE
  // =========================================================================
  {
    id: 'india-my-home',
    slug: 'india-my-home',
    title: 'India, My Home: The Great Rail Odyssey',
    subtitle: 'A journey across India\'s wonders',
    description: 'A breathtaking train voyage aboard the Golden Express! {{childName}} travels across Rajasthan palaces, lush Western Ghats, ancient temple corridors, and coastal backwaters.',
    coverImage: '/src/assets/images/india_train_animated_1789747625174.jpg',
    ageRange: '6–8',
    category: 'Indian Culture & Heritage',
    purposeCategory: 'Indian Culture & Heritage',
    occasions: ['Festivals', 'Milestones', 'Just Because'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Marathi'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Celebrates Indian heritage', 'Geography and cultural pride', 'Unity in diversity'],
    moralObjective: 'Pride in roots, cultural appreciation, and welcoming warmth.',
    featured: true,
    pages: []
  },
  {
    id: 'the-royal-fort-mystery',
    slug: 'the-royal-fort-mystery',
    title: 'The Royal Fort of Rajasthan',
    subtitle: 'Ancient palaces & secret riddles',
    description: 'While visiting majestic sandstone ramparts with grandparents, {{childName}} decodes musical clues hidden within ancient royal courtyards and miniature fresco paintings.',
    coverImage: '/src/assets/images/wizard_adventure_cover_1789777013783.jpg',
    ageRange: '6–8',
    category: 'Indian Culture & Heritage',
    purposeCategory: 'Indian Culture & Heritage',
    occasions: ['Grandparents', 'Just Because'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Marathi'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Architectural appreciation', 'Music and history connections', 'Analytical thinking'],
    moralObjective: 'Valuing elder wisdom, safeguarding heritage, and inquisitive exploration.',
    featured: false,
    pages: []
  },

  // =========================================================================
  // 4. FESTIVAL & CELEBRATION
  // =========================================================================
  {
    id: 'festival-of-lights',
    slug: 'festival-of-lights',
    title: 'The Festival of Radiant Lights',
    subtitle: 'Diwali magic, clay diyas & joy',
    description: 'As twilight falls, {{childName}} helps arrange golden clay lamps, draws a dazzling peacock rangoli, and brings festive sweets to brighten the whole neighborhood.',
    coverImage: '/src/assets/images/ananya_watercolor_1789745975618.jpg',
    ageRange: '4–6',
    category: 'Festival & Celebration',
    purposeCategory: 'Festival & Celebration',
    occasions: ['Festivals', 'Just Because'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Bengali'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Celebrates Diwali traditions', 'Sharing and togetherness', 'Creativity with rangoli'],
    moralObjective: 'Triumph of light, generosity, and sharing happiness with every home.',
    featured: true,
    pages: []
  },
  {
    id: 'colors-of-joy-holi',
    slug: 'colors-of-joy-holi',
    title: 'The Grand Colors of Joy (Holi)',
    subtitle: 'Spring blooms, laughter & harmony',
    description: 'When spring arrives, {{childName}} gathers friends for a vibrant celebration with natural herbal colors, singing folk melodies, and embracing new beginnings.',
    coverImage: '/src/assets/images/kid_girl_meera_1789747560780.jpg',
    ageRange: '4–6',
    category: 'Festival & Celebration',
    purposeCategory: 'Festival & Celebration',
    occasions: ['Festivals', 'Just Because'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Spring celebration', 'Forgiveness and new friendships', 'Joy of play'],
    moralObjective: 'Harmony, playfulness, forgiveness, and welcoming the beauty of spring.',
    featured: false,
    pages: []
  },

  // =========================================================================
  // 5. VALUE & KINDNESS
  // =========================================================================
  {
    id: 'the-kindness-quest',
    slug: 'the-kindness-quest',
    title: 'The Kindness Quest in Silver Forest',
    subtitle: 'Small acts of empathy that spark light',
    description: 'Through an enchanted whispering grove, {{childName}} discovers that simple everyday acts of generosity bring glowing blossoms back to the sleepy forest.',
    coverImage: '/src/assets/images/jungle_boy_trail_1789746581206.jpg',
    ageRange: '4–6',
    category: 'Value & Kindness',
    purposeCategory: 'Value & Kindness',
    occasions: ['Just Because', 'Milestones'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Kannada'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Empathy and emotional quotient', 'Gentle friendship building', 'Selflessness'],
    moralObjective: 'Empathy, compassion, and the ripple power of unconditional kindness.',
    featured: true,
    pages: []
  },
  {
    id: 'the-honest-little-baker',
    slug: 'the-honest-little-baker',
    title: 'The Honest Little Baker',
    subtitle: 'Integrity, teamwork & sharing',
    description: 'While baking warm cardamom buns for the village fair, {{childName}} learns the value of honesty, helping hands, and sharing treats with those in need.',
    coverImage: '/src/assets/images/kid_boy_aarav_1789747514421.jpg',
    ageRange: '4–6',
    category: 'Value & Kindness',
    purposeCategory: 'Value & Kindness',
    occasions: ['Just Because', 'Milestones'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Honesty and truthfulness', 'Sharing with community', 'Patience in craft'],
    moralObjective: 'Integrity in small actions, generosity, and thoughtful community care.',
    featured: false,
    pages: []
  },

  // =========================================================================
  // 6. BEDTIME & CALMING
  // =========================================================================
  {
    id: 'the-slumber-cloud-river',
    slug: 'the-slumber-cloud-river',
    title: 'The Slumber Cloud & Moonbeam River',
    subtitle: 'Tranquil rhythms for peaceful sleep',
    description: 'Floating gently down a river of soft starlight, {{childName}} practices rhythmic deep breaths alongside yawning owls and drifting cloud sheep into dreamland.',
    coverImage: '/src/assets/images/space_girl_window_1789746562044.jpg',
    ageRange: '2–4',
    category: 'Bedtime & Calming',
    purposeCategory: 'Bedtime & Calming',
    occasions: ['New Baby', 'Just Because'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Soothing bedtime routine', 'Mindful breath awareness', 'Overcoming night fears'],
    moralObjective: 'Peace of mind, gentle safety, and sweet restful sleep.',
    featured: true,
    pages: []
  },
  {
    id: 'goodnight-little-astronaut',
    slug: 'goodnight-little-astronaut',
    title: 'Goodnight, Little Dreamer',
    subtitle: 'A cozy starlight lullaby',
    description: 'After a big day of playing and learning, {{childName}} tucks in the twinkling stars, turns off cosmic lanterns, and snuggles into a cozy blanket of dreams.',
    coverImage: '/src/assets/images/space_boy_window_1789746542329.jpg',
    ageRange: '2–4',
    category: 'Bedtime & Calming',
    purposeCategory: 'Bedtime & Calming',
    occasions: ['Just Because', 'New Baby'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Calm wind-down cues', 'Emotional comfort', 'Positive bedtime association'],
    moralObjective: 'Contentment, feeling loved and protected through the quiet night.',
    featured: false,
    pages: []
  },

  // =========================================================================
  // 7. BIRTHDAY & MILESTONE
  // =========================================================================
  {
    id: 'birthday-adventure',
    slug: 'birthday-adventure',
    title: 'The Great Birthday Balloon Adventure',
    subtitle: 'A special day, a soaring dream',
    description: 'Today is {{childName}}’s special birthday! A playful rainbow balloon express arrives to whisk our birthday hero away to the Land of Big Dreams and joyous surprises.',
    coverImage: '/src/assets/images/birthday_animated_1789747658427.jpg',
    ageRange: '4–6',
    category: 'Birthday & Milestone',
    purposeCategory: 'Birthday & Milestone',
    occasions: ['Birthday', 'Return Gifts'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Self-esteem and joy', 'Cherished milestone memory', 'Emotional warmth'],
    moralObjective: 'Gratitude, celebrating growth, and sharing joy with loved ones.',
    featured: true,
    pages: []
  },
  {
    id: 'first-day-at-big-school',
    slug: 'first-day-at-big-school',
    title: 'First Day of Big School Champion',
    subtitle: 'Confidence, new friendships & bravery',
    description: 'With a colorful new backpack and butterflies in the tummy, {{childName}} steps into the classroom and discovers that making new friends is the best adventure yet.',
    coverImage: '/src/assets/images/first_day_school_cover_1789776989408.jpg',
    ageRange: '4–6',
    category: 'Birthday & Milestone',
    purposeCategory: 'Birthday & Milestone',
    occasions: ['Milestones', 'Just Because'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Kannada'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Overcoming school anxiety', 'Social confidence', 'Excitement for learning'],
    moralObjective: 'Courage to try new things, friendliness, and self-belief.',
    featured: false,
    pages: []
  },

  // =========================================================================
  // 8. SPIRITUAL & MYTHOLOGY
  // =========================================================================
  {
    id: 'little-hanuman-sun-quest',
    slug: 'little-hanuman-sun-quest',
    title: 'The Adventures of Little Hanuman',
    subtitle: 'Playful courage, devotion & boundless energy',
    description: 'Joining the brave little vanara hero, {{childName}} leaps across soft golden clouds, learns about selfless strength, and discovers the superpower of a loving heart.',
    coverImage: '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
    ageRange: '4–6',
    category: 'Spiritual & Mythology',
    purposeCategory: 'Spiritual & Mythology',
    occasions: ['Festivals', 'Milestones', 'Just Because'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Marathi'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Values from Indian mythology', 'Inner strength and modesty', 'Loyalty and protection'],
    moralObjective: 'Humble strength, devotion, and using power to protect and uplift others.',
    featured: true,
    pages: []
  },
  {
    id: 'the-flute-of-the-peacock-meadow',
    slug: 'the-flute-of-the-peacock-meadow',
    title: 'The Magical Flute of Vrindavan',
    subtitle: 'Nature\'s harmony, peacocks & gentle melody',
    description: 'Under the shade of the ancient Kadamba tree, {{childName}} listens to an enchanted bamboo flute that teaches all forest creatures to dance together in peaceful harmony.',
    coverImage: '/src/assets/images/style_3d_magical_1789745962568.jpg',
    ageRange: '4–6',
    category: 'Spiritual & Mythology',
    purposeCategory: 'Spiritual & Mythology',
    occasions: ['Festivals', 'Just Because'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Musical appreciation', 'Mindfulness in nature', 'Gentleness with animals'],
    moralObjective: 'Joy in simplicity, connection to nature, and living in peaceful harmony.',
    featured: false,
    pages: []
  },

  // =========================================================================
  // 9. ANIMALS & NATURE
  // =========================================================================
  {
    id: 'secret-jungle-safari',
    slug: 'secret-jungle-safari',
    title: 'The Secret Jungle Safari',
    subtitle: 'Rainforest wonders & elephant friends',
    description: 'Guiding through emerald canopy trails, {{childName}} spots playful langurs, tracks gentle elephant herds, and helps plant a sacred banyan sapling.',
    coverImage: '/src/assets/images/jungle_book_mockup_1789747803839.jpg',
    ageRange: '4–6',
    category: 'Animals & Nature',
    purposeCategory: 'Animals & Nature',
    occasions: ['Birthday', 'Just Because'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil', 'Kannada'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Wildlife conservation', 'Love for animals', 'Outdoor curiosity'],
    moralObjective: 'Protecting habitats, coexisting with animals, and appreciating biodiversity.',
    featured: true,
    pages: []
  },
  {
    id: 'the-dolphin-bay-guardian',
    slug: 'the-dolphin-bay-guardian',
    title: 'The Ocean Guardian & Dolphin Bay',
    subtitle: 'Coastal cleaning & marine friendship',
    description: 'Along golden sandy shores, {{childName}} teams up with a cheerful pod of coastal dolphins to clean up floating plastic and protect delicate sea turtles.',
    coverImage: '/src/assets/images/jungle_girl_trail_1789746597642.jpg',
    ageRange: '6–8',
    category: 'Animals & Nature',
    purposeCategory: 'Animals & Nature',
    occasions: ['Just Because', 'Milestones'],
    pageCount: 32,
    languages: ['English', 'Hindi', 'Tamil'],
    formats: ['digital', 'hardcover', 'bundle-2', 'bundle-3'],
    benefits: ['Ocean conservation', 'Community action', 'Marine biology excitement'],
    moralObjective: 'Responsibility for clean oceans, empathy for marine life, and proactive care.',
    featured: false,
    pages: []
  }
];
