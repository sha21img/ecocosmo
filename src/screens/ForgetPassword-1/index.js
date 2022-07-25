import React, {useState} from 'react';
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
import {__} from '../../../Utils/Translation/translation';
import {axiosGetData} from '../../../Utils/ApiController';
import Toast from 'react-native-simple-toast';

const ForgotPassword_1 = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (newPassword === confirmPassword) {
      const response = await axiosGetData(
        `forgotPasswordUpdate/rrenterprises/${otp}/${newPassword}`,
      );
      console.log(response.data);
      if (response.data.apiResult === 'error') {
        Toast.show(__(`${response.data.message}`));
      }
    } else {
      console.warn('Didnot Match confirm password');
    }
  };
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
              <Text style={{fontSize: Size.large}}>{__('English')}</Text>
            </TouchableOpacity>
          </View>
          <Image source={image.loginLogo} style={[styles.logo]} />
          <Text style={[styles.headText]}>{__('WELCOME TO')}</Text>
          <Text style={[styles.headText]}>{__('VEHICLE TRACKING SYSTEM')}</Text>
        </ImageBackground>
        <Text style={styles.forgotPassword}>{__('Forgot password Reset')}</Text>
        <View style={{marginTop: 23}}>
          <View style={[styles.inputBox]}>
            <TextInput
              placeholder="enter OTP"
              style={styles.input}
              defaultValue={otp}
              onChangeText={data => setOtp(data)}
            />
          </View>
          <View style={[styles.inputBox]}>
            <TextInput
              placeholder="enter new password"
              style={styles.input}
              defaultValue={newPassword}
              onChangeText={data => setnewPassword(data)}
            />
          </View>
          <View style={[styles.inputBox]}>
            <TextInput
              placeholder="confirm new password"
              style={styles.input}
              defaultValue={confirmPassword}
              onChangeText={data => setConfirmPassword(data)}
            />
          </View>
        </View>
        <TouchableOpacity onPress={handleSubmit}>
          <LinearGradient
            colors={[colors.largeBtn1, colors.largeBtn2]}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{__('Submit')}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.footerTab}>
          <Image source={image.Mob} style={{height: 34, width: 34}} />
          <Image source={image.whatsApp} style={{height: 34, width: 34}} />
          <Image source={image.incomingCall} style={{height: 34, width: 34}} />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default ForgotPassword_1;
