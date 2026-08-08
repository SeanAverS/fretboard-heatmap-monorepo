// Dropdown for heatmap display options 

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, SectionList, TouchableWithoutFeedback } from 'react-native';
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
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>{activePattern.toUpperCase()}</Text>
        <Text style={styles.chevron}> ∨</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        supportedOrientations={['landscape', 'landscape-left', 'landscape-right']}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.dropdownCard}>
                <SectionList
                  sections={sections}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                  renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.headerText}>{title.toUpperCase()}</Text>
                  )}
                  renderItem={({ item, index, section }) => {
                    const isLast = index === section.data.length - 1;
                    const isSelected = item === activePattern;

                    return (
                      // Hide dropdown after selection
                      <TouchableOpacity
                        style={[
                          styles.optionItem,
                          !isLast && styles.rowBorder,
                        ]}
                        onPress={() => {
                          onSelectPattern(item);
                          setModalVisible(false);
                        }}
                        activeOpacity={0.6}
                      >
                        <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  buttonText: {
    color: '#FFCC00',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  chevron: {
    color: '#FFCC00',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'flex-end',
    paddingTop: 36,
  },
  dropdownCard: {
    backgroundColor: 'rgba(235, 235, 240, 0.94)', 
    borderRadius: 16,
    width: 180,
    maxHeight: 220,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  headerText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8E8E93',
    backgroundColor: 'rgba(225, 225, 230, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    letterSpacing: 0.5,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(60, 60, 67, 0.18)',
  },
  optionText: {
    fontSize: 13,
    color: '#2C2C2E',
    fontWeight: '400',
  },
  selectedOptionText: {
    fontWeight: '700',
    color: '#000000',
  },
});