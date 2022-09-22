import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  Share,
  Linking,
} from 'react-native';
import MapView, {
  AnimatedRegion,
  Animated,
  MarkerAnimated,
  Callout,
  CalloutSubview,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import style from './style';

import {image} from '../../../assets/images';
import MapIconList from '../../../Utils/helper/MapIconList';
import Storage from '../../../Utils/Storage';
import {axiosGetData} from '../../../Utils/ApiController';
import {useNetInfo} from '@react-native-community/netinfo';
import Geolocation from 'react-native-geolocation-service';
import colors from '../../../assets/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {__} from '../../../Utils/Translation/translation';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from 'react-native-reanimated';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
function GroupMapTracking(props) {
  // console.log('gigigigigieieuiopipipoipoiop');s
  const [coordinate, setCoordinate] = useState({
    latitude: 26.9110637,
    longitude: 75.7376412,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [activeImg, setActiveImg] = useState(false);
  const [traffic, setTraffic] = useState(false);
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [driverDetails, setDriverDetails] = useState([]);

  const getDetails = async () => {
    // setIsShow(true);
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    let id = succcess.type;
    const response = await axiosGetData(
      `vehicles/${username}/${encodedPassWord}/${id}`,
    );
    const detail = response?.data?.vehicles;
    // console.log('GroupMapTracking', detail);
    setCoordinate(prev => {
      return {
        ...prev,
        latitude: parseFloat(detail[0]?.lat),
        longitude: parseFloat(detail[0]?.lng),
      };
    });
    setDetails(detail);
    setIsLoading(true);
    // setIsShow(false);
  };

  const iconPress = data => {
    if (data == 'Traffic') {
      setTraffic(!traffic);
    } else {
      props.navigation.navigate(data);
    }
  };

  // const getLocations = async () => {
  //   Geolocation.getCurrentPosition(position => {
  //     console.log('positio', position);
  //     setCoordinate({
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     });
  //   });
  // };
  // const netInfo = useNetInfo();
  // useEffect(() => {
  //   // getLocation();
  //   if (netInfo.isConnected) {
  //     if (Platform.OS == 'android') {
  //       getLocations();
  //     } else {
  //       // checkPermissionIOS();
  //     }
  //   }
  // }, [netInfo.isConnected]);
  const getVehicle = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const response = await axiosGetData(
      `getDriverDetails/${username}/${encodedPassWord}`,
    );
    const driverDetails = response.data.driverDetails;
    setDriverDetails(driverDetails);
  };
  useEffect(() => {
    getDetails();
    getVehicle();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      getDetails();
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  const [isData, isSetData] = useState({});

  const calling = async data => {
    console.log('hihih');
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const response = await axiosGetData(
      `getDriverDetails/${username}/${encodedPassWord}`,
    );
    const driverDetails = response.data.driverDetails;
    const filterData = driverDetails?.filter(item => {
      return item.deviceId === data.deviceId;
    });
    console.log('filterDathihihhihiha', filterData);
    const phoneNumber = filterData[0]?.mobilenumber;
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <>
      {isLoading ? (
        <View style={{flex: 1}}>
          <MapView
            // isTrafficEnabled={true}
            style={{
              flex: 1,
            }}
            trackViewChanges={false}
            // zoomEnabled={true}
            // trackViewChanges={false}
            // scrollEnabled={false}
            // pointerEvents="none"
            // minZoomLevel={15}
            // showsUserLocation = {true}
            showsTraffic={traffic}
            region={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            provider={PROVIDER_GOOGLE}>
            {details.map(item => {
              const isData = driverDetails.find(items => {
                console.log('ititiitit', items);
                return items.deviceId === item.deviceId;
              });
              return (
                <Marker
                trackViewChanges={false}
                  // ref={markerRef}
                  //   key={index.toString()}
                  coordinate={{
                    latitude: parseFloat(item.lat),
                    longitude: parseFloat(item.lng),
                  }}>
                  <Image
                    resizeMode="contain"
                    source={{uri: item.equipmentIcon}}
                    style={{
                      height: 25,
                      width: 35,
                    }}
                  />

                  <Callout
                    tooltip
                    onPress={() =>
                      isData?.mobilenumber != '' ? calling(item) : null
                    }>
                    <LinearGradient
                      colors={[colors.mainThemeColor3, colors.mainThemeColor4]}
                      start={{x: 1.3, y: 0}}
                      end={{x: 0, y: 0}}
                      locations={[0, 0.9]}
                      style={style.firstbox}>
                      <View>
                        <Text style={style.firstboxtext1}>{item.deviceId}</Text>
                        <Text style={style.driverCarSpeed}>
                          {item.statusMessage}
                        </Text>
                        <Text style={style.firstboxtext2}>{item.address}</Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
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
                            {Math.floor(item.speed)} {__('KM/H')}
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
                          <Text style={{fontSize: 12, color: '#fff'}}>
                            {Math.floor(item.todaysODO)} {__('KM')}
                          </Text>
                          <Text style={style.secondboxtext11}>
                            {__("TODAY'S ODO")}
                          </Text>
                        </View>

                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }}>
                          {isData?.mobilenumber != '' ? (
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: '#24A520',
                                padding: 9,
                                borderRadius: 6,
                                alignItems: 'center',
                              }}>
                              <Icon name="call" color="#fff" />
                              <Text style={{color: '#fff', marginLeft: 5}}>
                                Call Driver
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: 'grey',
                                padding: 9,
                                borderRadius: 6,
                                alignItems: 'center',
                              }}>
                              <Icon name="call" color="#fff" />
                              <Text style={{color: '#fff', marginLeft: 5}}>
                                Call Driver
                              </Text>
                            </TouchableOpacity>
                          )}

                          {/*  */}

                          {/*  */}
                        </View>
                      </View>
                    </LinearGradient>
                  </Callout>
                </Marker>
              );
            })}
          </MapView>
          <View style={style.top_container}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{paddingVertical: 10}}>
              <Image
                source={image.leftArrowblack}
                style={{width: 30, height: 18}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.dashimgbox}
              onPress={() => setActiveImg(!activeImg)}>
              <Image
                source={image.dashboardcolor}
                style={{width: 44, height: 44}}
              />
            </TouchableOpacity>
          </View>
          {activeImg && <MapIconList k={true} handlePress={iconPress} />}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
}
export default GroupMapTracking;
