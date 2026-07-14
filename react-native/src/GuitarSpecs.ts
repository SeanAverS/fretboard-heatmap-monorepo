/**
 * Data for the Guitar Frets, Strings, and Root Notes
 */
export const GuitarSpecs = {
  /**
   * Map fret width (from 1-12)
   */
  frets: [90, 85, 80, 75, 71, 67, 63, 60, 56, 53, 50, 47],

  /**
   * Map string thickness (from high E to low E)
   */
  strings: [0.8, 1.2, 1.8, 2.5, 3.2, 4.0],

  /**
   * Root note bottom menu labels
   */
  roots: ['G', 'D', 'C', 'E', 'A'],

   /** Bone nut width */
  NUT_WIDTH: 10,

  /** Fret wire width */
  WIRE_WIDTH: 3,

  /** Height of fretboard */
  FRET_BOARD_HEIGHT: 280,

  /** Offset padding to center heatmap notes */
  NECK_HORIZONTAL_PADDING: 45,

  /** heatmap circle size */
  CIRCLE_SIZE: 24, 
};
