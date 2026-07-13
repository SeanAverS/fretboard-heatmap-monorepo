export type MenuChoice = 'chords' | 'scales';

/**
 * Fret positions for active string 
 * @example { 0: [3], 1: [2, 5] } -> String 0 (Low E) has a note on Fret 3
 */
export interface FretMap {
  [stringIndex: number]: number[]; 
}

/**
 * Finger positions for current string 
 * @example { "1-3": "3" } -> String 1 (B), Fret 3 uses Finger 3
 */
export interface ChordFingerNumbers {
  [stringFretKey: string]: string; 
}
  
/**
 * Fretboard positions for chosen root 
 * @example 
 * 'G': {
    0: [3, 15] -> For G root, String 0 (Low E) contains root notes on Frets 3 and 15  
  }, 
 */ 
export interface RootNoteMap {
  [root: string]: {  
    [stringIndex: number]: number[]; 
  };
}

/**
 * Fretboard positions for chord/scale patterns of chosen root 
 * @example 
 * chords: {
    'G': { 0: [3], 1: [2], 2: [0], 3: [0], 4: [3], 5: [3] } -> G maj chord positions
  },
 */ 
export interface DropdownData {
  [choice: string]: { 
    [root: string]: FretMap; 
  };
}

/**
 * Fretboard positions for finger number/fret label of chosen root 
 * @example 
 chords: {
    'C': {
      "1-3": "3" -> For C root, String 1 Fret 3 has finger number/label on Fret 3
    },
 */ 
export interface FingerNumberData {
  [choice: string]: { 
    [root: string]: ChordFingerNumbers; 
  };
}
