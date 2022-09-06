import {Size} from '../../../assets/fonts/Fonts';
import {StyleSheet} from 'react-native';

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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  firstbox: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 8,
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: '65%',
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
    width: '15%',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  bottombox: {
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    bottom: 15,
    width: '100%',
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
    justifyContent: 'center',
    width: '20%',
  },
  speedimg: {
    width: 15,
    height: 15,
  },
  locimg: {width: 20, height: 15},
  secondboxtext1: {
    fontSize: Size.small,
    marginTop: 8,
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
    width: 50,
    height: 50,
  },
});
export default style;
