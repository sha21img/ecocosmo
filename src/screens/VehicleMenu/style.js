import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

export const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: colors.mainThemeColor1,
  },
  modalBody: {
    paddingTop: 20,
    paddingHorizontal: 20,
    width: '91%',
    alignSelf: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    top: '6%',
  },
  modaldrager: {height: 184, width: 184, bottom: '23%'},
  modalSubheading: {
    fontSize: Size.tiny,
    color: colors.lightGreen,
    bottom: '25%',
  },
  modalHead: {
    bottom: '25%',
    fontSize: Size.compact,
    fontWeight: '600',
    color: colors.subheading,
  },
  buttonContainer: {
    bottom: '20%',
    height: 16,
    width: 267,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.underline,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 9,
    backgroundColor: colors.callBtn,
    borderRadius: 5,
    width: 100,
    height: 32,
  },
  buttonText: {fontSize: Size.small, color: colors.white},
  modalContentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    bottom: '20%',
  },
  modalCardBody: {
    height: 85,
    width: 81,
    marginHorizontal: 1,
    marginBottom: 10,
  },
  modalCardImage: {
    height: 52,
    width: 52,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalCardText: {fontSize: Size.tiny, textAlign: 'center'},
});
