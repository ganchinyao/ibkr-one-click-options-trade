import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';
import { ChipProps } from './types';

const Chip: React.FC<ChipProps> = ({ text, isSelected, onPress, containerStyle }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPress && onPress();
      }}
    >
      <View
        style={[styles.container, isSelected ? styles.selectedContainer : styles.unselectedContainer, containerStyle]}
      >
        <Text style={[styles.textContent, isSelected ? styles.selectedText : styles.unselectedText]}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Chip;
