import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootSelector } from './src/RootSelector';
import { PatternSelector } from './src/PatternSelector';
import { Fretboard } from './src/Fretboard';
import { generateRootNoteMap } from './src/RootNotePositions';
import { getHeatmap } from './src/HeatmapEngine';

function App(): React.JSX.Element {
  const [activeRoot, setActiveRoot] = useState<string>('G');
  const [activePattern, setActivePattern] = useState<string>('major');
  const rootNoteMap = useMemo(() => generateRootNoteMap(), []);

  const heatMap = useMemo(() => {
    if (activePattern === 'Root Only') {
      return rootNoteMap[activeRoot];
    }
    return getHeatmap(activeRoot, activePattern);
  }, [activeRoot, activePattern, rootNoteMap]);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Fretboard Heatmap</Text>
        
        <View style={styles.boardContainerWrapper}>
          <Fretboard fretMap={heatMap} />
        </View>
        
        <View style={styles.selectors}>
          <RootSelector activeRoot={activeRoot} onSelectRoot={setActiveRoot} />
          <PatternSelector activePattern={activePattern} onSelectPattern={setActivePattern} />
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
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  // custom safe area for extending guitar neck width
  boardContainerWrapper: {
    width: '100%',
    alignItems: 'center'
  },
  selectors: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  }
});

export default App;