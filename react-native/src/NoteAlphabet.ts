/**
 * Prepare musical notes for FretLabels
 */
export class NoteAlphabet {
  private static readonly notes = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];

  // Fret positions (standard tuning, high E to low E)
  private static readonly openStringIndex = [4, 11, 7, 2, 9, 4];

  /**
   * Find musical note for current fretboard position
   * Formula: (open string position + current fret) % 12
   * - Modulo keeps index in musical note range 
   *
   * @param stringIndex - The current string
   * @param fret - The current fret
   * @returns - Musical note for current position
   */
  static getNoteName(stringIndex: number, fret: number): string {
    if (stringIndex < 0 || stringIndex >= this.openStringIndex.length) {
      return '';
    }

    const notePosition = (this.openStringIndex[stringIndex] + fret) % 12;
    return this.notes[notePosition];
  }

  /**
   * Get the index of a note name
   * @param noteName - The name of the note
   * @returns - Index of the note (0-11) or -1 if not found
   */
  static getNoteIndex(noteName: string): number {
    return this.notes.indexOf(noteName);
  }
}
