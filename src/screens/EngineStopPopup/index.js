import React from 'react';
import {
  Image,
  Modal,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import {styles} from './style';
import {__} from '../../../Utils/Translation/translation';
import {Size} from '../../../assets/fonts/Fonts';
import Storage from '../../../Utils/Storage';
import {axiosGetData} from '../../../Utils/ApiController';
import Toast from 'react-native-simple-toast';

const EngineStopPopup = props => {
  console.log("props12",props)
  const contactUsDetails = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    let tougle = (props.details?.statusLang & 1) == 1 ? 0 : 1;
    const response = await axiosGetData(
      `stopvehicle/${username}/${encodedPassWord}/${props.details.imei}/${tougle}/${props.details.deviceType}`,
    );
    if (response.data.apiResult != 'success') {
      Toast.show(__(`${response.data.message}`));
    } else {
      props.setVisible(false);
    }
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => props.setVisible(false)}>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            onPress={() => props.setVisible(false)}
            style={{alignSelf: 'flex-end', paddingVertical: 10}}>
            <Image source={image.Close} style={{height: 26, width: 26}} />
          </TouchableOpacity>
          <LinearGradient
            colors={[colors.Modalcolor1, colors.white]}
            style={styles.modalBody}>
            <Text style={{color: colors.black, fontSize: Size.compact}}>
              {(props.details?.statusLang & 1) == 1
                ? __('Do you want to Start vehicle?')
                : __('Do you want to Stop vehicle?')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '77%',
                marginTop: 25,
              }}>
              <TouchableOpacity
                onPress={() => props.setVisible(false)}
                disabled={props.details?.features & (16 != 16) ? true : false}
                style={[
                  styles.loginButton,
                  {
                    backgroundColor:
                      props.details?.features & (16 != 16)
                        ? 'grey'
                        : colors.subRedBtn,
                  },
                ]}>
                <Text style={styles.loginButtonText}>{__('No')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => contactUsDetails()}
                disabled={props.details?.features & (16 != 16) ? true : false}
                style={styles.loginButton}>
                <LinearGradient
                  style={{
                    width: '100%',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 20,
                  }}
                  colors={[
                    props.details?.features & (16 != 16)
                      ? 'grey'
                      : colors.largeBtn1,
                    colors.largeBtn2,
                  ]}>
                  <Text style={styles.loginButtonText}>{__('Yes')}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </>
  );
};

export default EngineStopPopup;
