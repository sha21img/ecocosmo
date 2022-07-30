import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

const styles = StyleSheet.create({
  head: {
    width: '100%',
    backgroundColor: 'red',
    // alignItems:'center'
    // height:'100%'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 48,
    marginTop: 21,
  },
  lang: {
    backgroundColor: 'white',
    height: 33,
    width: 104,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  logo: {
    width: 102,
    height: 102,
    alignSelf: 'center',
    marginVertical: 27,
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
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.white,
    height: 66,
    width: '92%',
    borderRadius: 7,
  },
  forgotPassword: {
    textAlign: 'center',
    color: colors.white,
    fontSize: Size.large,
    marginTop: 49,
  },
  loginButton: {
    paddingVertical: 20,
    width: '88%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
});
export default styles;
