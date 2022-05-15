import { ViewStyle } from 'react-native';
import { BuyResponse } from '../../api/types';

export interface BoughtListProps {
  containerStyle?: ViewStyle;
}
export interface BoughtItemProps {
  item: BuyResponse;
}
