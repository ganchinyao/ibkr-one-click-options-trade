import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {},
  titleText: {
    fontSize: 12,
    color: Colors.white70,
  },
  currencyInput: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    borderColor: Colors.green500,
    maxWidth: '40%',
    minWidth: 120,
    marginTop: 2,
    color: Colors.white70,
  },
});
