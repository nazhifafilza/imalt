export interface AnimalInfo {
  id: 'komodo' | 'bekantan' | 'cendrawasih';
  name: string;
  scientificName: string;
  category: string;
  badgeColor: string;
  image: string;
  characteristics: string[];
  island: string;
  habitat: string;
  appearance: string;
  slogan: string;
  mapCoords: { x: number; y: number }; // percentage on Indonesia map
}

export const GAME_IMAGES = {
  jungleBg: '/img/jungle_adventure_bg_1793589178447.jpg',
  komodo: '/img/komodo_character_1793589178907.jpg',
  bekantan: '/img/bekantan_character_1793589178274.jpg',
  cendrawasih: '/img/cendrawasih_character_1793589180075.jpg',
  rescueBadge: '/img/rescue_badge_1793589179438.jpg',
};

export const ANIMALS: Record<'komodo' | 'bekantan' | 'cendrawasih', AnimalInfo> = {
  komodo: {
    id: 'komodo',
    name: 'KOMODO',
    scientificName: 'Varanus komodoensis',
    category: 'Reptile',
    badgeColor: 'border-emerald-600 bg-emerald-950/80 text-emerald-300',
    image: GAME_IMAGES.komodo,
    characteristics: [
      'A large reptile.',
      'Has strong legs.',
      'Has a long tail.',
      'Lives on several islands in East Nusa Tenggara.',
    ],
    island: 'Several islands in East Nusa Tenggara',
    habitat: 'Lives on several islands in East Nusa Tenggara.',
    appearance: 'Has strong legs and a long tail.',
    slogan: 'It has strong legs and a long tail. Protect its natural habitat!',
    mapCoords: { x: 56, y: 78 },
  },
  bekantan: {
    id: 'bekantan',
    name: 'BEKANTAN',
    scientificName: 'Nasalis larvatus (Proboscis Monkey)',
    category: 'Mammal',
    badgeColor: 'border-amber-600 bg-amber-950/80 text-amber-300',
    image: GAME_IMAGES.bekantan,
    characteristics: [
      'A reddish-brown monkey.',
      'Has a long and big nose.',
      'Lives in Borneo.',
      'Can be found in mangrove forests.',
    ],
    island: 'Borneo (Mangrove Forests)',
    habitat: 'Lives in Borneo.',
    appearance: 'Has a long and big nose.',
    slogan: 'It has a long and big nose. Protect its habitat in Borneo!',
    mapCoords: { x: 42, y: 46 },
  },
  cendrawasih: {
    id: 'cendrawasih',
    name: 'CENDRAWASIH',
    scientificName: 'Paradisaea (Bird of Paradise)',
    category: 'Bird',
    badgeColor: 'border-yellow-500 bg-yellow-950/80 text-yellow-300',
    image: GAME_IMAGES.cendrawasih,
    characteristics: [
      'A beautiful Indonesian bird.',
      'Has colorful feathers.',
      'Has distinctive feather patterns.',
      'Associated with Papua.',
    ],
    island: 'Associated with Papua',
    habitat: 'Associated with Papua.',
    appearance: 'Has colorful feathers.',
    slogan: "It has beautiful colorful feathers. Protect Indonesia's beautiful birds!",
    mapCoords: { x: 86, y: 56 },
  },
};

export interface LabCard {
  id: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  text: string;
  targetAnimal: 'komodo' | 'bekantan' | 'cendrawasih';
  category: 'appearance' | 'habitat';
}

export const LAB_CARDS: LabCard[] = [
  { id: 'A', text: 'Has a long and big nose.', targetAnimal: 'bekantan', category: 'appearance' },
  { id: 'B', text: 'Has strong legs and a long tail.', targetAnimal: 'komodo', category: 'appearance' },
  { id: 'C', text: 'Has colorful feathers.', targetAnimal: 'cendrawasih', category: 'appearance' },
  { id: 'D', text: 'Lives in Borneo.', targetAnimal: 'bekantan', category: 'habitat' },
  { id: 'E', text: 'Lives on several islands in East Nusa Tenggara.', targetAnimal: 'komodo', category: 'habitat' },
  { id: 'F', text: 'Associated with Papua.', targetAnimal: 'cendrawasih', category: 'habitat' },
];

export const ACTION_CARDS = [
  { id: 'A', title: 'Protect its natural habitat.', icon: 'TreePine', desc: 'Preserve rainforests, mangroves, and island sanctuaries.' },
  { id: 'B', title: 'Stop illegal hunting.', icon: 'ShieldAlert', desc: 'Strengthen forest ranger patrols and legal protections.' },
  { id: 'C', title: 'Educate local communities.', icon: 'Users', desc: 'Inspire youth and villages to cherish endangered fauna.' },
  { id: 'D', title: 'Support conservation programs.', icon: 'HeartHandshake', desc: 'Fund rescue sanctuaries, scientific research, and breeding centers.' },
];
