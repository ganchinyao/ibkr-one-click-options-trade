import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  overallInputContainer: {
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: 'row',
  },
  chipStyle: {
    marginRight: 10,
  },
  usdChipStyle: {
    minWidth: 40,
  },
  contractChipStyle: {
    minWidth: 60,
  },
  inputRow: {
    marginTop: 10,
    flexDirection: 'row',
  },
  inputContainer: {
    marginRight: 10,
  },
  buyMethodContainer: {
    marginTop: 14,
  },
  buyMethodText: {
    fontSize: 14,
  },
  buyMethodModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyMethodModal: {
    backgroundColor: Colors.bluegrey700,
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 80,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buyMethodTouchableOpacity: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10,
  },
  buyMethodContractButton: {
    marginBottom: 20,
    width: 200,
  },
  buyMethodUSDButton: {
    width: 200,
  },
});
