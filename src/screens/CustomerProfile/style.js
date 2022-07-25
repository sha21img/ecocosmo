import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

export const styles = StyleSheet.create({
  head: {
    width: '100%',
    height: '26%',
    padding: 18,
    flex: 1,
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHead: {
    marginTop: 66,
    fontSize: Size.extraLarge,
    textAlign: 'center',
    color: colors.subheading,
  },
  subButton: {
    backgroundColor: colors.callBtn,
    width: 165,
    fontSize: Size.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    paddingVertical: 9,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginTop: 7,
  },
  subButtonText: {color: colors.white},
  headsubContainerWidth: {
    width: 140,
  },
  headerText: {
    color: colors.white,
    fontSize: Size.large,
  },
  userImage: {
    height: 104,
    width: 104,
    borderRadius: 50,
    alignSelf: 'center',
    position: 'absolute',
    top: -50,
  },
  editContainer: {
    borderWidth: 1,
    borderColor: colors.white,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
  },
  FormContainer: {
    paddingHorizontal: 16,
    borderRadius: 15,
    marginTop: 52,
    flex: 3,
  },
  TextFieldContainer: {
    // marginTop: 22,
  },
  editText: {
    color: colors.white,
    fontSize: Size.small,
  },
  textFieldHeading: {
    fontSize: Size.compact,
    color: colors.black,
    marginTop: 16,
  },
  textField: {
    width: '95%',
    color: colors.black,
  },
  TextFieldSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 7,
    paddingLeft: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.toggleColorOff,
  },
  loginButton: {
    marginTop: 22,
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
    fontWeight: 'bold',
  },
});
