import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, Text, View, Dimensions} from 'react-native';
import {image} from '../../../assets/images';
import colors from '../../../assets/Colors';
import {axiosGetData} from '../../../Utils/ApiController';
import {Size} from '../../../assets/fonts/Fonts';
import Storage from '../../../Utils/Storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {__} from '../../../Utils/Translation/translation';
import style from './style';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MapView, {
  AnimatedRegion,
  Animated,
  MarkerAnimated,
  Callout,
  CalloutSubview,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import GoogleMap from '../../../Utils/helper/GoogleMap';
const LATITUDE_DELTA = 0.04;
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
function MapHistory(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMapHistory();
  }, []);
  const getMapHistory = async () => {
    const loginDetail = await Storage.getLoginDetail('login_detail');
    let username = loginDetail.accountName;
    let password = loginDetail.password;
    let data = {
      accountid: username,
      password: password,
      imei: '351608080772390',
      date: '2022-07-01',
    };
    const response = await axiosGetData('mapHistory', data);
    // const filter = response.data.EventHistory.slice(0,1);
    setData(filter);
  };
  return (
    <>
      <LinearGradient
        colors={[colors.mainThemeColor1, colors.mainThemeColor2]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={{
          paddingHorizontal: 16,
          paddingTop: 25,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{paddingVertical: 10}}>
            <Image source={image.backArrow} style={{height: 12, width: 23}} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: Size.large,
              color: colors.white,
              paddingHorizontal: 15,
            }}>
            {__('Map History')}
          </Text>
        </View>
      </LinearGradient>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          paddingVertical: 10,
          backgroundColor: 'white',
          elevation: 20,
        }}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: '#D9D9D9',
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 12,
            width: '47%',
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 14}}>From Date</Text>
          <MaterialIcons
            style={{
              color: '#3D3D3D',
              fontSize: 16,
            }}
            name={'keyboard-arrow-down'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: '#D9D9D9',
            borderWidth: 1,
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 12,
            width: '47%',
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 14}}>To Date</Text>
          <MaterialIcons
            style={{
              color: '#3D3D3D',
              fontSize: 16,
            }}
            name={'keyboard-arrow-down'}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <GoogleMap
          region={{
            latitude: 30.30,
            longitude: 75.30,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          {data?.map((item, index) => {
            console.log('this is item of car', item);
            return (
              <>
                <Marker
                  // ref={markerRef}
                  key={index.toString()}
                  coordinate={{
                    latitude: parseFloat(item.lat),
                    longitude: parseFloat(item.lng),
                  }}>
                  <Image
                    resizeMode="contain"
                    source={image.carGreenUp}
                    style={{
                      width: 30,
                      height: 70,
                    }}
                  />
                  <Callout tooltip>
                    <LinearGradient
                      colors={[colors.mainThemeColor3, colors.mainThemeColor4]}
                      start={{x: 1.3, y: 0}}
                      end={{x: 0, y: 0}}
                      locations={[0, 0.9]}
                      style={style.firstbox}>
                      <View style={{paddingBottom: 5}}>
                        <Text style={style.firstboxtext1}>
                          {item.timeStamp}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <AntDesign
                          style={{
                            color: '#17D180',
                            fontSize: 16,
                          }}
                          name={'caretdown'}
                        />
                        <Text style={{paddingHorizontal: 10}}>
                          Ignition: {item.ignition}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          paddingTop: 5,
                        }}>
                        <View style={style.secondboxtextbox1}>
                          <Text style={{paddingVertical: 8}}>
                            <Image
                              resizeMode="contain"
                              source={image.speed}
                              style={style.speedimg}
                            />
                          </Text>
                          <Text style={style.secondboxtext1}>
                            {Math.floor(item?.speed)} {__('KM/H')}
                          </Text>
                          <Text style={style.secondboxtext11}>
                            {__('SPEED')}
                          </Text>
                        </View>
                        <View style={style.secondboxtextbox1}>
                          <Text style={{paddingVertical: 8}}>
                            <Image
                              resizeMode="contain"
                              source={image.distance}
                              style={style.locimg}
                            />
                          </Text>
                          <Text style={style.secondboxtext1}>
                            {Math.floor(item.odometer)} {__('KM')}
                          </Text>
                          <Text style={style.secondboxtext11}>
                            {__("TODAY'S ODO")}
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </Callout>
                </Marker>
              </>
            );
          })}
        </GoogleMap>
      </View>
    </>
  );
}

export default MapHistory;
