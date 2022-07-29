import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

const styles = StyleSheet.create({
  head: {
    width: '100%',
    marginTop: 50,
  },
  lang: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    height: 33,
    width: 104,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 48,
    marginTop: 21,
    flexDirection: 'row',
  },
  logo: {
    width: 102,
    height: 102,
    alignSelf: 'center',
    marginBottom: 27,
  },
  headText: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'CircularStd-Bold.eot',
    fontSize: Size.compact,
  },
  inputBox: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 7,
    paddingHorizontal: 15,
  },
  input: {
    backgroundColor: colors.white,
    height: 66,
    width: '86%',
    borderRadius: 7,
    marginLeft: 14,
  },
  forgotPassword: {
    textAlign: 'right',
    color: colors.white,
    fontSize: Size.large,
  },
  loginButton: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: colors.white,
    fontSize: Size.extraLarge,
    fontWeight: 'bold',
  },
  footerTab: {
    height: 57,
    width: 200,
    backgroundColor: colors.white,
    borderRadius: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 3,
    marginTop: 160,
  },
});
export default styles;
