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
    paddingTop: 15,
    paddingBottom: 5,
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
  linearGrad1: {
    width: '60%',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    margin: 20,
    marginLeft: 'auto',
    elevation: 10,
    paddingTop: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  linearGrad2: {
    margin: 20,
    width: '60%',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 20,
    elevation: 10,
  },
  msgBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  msgInput: {
    backgroundColor: colors.white,
    width: '80%',
    borderRadius: 7,
    elevation: 5,
    fontSize: 18,
    padding: 10,
  },
  linearGrad3: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
