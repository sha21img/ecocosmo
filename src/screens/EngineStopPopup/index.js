import React from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import {styles} from './style';
import {__} from '../../../Utils/Translation/translation';
import {Size} from '../../../assets/fonts/Fonts';

const EngineStopPopup = props => {
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
              {__('Do you want to Start vehicle?')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '77%',
                marginTop: 25,
              }}>
              <View
                style={[
                  styles.loginButton,
                  {backgroundColor: colors.subRedBtn},
                ]}>
                <Text style={styles.loginButtonText}>{__('No')}</Text>
              </View>
              <LinearGradient
                colors={[colors.largeBtn1, colors.largeBtn2]}
                style={styles.loginButton}>
                <Text style={styles.loginButtonText}>{__('Yes')}</Text>
              </LinearGradient>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </>
  );
};

export default EngineStopPopup;
