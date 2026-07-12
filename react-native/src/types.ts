export type MenuChoice = 'chords' | 'scales';

/**
 * Map active string to active fret
 * @example { 0: [3], 1: [2, 5] } -> String 0 (Low E) has a note on Fret 3
 */
export interface FretMap {
  [stringIndex: number]: number[]; 
}

/**
 * Map string-fret combo to specific finger
 * @example { "1-3": "3" } -> String 1, Fret 3 uses ring finger (3)
 */
export interface ChordFingerNumbers {
  [stringFretKey: string]: string; 
}
  
/**
 * All fretboard positions for each root 
 * @example 
 * 'G': {
    0: [3, 15] -> G root note appears on fret 3 and 15 of Low E string 
  }, 
 */ 
export interface RootNoteMap {
  [root: string]: {  
    [stringIndex: number]: number[]; 
  };
}

/**
 * All fretboard positions for chord/scale patterns of each root 
 * @example 
 * chords: {
    'G': { 0: [3], 1: [2], 2: [0], 3: [0], 4: [3], 5: [3] } -> G major chord positions 
  },
 */ 
export interface DropdownData {
  [choice: string]: { 
    [root: string]: FretMap; 
  };
}

/**
 * All fretboard positions for finger number/fret label of each root 
 * @example 
 chords: {
    'C': {
      "1-3": "3" -> on the A string, 3rd fret, Use finger 3
    },
 */ 
export interface FingerNumberData {
  [choice: string]: { 
    [root: string]: ChordFingerNumbers; 
  };
}
