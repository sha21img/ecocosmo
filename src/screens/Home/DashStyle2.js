import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

const styles = StyleSheet.create({
  card2Container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  cardDetailBox: {
    flexDirection: 'row',
    width: '100%',
  },
  driverDetails: {
    width: '70%',
    padding: 10,
  },
  driverCarSpeed: {
    color: colors.lightGreen,
    fontSize: Size.small,
  },
  driverCarNumber: {
    color: colors.subheading,
    fontSize: Size.large,
    fontWeight: 'bold',
  },
  driverCarDetailsBox: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  driverCarDetails: {
    paddingRight: 10,
  },
  driverCarDetailsImage: {
    width: 17,
    height: 17,
    marginVertical: 5,
  },
  driverCarDetailsImage1: {
    width: 23,
    height: 17,
    marginVertical: 5,
  },
  driverCarDetailsText: {
    color: colors.subheading,
    fontSize: Size.small,
    fontWeight: 'bold',
  },
  driverCarDetailsText1: {
    color: colors.subheading,
    fontSize: Size.tiny,
  },
  driverCarBox: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverCar: {
    width: 100,
    height: 100,
  },
  driverAddressBox: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 20,
  },
  driverAddress: {
    fontSize: Size.tiny,
    color: colors.white,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
});
export default styles;
