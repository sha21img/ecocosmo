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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {__} from '../../../Utils/Translation/translation';
import {axiosGetData} from '../../../Utils/ApiController';
import md5 from 'md5';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    var encodedPassWord = md5(password);

    const response = await axiosGetData(
      `account/${username}/${encodedPassWord}`,
    );
  };

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
            <Text style={{fontSize: Size.large}}>{__('English')}</Text>
            <MaterialIcons size={50} color="#900" />
            <Icon size={50} color="#900" />
          </TouchableOpacity>
          <Image source={image.loginLogo} style={[styles.logo]} />
          <Text style={[styles.headText]}>{__('WELCOME TO')}</Text>
          <Text style={[styles.headText]}>{__('VEHICLE TRACKING SYSTEM')}</Text>
        </ImageBackground>
        <View style={{marginTop: 90}}>
          <View style={[styles.inputBox, {marginBottom: 20}]}>
            <Image source={image.person} />
            <TextInput
              placeholder="enter your username"
              value={username}
              style={styles.input}
              onChangeText={newText => setUsername(newText)}
            />
          </View>

          <View style={[styles.inputBox, {marginBottom: 13}]}>
            <Image source={image.security} />
            <TextInput
              placeholder="enter your password"
              value={password}
              style={styles.input}
              secureTextEntry={true}
              onChangeText={newText => setPassword(newText)}
            />
            <Image source={image.eye} />
          </View>

          <Text style={styles.forgotPassword}>{__('Forgot Password?')}</Text>
        </View>
        <LinearGradient
          colors={[colors.largeBtn1, colors.largeBtn2]}
          style={styles.loginButton}>
          <Text style={styles.loginButtonText} onPress={() => handleLogin()}>
            {__('Login')}
          </Text>
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
