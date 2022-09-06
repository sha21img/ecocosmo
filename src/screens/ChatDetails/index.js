import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import {__} from '../../../Utils/Translation/translation';
import styles from './style';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {baseUrl} from '../../../Utils/ApiController';
import {axiosGetData} from '../../../Utils/ApiController';
import Storage from '../../../Utils/Storage';

const ChatDetails = props => {
  const {getDetails, loginDetails} = props.route.params;
  const [message, setMessage] = useState('');
  const [chatDetail, setChatDetail] = useState();

  // const {details} = props?.route?.params;
  // console.log('pppppppp', details);

  // const getChat = async () => {
  //   const loginDetails = await Storage.getLoginDetail('login_detail');
  //   setLoginDetails(loginDetails);
  //   const data = {
  //     // accountId: loginDetails?.accountId || '',
  //     // password: loginDetails?.password || '',
  //     accountId: 'virendratest',
  //     password: 'ae6343555ef7aefd8a60ff88c6363e9c',
  //   };
  //   const response = await axiosGetData('getCustMessages', data);
  //   setChatDetail(response.data.messages);
  // };
  const getChatDetail = async () => {
    const loginDetails = await Storage.getLoginDetail('login_detail');

    const data = {
      fname: '',
      lname: '',
      mobile: loginDetails?.mobile || '',
      email: loginDetails?.email || '',
      message: message,
      type: Platform.OS == 'android' ? 'android' : 'ios',
      // accountId: 'virendratest',
      accountId: loginDetails?.accountId || '',
      managerId: '',
    };
    console.log('chatDetailParamas', data);
    const response = await axiosGetData('reachus', data);
    console.log('chatDetailResponse', response.data);
    setMessage('');
  };
  const scrollViewRef = React.useRef();
  useEffect(() => {
    // getChat();
    const interval = setInterval(() => {
      getFunction();
    }, 1000);
    return () => clearInterval(interval);
  }, [message]);

  const getFunction = async () => {
    const details = await getDetails();
    setChatDetail(details);
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
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{paddingVertical: 10}}>
              <MaterialCommunityIcons
                style={{
                  color: '#FFFFFF',
                  fontSize: 30,
                }}
                name={'keyboard-backspace'}
              />
            </TouchableOpacity>
            <Image
              resizeMode="contain"
              source={{uri: `${baseUrl}/download/customerIcon`}}
              style={{width: 35, height: 35, borderRadius: 50, marginLeft: 10}}
            />
            <Text
              style={{
                fontSize: Size.large,
                color: colors.white,
                paddingHorizontal: 10,
              }}>
              {loginDetails?.accountName}
            </Text>
          </View>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Ionicons
              style={{
                color: '#FFFFFF',
                fontSize: 16,
              }}
              name={'call'}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <LinearGradient colors={['#BCE2FF', '#FFFFFF']} style={{flex: 1}}>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          {chatDetail?.map(item => {
            return item.source == '0' ? (
              <>
                <LinearGradient
                  colors={['#ffffff', '#ffffff']}
                  key={Math.random()}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 1}}
                  style={{
                    width: '60%',
                    marginHorizontal: 10,
                    paddingHorizontal: 10,
                    margin: 20,
                    marginLeft: 'auto',
                    elevation: 10,
                    paddingTop: 10,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                  }}>
                  <View>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      {item.message}
                    </Text>
                  </View>
                  <View style={{paddingVertical: 10}}>
                    <Text style={{fontSize: 14}}>
                      {moment(item.dateTime).format('hh:mm a')}
                    </Text>
                  </View>
                </LinearGradient>
              </>
            ) : (
              <>
                <LinearGradient
                  colors={['#16BCD4', '#395DBF']}
                  key={Math.random()}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 1}}
                  style={{
                    margin: 20,
                    width: '60%',
                    marginHorizontal: 10,
                    paddingHorizontal: 10,
                    paddingTop: 10,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    marginTop: 20,
                    elevation: 10,
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      {item.message}
                    </Text>
                  </View>
                  <View style={{paddingVertical: 10}}>
                    <Text style={{fontSize: 14, color: 'white'}}>
                      {moment(item.dateTime).format('hh:mm a')}
                    </Text>
                  </View>
                </LinearGradient>
              </>
            );
          })}
        </ScrollView>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder={__('Message')}
            value={message}
            style={{
              backgroundColor: colors.white,
              width: '80%',
              borderRadius: 7,
              elevation: 5,
              fontSize: 18,
              padding: 10,
            }}
            onChangeText={newText => setMessage(newText)}
          />
          <TouchableOpacity onPress={() => getChatDetail()}>
            <LinearGradient
              colors={['#395DBF', '#16BCD4']}
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome
                style={{
                  color: '#FFFFFF',
                  fontSize: 18,
                }}
                name={'send'}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
};

export default ChatDetails;
