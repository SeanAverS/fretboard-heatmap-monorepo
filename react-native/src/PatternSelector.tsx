// Dropdown for heatmap display options 

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, SectionList } from 'react-native';
import { NotePatterns } from './NotePatterns';

interface PatternSelectorProps {
  /** The current dropdown choice */
  activePattern: string;
  /** Callback to handle new dropdown choice  */
  onSelectPattern: (pattern: string) => void;
}

/**
 * Renders a dropdown allowing users to pick scale/chord patterns for the Heatmap.
 */
export const PatternSelector: React.FC<PatternSelectorProps> = ({
  activePattern,
  onSelectPattern,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Menus 
  const sections = [
    {
      title: 'Scales',
      data: Object.keys(NotePatterns).filter(key => !key.includes('chord')),
    },
    {
      title: 'Chords',
      data: Object.keys(NotePatterns).filter(key => key.includes('chord')),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Display dropdown */}
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>{activePattern}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        supportedOrientations={['landscape', 'landscape-left', 'landscape-right']}
      >
        <View style={styles.modalView}>
          <SectionList
            sections={sections}
            keyExtractor={(item) => item}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.headerText}>{title}</Text>
            )}
            renderItem={({ item }) => (
              // Hide dropdown after selection
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => {
                  onSelectPattern(item);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  selectorButton: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#333',
    padding: 10,
    marginTop: 10,
  },
  optionItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
