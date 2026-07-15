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
 * Calculates and returns coordinates for all fret/string positions.
 * 
 * @returns Array of FretCoordinate objects to render
 */
export const getFretPositions = (): FretCoordinate[] => {
  const positions: FretCoordinate[] = [];

  // Calculate fret positions (x-coordinates)
  const fretXPositions: number[] = [0]; // Guitar nut 

  // Account for guitar nut + neck spacing
  let currentX = GuitarSpecs.NUT_WIDTH + GuitarSpecs.NECK_HORIZONTAL_PADDING;
  
  for (let i = 0; i < GuitarSpecs.frets.length; i++) {
    fretXPositions.push(currentX);
    // Shorten frets while moving up neck 
    currentX += GuitarSpecs.frets[i] + GuitarSpecs.WIRE_WIDTH;
  }

  // Calculate string positions (y-coordinates)
  const stringYPositions = GuitarSpecs.strings.map((_, index) => 
    // Evenly space strings along fretboard 
    (index * (GuitarSpecs.FRET_BOARD_HEIGHT / GuitarSpecs.strings.length)) + 20
  );

  // Place each string/fret position along fretboard 
  for (let s = 0; s < GuitarSpecs.strings.length; s++) {
    for (let f = 0; f <= GuitarSpecs.frets.length; f++) {
      positions.push({
        stringIndex: s,
        fretIndex: f,
        x: fretXPositions[f],
        y: stringYPositions[s],
      });
    }
  }

  return positions;
};
