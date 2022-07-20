import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  headerDashboard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboardText: {
    color: colors.white,
    fontSize: Size.large,
    fontWeight: 'bold',
  },
  dashboardArrow: {
    height: 6,
    width: 10,
    marginHorizontal: 5,
  },
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
  catagoryTextActive: {
    minWidth: 80,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.mainThemeColor1,
    borderRadius: 50,
    textAlign: 'center',
    marginRight: 10,
    color: colors.white,
  },
  catagoryTextInactive: {
    minWidth: 80,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.lightGrey,
    borderRadius: 50,
    textAlign: 'center',
    marginRight: 10,
    color: colors.grey,
  },
  carDetailCard: {
    paddingHorizontal: 15,
    paddingBottom: 50,
    paddingVertical: 15,
  },
});
export default styles;
