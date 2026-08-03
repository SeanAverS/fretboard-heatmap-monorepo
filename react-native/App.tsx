import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RootSelector } from './src/RootSelector';
import { PatternSelector } from './src/PatternSelector';
import { Fretboard } from './src/Fretboard';
import { generateRootNoteMap } from './src/RootNotePositions';
import { getHeatmap } from './src/HeatmapEngine';

function App(): React.JSX.Element {
  const [activeRoot, setActiveRoot] = useState<string>('G');
  const [activePattern, setActivePattern] = useState<string>('major');
  const [showLabels, setShowLabels] = useState<boolean>(false);

  const rootNoteMap = useMemo(() => generateRootNoteMap(), []);

  // Detect if pattern is in 'scales' or 'chords' mode
  const topMenu: 'scales' | 'chords' = useMemo(() => {
    return activePattern.toLowerCase().includes('chord') ? 'chords' : 'scales';
  }, [activePattern]);

  const heatMap = useMemo(() => {
    if (activePattern === 'Root Only') {
      return rootNoteMap[activeRoot];
    }
    return getHeatmap(activeRoot, activePattern);
  }, [activeRoot, activePattern, rootNoteMap]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fretboard Heatmap</Text>
      
      {/* Fretboard */}
      <View style={styles.boardContainerWrapper}>
        <Fretboard 
          fretMap={heatMap} 
          rootNotePositions={rootNoteMap[activeRoot]} 
          topMenu={topMenu}
          dropdownChoice={activePattern}
          root={activeRoot}
          showLabels={showLabels}
        />
      </View> 

      {/* Bottom Row */}
      <View style={styles.selectors}>
        <RootSelector activeRoot={activeRoot} onSelectRoot={setActiveRoot} />
        
        <PatternSelector activePattern={activePattern} onSelectPattern={setActivePattern} />
        
        <TouchableOpacity 
          style={[styles.labelButton, showLabels && styles.labelButtonActive]}
          onPress={() => setShowLabels((prev) => !prev)}
        >
          <Text style={[styles.labelButtonText, showLabels && styles.labelButtonTextActive]}>
            {showLabels ? 'Hide' : 'Labels'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 4,
    fontWeight: 'bold',
  },
  boardContainerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  selectors: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  labelButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelButtonActive: {
    backgroundColor: '#007AFF',
  },
  labelButtonText: {
    color: '#AAAAAA',
    fontWeight: '600',
    fontSize: 13,
  },
  labelButtonTextActive: {
    color: '#FFFFFF',
  },
});

export default App;