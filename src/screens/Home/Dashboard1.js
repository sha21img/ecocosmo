import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
  Linking,
  RefreshControl,
} from 'react-native';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {__} from '../../../Utils/Translation/translation';
import styles from './DashStyle1';
import {useNetInfo} from '@react-native-community/netinfo';

import MapView, {
  AnimatedRegion,
  Animated,
  MarkerAnimated,
  Callout,
  CalloutSubview,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import colors from '../../../assets/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  requestMultiple,
} from 'react-native-permissions';
import Moment from 'moment';
import VehicleMenu from '../VehicleMenu';
import {axiosGetData} from '../../../Utils/ApiController';
import Storage from '../../../Utils/Storage';
import moment from 'moment';

const Dashboard1 = ({
  details,
  isShow,
  driverDetails,
  onRefreshPage,
  type,
  setIsShow,
}) => {
  const [coordinate, setCoordinate] = useState({
    latitude: 26.9110637,
    longitude: 75.7376412,
  });
  const [mobileNumber, setMobileNumber] = useState([]);
  const [locationPermission, setLocationPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [visible, setVisible] = useState(false);
  const [number, setNumber] = useState(false);

  const [alertMsg, setAlertMsg] = useState('');

  const netInfo = useNetInfo();
  const showPermissionError = (alertMsg = 'Please Enable Location Service') => {
    setLocationPermission(true);
    setAlertMsg(alertMsg);
    setIsLoading(false);
  };
  const checkPermissionAndroid = () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            showPermissionError();
            break;
          case RESULTS.BLOCKED:
            showPermissionError();
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
              .then(result => {
                if (result == RESULTS.GRANTED || result == RESULTS.LIMITED) {
                  setIsLoading(false);
                  setLocationPermission(false);
                  getLocations();
                } else {
                  showPermissionError();
                }
              })
              .catch(err => {
                showPermissionError(
                  'Something Went Wrong While Checking Permission',
                );
              });
            break;
          case RESULTS.LIMITED:
            setIsLoading(false);
            setLocationPermission(false);
            getLocations();
            break;
          case RESULTS.GRANTED:
            setIsLoading(false);
            setLocationPermission(false);
            getLocations();
            break;
        }
      })
      .catch(error => {
        showPermissionError('Something Went Wrong While Checking Permission');
      });
  };
  const getLocations = async () => {
    Geolocation.getCurrentPosition(position => {
      setCoordinate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };
  const getUserDetails = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    setLoginDetails(succcess);
  };
  useEffect(() => {
    // getLocation();
    getUserDetails();
    if (netInfo.isConnected) {
      if (Platform.OS == 'android') {
        checkPermissionAndroid();
      } else {
        // checkPermissionIOS();
      }
    }
  }, [netInfo.isConnected]);
  const markerRef = useRef([]);
  const onRegionalChange = useCallback(
    region => {
      setCoordinate(region);
      // setCurrentLoc(region);
      // if (markerRef&& markerRef.current && markerRef.current.showCallout) {
      //   markerRef.current.showCallout();
      // }
    },
    [markerRef.current],
  );

  const [marginBottom, setMarginBottom] = useState(1);
  const [loginDetails, setLoginDetails] = useState();
  const data = [
    {
      latlng: {latitude: 26.9111158, longitude: 75.737648},
    },
    {latlng: {latitude: 26.8111158, longitude: 75.537648}},
    {latlng: {latitude: 26.2111158, longitude: 75.437648}},
    {latlng: {latitude: 26.1111158, longitude: 75.137648}},
  ];
  const [isData, isSetData] = useState({});
  // const getVehicleDetail = item => {
  //   return <VehicleMenu item={item} visible={visible} />;
  // };
  const calling = async data => {
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    const response = await axiosGetData(
      `getDriverDetails/${username}/${encodedPassWord}`,
    );
    // console.log('this si guest', response.data);
    const driverDetails = response.data.driverDetails;
    const filterData = driverDetails?.filter(item => {
      return item.deviceId === data.deviceId;
    });
    const phoneNumber = filterData[0]?.mobilenumber;
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const getMobileNumber = async number => {
    // console.log('numbernumbernumber', number);

    // console.log('driverDetailsdriverDetails', driverDetails);
    const filterData = driverDetails?.filter(item => {
      return item.deviceId === number.deviceId;
    });
    // console.log('filterDatafilterDatafilterDatafilterData', filterData);
    setMobileNumber(filterData[0]);
    setVisible(true);
  };

  const renderItem = ({item, index}) => {
    // console.log('096322890',item.validPacketTimeStamp)
    const date = parseFloat(item.validPacketTimeStamp);
    // console.log('datatatta',date)
    const filterDate = moment.unix(date).format('DD-MM-YYYY');
    // console.log("newDate/////////",filterDate)
    const filterTime = moment.unix(date).format('hh:mm:ss');
    // console.log("filterTime",filterTime)

    // const newDate = new Date(date);
    // let month = newDate.getMonth() + 1;
    // if (String(Math.abs(month)).length == 1) {
    //   month = '0' + month;
    // }

    // const filterTime = newDate.toLocaleTimeString('en-US');
    // const filterDate = `${newDate.getDate()}-${month}-${newDate.getFullYear()}`;
    const isData = driverDetails.find(items => {
      return items.deviceId === item.deviceId;
    });
    // console.log('item', item.features, 'item');
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginBottom: 10, padding: 0}}
          onPress={() => {
            getMobileNumber(item);
            isSetData(item);
          }}>
          <LinearGradient
            colors={['#16BCD4', '#395DBF']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={{borderRadius: 15}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View></View>
              <View
                style={{
                  // paddingHorizontal: 10,
                  width: '55%',
                  paddingBottom: 20,
                  paddingTop: 15,
                  // paddingLeft: 10,
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 22}}>
                  {item.deviceId}
                </Text>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                  {item.statusMessage}
                </Text>
                {loginDetails?.accountName == 'demo101' ? (
                  <View
                    style={{
                      paddingVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      paddingHorizontal: 12,
                      backgroundColor: 'grey',
                      borderRadius: 5,
                      position: 'absolute',
                      zIndex: 10,
                      bottom: -20,
                      maxWidth: 70,
                    }}>
                    <Image
                      source={image.callimg}
                      style={{height: 15, width: 15, marginRight: 7}}
                    />
                    <Text style={styles.buttonText}>{__('Call')}</Text>
                  </View>
                ) : isData?.mobilenumber !== '' ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      backgroundColor: colors.callBtn,
                      paddingVertical: 10,
                      maxWidth: 70,
                      borderRadius: 5,
                      position: 'absolute',
                      zIndex: 10,
                      bottom: -20,
                    }}
                    onPress={() => {
                      isSetData(item), calling(item);
                    }}>
                    <Image
                      source={image.callimg}
                      style={{height: 15, width: 15, marginRight: 7}}
                    />
                    <Text style={styles.buttonText}> {__('Call')}</Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      paddingVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      paddingHorizontal: 12,
                      backgroundColor: 'grey',
                      borderRadius: 5,
                      position: 'absolute',
                      zIndex: 10,
                      bottom: -20,
                      maxWidth: 70,
                    }}>
                    <Image
                      source={image.callimg}
                      style={{height: 15, width: 15, marginRight: 7}}
                    />
                    <Text style={styles.buttonText}>{__('Call')}</Text>
                  </View>
                )}
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                paddingTop: 30,
                paddingBottom: 15,
                paddingHorizontal: 15,
              }}>
              <View
                style={{position: 'absolute', zIndex: 10, top: -40, left: 15}}>
                <Image
                  resizeMode="contain"
                  source={{uri: item.equipmentIcon}}
                  style={{
                    height: 50,
                    width: 120,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#616161',
                      fontWeight: 'bold',
                      paddingBottom: 5,
                    }}>
                    {__('CHECK IN DATE & TIME')}
                  </Text>
                  <Text
                    style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                    {filterDate}
                  </Text>
                  <Text
                    style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                    {filterTime}
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#616161',
                      fontWeight: 'bold',
                      paddingBottom: 5,
                    }}>
                    {__('TODAYS ODO')}
                  </Text>
                  <Text
                    style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                    {Math.floor(item.todaysODO)} {__('KM')}
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#616161',
                      fontWeight: 'bold',
                      paddingBottom: 5,
                    }}>
                    {__('SPEED')}
                  </Text>
                  <Text
                    style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                    {Math.floor(item.speed)} {__('KM/H')}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  justifyContent: 'space-between',
                  backgroundColor: 'lightgrey',
                  alignItems: 'center',
                  borderRadius: 7,
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}>
                  {parseFloat(item.validPacketTimeStamp) <
                  parseFloat(item.lastNoGpsSignalTime) ? (
                    <Image
                      source={image.locationOff}
                      style={{width: 20, height: 20}}
                    />
                  ) : (
                    <Image
                      source={image.location}
                      style={{width: 20, height: 20}}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#616161',
                      fontWeight: 'bold',
                    }}>
                    GPS On
                  </Text>
                </View>
                <View
                  style={{
                    borderLeftWidth: 1,
                    borderColor: '#616161',
                    height: 27,
                  }}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    alignItems: 'center',
                  }}>
                  {parseFloat(item.validPacketTimeStamp) -
                    parseFloat(item.lastPowerCutTime) >
                  300 ? (
                    <Image
                      source={image.battery}
                      style={{width: 20, height: 20}}
                    />
                  ) : (
                    <Image
                      source={image.batteryOff}
                      style={{width: 20, height: 20}}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#616161',
                      fontWeight: 'bold',
                    }}>
                    Battery
                  </Text>
                </View>

                <View
                  style={{
                    borderLeftWidth: 1,
                    borderColor: '#616161',
                    height: 27,
                  }}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    alignItems: 'center',
                  }}>
                  {parseFloat(item.validPacketTimeStamp) -
                    parseFloat(item.lastLowBatteryTime) >
                  21600 ? (
                    <Image
                      source={image.charge}
                      style={{width: 20, height: 20}}
                    />
                  ) : (
                    <Image
                      source={image.chargeOff}
                      style={{width: 20, height: 20}}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#616161',
                      fontWeight: 'bold',
                    }}>
                    Power
                  </Text>
                </View>
                <View
                  style={{
                    borderLeftWidth: 1,
                    borderColor: '#616161',
                    height: 27,
                  }}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    alignItems: 'center',
                  }}>
                  {parseFloat(item.statusTermInfo & 2) == 2 ? (
                    <Image
                      source={image.shokker}
                      style={{width: 20, height: 20}}
                    />
                  ) : (
                    <Image
                      source={image.shokkerOff}
                      style={{width: 20, height: 20}}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#616161',
                      fontWeight: 'bold',
                    }}>
                    Ignition
                  </Text>
                </View>
              </View>
              {/*  */}
              <View
                style={{
                  paddingHorizontal: 25,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                  }}>
                  {item.address}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      {isShow ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator />
        </View>
      ) : !isShow && details === [] ? (
        <View style={{height: 200, backgroundColor: 'red'}}>
          <Text style={{color: 'black'}}>kljjhjgh</Text>
        </View>
      ) : (
        <FlatList
          data={details}
          contentContainerStyle={{paddingBottom: 100}}
          keyExtractor={({item, index}) => index}
          showsVerticalScrollIndicator={false}
          renderItem={(item, index) => renderItem(item, index)}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={isShow}
              onRefresh={() => onRefreshPage(type, details, setIsShow)}
            />
          }
        />
      )}

      <VehicleMenu
        mobileNumber={mobileNumber}
        visible={visible}
        setVisible={setVisible}
        details={isData}
        calling={calling}
      />
    </>
  );
};

