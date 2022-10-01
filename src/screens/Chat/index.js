import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import {__} from '../../../Utils/Translation/translation';
import Storage from '../../../Utils/Storage';
import {axiosGetData} from '../../../Utils/ApiController';
import moment from 'moment';
import {baseUrl} from '../../../Utils/ApiController';
import {useIsFocused} from '@react-navigation/native';

import styles from './style';
import axios from 'axios';

const Chat = props => {
  const focus = useIsFocused();
  const [chatDetail, setChatDetail] = useState([]);
  const [loginDetails, setLoginDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (focus == true) {
      getDetails();
    }
    // getIcon();
  }, [focus]);
  const getDetails = async () => {
    console.log('hihihihihih');
    const details = await Storage.getLoginDetail('login_detail');
    setLoginDetails(details);
    const data = {
      accountId: details.accountId,
      password: details.password,
      // accountId: 'virendratest',
      // password: 'ae6343555ef7aefd8a60ff88c6363e9c',
    };
    const response = await axiosGetData('getCustMessages', data);
    setChatDetail(response.data.messages);
    setIsLoading(true);
    return response.data.messages;
  };
  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.header}>
        <View style={styles.headerContainer}>
          <View style={styles.headerImageCont}>
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
              <Image source={image.drawer} style={styles.drawImg} />
            </TouchableOpacity>
            <Text style={styles.chatText}>{__('Chat')}</Text>
          </View>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Image source={image.search} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {isLoading ? (
        <LinearGradient colors={['#BCE2FF', '#FFFFFF']} style={{flex: 1}}>
          <TouchableOpacity
            style={styles.chatDetailBox}
            onPress={() =>
              props.navigation.navigate('ChatDetails', {
                getDetails: getDetails,
                loginDetails: loginDetails,
              })
            }>
            <TouchableOpacity style={{width: '15%', borderRadius: 50}}>
              <Image
                source={{uri: `${baseUrl}/download/customerIcon`}}
                style={{width: 55, height: 55}}
              />
            </TouchableOpacity>
            <View style={styles.accountTextCont}>
              <View style={styles.accountBox}>
                <Text numberOfLines={1} style={styles.accountText}>
                  {loginDetails?.accountName}
                </Text>
                <Text style={{fontSize: 16}}>
                  {moment(chatDetail[chatDetail?.length - 1]?.dateTime).format(
                    'hh:mm a',
                  )}
                </Text>
              </View>
              <Text numberOfLines={1} style={styles.msgText}>
                {chatDetail[chatDetail?.length - 1]?.message}
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default Chat;
