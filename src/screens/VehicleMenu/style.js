import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';

export const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    position: 'relative',
    alignItems: 'center',

    backgroundColor: colors.mainThemeColor1,
  },
  modalBody: {
    alignItems: 'center',
    width: '90%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modaldrager: { height: 180, width: 180,position:'absolute',top:-90,
   },
  modalSubheading: {
    fontSize: Size.tiny,
    color: colors.lightGreen,
    marginTop:90
  },
  modalHead: {
    fontSize: Size.compact,
    fontWeight: '600',
    color: colors.subheading,
    paddingVertical: 5,
  },
  button: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    backgroundColor: colors.callBtn,
    borderRadius: 5,
  },
  buttonText: {fontSize: Size.small, color: colors.white},
  modalContentContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    width:'98%',
    
    flexWrap: 'wrap',
   
    // alignItems:'center',

    
   
    

  },
  modalCardBody: {},
  modalCardImage: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },
  modalCardText: {
    fontSize: Size.tiny,
    textAlign: 'center',
    width: 80,
  },
});
