import React from 'react';
import {Image, Text, View} from 'react-native';
import {image} from '../../../assets/images';

function index() {
  return (
    <LinearGradient
      colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={{height: '10%', paddingHorizontal: 16, width: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 41,
          width: 155,
        }}>
        <Image source={image.backArrow} style={{height: 12, width: 23}} />
        <Text
          style={{
            fontSize: Size.large,
            color: colors.white,
          }}>
          {__('URL Tracking')}
        </Text>
      </View>
    </LinearGradient>
  );
}

export default index;
