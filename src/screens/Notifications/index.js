import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {Size} from '../../../assets/fonts/Fonts';
import {image} from '../../../assets/images';
import ToggleSwitch from 'toggle-switch-react-native';
import {__} from '../../../Utils/Translation/translation';
import {styles} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {axiosGetData} from '../../../Utils/ApiController';
import Storage from '../../../Utils/Storage';
function Notifications(props) {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);
  const GetNotification = async () => {
    // let accountid = 'GlobalCars';
    const succcess = await Storage.getLoginDetail('login_detail');

    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    // let password = '62d959fc42e70781bd2a5bb242d4d7c6';
    setLoading(true);
    const response = await axiosGetData(
      `getNotifications/${username}/${encodedPassWord}`,
    );
    if (response?.data.apiResult == 'success') {
      setLoading(false);
      setNotification(response.data.notificationDetails);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetNotification();
  }, []);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 7,
          backgroundColor: 'white',
          width: '100%',
          marginVertical: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image source={image.carWhiteUp} style={{height: 50, width: 20}} />
          <View style={{paddingHorizontal: 15}}>
            <Text
              style={{
                color: '#303030',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {item.deviceId}
            </Text>
            <Text
              style={{
                color: '#484848',
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              {item.message.includes('ON') ? 'Engine on' : 'Engine off'}
            </Text>
            <Text style={{color: '#ACACAC', fontSize: 12}}>
              {item.timeStamp}
            </Text>
          </View>
        </View>
        <Image
          source={image.notificationSmall}
          style={{height: 18, width: 18}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{height: '100%', backgroundColor: 'white'}}>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={{paddingHorizontal: 16}}>
        <View style={styles.navcontainer}>
          <View style={styles.navbox}>
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
              <Image source={image.drawer} style={styles.dashimg} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: Size.large,
                color: colors.white,
                paddingHorizontal: 15,
              }}>
              {__('Notification')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '50%',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Entypo
              style={{
                color: colors.white,
                fontSize: 20,
              }}
              name={'share'}
            />
            <Image
              source={image.search}
              style={{height: 18, width: 18, marginLeft: 15}}
            />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.textinputbox}>
        <TextInput placeholder="All Vehicle" style={styles.textinput} />
        <MaterialIcons
          style={{
            color: '#3D3D3D',
            fontSize: 22,
          }}
          name={'keyboard-arrow-down'}
        />
      </View>

      <LinearGradient
        colors={['#BCE2FF', '#FFFFFF']}
        style={{paddingHorizontal: 20, flex: 1}}>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={colors.black} size="large" />
          </View>
        ) : (
          <FlatList
            data={notification}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom: 100}}
          />
        )}
      </LinearGradient>
    </View>
  );
}

export default Notifications;
