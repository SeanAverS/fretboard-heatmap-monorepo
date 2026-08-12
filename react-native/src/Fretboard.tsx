// Style the guitar fretboard and handle root note labels   

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GuitarSpecs } from './GuitarSpecs';
import { getFretPositions, getFingerNumber } from './FretPositions';
import { FretMap } from './types';
import { NoteAlphabet } from './NoteAlphabet';

interface FretboardProps {
  fretMap: FretMap;
  rootNotePositions: FretMap;
  topMenu: 'scales' | 'chords' | null;
  dropdownChoice: string;
  root: string;
  showLabels: boolean;
}

/**
 * Renders the fretboard and Heatmap. 
 */
export const Fretboard: React.FC<FretboardProps> = ({ 
  fretMap, 
  rootNotePositions,
  topMenu,
  dropdownChoice,
  root,
  showLabels
}) => {
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
      
      {/* Inlays */}
      {[3, 5, 7, 9, 12].map(fretNumber => {
        const leftX = fretXPositions[fretNumber - 1];
        const rightX = fretXPositions[fretNumber];
        const centerX = (leftX + rightX) / 2;
        
        const dotRadius = 9;
        const centerY = GuitarSpecs.FRET_BOARD_HEIGHT / 2;

        if (fretNumber === 12) {
          return (
            <React.Fragment key="inlay-12">
              {/* Gap between B & G strings */}
              <View style={[styles.inlayDot, { left: centerX - dotRadius, top: centerY - 60 }]} />
              {/* Gap between D & A strings */}
              <View style={[styles.inlayDot, { left: centerX - dotRadius, top: centerY + 33 }]} />
            </React.Fragment>
          );
        }
        
        return (
          <View 
            key={`inlay-${fretNumber}`} 
            style={[
              styles.inlayDot, 
              { 
                left: centerX - dotRadius, 
                top: centerY - dotRadius 
              }
            ]} 
          />
        );
      })}

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
        
        if (!isRoot && !isNonRoot) {
          return null;
        }

        const backgroundColor = isRoot ? '#FF3B30' : '#007AFF';

        // Determine label display
        const label = showLabels ? (
            topMenu === 'scales' ? NoteAlphabet.getNoteName(pos.stringIndex, pos.fretIndex) :
            topMenu === 'chords' ? getFingerNumber(dropdownChoice, root, pos.stringIndex, pos.fretIndex) :
            ''
        ) : '';
        
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
          >
            {label !== '' && <Text style={styles.label}>{label}</Text>}
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
      color: 'white',
      fontWeight: 'bold',
  },
  nut: {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: GuitarSpecs.NUT_WIDTH, 
  backgroundColor: '#FFFDD0',
  zIndex: 2,
},
  inlayDot: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.56)',
  },
});
