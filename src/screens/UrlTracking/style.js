import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

export const styles = StyleSheet.create({
  header: {height: '10%', paddingHorizontal: 16, width: '100%'},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  subHeading: {
    // height: 72,
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
  picker: {
    width: '100%',
    borderRadius: 7,
    marginVertical: 5,
  },
  bodyContent: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginVertical: 5,
    borderRadius: 7,
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:15
  },
  footer: {
    flex: 1.3,
  },
  loginButton: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: Size.extraLarge,
    // fontFamily: fontFamily.CircularStd_Bold,
  },
});
