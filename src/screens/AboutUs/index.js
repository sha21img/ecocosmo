import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import {axiosGetData, baseUrl} from '../../../Utils/ApiController';
import Storage from '../../../Utils/Storage';
import {__} from '../../../Utils/Translation/translation';
import {styles} from './style';

const AboutUs = props => {
  const [details, setDetails] = useState();
  const contactUsDetails = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    console.log('0000', succcess);
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const response = await axiosGetData(
      `account/${username}/${encodedPassWord}`,
    );

    setDetails(response.data);
    console.log('>>>>>>>', details);
    // if (response.data.apiResult === 'error') {
    //   // Toast.show(__(`${response.data.message}`));
    // }
  };

  useEffect(() => {
    contactUsDetails();
  }, []);

  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        style={styles.main}
        locations={[0, 0.9]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
            }}
            onPress={() => props.navigation.openDrawer()}>
            <Image
              source={image.drawer}
              style={{
                height: 23,
                width: 23,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.headerContentText}>{__('About Us')}</Text>
        </View>
        <LinearGradient
          colors={[colors.Modalcolor1, colors.white]}
          style={styles.ContentBody}>
          <View style={styles.ContentSubBody}>
            <Image
              source={{uri: `${baseUrl}/download/appOwnerLogo`}}
              style={{width: '80%', height: 150, resizeMode: 'contain'}}
            />
            <Text style={styles.ContentBodyhead}>{__('SERVICE PARTNER')}</Text>
            <Text style={styles.ContentBodyhead2}>{details?.brandName}</Text>
            <Text style={styles.ContentBodyhead3}>
              {__('Version FP-v7.0.03')}
            </Text>
          </View>
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.footer}>
              {__('Copyright 2022. All Rights Reserved')}
            </Text>
          </View>
        </LinearGradient>
      </LinearGradient>
    </>
  );
};
export default AboutUs;
