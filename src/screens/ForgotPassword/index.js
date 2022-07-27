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
import ModalSelector from 'react-native-modal-selector';
import {setDefaultLocale} from '../../../Utils/Translation/translation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const ForgotPassword = ({navigation}) => {
  const [email, setemail] = useState('');
  const [language, setLanguage] = useState('English');

  const getOtp = async () => {
    const response = await axiosGetData(`forgotPasswordOtp/${email}`);
    console.log(response.data);
    if (response.data.message.message === 'success') {
      navigation.navigate('ForgotPassword-1');
    } else {
      Toast.show(__(`${response.data.message.message}`));
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
            {/* <TouchableOpacity style={styles.lang}>
              <Text style={{fontSize: Size.large}}>{__('English')}</Text>
            </TouchableOpacity> */}
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

export default ForgotPassword;
