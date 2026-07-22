import { NoteAlphabet } from './NoteAlphabet';
import { GuitarSpecs } from './GuitarSpecs';
import { FretMap } from './types';
import { ScalePatterns } from './ScalePatterns';

/**
 * Calculates FretMap for a selected root note and scale. 
 */
export const getScaleFretMap = (
  root: string,
  patternKey: string
): FretMap => {
  const fretMap: FretMap = {};

  const pattern = ScalePatterns[patternKey];
  if (!pattern) return fretMap;

  const rootIndex = NoteAlphabet.getNoteIndex(root);
  if (rootIndex === -1) return fretMap;

  // Calculate notes in selected scale
  const scaleIndices = new Set(
    pattern.map((interval) => (rootIndex + interval) % 12)
  );

  // Initialize fretMap for strings
  for (let s = 0; s < GuitarSpecs.strings.length; s++) {
    fretMap[s] = [];
  }

  // Build fretMap for selected root  
  for (let s = 0; s < GuitarSpecs.strings.length; s++) {
    for (let f = 0; f <= GuitarSpecs.frets.length; f++) {
      // find note name and index
      const noteName = NoteAlphabet.getNoteName(s, f);
      const noteIndex = NoteAlphabet.getNoteIndex(noteName);
      
      // add note to fretmap
      if (scaleIndices.has(noteIndex)) {
        fretMap[s].push(f);
      }
    }
  }

  return fretMap;
};
