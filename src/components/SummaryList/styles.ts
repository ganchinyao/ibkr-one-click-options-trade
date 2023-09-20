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
  itemTitleText: {
    color: Colors.orange500,
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
  ctaButtonContainer: {
    justifyContent: 'center',
  },
});
