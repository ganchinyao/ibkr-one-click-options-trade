import { ViewStyle } from 'react-native';

export interface TextInputWithTitleProps {
  onChangeValue: (newValue: number) => void;
  titleText?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
}
