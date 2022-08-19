import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',padding: 20,
  },
  headerDashboard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  //   dashboardContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //   },
  dashboardText: {
    color: colors.white,
    fontSize: Size.large,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  //   dashboardArrow: {
  //     height: 6,
  //     width: 10,
  //     marginHorizontal: 5,
  //   },
  alertContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  searchIcon: {
    height: 18,
    width: 18,
    marginLeft: 15,
  },
  catagoryBox: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  //
  //

  card2Container: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    margin: 20,
  },
  cardDetailBox: {
    // flexDirection: 'row',
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
    justifyContent: 'space-around',
    // paddingVertical: 15,
    marginVertical:20,
    // backgroundColor:'red',
    width: '100%',
  },
  driverCarDetails: {
    // flex:1
    // paddingRight: 15,
    // backgroundColor:'blue',
    // flexWrap: 'wrap',
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
    fontSize: 8,
  },
  driverCarBox: {
    // width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverCar: {
    width: 60,
    height: 67,
    resizeMode: 'contain'
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
