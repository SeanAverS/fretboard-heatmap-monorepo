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
      {/* Top Header */}
      <View style={styles.topNavContainer}>
        {/* Balance Top Header Items */}
        <View style={styles.navSideContainer} />

        {/* Navigation */}
        <View style={styles.navCenterContainer}>
          <TouchableOpacity 
            onPress={() => setShowLabels((prev) => !prev)}
            style={styles.navItem}
          >
            <Text style={[styles.navText, showLabels && styles.activeNavText]}>
              LABELS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setActivePattern('major-chord')}
            style={styles.navItem}
          >
            <Text style={[styles.navText, topMenu === 'chords' && styles.activeNavText]}>
              CHORDS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setActivePattern('major')}
            style={styles.navItem}
          >
            <Text style={[styles.navText, topMenu === 'scales' && styles.activeNavText]}>
              SCALES
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dropdown + Balance Top Header Item */}
        <View style={[styles.navSideContainer, styles.navRightContainer]}>
          <PatternSelector activePattern={activePattern} onSelectPattern={setActivePattern} />
        </View>
      </View>

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

      {/* Bottom Menu Labels */}
      <View style={styles.selectors}>
        <RootSelector activeRoot={activeRoot} onSelectRoot={setActiveRoot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  topNavContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
    width: '100%',
  },
  navSideContainer: {
    flex: 1,
  },
  navRightContainer: {
    alignItems: 'flex-end',
  },
  navCenterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  navItem: {
    paddingVertical: 4,
  },
  navText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  activeNavText: {
    color: '#FFCC00',
  },
  boardContainerWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  selectors: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
});

export default App;