import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {fontFamily} from '../../../assets/FontFamily';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingVertical: 41,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 165,
    paddingHorizontal: 13,
    marginBottom: 17,
  },
  headerContentText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: Size.large,
    fontFamily: fontFamily.CircularStd_Bold,
  },
  BodyContent: {
    paddingHorizontal: 25,
    marginVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.underline,
    paddingBottom: 20,
    alignItems: 'center',
  },
  BodyContentText: {
    color: colors.SubContentText,
    fontSize: Size.large,
    fontFamily: fontFamily.CircularStd_Book,
    marginVertical: 8,
  },
  BodyContentSubText: {
    color: colors.white,
    fontSize: Size.large,
    fontFamily: fontFamily.CircularStd_Book,
  },
});
