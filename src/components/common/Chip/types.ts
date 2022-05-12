import { ViewStyle } from 'react-native';

export interface ChipProps {
  text: string;
  isSelected?: boolean;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}
