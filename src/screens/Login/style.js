import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

const styles = StyleSheet.create({
  mainContainer: {
    padding: 24,
    height: '100%',
    width: '100%',
    paddingBottom: 100,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 18,
    justifyContent: 'space-around',
  },
  pickerText: {
    color: colors.black,
    fontSize: Size.medium,
    marginRight: 5,
    height: 40,
  },
  head: {
    width: '100%',
    marginTop: 30,
  },
  logo: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    marginBottom: 27,
    resizeMode: 'contain',
  },
  companyText:{
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
    width: '60%',
    position: 'absolute',
    bottom: 0,
    marginVertical: 25,
    paddingVertical: 10,
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
