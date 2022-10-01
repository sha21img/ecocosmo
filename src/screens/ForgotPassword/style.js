import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

const styles = StyleSheet.create({
  head: {
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 48,
    marginTop: 21,
  },
  logo: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    marginBottom: 27,
    resizeMode: 'contain',
  },
  companyText: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'CircularStd-Bold.eot',
    fontSize: Size.huge,
    paddingVertical: 10,
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
    textAlign: 'center',
    color: colors.white,
    fontSize: Size.large,
    marginTop: 49,
  },
  loginButton: {
    marginTop: 20,
    padding: 20,
    // height: 66,
    width: '88%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 160,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: Size.extraLarge,
    fontWeight: 'bold',
  },
  footerTab: {
    marginTop: 100,
    height: 57,
    width: 200,
    backgroundColor: colors.white,
    borderRadius: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 3,
  },
  changeLngBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 18,
    justifyContent: 'space-around',
  },
  changeLngTxt: {
    color: colors.black,
    fontSize: Size.medium,
    marginRight: 5,
    height: 40,
  },
  arrowIcon: {
    color: '#47BC30',
    fontSize: 16,
  },
});
export default styles;
