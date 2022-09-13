import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  card1Container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 1,
    width: '100%',
  },
  driverCarNumber: {
    fontSize: Size.extraLarge,
    color: colors.black,
    // flexWrap: 'wrap',
    // flexGrow: 1,
  },
  driverCarSpeedBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverCarSpeed: {
    fontSize: Size.small,
    color: colors.green,
    paddingHorizontal: 5,
  },
  driverCarDetailBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingTop: 20,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    position: 'relative',
  },
  imageContainer: {
    position: 'absolute',
    top: -20,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
  },
  images: {
    width: 45,
    height: 45,
  },
  driverDetailBox: {
    paddingRight: 7,
    // width:'60%'
    // flex: 1,
  },
  driverDetailText1: {
    fontSize: Size.tiny,
    color: colors.textLight,
  },
  driverDetailText2: {
    fontSize: Size.small,
    color: colors.textDark,
  },
  driverAddressBox: {
    marginHorizontal: 16,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
  },
  driverAddressText: {
    fontSize: Size.tiny,
    color: colors.white,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  disablebutton: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    backgroundColor: 'grey',
    borderRadius: 5,
    height: hp('5%'),
    maxWidth:70
  },
  buttonText: {fontSize: Size.medium, color: colors.white},

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.callBtn,
    borderRadius: 5,
    height: hp('5%'),
  },
});
export default styles;
