import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootSelector } from './src/RootSelector';
import { Fretboard } from './src/Fretboard';
import { generateRootNoteMap } from './src/RootNotePositions';

function App(): React.JSX.Element {
  const [activeRoot, setActiveRoot] = useState<string>('G');
  const rootNoteMap = useMemo(() => generateRootNoteMap(), []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fretboard Heatmap</Text>
      
      <Fretboard activeRoot={activeRoot} rootNoteMap={rootNoteMap} />
      
      <RootSelector activeRoot={activeRoot} onSelectRoot={setActiveRoot} />
    </SafeAreaView>
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
    marginVertical: 20,
    fontWeight: 'bold',
  },
});

export default App;