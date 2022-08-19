import React, {useState, useEffect, createRef, useRef} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  View,
  Button,
} from 'react-native';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import ViewShot from 'react-native-view-shot';
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
import SelectDropdown from 'react-native-select-dropdown';
import {axiosGetData} from '../../../Utils/ApiController';
import Storage from '../../../Utils/Storage';
import RNFS from 'react-native-fs';
function Notifications(props) {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);
  const [filter, setFilter] = useState([]);
  const [data, setdata] = useState();
  const [search, setSearch] = useState(false);
  // const [open, setopen] = useState(false);
  const [selected, setSelected] = useState('All Vehicle');
  const [searched, setSearched] = useState('1');

  const GetNotification = async () => {
    // let accountid = 'GlobalCars';
    const succcess = await Storage.getLoginDetail('login_detail');
    const data = await Storage.getVehicleDetail('vehicle_detail');
    setdata(data);
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

  const getVehicle = async () => {
    const succcess = await Storage.getVehicleDetail('vehicle_detail');
    console.log('succcess', succcess[0]);
    setdata(succcess);
    setopen(true);
  };
  const Select = data => {
    setSelected(data);
    // setopen(false);
    const noti = notification.filter(el => {
      return el.deviceId == data;
    });
    console.log('00---', noti);
    setFilter(noti);
  };

  const searchFunction = text => {
    setSelected('All Vehicle');
    setSearch(true);
    console.log('text', text);
    if (!!text) {
      setSearched('');
      var newArr = notification.filter(item => {
        return item.deviceId.toLowerCase().includes(text.toLowerCase());
      });
      !!newArr && newArr.length > 0 ? setFilter(newArr) : setFilter([]);
    } else {
      setSearched('1');
    }
  };

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
  const refs = React.useRef();
  console.log('refs', refs.viewShot);
  const captureAndShareScreenshot = () => {
    refs.current.capture().then(uri => {
      RNFS.readFile(uri, 'base64').then(res => {
        console.log(res, 'pp');
        let urlString = 'data:image/jpeg;base64,' + res;
        let options = {
          title: 'Share Title',
          message: 'Share Message',
          url: urlString,
          type: 'image/jpeg',
        };
        console.log(options, 'optionsoptionsoptions');
        Share.open(options)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            err && console.log(err);
          });
      });
    });
  };
  return (
    <ViewShot ref={refs} options={{format: 'jpg', quality: 0.9}}>
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
            <TouchableOpacity
              onPress={() => captureAndShareScreenshot()}
              style={{
                flexDirection: 'row',
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
              {!search ? (
                <TouchableOpacity onPress={() => setSearch(true)}>
                  <Image
                    source={image.search}
                    style={{height: 18, width: 18, marginLeft: 15}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setSearch(false);
                    setSearched('1');
                  }}>
                  <Entypo style={styles.crossIcon} name={'cross'} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
          {search ? (
            <View
              style={{
                width: '100%',
                marginBottom: 20,
                marginTop: 10,
                borderRadius: 7,
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="Select vehicle number"
                style={{
                  backgroundColor: colors.white,
                  borderRadius: 7,
                  width: '90%',
                  paddingHorizontal: 10,
                }}
                onChangeText={searchFunction}
              />
            </View>
          ) : null}
        </LinearGradient>
        <View style={styles.textinputbox}>
          <SelectDropdown
            buttonStyle={{
              width: '100%',
            }}
            data={data}
            defaultButtonText={selected}
            onSelect={(selectedItem, index) => {
              setSelected(selectedItem.deviceId);
              Select(selectedItem.deviceId);
              console.log(selectedItem.deviceId, index);
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem.deviceId;
            }}
            rowTextForSelection={item => {
              return item.deviceId;
            }}
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
              data={
                selected === 'All Vehicle' && !!searched ? notification : filter
              }
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              contentContainerStyle={{paddingBottom: 100}}
            />
          )}
        </LinearGradient>
      </View>
    </ViewShot>
  );
}

export default Notifications;
