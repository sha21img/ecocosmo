import React from 'react';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import {styles} from './style';
import {__} from '../../../Utils/Translation/translation';
import {Size} from '../../../assets/fonts/Fonts';

const AddDriver = props => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => props.setVisible(false)}>
        <View style={styles.mainContainer}>
          <LinearGradient
            colors={[colors.Modalcolor1, colors.white]}
            style={styles.modalBody}>
            <Image source={image.bigtastdriver} style={styles.modaldrager} />
            <View
              style={{
                heigth: 66,
                backgroundColor: colors.white,
                marginTop: 108,
                width: '92%',
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <Image
                source={image.taxtDriver}
                style={{height: 17, width: 17, marginRight: 12}}
              />
              <TextInput
                placeholder="Driver name"
                style={{height: 66, width: '90%', fontSize: Size.large}}
              />
            </View>
            <View
              style={{
                heigth: 66,
                backgroundColor: colors.white,
                marginTop: 10,
                width: '92%',
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <Image source={image.greyCall} style={{height: 17, width: 17}} />
              {/* <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: colors.black, fontSize: Size.large}}>
                  +91
                </Text>
                <Image source={image.Down} style={{height: 7, width: 12}} />
              </TouchableOpacity> */}
              <TextInput
                style={{
                  height: 66,
                  width: '72%',
                  fontSize: Size.large,
                  marginLeft: 10,
                }}
              />
            </View>
            <TouchableOpacity style={{width: '100%'}}>
              <LinearGradient
                colors={[colors.largeBtn1, colors.largeBtn2]}
                style={styles.loginButton}>
                <Text style={styles.loginButtonText}>{__('Save')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    </>
  );
};

export default AddDriver;
