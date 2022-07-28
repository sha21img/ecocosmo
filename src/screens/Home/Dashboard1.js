import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
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
  check,
  PERMISSIONS,
  RESULTS,
  request,
  requestMultiple,
} from 'react-native-permissions';
import Moment from 'moment';
import VehicleMenu from '../VehicleMenu';

function Dashboard1({details, isShow}) {
  const [coordinate, setCoordinate] = useState({
    latitude: 26.9110637,
    longitude: 75.7376412,
  });
  const [locationPermission, setLocationPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [visible, setVisible] = useState(false);

  const [alertMsg, setAlertMsg] = useState('');

  const netInfo = useNetInfo();
  const showPermissionError = (alertMsg = 'Please Enable Location Service') => {
    setLocationPermission(true);
    setAlertMsg(alertMsg);
    setIsLoading(false);
  };
  const checkPermissionAndroid = () => {
    // console.log('checkPermissionAndroid');
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
  const getLocations = () => {
    // Geolocation.getCurrentPosition(position => {
    //   console.log('pos1234567890', position);
    // });

    Geolocation.getCurrentPosition(position => {
      // console.log(
      //   'position.latitude, position.longitude',
      //   position.coords.latitude,
      //   position.coords.longitude,
      // );
      setCoordinate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };
  // console.log('coordinatecoordinatecoordinate', coordinate);
  useEffect(() => {
    // getLocation();
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
      console.log('onRegionalChange', region);
      setCoordinate(region);
      // setCurrentLoc(region);
      // if (markerRef&& markerRef.current && markerRef.current.showCallout) {
      //   markerRef.current.showCallout();
      // }
    },
    [markerRef.current],
  );

  const [marginBottom, setMarginBottom] = useState(1);
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
  const renderItem = ({item, index}) => {
    const date = parseFloat(item.validPacketTimeStamp) + 19800;
    const newDate = new Date(date);
    const filterDate = newDate.toLocaleTimeString('en-US');

    return (
      <>
        <TouchableOpacity
          onPress={() => {
            isSetData(item), setVisible(true);
            // return <VehicleMenu item={item} visible={visible} />;
            // setVisible(true), getVehicleDetail(item);
          }}>
          <View style={styles.card1Container}>
            <Image
              source={{uri: item.equipmentIcon}}
              style={{
                height: 30,
                width: 70,
              }}
            />
            {/* <Image source={image.car} /> */}
            <View style={{paddingHorizontal: 10}}>
              <Text style={styles.driverCarNumber}>{item.deviceId}</Text>
              <View style={styles.driverCarSpeedBox}>
                <Text style={{fontSize: 10, color: '#46BE30'}}>{'\u2B24'}</Text>
                <Text style={styles.driverCarSpeed}>
                  {/* {__('Running')} 14m 38km/h */}
                  {item.statusMessage}
                </Text>
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
              minZoomLevel={15}
              initialRegion={{
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lng),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              provider={PROVIDER_GOOGLE}
              // followsUserLocation={true}
              // showsMyLocationButton={true}
              // showsUserLocation={true}
              // onPress={e => {
              //   setCoordinate(e.nativeEvent.coordinate);
              // }}
              onRegionChangeComplete={region => onRegionalChange(region)}

              // onRegionChangeComplete={region => setCoordinate(region)}
              // onRegionChange={region => setCoordinate(region)}
              // onMapReady={() => setMarginBottom(0)}
            >
              <Marker
                // ref={markerRef}
                key={index.toString()}
                // onCalloutPress={() => onPressMarker(item.id)}
                // description={item.description}
                // title={item.title}
                // coordinate={item.latlng}
                coordinate={{
                  // latitude: 26.9110637,
                  // longitude: 75.7376412,
                  // latitude:
                  // longitude:
                  latitude: parseFloat(item.lat),
                  longitude: parseFloat(item.lng),
                }}>
                <Image
                  source={{uri: item.equipmentIcon}}
                  style={{
                    height: 20,
                    width: 50,
                  }}
                />
                {/* <Callout tooltip>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        width: 120,
                        elevation: 2,
                        position: 'relative',
                        // borderWidth: 0.5,
                        // borderColor: '#ccc',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          padding: 10,
                        }}>
                        <View
                          style={{
                            backgroundColor: 'lightgrey',
                            borderRadius: 50,
                            height: 40,
                            width: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text>Aval.</Text>
                          <Text>0</Text>
                        </View>
                        <View
                          style={{
                            marginHorizontal: 8,
                          }}>
                          <Text>RM 25</Text>
                          <Text>AC 7</Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        bottom: 8,
                        height: 0,
                        width: 0,
                        borderStyle: 'solid',
                        borderLeftWidth: 20,
                        borderRightWidth: 20,
                        borderBottomWidth: 17,
                        // elevation:5,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderBottomColor: 'white',
                        transform: [{rotate: '180deg'}],
                        // margin: 0,
                        // marginTop:0,
                        marginLeft: 40,
                        // borderWidth: 0,
                        borderColor: 'transparent',
                      }}></View>
                  </Callout> */}
              </Marker>
            </MapView>
          </View>

          <LinearGradient
            colors={['#45E384', '#02D958']}
            style={styles.driverCarDetailBox}>
            <View style={styles.imageContainer}>
              <Image source={image.location} style={styles.images} />
              <Image source={image.battery} style={styles.images} />
              <Image source={image.charge} style={styles.images} />
              <Image source={image.shokker} style={styles.images} />
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={styles.driverDetailBox}>
                <Text style={styles.driverDetailText1}>
                  {__('CHECK IN TIME')}
                </Text>
                <Text style={styles.driverDetailText2}>
                  {filterDate}
                  {/* {Moment(new Object(item.validPacketTimeStamp)).format('HH')} */}
                  {/* 17:57:45 */}
                </Text>
              </View>
              <View style={styles.driverDetailBox}>
                <Text style={styles.driverDetailText1}>{__('TODAYS ODO')}</Text>
                <Text style={styles.driverDetailText2}>
                  {/* 5790456 {__('KM')} */}
                  {Math.floor(item.todaysODO)} {__('KM')}
                  {/* {Number(item.todaysODO).toFixed()} {__('KM')} */}
                </Text>
              </View>
              <View style={styles.driverDetailBox}>
                <Text style={styles.driverDetailText1}>{__('SPEED')}</Text>
                <Text style={styles.driverDetailText2}>
                  {/* {item.speed} */}
                  {Math.floor(item.speed)} {__('KM/H')}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
              <Image
                source={image.callimg}
                style={{height: 11, width: 11, marginRight: 5}}
              />
              <Text style={styles.buttonText}> {__('Call')}</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#395DBF', '#16BCD4']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.driverAddressBox}>
            <Text style={styles.driverAddressText}>
              {/* {__(
                  '177 New Apollo Mogra Lane Andheri,Mumbai, Bharuch,400069,India',
                )} */}
              {item.address}
            </Text>
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
        />
      )}
      <VehicleMenu visible={visible} setVisible={setVisible} details={isData} />
    </>
  );
}

export default Dashboard1;
