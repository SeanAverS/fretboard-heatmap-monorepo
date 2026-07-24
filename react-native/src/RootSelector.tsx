// Handle styling of bottom menu root labels

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GuitarSpecs } from './GuitarSpecs';

interface SelectorProps {
  /** the selected bottom menu label */
  activeRoot: string; 
  /** callback to handle bottom menu label selection */
  onSelectRoot: (root: string) => void; 
}

/**
 * Renders the bottom menu labels for selecting the root. 
 */
export const RootSelector: React.FC<SelectorProps> = ({ activeRoot, onSelectRoot }) => {
  return (
    <View style={styles.container}>
      {GuitarSpecs.roots.map((root) => (
        <TouchableOpacity
          key={root}
          style={[styles.button, activeRoot === root && styles.activeButton]} // style selected label button
          onPress={() => onSelectRoot(root)} // handle label press
        >
          <Text style={[styles.text, activeRoot === root && styles.activeText]}>{root}</Text> 
          {/* style selected label text */}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeText: {
    color: '#fff',
  },
});
