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

import styles from './style';
import axios from 'axios';

const Chat = props => {
  const [chatDetail, setChatDetail] = useState([]);
  useEffect(() => {
    // getDetails();
    // getIcon();
  }, []);
  const getDetails = async () => {
    const details = await Storage.getLoginDetail('login_detail');
    console.log('details', details);
    const data = {
      // accountId: details.accountId,
      // password: details.password,

      accountId: 'virendratest',
      password: 'ae6343555ef7aefd8a60ff88c6363e9c',
    };
    const response = await axiosGetData('getCustMessages', data);
    console.log('chat response', response.data.messages);
    setChatDetail(response.data.messages);
  };
  // {"0": "virendratest",
  //  "1": "Xys",
  // "2": "2018-03-28 19:09:28",
  // "3": "iOS",
  // "accountId": "virendratest",
  // "dateTime": "2018-03-28 19:09:28",
  // "message": "Xys",
  //  "type": "iOS"},

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
              <Image
                source={image.drawer}
                style={{height: 20, width: 23, marginVertical: 5}}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: Size.large,
                color: colors.white,
                paddingHorizontal: 10,
              }}>
              {__('Chat')}
            </Text>
          </View>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Image source={image.search} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <LinearGradient colors={['#BCE2FF', '#FFFFFF']} style={{flex: 1}}>
        {/* {chatDetail?.map(item => {
          return ( */}
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: 'row',
            width: '100%',
            backgroundColor: 'white',
            marginBottom: 1.5,
          }}
          onPress={() =>
            // props.navigation.navigate('ChatDetails', {details: item})
            props.navigation.navigate('ChatDetails')
          }>
          <TouchableOpacity style={{width: '15%', borderRadius: 50}}>
            <Image
              source={{uri: `${baseUrl}/download/customerIcon`}}
              style={{width: 55, height: 55}}
            />
          </TouchableOpacity>
          <View
            style={{
              paddingLeft: 10,
              width: '84%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: 5,
                  fontWeight: 'bold',
                  fontSize: 18,
                  width: '70%',
                }}>
                {/* {item.accountId} */}
                name
              </Text>
              <Text style={{fontSize: 16}}>
                {/* {moment(item.dateTime).format('hh:mm a')} */}
                10:34 AM
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={{
                paddingVertical: 5,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {/* {item.message} */}
              Please Track the Location & send me the exact...
            </Text>
          </View>
        </TouchableOpacity>
        {/* );
        })} */}
      </LinearGradient>
    </>
  );
};

export default Chat;
