import React from 'react';
import {Image, Text, View, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import {styles} from './style';
import {__} from '../../../Utils/Translation/translation';

const ChangePassword = () => {
  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        style={styles.main}
        locations={[0, 0.9]}>
        <View style={styles.header}>
          <Image source={image.backArrow} style={{height: 12, width: 23}} />
          <Text style={styles.headerContentText}>{__('Change Password')}</Text>
        </View>
        <LinearGradient
          colors={[colors.Modalcolor1, colors.white]}
          style={styles.ContentBody}>
          <Text style={styles.inputHeading}>{__('Current Password')}</Text>
          <View style={[styles.inputBox, {marginBottom: 20}]}>
            <Image source={image.security} />
            <TextInput
              placeholder="Enter current password"
              placeholderTextColor={'#BBBBBB'}
              style={styles.input}
            />
          </View>
          <Text style={styles.inputHeading}>{__('New Password')}</Text>
          <View style={[styles.inputBox, {marginBottom: 20}]}>
            <Image source={image.security} />
            <TextInput
              placeholder="Enter password"
              placeholderTextColor={'#BBBBBB'}
              style={styles.input}
            />
          </View>
          <Text style={styles.inputHeading}>{__('Confirm New Password')}</Text>
          <View style={[styles.inputBox, {marginBottom: 20}]}>
            <Image source={image.security} />
            <TextInput
              placeholder="Enter password"
              placeholderTextColor={'#BBBBBB'}
              style={styles.input}
            />
          </View>
          <LinearGradient
            colors={[colors.largeBtn1, colors.largeBtn2]}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{__('Submit')}</Text>
          </LinearGradient>
        </LinearGradient>
      </LinearGradient>
    </>
  );
};
export default ChangePassword;
