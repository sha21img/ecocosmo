import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

export const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 93, 191, 0.8)',
    paddingVertical: 35,
    paddingHorizontal: 24,
    justifyContent: 'center'
  },
  modalBody: {
    alignItems: 'center',
    width: '77%',
    minHeight: '20%',
    borderRadius: 20,
    paddingVertical: 40,
  },
  loginButton: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '47%',
    paddingVertical: 20,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: Size.extraLarge,
    fontWeight: 'bold',
  },
});
