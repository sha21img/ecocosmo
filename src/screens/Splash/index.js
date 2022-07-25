import React from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import {image} from '../../../assets/images';

const Splash = () => {
  return (
    <>
      <ImageBackground source={image.splash} style={{flex: 1}} />
    </>
  );
};
export default Splash;
