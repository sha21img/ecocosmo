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
  dashimg: {height: 20, width: 23},
  textinputbox: {
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 25,
    marginVertical:10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  textinput: {
    width: '100%',
    backgroundColor: colors.white,
    color: colors.black,
    borderRadius: 7,
  },
});
