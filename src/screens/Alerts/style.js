import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {fontFamily} from '../../../assets/FontFamily';
import {Size} from '../../../assets/fonts/Fonts';

export const styles = StyleSheet.create({
  navcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 35,
  },
  navbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashimg: {height: 20, width: 23},
  textinputbox: {
    width: '100%',
    backgroundColor: colors.white,
    marginVertical: 20,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
  },
  textinput: {
    backgroundColor: colors.white,
    borderRadius: 7,
  },
  box1: {
    width: '100%',
    backgroundColor: colors.white,
    elevation: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  box11: {
    width: '100%',
    backgroundColor: 'grey',
    elevation: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  box1text: {
    fontSize: Size.large,
    color: colors.textcolor,
    fontWeight: '700',
  },
  box2: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#BCBCBC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  box22: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#BCBCBC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'grey',
  },
  alertText:{
    fontSize: Size.large,
    color: colors.white,
    paddingHorizontal: 10,
  },
  shareText:{
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }

});
