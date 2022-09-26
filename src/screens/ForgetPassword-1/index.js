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
import Storage from '../../../Utils/Storage';

import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import {baseUrl} from '../../../Utils/ApiController';
import {Size} from '../../../assets/fonts/Fonts';
import {__} from '../../../Utils/Translation/translation';
import {axiosGetData} from '../../../Utils/ApiController';
import Toast from 'react-native-simple-toast';
import ModalSelector from 'react-native-modal-selector';
import {setDefaultLocale} from '../../../Utils/Translation/translation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-check-box';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ForgotPassword_1 = props => {
  const {username} = props?.route?.params;
  console.log('aaaa', username);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [language, setLanguage] = useState('English');
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // const succcess = await Storage.getLoginDetail('login_detail');
    // let username = succcess.accountId;
    // console.log("username",username);
    // let encodedPassWord = succcess.password;
    if (newPassword === confirmPassword) {
      const response = await axiosGetData(
        `forgotPasswordUpdate/${username}/${otp}/${newPassword}`,
      );
      console.log('forgot password', response.data);
      setLoading(false);
      if (response.data.apiResult === 'success') {
        if (response.data.message == 'Success') {
          Toast.show(__(`${response.data.message}`));
          props.navigation.navigate('Login');

          setLoading(false);
        } else {
          Toast.show(__(`${response.data.message}`));
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
    {key: index++, label: 'Marathi'},
    {key: index++, label: 'Gujarati'},
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
        style={styles.linearGrad}>
        {/* <ImageBackground source={image.LoginBackground} style={[styles.head]}> */}
        {/* <View style={styles.headerContainer}>
            <Image source={image.backArrow} style={{height: 12, width: 23}} />
            <TouchableOpacity style={styles.lang}>
              <Text style={{fontSize: Size.large}}>{__('English')}</Text>
            </TouchableOpacity>
          </View> */}
        <View style={styles.selectorCont}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.selectorBox}>
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
            <TouchableOpacity style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                editable={false}
                value={changeLanguage(language)}
              />
              <MaterialIcons
                style={styles.arrowIcon}
                name={'keyboard-arrow-down'}
              />
            </TouchableOpacity>
          </ModalSelector>
        </View>
        <Image
          source={{uri: `${baseUrl}/download/appOwnerLogo`}}
          style={[styles.logo]}
        />
        <Text style={styles.companyText}>{props.route.params.companyName}</Text>
        <Text style={[styles.headText]}>{__('WELCOME TO')}</Text>
        <Text style={[styles.headText]}>{__('VEHICLE TRACKING SYSTEM')}</Text>
        {/* </ImageBackground> */}
        <Text style={styles.forgotPassword}>{__('Forgot password Reset')}</Text>
        <View>
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
              type="password"
              mode="outline"
              secureTextEntry={!show ? true : false}
              onChangeText={data => setnewPassword(data)}
            />
            {/* <TouchableOpacity
              onPress={() => setShow(!show)}
              style={{padding: 10}}>
              <FontAwesome
                style={{
                  color: '#AEAEAE',
                  fontSize: 16,
                  padding: 5,
                }}
                name={show ? 'eye' : 'eye-slash'}
              />
            </TouchableOpacity> */}

            {/*  */}
          </View>

          <View style={[styles.inputBox]}>
            <TextInput
              placeholder={__('confirm new password')}
              style={styles.input}
              defaultValue={confirmPassword}
              secureTextEntry={!show ? true : false}
              onChangeText={data => setConfirmPassword(data)}
            />
            {/* <TouchableOpacity
              style={{padding: 10}}
              onPress={() => setShowConfirm(!showConfirm)}>
              <FontAwesome
                style={{
                  color: '#AEAEAE',
                  fontSize: 16,
                  padding: 5,
                }}
                name={showConfirm ? 'eye' : 'eye-slash'}
              />
            </TouchableOpacity> */}
          </View>
        </View>
        <TouchableOpacity
          // key={el.id}
          style={styles.checkBox}>
          <CheckBox
            isChecked={show}
            checkBoxColor="skyblue"
            onClick={e => setShow(!show)}
          />
          <Text style={styles.passText}>Show password</Text>
        </TouchableOpacity>
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
      </LinearGradient>
    </ScrollView>
  );
};

export default ForgotPassword_1;
