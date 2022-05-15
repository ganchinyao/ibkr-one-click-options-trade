import { ViewStyle } from 'react-native';
import { BuyResponse, SellResponse } from '../../api/types';

export interface HistoryListProps {
  historyList: (BuyResponse | SellResponse)[];
  refresh?: () => void;
  containerStyle?: ViewStyle;
}
export interface HistoryItemProps {
  item: BuyResponse | SellResponse;
}
