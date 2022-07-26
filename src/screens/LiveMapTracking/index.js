import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import style from './style';
import MapView, {
  AnimatedRegion,
  Animated,
  MarkerAnimated,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import Storage from '../../../Utils/Storage';
import Geolocation from 'react-native-geolocation-service';
import {image} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../assets/Colors';
import {__} from '../../../Utils/Translation/translation';
import Icon from 'react-native-vector-icons/Ionicons';
import {axiosGetData} from '../../../Utils/ApiController';
import {useNetInfo} from '@react-native-community/netinfo';
import PolylineDirection from '@react-native-maps/polyline-direction';
import MapViewDirections from 'react-native-maps-directions';
import MapIconList from '../../../Utils/helper/MapIconList';
import EngineStopPopup from '../EngineStopPopup';

import {
  locationPermission,
  getCurrentLocation,
} from '../../../Utils/helper/helperFunction';
import AddDriver from '../AddDriver';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
function LiveMapTracking(props) {
  const {details} = props.route.params;
  const [activeImg, setActiveImg] = useState(false);
  const [isActiveImg, setIsActiveImg] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [detail, setDetail] = useState({});
  const [visible, setVisible] = useState(false);
  const [Id, setID] = useState(null);
  const [mapType, setMapType] = useState(false);
  const [traffic, setTraffic] = useState(false);
  const [isMarkerShow, setIsMarkerShow] = useState(false);

  const mapRef = useRef();
  const markerRef = useRef();
  const markerRefs = useRef();
  const [state, setState] = useState({
    curLoc: {
      latitude: 30.7046,
      longitude: 77.1025,
    },
    destinationCords: {},
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 30.7046,
      longitude: 77.1025,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    liveCords: {},
    time: 0,
    distance: 0,
    heading: 0,
  });
  const {
    curLoc,
    time,
    distance,
    destinationCords,
    isLoading,
    coordinate,
    heading,
    liveCords,
  } = state;
  console.log('destinationCords', coordinate);
  const updateState = data => setState(state => ({...state, ...data}));
  const GOOGLE_MAP_KEY = 'AIzaSyAQDxD_FpUHSM-HGCGrs20T4oZTNRc4Sq0';
  useEffect(() => {
    getDetails();
  }, []);
  const getLiveLocation = async props => {
    console.log('hi');
    setIsMarkerShow(!isMarkerShow);
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      // console.log('get live location after 4 second', heading);
      animated(latitude, longitude);
      // onCenters(latitude, longitude);
      console.log('asasas', latitude, longitude);
      updateState({
        heading: heading,
        liveCords: {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      });
    }
  };
  const location = data => {
    console.log('data', data);
    if (data == 2) {
      onCenter();
    } else if (data == 0) {
      setMapType(!mapType);
    } else {
      getLiveLocation();
    }
  };
  const animated = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRefs.current) {
        markerRefs.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };
  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };
  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };
  const onCenters = (latitude, longitude) => {
    mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };
  // console.log('asssssssssssssssssssssssssssss', coordinate);

  useEffect(() => {
    const interval = setInterval(() => {
      getDetails();
    }, 15000);
    return () => clearInterval(interval);
  }, []);
  const getDetails = async () => {
    const loginDetail = await Storage.getLoginDetail('login_detail');
    let username = loginDetail.accountId;
    let password = loginDetail.password;
    let type = loginDetail.type;
    const response = await axiosGetData(
      `livetrack/${username}/${password}/${props.route.params.details.imei}/${type}`,
    );
    console.log('poiuytrew0-----------', response.data);
    setDetail(response.data.vehicle);
    const vehicleDetails = response.data.vehicle;
    const latitude = parseFloat(vehicleDetails.lat);
    const longitude = parseFloat(vehicleDetails.lng);
    const lastlatitude = parseFloat(vehicleDetails.lastLat);
    const lastlongitude = parseFloat(vehicleDetails.lastLng);
    animate(latitude, longitude);
    updateState({
      heading: heading,
      curLoc: {
        latitude,
        longitude,
      },
      coordinate: new AnimatedRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      destinationCords: {
        latitude: lastlatitude,
        longitude: lastlongitude,
      },
    });
    // setState({
    //   ...state,
    //   // curLoc: {
    //   //   latitude: parseFloat(response.data.vehicle.lat),
    //   //   longitude: parseFloat(response.data.vehicle.lng),
    //   // },
    //   destinationCords: {
    //     latitude: parseFloat(response.data?.vehicle?.lastLat),
    //     longitude: parseFloat(response.data?.vehicle?.lastLng),
    //   },
    // });
    setIsShow(true);
  };
  const [marginBottom, setMarginBottom] = useState(1);
  const [modal, setModal] = useState(false);
  // console.log('detail.markerIcon', detail .markerIcon);

  const data1 = [
    {id: 0, imgUrl: image.mapPaper},
    {id: 1, imgUrl: image.goToLocation},
    {id: 2, imgUrl: image.carLocation},
  ];
  const iconPress = data => {
    if (data == 'Traffic') {
      setTraffic(!traffic);
    } else if (data == 'EngineStopPopup') {
      setModal(true);
    } else {
      props.navigation.navigate(data, {details: details});
    }
  }
  console.log('livecords', liveCords);

  return (
    <>
      {isShow ? (
        <View style={style.container}>
          <View style={style.map_container}>
            <MapView
              tracksViewChanges={false}
              mapType={mapType ? 'satellite' : 'standard'}
              showsTraffic={traffic}
              ref={mapRef}
              style={style.map}
              // style={StyleSheet.absoluteFill}
              region={{
                ...curLoc,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              // initialRegion={{
              //   ...curLoc,
              //   latitudeDelta: LATITUDE_DELTA,
              //   longitudeDelta: LONGITUDE_DELTA,
              // }}
            >
              {Object.keys(coordinate).length > 0 && (
                <Marker.Animated ref={markerRef} coordinate={coordinate}>
                  <Image
                    source={{uri: detail.markerIcon}}
                    style={{
                      width: 40,
                      height: 40,
                      transform: [{rotate: `${heading}deg`}],
                    }}
                    resizeMode="contain"
                  />
                </Marker.Animated>
              )}

              {Object.keys(liveCords).length > 0 && isMarkerShow ? (
                <>
                  {/* {console.log('live wala chala h')} */}
                  <Marker.Animated
                    ref={markerRefs}
                    coordinate={liveCords}
                    // image={{uri:detail.markerIcon}}
                  >
                    {/* <Image
                      source={{uri: detail.markerIcon}}
                      style={{
                        width: 40,
                        height: 40,
                        transform: [{rotate: `${heading}deg`}],
                      }}
                      resizeMode="contain"
                    /> */}
                  </Marker.Animated>

                  <MapViewDirections
                    origin={liveCords}
                    destination={curLoc}
                    apikey={GOOGLE_MAP_KEY}
                    strokeWidth={3}
                    strokeColor="black"
                    optimizeWaypoints={true}
                  />
                </>
              ) : null}

              {Object.keys(destinationCords).length > 0 && !isMarkerShow ? (
                <MapViewDirections
                  origin={curLoc}
                  destination={destinationCords}
                  apikey={GOOGLE_MAP_KEY}
                  strokeWidth={3}
                  strokeColor="black"
                  optimizeWaypoints={true}
                  onStart={params => {
                    // console.log(
                    //   `Started routing between "${params.origin}" and "${params.destination}"`,
                    // );
                  }}
                  onReady={result => {
                    // console.log(`Distance: ${result.distance} km`);
                    // console.log(`Duration: ${result.duration} min.`);
                    // fetchTime(result.distance, result.duration),
                    mapRef.current.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        // right: 30,
                        // bottom: 300,
                        // left: 30,
                        // top: 100,
                      },
                    });
                  }}
                  onError={errorMessage => {
                    // console.log('GOT AN ERROR');
                  }}
                />
              ) : null}
            </MapView>
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
              onPress={onCenter}>
              <Image source={{uri: detail.markerIcon}} />
            </TouchableOpacity>

            {/*  */}
            {/* <MapView
            tracksViewChanges={false}
              style={style.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: parseFloat(state.currLoc.latitude),
                longitude: parseFloat(state.currLoc.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              followsUserLocation={true}
              showsMyLocationButton={true}
              onMapReady={() => setMarginBottom(0)}>
              <Marker
                coordinate={{
                  latitude: parseFloat(state.currLoc.latitude),
                  longitude: parseFloat(state.currLoc.longitude),
                }}
              >
                <Image
                  resizeMode="contain"
                  source={{uri: detail.markerIcon}}
                  style={{
                    height: 35,
                    width: 70,
                  }}
                />
              </Marker>
              <Marker
                coordinate={{latitude:26.8976,longitude:77.7685}}
              >
                <Image
                  resizeMode="contain"
                  source={{uri: detail.markerIcon}}
                  style={{
                    height: 35,
                    width: 70,
                  }}
                />
              </Marker>
              <PolylineDirection
                origin={state.currLoc}
                destination={{latitude:26.8976,longitude:77.7685}}
                apiKey="AIzaSyDuMZZzYTEBs7EONdnVfmZVXJluSzVbRkc"
                strokeWidth={4}
                strokeColor="hotpink"
              />
            </MapView> */}
          </View>
          {/* modal1 */}
          <View style={style.top_container}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{width: '10%', paddingVertical: 10}}>
              <Image
                source={image.leftArrowblack}
                style={{width: 30, height: 18}}
              />
            </TouchableOpacity>
            <LinearGradient
              colors={[colors.mainThemeColor3, colors.mainThemeColor4]}
              start={{x: 1.3, y: 0}}
              end={{x: 0, y: 0}}
              locations={[0, 0.9]}
              style={style.firstbox}>
              <View
                style={{
                  width: '10%',
                  alignItems: 'center',
                }}>
                <Image
                  source={image.carGreenUp}
                  style={{width: 20, height: 40}}
                />
              </View>
              <View
                style={{
                  marginLeft: 10,
                  width: '90%',
                }}>
                <Text style={style.firstboxtext1}>{details.deviceId}</Text>
                <Text style={style.firstboxtext2}>
                  {details.address}
                  {/* {__(
                    '177 New Apollo Indl Estate Mogra Lane Andheri Mumbai,Bharuch,400069,India',
                  )} */}
                </Text>
              </View>
            </LinearGradient>
            <TouchableOpacity
              style={style.dashimgbox}
              onPress={() => setActiveImg(!activeImg)}>
              <Image
                source={image.dashboardcolor}
                style={{width: 44, height: 44}}
              />
            </TouchableOpacity>
          </View>
          {/*  */}

          <View style={style.bottombox}>
            <LinearGradient
              colors={[colors.mainThemeColor2, colors.mainThemeColor1]}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              style={style.secondbox}>
              <View style={style.secondboxtextbox1}>
                <Image source={image.speed} style={style.speedimg} />
                <Text style={style.secondboxtext1}>
                  {Math.floor(details.speed)} {__('KM/H')}
                </Text>
                <Text style={style.secondboxtext11}>{__('SPEED')}</Text>
              </View>
              <View style={style.secondboxtextbox1}>
                <Image source={image.distance} style={style.locimg} />
                <Text style={{fontSize: 12, marginTop: 8, color: '#fff'}}>
                  {Math.floor(details.todaysODO)} {__('KM')}
                </Text>
                <Text style={style.secondboxtext11}>{__("TODAY'S ODO")}</Text>
              </View>

              <TouchableOpacity
                style={{width: '50%'}}
                onPress={() => {
                  setVisible(!visible);
                }}>
                <LinearGradient
                  colors={[colors.mainThemeColor4, colors.mainThemeColor3]}
                  start={{x: 0.9, y: 0}}
                  end={{x: 0, y: 1.9}}
                  locations={[0, 1.9]}
                  style={style.box3}>
                  <View>
                    <Image source={image.taxtDriver} style={style.taxiimg} />
                  </View>
                  <View>
                    <Text style={style.text3}>{__('ADD DRIVER')}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {activeImg ? (
            <MapIconList handlePress={iconPress} details={details} />
          ) : null}

          {/* <TouchableOpacity
            style={{position: 'absolute', bottom: 200}}
            onPress={() => setIsActiveImg(!isActiveImg)}>
            <Image source={image.mapPaper} style={style.mapPaper} />
          </TouchableOpacity> */}

          {activeImg
            ? data1.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setID(item.id);
                      location(item.id);
                      // getLiveLocation();
                    }}
                    style={{
                      position: 'absolute',
                      bottom: 220 + 60 * index,
                    }}>
                    <Image source={item.imgUrl} style={style.mapPaper} />
                  </TouchableOpacity>
                );
              })
            : null}

          {/* modal2 */}
          {/* <View
            style={{
              position: 'absolute',
              top: 18,
              flexDirection: 'row',
              width: '100%',
              // alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                width: '10%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={image.leftArrowblack}
                style={{width: 30, height: 18}}
              />
            </View>
            <LinearGradient
              colors={[colors.mainThemeColor3, colors.mainThemeColor4]}
              start={{x: 1.3, y: 0}}
              end={{x: 0, y: 0}}
              locations={[0, 0.9]}
              style={{
                borderRadius: 15,
                width: '65%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '15%',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={image.carGreenUp}
                    style={{width: 20, height: 40}}
                  />
                </View>
                <View
                  style={{
                    // marginLeft: 25,
                    width: '70%',
                    // marginLeft:'auto'
                    // marginHorizontal: 20
                  }}>
                  <Text style={style.firstboxtext1}>MH12 RN 0790</Text>
                  <Text style={style.firstboxtext2}>
                    {__(
                      '177 New Apollo Indl Estate Mogra Lane Andheri Mumbai,Bharuch,400069,India',
                    )}
                  </Text>

                  <View
                    style={{
                      backgroundColor: '#24A520',
                      padding: 9,
                      flexDirection: 'row',
                      width: '66%',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: 6,
                    }}>
                    <Icon name="call" color="#fff" />
                    <Text style={{color: '#fff'}}>Call Driver</Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    width: '15%',
                  }}>
                  <Image
                    source={image.refresh}
                    style={{width: 25, height: 25}}
                  />
                </View>
              </View>
            </LinearGradient>
            <TouchableOpacity
              style={style.dashimgbox}
              onPress={() => setActiveImg(!activeImg)}>
              <Image
                source={image.dashboardcolor}
                style={{width: 44, height: 44}}
              />
            </TouchableOpacity>
          </View> */}

          {/*  */}
          <EngineStopPopup
            visible={modal}
            setVisible={setModal}
            details={details}
          />
          <AddDriver visible={visible} setVisible={setVisible} />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
}
export default LiveMapTracking;
