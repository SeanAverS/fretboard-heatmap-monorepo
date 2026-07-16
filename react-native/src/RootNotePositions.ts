import { NoteAlphabet } from './NoteAlphabet';
import { GuitarSpecs } from './GuitarSpecs';
import { RootNoteMap } from './types';

/**
 * Generates RootNoteMap based on standard tuning and NoteAlphabet logic.
 * 
 * @returns RootNoteMap object with all positions of bottom menu roots
 */
export const generateRootNoteMap = (): RootNoteMap => {
  const rootNoteMap: RootNoteMap = {};

  GuitarSpecs.roots.forEach((root) => {
    rootNoteMap[root] = {}; // Object for each root  

    // Process current string of each root 
    for (let s = 0; s < GuitarSpecs.strings.length; s++) {
      rootNoteMap[root][s] = []; // Store frets for current string   
      
      // Add root note to return object using current string and current fret  
      for (let f = 0; f <= GuitarSpecs.frets.length; f++) {
        if (NoteAlphabet.getNoteName(s, f) === root) {
          rootNoteMap[root][s].push(f); 
        }
      }
    }
  });

  return rootNoteMap;
};
