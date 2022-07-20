import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import {Size} from '../../../assets/fonts/Fonts';

const ForgotPassword = () => {
  return (
    <ScrollView>
    <LinearGradient
      colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
      style={{
        padding: 24,
        width: '100%',
        height: '100%',
      }}>
      <ImageBackground source={image.LoginBackground} style={[styles.head]}>
        <View style={styles.headerContainer}>
          <Image source={image.backArrow} style={{height: 12, width: 23}} />
          <TouchableOpacity style={styles.lang}>
            <Text style={{fontSize: Size.large}}>English</Text>
          </TouchableOpacity>
        </View>

        <Image source={image.loginLogo} style={[styles.logo]} />
        <Text style={[styles.headText]}>WELCOME TO</Text>
        <Text style={[styles.headText]}>VEHICLE TRACKING SYSTEM</Text>
      </ImageBackground>
      <Text style={styles.forgotPassword}>Forgot Your password?</Text>
      <View style={{marginTop: 23}}>
        <View style={[styles.inputBox]}>
          <Image source={image.person} />
          <TextInput placeholder="enter your username" style={styles.input} />
        </View>
      </View>
      <LinearGradient
        colors={[colors.largeBtn1, colors.largeBtn2]}
        style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Send Email</Text>
      </LinearGradient>
      <View style={styles.footerTab}>
        <Image source={image.Mob} style={{height: 34, width: 34}} />
        <Image source={image.whatsApp} style={{height: 34, width: 34}} />
        <Image source={image.incomingCall} style={{height: 34, width: 34}} />
      </View>
    </LinearGradient>
    </ScrollView>
  );
};

export default ForgotPassword;
