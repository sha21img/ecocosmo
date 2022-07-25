import React from 'react';
import {Image, ImageBackground, ScrollView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import {__} from '../../../Utils/Translation/translation';
import {styles} from './style';

const CustomerProfile = () => {
  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        style={{flex: 1}}>
        <ImageBackground source={image.LoginBackground} style={[styles.head]}>
          <View style={styles.headContainer}>
            <Image source={image.drawer} style={{height: 20, width: 22}} />
            <Text>{__('My Account')}</Text>
            <TouchableOpacity>
              <Text>{__('🖊 Edit')}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </LinearGradient>
    </>
  );
};
export default CustomerProfile;
