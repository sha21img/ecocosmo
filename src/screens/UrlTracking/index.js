import React from 'react';
import {Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import {__} from '../../../Utils/Translation/translation';
import {styles} from './style';

const UrlTracking = () => {
  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.header}>
        <View style={styles.headerContainer}>
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
      <View style={styles.subHeading}>
        <View style={styles.subHeadingContent}>
          <Text style={{fontSize: Size.compact, color: colors.black}}>
            {__('All Vehicle')}
          </Text>
          <Image source={image.Down} style={{width: 11, height: 6}} />
        </View>
      </View>
      <LinearGradient
        style={{height: '100%', padding: 16}}
        colors={[colors.Modalcolor1, colors.white]}>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={{fontSize: Size.large, color: colors.textcolor}}>
              {__('Select Date')}
            </Text>
            <Image source={image.Down} style={{width: 11, height: 6}} />
          </View>
          <View style={styles.bodyContent}>
            <Text style={{fontSize: Size.large, color: colors.textcolor}}>
              {__('Select Time')}
            </Text>
            <Image source={image.Down} style={{width: 11, height: 6}} />
          </View>
          <View style={styles.bodyContent}>
            <Text style={{fontSize: Size.large, color: colors.textcolor}}>
              {__('Duration')}
            </Text>
            <Image source={image.Down} style={{width: 11, height: 6}} />
          </View>
          <View style={styles.bodyContent}>
            <Text style={{fontSize: Size.large, color: colors.grey}}>
              {__('Asset Description')}
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <LinearGradient
            colors={[colors.largeBtn1, colors.largeBtn2]}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{__('Share URL')}</Text>
          </LinearGradient>
        </View>
      </LinearGradient>
    </>
  );
};
export default UrlTracking;
