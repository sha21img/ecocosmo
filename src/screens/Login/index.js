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
import md5 from 'md5';
import Storage from '../../../Utils/Storage';
import {AuthContext} from '../../../App';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';

import ModalSelector from 'react-native-modal-selector';

import {setDefaultLocale} from '../../../Utils/Translation/translation';

const Login = ({navigation}) => {
  console.log('navigatoi0n', navigation.navigate);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [language, setLanguage] = useState('English');
  const {setToken} = React.useContext(AuthContext);

  const handleLogin = async () => {
    var encodedPassWord = md5(password);

    const response = await axiosGetData(
      `account/${username}/${encodedPassWord}`,
    );
    const succcess = await Storage.SetLogin(response.data.apiResult);

    if (response.data.apiResult === 'error') {
      Toast.show(__(`${response.data.message}`));
    }
    console.log('123', response.data);

    setToken(succcess);
  };
  // const data = [{language: 'English'}, {language: 'Hindi'}];
  let index = 0;
  const data = [
    {key: index++, label: 'English'},
    {key: index++, label: 'Hindi'},
  ];
  const changeLanguage = language => {
    return __(language);
  };
  return (
    <ScrollView>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        style={{
          padding: 24,
          width: '100%',
        }}>
        <ModalSelector
          initValue="Select tickets"
          accessible={true}
          scrollViewAccessibilityLabel={'Scrollable options'}
          cancelButtonAccessibilityLabel={'Cancel Button'}
          style={{marginLeft: 'auto'}}
          data={data}
          onChange={option => {
            console.log('option', option.label);
            setLanguage(option.label);
            setDefaultLocale(option.label);
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 30,
              paddingHorizontal: 18,
              justifyContent: 'space-around',
            }}>
            <TextInput
              style={{
                color: colors.black,
                fontSize: Size.medium,
                marginRight: 5,
                height: 40,
              }}
              editable={false}
              value={changeLanguage(language)}
            />
            <MaterialIcons
              style={{
                color: '#47BC30',
                fontSize: 16,
              }}
              name={'keyboard-arrow-down'}
            />
          </TouchableOpacity>
        </ModalSelector>
        <ImageBackground source={image.LoginBackground} style={[styles.head]}>
          <Image source={image.loginLogo} style={[styles.logo]} />
          <Text style={[styles.headText]}>{__('WELCOME TO')}</Text>
          <Text style={[styles.headText]}>{__('VEHICLE TRACKING SYSTEM')}</Text>
        </ImageBackground>
        <View style={{marginTop: 90}}>
          <View style={[styles.inputBox, {marginBottom: 20}]}>
            <Image source={image.person} />
            <TextInput
              placeholder={__('enter your username')}
              value={username}
              style={styles.input}
              onChangeText={newText => setUsername(newText)}
            />
          </View>

          <View style={[styles.inputBox, {marginBottom: 13}]}>
            <Image source={image.security} />
            <TextInput
              placeholder={__('enter your password')}
              value={password}
              style={styles.input}
              secureTextEntry={!show ? true : false}
              onChangeText={newText => setPassword(newText)}
            />
            <TouchableOpacity onPress={() => setShow(!show)}>
              <FontAwesome
                style={{
                  color: '#AEAEAE',
                  fontSize: 16,
                }}
                name={show ? 'eye' : 'eye-slash'}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>{__('Forgot Password?')}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleLogin()}>
          <LinearGradient
            colors={[colors.largeBtn1, colors.largeBtn2]}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{__('Login')}</Text>
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

export default Login;
