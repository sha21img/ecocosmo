import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

export const styles = StyleSheet.create({
  head: {
    width: '100%',
    padding: 20,
    flex: 1,
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  subHead: {
    marginTop: 70,
    fontSize: Size.extraLarge,
    textAlign: 'center',
    color: colors.subheading,
  },
  subButton: {
    backgroundColor: colors.callBtn,
    fontSize: Size.medium,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 7,
    marginTop: 7,
    maxWidth: 200,
    alignSelf: 'center',
  },
  subButtonText: {color: colors.white, paddingHorizontal: 10},

  headerText: {
    color: colors.white,
    fontSize: Size.large,
    paddingHorizontal: 15,
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
    paddingVertical: 10,
  },
  textField: {
    color: colors.black,
    paddingHorizontal: 15,
    width: '100%',
  },

  TextFieldSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.toggleColorOff,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  textFieldAddress: {
    color: colors.black,
    width: '100%',
    paddingHorizontal: 15,
    lineHeight: 17,
  },
  TextFieldAddress: {
    flexDirection: 'row',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.toggleColorOff,
    marginBottom: 5,
    padding: 20,
  },
  loginButton: {
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    margin: 10,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: Size.extraLarge,
    fontWeight: 'bold',
  },
});
