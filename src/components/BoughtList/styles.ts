import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  listContainer: {},
  itemContainer: {
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
    marginLeft: 10,
    justifyContent: 'center',
  },
});
