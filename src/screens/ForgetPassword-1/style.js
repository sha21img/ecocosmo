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
    marginVertical: 10,
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
    marginVertical: 20,
    paddingVertical: 15,
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
  linearGrad: {
    padding: 24,
    width: '100%',
    height: '100%',
  },
  selectorCont: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorBox: {paddingVertical: 10, alignItems: 'center'},
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 18,
    justifyContent: 'space-around',
  },
  inputTxt: {
    color: colors.black,
    fontSize: Size.medium,
    marginRight: 5,
    height: 40,
  },
  arrowIcon: {
    color: '#47BC30',
    fontSize: 16,
  },
  checkBox: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    flexDirection: 'row',
    marginTop: 5,
    // paddingHorizontal:
  },
  passText: {marginLeft: 5, color: colors.white},
});
export default styles;