export default Dashboard1;

//
/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            getMobileNumber(item);
            isSetData(item);
          }}>
          <View style={styles.card1Container}>
            <Image
              resizeMode="contain"
              source={{uri: item.equipmentIcon}}
              style={{
                height: 30,
                width: 70,
              }}
            />
            <View style={{paddingHorizontal: 10}}>
              <Text style={styles.driverCarNumber}>{item.deviceId}</Text>
              <View style={styles.driverCarSpeedBox}>
                <Text style={{fontSize: 10, color: '#46BE30'}}>{'\u2B24'}</Text>
                <Text style={styles.driverCarSpeed}>{item.statusMessage}</Text>
              </View>
            </View>
          </View>
          <View style={{backgroundColor: 'lightgreen', height: 150}}>
            <MapView
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
              zoomEnabled={true}
              trackViewChanges={false}
              scrollEnabled={false}
              pointerEvents="none"
              minZoomLevel={15}
              initialRegion={{
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lng),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              provider={PROVIDER_GOOGLE}>
              <Marker
                // ref={markerRef}
                key={index.toString()}
                coordinate={{
                  latitude: parseFloat(item.lat),
                  longitude: parseFloat(item.lng),
                }}>
                <Image
                  resizeMode="contain"
                  source={{uri: item.equipmentIcon}}
                  style={{
                    height: 20,
                    width: 70,
                  }}
                />
              </Marker>
            </MapView>
          </View>
          <LinearGradient
            colors={['#45E384', '#02D958']}
            style={styles.driverCarDetailBox}>
            <View style={styles.imageContainer}>
              {parseFloat(item.validPacketTimeStamp) -
                parseFloat(item.lastPowerCutTime) >
              300 ? (
                <Image source={image.battery} style={styles.images} />
              ) : (
                <Image source={image.batteryOff} style={styles.images} />
              )}

              {parseFloat(item.validPacketTimeStamp) -
                parseFloat(item.lastLowBatteryTime) >
              21600 ? (
                <Image source={image.charge} style={styles.images} />
              ) : (
                <Image source={image.chargeOff} style={styles.images} />
              )}

              {parseFloat(item.validPacketTimeStamp) <
              parseFloat(item.lastNoGpsSignalTime) ? (
                <Image source={image.locationOff} style={styles.images} />
              ) : (
                <Image source={image.location} style={styles.images} />
              )}
              {parseFloat(item.statusTermInfo & 2) == 2 ? (
                <Image source={image.shokker} style={styles.images} />
              ) : (
                <Image source={image.shokkerOff} style={styles.images} />
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                // width: wp('65%'),
                justifyContent: 'flex-start',
                // alignItems:'center'
                // backgroundColor:'red',
                // flexWrap:'nowrap'
              }}>
              <View style={styles.driverDetailBox}>
                <Text style={styles.driverDetailText1}>
                  {__('CHECK IN DATE & TIME')}
                </Text>
                <Text style={styles.driverDetailText2}>{filterDate}</Text>
                <Text style={styles.driverDetailText2}>{filterTime}</Text>
              </View>
              <View style={styles.driverDetailBox}>
                <Text style={styles.driverDetailText1}>{__('TODAYS ODO')}</Text>
                <Text style={styles.driverDetailText2}>
                  {Math.floor(item.todaysODO)} {__('KM')}
                </Text>
              </View>
              <View style={styles.driverDetailBox}>
                <Text style={styles.driverDetailText1}>{__('SPEED')}</Text>
                <Text style={styles.driverDetailText2}>
                  {Math.floor(item.speed)} {__('KM/H')}
                </Text>
              </View>
            </View>
            {loginDetails?.accountName == 'demo101' ? (
              <View style={styles.disablebutton}>
                <Image
                  source={image.callimg}
                  style={{height: 15, width: 15, marginRight: 7}}
                />
                <Text style={styles.buttonText}>{__('Call')}</Text>
              </View>
            ) : isData?.mobilenumber !== '' ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  isSetData(item), calling(item);
                }}>
                <Image
                  source={image.callimg}
                  style={{height: 15, width: 15, marginRight: 7}}
                />
                <Text style={styles.buttonText}> {__('Call')}</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.disablebutton}>
                <Image
                  source={image.callimg}
                  style={{height: 15, width: 15, marginRight: 7}}
                />
                <Text style={styles.buttonText}>{__('Call')}</Text>
              </View>
            )}
          </LinearGradient>
          <LinearGradient
            colors={['#395DBF', '#16BCD4']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.driverAddressBox}>
            <Text style={styles.driverAddressText}>{item.address}</Text>
          </LinearGradient>
        </TouchableOpacity> */

//
