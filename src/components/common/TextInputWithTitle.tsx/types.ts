import { ViewStyle } from 'react-native';

export interface TextInputWithTitleProps {
  value: string | number;
  onChangeValue: ((newValue: number) => void) | ((newValue: string) => void);
  type?: 'currency' | 'text';
  titleText?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
}
