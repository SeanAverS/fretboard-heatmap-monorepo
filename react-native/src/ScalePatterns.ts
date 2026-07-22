/**
 * Scale and chord interval patterns (relative to root note)
 */
export const ScalePatterns: { [key: string]: number[] } = {
  // Major Scale: 1, 2, 3, 4, 5, 6, 7
  'major': [0, 2, 4, 5, 7, 9, 11],
  // Minor Scale: 1, 2, b3, 4, 5, b6, b7
  'minor': [0, 2, 3, 5, 7, 8, 10],
  // Major Chord: 1, 3, 5
  'major-chord': [0, 4, 7],
  // Minor Chord: 1, b3, 5
  'minor-chord': [0, 3, 7],
};
