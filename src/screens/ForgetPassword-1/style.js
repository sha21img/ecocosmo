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
    width: '100%',
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
    resizeMode: 'contain',
  },
  headText: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'CircularStd-Bold.eot',
    fontSize: Size.compact,
  },
  companyText: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'CircularStd-Bold.eot',
    fontSize: Size.huge,
    paddingVertical: 10,
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
    width: '90%',
    borderRadius: 7,
  },
  forgotPassword: {
    textAlign: 'center',
    color: colors.white,
    fontSize: Size.large,
    marginTop: 35,
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
});
export default styles;
