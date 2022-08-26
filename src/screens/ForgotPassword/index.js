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
import {baseUrl} from '../../../Utils/ApiController';
import styles from './style';
import {Size} from '../../../assets/fonts/Fonts';
import {__} from '../../../Utils/Translation/translation';
import {axiosGetData} from '../../../Utils/ApiController';
import Toast from 'react-native-simple-toast';
import ModalSelector from 'react-native-modal-selector';
import {setDefaultLocale} from '../../../Utils/Translation/translation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ForgotPassword = props => {
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState('');
  const [language, setLanguage] = useState('English');
  const getOtp = async () => {
    setLoading(true);
    const response = await axiosGetData(`forgotPasswordOtp/${email}`);
    if (response.data.message.message === 'success') {
      props.navigation.navigate('ForgotPassword-1', {
        companyName: props.route.params.companyName,
      });
      setLoading(false);
    } else {
      Toast.show(__(`${response.data.message}`));
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
    <LinearGradient
      colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
      style={{
        width: '100%',
        height: '100%',
      }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{padding: 25}}>
        <ImageBackground source={image.LoginBackground} style={[styles.head]}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
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
            {/* <TouchableOpacity style={styles.lang}>
              <Text style={{fontSize: Size.large}}>{__('English')}</Text>
            </TouchableOpacity> */}
          </View>
          <Image
            source={{uri: `${baseUrl}/download/appOwnerLogo`}}
            style={[styles.logo]}
          />
          <Text style={styles.companyText}>
            {props.route.params.companyName}
          </Text>
          <Text style={[styles.headText]}>{__('WELCOME TO')}</Text>
          <Text style={[styles.headText]}>{__('VEHICLE TRACKING SYSTEM')}</Text>
        </ImageBackground>
        <Text style={styles.forgotPassword}>{__('Forgot Password')}</Text>
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
          <TouchableOpacity onPress={() => console.log('login as a demo')}>
            <Image source={image.Mob} style={{height: 34, width: 34}} />
          </TouchableOpacity>
          {/* <Image source={image.whatsApp} style={{height: 34, width: 34}} />
          <Image source={image.incomingCall} style={{height: 34, width: 34}} /> */}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ForgotPassword;
