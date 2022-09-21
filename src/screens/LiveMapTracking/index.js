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
  const [vehicleData, setVehicleData] = useState(false);

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
  const animate = async (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 60000);
        mapRef.current.animateToRegion(newCoordinate);
        mapRef.current.animateCamera(newCoordinate, {duration: 60000});
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
  const updateRef = React.useRef(state.destinationCords);
  useEffect(() => {
    updateRef.current = state.destinationCords;
  });
  useEffect(() => {
    const interval = setInterval(() => {
      getDetails();
    }, 20000);
    return () => clearInterval(interval);
  }, []);
  const getDetails = async () => {
    const refUpdate = updateRef.current;
    const loginDetail = await Storage.getLoginDetail('login_detail');
    let username = loginDetail.accountId;
    let password = loginDetail.password;
    let type = loginDetail.type;
    const response = await axiosGetData(
      `livetrack/${username}/${password}/${props.route.params.details.imei}/${type}`,
    );
    console.log('poiuytrew0-----------', response.data.vehicle);
    setDetail(response.data.vehicle);
    const vehicleDetails = response.data.vehicle;
    setVehicleData(vehicleDetails);
    const latitude = parseFloat(vehicleDetails.lat);
    const longitude = parseFloat(vehicleDetails.lng);
    // const latitude = 26.876;
    // const longitude = 75.7687;
    const lastlatitude = parseFloat(vehicleDetails.lastLat);
    const lastlongitude = parseFloat(vehicleDetails.lastLng);
    console.log(
      'this is location2-=3-2=3-2=3-=23=2-=3-2=3423-4=32   23=4 -=234-=32-4=',
      refUpdate.latitude != latitude,
    );
    console.log(
      'this is location2-=3-2=3-2=3-=23=2-=3-2=3423-4=32   23=4 -=234-=32-4=',
      refUpdate.latitude,
      latitude,
    );
    console.log(
      'this is location2-=3-2=3-2=3-=23=2-=3-2=3423-4=32   23=4 -=234-=32-4=',
      refUpdate.longitude != longitude,
    );
    console.log(
      'this is location2-=3-2=3-2=3-=23=2-=3-2=3423-4=32   23=4 -=234-=32-4=',
      refUpdate.longitude,
      longitude,
    );
    if (refUpdate.latitude == latitude && refUpdate.longitude == longitude) {
      console.log('nhi chala');
    } else {
      console.log('chal gya');
      await animate(latitude, longitude);

      const cord1 = {
        latitude: parseFloat(lastlatitude),
        longitude: parseFloat(lastlongitude),
      };
      const cord2 = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };

      const y =
        Math.sin(cord2.longitude - cord1.longitude) * Math.cos(cord2.latitude);
      const x =
        Math.cos(cord1.latitude) * Math.sin(cord2.latitude) -
        Math.sin(cord1.latitude) *
          Math.cos(cord2.latitude) *
          Math.cos(cord2.longitude - cord1.longitude);
      const θ = Math.atan2(y, x);
      var brng = ((θ * 180) / Math.PI + 360) % 360;
      updateState({
        heading: brng,
        curLoc: {
          latitude: lastlatitude,
          longitude: lastlongitude,
        },
        coordinate: new AnimatedRegion({
          latitude: lastlatitude,
          longitude: lastlongitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
        destinationCords: {
          latitude: latitude,
          longitude: longitude,
        },
      });
    }
    setIsShow(true);
  };
  const [marginBottom, setMarginBottom] = useState(1);
  const [modal, setModal] = useState(false);

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
  };
  console.log('livecords', liveCords);

  return (
    <>
      {isShow ? (
        <View style={style.container}>
          <View style={style.map_container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              zoomEnabled={true}
              zoomControlEnabled={true}
              zoomTapEnabled={true}
              tracksViewChanges={false}
              mapType={mapType ? 'satellite' : 'standard'}
              showsTraffic={traffic}
              ref={mapRef}
              style={style.map}
              region={{
                ...curLoc,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}>
              {Object.keys(coordinate).length > 0 && (
                <>
                {console.log(heading, 'vehiheadingheadingheadingheadingheadingheadingcleData.heading')}
                  <Marker.Animated
                    // rotation={heading}
                    icon={{uri: detail.markerIcon}}
                    style={{
                      transform: [
                        {
                          rotate:
                            heading === null || heading === undefined
                              ? '0deg'
                              : `${heading}deg`,
                        },
                      ],
                    }}
                    flat={true}
                    ref={markerRef}
                    coordinate={coordinate}
                  />
                  <MapViewDirections
                    origin={coordinate}
                    destination={destinationCords}
                    apikey={GOOGLE_MAP_KEY}
                    strokeWidth={3}
                    strokeColor="black"
                    // optimizeWaypoints={true}
                  />
                </>
              )}
              {Object.keys(liveCords).length > 0 && isMarkerShow ? (
                <>
                  <Marker.Animated
                    ref={markerRefs}
                    coordinate={liveCords}></Marker.Animated>
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
          </View>
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
                <Text style={style.firstboxtext2}>{details.address}</Text>
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
