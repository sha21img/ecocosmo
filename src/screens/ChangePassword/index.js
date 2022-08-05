import React, {useState} from 'react';
import {Image, Text, View, ActivityIndicator, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import {styles} from './style';
import {__} from '../../../Utils/Translation/translation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {axiosGetData} from '../../../Utils/ApiController';
import md5 from 'md5';
import Toast from 'react-native-simple-toast';
import Storage from '../../../Utils/Storage';

const ChangePassword = props => {
  const [Current, setCurrent] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const loginDetail = await Storage.getLoginDetail('login_detail');
    let username = loginDetail.accountName;
    let password = loginDetail.password;
    setLoading(true);
    const DecodedPassword = md5(Current);
    if (newPassword === confirmPassword) {
      const response = await axiosGetData(
        `changepassword?accountid=${username}&password=${DecodedPassword}&newpassword=${newPassword}`,
      );
      if (response.data.apiResult === 'success') {
        setLoading(false);
      } else {
        console.warn(response.data.message);
        Toast.show(response.data.message);
        setLoading(false);
      }
    } else {
      console.warn('Didnot Match confirm password');
      setLoading(false);
    }
  };

  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        style={styles.main}
        locations={[0, 0.9]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={image.backArrow} style={{height: 12, width: 23}} />
          </TouchableOpacity>
          <Text style={styles.headerContentText}>{__('Change Password')}</Text>
        </View>
        <LinearGradient
          colors={[colors.Modalcolor1, colors.white]}
          style={styles.ContentBody}>
          <Text style={styles.inputHeading}>{__('Current Password')}</Text>
          <View style={[styles.inputBox, {marginBottom: 20}]}>
            <Image source={image.security} />
            <TextInput
              placeholder={__('Enter current password')}
              placeholderTextColor={'#BBBBBB'}
              style={styles.input}
              defaultValue={Current}
              onChangeText={data => setCurrent(data)}
            />
          </View>
          <Text style={styles.inputHeading}>{__('New Password')}</Text>
          <View style={[styles.inputBox, {marginBottom: 20}]}>
            <Image source={image.security} />
            <TextInput
              placeholder={__('Enter password')}
              placeholderTextColor={'#BBBBBB'}
              style={styles.input}
              defaultValue={newPassword}
              onChangeText={data => setnewPassword(data)}
            />
          </View>
          <Text style={styles.inputHeading}>{__('Confirm New Password')}</Text>
          <View style={[styles.inputBox, {marginBottom: 20}]}>
            <Image source={image.security} />
            <TextInput
              placeholder={__('Confirm New Password')}
              placeholderTextColor={'#BBBBBB'}
              style={styles.input}
              defaultValue={confirmPassword}
              onChangeText={data => setConfirmPassword(data)}
            />
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
        </LinearGradient>
      </LinearGradient>
    </>
  );
};
export default ChangePassword;
