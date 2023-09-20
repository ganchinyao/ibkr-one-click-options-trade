import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { RadioButtonProps } from './types';

const RadioButton = ({ label, checked, onPress }: RadioButtonProps) => {
  return (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={[styles.circle]}>{checked ? <View style={styles.checkedCircle} /> : null}</View>
      <Text style={styles.optionText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;
