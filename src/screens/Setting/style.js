import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {fontFamily} from '../../../assets/FontFamily';
import {Size} from '../../../assets/fonts/Fonts';

export const styles = StyleSheet.create({
  header: {height: '100%', width: '100%'},
  headerContainer: {
    justifyContent: 'center',
    marginTop: 41,
    paddingHorizontal: 13,
    marginBottom: 30,
  },
  headerImageCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 110,
    height: 32,
    alignItems: 'center',
  },
  BodyContent: {
    paddingHorizontal: 25,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.underline,
    paddingBottom: 20,
    alignItems: 'center',
  },
  BodyContentText: {
    marginLeft: 20,
    color: colors.white,
    fontSize: Size.large,
    fontFamily: fontFamily.CircularStd_Book,
  },
  logoutButton: {
    marginTop: 61,
    height: 66,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 160,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: Size.extraLarge,
    fontFamily: fontFamily.CircularStd_Bold,
  },
});
