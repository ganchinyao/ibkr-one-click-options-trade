import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  titleText: {
    fontSize: 14,
    color: Colors.bluegrey700,
  },
  currencyInput: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    borderColor: Colors.green500,
    maxWidth: '40%',
    marginTop: 2,
  },
});
