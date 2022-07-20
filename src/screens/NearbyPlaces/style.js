import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

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
    justifyContent: 'space-between',
    width: 165,
  },
  headerContentText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: Size.large,
  },
  contentContainer: {
    marginTop: 37,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  content: {
    width: '31%',
    height: 105,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 15,
  },
  contentText: {
    fontSize: Size.tiny,
    marginTop: 14,
    color: colors.subheading,
  },
});
