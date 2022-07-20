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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {__} from '../../../Utils/Translation/translation';


const Login = () => {
  return (
    <ScrollView>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        style={{
          padding: 24,
          width: '100%',
        }}>
        <ImageBackground source={image.LoginBackground} style={[styles.head]}>
          <TouchableOpacity style={styles.lang}>
            <Text style={{fontSize: Size.large}}>{__("English")}</Text>
            <MaterialIcons size={50} color="#900" />
            <Icon size={50} color="#900" />
          </TouchableOpacity>
          <Image source={image.loginLogo} style={[styles.logo]} />
          <Text style={[styles.headText]}>{__("WELCOME TO")}</Text>
          <Text style={[styles.headText]}>{__("VEHICLE TRACKING SYSTEM")}</Text>
        </ImageBackground>
        <View style={{marginTop: 90}}>
          <View style={[styles.inputBox, {marginBottom: 20}]}>
            <Image source={image.person} />
            <TextInput placeholder="enter your username" style={styles.input} />
          </View>

          <View style={[styles.inputBox, {marginBottom: 13}]}>
            <Image source={image.security} />
            <TextInput placeholder="enter your password" style={styles.input} />
            <Image source={image.eye} />
          </View>

          <Text style={styles.forgotPassword}>{__("Forgot Password?")}</Text>
        </View>
        <LinearGradient
          colors={[colors.largeBtn1, colors.largeBtn2]}
          style={styles.loginButton}>
          <Text style={styles.loginButtonText}>{__("Login")}</Text>
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

export default Login;
