import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

export const styles = StyleSheet.create({
  header: {height: '10%', paddingHorizontal: 16, width: '100%'},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 41,
    height: 22,
  },
  headerImageCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 88,
    height: 32,
    alignItems: 'center',
  },
  subHeader: {
    height: '7%',
    backgroundColor: colors.white,
    elevation: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeaderText: {
    fontSize: Size.large,
    color: colors.subheading,
    // fontFamily: CircularStd-Bold
  },
  bodyheading: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.toggleColorOff,
  },
  bodyHeadingText: {fontSize: Size.large, color: colors.BodyHeading},
  Footer: {
    marginVertical: 15,
  },
  FooterTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  FooterText: {fontSize: Size.compact, color: colors.textcolor},
  FooterInput: {
    width: 133,
    height: 43,
    borderWidth: 1,
    borderColor: colors.toggleColorOff,
    borderRadius: 7,
    paddingHorizontal: 10,
  },
});
