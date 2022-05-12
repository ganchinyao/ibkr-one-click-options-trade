import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green500,
  },
  smallContainer: {
    minWidth: 64,
    height: 32,
    paddingHorizontal: 10,
  },
  normalContainer: {
    minWidth: 96,
    height: 40,
    paddingHorizontal: 10,
  },
  bigContainer: {
    minWidth: 128,
    height: 48,
    paddingHorizontal: 10,
  },
  textContent: {
    textAlign: 'center',
    fontSize: 24,
    color: Colors.white,
  },
  smallText: {
    fontSize: 16,
  },
  normalText: {
    fontSize: 20,
  },
  bigText: {
    fontSize: 24,
  },
});
