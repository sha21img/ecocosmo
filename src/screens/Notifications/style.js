import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {fontFamily} from '../../../assets/FontFamily';
import {Size} from '../../../assets/fonts/Fonts';

export const styles = StyleSheet.create({
  navcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
  },
  navbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crossIcon: {
    color: colors.white,
    fontSize: 24,
    marginLeft: 10,
    paddingVertical: 5,
  },
  dashimg: {height: 20, width: 23},
  textinputbox: {
    paddingHorizontal: 10,
    marginHorizontal: 25,
    marginTop: 10,
    marginVertical: 10,
  },
  textinput: {
    width: '100%',
    height: 50,
    backgroundColor: colors.white,
    color: colors.black,
    borderRadius: 7,
    justifyContent: 'center',
  },
});
