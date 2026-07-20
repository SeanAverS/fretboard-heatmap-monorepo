// Style the guitar fretboard and handle root note labels   

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GuitarSpecs } from './GuitarSpecs';
import { getFretPositions } from './FretPositions';
import { RootNoteMap } from './types';

interface FretboardProps {
  activeRoot: string; // the selected root 
  rootNoteMap: RootNoteMap; // fretboard positions of selected root
}

export const Fretboard: React.FC<FretboardProps> = ({ activeRoot, rootNoteMap }) => {
  const fretPositions = getFretPositions();

  return (
    <View style={styles.boardContainer}>
      <View style={styles.neck} />
      
      {fretPositions.map((pos, index) => {
        const isRoot = rootNoteMap[activeRoot][pos.stringIndex]?.includes(pos.fretIndex); // current fretboard position in specific root map 
        
        return (
          <View
            key={index}
            style={[
              styles.circle,
              {
                left: pos.x - GuitarSpecs.CIRCLE_SIZE / 2,
                top: pos.y - GuitarSpecs.CIRCLE_SIZE / 2,
                backgroundColor: isRoot ? '#FF3B30' : 'rgba(255,255,255,0.1)', // style root note differently 
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    width: 730, 
    height: GuitarSpecs.FRET_BOARD_HEIGHT,
    position: 'relative',
  },
  neck: {
    position: 'absolute',
    top: 0,
    left: -18, // push beginning of guitar neck
    right: -99,   // extend end of guitar neck 
    height: GuitarSpecs.FRET_BOARD_HEIGHT,
    backgroundColor: '#4A3728',
    borderRadius: 5,
  },
  circle: {
    position: 'absolute',
    width: GuitarSpecs.CIRCLE_SIZE,
    height: GuitarSpecs.CIRCLE_SIZE,
    borderRadius: GuitarSpecs.CIRCLE_SIZE / 2,
  },
});
