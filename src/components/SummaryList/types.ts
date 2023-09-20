import { ViewStyle } from 'react-native';
import { Summary } from '../../api/types';

export interface SummaryListProps {
  summaryList: Summary[];
  refresh?: () => void;
  containerStyle?: ViewStyle;
}
export interface SummaryListItemProps {
  item: Summary;
}
