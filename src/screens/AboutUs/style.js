import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {fontFamily} from '../../../assets/FontFamily';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContentText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: Size.large,
    fontFamily: fontFamily.CircularStd_Bold,
    paddingHorizontal: 15,
  },
  ContentBody: {
    paddingHorizontal: 21,
    paddingVertical: 25,
    marginVertical: 50,
    borderRadius: 15,
  },
  ContentSubBody: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
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
