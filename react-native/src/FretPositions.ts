import { GuitarSpecs } from './GuitarSpecs';

/**
 * Calculated coordinate for note circle position 
 */
export interface FretCoordinate {
  stringIndex: number;
  fretIndex: number;
  x: number;
  y: number;
}

/**
 * Finger number assigned to string
 */
const fingerNumbers: { [key: string]: { [key: string]: { [key: string]: string } } } = {
    "Major": {
            "G": {"5,3": "2", "4,2": "1", "0,3": "3"},
            "D": {"2,2": "1", "1,3": "3", "0,2": "2"},
            "C": {"4,3": "3", "3,2": "2", "1,1": "1"},
            "E": {"2,1": "1", "3,2": "3", "4,2": "2"},
            "A": {"3,2": "1", "2,2": "2", "1,2": "3"}
        },
    "Minor": {
        "A": {"1,1": "1", "2,2": "3", "3,2": "2"},
        "E": {"3,2": "2", "4,2": "1"},
        "D": {"0,1": "1", "1,3": "3", "2,2": "2"},
        "C": {"3,5": "3", "2,5": "4", "1,4": "2", "0,3": "1"},
        "G": {"5,3": "1", "4,5": "3", "3,5": "4", "2,3": "1", "1,3": "1", "0,3": "1"}
    }
};

/**
 * Get finger numbers for chords
 * @returns finger number positions for chords
 */
export const getFingerNumber = (dropdownChoice: string, root: string, stringIndex: number, fretIndex: number): string => {
    const chordType = dropdownChoice.includes('major') ? 'Major' : 'Minor';
    const key = `${stringIndex},${fretIndex}`;
    
    return fingerNumbers[chordType]?.[root]?.[key] ?? "";
};

/**
 * Calculates and returns horizonal fret positions.
 */
export const getFretLineXPositions = (): number[] => {
  const fretXPositions: number[] = [GuitarSpecs.NECK_HORIZONTAL_PADDING];
  let currentX = GuitarSpecs.NUT_WIDTH + GuitarSpecs.NECK_HORIZONTAL_PADDING;
  for (let i = 0; i < GuitarSpecs.frets.length; i++) {
    currentX += GuitarSpecs.frets[i];
    fretXPositions.push(currentX);
  }
  return fretXPositions;
};

/**
 * Calculates and returns coordinates for all fret/string positions.
 * 
 * @returns Array of FretCoordinate objects to render
 */
export const getFretPositions = (): FretCoordinate[] => {
  const positions: FretCoordinate[] = [];
  const fretXPositions = getFretLineXPositions();

  // Calculate string positions (y-coordinates)
  const stringYPositions = GuitarSpecs.strings.map((_, index) => 
    // Evenly space strings along fretboard 
    (index * (GuitarSpecs.FRET_BOARD_HEIGHT / GuitarSpecs.strings.length)) + 20
  );

  // Place each string/fret position along fretboard 
  for (let s = 0; s < GuitarSpecs.strings.length; s++) {
    for (let f = 1; f <= GuitarSpecs.frets.length; f++) {
      const midX = (fretXPositions[f - 1] + fretXPositions[f]) / 2;
      
      positions.push({
        stringIndex: s,
        fretIndex: f,
        x: midX,
        y: stringYPositions[s],
      });
    }
  }

  return positions;
};
