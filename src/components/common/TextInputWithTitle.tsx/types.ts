import { KeyboardTypeOptions, ViewStyle } from 'react-native';

export interface TextInputWithTitleProps {
  value: string | number;
  onChangeValue: ((newValue: number) => void) | ((newValue: string) => void);
  type?: 'currency' | 'text';
  keyboardType?: KeyboardTypeOptions;
  titleText?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
}
