import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {fontFamily} from '../../../assets/FontFamily';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 125,
  },
  headerContentText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: Size.large,
    fontFamily: fontFamily.CircularStd_Bold,
  },
  ContentBody: {
    paddingHorizontal: 21,
    paddingVertical: 25,
    marginTop: 50,
    borderRadius: 15,
    height: '78%',
  },
  ContentSubBody: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '95%',
  },
  ContentBodyhead: {
    fontSize: Size.medium,
    fontFamily: fontFamily.CircularStd_Book,
    color: colors.textcolor2,
  },
  ContentBodyhead2: {
    fontSize: Size.huge,
    fontFamily: fontFamily.CircularStd_Bold,
    color: colors.subheading,
  },
  ContentBodyhead3: {
    fontSize: Size.large,
    fontFamily: fontFamily.CircularStd_Book,
    color: colors.textcolor2,
  },
  footer: {
    fontSize: Size.large,
    fontFamily: fontFamily.CircularStd_Book,
    color: colors.BodyHeading2,
  },
});
