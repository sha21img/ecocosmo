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
import {Size} from '../../../assets/fonts/Fonts';

import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {__} from '../../../Utils/Translation/translation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
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
import {useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation();

  const netInfo = useNetInfo();

  const getUserDetails = async () => {
    const succcess = await Storage.getLoginDetail('login_detail');
    setLoginDetails(succcess);
  };
  useEffect(() => {
    getUserDetails();
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
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
        <View style={{paddingBottom: 20}}>
          <View
            style={{
              // backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              numberOfLines={1}
              style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
              {item.deviceId}
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {loginDetails?.accountName == 'demo101' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    marginHorizontal: 10,
                    backgroundColor: 'grey',
                  }}>
                  <Ionicons
                    style={{
                      color: 'white',
                      fontSize: 18,
                    }}
                    name={'call'}
                  />
                  <Text style={{color: 'white', paddingLeft: 4}}>Call</Text>
                </View>
              ) : isData?.mobilenumber !== '' ? (
                <TouchableOpacity
                  onPress={() => {
                    isSetData(item), calling(item);
                  }}
                  style={{
                    flexDirection: 'row',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    marginHorizontal: 10,
                    backgroundColor: colors.callBtn,
                  }}>
                  <Ionicons
                    style={{
                      color: 'white',
                      fontSize: 18,
                    }}
                    name={'call'}
                  />
                  <Text style={{color: 'white', paddingLeft: 4}}>Call</Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    marginHorizontal: 10,
                    backgroundColor: 'grey',
                  }}>
                  <Ionicons
                    style={{
                      color: 'white',
                      fontSize: 18,
                    }}
                    name={'call'}
                  />
                  <Text style={{color: 'white', paddingLeft: 4}}>Call</Text>
                </View>
              )}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LiveMapTracking', {details: item});
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: 'white',
                }}>
                <Entypo
                  style={{
                    color: 'orange',
                    fontSize: 18,
                  }}
                  name={'location'}
                />
                <Text style={{color: 'white', paddingLeft: 4}}>Live Track</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              fontSize: 12,
              width: '65%',
              paddingVertical: 5,
              color: 'grey',
            }}>
            {item.address}
          </Text>
          <TouchableOpacity
            onPress={() => {
              getMobileNumber(item);
              isSetData(item);
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //  backgroundColor: 'green'
            }}>
            <View style={{position: 'relative'}}>
              {/*  */}
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  zIndex: 99,
                  top: 200,
                  left: 30,
                }}>
                {parseFloat(item.validPacketTimeStamp) <
                parseFloat(item.lastNoGpsSignalTime) ? (
                  <Image
                    source={image.newlocationoff}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                      paddingHorizontal: 20,
                    }}
                  />
                ) : (
                  <Image
                    source={image.newlocationon}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                      paddingHorizontal: 20,
                    }}
                  />
                )}

                {/*  */}
                {parseFloat(item.validPacketTimeStamp) -
                  parseFloat(item.lastPowerCutTime) >
                300 ? (
                  <Image
                    source={image.newbatteryon}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                      paddingHorizontal: 20,
                    }}
                  />
                ) : (
                  <Image
                    source={image.newbatteryoff}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                      paddingHorizontal: 20,
                    }}
                  />
                )}
                {parseFloat(item.validPacketTimeStamp) -
                  parseFloat(item.lastLowBatteryTime) >
                21600 ? (
                  <Image
                    source={image.newchargeon}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                      paddingHorizontal: 20,
                    }}
                  />
                ) : (
                  <Image
                    source={image.newchargeoff}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                      paddingHorizontal: 20,
                    }}
                  />
                )}

                {parseFloat(item.statusTermInfo & 2) == 2 ? (
                  <Image
                    source={image.newpinon}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                      paddingHorizontal: 20,
                    }}
                  />
                ) : (
                  <Image
                    source={image.newpinoff}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                      paddingHorizontal: 20,
                    }}
                  />
                )}
              </View>
              {/*  */}
              {/*  */}
              <View
                style={{
                  position: 'absolute',
                  top: 50,
                  left: 85,
                  color: '#24A520',
                  zIndex: 99,
                }}>
                <Text
                  style={{
                    color: '#24A520',
                  }}>
                  Running
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 70,
                  left: 65,
                  color: 'white',
                  zIndex: 99,
                }}>
                <Text
                  style={{
                    color: 'white',
                  }}>
                  14M 38KM/H
                </Text>
              </View>
              <Image
                source={image.speedMeter}
                resizeMode="contain"
                style={{height: 250, width: 220}}
              />
              <Image
                source={image.road}
                resizeMode="contain"
                style={{
                  position: 'absolute',
                  height: 150,
                  width: 170,
                  // backgroundColor: 'pink',
                  top: 80,
                  left: 25,
                }}
              />
              <Image
                source={image.dashboardcar}
                resizeMode="contain"
                style={{
                  position: 'absolute',
                  height: 120,
                  width: 120,
                  // backgroundColor: 'pink',
                  top: 90,
                  left: 50,
                }}
              />
            </View>
            <View
              style={{
                paddingVertical: 20,
              }}>
              <View
                style={{
                  paddingVertical: 8,
                  alignItems: 'center',
                  justifyContent: 'center',

                  // backgroundColor:'red',
                  // flexWrap: 'wrap',
                }}>
                <Text
                  style={{
                    paddingVertical: 2,
                    color: '#0080FF',
                    fontWeight: 'bold',
                    // flexGrow: 1,
                    flexWrap: 'wrap',
                    // fontSize: Size.tiny,
                  }}>
                  {__('CHECK IN DATE')}
                </Text>
                <Text
                  style={{
                    paddingVertical: 2,
                    color: '#0080FF',
                    fontWeight: 'bold',
                    // flexGrow: 1,
                    flexWrap: 'wrap',
                    // fontSize: Size.tiny,
                  }}>
                  {__('&  TIME')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 2,
                    // backgroundColor:'red'
                  }}>
                  <LinearGradient
                    colors={['#00266B', '#2AB0CC']}
                    start={{x: 0, y: 1}}
                    style={{
                      height: 1,
                      width: 40,
                      borderTopLeftRadius: 10,
                    }}></LinearGradient>
                  <View
                    style={{
                      height: 1,
                      width: 30,
                      backgroundColor: '#2AB0CC',
                    }}></View>

                  <LinearGradient
                    colors={['#2AB0CC', '#00266B']}
                    start={{x: 0, y: 1}}
                    style={{
                      height: 1,
                      width: 15,
                      borderTopRightRadius: 10,
                    }}></LinearGradient>
                </View>
                <Text
                  style={{
                    paddingVertical: 2,
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  {filterDate}
                </Text>
                <Text
                  style={{
                    paddingVertical: 2,
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  {filterTime}
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor:'red',
                  // flexWrap: 'wrap',
                }}>
                <Text
                  style={{
                    paddingVertical: 2,
                    color: '#0080FF',
                    fontWeight: 'bold',
                  }}>
                  {__('TODAYS ODO')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 2,
                    // backgroundColor:'red'
                  }}>
                  <LinearGradient
                    colors={['#00266B', '#2AB0CC']}
                    start={{x: 0, y: 1}}
                    style={{
                      height: 1,
                      width: 40,
                      borderTopLeftRadius: 10,
                    }}></LinearGradient>
                  <View
                    style={{
                      height: 1,
                      width: 30,
                      backgroundColor: '#2AB0CC',
                    }}></View>

                  <LinearGradient
                    colors={['#2AB0CC', '#00266B']}
                    start={{x: 0, y: 1}}
                    style={{
                      height: 1,
                      width: 15,
                      borderTopRightRadius: 10,
                    }}></LinearGradient>
                </View>
                <Text
                  style={{
                    paddingVertical: 2,
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  {Math.floor(item.todaysODO)} {__('KM')}
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor:'red',
                  // flexWrap: 'wrap',
                }}>
                <Text
                  style={{
                    paddingVertical: 2,
                    color: '#0080FF',
                    fontWeight: 'bold',
                  }}>
                  {__('SPEED')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 2,
                    // backgroundColor:'red'
                  }}>
                  <LinearGradient
                    colors={['#00266B', '#2AB0CC']}
                    start={{x: 0, y: 1}}
                    style={{
                      height: 1,
                      width: 40,
                      borderTopLeftRadius: 10,
                    }}></LinearGradient>
                  <View
                    style={{
                      height: 1,
                      width: 30,
                      backgroundColor: '#2AB0CC',
                    }}></View>

                  <LinearGradient
                    colors={['#2AB0CC', '#00266B']}
                    start={{x: 0, y: 1}}
                    style={{
                      height: 1,
                      width: 15,
                      borderTopRightRadius: 10,
                    }}></LinearGradient>
                </View>
                <Text
                  style={{
                    paddingVertical: 2,
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  {Math.floor(item.speed)} {__('KM/H')}
                </Text>
              </View>
            </View>
            {/*  */}

            {/* <View
              style={{
                borderWidth: 2,
                backgroundColor: '#00266B',
                width: '20%',
              }}>
              
            </View> */}
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <>
      <FlatList
        data={details}
        contentContainerStyle={{paddingBottom: 100}}
        keyExtractor={({item, index}) => index}
        showsVerticalScrollIndicator={false}
        renderItem={(item, index) => renderItem(item, index)}
        // refreshControl={
        //   <RefreshControl
        //     enabled={true}
        //     refreshing={isShow}
        //     onRefresh={() => onRefreshPage(type, details, setIsShow)}
        //   />
        // }
      />

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
