import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import {__} from '../../../Utils/Translation/translation';
import {styles} from './style';
import ToggleSwitch from 'toggle-switch-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Storage from '../../../Utils/Storage';
import {AuthContext} from '../../../App';
import {axiosGetData} from '../../../Utils/ApiController';
import {logout} from '../../../Utils/helper/logout';

function Setting({navigation}) {
  const [Ison, setIson] = useState(true);
  const {setToken} = React.useContext(AuthContext);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [loginDetails, setLoginDetails] = useState();
  const getNotification = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    setLoginDetails(succcess);
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const response = await axiosGetData(
      `getNoticationsStatus/${username}/${encodedPassWord}`,
    );
    setNotificationMessage(response.data.message);
  };
  useEffect(() => {
    getNotification();
  }, []);
  const sendNotification = async value => {
    setIson(!Ison);
    let number;
    if (value == false) {
      number = 0;
    } else {
      number = 1;
    }
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const response = await axiosGetData(
      `stopOrStartAllNotications/${username}/${encodedPassWord}/${number}`,
    );
  };
  return (
    <LinearGradient
      colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
      style={styles.header}>
      <View style={styles.headerContainer}>
        <View style={styles.headerImageCont}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={image.drawer} style={{height: 20, width: 23}} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: Size.large,
              color: colors.white,
            }}>
            {__('Settings')}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={
          loginDetails?.accountName == 'demo101'
            ? {backgroundColor: 'grey'}
            : {backgroundColor: 'transparent'}
        }
        disabled={loginDetails?.accountName == 'demo101' ? true : false}
        onPress={() => {
          navigation.navigate('ChangePassword');
        }}>
        <View style={styles.BodyContent}>
          <View
            style={{
              flexDirection: 'row',
              width: '60%',
            }}>
            <View style={{width: 24}}>
              <Image
                source={image.colouredLock}
                style={{width: 13, height: 18}}
              />
            </View>
            <Text style={styles.BodyContentText}>{__('Change Password')}</Text>
          </View>
          <Image source={image.right} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Renewal')}
        style={styles.BodyContent}>
        <View
          style={{
            flexDirection: 'row',
            width: '60%',
          }}>
          <View style={{width: 24}}>
            <Image source={image.fileRefresh} />
          </View>
          <Text style={styles.BodyContentText}>{__('Renewal Details')}</Text>
        </View>
        <Image source={image.right} />
      </TouchableOpacity>
      <View style={styles.BodyContent}>
        <View
          style={{
            flexDirection: 'row',
            width: '60%',
          }}>
          <View style={{width: 24}}>
            <Image source={image.Petrol} style={{width: 13, height: 18}} />
          </View>
          <Text style={styles.BodyContentText}>{__('Notification')}</Text>
        </View>
        <ToggleSwitch
          isOn={notificationMessage === 'ON' && Ison}
          onColor={colors.toggleColoron}
          offColor={colors.toggleColorOff}
          size="large"
          onToggle={value => {
            sendNotification(value);
          }}
        />
      </View>
      <TouchableOpacity onPress={() => logout(setToken)}>
        <LinearGradient
          colors={[colors.subGradientcolour1, colors.subGradientcolour2]}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          locations={[0.5, 1.5]}
          style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>{__('Logout')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default Setting;
