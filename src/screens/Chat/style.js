import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
  },
  header: {width: '100%'},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },
  headerImageCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerDashboard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboardText: {
    color: colors.white,
    fontSize: Size.large,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  alertContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  searchIcon: {
    height: 20,
    width: 20,
    marginLeft: 10,
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
    paddingRight: 15,
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
  textHead: {fontWeight: 'bold', color: '#B9B9B9'},
  drawImg:{height: 20, width: 23, marginVertical: 5},
  chatText:{
    fontSize: Size.large,
    color: colors.white,
    paddingHorizontal: 10,
  },
  chatDetailBox:{
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 1.5,
  },
  accountTextCont:{
    paddingLeft: 10,
    width: '84%',
  },
  accountBox:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountText:{
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 18,
    width: '70%',
  },
  msgText:{
    paddingVertical: 5,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
export default styles;
