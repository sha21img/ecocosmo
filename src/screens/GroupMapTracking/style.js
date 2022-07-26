import {Size} from '../../../assets/fonts/Fonts';
import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    // flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  map_container: {
    // flex: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top_container: {
    position: 'absolute',
    top: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  firstbox: {
    // flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    minWidth: 250,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 15,
    // width: '65%',
  },
  firstboxtext1: {
    color: '#fff',
    fontSize: Size.medium,
  },
  firstboxtext2: {
    fontSize: Size.tiny,
    color: '#fff',
    marginVertical: 5,
  },
  dashimgbox: {
    alignItems: 'center',
  },
  bottombox: {
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    bottom: 15,
    width: '100%',
  },
  driverCarSpeed: {
    fontSize: Size.small,
    color: colors.white,
    // paddingHorizontal: 5,
  },
  secondbox: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  secondboxtextbox1: {
    // backgroundColor:'blue'
    // justifyContent: 'space-around',
    // width: '20%',
  },
  speedimg: {
    width: 20,
    height: 15,
  },
  locimg: {width: 20, height: 15},
  secondboxtext1: {
    fontSize: Size.small,
    color: '#fff',
  },
  secondboxtext11: {
    fontSize: Size.extraTiny,
    color: '#fff',
  },
  box3: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taxiimg: {
    width: 20,
    height: 20,
  },
  text3: {
    fontSize: Size.medium,
    color: '#fff',
  },
  mapPaper: {
    width: 58,
    height: 58,
  },
});
export default style;
