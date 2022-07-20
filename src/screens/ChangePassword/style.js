import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {fontFamily} from '../../../assets/FontFamily';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
  },
  headerContent1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 165,
  },
  headerContentText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: Size.large,
    fontFamily: fontFamily.CircularStd_Bold,
  },
  ContentBody: {
    paddingHorizontal: 21,
    paddingVertical: 27,
    marginTop: 43,
    borderRadius: 15,
  },
  inputBox: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 7,
    paddingHorizontal: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.toggleColorOff,
  },
  input: {
    backgroundColor: colors.white,
    height: 66,
    width: '86%',
    borderRadius: 7,
    marginLeft: 15,
  },
  inputHeading: {
    fontSize: Size.compact,
    fontFamily: fontFamily.CircularStd_Book,
    color: colors.black,
  },
  loginButton: {
    marginTop: 3,
    height: 66,
    width: '88%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: colors.white,
    fontSize: Size.extraLarge,
    fontFamily: fontFamily.CircularStd_Bold,
  },
});
