import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

export const styles = StyleSheet.create({
  header: {height: '10%', paddingHorizontal: 16, width: '100%'},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 41,
    width: 155,
  },
  subHeading: {
    height: 72,
    backgroundColor: colors.white,
    elevation: 10,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  subHeadingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 46,
    borderWidth: 1,
    borderColor: colors.toggleColorOff,
    borderRadius: 7,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  body: {
    flex: 3,
  },
  bodyContent: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: 66,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 7,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  footer: {
    flex: 1.3,
  },
  loginButton: {
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
    // fontFamily: fontFamily.CircularStd_Bold,
  },
});
