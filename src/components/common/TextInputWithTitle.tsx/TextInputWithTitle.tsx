import React from 'react';
import { View, Text, TextInput } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { styles } from './styles';
import { TextInputWithTitleProps } from './types';

const TextInputWithTitle: React.FC<TextInputWithTitleProps> = ({
  value,
  onChangeValue,
  type,
  keyboardType,
  titleText,
  containerStyle,
  titleTextStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.titleText, titleTextStyle]}>{titleText}</Text>
      {type === 'currency' ? (
        <CurrencyInput
          value={value as number}
          onChangeValue={onChangeValue as (newValue: number) => void}
          prefix="$"
          delimiter=","
          separator="."
          minValue={0}
          style={styles.currencyInput}
        />
      ) : (
        <TextInput
          style={styles.currencyInput}
          value={value as string}
          onChangeText={(newText) => {
            onChangeValue(newText.toLocaleUpperCase());
          }}
          keyboardType={keyboardType}
        />
      )}
    </View>
  );
};

export default TextInputWithTitle;
