import React from 'react';
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
function Nearby(props) {
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
      <GoogleMap>{/* <Marker></Marker> */}</GoogleMap>
    </View>
  );
}

export default Nearby;
