export const universityDetails = {
  auston_singapore: {
    established: '2006',
    location: 'Singapore',
    description: 'Located in the heart of Singapore, Auston Institute of Management has been providing quality education since 2006. Known for its industry-focused approach and strong partnerships with global universities.'
  },
  auston_myanmar: {
    established: '2012',
    location: 'Yangon, Myanmar',
    description: 'Established in 2012, Auston College Myanmar is a leading institution in Yangon, focusing on engineering and technology education tailored for Myanmar growing industries.'
  },
  ljmu: {
    established: '1823',
    location: 'Liverpool, UK',
    description: 'Liverpool John Moores University, founded in 1823, is one of the UKs largest and most dynamic universities. Through partnerships with institutions like Auston, LJMU extends its globally recognized education across Asia.'
  }
} as const;

// Refactored getUniversityKey function using a lookup map for aliases
const universityKeyMap: Record<string, keyof typeof universityDetails> = {
  'auston university singapore': 'auston_singapore',
  'auston singapore': 'auston_singapore',
  'auston sg': 'auston_singapore',
  'auston institute singapore': 'auston_singapore',
  'auston college myanmar': 'auston_myanmar',
  'auston myanmar': 'auston_myanmar',
  'ljmu': 'ljmu',
  'liverpool john moores university': 'ljmu',
  'ljmu uk': 'ljmu',
  'john moores university': 'ljmu'
};

export function getUniversityKey(universityName: string): keyof typeof universityDetails | null {
  return universityKeyMap[universityName.toLowerCase()] || null;
}