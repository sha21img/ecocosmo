import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {fontFamily} from '../../../assets/FontFamily';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContentText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: Size.large,
    paddingHorizontal: 15,
    fontFamily: fontFamily.CircularStd_Bold,
  },
  contentContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  content: {
    width: '32%',
    height: 105,
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 15,
  },
  placeItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: Size.tiny,
    marginTop: 14,
    color: colors.subheading,
  },
});
