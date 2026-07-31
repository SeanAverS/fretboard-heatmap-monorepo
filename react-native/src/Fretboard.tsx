// Style the guitar fretboard and handle root note labels   

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GuitarSpecs } from './GuitarSpecs';
import { getFretPositions } from './FretPositions';
import { FretMap } from './types';

interface FretboardProps {
  fretMap: FretMap;
  rootNotePositions: FretMap;
}

/**
 * Renders the fretboard and Heatmap. 
 */
export const Fretboard: React.FC<FretboardProps> = ({ fretMap, rootNotePositions }) => {
  const fretPositions = getFretPositions();

  // Calculate vertical string positions
  const stringYPositions = GuitarSpecs.strings.map((_, index) => 
    (index * (GuitarSpecs.FRET_BOARD_HEIGHT / GuitarSpecs.strings.length)) + 20
  );

  // Calculate horizontal fret positions
  const fretXPositions: number[] = [GuitarSpecs.NECK_HORIZONTAL_PADDING]; 
  let currentX = GuitarSpecs.NUT_WIDTH + GuitarSpecs.NECK_HORIZONTAL_PADDING;
  for (let i = 0; i < GuitarSpecs.frets.length; i++) {
    currentX += GuitarSpecs.frets[i];
    fretXPositions.push(currentX);
  }

  return (
    <View style={styles.boardContainer}>
      <View style={[styles.nut, { left: GuitarSpecs.NECK_LEFT_OFFSET }]} />
      <View style={styles.neck} />
      
      {/* Frets */}
      {fretXPositions.map((x, index) => (
        <View key={`fret-${index}`} style={[styles.fretLine, { left: x }]} />
      ))}

      {/* Strings */}
      {stringYPositions.map((y, index) => (
        <View key={`string-${index}`} style={[styles.stringLine, { top: y, height: GuitarSpecs.strings[index] }]} />
      ))}
      
      {/* Notes */}
      {fretPositions.map((pos, index) => {
        const isRoot = rootNotePositions[pos.stringIndex]?.includes(pos.fretIndex);
        const isNonRoot = fretMap[pos.stringIndex]?.includes(pos.fretIndex);
        
        let backgroundColor = 'rgba(255,255,255,0.1)';
        if (isRoot) {
            backgroundColor = '#FF3B30';
        } else if (isNonRoot) {
            backgroundColor = '#007AFF';
        }
        
        return (
          <View
            key={index}
            style={[
              styles.circle,
              {
                left: pos.x - GuitarSpecs.CIRCLE_SIZE / 2,
                top: pos.y - GuitarSpecs.CIRCLE_SIZE / 2,
                backgroundColor: backgroundColor,
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
    left: GuitarSpecs.NECK_LEFT_OFFSET,
    right: GuitarSpecs.NECK_RIGHT_OVERFLOW,
    height: GuitarSpecs.FRET_BOARD_HEIGHT,
    backgroundColor: '#2c1609', // Mahogany
    borderRadius: 5,
  },
  fretLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: GuitarSpecs.WIRE_WIDTH,
    backgroundColor: '#c0c0c0', // Silver fret wire
  },
  stringLine: {
    position: 'absolute',
    left: GuitarSpecs.NECK_LEFT_OFFSET,
    right: GuitarSpecs.NECK_RIGHT_OVERFLOW,
    backgroundColor: '#e0e0e0', // String color
  },
  circle: {
    position: 'absolute',
    width: GuitarSpecs.CIRCLE_SIZE,
    height: GuitarSpecs.CIRCLE_SIZE,
    borderRadius: GuitarSpecs.CIRCLE_SIZE / 2,
  },
  nut: {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: GuitarSpecs.NUT_WIDTH, 
  backgroundColor: '#FFFDD0',
  zIndex: 2,
},
});
