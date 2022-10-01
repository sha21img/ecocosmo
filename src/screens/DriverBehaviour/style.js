import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
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
    marginLeft: 20,
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
    marginVertical: 20,
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
    resizeMode: 'contain',
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
  ignitionOffCont: {
    backgroundColor: 'red',
    position: 'absolute',
    padding: 10,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    bottom: -20,
    left: 20,
    minWidth: 175,
  },
  ignitionOffBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ignitionText: {paddingLeft: 7, fontSize: 12, color: 'white'},
  linearGrad: {
    backgroundColor: 'red',
    position: 'absolute',
    padding: 10,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    bottom: -60,
    minWidth: 175,
    left: 20,
  },
  ignitionOnBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speedTxt: {
    alignSelf: 'center',
    color: 'white',
    marginTop: 60,
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  startNumCont: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startNumBox: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  startGrad: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  startTxt: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
  },
  txt:{fontSize: 16, color: 'white'},
  liveTrackGrad:{
    paddingHorizontal: 20,
    marginHorizontal: 40,
    marginVertical: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#16BCD4',
  },
  liveTrackTxt:{color: 'white', fontSize: 20, fontWeight: 'bold'}
});
export default styles;
