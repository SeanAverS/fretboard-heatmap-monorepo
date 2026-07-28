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
    // Handle Fret 0 
    positions.push({
      stringIndex: s,
      fretIndex: 0,
      x: GuitarSpecs.NECK_HORIZONTAL_PADDING / 2,
      y: stringYPositions[s],
    });

    // Handle Frets 1 to 12
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
