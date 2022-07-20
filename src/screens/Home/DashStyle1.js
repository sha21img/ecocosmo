import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

const styles = StyleSheet.create({
  card1Container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 1,
  },
  driverCarNumber: {
    fontSize: Size.extraLarge,
    color: colors.black,
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
    paddingHorizontal: 7,
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
});
export default styles;
