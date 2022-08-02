import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import {baseUrl} from '../../../Utils/ApiController';
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
import {log} from 'react-native-reanimated';
import axios from 'axios';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [language, setLanguage] = useState('English');
  const {setToken, setSplash} = React.useContext(AuthContext);

  const [logo, setLogo] = useState(null);
  const [companyName, setCompanyName] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    var encodedPassWord = md5(password);

    const response = await axiosGetData(
      `account/${username}/${encodedPassWord}`,
    );
    const succcess = await Storage.SetLogin(response.data.apiResult);
    const detail = await Storage.SetLoginDetail(response.data);

    if (response.data.apiResult === 'success') {
      setLoading(false);
    } else {
      Toast.show(__(`${response.data.message}`));
      setLoading(false);
    }

    setToken(succcess);
    setSplash(true);
  };
  const getLogo = async () => {
    const logo = await axiosGetData(`download/appOwnerLogo`);
    setLogo(logo.data);
    console.log('logo', logo.data);
  };
  const getCompanyName = async () => {
    const companyName = await axiosGetData(`loginScreenCompanyName`);
    setCompanyName(companyName.data.message);
    console.log('logo', companyName.data.message);
  };
  useEffect(() => {
    Promise.all([getLogo(), getCompanyName()]).then(values => {
      console.log(values);
    });
  });
  // const data = [{language: 'English'}, {language: 'Hindi'}];
  let index = 0;
  const data = [
    {key: index++, label: 'English'},
    {key: index++, label: 'Hindi'},
    {key: index++, label: 'Marathi'},
    {key: index++, label: 'Gujarati'},
  ];
  const changeLanguage = language => {
    return __(language);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        style={styles.mainContainer}>
        <ModalSelector
          initValue="Select tickets"
          accessible={true}
          scrollViewAccessibilityLabel={'Scrollable options'}
          cancelButtonAccessibilityLabel={'Cancel Button'}
          style={{marginLeft: 'auto'}}
          data={data}
          onChange={option => {
            setLanguage(option.label);
            setDefaultLocale(option.label);
          }}>
          <TouchableOpacity style={styles.pickerContainer}>
            <TextInput
              style={styles.pickerText}
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
          <Image
            source={{uri: `${baseUrl}/download/appOwnerLogo`}}
            style={[styles.logo]}
          />
          <Text style={styles.companyText}>{companyName}</Text>
          <Text style={[styles.headText]}>{__('WELCOME TO')}</Text>
          <Text style={[styles.headText]}>{__('VEHICLE TRACKING SYSTEM')}</Text>
        </ImageBackground>
        <View style={{marginTop: 70}}>
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
                  padding: 5,
                }}
                name={show ? 'eye' : 'eye-slash'}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ForgotPassword', {
                companyName: companyName,
              })
            }>
            <Text style={styles.forgotPassword}>{__('Forgot Password?')}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{margin: 20}} onPress={() => handleLogin()}>
          <LinearGradient
            colors={[colors.largeBtn1, colors.largeBtn2]}
            style={styles.loginButton}>
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.loginButtonText}>{__('Login')}</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

export default Login;
