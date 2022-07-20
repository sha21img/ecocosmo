import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';
import {fontFamily} from '../../../assets/FontFamily';
import {Size} from '../../../assets/fonts/Fonts';

export const styles = StyleSheet.create({
    navcontainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 43,
        height: 22,
      },
      navbox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 88,
        height: 32,
        alignItems: 'center',
      },
      dashimg:{height: 20, width: 23},
      textinputbox:{
        height: 46,
        width: '92%',
        backgroundColor: colors.white,
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
      },
      textinput:{
        height: 46,
        width: '93%',
        backgroundColor: colors.white,
        borderRadius: 7,
        paddingLeft: 20,
      },
      box1:{
        height: 68,
        width: '100%',
        backgroundColor: colors.white,
        elevation: 24,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      box1text:{
        fontSize: Size.large,
        color: colors.textcolor,
        fontWeight: '700',
      },
      box2:{
        
            height: 54,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
          
      }

});
