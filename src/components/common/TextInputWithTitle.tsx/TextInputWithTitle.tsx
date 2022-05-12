import React from 'react';
import { View, Text } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { selectContractAmtUSD, useAppDispatch, useAppSelector } from '../../../store';
import { styles } from './styles';
import { TextInputWithTitleProps } from './types';

const TextInputWithTitle: React.FC<TextInputWithTitleProps> = ({
  onChangeValue,
  titleText,
  placeholder,
  containerStyle,
}) => {
  const contractAmtUSD = useAppSelector(selectContractAmtUSD);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.titleText}>{titleText}</Text>
      <CurrencyInput
        value={contractAmtUSD}
        onChangeValue={onChangeValue}
        prefix="$"
        delimiter=","
        separator="."
        minValue={0}
        style={styles.currencyInput}
      />
    </View>
  );
};

export default TextInputWithTitle;
