import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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
import ModalSelector from 'react-native-modal-selector';
import {setDefaultLocale} from '../../../Utils/Translation/translation';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ForgotPassword_1 = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [language, setLanguage] = useState('English');

  const handleSubmit = async () => {
    setLoading(true);
    if (newPassword === confirmPassword) {
      const response = await axiosGetData(
        `forgotPasswordUpdate/rrenterprises/${otp}/${newPassword}`,
      );
      console.log('forgot password', response.data);
      setLoading(false);
      if (response.data.apiResult === 'success') {
        if (response.data.message == 'InvalidOtp') {
          Toast.show(__(`${response.data.message}`));
          setLoading(false);
        } else {
          Toast.show(__(`${response.data.message}`));
          navigation.navigate('Login');
        }
      }
      if (response.data.apiResult === 'error') {
        Toast.show(__(`${response.data.message}`));
        setLoading(false);
      }
    } else {
      console.warn('Didnot Match confirm password');
      Toast.show(__(`Didnot Match confirm password`));

      setLoading(false);
    }
  };
  let index = 0;

  const data = [
    {key: index++, label: 'English'},
    {key: index++, label: 'Hindi'},
  ];
  const changeLanguage = language => {
    return __(language);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        style={{
          padding: 24,
          width: '100%',
          height: '100%',
        }}>
        {/* <ImageBackground source={image.LoginBackground} style={[styles.head]}> */}
        {/* <View style={styles.headerContainer}>
            <Image source={image.backArrow} style={{height: 12, width: 23}} />
            <TouchableOpacity style={styles.lang}>
              <Text style={{fontSize: Size.large}}>{__('English')}</Text>
            </TouchableOpacity>
          </View> */}
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            // marginBottom:50
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{paddingVertical: 10, alignItems: 'center'}}>
            <Image source={image.backArrow} style={{height: 12, width: 23}} />
          </TouchableOpacity>
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
        </View>
        <Image source={image.loginLogo} style={[styles.logo]} />
        <Text style={[styles.headText]}>{__('WELCOME TO')}</Text>
        <Text style={[styles.headText]}>{__('VEHICLE TRACKING SYSTEM')}</Text>
        {/* </ImageBackground> */}
        <Text style={styles.forgotPassword}>{__('Forgot password Reset')}</Text>
        <View style={{marginTop: 23}}>
          <View style={[styles.inputBox]}>
            <TextInput
              placeholder={__('enter OTP')}
              style={styles.input}
              defaultValue={otp}
              onChangeText={data => setOtp(data)}
            />
          </View>
          <View style={[styles.inputBox]}>
            <TextInput
              placeholder={__('enter new password')}
              style={styles.input}
              defaultValue={newPassword}
              onChangeText={data => setnewPassword(data)}
            />
          </View>
          <View style={[styles.inputBox]}>
            <TextInput
              placeholder={__('confirm new password')}
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
      </LinearGradient>
    </ScrollView>
  );
};

export default ForgotPassword_1;
