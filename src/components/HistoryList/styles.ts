import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.bluegrey200,
    justifyContent: 'space-between',
  },
  itemColumn: {
    flexDirection: 'column',
  },
  firstRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRow: {
    flexDirection: 'row',
  },
  itemDefaultText: {
    fontSize: 18,
    paddingRight: 10,
    color: Colors.white,
  },
  itemCommissionText: {
    fontSize: 12,
    paddingRight: 10,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  itemTextBold: {
    fontWeight: 'bold',
  },
  itemGreenText: {
    color: Colors.green500,
  },
  itemRedText: {
    color: Colors.red500,
  },
  itemCyanText: {
    color: Colors.cyan500,
  },
  ctaButtonContainer: {
    justifyContent: 'center',
  },
  metricContainer: {
    marginVertical: 5,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemMetricText: {
    fontSize: 14,
    color: Colors.white70,
  },
});
