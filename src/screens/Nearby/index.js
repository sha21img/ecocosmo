import React, {useEffect, useState} from 'react';
import {image} from '../../../assets/images';
import colors from '../../../assets/Colors';
import {__} from '../../../Utils/Translation/translation';
import {View, Image, TouchableOpacity, Text} from 'react-native';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Size} from '../../../assets/fonts/Fonts';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
function Nearby(props) {
  const [marker, setmarker] = useState();
  const [data, setdata] = useState();
  const data1 = () => {
    console.log(props.route.params.data);
    Geolocation.getCurrentPosition(position => {
      console.log('positio', position);
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${props.route.params.data}&location=${position.coords.latitude},${position.coords.longitude}&radius=1500&type=restaurant&key=AIzaSyAQDxD_FpUHSM-HGCGrs20T4oZTNRc4Sq0`,
        )
        .then(response => {
          console.log('response.data', response.data.results[0].geometry);
          setmarker(response.data.results);
        })
        .catch(() => {
          console.log('error');
        });
    });
  };

  useEffect(() => {
    data1();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 35,
          paddingHorizontal: 20,
          position: 'absolute',
          zIndex: 10,
          top: 0,
        }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <MaterialCommunityIcons
            style={{
              color: '#3D3D3D',
              fontSize: 30,
            }}
            name={'keyboard-backspace'}
          />
        </TouchableOpacity>
      </View>
      <GoogleMap>
        {marker?.map((item, index) => {
          console.log('???????????????????????', item.geometry.location);
          return (
            <Marker
              trackViewChanges={false}
              key={index.toString()}
              coordinate={{
                latitude: parseFloat(item.geometry.location.lat),
                longitude: parseFloat(item.geometry.location.lng),
              }}>
              <Image
                resizeMode="contain"
                source={{uri: item.icon}}
                style={{
                  height: 25,
                  width: 70,
                }}
              />
            </Marker>
          );
        })}
      </GoogleMap>
    </View>
  );
}

export default Nearby;
