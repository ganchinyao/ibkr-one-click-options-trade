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
  itemRow: {
    flexDirection: 'row',
  },
  itemDefaultText: {
    fontSize: 18,
    paddingRight: 10,
    color: Colors.white,
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
  deleteIconContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  ctaButtonContainer: {
    flex: 1,
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
