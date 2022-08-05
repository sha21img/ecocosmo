import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
  View,
  Text,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
function GoogleMap(props) {
  const [coordinate, setCoordinate] = useState({
    latitude: 18.9110637,
    longitude: 73.7376412,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
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
  return (
    <MapView
      style={{
        flex: 1,
      }}
        region={{
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      {...props}
      provider={PROVIDER_GOOGLE}>
      {props?.children ? props.children : null}
    </MapView>
  );
}

export default GoogleMap;
