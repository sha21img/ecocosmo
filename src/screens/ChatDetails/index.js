import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  ActivityIndicator,
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {axiosGetData} from '../../../Utils/ApiController';
import Storage from '../../../Utils/Storage';

const ChatDetails = props => {
  const [message, setMessage] = useState();
  const [chatDetail, setChatDetail] = useState([]);

  // const {details} = props?.route?.params;
  // console.log('pppppppp', details);
  useEffect(() => {
    // getChatDetail();
    getChat();
  });
  const getChat = async () => {
    const loginDetails = await Storage.getLoginDetail('login_detail');
    const data = {
      // accountId: loginDetails?.accountId || '',
      // password: loginDetails?.password || '',
      accountId: 'virendratest',
      password: 'ae6343555ef7aefd8a60ff88c6363e9c',
    };
    console.log('chat', data);
    const response = await axiosGetData('getCustMessages', data);
    console.log('chatDetCustMes====tailResponse', response.data);
  };
  const getChatDetail = async () => {
    const loginDetails = await Storage.getLoginDetail('login_detail');
    console.log('lllllll', details);

    const data = {
      fname: '',
      lname: '',
      mobile: loginDetails?.mobile || '',
      email: loginDetails?.email || '',
      message: details.message || '',
      type: details.type || '',
      accountId: loginDetails?.accountId || '',
      managerId: '',
    };
    console.log('chatDetailParamas', data);
    const response = await axiosGetData('reachus', data);
    console.log('chatDetailResponse', response.data);
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
        <ScrollView style={{flex: 1}}>
          <TouchableOpacity
            style={{
              width: '60%',
              backgroundColor: 'lightgreen',
              marginHorizontal: 10,
              paddingLeft: 10,
              borderTopWidth: 10,
              borderLeftWidth: 10,
              borderLeftColor: 'white',
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: 'transparent',
              elevation: 10,
              marginTop: 20,
            }}>
            <View>
              <Text style={{fonrSize: 16}}>
                I am tracking this already I am tracking this already I am
                tracking this already I am tracking this already I am tracking
                this already I am tracking this already I am tracking this
                already I am tracking this already
              </Text>
            </View>
            <View style={{paddingTop: 10}}>
              <Text>10:34 AM</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '60%',
              backgroundColor: 'lightpink',
              marginHorizontal: 10,
              paddingRight: 10,
              borderWidth: 10,
              borderLeftColor: 'transparent',
              borderTopColor: 'transparent',
              borderRightColor: 'white',
              borderBottomColor: 'transparent',
              marginTop: 20,
              marginLeft: 'auto',
              elevation: 10,
            }}>
            <View>
              <Text style={{fonrSize: 16}}>
                I am tracking this already I am tracking this already I am
                tracking this already I am tracking this already I am tracking
                this already I am tracking this already I am tracking this
                already I am tracking this already
              </Text>
            </View>
            <View style={{paddingTop: 10}}>
              <Text>10:34 AM</Text>
            </View>
          </TouchableOpacity>
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
