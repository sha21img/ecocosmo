import React, {useState} from 'react';
import {Image, Text, View, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {image} from '../../../assets/images';
import {styles} from './style';
import {__} from '../../../Utils/Translation/translation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {axiosGetData} from '../../../Utils/ApiController';
import md5 from 'md5';
import Toast from 'react-native-simple-toast';

const ChangePassword = () => {
  const [Current, setCurrent] = useState('123456789');
  const [newPassword, setnewPassword] = useState('123456789');
  const [confirmPassword, setConfirmPassword] = useState('123456789');

  const handleSubmit = async () => {
    const DecodedPassword = md5(Current);
    if (newPassword === confirmPassword) {
      const response = await axiosGetData(
        `changepassword?accountid=rrenterprises&password=${DecodedPassword}&newpassword=${newPassword}`,
      );
      if (response.data.apiResult === 'error') {
        console.warn(response.data.message);
        Toast.show(__(`${response.data.message}`));
      }
    } else {
      console.warn('Didnot Match confirm password');
    }
  };

  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        style={styles.main}
        locations={[0, 0.9]}>
        <View style={styles.header}>
          <Image source={image.backArrow} style={{height: 12, width: 23}} />
          <Text style={styles.headerContentText}>{__('Change Password')}</Text>
        </View>
        <LinearGradient
          colors={[colors.Modalcolor1, colors.white]}
          style={styles.ContentBody}>
          <Text style={styles.inputHeading}>{__('Current Password')}</Text>
          <View style={[styles.inputBox, {marginBottom: 20}]}>
            <Image source={image.security} />
            <TextInput
              placeholder="Enter current password"
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
              placeholder="Enter password"
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
              placeholder="Enter password"
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
              <Text style={styles.loginButtonText}>{__('Submit')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </LinearGradient>
    </>
  );
};
export default ChangePassword;
