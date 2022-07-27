import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  ActivityIndicator,
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

const ForgotPassword = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState('');
  const getOtp = async () => {
    setLoading(true);
    const response = await axiosGetData(`forgotPasswordOtp/${email}`);
    console.log(response.data);
    if (response.data.message.message === 'success') {
      navigation.navigate('ForgotPassword-1');
      setLoading(false);
    } else {
      Toast.show(__(`${response.data.message}`));
      setLoading(false);
    }
  };
  return (
    <LinearGradient
      colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
      style={{
        padding: 24,
        width: '100%',
        height: '100%',
      }}>
      <ScrollView>
        <ImageBackground source={image.LoginBackground} style={[styles.head]}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={image.backArrow} style={{height: 12, width: 23}} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.lang}>
              <Text style={{fontSize: Size.large}}>{__('English')}</Text>
            </TouchableOpacity>
          </View>

          <Image source={image.loginLogo} style={[styles.logo]} />
          <Text style={[styles.headText]}>{__('WELCOME TO')}</Text>
          <Text style={[styles.headText]}>{__('VEHICLE TRACKING SYSTEM')}</Text>
        </ImageBackground>
        <Text style={styles.forgotPassword}>{__('Reset Password')}</Text>
        <View style={{marginTop: 23}}>
          <View style={[styles.inputBox]}>
            <Image source={image.person} />
            <TextInput
              placeholder={__('enter account ID or number')}
              style={styles.input}
              defaultValue={email}
              onChangeText={email => setemail(email)}
            />
          </View>
        </View>
        <TouchableOpacity onPress={getOtp}>
          <LinearGradient
            colors={[colors.largeBtn1, colors.largeBtn2]}
            style={styles.loginButton}>
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.loginButtonText}>{__('Submit')}</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.footerTab}>
          <Image source={image.Mob} style={{height: 34, width: 34}} />
          <Image source={image.whatsApp} style={{height: 34, width: 34}} />
          <Image source={image.incomingCall} style={{height: 34, width: 34}} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ForgotPassword;
