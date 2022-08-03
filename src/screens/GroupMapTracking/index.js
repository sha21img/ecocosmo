import React, {useState, useEffect} from 'react';
import {View, Text, Platform, Image, Dimensions} from 'react-native';
import MapView, {
  AnimatedRegion,
  Animated,
  MarkerAnimated,
  Callout,
  CalloutSubview,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Storage from '../../../Utils/Storage';
import {axiosGetData} from '../../../Utils/ApiController';
import {useNetInfo} from '@react-native-community/netinfo';
import Geolocation from 'react-native-geolocation-service';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
function index() {
  const [coordinate, setCoordinate] = useState({
    latitude: 26.9110637,
    longitude: 75.7376412,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [details, setDetails] = useState([]);
  const getDetails = async () => {
    // setIsShow(true);
    const succcess = await Storage.getLoginDetail('login_detail');
    let username = succcess.accountId;
    let encodedPassWord = succcess.password;
    let id = succcess.type;
    const response = await axiosGetData(
      `vehicles/${username}/${encodedPassWord}/${id}`,
    );
    const detail = response.data.vehicles;
    // console.log('GroupMapTracking', detail);
    setDetails(detail);
    // setIsShow(false);
  };
  const getLocations = async () => {
    Geolocation.getCurrentPosition(position => {
      console.log('positio', position);
      setCoordinate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };
  const netInfo = useNetInfo();
  useEffect(() => {
    // getLocation();
    if (netInfo.isConnected) {
      if (Platform.OS == 'android') {
        getLocations();
      } else {
        // checkPermissionIOS();
      }
    }
  }, [netInfo.isConnected]);
  useEffect(() => {
    getDetails();
  }, []);
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{
          flex: 1,
        }}
        // zoomEnabled={true}
        trackViewChanges={false}
        // scrollEnabled={false}
        // pointerEvents="none"
        // minZoomLevel={15}
        initialRegion={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        provider={PROVIDER_GOOGLE}>
        {details.map(item => {
          console.log('item', item.lat);
          return (
            <Marker
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
                  width: 70,
                }}
              />
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}
export default index;