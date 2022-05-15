import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    height: 32,
    minWidth: 96,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  selectedContainer: {
    backgroundColor: Colors.green500,
    borderColor: Colors.green700,
    borderWidth: 1,
  },
  unselectedContainer: {
    backgroundColor: Colors.white90,
    borderColor: Colors.green700,
    borderWidth: 1,
  },
  textContent: {
    textAlign: 'center',
    fontSize: 16,
  },
  selectedText: {
    color: Colors.white,
  },
  unselectedText: {
    color: Colors.black,
  },
});
