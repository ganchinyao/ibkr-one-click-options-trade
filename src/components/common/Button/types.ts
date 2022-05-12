import { TextStyle, ViewStyle } from 'react-native';

export enum ButtonType {
  Filled,
  Outline,
}

export enum ButtonSize {
  small,
  normal,
  big,
}

export interface ButtonProps {
  text: string;
  onPress: () => void;
  type?: ButtonType;
  size?: ButtonSize;
  buttonColor?: string;
  textColor?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}
